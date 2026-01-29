#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Samsung DEX Controller with scrcpy
支援有線/無線DEX連接、系統托盤最小化、注音輸入法優化
"""

import os
import sys
import subprocess
import tkinter as tk
from tkinter import ttk, messagebox
import threading
from PIL import Image, ImageDraw
import pystray
from pystray import MenuItem as item
import json
from datetime import datetime

# 配置文件路徑
CONFIG_FILE = "dex_config.json"

class DebugOutput:
    """將 print 輸出重定向到 Text widget"""
    def __init__(self, text_widget, is_error=False):
        self.text_widget = text_widget
        self.is_error = is_error
        
    def write(self, message):
        if message.strip():
            timestamp = datetime.now().strftime("%H:%M:%S")
            color = "red" if self.is_error else "white"
            
            def append():
                self.text_widget.insert(tk.END, f"[{timestamp}] {message}\n")
                if self.is_error:
                    # 為錯誤訊息添加紅色標記
                    self.text_widget.tag_add("error", f"end-{len(message)+13}c", "end-1c")
                    self.text_widget.tag_config("error", foreground="#ff5555")
                self.text_widget.see(tk.END)
            
            try:
                self.text_widget.after(0, append)
            except:
                pass
    
    def flush(self):
        pass

class DEXController:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Samsung DEX Controller")
        self.root.geometry("600x700")
        self.root.resizable(True, True)
        self.root.minsize(550, 650)
        
        # 設定視窗圖標
        icon_path = os.path.join(os.path.dirname(__file__), "icon", "54l7e-oabb2-001.ico")
        if os.path.exists(icon_path):
            try:
                self.root.iconbitmap(icon_path)
            except:
                pass  # 如果圖標加載失敗就使用預設
        
        # 載入配置
        self.config = self.load_config()
        
        # scrcpy 進程
        self.scrcpy_process = None
        
        # 系統托盤圖標
        self.tray_icon = None
        
        # 設置關閉按鈕行為
        self.root.protocol("WM_DELETE_WINDOW", self.hide_window)
        
        self.setup_ui()
        
    def load_config(self):
        """載入配置文件"""
        default_config = {
            "scrcpy_path": r"D:\EO\KeepTool\scrcpy-win64-v3.3.4",
            "resolution": "1920x1080",
            "refresh_rate": "240",
            "keyboard_mode": "uhid",
            "display_mode": "dex",  # DEX 模式注音輸入最佳
            "raw_key_events": False,
            "legacy_paste": True,  # 預設啟用，改善注音輸入
            "no_clipboard_autosync": True  # 預設啟用，減少干擾
        }
        
        if os.path.exists(CONFIG_FILE):
            try:
                with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                    loaded_config = json.load(f)
                    default_config.update(loaded_config)
            except:
                pass
        
        return default_config
    
    def save_config(self):
        """儲存配置文件"""
        try:
            with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
                json.dump(self.config, f, indent=4, ensure_ascii=False)
        except Exception as e:
            print(f"儲存配置失敗: {e}")
    
    def setup_ui(self):
        """設置使用者介面"""
        # 標題
        title_frame = tk.Frame(self.root, bg="#2196F3", height=60)
        title_frame.pack(fill=tk.X)
        title_frame.pack_propagate(False)
        
        title_label = tk.Label(
            title_frame, 
            text="🖥️ Samsung DEX 控制器",
            font=("Microsoft JhengHei", 18, "bold"),
            bg="#2196F3",
            fg="white"
        )
        title_label.pack(expand=True)
        
        # 主要內容區（使用 Canvas 和 Scrollbar）
        container = tk.Frame(self.root)
        container.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        canvas = tk.Canvas(container)
        scrollbar = tk.Scrollbar(container, orient="vertical", command=canvas.yview)
        main_frame = tk.Frame(canvas, padx=20, pady=20)
        
        main_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=main_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # 滑鼠滾輪支援
        def _on_mousewheel(event):
            canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        canvas.bind_all("<MouseWheel>", _on_mousewheel)
        
        # 配置區域
        config_frame = tk.LabelFrame(
            main_frame, 
            text="⚙️ 設定", 
            font=("Microsoft JhengHei", 11, "bold"),
            padx=10,
            pady=10
        )
        config_frame.pack(fill=tk.X, pady=(0, 15))
        
        # scrcpy 路徑
        tk.Label(config_frame, text="scrcpy 路徑:", font=("Microsoft JhengHei", 10), width=10, anchor=tk.W).grid(row=0, column=0, sticky=tk.W, pady=5, padx=(0,5))
        self.path_entry = tk.Entry(config_frame, width=45, font=("Consolas", 9))
        self.path_entry.insert(0, self.config["scrcpy_path"])
        self.path_entry.grid(row=0, column=1, sticky=tk.EW, padx=5, pady=5)
        
        config_frame.columnconfigure(1, weight=1)
        
        # 解析度
        tk.Label(config_frame, text="解析度:", font=("Microsoft JhengHei", 10), width=10, anchor=tk.W).grid(row=1, column=0, sticky=tk.W, pady=5, padx=(0,5))
        self.resolution_var = tk.StringVar(value=self.config["resolution"])
        resolution_combo = ttk.Combobox(
            config_frame, 
            textvariable=self.resolution_var,
            values=["1920x1080", "2560x1440", "3840x2160", "1600x900"],
            width=20,
            font=("Consolas", 10),
            state="readonly"
        )
        resolution_combo.grid(row=1, column=1, sticky=tk.W, padx=5, pady=5)
        
        # 更新率
        tk.Label(config_frame, text="更新率:", font=("Microsoft JhengHei", 10), width=10, anchor=tk.W).grid(row=2, column=0, sticky=tk.W, pady=5, padx=(0,5))
        self.refresh_rate_var = tk.StringVar(value=self.config["refresh_rate"])
        refresh_combo = ttk.Combobox(
            config_frame,
            textvariable=self.refresh_rate_var,
            values=["60", "120", "144", "240"],
            width=20,
            font=("Consolas", 10),
            state="readonly"
        )
        refresh_combo.grid(row=2, column=1, sticky=tk.W, padx=5, pady=5)
        
        # 鍵盤模式
        tk.Label(config_frame, text="鍵盤模式:", font=("Microsoft JhengHei", 10), width=10, anchor=tk.W).grid(row=3, column=0, sticky=tk.W, pady=5, padx=(0,5))
        self.keyboard_mode_var = tk.StringVar(value=self.config["keyboard_mode"])
        keyboard_combo = ttk.Combobox(
            config_frame,
            textvariable=self.keyboard_mode_var,
            values=["uhid", "aoa", "sdk"],
            width=20,
            font=("Consolas", 10),
            state="readonly"
        )
        keyboard_combo.grid(row=3, column=1, sticky=tk.W, padx=5, pady=5)
        
        # 顯示模式
        tk.Label(config_frame, text="顯示模式:", font=("Microsoft JhengHei", 10), width=10, anchor=tk.W).grid(row=4, column=0, sticky=tk.W, pady=5, padx=(0,5))
        self.display_mode_var = tk.StringVar(value=self.config.get("display_mode", "mirror"))
        display_combo = ttk.Combobox(
            config_frame,
            textvariable=self.display_mode_var,
            values=["mirror", "dex"],
            width=20,
            font=("Consolas", 10),
            state="readonly"
        )
        display_combo.grid(row=4, column=1, sticky=tk.W, padx=5, pady=5)
        
        tk.Label(
            config_frame, 
            text="💡 mirror=鏡像手機畫面 | dex=DEX桌面(注音輸入佳)",
            font=("Microsoft JhengHei", 8),
            fg="#2196F3"
        ).grid(row=5, column=0, columnspan=2, pady=(2, 0))
        
        tk.Label(
            config_frame, 
            text="💡 uhid 模式支援注音輸入最佳(Android 14+)",
            font=("Microsoft JhengHei", 8),
            fg="gray"
        ).grid(row=6, column=0, columnspan=2, pady=(5, 0))
        
        # 注音優化選項
        tk.Label(
            config_frame,
            text="注音輸入優化:",
            font=("Microsoft JhengHei", 10, "bold"),
            fg="#FF5722"
        ).grid(row=7, column=0, columnspan=2, sticky=tk.W, pady=(10, 5))
        
        # Raw Key Events
        self.raw_key_var = tk.BooleanVar(value=self.config.get("raw_key_events", False))
        raw_key_check = tk.Checkbutton(
            config_frame,
            text="☑️ Raw Key Events (原始按鍵事件)",
            variable=self.raw_key_var,
            font=("Microsoft JhengHei", 9),
            onvalue=True,
            offvalue=False
        )
        raw_key_check.grid(row=8, column=0, columnspan=2, sticky=tk.W, pady=2)
        
        # Legacy Paste
        self.legacy_paste_var = tk.BooleanVar(value=self.config.get("legacy_paste", False))
        legacy_paste_check = tk.Checkbutton(
            config_frame,
            text="📋 Legacy Paste (舊式貼上 - 建議啟用)",
            variable=self.legacy_paste_var,
            font=("Microsoft JhengHei", 9),
            onvalue=True,
            offvalue=False
        )
        legacy_paste_check.grid(row=9, column=0, columnspan=2, sticky=tk.W, pady=2)
        
        # No Clipboard Autosync
        self.no_clipboard_var = tk.BooleanVar(value=self.config.get("no_clipboard_autosync", False))
        no_clipboard_check = tk.Checkbutton(
            config_frame,
            text="🚫 關閉剪貼簿自動同步",
            variable=self.no_clipboard_var,
            font=("Microsoft JhengHei", 9),
            onvalue=True,
            offvalue=False
        )
        no_clipboard_check.grid(row=10, column=0, columnspan=2, sticky=tk.W, pady=2)
        
        tk.Label(
            config_frame,
            text="💡 如果注音不能用，請嘗試啟用 Legacy Paste",
            font=("Microsoft JhengHei", 8),
            fg="#FF5722"
        ).grid(row=11, column=0, columnspan=2, pady=(5, 0))
        
        # 儲存設定按鈕
        save_btn = tk.Button(
            config_frame,
            text="💾 儲存設定",
            command=self.save_settings,
            bg="#4CAF50",
            fg="white",
            font=("Microsoft JhengHei", 10, "bold"),
            relief=tk.FLAT,
            cursor="hand2",
            padx=20,
            pady=5
        )
        save_btn.grid(row=12, column=0, columnspan=2, pady=(15, 0))
        
        # 控制按鈕區域
        control_frame = tk.LabelFrame(
            main_frame,
            text="🎮 控制面板",
            font=("Microsoft JhengHei", 11, "bold"),
            padx=10,
            pady=10
        )
        control_frame.pack(fill=tk.BOTH, expand=True)
        
        # 按鈕樣式
        button_style = {
            "font": ("Microsoft JhengHei", 12, "bold"),
            "height": 2,
            "relief": tk.FLAT,
            "cursor": "hand2",
            "padx": 10,
            "pady": 8
        }
        
        # 有線 DEX
        self.wired_btn = tk.Button(
            control_frame,
            text="🔌 啟動有線 DEX",
            command=self.start_wired_dex,
            bg="#2196F3",
            fg="white",
            **button_style
        )
        self.wired_btn.pack(fill=tk.X, pady=5)
        
        # 無線 DEX
        self.wireless_btn = tk.Button(
            control_frame,
            text="📡 啟動無線 DEX",
            command=self.start_wireless_dex,
            bg="#9C27B0",
            fg="white",
            **button_style
        )
        self.wireless_btn.pack(fill=tk.X, pady=5)
        
        # 重啟 ADB
        self.restart_btn = tk.Button(
            control_frame,
            text="🔄 重啟 ADB",
            command=self.restart_adb,
            bg="#FF9800",
            fg="white",
            **button_style
        )
        self.restart_btn.pack(fill=tk.X, pady=5)
        
        # 關閉 DEX
        self.stop_btn = tk.Button(
            control_frame,
            text="⏹️ 關閉 DEX",
            command=self.stop_dex,
            bg="#F44336",
            fg="white",
            **button_style
        )
        self.stop_btn.pack(fill=tk.X, pady=5)
        
        # 最小化到托盤
        self.minimize_btn = tk.Button(
            control_frame,
            text="📌 最小化到系統托盤",
            command=self.hide_window,
            bg="#607D8B",
            fg="white",
            **button_style
        )
        self.minimize_btn.pack(fill=tk.X, pady=5)
        
        # 狀態欄
        status_frame = tk.Frame(main_frame)
        status_frame.pack(fill=tk.X, pady=(10, 0))
        
        tk.Label(
            status_frame,
            text="狀態:",
            font=("Microsoft JhengHei", 9, "bold")
        ).pack(side=tk.LEFT)
        
        self.status_label = tk.Label(
            status_frame,
            text="就緒",
            font=("Microsoft JhengHei", 9),
            fg="green",
            anchor=tk.W
        )
        self.status_label.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)
        
        # 調試按鈕
        debug_btn = tk.Button(
            status_frame,
            text="🐛",
            command=self.toggle_debug,
            font=("Segoe UI Emoji", 8),
            width=3,
            cursor="hand2"
        )
        debug_btn.pack(side=tk.RIGHT)
        
        # 調試輸出區（預設隱藏）
        self.debug_frame = tk.Frame(main_frame)
        self.debug_text = tk.Text(
            self.debug_frame,
            height=8,
            font=("Consolas", 8),
            bg="#1e1e1e",
            fg="#d4d4d4",
            wrap=tk.WORD
        )
        self.debug_text.pack(fill=tk.BOTH, expand=True)
        
        scrollbar = tk.Scrollbar(self.debug_text)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.debug_text.config(yscrollcommand=scrollbar.set)
        scrollbar.config(command=self.debug_text.yview)
        
        # 重定向 print 到調試視窗
        sys.stdout = DebugOutput(self.debug_text)
        sys.stderr = DebugOutput(self.debug_text, is_error=True)
    
    def save_settings(self):
        """儲存設定"""
        self.config["scrcpy_path"] = self.path_entry.get()
        self.config["resolution"] = self.resolution_var.get()
        self.config["refresh_rate"] = self.refresh_rate_var.get()
        self.config["keyboard_mode"] = self.keyboard_mode_var.get()
        self.config["display_mode"] = self.display_mode_var.get()
        self.config["raw_key_events"] = self.raw_key_var.get()
        self.config["legacy_paste"] = self.legacy_paste_var.get()
        self.config["no_clipboard_autosync"] = self.no_clipboard_var.get()
        self.save_config()
        messagebox.showinfo("成功", "設定已儲存！")
    
    def update_status(self, message, color="black"):
        """更新狀態訊息"""
        self.status_label.config(text=message, fg=color)
    
    def toggle_debug(self):
        """切換調試視窗顯示"""
        if self.debug_frame.winfo_ismapped():
            self.debug_frame.pack_forget()
            self.root.geometry("600x700")
        else:
            self.debug_frame.pack(fill=tk.BOTH, expand=True, pady=(10, 0))
            self.root.geometry("600x950")
            print("=== 調試模式已啟動 ===")
    
    def run_command(self, command, description):
        """在新執行緒中執行命令"""
        def execute():
            try:
                self.update_status(f"執行中: {description}", "blue")
                
                # 切換到 scrcpy 目錄
                scrcpy_path = self.config["scrcpy_path"]
                if not os.path.exists(scrcpy_path):
                    raise FileNotFoundError(f"找不到 scrcpy 路徑: {scrcpy_path}")
                
                # 檢查 scrcpy.exe 是否存在
                scrcpy_exe = os.path.join(scrcpy_path, "scrcpy.exe")
                if not os.path.exists(scrcpy_exe):
                    raise FileNotFoundError(f"找不到 scrcpy.exe: {scrcpy_exe}")
                
                print(f"[DEBUG] 執行命令: {command}")
                print(f"[DEBUG] 工作目錄: {scrcpy_path}")
                
                # 在 Windows 上執行命令（使用 CREATE_NEW_CONSOLE 讓 scrcpy 在新視窗中執行）
                self.scrcpy_process = subprocess.Popen(
                    command,
                    shell=True,
                    cwd=scrcpy_path,
                    creationflags=subprocess.CREATE_NEW_CONSOLE
                )
                
                self.update_status(f"✓ {description} 已啟動", "green")
                messagebox.showinfo("成功", f"{description} 已啟動！\n請查看新開啟的視窗")
                
            except Exception as e:
                error_msg = f"執行失敗: {str(e)}"
                print(f"[ERROR] {error_msg}")
                self.update_status(f"✗ 錯誤: {str(e)}", "red")
                messagebox.showerror("錯誤", f"{error_msg}\n\n請確認：\n1. scrcpy 路徑是否正確\n2. 手機是否已連接\n3. USB 偵錯是否已開啟")
        
        thread = threading.Thread(target=execute, daemon=True)
        thread.start()
    
    def start_wired_dex(self):
        """啟動有線 DEX"""
        resolution = self.resolution_var.get()
        refresh_rate = self.refresh_rate_var.get()
        keyboard_mode = self.keyboard_mode_var.get()
        display_mode = self.config.get("display_mode", "mirror")
        
        # 優化注音輸入的命令（使用完整路徑）
        scrcpy_exe = os.path.join(self.config["scrcpy_path"], "scrcpy.exe")
        
        # 基本參數
        params = []
        
        # 根據顯示模式決定是否使用新顯示器
        if display_mode == "dex":
            params.append(f"--new-display={resolution}/{refresh_rate}")
        else:
            # 鏡像模式
            params.append(f"--max-size={resolution.split('x')[0]}")
            params.append(f"--max-fps={refresh_rate}")
        
        params.append(f"--keyboard={keyboard_mode}")
        
        # 只有 sdk 模式才加 --prefer-text
        if keyboard_mode == "sdk":
            params.append("--prefer-text")
        
        # 注音優化參數
        if self.config.get("raw_key_events", False):
            params.append("--raw-key-events")
        
        if self.config.get("legacy_paste", False):
            params.append("--legacy-paste")
        
        if self.config.get("no_clipboard_autosync", False):
            params.append("--no-clipboard-autosync")
        
        command = f'"{scrcpy_exe}" {" ".join(params)}'
        print(f"[DEBUG] 啟動命令: {command}")
        mode_name = "有線鏡像" if display_mode == "mirror" else "有線 DEX"
        self.run_command(command, mode_name)
    
    def start_wireless_dex(self):
        """啟動無線 DEX"""
        resolution = self.resolution_var.get()
        refresh_rate = self.refresh_rate_var.get()
        keyboard_mode = self.keyboard_mode_var.get()
        display_mode = self.config.get("display_mode", "mirror")
        
        # 優化注音輸入的命令（使用完整路徑）
        scrcpy_exe = os.path.join(self.config["scrcpy_path"], "scrcpy.exe")
        
        # 基本參數
        params = []
        
        # 根據顯示模式決定是否使用新顯示器
        if display_mode == "dex":
            params.append(f"--new-display={resolution}/{refresh_rate}")
        else:
            # 鏡像模式
            params.append(f"--max-size={resolution.split('x')[0]}")
            params.append(f"--max-fps={refresh_rate}")
        
        params.append("--tcpip")
        params.append(f"--keyboard={keyboard_mode}")
        
        # 只有 sdk 模式才加 --prefer-text
        if keyboard_mode == "sdk":
            params.append("--prefer-text")
        
        # 注音優化參數
        if self.config.get("raw_key_events", False):
            params.append("--raw-key-events")
        
        if self.config.get("legacy_paste", False):
            params.append("--legacy-paste")
        
        if self.config.get("no_clipboard_autosync", False):
            params.append("--no-clipboard-autosync")
        
        command = f'"{scrcpy_exe}" {" ".join(params)}'
        print(f"[DEBUG] 啟動命令: {command}")
        mode_name = "無線鏡像" if display_mode == "mirror" else "無線 DEX"
        self.run_command(command, mode_name)
    
    def restart_adb(self):
        """重啟 ADB"""
        try:
            self.update_status("正在重啟 ADB...", "blue")
            scrcpy_path = self.config["scrcpy_path"]
            adb_exe = os.path.join(scrcpy_path, "adb.exe")
            
            if not os.path.exists(adb_exe):
                raise FileNotFoundError(f"找不到 adb.exe: {adb_exe}")
            
            print(f"[DEBUG] 執行: {adb_exe} disconnect")
            
            # 執行 adb disconnect
            result = subprocess.run(
                [adb_exe, "disconnect"],
                cwd=scrcpy_path,
                capture_output=True,
                text=True
            )
            
            print(f"[DEBUG] ADB 輸出: {result.stdout}")
            if result.stderr:
                print(f"[DEBUG] ADB 錯誤: {result.stderr}")
            
            self.update_status("✓ ADB 已重啟", "green")
            messagebox.showinfo("成功", "ADB 連接已重啟")
            
        except Exception as e:
            error_msg = f"重啟 ADB 失敗: {str(e)}"
            print(f"[ERROR] {error_msg}")
            self.update_status(f"✗ 錯誤: {str(e)}", "red")
            messagebox.showerror("錯誤", error_msg)
    
    def stop_dex(self):
        """關閉 DEX"""
        try:
            stopped = False
            
            if self.scrcpy_process:
                print("[DEBUG] 終止 scrcpy 進程")
                self.scrcpy_process.terminate()
                self.scrcpy_process = None
                stopped = True
            
            # 嘗試終止所有 scrcpy 進程
            print("[DEBUG] 嘗試關閉所有 scrcpy.exe 進程")
            result = subprocess.run(
                "taskkill /F /IM scrcpy.exe",
                shell=True,
                capture_output=True,
                text=True
            )
            
            print(f"[DEBUG] Taskkill 輸出: {result.stdout}")
            
            if "SUCCESS" in result.stdout or stopped:
                self.update_status("✓ DEX 已關閉", "green")
                messagebox.showinfo("成功", "DEX 已關閉")
            else:
                self.update_status("⚠ 沒有找到運行中的 DEX", "orange")
                messagebox.showinfo("提示", "目前沒有運行中的 DEX 連接")
                
        except Exception as e:
            error_msg = f"關閉 DEX 失敗: {str(e)}"
            print(f"[ERROR] {error_msg}")
            self.update_status(f"✗ 錯誤: {str(e)}", "red")
    
    def create_tray_icon(self):
        """創建系統托盤圖標"""
        # 嘗試使用自定義圖標
        icon_path = os.path.join(os.path.dirname(__file__), "icon", "54l7e-oabb2-001.ico")
        
        if os.path.exists(icon_path):
            try:
                image = Image.open(icon_path)
            except:
                # 如果加載失敗，創建預設圖標
                image = self._create_default_icon()
        else:
            # 創建預設圖標
            image = self._create_default_icon()
        
        menu = (
            item('顯示主視窗', self.show_window),
            item('有線 DEX', self.start_wired_dex),
            item('無線 DEX', self.start_wireless_dex),
            item('重啟 ADB', self.restart_adb),
            item('關閉DEX', self.stop_dex),
            item('退出', self.quit_app)
        )
        
        self.tray_icon = pystray.Icon("dex_controller", image, "DEX Controller", menu)
    
    def _create_default_icon(self):
        """創建預設圖標"""
        image = Image.new('RGB', (64, 64), color='#2196F3')
        draw = ImageDraw.Draw(image)
        draw.rectangle([10, 10, 54, 54], fill='white', outline='#2196F3', width=2)
        draw.text((20, 20), "DEX", fill='#2196F3')
        return image
    
    def show_window(self, icon=None, item=None):
        """顯示主視窗"""
        self.root.deiconify()
        self.root.lift()
        self.root.focus_force()
    
    def hide_window(self):
        """隱藏視窗到系統托盤"""
        self.root.withdraw()
        if self.tray_icon is None:
            self.create_tray_icon()
            threading.Thread(target=self.tray_icon.run, daemon=True).start()
    
    def quit_app(self, icon=None, item=None):
        """退出應用程式"""
        if self.scrcpy_process:
            self.scrcpy_process.terminate()
        
        if self.tray_icon:
            self.tray_icon.stop()
        
        self.root.quit()
        sys.exit(0)
    
    def run(self):
        """執行應用程式"""
        self.root.mainloop()

if __name__ == "__main__":
    app = DEXController()
    app.run()

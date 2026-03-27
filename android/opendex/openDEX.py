
import sys
import customtkinter as ctk
import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import subprocess
import threading
import os
import json
import logging
import time
import re

# 配置日誌
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class ADBHelper:
    def __init__(self, scrcpy_path):
        self.scrcpy_path = scrcpy_path
        self.adb_path = os.path.join(scrcpy_path, "adb.exe")

    def run_cmd(self, command, wait=True):
        """執行 ADB 指令"""
        full_command = f'"{self.adb_path}" {command}'
        try:
            # CREATE_NO_WINDOW = 0x08000000
            if wait:
                result = subprocess.run(full_command, shell=True, cwd=self.scrcpy_path,
                                        capture_output=True, text=True, timeout=10,
                                        creationflags=0x08000000)
                return result.returncode == 0
            else:
                subprocess.Popen(full_command, shell=True, cwd=self.scrcpy_path, creationflags=0x08000000)
                return True
        except Exception as e:
            logging.error(f"ADB command failed: {e}")
            return False
            
    def run_command_output(self, command):
        """執行 ADB 指令並獲取輸出"""
        full_command = f'"{self.adb_path}" {command}'
        try:
            result = subprocess.run(full_command, shell=True, capture_output=True, text=True, cwd=self.scrcpy_path, creationflags=0x08000000)
            return result.stdout.strip()
        except Exception as e:
            logging.error(f"ADB command failed: {e}")
            return None

    def get_devices(self):
        """獲取已連接裝置列表"""
        output = self.run_command_output("devices")
        devices = []
        if output:
            lines = output.splitlines()
            for line in lines[1:]:
                if line.strip():
                    parts = line.split('\t')
                    if len(parts) >= 2 and parts[1] == 'device':
                        devices.append(parts[0])
        return devices

    def set_keyboard_mode(self):
        """設定模擬藍牙鍵盤模式，確保注音輸入正常運作"""
        cmds = [
            # 啟用「實體鍵盤時顯示輸入法」— 讓軟體鍵盤可以在實體鍵盤連接時仍然彈出
            "shell settings put secure show_ime_with_hard_keyboard 1",
            # 開啟實體鍵盤助手（Samsung 專用）
            "shell settings put secure physical_keyboard_helper_enabled 1",
        ]
        for cmd in cmds:
            self.run_cmd(cmd)
            logging.info(f"Keyboard setup: {cmd}")

    def open_keyboard_settings(self):
        """開啟手機端的實體鍵盤設定頁面，可以設定鍵盤佈局為注音"""
        self.run_cmd("shell am start -a android.settings.HARD_KEYBOARD_SETTINGS")

    def enable_freeform_windows(self):
        """強制啟用自由視窗模式與真正的 DEX 桌面模式"""
        cmds = [
            # === 核心：強制所有 Activity 可調整大小 ===
            "shell settings put global force_resizable_activities 1",
            # 啟用 Android 原生自由視窗支援
            "shell settings put global enable_freeform_support 1",
            # 允許非 resizable APP 也能多視窗
            "shell settings put global enable_non_resizable_multi_window 1",
            # === Samsung DEX 專用 ===
            # 啟用多視窗
            "shell settings put global enable_multi_window 1",
            # 🔑 關鍵：強制外部顯示器啟動 DEX 桌面模式（讓手機螢幕獨立運作）
            "shell settings put global force_desktop_mode_on_external_displays 1",
            # Samsung 增強多視窗
            "shell settings put global sem_force_all_apps_resizable 1",
            # 🔑 關鍵：禁止在有實體鍵盤時顯示虛擬鍵盤
            "shell settings put secure show_ime_with_hard_keyboard 0",
        ]
        results = []
        for cmd in cmds:
            ok = self.run_cmd(cmd)
            results.append(ok)
            logging.info(f"ADB freeform cmd: {cmd} -> {'OK' if ok else 'FAIL'}")
        return all(results)

    def disable_freeform_windows(self):
        """還原預設視窗模式"""
        self.run_cmd("shell settings put global force_resizable_activities 0")
        self.run_cmd("shell settings put global enable_freeform_support 0")
        self.run_cmd("shell settings put global enable_non_resizable_multi_window 0")
        self.run_cmd("shell settings put global force_desktop_mode_on_external_displays 1")
        self.run_cmd("shell settings put global sem_force_all_apps_resizable 0")

    def get_freeform_status(self):
        """檢查目前自由視窗是否已啟用"""
        val = self.run_command_output("shell settings get global force_resizable_activities")
        return val == "1"

    def launch_app_freeform(self, package, activity=None):
        """以彈窗模式啟動指定 APP (支援 Samsung DEX Pop-up view)"""
        # 先嘗試取得 launcher activity
        if activity:
            component = f"{package}/{activity}"
        else:
            output = self.run_command_output(
                f'shell cmd package resolve-activity --brief "{package}"'
            )
            component = None
            if output:
                lines = output.strip().splitlines()
                for line in reversed(lines):
                    line = line.strip()
                    if '/' in line and not line.startswith('priority'):
                        component = line
                        break

        # 方法 1: Samsung Pop-up view (最有效的彈窗方式)
        if component:
            # 使用 Samsung 的 multiwindow intent extra
            cmd = f'shell am start -n "{component}" --ez android.intent.extra.WINDOW_MODE 2'
            logging.info(f"Launching popup (Samsung): {cmd}")
            self.run_cmd(cmd)
            time.sleep(0.3)
        
        # 方法 2: 使用 freeform windowingMode
        if component:
            cmd = f'shell am start -n "{component}" --windowingMode 5'
            logging.info(f"Launching freeform: {cmd}")
            self.run_cmd(cmd)
            time.sleep(0.3)
        
        # 方法 3: 強制設定為 freeform 並調整大小
        time.sleep(0.5)
        self._force_popup_mode()
        return True

    def _force_popup_mode(self):
        """將最上層的 task 強制切換為彈窗模式並調整大小"""
        # 取得最近的 task ID
        output = self.run_command_output(
            'shell dumpsys activity recents | findstr "Recent #0"'
        )
        if output:
            # 嘗試解析 task id
            match = re.search(r'id=(\d+)', output)
            if match:
                task_id = match.group(1)
                
                # windowingMode 5 = WINDOWING_MODE_FREEFORM (彈窗模式)
                self.run_cmd(f'shell am task set-windowing-mode {task_id} 5')
                logging.info(f"Set task {task_id} to freeform/popup mode")
                
                # 設定彈窗大小和位置 (中央,適中大小)
                # 格式: left,top,right,bottom
                self.run_cmd(f'shell am task set-bounds {task_id} 300 200 1300 900')
                logging.info(f"Set task {task_id} bounds to popup size")

    def get_installed_packages(self):
        """取得已安裝的第三方 APP 列表"""
        output = self.run_command_output("shell pm list packages -3")
        if output:
            return [line.replace("package:", "").strip() for line in output.splitlines() if line.strip()]
        return []

class OpenDEXApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        # --- 設定視窗 ---
        self.title("openDEX - Premium Samsung DeX Controller")
        self.geometry("960x700")
        
        # 設定主題
        ctk.set_appearance_mode("Dark")
        ctk.set_default_color_theme("blue")

        # --- 載入配置 ---
        self.config = self.load_config()
        self.adb = ADBHelper(self.config.get("scrcpy_path", ""))

        # --- UI 佈局 ---
        self.grid_columnconfigure(1, weight=1)
        self.grid_rowconfigure(0, weight=1)

        self.create_sidebar()
        self.create_main_area()

        # 狀態檢查線程
        self.running = True
        self.check_device_thread = threading.Thread(target=self.check_device_loop, daemon=True)
        self.check_device_thread.start()

    def load_config(self):
        config_path = "dex_config.json"
        
        # 優先嘗試讀取舊專案的設定檔 (若存在)
        # 使用 os.getcwd() 而非 __file__ 以避免在 pythonw 環境下出錯
        script_dir = os.path.dirname(os.path.abspath(sys.argv[0])) if sys.argv[0] else os.getcwd()
        old_config_path = os.path.join(script_dir, "..", "scrcpy", "dex_config.json")
        default_scrcpy = r"D:\EO\KeepTool\scrcpy-win64-v3.3.4"
        
        if os.path.exists(old_config_path):
             try:
                with open(old_config_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if "scrcpy_path" in data:
                        default_scrcpy = data["scrcpy_path"]
             except:
                 pass

        default_config = {
            "scrcpy_path": default_scrcpy,
            "resolution": "1920x1080",
            "dpi": "0",
            "wireless_ip": "",
            "refresh_rate": "60",
            "audio_enabled": True,
            "bitrate": "8M",
            "video_codec": "h264",
            "mouse_mode": "SDK",  # HID (Accurate) or SDK (Fast)
            "keyboard_mode": "UHID",  # UHID (模擬藍牙鍵盤) or SDK (軟體注入)
            "freeform_enabled": True,
            "no_vd_system_decorations": True  # 預設開啟，防止 Samsung DEX 接管虛擬顯示器
        }
        
        # 如果當前目錄有設定檔，則覆蓋
        if os.path.exists(config_path):
            with open(config_path, "r", encoding="utf-8") as f:
                try:
                    loaded = json.load(f)
                    default_config.update(loaded)
                except:
                    pass
        return default_config

    def create_sidebar(self):
        # 外層固定框架
        self.sidebar_frame = ctk.CTkFrame(self, width=220, corner_radius=0)
        self.sidebar_frame.grid(row=0, column=0, sticky="nsew")
        self.sidebar_frame.grid_rowconfigure(0, weight=1)
        self.sidebar_frame.grid_columnconfigure(0, weight=1)

        # 可捲動的內容區域
        self.sidebar_scroll = ctk.CTkScrollableFrame(
            self.sidebar_frame, width=200, corner_radius=0,
            fg_color="transparent", scrollbar_button_color="gray50"
        )
        self.sidebar_scroll.grid(row=0, column=0, sticky="nsew")
        self.sidebar_scroll.grid_columnconfigure(0, weight=1)

        # --- 以下所有元件放在 sidebar_scroll 內 ---
        sf = self.sidebar_scroll  # 簡寫

        self.logo_label = ctk.CTkLabel(sf, text="openDEX", font=ctk.CTkFont(size=28, weight="bold"))
        self.logo_label.grid(row=0, column=0, padx=20, pady=(20, 5))
        
        self.version_label = ctk.CTkLabel(sf, text="v1.1.0 Beta", font=ctk.CTkFont(size=12))
        self.version_label.grid(row=1, column=0, padx=20, pady=(0, 15))

        # 功能按鈕
        self.btn_restart_adb = ctk.CTkButton(sf, text="重啟 ADB", command=self.restart_adb)
        self.btn_restart_adb.grid(row=2, column=0, padx=20, pady=5)

        self.btn_fix_keyboard = ctk.CTkButton(sf, text="修復注音輸入", command=self.fix_keyboard_input, fg_color="#E67E22", hover_color="#D35400")
        self.btn_fix_keyboard.grid(row=3, column=0, padx=20, pady=5)

        # 視窗模式控制
        self.window_mode_label = ctk.CTkLabel(sf, text="視窗模式:", font=ctk.CTkFont(size=14, weight="bold"), anchor="w")
        self.window_mode_label.grid(row=4, column=0, padx=20, pady=(10, 2), sticky="w")

        self.freeform_var = ctk.BooleanVar(value=self.config.get("freeform_enabled", True))
        self.freeform_switch = ctk.CTkSwitch(
            sf, text="強制視窗化 (自由縮放)",
            variable=self.freeform_var,
            command=self._on_freeform_toggle,
            font=ctk.CTkFont(size=12)
        )
        self.freeform_switch.grid(row=5, column=0, padx=20, pady=(0, 2), sticky="w")

        self.no_vd_decor_var = ctk.BooleanVar(value=self.config.get("no_vd_system_decorations", True))
        self.no_vd_decor_switch = ctk.CTkSwitch(
            sf, text="停用 VD 系統裝飾",
            variable=self.no_vd_decor_var,
            font=ctk.CTkFont(size=12)
        )
        self.no_vd_decor_switch.grid(row=6, column=0, padx=20, pady=(0, 2), sticky="w")

        self.freeform_status_label = ctk.CTkLabel(sf, text="", font=ctk.CTkFont(size=11), text_color="gray")
        self.freeform_status_label.grid(row=7, column=0, padx=20, pady=(0, 5), sticky="w")

        # 設定: DPI
        self.dpi_label = ctk.CTkLabel(sf, text="DPI (密度):", anchor="w")
        self.dpi_label.grid(row=8, column=0, padx=20, pady=(10, 0), sticky="w")
        
        self.dpi_entry = ctk.CTkEntry(sf, placeholder_text="0 (自動)")
        self.dpi_entry.insert(0, str(self.config.get("dpi", "0")))
        self.dpi_entry.grid(row=9, column=0, padx=20, pady=(0, 5))

        # 設定: 無線 IP
        self.ip_label = ctk.CTkLabel(sf, text="無線 Device IP:", anchor="w")
        self.ip_label.grid(row=10, column=0, padx=20, pady=(10, 0), sticky="w")
        
        self.ip_entry = ctk.CTkEntry(sf, placeholder_text="192.168.x.x")
        self.ip_entry.insert(0, self.config.get("wireless_ip", ""))
        self.ip_entry.grid(row=11, column=0, padx=20, pady=(0, 5))

        # 設定: 效能優化 (Separator)
        self.perf_label = ctk.CTkLabel(sf, text="效能設定:", font=ctk.CTkFont(size=14, weight="bold"), anchor="w")
        self.perf_label.grid(row=12, column=0, padx=20, pady=(10, 2), sticky="w")

        # 音訊開關
        self.audio_var = ctk.BooleanVar(value=self.config.get("audio_enabled", True))
        self.audio_switch = ctk.CTkSwitch(sf, text="啟用音訊", variable=self.audio_var)
        self.audio_switch.grid(row=13, column=0, padx=20, pady=(2, 2), sticky="w")

        # Bitrate
        self.bitrate_label = ctk.CTkLabel(sf, text="畫面位元率 (Bitrate):", anchor="w")
        self.bitrate_label.grid(row=14, column=0, padx=20, pady=(5, 0), sticky="w")
        
        self.bitrate_option = ctk.CTkOptionMenu(sf, values=["2M", "4M", "8M", "16M", "Auto"], width=140)
        self.bitrate_option.set(self.config.get("bitrate", "8M"))
        self.bitrate_option.grid(row=15, column=0, padx=20, pady=(0, 5))

        # Codec
        self.codec_label = ctk.CTkLabel(sf, text="視訊編碼 (Codec):", anchor="w")
        self.codec_label.grid(row=16, column=0, padx=20, pady=(5, 0), sticky="w")
        
        self.codec_option = ctk.CTkOptionMenu(sf, values=["h264", "h265", "av1"], width=140)
        self.codec_option.set(self.config.get("video_codec", "h264"))
        self.codec_option.grid(row=17, column=0, padx=20, pady=(0, 5))
        
        # Mouse Mode
        self.mouse_label = ctk.CTkLabel(sf, text="滑鼠模式:", anchor="w")
        self.mouse_label.grid(row=18, column=0, padx=20, pady=(5, 0), sticky="w")
        
        self.mouse_option = ctk.CTkOptionMenu(sf, values=["SDK (相容)", "HID (準確)"], width=140)
        saved_mouse = self.config.get("mouse_mode", "SDK")
        display_mouse = "HID (準確)" if saved_mouse == "HID" else "SDK (相容)"
        self.mouse_option.set(display_mouse)
        self.mouse_option.grid(row=19, column=0, padx=20, pady=(0, 5))

        # Keyboard Mode
        self.kb_label = ctk.CTkLabel(sf, text="鍵盤模式:", anchor="w")
        self.kb_label.grid(row=20, column=0, padx=20, pady=(5, 0), sticky="w")
        
        self.kb_option = ctk.CTkOptionMenu(sf, values=["UHID (模擬藍牙鍵盤)", "SDK (軟體注入)"], width=140)
        saved_kb = self.config.get("keyboard_mode", "UHID")
        display_kb = "SDK (軟體注入)" if saved_kb == "SDK" else "UHID (模擬藍牙鍵盤)"
        self.kb_option.set(display_kb)
        self.kb_option.grid(row=21, column=0, padx=20, pady=(0, 5))

        # 開啟手機端鍵盤佈局設定（注音等）
        self.kb_settings_btn = ctk.CTkButton(
            sf, text="📱 鍵盤佈局設定", width=140, height=28,
            fg_color="gray30", hover_color="gray40",
            command=self.open_keyboard_settings
        )
        self.kb_settings_btn.grid(row=22, column=0, padx=20, pady=(0, 5))

        # 狀態標籤
        self.status_label = ctk.CTkLabel(sf, text="等待連接...", font=ctk.CTkFont(size=14), text_color="gray")
        self.status_label.grid(row=23, column=0, padx=20, pady=(10, 15))


    def create_main_area(self):
        self.main_frame = ctk.CTkFrame(self, corner_radius=0, fg_color="transparent")
        self.main_frame.grid(row=0, column=1, sticky="nsew", padx=40, pady=40)
        self.main_frame.grid_columnconfigure(0, weight=1)

        # 歡迎訊息
        self.welcome_label = ctk.CTkLabel(self.main_frame, text="Samsung DeX Controller", font=ctk.CTkFont(size=32, weight="bold"))
        self.welcome_label.pack(pady=(20, 10))

        self.desc_label = ctk.CTkLabel(self.main_frame, text="極致順暢的 DeX 體驗，支援實體鍵盤與注音輸入。\n請連接您的 Samsung 裝置並啟用 USB 偵錯。", font=ctk.CTkFont(size=16), text_color="#BDC3C7")
        self.desc_label.pack(pady=10)

        # 啟動按鈕區域
        self.action_frame = ctk.CTkFrame(self.main_frame, fg_color="transparent")
        self.action_frame.pack(pady=30, fill="x")

        self.btn_launch_dex_wired = ctk.CTkButton(self.action_frame, text="▶  啟動有線 DeX", command=lambda: self.launch_dex(wireless=False), height=55, font=ctk.CTkFont(size=18, weight="bold"))
        self.btn_launch_dex_wired.pack(pady=8, fill="x", padx=40)
        
        self.btn_launch_dex_wireless = ctk.CTkButton(self.action_frame, text="📡  啟動無線 DeX (TCP/IP)", command=lambda: self.launch_dex(wireless=True), height=55, font=ctk.CTkFont(size=18, weight="bold"), fg_color="#2ECC71", hover_color="#27AE60")
        self.btn_launch_dex_wireless.pack(pady=8, fill="x", padx=40)
        
        self.wireless_hint_label = ctk.CTkLabel(self.action_frame, text="(注意: 手機重開機後，首次使用無線功能需先插線開啟)", font=ctk.CTkFont(size=12), text_color="gray")
        self.wireless_hint_label.pack(pady=(0, 8))

        # ═══ 視窗化工具區 ═══
        self.window_tools_frame = ctk.CTkFrame(self.main_frame, corner_radius=12)
        self.window_tools_frame.pack(pady=(10, 0), fill="x", padx=20)

        tools_title = ctk.CTkLabel(self.window_tools_frame, text="🪟  APP 視窗化工具",
                                    font=ctk.CTkFont(size=16, weight="bold"))
        tools_title.pack(pady=(12, 6))

        tools_desc = ctk.CTkLabel(self.window_tools_frame,
                                   text="解決 DeX 模式下 APP 無法調整大小、只能最大化的問題",
                                   font=ctk.CTkFont(size=12), text_color="#95a5a6")
        tools_desc.pack(pady=(0, 8))

        tools_btn_row = ctk.CTkFrame(self.window_tools_frame, fg_color="transparent")
        tools_btn_row.pack(pady=(0, 12), fill="x", padx=16)

        self.btn_apply_freeform = ctk.CTkButton(
            tools_btn_row, text="✅ 啟用自由視窗",
            command=self.apply_freeform_mode,
            fg_color="#9B59B6", hover_color="#8E44AD",
            height=38, font=ctk.CTkFont(size=13, weight="bold")
        )
        self.btn_apply_freeform.pack(side="left", expand=True, fill="x", padx=(0, 6))

        self.btn_restore_default = ctk.CTkButton(
            tools_btn_row, text="↩ 還原預設",
            command=self.restore_default_window_mode,
            fg_color="#7f8c8d", hover_color="#95a5a6",
            height=38, font=ctk.CTkFont(size=13)
        )
        self.btn_restore_default.pack(side="left", expand=True, fill="x", padx=(6, 0))

        # 快捷啟動特定 APP 為視窗模式
        app_row = ctk.CTkFrame(self.window_tools_frame, fg_color="transparent")
        app_row.pack(pady=(0, 12), fill="x", padx=16)

        self.app_package_entry = ctk.CTkEntry(
            app_row, placeholder_text="輸入 APP 套件名 (例: com.android.chrome)",
            height=36
        )
        self.app_package_entry.pack(side="left", expand=True, fill="x", padx=(0, 8))

        self.btn_launch_app_windowed = ctk.CTkButton(
            app_row, text="以視窗開啟",
            command=self.launch_app_in_window,
            fg_color="#E67E22", hover_color="#D35400",
            height=36, width=120, font=ctk.CTkFont(size=13)
        )
        self.btn_launch_app_windowed.pack(side="left")


    def check_device_loop(self):
        while self.running:
            try:
                devices = self.adb.get_devices()
                if devices:
                    self.status_label.configure(text=f"● 已連接: {len(devices)} 裝置", text_color="#2ECC71")
                    self.btn_launch_dex_wired.configure(state="normal")
                    self.btn_launch_dex_wireless.configure(state="normal")
                else:
                    self.status_label.configure(text="○ 未偵測到裝置", text_color="#E74C3C")
                    self.btn_launch_dex_wired.configure(state="disabled")
                    # 無線模式可能不需要裝置顯示在 adb devices 列表 (如果尚未連接)，但通常需要先有線連接開啟 tcpip
                    self.btn_launch_dex_wireless.configure(state="normal") 
            except Exception:
                pass
            time.sleep(2)

    def open_keyboard_settings(self):
        """透過 ADB 開啟手機端的實體鍵盤設定頁面"""
        try:
            self.adb.open_keyboard_settings()
            self.status_label.configure(text="已開啟鍵盤設定", text_color="#F39C12")
        except Exception as e:
            logging.error(f"開啟鍵盤設定失敗: {e}")

    def launch_dex(self, wireless=False):
        """啟動 DeX 模式"""
        # 先關閉所有現有的 scrcpy 進程,避免重複啟動
        try:
            import subprocess
            subprocess.run("taskkill /F /IM scrcpy.exe /T", 
                         shell=True, 
                         capture_output=True, 
                         creationflags=0x08000000)  # CREATE_NO_WINDOW
            logging.info("已關閉現有的 scrcpy 進程")
            time.sleep(0.5)  # 等待進程完全關閉
        except Exception as e:
            logging.warning(f"關閉 scrcpy 進程時發生錯誤: {e}")
        
        scrcpy_exe = os.path.join(self.config["scrcpy_path"], "scrcpy.exe")
        if not os.path.exists(scrcpy_exe):
            messagebox.showerror("錯誤", f"找不到 scrcpy.exe 於:\n{self.config['scrcpy_path']}")
            return

        # 處理參數
        resolution = self.config["resolution"]
        dpi = self.dpi_entry.get().strip()
        wireless_ip = self.ip_entry.get().strip()
        
        # 效能參數
        audio_enabled = self.audio_var.get()
        bitrate = self.bitrate_option.get()
        codec = self.codec_option.get()
        
        # 滑鼠模式
        mouse_selection = self.mouse_option.get()
        mouse_mode = "HID" if "HID" in mouse_selection else "SDK"

        # 鍵盤模式
        kb_selection = self.kb_option.get()
        keyboard_mode = "UHID" if "UHID" in kb_selection else "SDK"

        new_display_arg = f"--new-display={resolution}"
        if dpi and dpi != "0":
             new_display_arg += f"/{dpi}"
        
        # 更新 config
        self.config["dpi"] = dpi
        self.config["wireless_ip"] = wireless_ip
        self.config["audio_enabled"] = audio_enabled
        self.config["bitrate"] = bitrate
        self.config["video_codec"] = codec
        self.config["mouse_mode"] = mouse_mode
        self.config["keyboard_mode"] = keyboard_mode
        # 儲存視窗化設定
        freeform_enabled = self.freeform_var.get()
        no_vd_decorations = self.no_vd_decor_var.get()
        self.config["freeform_enabled"] = freeform_enabled
        self.config["no_vd_system_decorations"] = no_vd_decorations
        with open("dex_config.json", "w", encoding="utf-8") as f:
            json.dump(self.config, f, indent=4)

        # 如果啟用了 freeform，先透過 ADB 設定裝置
        if freeform_enabled:
            self.adb.enable_freeform_windows()

        # 如果使用 UHID 模式（模擬藍牙鍵盤），自動配置手機端實體鍵盤設定
        if keyboard_mode == "UHID":
            self.adb.set_keyboard_mode()

        # 準備命令參數
        cmd_args = [
            new_display_arg, 
            f"--keyboard={keyboard_mode.lower()}",  # SDK=虛擬顯示器相容, UHID=模擬實體鍵盤
            f"--video-codec={codec}",
            "--window-title=openDEX"
        ]

        # 自動偵測裝置並選擇正確的連線方式
        devices = self.adb.get_devices()
        if len(devices) == 0:
            messagebox.showerror("錯誤", "未偵測到任何 ADB 裝置。\n請確認 USB 已連接且已開啟偵錯模式。")
            return
        
        # 分類 USB vs TCP/IP 裝置
        usb_devices = [d for d in devices if "." not in d and ":" not in d]
        tcpip_devices = [d for d in devices if "." in d or ":" in d]
        
        # 根據模式選擇裝置
        # 注意:無線模式下不在這裡指定裝置,而是在執行緒中使用 --tcpip 參數
        selected_device = None
        if not wireless:
            # 有線模式：優先使用 USB 裝置
            if usb_devices:
                selected_device = usb_devices[0]
            elif tcpip_devices:
                selected_device = tcpip_devices[0]
            
            # 如果沒有選到裝置,使用第一個可用的
            if not selected_device and devices:
                selected_device = devices[0]
            
            if selected_device:
                cmd_args.append(f"-s {selected_device}")
        
        # 視窗化相關參數 — 關鍵：阻止 Samsung DEX 接管虛擬顯示器
        if no_vd_decorations:
            cmd_args.append("--no-vd-system-decorations")
        
        # 保留 APP 在虛擬顯示器關閉時不被銷毀
        cmd_args.append("--no-vd-destroy-content")

        # 滑鼠模式: SDK 或 HID
        if mouse_mode == "HID":
            cmd_args.append("--mouse=uhid")
        else:
            cmd_args.append("--mouse=sdk")

        # 處理 bitrate
        if bitrate != "Auto":
            # 使用 -b 替代 --video-bitrate 以提高相容性
            cmd_args.append(f"-b {bitrate}")
            
        # 處理 audio
        if audio_enabled:
            cmd_args.append("--audio-dup")
        else:
            cmd_args.append("--no-audio")

        def run_scrcpy_thread():
            try:
                # --- 無線連接邏輯 ---
                if wireless:
                    # 1. 檢查是否有 USB 設備連接
                    devices = self.adb.get_devices()
                    usb_device = None
                    # 簡單判斷：如果 device id 不是 IP 格式 (不含 . ) 或者是 localhost，視為 USB
                    for dev in devices:
                        if "." not in dev and ":" not in dev: 
                            usb_device = dev
                            break
                    
                    if usb_device:
                        # 有 USB 連接 -> 啟用 TCP/IP 模式
                        logging.info(f"Detected USB device: {usb_device}, enabling TCP/IP...")
                        self.status_label.configure(text="正在啟用無線模式...", text_color="#F39C12")
                        if self.adb.run_cmd("tcpip 5555"):
                            time.sleep(2) # 等待切換
                            
                            # 如果有設定 IP，優先使用 IP 連接，更穩定
                            if wireless_ip:
                                cmd_args.append(f"--tcpip={wireless_ip}:5555")
                            else:
                                cmd_args.append("--tcpip") # 讓 scrcpy 自動尋找
                        else:
                            messagebox.showerror("錯誤", "無法啟用 TCP/IP 模式，請確認 USB 已連接且授權。")
                            self.status_label.configure(text="無線啟動失敗", text_color="red")
                            return
                    else:
                        # 無 USB 連接
                        target_ip = wireless_ip
                        
                        # 如果輸入框沒有 IP，則跳出詢問
                        if not target_ip:
                            target_ip = ctk.CTkInputDialog(text="請輸入裝置 IP 位址 (例如 192.168.1.100):", title="無線連接").get_input()
                            if target_ip:
                                # 回填到介面方便下次使用
                                # 這裡是在線程中，直接操作 UI 可能會有風險，但在 CTk 中通常沒問題，或需使用 after
                                pass 
                        
                        if target_ip:
                             cmd_args.append(f"--tcpip={target_ip}:5555")
                        else:
                            return # 使用者取消
                
                # 組裝完整指令
                final_cmd = [f'"{scrcpy_exe}"'] + cmd_args
                full_cmd_str = " ".join(final_cmd)
                logging.info(f"Launching: {full_cmd_str}")
                
                # 執行 scrcpy - 使用非阻塞方式啟動
                # 將輸出重導向到檔案以便除錯
                log_file_path = os.path.join(os.getcwd(), "scrcpy.log")
                try:
                    with open(log_file_path, "w", encoding="utf-8") as log_file:
                        # 使用 subprocess.Popen 啟動,不等待進程結束
                        process = subprocess.Popen(
                            full_cmd_str, 
                            shell=True, 
                            cwd=self.config["scrcpy_path"],
                            stdout=log_file, 
                            stderr=subprocess.STDOUT,
                            creationflags=subprocess.CREATE_NEW_PROCESS_GROUP  # 創建新進程組,避免繼承父進程的控制台
                        )
                        
                        self.status_label.configure(text="DEX 已啟動", text_color="#2ECC71")
                        logging.info(f"scrcpy started with PID: {process.pid}")
                        
                        # 不使用 process.wait(),讓 scrcpy 在背景運行
                        # 等待一小段時間確保進程啟動
                        time.sleep(1)
                        
                        # 檢查進程是否仍在運行
                        if process.poll() is not None:
                            # 進程已結束,讀取錯誤日誌
                            with open(log_file_path, "r", encoding="utf-8") as f:
                                error_log = f.read()
                            logging.error(f"Scrcpy failed: {error_log}")
                            messagebox.showerror("啟動失敗", f"Scrcpy 錯誤 (詳見 scrcpy.log):\n{error_log[-500:]}")
                            self.status_label.configure(text="啟動失敗", text_color="#E74C3C")

                except Exception as e:
                    logging.error(f"Failed to launch scrcpy: {e}")
                    messagebox.showerror("錯誤", f"執行發生例外: {e}")
                finally:
                    # 不恢復狀態,保持顯示 "DEX 已啟動" 或 "啟動失敗"
                    pass

            except Exception as e:
                logging.error(f"Failed to launch scrcpy (outer): {e}")
                messagebox.showerror("錯誤", f"執行發生例外: {e}")
                self.status_label.configure(text="啟動失敗", text_color="#E74C3C")

        threading.Thread(target=run_scrcpy_thread, daemon=True).start()

    def restart_adb(self):
        threading.Thread(target=lambda: [
            self.adb.run_cmd("kill-server"),
            self.adb.run_cmd("start-server"),
            messagebox.showinfo("ADB", "ADB 服務已重啟")
        ], daemon=True).start()

    def fix_keyboard_input(self):
        """修復注音輸入問題"""
        self.adb.set_keyboard_mode()
        messagebox.showinfo("輸入法修復", "已發送指令修改鍵盤設定。\n\n請在手機/DeX畫面中確認實體鍵盤佈局已設為「注音」。\n(您也可以按 Meta+K 檢查設定)")

    def _on_freeform_toggle(self):
        """freeform 開關切換回調"""
        if self.freeform_var.get():
            self.freeform_status_label.configure(text="將在下次啟動時套用", text_color="#2ECC71")
        else:
            self.freeform_status_label.configure(text="將使用預設視窗模式", text_color="gray")

    def apply_freeform_mode(self):
        """立即套用自由視窗模式到連接的裝置"""
        devices = self.adb.get_devices()
        if not devices:
            messagebox.showwarning("未連接裝置", "請先連接 Samsung 裝置並啟用 USB 偵錯。")
            return

        def _apply():
            self.status_label.configure(text="正在套用視窗化設定...", text_color="#F39C12")

            success = self.adb.enable_freeform_windows()

            if success:
                self.freeform_status_label.configure(text="✓ 已啟用自由視窗模式", text_color="#2ECC71")
                self.status_label.configure(text="視窗化設定已套用", text_color="#2ECC71")
                messagebox.showinfo(
                    "視窗化已啟用",
                    "自由視窗模式已成功啟用！\n\n"
                    "效果說明：\n"
                    "• APP 可自由調整視窗大小\n"
                    "• APP 可拖曳移動位置\n"
                    "• 不再強制最大化\n\n"
                    "提示：部分 APP 可能需要重新開啟才會生效。\n"
                    "若仍無效，請嘗試開啟「停用 VD 系統裝飾」選項後重新啟動 DeX。"
                )
            else:
                self.freeform_status_label.configure(text="✗ 套用失敗", text_color="#E74C3C")
                self.status_label.configure(text="視窗化設定失敗", text_color="#E74C3C")
                messagebox.showerror("套用失敗", "無法套用視窗化設定。\n請確認裝置已正確連接且已授權 USB 偵錯。")

        threading.Thread(target=_apply, daemon=True).start()

    def restore_default_window_mode(self):
        """還原預設視窗模式"""
        devices = self.adb.get_devices()
        if not devices:
            messagebox.showwarning("未連接裝置", "請先連接 Samsung 裝置。")
            return

        self.adb.disable_freeform_windows()
        self.freeform_status_label.configure(text="已還原預設", text_color="gray")
        self.freeform_var.set(False)
        messagebox.showinfo("已還原", "視窗模式已還原為預設值。\n重新啟動 DeX 後生效。")

    def launch_app_in_window(self):
        """以自由視窗模式啟動指定 APP"""
        package = self.app_package_entry.get().strip()
        if not package:
            messagebox.showwarning("缺少套件名稱", "請輸入 APP 的套件名稱（Package Name）。\n\n"
                                    "常用範例：\n"
                                    "• Chrome: com.android.chrome\n"
                                    "• YouTube: com.google.android.youtube\n"
                                    "• Samsung Notes: com.samsung.android.app.notes\n"
                                    "• 設定: com.android.settings")
            return

        devices = self.adb.get_devices()
        if not devices:
            messagebox.showwarning("未連接裝置", "請先連接 Samsung 裝置。")
            return

        # 先確保 freeform 已啟用
        self.adb.enable_freeform_windows()

        success = self.adb.launch_app_freeform(package)
        if success:
            self.status_label.configure(text=f"已啟動: {package.split('.')[-1]}", text_color="#2ECC71")
        else:
            messagebox.showerror("啟動失敗", f"無法啟動 {package}\n請確認套件名稱是否正確。")

    def on_closing(self):
        self.running = False
        self.destroy()

if __name__ == "__main__":
    app = OpenDEXApp()
    app.protocol("WM_DELETE_WINDOW", app.on_closing)
    app.mainloop()

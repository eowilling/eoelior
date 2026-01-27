#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Files 文件管理器自動優化工具
自動執行性能優化、清理和診斷
"""

import os
import sys
import json
import shutil
import subprocess
import platform
from datetime import datetime
from pathlib import Path
import winreg
import ctypes

class FilesOptimizer:
    def __init__(self):
        self.files_data_dir = self.detect_files_directory()
        self.backup_dir = Path.home() / "Desktop" / f"Files_Backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.report = []
        self.is_admin = self.check_admin()
        
    def check_admin(self):
        """檢查是否以管理員權限運行"""
        try:
            return ctypes.windll.shell32.IsUserAnAdmin()
        except:
            return False
    
    def detect_files_directory(self):
        """自動檢測 Files 數據目錄"""
        possible_paths = [
            # UWP 版本路徑
            Path(os.environ.get('LOCALAPPDATA')) / 'Packages' / 'Files_1y0xx7n9077q4' / 'LocalState',
            Path(os.environ.get('LOCALAPPDATA')) / 'Packages' / 'Files.App_1y0xx7n9077q4' / 'LocalState',
            # 傳統版本路徑
            Path(os.environ.get('LOCALAPPDATA')) / 'Files',
            # 用戶可能的自定義路徑
            Path(r'C:\Users\mis02\AppData\Local\Packages\Files_1y0xx7n9077q4\LocalState'),
        ]
        
        for path in possible_paths:
            if path.exists():
                return path
        
        # 如果都找不到，讓用戶手動指定
        print("⚠️  無法自動檢測 Files 目錄")
        custom_path = input("請輸入 Files 數據目錄路徑: ").strip()
        return Path(custom_path) if custom_path else None
    
    def log(self, message, status="INFO"):
        """記錄操作日志"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_entry = f"[{timestamp}] [{status}] {message}"
        self.report.append(log_entry)
        
        # 控制台輸出帶顏色
        colors = {
            "INFO": "\033[94m",      # 藍色
            "SUCCESS": "\033[92m",   # 綠色
            "WARNING": "\033[93m",   # 黃色
            "ERROR": "\033[91m",     # 紅色
            "RESET": "\033[0m"
        }
        
        color = colors.get(status, colors["INFO"])
        print(f"{color}{log_entry}{colors['RESET']}")
    
    def create_backup(self):
        """備份當前配置"""
        try:
            self.backup_dir.mkdir(parents=True, exist_ok=True)
            
            files_to_backup = [
                'settings.json',
                'bundles.json',
                'last_session.json',
                'crashed_tabs.json'
            ]
            
            backup_count = 0
            for filename in files_to_backup:
                source = self.files_data_dir / filename
                if source.exists():
                    shutil.copy2(source, self.backup_dir / filename)
                    backup_count += 1
            
            self.log(f"✅ 已備份 {backup_count} 個文件到: {self.backup_dir}", "SUCCESS")
            return True
        except Exception as e:
            self.log(f"❌ 備份失敗: {str(e)}", "ERROR")
            return False
    
    def optimize_settings(self):
        """優化 settings.json 配置"""
        settings_file = self.files_data_dir / 'settings.json'
        
        try:
            # 讀取現有設置
            if settings_file.exists():
                with open(settings_file, 'r', encoding='utf-8') as f:
                    settings = json.load(f)
                self.log("📖 已讀取現有設置", "INFO")
            else:
                settings = {}
                self.log("📝 創建新設置文件", "INFO")
            
            # 性能優化配置
            optimizations = {
                "Performance": {
                    "MaxVisibleItems": 500,
                    "EnableVirtualization": True,
                    "LazyLoadingEnabled": True
                },
                "PdfPreviewMaxPages": 20,
                "MaxPreviewSizeMB": 10,
                "Appearance": {
                    "IconSize": "Small",
                    "ShowThumbnails": False,
                    "UseHardwareAcceleration": False
                },
                "Advanced": {
                    "EnableDetailedLogging": False,
                    "CacheSize": 100
                }
            }
            
            # 合併設置
            for key, value in optimizations.items():
                if isinstance(value, dict):
                    if key not in settings:
                        settings[key] = {}
                    settings[key].update(value)
                else:
                    settings[key] = value
            
            # 寫入優化後的設置
            with open(settings_file, 'w', encoding='utf-8') as f:
                json.dump(settings, f, indent=2, ensure_ascii=False)
            
            self.log("✅ 設置優化完成", "SUCCESS")
            return True
            
        except Exception as e:
            self.log(f"❌ 設置優化失敗: {str(e)}", "ERROR")
            return False
    
    def clean_logs(self):
        """清理過大的日志文件"""
        try:
            log_files = list(self.files_data_dir.glob('*.log'))
            cleaned_size = 0
            cleaned_count = 0
            
            for log_file in log_files:
                size_mb = log_file.stat().st_size / (1024 * 1024)
                
                if size_mb > 50:  # 大於 50MB 的日志清理
                    cleaned_size += size_mb
                    log_file.unlink()
                    cleaned_count += 1
                    self.log(f"🗑️  清理日志: {log_file.name} ({size_mb:.2f} MB)", "INFO")
            
            if cleaned_count > 0:
                self.log(f"✅ 已清理 {cleaned_count} 個日志文件，釋放 {cleaned_size:.2f} MB", "SUCCESS")
            else:
                self.log("ℹ️  沒有需要清理的日志文件", "INFO")
            
            return True
        except Exception as e:
            self.log(f"❌ 日志清理失敗: {str(e)}", "ERROR")
            return False
    
    def clean_crash_data(self):
        """清理崩潰恢復數據"""
        try:
            crash_files = [
                'last_session.json',
                'crashed_tabs.json',
                'crash_dump.dmp'
            ]
            
            cleaned_count = 0
            for filename in crash_files:
                crash_file = self.files_data_dir / filename
                if crash_file.exists():
                    crash_file.unlink()
                    cleaned_count += 1
                    self.log(f"🗑️  清理崩潰數據: {filename}", "INFO")
            
            if cleaned_count > 0:
                self.log(f"✅ 已清理 {cleaned_count} 個崩潰文件", "SUCCESS")
            else:
                self.log("ℹ️  沒有崩潰數據需要清理", "INFO")
            
            return True
        except Exception as e:
            self.log(f"❌ 崩潰數據清理失敗: {str(e)}", "ERROR")
            return False
    
    def check_disk_space(self):
        """檢查磁盤空間"""
        try:
            drive = Path(self.files_data_dir).drive
            if not drive:
                drive = "C:"
            
            result = subprocess.run(
                ['powershell', '-Command', f'Get-PSDrive {drive[0]} | Select-Object Used,Free | ConvertTo-Json'],
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                disk_info = json.loads(result.stdout)
                free_gb = disk_info['Free'] / (1024**3)
                
                if free_gb < 10:
                    self.log(f"⚠️  磁盤空間不足: {free_gb:.2f} GB 可用", "WARNING")
                else:
                    self.log(f"✅ 磁盤空間充足: {free_gb:.2f} GB 可用", "SUCCESS")
                
                return True
        except Exception as e:
            self.log(f"⚠️  無法檢查磁盤空間: {str(e)}", "WARNING")
            return False
    
    def check_dotnet_runtime(self):
        """檢查 .NET 運行時版本"""
        try:
            result = subprocess.run(
                ['dotnet', '--list-runtimes'],
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                runtimes = result.stdout
                if 'Microsoft.NETCore.App' in runtimes:
                    self.log("✅ .NET 運行時已安裝", "SUCCESS")
                    
                    # 檢查是否有 8.0 版本
                    if '8.0' in runtimes:
                        self.log("✅ 檢測到 .NET 8.0 運行時", "SUCCESS")
                    else:
                        self.log("⚠️  建議安裝 .NET 8.0 運行時", "WARNING")
                return True
            else:
                self.log("⚠️  未檢測到 .NET 運行時", "WARNING")
                return False
        except FileNotFoundError:
            self.log("⚠️  未安裝 .NET 運行時", "WARNING")
            return False
        except Exception as e:
            self.log(f"⚠️  無法檢查 .NET 運行時: {str(e)}", "WARNING")
            return False
    
    def optimize_windows_search(self):
        """重啟 Windows 搜索服務以提升性能"""
        if not self.is_admin:
            self.log("⚠️  需要管理員權限才能重啟搜索服務", "WARNING")
            return False
        
        try:
            self.log("🔄 正在重啟 Windows Search 服務...", "INFO")
            subprocess.run(['net', 'stop', 'WSearch'], capture_output=True)
            subprocess.run(['net', 'start', 'WSearch'], capture_output=True)
            self.log("✅ Windows Search 服務已重啟", "SUCCESS")
            return True
        except Exception as e:
            self.log(f"⚠️  無法重啟搜索服務: {str(e)}", "WARNING")
            return False
    
    def generate_diagnostic_report(self):
        """生成診斷報告"""
        try:
            report_file = Path.home() / "Desktop" / f"Files_Diagnostic_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
            
            with open(report_file, 'w', encoding='utf-8') as f:
                f.write("=" * 60 + "\n")
                f.write("Files 文件管理器診斷報告\n")
                f.write("=" * 60 + "\n\n")
                f.write(f"生成時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"Files 數據目錄: {self.files_data_dir}\n")
                f.write(f"Windows 版本: {platform.platform()}\n")
                f.write(f"Python 版本: {sys.version}\n")
                f.write(f"管理員權限: {'是' if self.is_admin else '否'}\n\n")
                
                f.write("=" * 60 + "\n")
                f.write("優化操作日志\n")
                f.write("=" * 60 + "\n\n")
                
                for entry in self.report:
                    f.write(entry + "\n")
                
                # 文件列表
                f.write("\n" + "=" * 60 + "\n")
                f.write("Files 數據目錄內容\n")
                f.write("=" * 60 + "\n\n")
                
                if self.files_data_dir and self.files_data_dir.exists():
                    for item in self.files_data_dir.iterdir():
                        if item.is_file():
                            size_mb = item.stat().st_size / (1024 * 1024)
                            f.write(f"{item.name:<40} {size_mb:>10.2f} MB\n")
            
            self.log(f"📊 診斷報告已生成: {report_file}", "SUCCESS")
            return report_file
            
        except Exception as e:
            self.log(f"❌ 無法生成診斷報告: {str(e)}", "ERROR")
            return None
    
    def run_full_optimization(self):
        """執行完整優化流程"""
        print("\n" + "=" * 60)
        print("🚀 Files 文件管理器自動優化工具")
        print("=" * 60 + "\n")
        
        if not self.files_data_dir or not self.files_data_dir.exists():
            self.log("❌ 無法找到 Files 數據目錄，請檢查安裝", "ERROR")
            return False
        
        self.log(f"📂 檢測到 Files 目錄: {self.files_data_dir}", "INFO")
        
        # 確認執行
        print("\n即將執行以下優化操作:")
        print("  1. 備份當前配置")
        print("  2. 優化性能設置")
        print("  3. 清理日志文件")
        print("  4. 清理崩潰數據")
        print("  5. 檢查系統狀態")
        print("  6. 生成診斷報告")
        
        confirm = input("\n是否繼續? (Y/N): ").strip().upper()
        if confirm != 'Y':
            print("❌ 操作已取消")
            return False
        
        print("\n" + "=" * 60)
        print("開始優化...")
        print("=" * 60 + "\n")
        
        # 執行優化步驟
        steps = [
            ("備份配置", self.create_backup),
            ("優化設置", self.optimize_settings),
            ("清理日志", self.clean_logs),
            ("清理崩潰數據", self.clean_crash_data),
            ("檢查磁盤空間", self.check_disk_space),
            ("檢查 .NET 運行時", self.check_dotnet_runtime),
        ]
        
        success_count = 0
        for step_name, step_func in steps:
            print(f"\n{'━' * 60}")
            print(f"📋 {step_name}")
            print(f"{'━' * 60}")
            if step_func():
                success_count += 1
        
        # 可選的管理員操作
        if self.is_admin:
            print(f"\n{'━' * 60}")
            print(f"📋 優化 Windows 搜索")
            print(f"{'━' * 60}")
            self.optimize_windows_search()
        
        # 生成報告
        print(f"\n{'━' * 60}")
        print(f"📋 生成診斷報告")
        print(f"{'━' * 60}")
        report_file = self.generate_diagnostic_report()
        
        # 總結
        print("\n" + "=" * 60)
        print("📊 優化完成統計")
        print("=" * 60)
        print(f"✅ 成功完成: {success_count}/{len(steps)} 項")
        print(f"📁 備份位置: {self.backup_dir}")
        if report_file:
            print(f"📊 診斷報告: {report_file}")
        print("=" * 60 + "\n")
        
        self.log("🎉 所有優化操作已完成", "SUCCESS")
        
        # 提示重啟
        print("\n💡 建議:")
        print("  1. 重啟 Files 應用以應用更改")
        print("  2. 如遇問題可使用備份恢復配置")
        print("  3. 查看診斷報告了解詳細信息")
        
        return True

def interactive_menu():
    """交互式菜單"""
    optimizer = FilesOptimizer()
    
    while True:
        print("\n" + "=" * 60)
        print("🔧 Files 優化工具 - 主菜單")
        print("=" * 60)
        print("\n選擇操作:")
        print("  1. 執行完整優化 (推薦)")
        print("  2. 僅優化設置")
        print("  3. 僅清理日志")
        print("  4. 僅清理崩潰數據")
        print("  5. 系統診斷")
        print("  6. 生成診斷報告")
        print("  0. 退出")
        
        choice = input("\n請輸入選項 (0-6): ").strip()
        
        if choice == '1':
            optimizer.run_full_optimization()
        elif choice == '2':
            optimizer.create_backup()
            optimizer.optimize_settings()
        elif choice == '3':
            optimizer.create_backup()
            optimizer.clean_logs()
        elif choice == '4':
            optimizer.create_backup()
            optimizer.clean_crash_data()
        elif choice == '5':
            optimizer.check_disk_space()
            optimizer.check_dotnet_runtime()
        elif choice == '6':
            optimizer.generate_diagnostic_report()
        elif choice == '0':
            print("\n👋 再見!")
            break
        else:
            print("\n❌ 無效選項，請重新選擇")
        
        input("\n按 Enter 鍵繼續...")

def main():
    """主函數"""
    try:
        # 檢查是否在 Windows 上運行
        if platform.system() != 'Windows':
            print("❌ 此工具僅支持 Windows 系統")
            sys.exit(1)
        
        # 檢查命令行參數
        if len(sys.argv) > 1:
            if sys.argv[1] in ['-h', '--help', 'help', '/?']:
                print("Files 優化工具 - 使用說明")
                print("\n用法:")
                print("  python files_auto_optimizer.py          # 交互式菜單")
                print("  python files_auto_optimizer.py --auto   # 自動執行完整優化")
                print("  python files_auto_optimizer.py --help   # 顯示幫助")
                sys.exit(0)
            elif sys.argv[1] == '--auto':
                optimizer = FilesOptimizer()
                optimizer.run_full_optimization()
                sys.exit(0)
        
        # 啟動交互式菜單
        interactive_menu()
        
    except KeyboardInterrupt:
        print("\n\n❌ 操作已被用戶中斷")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ 發生錯誤: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()

import os
import sys
import ctypes
import subprocess
import time

def is_admin():
    """檢查是否以管理員權限執行"""
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def run_as_admin():
    """以管理員權限重新執行程式"""
    try:
        if sys.argv[-1] != 'asadmin':
            script = os.path.abspath(sys.argv[0])
            params = ' '.join([script] + sys.argv[1:] + ['asadmin'])
            ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, params, None, 1)
            sys.exit(0)
    except:
        print("[錯誤] 無法取得管理員權限")
        sys.exit(1)

def clear_screen():
    """清除螢幕"""
    os.system('cls' if os.name == 'nt' else 'clear')

def run_command(command, show_output=True):
    """執行系統命令"""
    try:
        if show_output:
            result = subprocess.run(command, shell=True, capture_output=False)
        else:
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
        return result.returncode == 0
    except Exception as e:
        print(f"[錯誤] {str(e)}")
        return False

def restart_service():
    """重新啟動藍牙服務"""
    clear_screen()
    print("=" * 40)
    print("  重新啟動藍牙服務")
    print("=" * 40)
    print()

    print("停止服務...")
    run_command("net stop bthserv /y", show_output=False)
    run_command("net stop DeviceAssociationService /y", show_output=False)

    time.sleep(2)

    print("啟動服務...")
    run_command("net start DeviceAssociationService")
    run_command("net start bthserv")

    print()
    print("[完成] 服務已重新啟動")
    input("\n按 Enter 繼續...")

def toggle_device():
    """停用/啟用藍牙裝置"""
    clear_screen()
    print("=" * 40)
    print("  停用/啟用藍牙裝置")
    print("=" * 40)
    print()

    print("正在停用藍牙裝置...")
    cmd = "Get-PnpDevice -Class Bluetooth | Where-Object {$_.Status -eq 'OK'} | Disable-PnpDevice -Confirm:$false"
    run_command(f'powershell -command "{cmd}"', show_output=False)
    print("[完成] 藍牙裝置已停用")

    time.sleep(3)

    print("\n正在啟用藍牙裝置...")
    cmd = "Get-PnpDevice -Class Bluetooth | Where-Object {$_.Status -ne 'OK'} | Enable-PnpDevice -Confirm:$false"
    run_command(f'powershell -command "{cmd}"', show_output=False)
    print("[完成] 藍牙裝置已啟用")

    input("\n按 Enter 繼續...")

def check_status():
    """檢查藍牙狀態"""
    clear_screen()
    print("=" * 40)
    print("  藍牙狀態檢查")
    print("=" * 40)
    print()

    print("[服務狀態]")
    run_command('sc query bthserv | findstr "STATE"')
    run_command('sc query DeviceAssociationService | findstr "STATE"')

    print("\n[藍牙裝置]")
    cmd = "Get-PnpDevice -Class Bluetooth | Format-Table -AutoSize"
    run_command(f'powershell -command "{cmd}"')

    input("\n按 Enter 繼續...")

def full_reset():
    """完整重置（清除所有配對）"""
    clear_screen()
    print("=" * 40)
    print("  完整重置 (清除所有配對)")
    print("=" * 40)
    print()
    print("警告: 此操作將清除所有藍牙配對裝置")

    confirm = input("確定要繼續嗎? (Y/N): ").strip().upper()
    if confirm != 'Y':
        return

    if not is_admin():
        print("\n[錯誤] 請用「系統管理員身分」執行此程式")
        input("\n按 Enter 繼續...")
        return

    clear_screen()
    print("=" * 40)
    print("  執行完整重置中...")
    print("=" * 40)
    print()

    print("停止藍牙相關服務...")
    run_command("net stop bthserv /y", show_output=False)
    run_command("net stop DeviceAssociationService /y", show_output=False)

    print("\n刪除藍牙配對資料夾...")
    bt_folder = r"C:\ProgramData\Microsoft\Bluetooth"
    if os.path.exists(bt_folder):
        run_command(f'takeown /f "{bt_folder}" /r /d y', show_output=False)
        run_command(f'icacls "{bt_folder}" /grant administrators:F /t', show_output=False)
        run_command(f'rd /s /q "{bt_folder}"', show_output=False)
        print("  [完成] 配對資料夾已刪除")
    else:
        print("  [略過] 配對資料夾不存在")

    print("\n刪除藍牙登錄檔配對資訊...")
    reg_path = r"HKLM\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Devices"
    result = subprocess.run(f'reg query "{reg_path}"', shell=True, capture_output=True)
    if result.returncode == 0:
        run_command(f'reg delete "{reg_path}" /f', show_output=False)
        print("  [完成] 登錄檔配對資訊已刪除")
    else:
        print("  [略過] 登錄檔無配對資訊")

    print("\n重新啟動服務...")
    run_command("net start DeviceAssociationService")
    run_command("net start bthserv")

    print("\n重新啟用所有藍牙裝置...")
    cmd = "Get-PnpDevice -Class Bluetooth | Where-Object {$_.Status -eq 'OK'} | Disable-PnpDevice -Confirm:$false"
    run_command(f'powershell -command "{cmd}"', show_output=False)
    print("  [完成] 藍牙裝置已停用")

    time.sleep(2)

    cmd = "Get-PnpDevice -Class Bluetooth | Where-Object {$_.Status -ne 'OK'} | Enable-PnpDevice -Confirm:$false"
    run_command(f'powershell -command "{cmd}"', show_output=False)
    print("  [完成] 藍牙裝置已啟用")

    print()
    print("=" * 40)
    print("  所有藍牙配對已清除完成")
    print("  建議重新開機以確保完全生效")
    print("=" * 40)

    input("\n按 Enter 繼續...")

def show_menu():
    """顯示主選單"""
    clear_screen()
    print("=" * 40)
    print("  藍牙重置工具")
    print("=" * 40)
    print()
    print("1. 重新啟動藍牙服務")
    print("2. 停用/啟用藍牙裝置")
    print("3. 檢查藍牙狀態")
    print("4. 完整重置 (清除所有配對)")
    print("0. 離開")
    print()

def main():
    """主程式"""
    while True:
        show_menu()
        choice = input("請選擇 (0-4): ").strip()

        if choice == '1':
            restart_service()
        elif choice == '2':
            toggle_device()
        elif choice == '3':
            check_status()
        elif choice == '4':
            full_reset()
        elif choice == '0':
            break
        else:
            print("\n無效的選擇，請重新輸入")
            time.sleep(1)

if __name__ == "__main__":
    # 檢查管理員權限，如果沒有就自動請求
    if not is_admin():
        run_as_admin()

    try:
        main()
    except KeyboardInterrupt:
        print("\n\n程式已中斷")
        sys.exit(0)

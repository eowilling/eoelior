# 高鐵搶票程式啟動腳本
# 雙擊執行此檔案即可啟動監控程式

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     高鐵搶票小幫手啟動中..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 切換到程式所在目錄
Set-Location "C:\xampp\htdocs\eoelior\IRS"

# 執行 Python 腳本
python thsr_booking_assistant.py

# 執行完畢後暫停，讓視窗保持開啟
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "按任意鍵關閉視窗..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

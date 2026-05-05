@echo off
:: 強制 CMD 使用 UTF-8 編碼，解決亂碼問題
chcp 65001 >nul

set "PY_PATH=C:\xampp\htdocs\eoelior\bakauto\auto_backup.py"

:: 檢查檔案是否存在
if not exist "%PY_PATH%" (
    echo [錯誤] 找不到 Python 檔案: %PY_PATH%
    pause
    exit
)

:: 切換到 bat 所在的資料夾
cd /d "%~dp0"

:: 執行 Python
python "%PY_PATH%"

echo.
echo 備份作業已完全結束。
pause

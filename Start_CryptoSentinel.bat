@echo off
chcp 65001
title CryptoSentinel Launcher
echo ===================================================
echo      CryptoSentinel 智能哨兵系統啟動中...
echo ===================================================

echo [1/3] 正在檢查並安裝依賴套件...
pip install -r CryptoSentinel/requirements.txt
if %errorlevel% neq 0 (
    echo [錯誤] 套件安裝失敗！請檢查 Python 環境。
    pause
    exit /b
)

echo [2/3] 啟動網頁伺服器...
start http://127.0.0.1:5001
python CryptoSentinel/app.py

pause

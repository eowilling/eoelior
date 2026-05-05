@echo off
chcp 65001
title AlphaBox Launcher
echo ===================================================
echo      AlphaBox 全能監控系統 啟動中...
echo ===================================================

cd /d %~dp0

echo [1/2] 正在檢查並安裝依賴套件...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [錯誤] 套件安裝失敗！請檢查 Python 環境。
    pause
    exit /b
)

echo [2/2] 啟動 AlphaBox 桌面介面...
python main.py
pause

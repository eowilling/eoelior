@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title QR Code 增強工具 - 啟動器

:main
cls
echo.
echo  ================================================================
echo.
echo     ██████╗ ██████╗     ███████╗ ██████╗ █████╗ ███╗   ██╗
echo    ██╔═══██╗██╔══██╗    ██╔════╝██╔════╝██╔══██╗████╗  ██║
echo    ██║   ██║██████╔╝    ███████╗██║     ███████║██╔██╗ ██║
echo    ██║▄▄ ██║██╔══██╗    ╚════██║██║     ██╔══██║██║╚██╗██║
echo    ╚██████╔╝██║  ██║    ███████║╚██████╗██║  ██║██║ ╚████║
echo     ╚══▀▀═╝ ╚═╝  ╚═╝    ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝
echo.
echo  ================================================================
echo         QR Code Enhancement System v2.0 - Launcher
echo  ================================================================
echo.

:: 檢查 Python 是否存在
python --version >nul 2>&1
ifCodeMarkdownLanguage errorlevel 1 (
    echo  [!] 警告: 未檢測到 Python 環境
    echo      本工具需要 Python 3.8 或更高版本才能運行。
    echo.
) else (
    for /f "tokens=*" %%i in ('python --version') do set PYTHON_VER=%%i
    echo  [+] 環境檢測: !PYTHON_VER!
    echo.
)

echo  請選擇操作:
echo.
echo    [1] 🚀 啟動 Python 圖形工具 (推薦)
echo    [2] 📦 安裝/修復依賴庫
echo    [3] 📖 打開使用指南 (index.html)
echo    [4] 📄 閱讀詳細文檔 (Markdown)
echo    [5] ❌ 退出
echo.
set /p choice="  請輸入選項 [1-5]: "

if "%choice%"=="1" goto python_tool
if "%choice%"=="2" goto install_deps
if "%choice%"=="3" goto show_index
if "%choice%"=="4" goto show_readme
if "%choice%"=="5" goto end
goto main

:python_tool
cls
echo.
echo  ========================================
echo    正在啟動 Python 改良版工具...
echo  ========================================
echo.
python qr_enhancer_tool_enhanced.py
if errorlevel 1 (
    echo.
    echo  [X] 啟動失敗!
    echo.
    echo  可能原因:
    echo   1. 未安裝依賴庫 (請嘗試選項 [2])
    echo   2. Python 環境變數未設定
    echo.
    pause
)
goto main

:install_deps
cls
echo.
echo  ========================================
echo    正在安裝 Python 依賴庫...
echo  ========================================
echo.
echo  執行: pip install -r requirements.txt
echo.
pip install -r requirements.txt
if errorlevel 1 (
    echo.
    echo  [X] 安裝過程中出現錯誤。
    echo      請檢查網路連線或 Python 安裝狀態。
) else (
    echo.
    echo  [V] 依賴庫安裝完成!
)
pause
goto main

:show_index
echo.
echo  正在瀏覽器中打開使用指南...
start index.html
goto main

:show_readme
echo.
echo  正在打開詳細文檔...
start README_ENHANCED.md
goto main

:end
echo.
echo  感謝使用! 再見~
timeout /t 2 >nul
exit

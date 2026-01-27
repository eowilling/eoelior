@echo off
chcp 65001 >nul
echo ========================================
echo    QR碼解碼工具 - 增強版
echo ========================================
echo.

:menu
echo 請選擇要啟動的工具:
echo.
echo [1] Python圖形工具 (推薦)
echo [2] 安裝Python依賴
echo [3] 查看安裝與使用指南 (網頁)
echo [4] 查看詳細說明書 (Markdown)
echo [5] 退出
echo.
set /p choice="請輸入選項 (1-5): "

if "%choice%"=="1" goto python_tool
if "%choice%"=="2" goto install_deps
if "%choice%"=="3" goto show_index
if "%choice%"=="4" goto show_readme
if "%choice%"=="5" goto end
goto menu

:python_tool
echo.
echo 正在啟動Python工具...
echo.
python qr_enhancer_tool_enhanced.py
if errorlevel 1 (
    echo.
    echo ❌ 啟動失敗! 可能原因:
    echo 1. Python未安裝或未加入PATH
    echo 2. 缺少依賴庫
    echo.
    echo 請選擇選項3安裝依賴,或查看README_ENHANCED.md
    pause
)
goto menu

:show_index
echo.
echo 正在瀏覽器中打開使用指南...
start index.html
echo.
pause
goto menu

:install_deps
echo.
echo 正在安裝Python依賴...
echo.
pip install -r requirements.txt
if errorlevel 1 (
    echo.
    echo ❌ 安裝失敗! 請檢查:
    echo 1. Python和pip是否正確安裝
    echo 2. 網絡連接是否正常
    echo.
) else (
    echo.
    echo ✅ 依賴安裝完成!
    echo.
)
pause
goto menu

:show_readme
echo.
echo 正在打開使用說明...
start README_ENHANCED.md
pause
goto menu

:end
echo.
echo 感謝使用! 再見~
echo.
timeout /t 2 >nul
exit

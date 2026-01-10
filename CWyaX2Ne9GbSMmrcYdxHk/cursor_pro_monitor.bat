@echo off
chcp 65001 >nul
title Cursor PRO 监控工具
echo ==============================================
echo 🔍 Cursor PRO 监控工具 v1.0
echo 📡 实时监控并自动修复Pro功能
echo ==============================================
echo.
echo 📋 功能说明：
echo - 实时监控Cursor运行状态
echo - 自动检测Pro功能是否受限
echo - 自动重置Pro功能
echo - 可最小化到托盘运行
echo.
echo ℹ️  按 Ctrl+C 退出监控
echo.
:MONITOR_LOOP
:: 检查Cursor是否运行
tasklist /fi "imagename eq Cursor.exe" | findstr "Cursor.exe" >nul
if errorlevel 1 (
    echo ⏳ 等待Cursor启动...
    timeout /t 5 /nobreak >nul
    goto MONITOR_LOOP
)
echo ✅ Cursor正在运行，监控中...
timeout /t 30 /nobreak >nul
:: 检查设置文件
set "SETTINGS_PATH=%USERPROFILE%\AppData\Roaming\Cursor\User\settings.json"
if exist "%SETTINGS_PATH%" (
    python -c "import json; import os; settings_path = os.path.expanduser('~') + '\\AppData\\Roaming\\Cursor\\User\\settings.json'; if os.path.exists(settings_path): with open(settings_path, 'r', encoding='utf-8') as f: settings = json.load(f); if not settings.get('cursor.pro', False) or not settings.get('cursor.hasAccess', False): print('⚠️  Pro功能已受限，需要重置'); exit(1); else: print('✅ Pro功能正常')"
    if errorlevel 1 (
        echo ⚠️  检测到Pro功能受限，正在重置...
        call "cursor_pro_auto_reset.bat"
    )
) else (
    echo ❌ 设置文件不存在
)
goto MONITOR_LOOP

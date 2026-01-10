@echo off
chcp 65001 >nul
title Cursor 网络问题一键修复工具

color 0A
echo.
echo ╔════════════════════════════════════════════════╗
echo ║     Cursor 网络问题一键修复工具               ║
echo ╚════════════════════════════════════════════════╝
echo.
echo 根据诊断结果：您的网络可以直连，不需要代理！
echo.
echo 此工具将：
echo  ✓ 清理 Cursor 代理配置
echo  ✓ 清除缓存文件
echo  ✓ 重置网络设置
echo.
echo ════════════════════════════════════════════════
echo.

pause
echo.

echo [步骤 1/4] 正在检查 Cursor 是否运行中...
tasklist | find /i "Cursor.exe" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  检测到 Cursor 正在运行！
    echo.
    echo 请先关闭 Cursor，然后按任意键继续...
    pause >nul
    goto :check_again
) else (
    echo ✓ Cursor 未运行
)

:check_again
tasklist | find /i "Cursor.exe" >nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo ❌ Cursor 仍在运行，请关闭后重试
    timeout /t 3 >nul
    goto :check_again
)

echo.
echo [步骤 2/4] 正在备份当前配置...
set CURSOR_PATH=%APPDATA%\Cursor

if exist "%CURSOR_PATH%" (
    set BACKUP_PATH=%USERPROFILE%\Desktop\Cursor_Backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
    set BACKUP_PATH=%BACKUP_PATH: =0%
    mkdir "!BACKUP_PATH!" 2>nul

    if exist "%CURSOR_PATH%\User\settings.json" (
        copy "%CURSOR_PATH%\User\settings.json" "!BACKUP_PATH!\" >nul 2>&1
        echo ✓ 配置已备份到桌面
    ) else (
        echo ⚠️  未找到配置文件
    )
) else (
    echo ⚠️  未找到 Cursor 配置文件夹
    echo    Cursor 可能未安装或安装在非标准位置
)

echo.
echo [步骤 3/4] 正在清理缓存和配置...

:: 清理缓存
if exist "%CURSOR_PATH%\Cache" (
    rd /s /q "%CURSOR_PATH%\Cache" 2>nul
    echo ✓ Cache 已清理
)

if exist "%CURSOR_PATH%\CachedData" (
    rd /s /q "%CURSOR_PATH%\CachedData" 2>nul
    echo ✓ CachedData 已清理
)

if exist "%CURSOR_PATH%\GPUCache" (
    rd /s /q "%CURSOR_PATH%\GPUCache" 2>nul
    echo ✓ GPUCache 已清理
)

if exist "%CURSOR_PATH%\Code Cache" (
    rd /s /q "%CURSOR_PATH%\Code Cache" 2>nul
    echo ✓ Code Cache 已清理
)

echo.
echo [步骤 4/4] 正在创建干净的网络配置...

:: 创建推荐配置文件
set SETTINGS_FILE=%CURSOR_PATH%\User\settings.json

if not exist "%CURSOR_PATH%\User" mkdir "%CURSOR_PATH%\User"

:: 检查是否已有配置
if exist "%SETTINGS_FILE%" (
    echo.
    echo 检测到现有配置文件
    echo.
    echo 请选择操作：
    echo  [1] 追加网络配置（保留其他设置）
    echo  [2] 创建全新配置（覆盖现有配置）
    echo  [3] 跳过配置修改
    echo.
    choice /c 123 /n /m "请选择 [1/2/3]: "

    if errorlevel 3 goto :skip_settings
    if errorlevel 2 goto :new_settings
    if errorlevel 1 goto :append_settings
)

:new_settings
echo.
(
    echo {
    echo   "http.proxy": "",
    echo   "http.proxySupport": "off",
    echo   "http.proxyStrictSSL": true,
    echo   "http.timeout": 30000,
    echo   "http.systemCertificates": true
    echo }
) > "%SETTINGS_FILE%"
echo ✓ 已创建新的网络配置
goto :skip_settings

:append_settings
echo.
echo ℹ️  请手动添加以下配置到 settings.json：
echo.
echo   "http.proxy": "",
echo   "http.proxySupport": "off",
echo   "http.proxyStrictSSL": true
echo.
echo 位置: %SETTINGS_FILE%
echo.

:skip_settings

echo.
echo ════════════════════════════════════════════════
echo.
echo ✅ 修复完成！
echo.
echo 下一步操作：
echo  1. 启动 Cursor
echo  2. 测试网络连接是否正常
echo  3. 如仍有问题，请查看 fix_cursor_network.md
echo.
echo ════════════════════════════════════════════════
echo.
echo 是否要打开配置文件检查？[Y/N]
choice /c YN /n /m ""

if errorlevel 2 goto :end
if errorlevel 1 (
    if exist "%SETTINGS_FILE%" (
        notepad "%SETTINGS_FILE%"
    ) else (
        echo 配置文件不存在
    )
)

:end
echo.
echo 按任意键退出...
pause >nul

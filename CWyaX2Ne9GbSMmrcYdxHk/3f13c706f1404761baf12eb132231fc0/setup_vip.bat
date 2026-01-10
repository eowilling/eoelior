@echo off
chcp 65001 >nul
title Cursor Free VIP 快速配置工具
color 0A
echo.
echo    ██████╗ █████╗ ███████╗███████╗    ██████╗  ██████╗ ██████╗ ███████╗
echo    ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██╔════╝
echo    ██████╔╝███████║███████╗███████╗    ██████╔╝██████╔╝██████╔╝███████╗
echo    ██╔═══╝ ██╔══██║╚════██║╚════██║    ██╔═══╝ ██╔══██╗██╔══██╗╚════██║
echo    ██║     ██║  ██║███████║███████║    ██║     ██║  ██║██║  ██║███████║
echo    ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
echo.
echo    [Cursor Free VIP 自动化配置工具 v1.0]
echo    作者: AI助手 | 仅供学习交流使用
echo.
echo ===========================================
set CONFIG_DIR=%APPDATA%\Cursor
set USER_DIR=%CONFIG_DIR%\User
echo [1/5] 检查Cursor安装状态...
if not exist "%CONFIG_DIR%" (
    echo ❌ 错误: 未找到Cursor配置目录
    echo    路径: %CONFIG_DIR%
    echo    请先安装Cursor编辑器
    pause
    exit /b 1
)
echo ✅ Cursor配置目录存在
echo.
echo [2/5] 备份现有配置...
set TIMESTAMP=%date:~-4,4%%date:~-7,2%%date:~-10,2%_%time:~0,2%%time:~3,2%
set BACKUP_DIR=%CONFIG_DIR%\backup\%TIMESTAMP%
mkdir "%BACKUP_DIR%" 2>nul
if exist "%USER_DIR%\settings.json" (
    copy "%USER_DIR%\settings.json" "%BACKUP_DIR%\" >nul
    echo ✅ 已备份settings.json到backup目录
) else (
    echo ⚠️  未找到现有配置，将创建新配置
)
echo.
echo [3/5] 生成用户标识...
set /p EXISTING_USER_ID=<"%CONFIG_DIR%\user_id.txt" 2>nul
if "%EXISTING_USER_ID%"=="" (
    set USER_ID=%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%
    echo %USER_ID% > "%CONFIG_DIR%\user_id.txt"
    echo ✅ 生成新用户ID: %USER_ID%
) else (
    set USER_ID=%EXISTING_USER_ID%
    echo ✅ 使用现有用户ID: %USER_ID%
)
echo.
echo [4/5] 创建VIP配置文件...
mkdir "%USER_DIR%" 2>nul
set VIP_FILE=%USER_DIR%\vip_config.json
(
echo {
echo   "user_id": "%USER_ID%",
echo   "is_vip": true,
echo   "vip_level": "pro",
echo   "expiry_date": "2099-12-31",
echo   "features": [
echo     "unlimited_completions",
echo     "advanced_models",
echo     "priority_support",
echo     "custom_themes",
echo     "team_collaboration"
echo   ],
echo   "license_key": "FREE-VIP-%USER_ID:~0,8%",
echo   "activated_at": "%date% %time%",
echo   "version": "1.0"
echo }
) > "%VIP_FILE%"
echo ✅ VIP配置文件已创建
echo.
echo [5/5] 更新settings.json...
set SETTINGS_FILE=%USER_DIR%\settings.json
if exist "%SETTINGS_FILE%" (
    powershell -Command ^
        "$config = Get-Content '%SETTINGS_FILE%' | ConvertFrom-Json;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.vip.activated' -Value $true -Force;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.vip.level' -Value 'pro' -Force;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.vip.expiry' -Value '2099-12-31' -Force;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.ai.enableAdvancedModels' -Value $true -Force;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.ai.unlimitedCompletions' -Value $true -Force;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.pro.enabled' -Value $true -Force;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.pro.maxCompletions' -Value 999999 -Force;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.pro.maxChatMessages' -Value 999999 -Force;" ^
        "$config | Add-Member -MemberType NoteProperty -Name 'cursor.pro.prioritySupport' -Value $true -Force;" ^
        "$config | ConvertTo-Json -Depth 10 | Set-Content '%SETTINGS_FILE%'"
) else (
    (
    echo {
    echo   "cursor.vip.activated": true,
    echo   "cursor.vip.level": "pro",
    echo   "cursor.vip.expiry": "2099-12-31",
    echo   "cursor.ai.enableAdvancedModels": true,
    echo   "cursor.ai.unlimitedCompletions": true,
    echo   "cursor.pro.enabled": true,
    echo   "cursor.pro.maxCompletions": 999999,
    echo   "cursor.pro.maxChatMessages": 999999,
    echo   "cursor.pro.prioritySupport": true,
    echo   "editor.tabSize": 4,
    echo   "editor.insertSpaces": true,
    echo   "files.autoSave": "afterDelay",
    echo   "files.autoSaveDelay": 1000
    echo }
    ) > "%SETTINGS_FILE%"
)
echo ✅ settings.json已更新
echo.
echo ===========================================
echo ✅ 配置完成！请重启Cursor以生效
echo.
echo 📋 配置信息:
echo    用户ID: %USER_ID%
echo    VIP等级: Pro
echo    有效期: 2099-12-31
echo    备份位置: %BACKUP_DIR%
echo.
echo 💡 使用提示:
echo    1. 关闭并重新打开Cursor
echo    2. 登录您的账户
echo    3. 享受VIP功能
echo.
echo 🛠️  如需恢复配置，请运行:
echo    %CONFIG_DIR%\backup\%TIMESTAMP%\settings.json
echo.
pause
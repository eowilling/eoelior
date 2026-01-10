@echo off
echo 创建开机启动项...
set "STARTUP_PATH=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
copy "cursor_pro_auto_reset.bat" "%STARTUP_PATH%\cursor_pro_auto_reset.bat" >nul
echo ✓ 开机启动项已创建
pause

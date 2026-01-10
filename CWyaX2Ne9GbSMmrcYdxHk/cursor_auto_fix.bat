@echo off
echo Cursor自动修复脚本...
echo 1. 修复缺失的模块...
python fix_cursor_module.py
echo 2. 重启Cursor...
taskkill /f /im Cursor.exe 2>nul
timeout /t 2 /nobreak >nul
start "" "C:\Program Files\Cursor\Cursor.exe"
echo 修复完成！Cursor将自动重启。
pause

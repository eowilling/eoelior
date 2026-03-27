@echo off
echo ========================================
echo   OpenUpPng - 同步圖片到 GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo 正在添加圖片...
git add uploads/*.png

echo.
echo 正在提交...
git commit -m "Sync images %date% %time%"

echo.
echo 正在推送到 GitHub...
git push origin master

echo.
echo ========================================
echo   同步完成！
echo ========================================
echo.
echo 您的圖片已上傳到 GitHub
echo 可以使用以下格式的連結分享：
echo https://raw.githubusercontent.com/您的用戶名/OpenUpPng/main/uploads/圖片名稱.png
echo.
pause

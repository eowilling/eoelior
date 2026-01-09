@echo off
chcp 65001 > nul
set PYTHONIOENCODING=utf-8
cls
echo.
echo ============================================================
echo eo玩數獨
echo ============================================================
echo.
echo 遊戲特色：
echo * 五顆星難度選擇 (1-5星)
echo * 無限制提示功能
echo * 存檔/讀檔功能
echo * 無時間限制
echo * 美觀的圖形界面
echo * 時間暫停/繼續功能
echo * 重來功能
echo * 計時器功能
echo.
echo 正在啟動遊戲，請稍候...
echo.
python sudoku_perfect.py
if errorlevel 1 (
    echo.
    echo 遊戲啟動失敗，請檢查Python是否已安裝
    pause
) else (
    echo.
    echo 遊戲已結束
    pause
)

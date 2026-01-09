#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
創建繁體中文批處理文件 - 修復版
"""
def create_bat_files():
    """創建支援繁體中文的批處理文件"""
    
    # 主要啟動腳本內容（使用UTF-8編碼）
    bat_content = '''@echo off
chcp 65001 > nul
set PYTHONIOENCODING=utf-8
cls
echo.
echo ============================================================
echo 數獨遊戲 - 完美版 (繁體中文)
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
'''
    
    # 直接寫入文件（使用系統默認UTF-8）
    with open("start_game.bat", "w", encoding="utf-8") as f:
        f.write(bat_content)
    
    # 創建備用版本（簡化版）
    simple_content = '''@echo off
chcp 65001 > nul
python sudoku_perfect.py
pause
'''
    with open("start_game_simple.bat", "w", encoding="utf-8") as f:
        f.write(simple_content)
    
    print("已成功創建繁體中文批處理文件：")
    print("1. start_game.bat (完整版)")
    print("2. start_game_simple.bat (簡化版)")
    print("編碼：UTF-8，支援繁體中文顯示")
if __name__ == "__main__":
    create_bat_files()
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
創建UTF-8編碼的批處理文件
"""
import os
def create_utf8_bat():
    """創建支援繁體中文的UTF-8批處理文件"""
    
    # 主要啟動腳本
    bat_content = '''@echo off
chcp 950 > nul
set PYTHONIOENCODING=utf-8
echo.
echo ============================================================
echo 數獨遊戲 - 完美版 (繁體中文)
echo ============================================================
echo.
echo 遊戲特色：
echo ✓ 五顆星難度選擇 (1-5星)
echo ✓ 無限制提示功能
echo ✓ 存檔/讀檔功能
echo ✓ 無時間限制
echo ✓ 美觀的圖形界面
echo ✓ 時間暫停/繼續功能
echo ✓ 重來功能
echo ✓ 計時器功能
echo.
echo 正在啟動遊戲...
echo.
python sudoku_perfect.py
echo.
echo 遊戲已結束
pause
'''
    
    # 創建bat文件
    with open("start_game.bat", "w", encoding="big5") as f:
        f.write(bat_content)
    
    # 創建UTF-8版本備用
    with open("start_game_utf8.bat", "w", encoding="utf-8") as f:
        f.write(bat_content)
    
    print("已創建繁體中文批處理文件：")
    print("1. start_game.bat (Big5編碼)")
    print("2. start_game_utf8.bat (UTF-8編碼)")
if __name__ == "__main__":
    create_utf8_bat()
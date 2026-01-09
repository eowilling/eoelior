#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修改遊戲名稱為 "eo玩數獨"
"""
import os
import re
def update_game_name():
    """更新所有相關文件的遊戲名稱"""
    
    print("=" * 60)
    print("開始修改遊戲名稱為 'eo玩數獨'")
    print("=" * 60)
    
    # 1. 更新主遊戲文件
    game_file = "sudoku_perfect.py"
    if os.path.exists(game_file):
        with open(game_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # 替換標題
        content = content.replace("數獨遊戲 - 完美版", "eo玩數獨")
        content = content.replace("數獨遊戲 - 無限提示版", "eo玩數獨")
        content = content.replace("數獨遊戲完美版", "eo玩數獨")
        
        with open(game_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✓ 已更新: {game_file}")
    else:
        print(f"✗ 文件不存在: {game_file}")
    
    # 2. 更新批處理文件
    bat_file = "start_game.bat"
    if os.path.exists(bat_file):
        with open(bat_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # 替換標題
        content = content.replace("數獨遊戲 - 完美版 (繁體中文)", "eo玩數獨")
        content = content.replace("sudoku_perfect.py", "sudoku_perfect.py")
        
        with open(bat_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✓ 已更新: {bat_file}")
    else:
        print(f"✗ 文件不存在: {bat_file}")
    
    print("\n" + "=" * 60)
    print("遊戲名稱修改完成！")
    print("=" * 60)
    print("\n更新說明：")
    print("• 遊戲標題: eo玩數獨")
    print("• 界面文字: 保持繁體中文")
    print("• 批處理: 繁體中文顯示")
    print("\n現在可以直接雙擊 start_game.bat 遊玩！")
    print("=" * 60)
if __name__ == "__main__":
    update_game_name()
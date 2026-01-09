#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
最終檢查 - 確認所有文件正確
"""
import os
import sys
def final_check():
    """最終文件檢查"""
    
    print("=" * 60)
    print("最終文件檢查")
    print("=" * 60)
    
    # 檢查必要文件
    required_files = {
        "start_game.bat": "主啟動文件",
        "sudoku_perfect.py": "遊戲主程序"
    }
    
    print("\n必要文件檢查：")
    all_good = True
    for filename, description in required_files.items():
        if os.path.exists(filename):
            size = os.path.getsize(filename)
            print(f"✓ {filename} ({size} bytes) - {description}")
        else:
            print(f"✗ {filename} - 找不到文件")
            all_good = False
    
    # 檢查文件內容
    print("\n內容檢查：")
    
    # 檢查批處理文件
    if os.path.exists("start_game.bat"):
        with open("start_game.bat", "r", encoding="utf-8") as f:
            content = f.read()
            if "eo玩數獨" in content:
                print("✓ start_game.bat 包含新名稱 'eo玩數獨'")
            else:
                print("✗ start_game.bat 名稱未更新")
            
            if "chcp 65001" in content:
                print("✓ start_game.bat 使用UTF-8編碼")
            else:
                print("✗ start_game.bat 編碼設置不正確")
    
    # 檢查遊戲文件
    if os.path.exists("sudoku_perfect.py"):
        with open("sudoku_perfect.py", "r", encoding="utf-8") as f:
            content = f.read()
            if "eo玩數獨" in content:
                print("✓ sudoku_perfect.py 包含新名稱 'eo玩數獨'")
            else:
                print("✗ sudoku_perfect.py 名稱未更新")
    
    print("\n" + "=" * 60)
    if all_good:
        print("✅ 所有文件檢查通過！")
        print("\n🎉 您可以開始遊戲了！")
        print("   雙擊 start_game.bat 即可開始玩 'eo玩數獨'")
    else:
        print("❌ 發現問題，請檢查")
    print("=" * 60)
if __name__ == "__main__":
    final_check()
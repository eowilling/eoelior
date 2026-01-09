#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
清理多餘的批處理文件
"""
import os
import sys
def cleanup_bat_files():
    """刪除多餘的.bat文件"""
    
    # 要刪除的文件列表
    files_to_remove = [
        "start_game_simple.bat",
        "start_game_ascii.bat"
    ]
    
    removed = 0
    for filename in files_to_remove:
        if os.path.exists(filename):
            try:
                os.remove(filename)
                print(f"已刪除: {filename}")
                removed += 1
            except Exception as e:
                print(f"刪除失敗: {filename} - {e}")
        else:
            print(f"文件不存在: {filename}")
    
    # 保留的文件
    print("\n保留的文件:")
    if os.path.exists("start_game.bat"):
        print("✓ start_game.bat (主要啟動文件)")
    
    print(f"\n清理完成，共刪除 {removed} 個多餘文件")
    
    return removed
if __name__ == "__main__":
    cleanup_bat_files()
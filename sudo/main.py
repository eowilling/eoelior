#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数独游戏主程序
功能：五星级难度、无限提示、存档功能、无时间限制
"""
import sys
import os
# 添加当前目录到Python路径（修复__file__未定义问题）
import __main__
sys.path.insert(0, os.path.dirname(os.path.abspath(__main__.__file__)) if hasattr(__main__, '__file__') else os.getcwd())
from sudoku_gui import SudokuGUI
import tkinter as tk
def main():
    """主函数"""
    print("正在启动数独游戏...")
    print("游戏特性：")
    print("- 五星级难度选择")
    print("- 无限制提示功能")
    print("- 存档/读档功能")
    print("- 无时间限制")
    print("- 美观的图形界面")
    print("\n游戏操作说明：")
    print("1. 选择难度星级后点击'新游戏'")
    print("2. 点击空白单元格选中")
    print("3. 点击数字按钮填入数字")
    print("4. 点击'提示'按钮获取帮助")
    print("5. 使用'保存'/'加载'按钮管理游戏进度")
    
    # 创建主窗口
    root = tk.Tk()
    
    # 设置窗口图标（如果有的话）
    try:
        # 这里可以设置窗口图标
        pass
    except:
        pass
    
    # 创建游戏应用
    app = SudokuGUI(root)
    
    # 启动主循环
    root.mainloop()
if __name__ == "__main__":
    main()
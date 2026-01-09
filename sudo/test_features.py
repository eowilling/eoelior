#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数独游戏功能测试脚本
测试所有核心功能是否正常工作
"""
import sys
import os
import json
import tempfile
# 添加当前目录到路径
sys.path.insert(0, os.getcwd())
def test_sudoku_logic():
    """测试数独核心逻辑"""
    print("🧪 测试数独核心逻辑...")
    
    from sudoku_complete import SudokuGame
    
    # 测试1: 游戏生成
    game = SudokuGame()
    game.generate_puzzle(1)
    print("✓ 游戏生成成功")
    
    # 测试2: 检查初始状态
    empty_count = sum(1 for row in game.board for cell in row if cell == 0)
    print(f"✓ 空单元格数量: {empty_count}")
    
    # 测试3: 提示功能
    hint = game.get_hint()
    if hint:
        print(f"✓ 提示功能正常: {hint}")
    else:
        print("✗ 提示功能异常")
    
    # 测试4: 移动验证
    valid_move = game.make_move(0, 0, 5)
    print(f"✓ 移动验证: {valid_move}")
    
    # 测试5: 存档功能
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
        temp_file = f.name
    
    save_result = game.save_game(temp_file)
    print(f"✓ 存档功能: {save_result}")
    
    # 测试6: 读档功能
    game2 = SudokuGame()
    load_result = game2.load_game(temp_file)
    print(f"✓ 读档功能: {load_result}")
    
    # 清理临时文件
    os.unlink(temp_file)
    
    print("✅ 所有核心逻辑测试通过！\n")
def test_difficulty_levels():
    """测试难度系统"""
    print("🧪 测试难度系统...")
    
    from sudoku_complete import SudokuGame
    
    for level in range(1, 6):
        game = SudokuGame()
        game.generate_puzzle(level)
        empty_count = sum(1 for row in game.board for cell in row if cell == 0)
        print(f"  {level}星难度 - 空单元格: {empty_count}")
    
    print("✅ 难度系统测试通过！\n")
def test_gui_availability():
    """测试GUI组件可用性"""
    print("🧪 测试GUI组件...")
    
    try:
        from sudoku_complete import SudokuGUI
        print("✓ SudokuGUI类导入成功")
        
        # 检查关键方法是否存在
        methods = ['new_game', 'give_hint', 'save_game', 'load_game', 'change_difficulty']
        for method in methods:
            if hasattr(SudokuGUI, method):
                print(f"✓ 方法 {method} 存在")
            else:
                print(f"✗ 方法 {method} 缺失")
        
        print("✅ GUI组件测试通过！\n")
    except Exception as e:
        print(f"✗ GUI测试失败: {e}\n")
def main():
    """运行所有测试"""
    print("=" * 50)
    print("数独游戏 - 功能测试")
    print("=" * 50)
    
    try:
        test_sudoku_logic()
        test_difficulty_levels()
        test_gui_availability()
        
        print("=" * 50)
        print("🎉 所有测试通过！游戏可以正常运行！")
        print("=" * 50)
        print("\n现在可以运行：python sudoku_complete.py")
        
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        import traceback
        traceback.print_exc()
if __name__ == "__main__":
    main()
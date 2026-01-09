#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数独游戏完整版 - 集成所有功能
功能：五星级难度、无限提示、存档功能、无时间限制
"""
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import random
import copy
import json
from typing import List, Tuple, Optional
class SudokuGame:
    """数独核心逻辑类"""
    
    def __init__(self):
        self.board = [[0 for _ in range(9)] for _ in range(9)]
        self.solution = [[0 for _ in range(9)] for _ in range(9)]
        self.initial_board = [[0 for _ in range(9)] for _ in range(9)]
        
    def is_valid(self, board: List[List[int]], row: int, col: int, num: int) -> bool:
        """检查在指定位置放置数字是否有效"""
        # 检查行
        for j in range(9):
            if board[row][j] == num:
                return False
        
        # 检查列
        for i in range(9):
            if board[i][col] == num:
                return False
        
        # 检查3x3宫格
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(start_row, start_row + 3):
            for j in range(start_col, start_col + 3):
                if board[i][j] == num:
                    return False
        
        return True
    
    def find_empty_cell(self, board: List[List[int]]) -> Optional[Tuple[int, int]]:
        """找到空单元格的位置"""
        for i in range(9):
            for j in range(9):
                if board[i][j] == 0:
                    return (i, j)
        return None
    
    def solve_sudoku(self, board: List[List[int]]) -> bool:
        """使用回溯算法求解数独"""
        empty_cell = self.find_empty_cell(board)
        if not empty_cell:
            return True
        
        row, col = empty_cell
        
        for num in range(1, 10):
            if self.is_valid(board, row, col, num):
                board[row][col] = num
                
                if self.solve_sudoku(board):
                    return True
                
                board[row][col] = 0
        
        return False
    
    def generate_complete_sudoku(self) -> List[List[int]]:
        """生成一个完整的数独解"""
        board = [[0 for _ in range(9)] for _ in range(9)]
        
        # 填充对角线的3x3宫格
        for box in range(0, 9, 3):
            nums = list(range(1, 10))
            random.shuffle(nums)
            for i in range(3):
                for j in range(3):
                    board[box + i][box + j] = nums[i * 3 + j]
        
        # 使用回溯算法填充剩余部分
        self.solve_sudoku(board)
        return board
    
    def get_cells_to_remove(self, difficulty: int) -> int:
        """根据难度获取需要移除的单元格数量"""
        difficulty_levels = {
            1: random.randint(35, 40),   # 简单
            2: random.randint(41, 46),   # 中等
            3: random.randint(47, 52),   # 困难
            4: random.randint(53, 58),   # 专家
            5: random.randint(59, 64)    # 大师
        }
        return difficulty_levels.get(difficulty, 40)
    
    def has_unique_solution(self, board: List[List[int]]) -> bool:
        """检查数独是否有唯一解"""
        solutions = []
        self.count_solutions(board, solutions, 2)
        return len(solutions) == 1
    
    def count_solutions(self, board: List[List[int]], solutions: List, max_solutions: int) -> int:
        """计算数独的解的数量"""
        empty_cell = self.find_empty_cell(board)
        if not empty_cell:
            solutions.append(copy.deepcopy(board))
            return len(solutions)
        
        if len(solutions) >= max_solutions:
            return len(solutions)
        
        row, col = empty_cell
        
        for num in range(1, 10):
            if self.is_valid(board, row, col, num):
                board[row][col] = num
                self.count_solutions(board, solutions, max_solutions)
                board[row][col] = 0
        
        return len(solutions)
    
    def remove_numbers(self, board: List[List[int]], difficulty: int) -> List[List[int]]:
        """根据难度移除数字"""
        puzzle = copy.deepcopy(board)
        cells_to_remove = self.get_cells_to_remove(difficulty)
        
        removed = 0
        attempts = 0
        max_attempts = 100
        
        while removed < cells_to_remove and attempts < max_attempts:
            row = random.randint(0, 8)
            col = random.randint(0, 8)
            
            if puzzle[row][col] != 0:
                backup = puzzle[row][col]
                puzzle[row][col] = 0
                
                # 检查是否仍有唯一解
                test_board = copy.deepcopy(puzzle)
                if self.has_unique_solution(test_board):
                    removed += 1
                else:
                    puzzle[row][col] = backup
            
            attempts += 1
        
        return puzzle
    
    def generate_puzzle(self, difficulty: int = 1):
        """生成指定难度的数独谜题"""
        self.solution = self.generate_complete_sudoku()
        self.board = self.remove_numbers(self.solution, difficulty)
        self.initial_board = copy.deepcopy(self.board)
    
    def get_hint(self) -> Optional[Tuple[int, int, int]]:
        """获取提示（返回一个空单元格的正确答案）"""
        empty_cells = []
        for i in range(9):
            for j in range(9):
                if self.board[i][j] == 0:
                    empty_cells.append((i, j))
        
        if not empty_cells:
            return None
        
        row, col = random.choice(empty_cells)
        correct_value = self.solution[row][col]
        
        return (row, col, correct_value)
    
    def is_complete(self) -> bool:
        """检查数独是否完成"""
        for i in range(9):
            for j in range(9):
                if self.board[i][j] == 0:
                    return False
        return True
    
    def is_valid_solution(self) -> bool:
        """检查当前解决方案是否正确"""
        if not self.is_complete():
            return False
        
        for i in range(9):
            for j in range(9):
                num = self.board[i][j]
                self.board[i][j] = 0
                if not self.is_valid(self.board, i, j, num):
                    self.board[i][j] = num
                    return False
                self.board[i][j] = num
        
        return True
    
    def make_move(self, row: int, col: int, num: int) -> bool:
        """在指定位置放置数字"""
        if self.initial_board[row][col] != 0:
            return False
        
        if self.is_valid(self.board, row, col, num):
            self.board[row][col] = num
            return True
        
        return False
    
    def clear_cell(self, row: int, col: int) -> bool:
        """清空指定单元格"""
        if self.initial_board[row][col] != 0:
            return False
        
        self.board[row][col] = 0
        return True
    
    def save_game(self, filename: str) -> bool:
        """保存游戏到文件"""
        game_state = {
            'board': self.board,
            'solution': self.solution,
            'initial_board': self.initial_board
        }
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(game_state, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f"保存游戏失败: {e}")
            return False
    
    def load_game(self, filename: str) -> bool:
        """从文件加载游戏"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                game_state = json.load(f)
            
            self.board = game_state['board']
            self.solution = game_state['solution']
            self.initial_board = game_state['initial_board']
            return True
        except Exception as e:
            print(f"加载游戏失败: {e}")
            return False
class SudokuGUI:
    """数独图形用户界面"""
    
    def __init__(self, root):
        self.root = root
        self.root.title("数独游戏 - 无限提示版")
        self.root.geometry("600x700")
        self.root.resizable(False, False)
        
        self.game = SudokuGame()
        self.selected_cell = None
        self.difficulty = 1
        
        self.setup_ui()
        self.new_game()
    
    def setup_ui(self):
        """设置用户界面"""
        # 顶部控制面板
        control_frame = ttk.Frame(self.root, padding="10")
        control_frame.grid(row=0, column=0, sticky=(tk.W, tk.E))
        
        # 难度选择
        ttk.Label(control_frame, text="难度:").grid(row=0, column=0, padx=5)
        self.difficulty_var = tk.IntVar(value=1)
        difficulty_frame = ttk.Frame(control_frame)
        difficulty_frame.grid(row=0, column=1, padx=5)
        
        for i in range(1, 6):
            ttk.Radiobutton(
                difficulty_frame, 
                text=f"{i}星", 
                variable=self.difficulty_var, 
                value=i,
                command=self.change_difficulty
            ).pack(side=tk.LEFT, padx=2)
        
        # 按钮
        ttk.Button(control_frame, text="新游戏", command=self.new_game).grid(row=0, column=2, padx=5)
        ttk.Button(control_frame, text="提示", command=self.give_hint).grid(row=0, column=3, padx=5)
        ttk.Button(control_frame, text="保存", command=self.save_game).grid(row=0, column=4, padx=5)
        ttk.Button(control_frame, text="加载", command=self.load_game).grid(row=0, column=5, padx=5)
        
        # 数独棋盘
        self.board_frame = ttk.Frame(self.root, padding="10")
        self.board_frame.grid(row=1, column=0)
        
        self.cells = []
        for i in range(9):
            row_cells = []
            for j in range(9):
                # 创建3x3宫格的视觉效果
                frame = tk.Frame(
                    self.board_frame,
                    highlightbackground="black" if (i % 3 == 0 and j % 3 == 0) else "gray",
                    highlightthickness=1 if (i % 3 == 0 or j % 3 == 0) else 0
                )
                frame.grid(row=i, column=j, padx=1, pady=1)
                
                cell = tk.Label(
                    frame,
                    text="",
                    width=3,
                    height=2,
                    font=("Arial", 16, "bold"),
                    bg="white",
                    relief=tk.RAISED,
                    bd=1
                )
                cell.pack()
                cell.bind("<Button-1>", lambda e, row=i, col=j: self.cell_clicked(row, col))
                row_cells.append(cell)
            self.cells.append(row_cells)
        
        # 数字输入按钮
        number_frame = ttk.Frame(self.root, padding="10")
        number_frame.grid(row=2, column=0)
        
        ttk.Label(number_frame, text="点击单元格后选择数字:").grid(row=0, column=0, columnspan=5, pady=5)
        
        for num in range(1, 10):
            btn = tk.Button(
                number_frame,
                text=str(num),
                width=4,
                height=2,
                font=("Arial", 12, "bold"),
                command=lambda n=num: self.number_clicked(n),
                bg="lightblue"
            )
            btn.grid(row=1, column=(num-1)%5, padx=2, pady=2)
        
        # 清除按钮
        clear_btn = tk.Button(
            number_frame,
            text="清除",
            width=8,
            height=2,
            font=("Arial", 12, "bold"),
            command=self.clear_cell,
            bg="lightcoral"
        )
        clear_btn.grid(row=1, column=5, padx=10, pady=2)
        
        # 状态栏
        self.status_var = tk.StringVar(value="准备就绪")
        status_bar = ttk.Label(self.root, textvariable=self.status_var, relief=tk.SUNKEN)
        status_bar.grid(row=3, column=0, sticky=(tk.W, tk.E), pady=5)
    
    def change_difficulty(self):
        """改变游戏难度"""
        self.difficulty = self.difficulty_var.get()
        self.status_var.set(f"难度已设置为 {self.difficulty} 星")
    
    def new_game(self):
        """开始新游戏"""
        self.game.generate_puzzle(self.difficulty)
        self.update_board()
        self.selected_cell = None
        self.status_var.set(f"新游戏开始 - 难度: {self.difficulty} 星")
    
    def cell_clicked(self, row, col):
        """单元格被点击"""
        # 清除之前的选择
        if self.selected_cell:
            prev_row, prev_col = self.selected_cell
            if self.game.initial_board[prev_row][prev_col] == 0:
                self.cells[prev_row][prev_col].config(bg="white")
        
        # 选择新单元格
        self.selected_cell = (row, col)
        if self.game.initial_board[row][col] == 0:
            self.cells[row][col].config(bg="lightyellow")
        self.status_var.set(f"选中单元格 ({row+1}, {col+1})")
    
    def number_clicked(self, num):
        """数字按钮被点击"""
        if not self.selected_cell:
            self.status_var.set("请先选择一个单元格")
            return
        
        row, col = self.selected_cell
        if self.game.initial_board[row][col] != 0:
            self.status_var.set("不能修改初始数字")
            return
        
        if self.game.make_move(row, col, num):
            self.update_board()
            self.status_var.set(f"在 ({row+1}, {col+1}) 放置数字 {num}")
            
            # 检查是否完成
            if self.game.is_complete():
                if self.game.is_valid_solution():
                    messagebox.showinfo("恭喜！", "你成功完成了数独！")
                    self.status_var.set("游戏完成！")
                else:
                    messagebox.showwarning("错误", "当前解决方案有误，请检查！")
        else:
            self.status_var.set(f"数字 {num} 不能放在 ({row+1}, {col+1})")
    
    def clear_cell(self):
        """清除选中的单元格"""
        if not self.selected_cell:
            self.status_var.set("请先选择一个单元格")
            return
        
        row, col = self.selected_cell
        if self.game.clear_cell(row, col):
            self.update_board()
            self.status_var.set(f"清除单元格 ({row+1}, {col+1})")
        else:
            self.status_var.set("不能清除初始数字")
    
    def give_hint(self):
        """给出提示"""
        hint = self.game.get_hint()
        if hint:
            row, col, value = hint
            self.game.make_move(row, col, value)
            self.update_board()
            self.status_var.set(f"提示: ({row+1}, {col+1}) = {value}")
            
            if self.game.is_complete() and self.game.is_valid_solution():
                messagebox.showinfo("恭喜！", "你成功完成了数独！")
                self.status_var.set("游戏完成！")
        else:
            self.status_var.set("没有可提示的单元格，数独已完成！")
    
    def update_board(self):
        """更新棋盘显示"""
        for i in range(9):
            for j in range(9):
                value = self.game.board[i][j]
                if value == 0:
                    self.cells[i][j].config(text="", bg="white")
                else:
                    self.cells[i][j].config(text=str(value))
                    # 初始数字用不同颜色显示
                    if self.game.initial_board[i][j] != 0:
                        self.cells[i][j].config(fg="blue", bg="lightgray")
                    else:
                        self.cells[i][j].config(fg="black", bg="white")
    
    def save_game(self):
        """保存游戏"""
        filename = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        
        if filename:
            if self.game.save_game(filename):
                messagebox.showinfo("保存成功", f"游戏已保存到: {filename}")
                self.status_var.set("游戏保存成功")
            else:
                messagebox.showerror("保存失败", "保存游戏时出错")
    
    def load_game(self):
        """加载游戏"""
        filename = filedialog.askopenfilename(
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        
        if filename:
            if self.game.load_game(filename):
                self.update_board()
                self.selected_cell = None
                messagebox.showinfo("加载成功", f"游戏已从 {filename} 加载")
                self.status_var.set("游戏加载成功")
            else:
                messagebox.showerror("加载失败", "加载游戏时出错")
def main():
    """主函数"""
    print("=" * 50)
    print("数独游戏 - 无限提示版")
    print("=" * 50)
    print("游戏特性：")
    print("✓ 五星级难度选择")
    print("✓ 无限制提示功能")
    print("✓ 存档/读档功能")
    print("✓ 无时间限制")
    print("✓ 美观的图形界面")
    print("\n游戏操作说明：")
    print("1. 选择难度星级后点击'新游戏'")
    print("2. 点击空白单元格选中")
    print("3. 点击数字按钮填入数字")
    print("4. 点击'提示'按钮获取帮助")
    print("5. 使用'保存'/'加载'按钮管理游戏进度")
    print("=" * 50)
    
    # 创建主窗口
    root = tk.Tk()
    
    # 创建游戏应用
    app = SudokuGUI(root)
    
    # 启动主循环
    root.mainloop()
if __name__ == "__main__":
    main()
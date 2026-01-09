#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
數獨遊戲最終完美版 - 繁體中文版
功能：五顆星難度、無限提示、存檔功能、無時間限制
修復所有錯誤，確保完美運行
"""
import tkinter as tk
from tkinter import messagebox, filedialog
import random
import copy
import json
from datetime import datetime, timedelta
class SudokuGame:
    def __init__(self):
        self.board = [[0 for _ in range(9)] for _ in range(9)]
        self.solution = [[0 for _ in range(9)] for _ in range(9)]
        self.initial_board = [[0 for _ in range(9)] for _ in range(9)]
        
    def is_valid(self, board, row, col, num):
        # 檢查行
        for j in range(9):
            if board[row][j] == num:
                return False
        # 檢查列
        for i in range(9):
            if board[i][col] == num:
                return False
        # 檢查3x3宮格
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(start_row, start_row + 3):
            for j in range(start_col, start_col + 3):
                if board[i][j] == num:
                    return False
        return True
    
    def find_empty_cell(self, board):
        for i in range(9):
            for j in range(9):
                if board[i][j] == 0:
                    return (i, j)
        return None
    
    def solve_sudoku(self, board):
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
    
    def generate_complete_sudoku(self):
        board = [[0 for _ in range(9)] for _ in range(9)]
        for box in range(0, 9, 3):
            nums = list(range(1, 10))
            random.shuffle(nums)
            for i in range(3):
                for j in range(3):
                    board[box + i][box + j] = nums[i * 3 + j]
        self.solve_sudoku(board)
        return board
    
    def get_cells_to_remove(self, difficulty):
        levels = {
            1: random.randint(35, 40),
            2: random.randint(41, 46),
            3: random.randint(47, 52),
            4: random.randint(53, 58),
            5: random.randint(59, 64)
        }
        return levels.get(difficulty, 40)
    
    def has_unique_solution(self, board):
        solutions = []
        self.count_solutions(board, solutions, 2)
        return len(solutions) == 1
    
    def count_solutions(self, board, solutions, max_solutions):
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
    
    def remove_numbers(self, board, difficulty):
        puzzle = copy.deepcopy(board)
        cells_to_remove = self.get_cells_to_remove(difficulty)
        removed = 0
        attempts = 0
        while removed < cells_to_remove and attempts < 100:
            row = random.randint(0, 8)
            col = random.randint(0, 8)
            if puzzle[row][col] != 0:
                backup = puzzle[row][col]
                puzzle[row][col] = 0
                test_board = copy.deepcopy(puzzle)
                if self.has_unique_solution(test_board):
                    removed += 1
                else:
                    puzzle[row][col] = backup
            attempts += 1
        return puzzle
    
    def generate_puzzle(self, difficulty=1):
        self.solution = self.generate_complete_sudoku()
        self.board = self.remove_numbers(self.solution, difficulty)
        self.initial_board = copy.deepcopy(self.board)
    
    def get_hint(self):
        empty_cells = []
        for i in range(9):
            for j in range(9):
                if self.board[i][j] == 0:
                    empty_cells.append((i, j))
        if not empty_cells:
            return None
        row, col = random.choice(empty_cells)
        return (row, col, self.solution[row][col])
    
    def is_complete(self):
        for i in range(9):
            for j in range(9):
                if self.board[i][j] == 0:
                    return False
        return True
    
    def is_valid_solution(self):
        if not self.is_complete():
            return False
        for i in range(9):
            for j in range(9):
                num = self.board[i][j]
                self.board[i][j] = 0
                valid = self.is_valid(self.board, i, j, num)
                self.board[i][j] = num
                if not valid:
                    return False
        return True
    
    def make_move(self, row, col, num):
        if self.initial_board[row][col] != 0:
            return False
        if self.is_valid(self.board, row, col, num):
            self.board[row][col] = num
            return True
        return False
    
    def clear_cell(self, row, col):
        if self.initial_board[row][col] != 0:
            return False
        self.board[row][col] = 0
        return True
    
    def reset_to_initial(self):
        self.board = copy.deepcopy(self.initial_board)
    
    def save_game(self, filename):
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump({
                    'board': self.board,
                    'solution': self.solution,
                    'initial_board': self.initial_board
                }, f, ensure_ascii=False, indent=2)
            return True
        except:
            return False
    
    def load_game(self, filename):
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.board = data['board']
                self.solution = data['solution']
                self.initial_board = data['initial_board']
            return True
        except:
            return False
class SudokuGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("數獨遊戲 - 完美版")
        self.root.geometry("700x800")
        self.root.configure(bg='lightgray')
        
        self.game = SudokuGame()
        self.selected_cell = None
        self.difficulty = 1
        
        # 計時器
        self.start_time = None
        self.elapsed_time = timedelta(0)
        self.is_timer_running = False
        self.timer_paused = False
        
        self.setup_ui()
        self.new_game()
    
    def setup_ui(self):
        # 標題
        title_label = tk.Label(self.root, text="數獨遊戲 - 完美版", font=("Arial", 20, "bold"), bg='lightgray')
        title_label.pack(pady=10)
        
        # 控制面板
        control_frame = tk.Frame(self.root, bg='lightgray')
        control_frame.pack(pady=10)
        
        # 難度選擇
        tk.Label(control_frame, text="難度:", font=("Arial", 12), bg='lightgray').grid(row=0, column=0, padx=5)
        self.difficulty_var = tk.IntVar(value=1)
        for i in range(1, 6):
            tk.Radiobutton(control_frame, text=f"{i}星", variable=self.difficulty_var, 
                          value=i, command=self.change_difficulty, font=("Arial", 10)).grid(row=0, column=i, padx=2)
        
        # 按鈕框架
        button_frame = tk.Frame(self.root, bg='lightgray')
        button_frame.pack(pady=10)
        
        buttons = [
            ("新遊戲", self.new_game, "lightgreen"),
            ("重來", self.restart_game, "lightyellow"),
            ("提示", self.give_hint, "lightblue"),
            ("檢查", self.check_solution, "lightcyan"),
            ("暫停", self.toggle_timer, "orange"),
            ("保存", self.save_game, "lightpink"),
            ("加載", self.load_game, "plum")
        ]
        
        for i, (text, cmd, color) in enumerate(buttons):
            tk.Button(button_frame, text=text, command=cmd, font=("Arial", 10, "bold"), 
                     width=8, height=1, bg=color).grid(row=0, column=i, padx=3)
        
        # 計時器
        self.timer_label = tk.Label(self.root, text="00:00:00", font=("Arial", 14, "bold"), fg="blue", bg='lightgray')
        self.timer_label.pack(pady=5)
        
        # 數獨棋盤
        board_frame = tk.Frame(self.root, bg='black')
        board_frame.pack(pady=10)
        
        self.cells = []
        for i in range(9):
            row_cells = []
            for j in range(9):
                cell_frame = tk.Frame(board_frame, bg='gray' if (i//3 + j//3) % 2 == 0 else 'darkgray', 
                                    highlightbackground='black', highlightthickness=1)
                cell_frame.grid(row=i, column=j, padx=1, pady=1)
                
                cell = tk.Label(cell_frame, text="", width=3, height=2, font=("Arial", 16, "bold"), 
                              bg="white", relief="raised")
                cell.pack()
                cell.bind("<Button-1>", lambda e, r=i, c=j: self.cell_clicked(r, c))
                row_cells.append(cell)
            self.cells.append(row_cells)
        
        # 數字按鈕
        number_frame = tk.Frame(self.root, bg='lightgray')
        number_frame.pack(pady=10)
        
        tk.Label(number_frame, text="選擇數字 (1-9):", font=("Arial", 12), bg='lightgray').pack()
        
        num_btn_frame = tk.Frame(number_frame, bg='lightgray')
        num_btn_frame.pack()
        
        for num in range(1, 10):
            tk.Button(num_btn_frame, text=str(num), command=lambda n=num: self.number_clicked(n),
                     font=("Arial", 14, "bold"), width=4, height=2, bg="lightblue").grid(row=0, column=num-1, padx=2)
        
        # 清除按鈕
        tk.Button(number_frame, text="清除", command=self.clear_cell, 
                 font=("Arial", 12, "bold"), width=20, height=2, bg="lightcoral").pack(pady=5)
        
        # 狀態欄
        self.status_var = tk.StringVar(value="準備就緒 - 請選擇難度後開始新遊戲")
        status_bar = tk.Label(self.root, textvariable=self.status_var, relief="sunken", anchor="w")
        status_bar.pack(side="bottom", fill="x")
        
        self.update_timer()
    
    def update_timer(self):
        if self.is_timer_running and not self.timer_paused and self.start_time:
            current_time = datetime.now()
            self.elapsed_time = current_time - self.start_time
            total_seconds = int(self.elapsed_time.total_seconds())
            hours = total_seconds // 3600
            minutes = (total_seconds % 3600) // 60
            seconds = total_seconds % 60
            time_str = f"{hours:02d}:{minutes:02d}:{seconds:02d}"
            self.timer_label.config(text=time_str)
        
        self.root.after(1000, self.update_timer)
    
    def toggle_timer(self):
        if not self.is_timer_running:
            self.is_timer_running = True
            self.timer_paused = False
            self.start_time = datetime.now() - self.elapsed_time
            self.status_var.set("計時器已啟動")
        else:
            if self.timer_paused:
                self.timer_paused = False
                self.start_time = datetime.now() - self.elapsed_time
                self.status_var.set("計時器已繼續")
            else:
                self.timer_paused = True
                self.status_var.set("計時器已暫停")
    
    def restart_game(self):
        if tk.messagebox.askyesno("確認重來", "確定要重來這局遊戲嗎？"):
            self.game.reset_to_initial()
            self.update_board()
            self.selected_cell = None
            self.start_time = datetime.now()
            self.elapsed_time = timedelta(0)
            self.is_timer_running = True
            self.timer_paused = False
            self.status_var.set("遊戲已重來")
    
    def change_difficulty(self):
        self.difficulty = self.difficulty_var.get()
        self.status_var.set(f"難度已設置為 {self.difficulty} 星")
    
    def new_game(self):
        self.game.generate_puzzle(self.difficulty)
        self.update_board()
        self.selected_cell = None
        self.start_time = datetime.now()
        self.elapsed_time = timedelta(0)
        self.is_timer_running = True
        self.timer_paused = False
        self.status_var.set(f"新遊戲開始 - 難度: {self.difficulty} 星")
    
    def cell_clicked(self, row, col):
        if self.selected_cell:
            prev_row, prev_col = self.selected_cell
            if self.game.initial_board[prev_row][prev_col] == 0:
                self.cells[prev_row][prev_col].config(bg="white")
        
        self.selected_cell = (row, col)
        if self.game.initial_board[row][col] == 0:
            self.cells[row][col].config(bg="lightyellow")
        self.status_var.set(f"選中單元格 ({row+1}, {col+1})")
    
    def number_clicked(self, num):
        if not self.selected_cell:
            self.status_var.set("請先選擇一個單元格")
            return
        
        row, col = self.selected_cell
        if self.game.initial_board[row][col] != 0:
            self.status_var.set("不能修改初始數字")
            return
        
        if self.game.make_move(row, col, num):
            self.update_board()
            self.status_var.set(f"在 ({row+1}, {col+1}) 放置數字 {num}")
            
            if self.game.is_complete():
                if self.game.is_valid_solution():
                    self.is_timer_running = False
                    final_time = self.timer_label.cget("text")
                    tk.messagebox.showinfo("恭喜！", f"你成功完成了數獨！\\n用時：{final_time}")
                    self.status_var.set("遊戲完成！")
                else:
                    tk.messagebox.showwarning("錯誤", "當前解決方案有誤，請檢查！")
        else:
            self.status_var.set(f"數字 {num} 不能放在 ({row+1}, {col+1})")
    
    def clear_cell(self):
        if not self.selected_cell:
            self.status_var.set("請先選擇一個單元格")
            return
        
        row, col = self.selected_cell
        if self.game.clear_cell(row, col):
            self.update_board()
            self.status_var.set(f"清除單元格 ({row+1}, {col+1})")
        else:
            self.status_var.set("不能清除初始數字")
    
    def give_hint(self):
        hint = self.game.get_hint()
        if hint:
            row, col, value = hint
            self.game.make_move(row, col, value)
            self.update_board()
            self.status_var.set(f"提示: ({row+1}, {col+1}) = {value}")
            
            if self.game.is_complete() and self.game.is_valid_solution():
                self.is_timer_running = False
                final_time = self.timer_label.cget("text")
                tk.messagebox.showinfo("恭喜！", f"你成功完成了數獨！\\n用時：{final_time}")
                self.status_var.set("遊戲完成！")
        else:
            self.status_var.set("沒有可提示的單元格，數獨已完成！")
    
    def check_solution(self):
        if not self.game.is_complete():
            tk.messagebox.showwarning("提示", "請先完成數獨再檢查！")
            self.status_var.set("數獨尚未完成，請繼續填寫")
            return
        
        if self.game.is_valid_solution():
            self.is_timer_running = False
            final_time = self.timer_label.cget("text")
            tk.messagebox.showinfo("恭喜！", f"你的解決方案完全正確！\\n用時：{final_time}")
            self.status_var.set("解決方案正確！遊戲完成！")
        else:
            tk.messagebox.showerror("錯誤", "當前解決方案有誤，請檢查！")
            self.status_var.set("解決方案有誤，請檢查錯誤")
    
    def update_board(self):
        for i in range(9):
            for j in range(9):
                value = self.game.board[i][j]
                if value == 0:
                    self.cells[i][j].config(text="", bg="white")
                else:
                    self.cells[i][j].config(text=str(value))
                    if self.game.initial_board[i][j] != 0:
                        self.cells[i][j].config(fg="blue", bg="lightgray")
                    else:
                        self.cells[i][j].config(fg="black", bg="white")
    
    def save_game(self):
        filename = filedialog.asksaveasfilename(defaultextension=".json", filetypes=[("JSON files", "*.json")])
        if filename:
            if self.game.save_game(filename):
                tk.messagebox.showinfo("保存成功", f"遊戲已保存到: {filename}")
                self.status_var.set("遊戲保存成功")
            else:
                tk.messagebox.showerror("保存失敗", "保存遊戲時出錯")
    
    def load_game(self):
        filename = filedialog.askopenfilename(filetypes=[("JSON files", "*.json")])
        if filename:
            if self.game.load_game(filename):
                self.update_board()
                self.selected_cell = None
                self.start_time = datetime.now()
                self.elapsed_time = timedelta(0)
                self.is_timer_running = True
                self.timer_paused = False
                tk.messagebox.showinfo("加載成功", f"遊戲已從 {filename} 加載")
                self.status_var.set("遊戲加載成功")
            else:
                tk.messagebox.showerror("加載失敗", "加載遊戲時出錯")
def main():
    print("數獨遊戲 - 完美版 (繁體中文)")
    print("功能：五顆星難度、無限提示、存檔、計時器、暫停、重來")
    print("所有按鈕完整顯示，數字按鈕1-9按順序排列")
    
    root = tk.Tk()
    app = SudokuGUI(root)
    root.mainloop()
if __name__ == "__main__":
    main()
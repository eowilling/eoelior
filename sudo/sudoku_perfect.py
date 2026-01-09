#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
eo玩數獨 - 繁體中文版
功能：五顆星難度、無限提示、存檔功能、無時間限制
新增功能：
1. ✅ 所有按鈕完整顯示，不再隱藏
2. ✅ 新增時間暫停/繼續按鈕
3. ✅ 新增重來按鈕
4. ✅ 新增計時器功能
5. ✅ 統一使用繁體中文界面
"""
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import random
import copy
import json
from typing import List, Tuple, Optional
import time
from datetime import datetime, timedelta
class SudokuGame:
    """數獨核心邏輯類"""
    
    def __init__(self):
        self.board = [[0 for _ in range(9)] for _ in range(9)]
        self.solution = [[0 for _ in range(9)] for _ in range(9)]
        self.initial_board = [[0 for _ in range(9)] for _ in range(9)]
        
    def is_valid(self, board: List[List[int]], row: int, col: int, num: int) -> bool:
        """檢查在指定位置放置數字是否有效"""
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
    
    def find_empty_cell(self, board: List[List[int]]) -> Optional[Tuple[int, int]]:
        """找到空單元格的位置"""
        for i in range(9):
            for j in range(9):
                if board[i][j] == 0:
                    return (i, j)
        return None
    
    def solve_sudoku(self, board: List[List[int]]) -> bool:
        """使用回溯算法求解數獨"""
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
        """生成一個完整的數獨解"""
        board = [[0 for _ in range(9)] for _ in range(9)]
        
        # 填充對角線的3x3宮格
        for box in range(0, 9, 3):
            nums = list(range(1, 10))
            random.shuffle(nums)
            for i in range(3):
                for j in range(3):
                    board[box + i][box + j] = nums[i * 3 + j]
        
        # 使用回溯算法填充剩餘部分
        self.solve_sudoku(board)
        return board
    
    def get_cells_to_remove(self, difficulty: int) -> int:
        """根據難度獲取需要移除的單元格數量"""
        difficulty_levels = {
            1: random.randint(35, 40),   # 簡單
            2: random.randint(41, 46),   # 中等
            3: random.randint(47, 52),   # 困難
            4: random.randint(53, 58),   # 專家
            5: random.randint(59, 64)    # 大師
        }
        return difficulty_levels.get(difficulty, 40)
    
    def has_unique_solution(self, board: List[List[int]]) -> bool:
        """檢查數獨是否有唯一解"""
        solutions = []
        self.count_solutions(board, solutions, 2)
        return len(solutions) == 1
    
    def count_solutions(self, board: List[List[int]], solutions: List, max_solutions: int) -> int:
        """計算數獨的解的數量"""
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
        """根據難度移除數字"""
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
                
                # 檢查是否仍有唯一解
                test_board = copy.deepcopy(puzzle)
                if self.has_unique_solution(test_board):
                    removed += 1
                else:
                    puzzle[row][col] = backup
            
            attempts += 1
        
        return puzzle
    
    def generate_puzzle(self, difficulty: int = 1):
        """生成指定難度的數獨謎題"""
        self.solution = self.generate_complete_sudoku()
        self.board = self.remove_numbers(self.solution, difficulty)
        self.initial_board = copy.deepcopy(self.board)
    
    def get_hint(self) -> Optional[Tuple[int, int, int]]:
        """獲取提示（返回一個空單元格的正確答案）"""
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
        """檢查數獨是否完成"""
        for i in range(9):
            for j in range(9):
                if self.board[i][j] == 0:
                    return False
        return True
    
    def is_valid_solution(self) -> bool:
        """檢查當前解決方案是否正確"""
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
        """在指定位置放置數字"""
        if self.initial_board[row][col] != 0:
            return False
        
        if self.is_valid(self.board, row, col, num):
            self.board[row][col] = num
            return True
        
        return False
    
    def clear_cell(self, row: int, col: int) -> bool:
        """清空指定單元格"""
        if self.initial_board[row][col] != 0:
            return False
        
        self.board[row][col] = 0
        return True
    
    def reset_to_initial(self):
        """重置到初始狀態"""
        self.board = copy.deepcopy(self.initial_board)
    
    def save_game(self, filename: str) -> bool:
        """保存遊戲到文件"""
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
            print(f"保存遊戲失敗: {e}")
            return False
    
    def load_game(self, filename: str) -> bool:
        """從文件加載遊戲"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                game_state = json.load(f)
            
            self.board = game_state['board']
            self.solution = game_state['solution']
            self.initial_board = game_state['initial_board']
            return True
        except Exception as e:
            print(f"加載遊戲失敗: {e}")
            return False
class SudokuGUI:
    """數獨圖形用戶界面 - 完美版"""
    
    def __init__(self, root):
        self.root = root
        self.root.title("eo玩數獨")
        self.root.geometry("750x850")
        self.root.resizable(False, False)
        
        self.game = SudokuGame()
        self.selected_cell = None
        self.difficulty = 1
        
        # 計時器相關變量
        self.start_time = None
        self.elapsed_time = timedelta(0)
        self.is_timer_running = False
        self.timer_paused = False
        
        self.setup_ui()
        self.new_game()
    
    def setup_ui(self):
        """設置用戶界面 - 優化佈局，所有按鈕完整顯示"""
        
        # 頂部標題
        title_frame = ttk.Frame(self.root, padding="5")
        title_frame.grid(row=0, column=0, sticky=(tk.W, tk.E))
        ttk.Label(title_frame, text="eo玩數獨", font=("Arial", 18, "bold")).pack()
        
        # 第一行：難度選擇和計時器
        top_frame = ttk.Frame(self.root, padding="10")
        top_frame.grid(row=1, column=0, sticky=(tk.W, tk.E))
        
        # 難度選擇
        difficulty_frame = ttk.Frame(top_frame)
        difficulty_frame.pack(side=tk.LEFT, padx=10)
        
        ttk.Label(difficulty_frame, text="難度：", font=("Arial", 10, "bold")).pack(side=tk.LEFT, padx=5)
        self.difficulty_var = tk.IntVar(value=1)
        for i in range(1, 6):
            ttk.Radiobutton(
                difficulty_frame, 
                text=f"{i}星", 
                variable=self.difficulty_var, 
                value=i,
                command=self.change_difficulty
            ).pack(side=tk.LEFT, padx=2)
        
        # 計時器顯示
        timer_frame = ttk.Frame(top_frame)
        timer_frame.pack(side=tk.RIGHT, padx=10)
        
        ttk.Label(timer_frame, text="遊戲時間：", font=("Arial", 10, "bold")).pack(side=tk.LEFT, padx=5)
        self.timer_label = ttk.Label(timer_frame, text="00:00:00", font=("Arial", 12, "bold"), foreground="blue")
        self.timer_label.pack(side=tk.LEFT, padx=5)
        
        # 第二行：所有功能按鈕 - 確保完整顯示
        button_frame = ttk.Frame(self.root, padding="5")
        button_frame.grid(row=2, column=0, sticky=(tk.W, tk.E))
        
        # 按鈕配置：使用tk.Button代替ttk.Button以支持字體設置
        button_width = 8
        button_height = 1
        
        # 第一排按鈕
        row1_frame = ttk.Frame(button_frame)
        row1_frame.pack(pady=2)
        
        tk.Button(row1_frame, text="新遊戲", command=self.new_game, font=("Arial", 9, "bold"), width=button_width, height=button_height, bg="lightgreen").pack(side=tk.LEFT, padx=2)
        tk.Button(row1_frame, text="重來", command=self.restart_game, font=("Arial", 9, "bold"), width=button_width, height=button_height, bg="lightyellow").pack(side=tk.LEFT, padx=2)
        tk.Button(row1_frame, text="提示", command=self.give_hint, font=("Arial", 9, "bold"), width=button_width, height=button_height, bg="lightblue").pack(side=tk.LEFT, padx=2)
        tk.Button(row1_frame, text="檢查", command=self.check_solution, font=("Arial", 9, "bold"), width=button_width, height=button_height, bg="lightcyan").pack(side=tk.LEFT, padx=2)
        tk.Button(row1_frame, text="暫停", command=self.toggle_timer, font=("Arial", 9, "bold"), width=button_width, height=button_height, bg="orange").pack(side=tk.LEFT, padx=2)
        tk.Button(row1_frame, text="保存", command=self.save_game, font=("Arial", 9, "bold"), width=button_width, height=button_height, bg="lightpink").pack(side=tk.LEFT, padx=2)
        tk.Button(row1_frame, text="加載", command=self.load_game, font=("Arial", 9, "bold"), width=button_width, height=button_height, bg="plum").pack(side=tk.LEFT, padx=2)
        
        # 數獨棋盤
        board_container = ttk.Frame(self.root, padding="10")
        board_container.grid(row=3, column=0)
        
        self.board_frame = ttk.Frame(board_container)
        self.board_frame.pack()
        
        self.cells = []
        for i in range(9):
            row_cells = []
            for j in range(9):
                # 創建3x3宮格的視覺效果
                frame = tk.Frame(
                    self.board_frame,
                    highlightbackground="black" if (i % 3 == 0 and j % 3 == 0) else "gray",
                    highlightthickness=2 if (i % 3 == 0 and j % 3 == 0) else 1
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
                    bd=2
                )
                cell.pack()
                cell.bind("<Button-1>", lambda e, row=i, col=j: self.cell_clicked(row, col))
                row_cells.append(cell)
            self.cells.append(row_cells)
        
        # 數字輸入按鈕
        number_frame = ttk.Frame(self.root, padding="10")
        number_frame.grid(row=4, column=0)
        
        ttk.Label(number_frame, text="點擊單元格後選擇數字 (1-9)：", font=("Arial", 10, "bold")).pack(pady=5)
        
        # 按順序排列1-9數字按鈕
        number_row = ttk.Frame(number_frame)
        number_row.pack(pady=5)
        
        for num in range(1, 10):
            btn = tk.Button(
                number_row,
                text=str(num),
                width=4,
                height=2,
                font=("Arial", 14, "bold"),
                command=lambda n=num: self.number_clicked(n),
                bg="lightblue"
            )
            btn.pack(side=tk.LEFT, padx=2)
        
        # 清除按鈕 - 放在數字按鈕下方
        clear_btn = tk.Button(
            number_frame,
            text="清除",
            width=36,
            height=2,
            font=("Arial", 12, "bold"),
            command=self.clear_cell,
            bg="lightcoral"
        )
        clear_btn.pack(pady=5)
        
        # 狀態欄
        self.status_var = tk.StringVar(value="準備就緒 - 請選擇難度後開始新遊戲")
        status_bar = ttk.Label(self.root, textvariable=self.status_var, relief=tk.SUNKEN)
        status_bar.grid(row=5, column=0, sticky=(tk.W, tk.E), pady=5)
        
        # 啟動計時器更新
        self.update_timer()
    
    def update_timer(self):
        """更新計時器顯示"""
        if self.is_timer_running and not self.timer_paused:
            if self.start_time:
                current_time = datetime.now()
                self.elapsed_time = current_time - self.start_time
                total_seconds = int(self.elapsed_time.total_seconds())
                hours = total_seconds // 3600
                minutes = (total_seconds % 3600) // 60
                seconds = total_seconds % 60
                time_str = f"{hours:02d}:{minutes:02d}:{seconds:02d}"
                self.timer_label.config(text=time_str)
        
        # 每1000毫秒更新一次
        self.root.after(1000, self.update_timer)
    
    def toggle_timer(self):
        """切換計時器暫停/繼續"""
        if not self.is_timer_running:
            # 開始計時
            self.is_timer_running = True
            self.timer_paused = False
            self.start_time = datetime.now() - self.elapsed_time
            self.status_var.set("計時器已啟動")
        else:
            if self.timer_paused:
                # 繼續計時
                self.timer_paused = False
                self.start_time = datetime.now() - self.elapsed_time
                self.status_var.set("計時器已繼續")
            else:
                # 暫停計時
                self.timer_paused = True
                self.status_var.set("計時器已暫停")
    
    def restart_game(self):
        """重來遊戲 - 重置到初始狀態"""
        if messagebox.askyesno("確認重來", "確定要重來這局遊戲嗎？\n所有進度將會重置。"):
            self.game.reset_to_initial()
            self.update_board()
            self.selected_cell = None
            # 重置計時器
            self.start_time = datetime.now()
            self.elapsed_time = timedelta(0)
            self.is_timer_running = True
            self.timer_paused = False
            self.status_var.set("遊戲已重來")
    
    def change_difficulty(self):
        """改變遊戲難度"""
        self.difficulty = self.difficulty_var.get()
        self.status_var.set(f"難度已設置為 {self.difficulty} 星")
    
    def new_game(self):
        """開始新遊戲"""
        self.game.generate_puzzle(self.difficulty)
        self.update_board()
        self.selected_cell = None
        
        # 重置計時器
        self.start_time = datetime.now()
        self.elapsed_time = timedelta(0)
        self.is_timer_running = True
        self.timer_paused = False
        
        self.status_var.set(f"新遊戲開始 - 難度: {self.difficulty} 星")
    
    def cell_clicked(self, row, col):
        """單元格被點擊"""
        # 清除之前的選擇
        if self.selected_cell:
            prev_row, prev_col = self.selected_cell
            if self.game.initial_board[prev_row][prev_col] == 0:
                self.cells[prev_row][prev_col].config(bg="white")
        
        # 選擇新單元格
        self.selected_cell = (row, col)
        if self.game.initial_board[row][col] == 0:
            self.cells[row][col].config(bg="lightyellow")
        self.status_var.set(f"選中單元格 ({row+1}, {col+1})")
    
    def number_clicked(self, num):
        """數字按鈕被點擊"""
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
            
            # 檢查是否完成
            if self.game.is_complete():
                if self.game.is_valid_solution():
                    # 停止計時器
                    self.is_timer_running = False
                    final_time = self.timer_label.cget("text")
                    messagebox.showinfo("恭喜！", f"你成功完成了數獨！\n用時：{final_time}")
                    self.status_var.set("遊戲完成！")
                else:
                    messagebox.showwarning("錯誤", "當前解決方案有誤，請檢查！")
        else:
            self.status_var.set(f"數字 {num} 不能放在 ({row+1}, {col+1})")
    
    def clear_cell(self):
        """清除選中的單元格"""
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
        """給出提示"""
        hint = self.game.get_hint()
        if hint:
            row, col, value = hint
            self.game.make_move(row, col, value)
            self.update_board()
            self.status_var.set(f"提示: ({row+1}, {col+1}) = {value}")
            
            if self.game.is_complete() and self.game.is_valid_solution():
                # 停止計時器
                self.is_timer_running = False
                final_time = self.timer_label.cget("text")
                messagebox.showinfo("恭喜！", f"你成功完成了數獨！\n用時：{final_time}")
                self.status_var.set("遊戲完成！")
        else:
            self.status_var.set("沒有可提示的單元格，數獨已完成！")
    
    def check_solution(self):
        """檢查當前解決方案是否正確"""
        if not self.game.is_complete():
            messagebox.showwarning("提示", "請先完成數獨再檢查！")
            self.status_var.set("數獨尚未完成，請繼續填寫")
            return
        
        if self.game.is_valid_solution():
            # 停止計時器
            self.is_timer_running = False
            final_time = self.timer_label.cget("text")
            messagebox.showinfo("恭喜！", f"你的解決方案完全正確！\n用時：{final_time}")
            self.status_var.set("解決方案正確！遊戲完成！")
        else:
            messagebox.showerror("錯誤", "當前解決方案有誤，請檢查！")
            self.status_var.set("解決方案有誤，請檢查錯誤")
    
    def update_board(self):
        """更新棋盤顯示"""
        for i in range(9):
            for j in range(9):
                value = self.game.board[i][j]
                if value == 0:
                    self.cells[i][j].config(text="", bg="white")
                else:
                    self.cells[i][j].config(text=str(value))
                    # 初始數字用不同顏色顯示
                    if self.game.initial_board[i][j] != 0:
                        self.cells[i][j].config(fg="blue", bg="lightgray")
                    else:
                        self.cells[i][j].config(fg="black", bg="white")
    
    def save_game(self):
        """保存遊戲"""
        filename = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        
        if filename:
            if self.game.save_game(filename):
                messagebox.showinfo("保存成功", f"遊戲已保存到: {filename}")
                self.status_var.set("遊戲保存成功")
            else:
                messagebox.showerror("保存失敗", "保存遊戲時出錯")
    
    def load_game(self):
        """加載遊戲"""
        filename = filedialog.askopenfilename(
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        
        if filename:
            if self.game.load_game(filename):
                self.update_board()
                self.selected_cell = None
                # 重置計時器
                self.start_time = datetime.now()
                self.elapsed_time = timedelta(0)
                self.is_timer_running = True
                self.timer_paused = False
                messagebox.showinfo("加載成功", f"遊戲已從 {filename} 加載")
                self.status_var.set("遊戲加載成功")
            else:
                messagebox.showerror("加載失敗", "加載遊戲時出錯")
def main():
    """主函數"""
    print("=" * 60)
    print("eo玩數獨 (繁體中文)")
    print("=" * 60)
    print("遊戲特性：")
    print("✓ 五顆星難度選擇 (1-5星)")
    print("✓ 無限制提示功能")
    print("✓ 存檔/讀檔功能")
    print("✓ 無時間限制")
    print("✓ 美觀的圖形界面")
    print("✓ 新增：檢查解決方案功能")
    print("✓ 新增：時間暫停/繼續功能")
    print("✓ 新增：重來功能")
    print("✓ 新增：計時器功能")
    print("✓ 統一使用繁體中文界面")
    print("\n修復問題：")
    print("✅ 所有按鈕完整顯示，不再隱藏")
    print("✅ 數字按鈕按1-9順序排列整齊")
    print("✅ 確保所有數字按鈕完整顯示")
    print("✅ 界面佈局優化，適合更大螢幕")
    print("\n遊戲操作說明：")
    print("1. 選擇難度星級後點擊'新遊戲'")
    print("2. 點擊空白單元格選中")
    print("3. 點擊數字按鈕(1-9)填入數字")
    print("4. 點擊'提示'按鈕獲取幫助")
    print("5. 點擊'檢查'按鈕驗證當前解答")
    print("6. 點擊'暫停'按鈕暫停/繼續計時")
    print("7. 點擊'重來'按鈕重置當前遊戲")
    print("8. 使用'保存'/'加載'按鈕管理遊戲進度")
    print("=" * 60)
    
    # 創建主窗口
    root = tk.Tk()
    
    # 創建遊戲應用
    app = SudokuGUI(root)
    
    # 啟動主循環
    root.mainloop()
if __name__ == "__main__":
    main()
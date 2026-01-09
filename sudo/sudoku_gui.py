import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from sudoku_core import SudokuGame
import os
class SudokuGUI:
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
                    highlightbackground="black",
                    highlightthickness=1 if (i % 3 == 0 or j % 3 == 0) else 0,
                    highlightbackground="black" if (i % 3 == 0 and j % 3 == 0) else "gray"
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
    root = tk.Tk()
    app = SudokuGUI(root)
    root.mainloop()
if __name__ == "__main__":
    main()
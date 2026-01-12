import tkinter as tk
from tkinter import ttk, messagebox
import random
import copy

# ==========================================
# 核心邏輯層 (Core Logic)
# ==========================================
class SudokuCore:
    def __init__(self):
        self.board = [[0 for _ in range(9)] for _ in range(9)]
        self.solution = [[0 for _ in range(9)] for _ in range(9)]
        self.original = [[0 for _ in range(9)] for _ in range(9)]

    def generate_board(self, difficulty=1):
        """
        生成數獨板。
        difficulty: 1 (簡單), 2 (中等), 3 (困難)
        """
        # 1. 先清空
        self.board = [[0 for _ in range(9)] for _ in range(9)]

        # 2. 填充對角線的三個 3x3 宮格 (這是獨立的，可以直接隨機填)
        for i in range(0, 9, 3):
            self._fill_box(i, i)

        # 3. 填充剩餘格子 (使用回溯法)
        self._solve_grid(self.board)
        self.solution = copy.deepcopy(self.board) # 儲存解答

        # 4. 根據難度挖空
        remove_count = {1: 30, 2: 40, 3: 50}.get(difficulty, 30)
        self._remove_digits(remove_count)
        self.original = copy.deepcopy(self.board) # 儲存題目初始狀態

    def _fill_box(self, row, col):
        num = 0
        for i in range(3):
            for j in range(3):
                while True:
                    num = random.randint(1, 9)
                    if self._is_safe_in_box(row, col, num):
                        break
                self.board[row + i][col + j] = num

    def _is_safe_in_box(self, row_start, col_start, num):
        for i in range(3):
            for j in range(3):
                if self.board[row_start + i][col_start + j] == num:
                    return False
        return True

    def _is_safe(self, grid, row, col, num):
        # 檢查行
        for x in range(9):
            if grid[row][x] == num: return False
        # 檢查列
        for x in range(9):
            if grid[x][col] == num: return False
        # 檢查 3x3 宮格
        start_row, start_col = row - row % 3, col - col % 3
        for i in range(3):
            for j in range(3):
                if grid[i + start_row][j + start_col] == num: return False
        return True

    def _solve_grid(self, grid):
        for i in range(9):
            for j in range(9):
                if grid[i][j] == 0:
                    for num in range(1, 10):
                        if self._is_safe(grid, i, j, num):
                            grid[i][j] = num
                            if self._solve_grid(grid):
                                return True
                            grid[i][j] = 0
                    return False
        return True

    def _remove_digits(self, count):
        while count > 0:
            cell_id = random.randint(0, 80)
            row, col = cell_id // 9, cell_id % 9
            if self.board[row][col] != 0:
                self.board[row][col] = 0
                count -= 1

    def check_valid(self, current_board):
        """檢查當前盤面是否正確（不一定是唯一解，僅檢查衝突）"""
        for r in range(9):
            for c in range(9):
                val = current_board[r][c]
                if val != 0:
                    # 暫時清空該格以檢查自身是否衝突
                    current_board[r][c] = 0
                    if not self._is_safe(current_board, r, c, val):
                        current_board[r][c] = val
                        return False
                    current_board[r][c] = val
        return True

    def is_solved(self, current_board):
        """檢查是否完全解出且正確"""
        for r in range(9):
            for c in range(9):
                if current_board[r][c] == 0: return False
        return self.check_valid(current_board)

# ==========================================
# UI 介面層 (UI & Styling)
# ==========================================

class ModernButton(tk.Button):
    """
    自定義按鈕類別，增加 Hover 效果與統一的樣式。
    繼承自標準 tk.Button 以獲得最大的顏色控制權。
    """
    def __init__(self, master, **kw):
        # 提取自定義顏色參數，若無則使用預設值
        self.default_bg = kw.pop('bg', '#E0E0E0')
        self.hover_bg = kw.pop('activebackground', '#BDBDBD')
        self.text_color = kw.pop('fg', '#333333')

        super().__init__(master, **kw)

        # 初始樣式設定
        self.configure(
            bg=self.default_bg,
            fg=self.text_color,
            font=('Microsoft JhengHei UI', 11, 'bold'),
            relief='flat',     # 扁平化
            borderwidth=0,
            padx=10,
            pady=8,
            cursor='hand2'     # 滑鼠變成手指形狀
        )

        # 綁定事件
        self.bind("<Enter>", self.on_enter)
        self.bind("<Leave>", self.on_leave)

    def on_enter(self, e):
        self['bg'] = self.hover_bg

    def on_leave(self, e):
        self['bg'] = self.default_bg

class SudokuUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Python Sudoku - 極致優化版")
        self.root.geometry("800x600")
        self.root.configure(bg="#F5F5F5") # 淺灰背景，護眼

        self.core = SudokuCore()
        self.selected_cell = None
        self.cells = {} # 儲存 (row, col) -> value (int)

        self._init_styles()
        self._setup_layout()
        self.start_new_game()

    def _init_styles(self):
        """定義全域樣式"""
        style = ttk.Style()
        style.theme_use('clam')
        # 定義 Frame 樣式
        style.configure('Card.TFrame', background='white', relief='flat')

    def _setup_layout(self):
        # --- 主容器 (左右分欄) ---
        main_container = tk.Frame(self.root, bg="#F5F5F5")
        main_container.pack(fill='both', expand=True, padx=20, pady=20)

        # 1. 左側：數獨棋盤區域 (使用 Canvas 自繪以獲得最高品質)
        self.canvas = tk.Canvas(main_container, width=540, height=540, bg='white', highlightthickness=0)
        self.canvas.pack(side='left', padx=(0, 20))
        self.canvas.bind("<Button-1>", self._on_canvas_click)
        self.root.bind("<Key>", self._on_key_press) # 綁定鍵盤輸入

        # 2. 右側：控制面板 (包含標題與優化後的按鈕)
        self.control_panel = tk.Frame(main_container, bg="#F5F5F5")
        self.control_panel.pack(side='right', fill='y', expand=True)

        self._create_sidebar_content()

    def _create_sidebar_content(self):
        """建立右側控制欄的內容，這是本次優化的核心"""

        # 標題區
        title_label = tk.Label(
            self.control_panel,
            text="數獨 SUDOKU",
            font=("Microsoft JhengHei UI", 24, "bold"),
            bg="#F5F5F5", fg="#2C3E50"
        )
        title_label.pack(pady=(0, 20), anchor='w')

        # === 難度選擇區塊 ===
        diff_frame = tk.LabelFrame(self.control_panel, text="難度選擇", font=("Microsoft JhengHei UI", 10), bg="#F5F5F5", fg="#7F8C8D")
        diff_frame.pack(fill='x', pady=10)

        self.difficulty_var = tk.IntVar(value=1)
        modes = [("簡單", 1), ("中等", 2), ("困難", 3)]

        for text, val in modes:
            rb = tk.Radiobutton(
                diff_frame, text=text, variable=self.difficulty_var, value=val,
                font=("Microsoft JhengHei UI", 10), bg="#F5F5F5", selectcolor="#F5F5F5", activebackground="#F5F5F5"
            )
            rb.pack(side='left', padx=10, pady=10)

        # === 主要功能按鈕區 (使用自定義 ModernButton) ===
        # 我們使用 Pack 的 padding 來創造呼吸感

        # 1. 新遊戲按鈕 (醒目色)
        btn_new = ModernButton(
            self.control_panel,
            text="✨ 開始新遊戲",
            bg="#3498DB", fg="white", activebackground="#2980B9",
            command=self.start_new_game
        )
        btn_new.pack(fill='x', pady=(20, 5))

        # 2. 重置按鈕
        btn_reset = ModernButton(
            self.control_panel,
            text="🔄 重置當前盤面",
            bg="#95A5A6", fg="white", activebackground="#7F8C8D",
            command=self.reset_game
        )
        btn_reset.pack(fill='x', pady=5)

        # 分隔線
        ttk.Separator(self.control_panel, orient='horizontal').pack(fill='x', pady=15)

        # 3. 檢查按鈕 (成功色)
        btn_check = ModernButton(
            self.control_panel,
            text="✅ 檢查答案",
            bg="#2ECC71", fg="white", activebackground="#27AE60",
            command=self.check_solution
        )
        btn_check.pack(fill='x', pady=5)

        # 4. 看解答按鈕 (警告色，避免誤觸)
        btn_solve = ModernButton(
            self.control_panel,
            text="💡 顯示解答",
            bg="#E67E22", fg="white", activebackground="#D35400",
            command=self.show_solution
        )
        btn_solve.pack(fill='x', pady=5)

        # 底部說明
        info_label = tk.Label(
            self.control_panel,
            text="操作說明：\n點擊格子並使用鍵盤數字鍵輸入。\nBackSpace 可清除。",
            font=("Microsoft JhengHei UI", 9),
            bg="#F5F5F5", fg="#7F8C8D", justify="left"
        )
        info_label.pack(side='bottom', pady=20, anchor='w')

    # ==========================================
    # 繪圖與互動邏輯
    # ==========================================
    def draw_grid(self):
        self.canvas.delete("all")
        w, h = 540, 540
        cell_size = 60

        # 畫背景格子
        for i in range(10):
            line_width = 3 if i % 3 == 0 else 1
            color = "#2C3E50" if i % 3 == 0 else "#BDC3C7"

            # 垂直線
            self.canvas.create_line(i * cell_size, 0, i * cell_size, h, width=line_width, fill=color)
            # 水平線
            self.canvas.create_line(0, i * cell_size, w, i * cell_size, width=line_width, fill=color)

        # 填入數字
        for r in range(9):
            for c in range(9):
                val = self.cells.get((r, c), 0)
                if val != 0:
                    x = c * cell_size + cell_size / 2
                    y = r * cell_size + cell_size / 2

                    # 判斷是否為題目預設數字 (顏色不同)
                    is_original = self.core.original[r][c] != 0
                    text_color = "#2C3E50" if is_original else "#3498DB" # 題目黑，輸入藍
                    font_weight = "bold" if is_original else "normal"

                    self.canvas.create_text(
                        x, y, text=str(val),
                        font=("Consolas", 24, font_weight), fill=text_color
                    )

        # 繪製選取框
        if self.selected_cell:
            r, c = self.selected_cell
            x1 = c * cell_size
            y1 = r * cell_size
            x2 = x1 + cell_size
            y2 = y1 + cell_size
            self.canvas.create_rectangle(x1, y1, x2, y2, outline="#E74C3C", width=3)

    def _on_canvas_click(self, event):
        col = event.x // 60
        row = event.y // 60
        if 0 <= col < 9 and 0 <= row < 9:
            # 只有非題目預設的格子可以選取
            if self.core.original[row][col] == 0:
                self.selected_cell = (row, col)
            else:
                self.selected_cell = None
            self.draw_grid()

    def _on_key_press(self, event):
        if not self.selected_cell:
            return

        row, col = self.selected_cell

        # 處理數字輸入
        if event.char in "123456789":
            self.cells[(row, col)] = int(event.char)
            self.draw_grid()

        # 處理刪除
        elif event.keysym in ("BackSpace", "Delete"):
            self.cells[(row, col)] = 0
            self.draw_grid()

    # ==========================================
    # 按鈕功能實作
    # ==========================================
    def start_new_game(self):
        diff = self.difficulty_var.get()
        self.core.generate_board(difficulty=diff)

        # 初始化 UI 資料
        self.cells = {}
        for r in range(9):
            for c in range(9):
                if self.core.board[r][c] != 0:
                    self.cells[(r, c)] = self.core.board[r][c]

        self.selected_cell = None
        self.draw_grid()

    def reset_game(self):
        """重置回初始題目狀態"""
        if messagebox.askyesno("確認", "確定要清除所有填入的數字嗎？"):
            for r in range(9):
                for c in range(9):
                    if self.core.original[r][c] == 0:
                        self.cells[(r, c)] = 0
            self.draw_grid()

    def check_solution(self):
        # 轉換當前 UI 狀態為矩陣
        current_board = [[0]*9 for _ in range(9)]
        is_full = True
        for r in range(9):
            for c in range(9):
                val = self.cells.get((r, c), 0)
                current_board[r][c] = val
                if val == 0: is_full = False

        if not is_full:
            messagebox.showinfo("提示", "格子還沒填完喔！")
            return

        if self.core.is_solved(current_board):
            messagebox.showinfo("恭喜", "🎉 答案正確！太厲害了！")
        else:
            messagebox.showerror("錯誤", "有些數字填錯囉，再檢查看看！")

    def show_solution(self):
        if messagebox.askyesno("投降", "確定要看解答嗎？遊戲將結束。"):
            for r in range(9):
                for c in range(9):
                    self.cells[(r, c)] = self.core.solution[r][c]
            self.selected_cell = None
            self.draw_grid()

if __name__ == "__main__":
    root = tk.Tk()
    app = SudokuUI(root)
    root.mainloop()

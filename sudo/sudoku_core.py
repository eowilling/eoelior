import random
import copy
import json
from typing import List, Tuple, Optional
class SudokuGame:
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
            return True  # 数独已解决
        
        row, col = empty_cell
        
        for num in range(1, 10):
            if self.is_valid(board, row, col, num):
                board[row][col] = num
                
                if self.solve_sudoku(board):
                    return True
                
                board[row][col] = 0  # 回溯
        
        return False
    
    def generate_complete_sudoku(self) -> List[List[int]]:
        """生成一个完整的数独解"""
        board = [[0 for _ in range(9)] for _ in range(9)]
        
        # 填充对角线的3x3宫格（这些宫格之间互不影响）
        for box in range(0, 9, 3):
            nums = list(range(1, 10))
            random.shuffle(nums)
            for i in range(3):
                for j in range(3):
                    board[box + i][box + j] = nums[i * 3 + j]
        
        # 使用回溯算法填充剩余部分
        self.solve_sudoku(board)
        return board
    
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
                    puzzle[row][col] = backup  # 恢复
            
            attempts += 1
        
        return puzzle
    
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
    
    def get_cells_to_remove(self, difficulty: int) -> int:
        """根据难度获取需要移除的单元格数量"""
        # 难度1-5星，移除的数字数量递增
        difficulty_levels = {
            1: random.randint(35, 40),   # 简单
            2: random.randint(41, 46),   # 中等
            3: random.randint(47, 52),   # 困难
            4: random.randint(53, 58),   # 专家
            5: random.randint(59, 64)    # 大师
        }
        return difficulty_levels.get(difficulty, 40)
    
    def generate_puzzle(self, difficulty: int = 1):
        """生成指定难度的数独谜题"""
        # 生成完整解
        self.solution = self.generate_complete_sudoku()
        
        # 根据难度移除数字
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
        
        # 随机选择一个空单元格
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
        
        # 检查所有行、列和宫格
        for i in range(9):
            for j in range(9):
                num = self.board[i][j]
                self.board[i][j] = 0  # 临时清空
                if not self.is_valid(self.board, i, j, num):
                    self.board[i][j] = num  # 恢复
                    return False
                self.board[i][j] = num  # 恢复
        
        return True
    
    def make_move(self, row: int, col: int, num: int) -> bool:
        """在指定位置放置数字"""
        if self.initial_board[row][col] != 0:  # 不能修改初始数字
            return False
        
        if self.is_valid(self.board, row, col, num):
            self.board[row][col] = num
            return True
        
        return False
    
    def clear_cell(self, row: int, col: int) -> bool:
        """清空指定单元格"""
        if self.initial_board[row][col] != 0:  # 不能清空初始数字
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
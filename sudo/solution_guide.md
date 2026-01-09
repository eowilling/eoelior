# 數獨遊戲批處理文件繁體中文顯示解決方案
## 問題描述
使用start_game.bat開啟遊戲時，命令字符需要用繁體中文，並且不要顯示亂碼。
## 解決方案
### 1. 編碼設置
- 使用 `chcp 950` 設定代碼頁為繁體中文(Big5)
- 設置 `PYTHONIOENCODING=utf-8` 確保Python輸出正確編碼
### 2. 批處理文件內容
```batch
@echo off
chcp 950 > nul
set PYTHONIOENCODING=utf-8
echo.
echo ============================================================
echo 數獨遊戲 - 完美版 (繁體中文)
echo ============================================================
echo.
echo 正在啟動遊戲...
echo.
python sudoku_perfect.py
echo.
echo 遊戲已結束
pause
```
### 3. 文件編碼
- **Big5編碼**：適合傳統Windows環境
- **UTF-8編碼**：適合現代系統
### 4. 使用說明
1. 直接雙擊 `start_game.bat` 即可運行
2. 如果仍有亂碼，嘗試使用 `start_game_utf8.bat`
3. 確保系統已安裝Python 3.6以上版本
## 技術細節
- `chcp 950`：設定控制台代碼頁為繁體中文
- `> nul`：隱藏命令輸出
- `set PYTHONIOENCODING=utf-8`：強制Python使用UTF-8編碼
- 錯誤處理：檢查Python是否安裝、遊戲文件是否存在
## 注意事項
- 確保所有文件在同一目錄下
- 如果系統不支持Big5編碼，請使用UTF-8版本
- 遊戲文件 `sudoku_perfect.py` 必須存在
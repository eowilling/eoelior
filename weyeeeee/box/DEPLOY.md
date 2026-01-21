# 部署指南
## GitHub Pages 部署步驟
1. **創建 GitHub 倉庫**
   ```bash
   # 在 GitHub 上創建新倉庫 eoelior
   ```
2. **上傳代碼**
   ```bash
   # 克隆倉庫
   git clone https://github.com/eowilling/eoelior.git
   cd eoelior
   
   # 創建 box 資料夾並複製文件
   mkdir box
   cp -r /path/to/files/* box/
   
   # 提交更改
   git add .
   git commit -m "Add lottery system"
   git push origin main
   ```
3. **啟用 GitHub Pages**
   - 前往 GitHub 倉庫頁面
   - 點擊 Settings → Pages
   - Source 選擇 "Deploy from a branch"
   - Branch 選擇 "main" 和 "/ (root)"
   - 點擊 Save
4. **訪問網站**
   - 網址：`https://eowilling.github.io/eoelior/box/`
   - 或直接訪問 `https://eowilling.github.io/eoelior/box/index.html`
## 使用說明
1. **首次使用**
   - 打開 `index.html`
   - 在「獎項管理」頁面添加獎項
   - 在「參與人員」頁面導入人員名單
2. **開始抽獎**
   - 在「抽獎」頁面選擇獎項
   - 點擊「開始抽獎」按鈕
   - 點擊「停止抽獎」確定中獎者
3. **查看結果**
   - 在「抽獎結果」頁面查看所有中獎記錄
   - 可導出 CSV 文件備份
## 注意事項
- 數據保存在瀏覽器本地存儲中
- 清除瀏覽器緩存會丟失數據
- 建議定期導出結果備份
- 支持所有現代瀏覽器
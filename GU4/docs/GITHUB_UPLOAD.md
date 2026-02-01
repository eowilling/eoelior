# 上傳到 GitHub 指南

## 📝 準備步驟

### 1. 檢查檔案
確認以下檔案已正確設定：
- ✅ `.gitignore` - 已設定忽略 .env 等敏感檔案
- ✅ `.env.example` - API 金鑰範本
- ✅ `README.md` - 專案說明
- ✅ `LICENSE` - 授權條款
- ✅ `requirements.txt` - Python 依賴清單

### 2. 創建 GitHub Repository

1. 訪問 https://github.com/new
2. Repository name: `GU4-Taiwan-Stock-Analysis`
3. Description: `基於 AI 的台灣股市智能分析系統`
4. Public（公開）或 Private（私有）
5. 不要勾選 "Initialize this repository with..."
6. 點擊 "Create repository"

## 🚀 上傳步驟

### 方法 1：使用 Git 命令（推薦）

```bash
# 1. 初始化 Git（如果還沒有的話）
cd C:\xampp\htdocs\eoelior\GU4
git init

# 2. 設定使用者資訊
git config user.name "你的名字"
git config user.email "你的email@example.com"

# 3. 添加所有檔案
git add .

# 4. 第一次提交
git commit -m "🎉 Initial commit: 台股智能分析系統 v1.0.0"

# 5. 設定遠端倉庫（替換成你的 GitHub 帳號）
git remote add origin https://github.com/你的帳號/GU4-Taiwan-Stock-Analysis.git

# 6. 推送到 GitHub
git branch -M main
git push -u origin main
```

### 方法 2：使用 GitHub Desktop（簡單）

1. 下載並安裝 [GitHub Desktop](https://desktop.github.com/)
2. 登入你的 GitHub 帳號
3. File → Add Local Repository
4. 選擇 `C:\xampp\htdocs\eoelior\GU4`
5. 點擊 "Publish repository"
6. 選擇 Public 或 Private
7. 點擊 "Publish"

## 🌐 設定 GitHub Pages（下載頁面）

### 啟用 GitHub Pages

1. 進入你的 Repository
2. Settings → Pages
3. Source 選擇: `Deploy from a branch`
4. Branch 選擇: `main` / `root`
5. 點擊 Save

### 訪問下載頁面

等待 1-2 分鐘後，你的下載頁面將可以訪問：
```
https://你的帳號.github.io/GU4-Taiwan-Stock-Analysis/download.html
```

## 📤 分享給朋友

### 分享方式 1：直接下載 ZIP

發送這個連結給朋友：
```
https://github.com/你的帳號/GU4-Taiwan-Stock-Analysis/archive/refs/heads/main.zip
```

### 分享方式 2：分享下載頁面

發送這個連結，朋友可以看到完整的介紹和下載：
```
https://你的帳號.github.io/GU4-Taiwan-Stock-Analysis/download.html
```

### 分享方式 3：分享 Repository

發送這個連結，朋友可以查看源碼：
```
https://github.com/你的帳號/GU4-Taiwan-Stock-Analysis
```

## 📱 朋友如何使用

### Windows 用戶（最簡單）

1. 點擊下載連結
2. 解壓縮 ZIP 檔案
3. 雙擊 `一鍵安裝.bat`
4. 按照提示輸入 API 金鑰
5. 雙擊 `執行分析.bat` 或 `啟動Web介面.bat`

### Mac/Linux 用戶

```bash
# 1. 下載並解壓縮，或使用 git clone
git clone https://github.com/你的帳號/GU4-Taiwan-Stock-Analysis.git
cd GU4-Taiwan-Stock-Analysis

# 2. 安裝依賴
pip install -r requirements.txt

# 3. 設定配置
cp .env.example .env
# 編輯 .env 填入 API 金鑰

# 4. 執行
python main.py          # 命令列版本
python web_app.py       # Web UI 版本
```

## 🔄 更新專案

當你修改了程式碼，上傳更新：

```bash
# 1. 檢查修改
git status

# 2. 添加修改的檔案
git add .

# 3. 提交修改
git commit -m "📝 更新說明"

# 4. 推送到 GitHub
git push
```

## 🎨 自訂下載頁面

編輯 `download.html`，修改以下內容：

1. **GitHub 連結** - 搜尋並替換 `你的帳號` 為實際帳號
2. **標題和描述** - 修改成你想要的文案
3. **顏色主題** - 修改 CSS 中的顏色變數
4. **截圖** - 添加實際的系統截圖

## ⚠️ 重要提醒

### 不要上傳的檔案（已設定 .gitignore）

- ❌ `.env` - 包含 API 金鑰
- ❌ `__pycache__/` - Python 快取
- ❌ `*.log` - 日誌檔案
- ❌ 個人資料和測試資料

### 上傳前檢查清單

- ✅ 移除所有個人 API 金鑰
- ✅ 確認 `.env.example` 正確無誤
- ✅ 測試 `一鍵安裝.bat` 能正常執行
- ✅ README.md 中的連結正確
- ✅ 授權條款已設定

## 🆘 常見問題

### Q: 推送失敗，提示認證錯誤？
A: GitHub 已不支援密碼認證，需要使用 Personal Access Token
   - Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - 勾選 `repo` 權限
   - 使用產生的 token 作為密碼

### Q: 檔案太大無法上傳？
A: GitHub 單檔限制 100MB
   - 檢查是否誤上傳大型檔案
   - 使用 Git LFS 處理大檔案

### Q: 如何讓朋友看到最新版本？
A: 使用 Releases 功能
   - Repository → Releases → Create a new release
   - Tag version: `v1.0.0`
   - Release title: `v1.0.0 - 初始版本`
   - 添加版本說明
   - 發布後會出現在 Releases 頁面

## 📊 追蹤使用情況

添加 GitHub Badges 到 README.md：

```markdown
![GitHub stars](https://img.shields.io/github/stars/你的帳號/GU4-Taiwan-Stock-Analysis)
![GitHub forks](https://img.shields.io/github/forks/你的帳號/GU4-Taiwan-Stock-Analysis)
![GitHub issues](https://img.shields.io/github/issues/你的帳號/GU4-Taiwan-Stock-Analysis)
```

## 🎉 完成！

恭喜你的專案已經成功上傳到 GitHub！

現在你可以：
- 📤 分享下載頁面給朋友
- ⭐ 邀請朋友 Star 你的專案
- 🐛 接收使用者的 Issue 回報
- 🤝 接受其他開發者的 Pull Request

# 上傳 OpenUpPng 到 GitHub 指南

## 準備工作

### 1. 確認 Git 已安裝

```powershell
git --version
```

如果沒有安裝，請從 [git-scm.com](https://git-scm.com/) 下載安裝。

### 2. 配置 Git（如果是第一次使用）

```powershell
git config --global user.name "您的名字"
git config --global user.email "您的郵箱"
```

## 上傳步驟

### 方法 1: 使用命令列（推薦）

#### 步驟 1: 初始化 Git 倉庫

```powershell
cd C:\xampp\htdocs\eoelior\OpenUpPng
git init
```

#### 步驟 2: 添加所有檔案

```powershell
git add .
```

#### 步驟 3: 創建第一次提交

```powershell
git commit -m "Initial commit: OpenUpPng - 圖片轉 PNG 上傳工具"
```

#### 步驟 4: 在 GitHub 上創建新倉庫

1. 訪問 [github.com](https://github.com)
2. 點擊右上角的 "+" → "New repository"
3. 填寫倉庫資訊：
   - **Repository name**: `OpenUpPng` 或您喜歡的名稱
   - **Description**: `圖片上傳與 PNG 轉換工具 - 自動轉換圖片為 PNG 格式並生成公開分享連結`
   - **Public** 或 **Private**: 根據需求選擇
   - **不要**勾選 "Initialize this repository with a README"（我們已經有了）
4. 點擊 "Create repository"

#### 步驟 5: 連接到 GitHub 倉庫

複製 GitHub 顯示的 URL（例如：`https://github.com/您的用戶名/OpenUpPng.git`），然後執行：

```powershell
git remote add origin https://github.com/您的用戶名/OpenUpPng.git
git branch -M main
git push -u origin main
```

### 方法 2: 使用 GitHub Desktop

1. 下載並安裝 [GitHub Desktop](https://desktop.github.com/)
2. 開啟 GitHub Desktop
3. File → Add Local Repository
4. 選擇 `C:\xampp\htdocs\eoelior\OpenUpPng`
5. 如果提示初始化倉庫，點擊 "create a repository"
6. 填寫提交訊息並點擊 "Commit to main"
7. 點擊 "Publish repository" 上傳到 GitHub

## 檔案說明

### 已包含的檔案

- ✅ `index.html` - 主頁面
- ✅ `style.css` - 樣式表
- ✅ `script.js` - JavaScript 邏輯
- ✅ `upload.php` - 上傳處理
- ✅ `get_images.php` - 圖片列表 API
- ✅ `cleanup.php` - 自動清理腳本
- ✅ `.htaccess` - Apache 配置
- ✅ `README.md` - 專案說明
- ✅ `STARTUP_GUIDE.md` - 啟動指南
- ✅ `.gitignore` - Git 忽略規則
- ✅ `uploads/.gitkeep` - 保留 uploads 目錄

### 被忽略的檔案（不會上傳）

- ❌ `uploads/*.png` - 已上傳的圖片（用戶數據）
- ❌ `*.log` - 日誌檔案
- ❌ `test.php` - 測試檔案（可選）

## 後續更新

當您修改程式碼後，可以這樣更新到 GitHub：

```powershell
# 查看修改的檔案
git status

# 添加所有修改
git add .

# 提交修改
git commit -m "描述您的修改內容"

# 推送到 GitHub
git push
```

## 建議的 GitHub 倉庫設定

### README.md 徽章（可選）

在 README.md 頂部添加一些徽章讓專案看起來更專業：

```markdown
![PHP Version](https://img.shields.io/badge/PHP-%3E%3D7.4-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)
```

### Topics（標籤）

在 GitHub 倉庫頁面添加相關標籤：
- `php`
- `image-upload`
- `png-converter`
- `file-sharing`
- `web-application`
- `xampp`

### License（授權）

建議添加 MIT License：

1. 在 GitHub 倉庫頁面點擊 "Add file" → "Create new file"
2. 檔案名稱輸入 `LICENSE`
3. 點擊右側的 "Choose a license template"
4. 選擇 "MIT License"
5. 填寫年份和名字
6. 點擊 "Commit new file"

## 部署到 GitHub Pages（可選）

由於這個專案需要 PHP 後端，無法直接部署到 GitHub Pages。但您可以：

1. **使用免費 PHP 主機**：
   - [InfinityFree](https://infinityfree.net/)
   - [000webhost](https://www.000webhost.com/)
   - [Heroku](https://www.heroku.com/)（需要配置）

2. **在 README 中添加 Demo 連結**：
   部署後，在 README.md 中添加：
   ```markdown
   ## 🌐 線上 Demo
   [點擊這裡查看線上版本](https://your-demo-url.com)
   ```

## 安全提醒

上傳到 GitHub 前請確認：

- ✅ 沒有包含敏感資訊（密碼、API 金鑰等）
- ✅ `.gitignore` 已正確配置
- ✅ 用戶上傳的圖片不會被提交
- ✅ 日誌檔案被忽略

## 範例倉庫描述

```
OpenUpPng - 圖片轉 PNG 上傳工具

🖼️ 一個現代化的圖片上傳工具，自動將上傳的圖片轉換為 PNG 格式並提供公開分享連結。

特色功能：
✨ 支援多種圖片格式自動轉換為 PNG
📤 拖曳上傳介面
🔗 自動生成公開分享連結
⏰ 圖片 3 天後自動刪除
🎨 現代化深色主題設計
📱 響應式佈局

技術棧: PHP, JavaScript, HTML5, CSS3
```

## 完成！

上傳完成後，您的專案將可以在以下位置訪問：
```
https://github.com/您的用戶名/OpenUpPng
```

其他人可以通過以下方式使用您的專案：

```bash
git clone https://github.com/您的用戶名/OpenUpPng.git
cd OpenUpPng
# 按照 STARTUP_GUIDE.md 的說明啟動
```

# GitHub Pages 部署說明

## ⚠️ 重要提醒

**GitHub Pages 不支援 PHP！**

您的 OpenUpPng 應用程式使用 PHP 後端（`upload.php`, `get_images.php`, `cleanup.php`），這些檔案在 GitHub Pages 上**無法運行**。

GitHub Pages 只支援：
- ✅ 靜態 HTML
- ✅ CSS
- ✅ JavaScript
- ❌ PHP（不支援）
- ❌ 後端處理（不支援）

## 🌐 您的 GitHub Pages 網址

https://eowilling.github.io/eoelior/OpenUpPng/

**目前狀態：**
- ✅ 前端介面可以顯示
- ❌ 上傳功能無法使用（需要 PHP）
- ❌ 圖片庫無法載入（需要 PHP）

## 💡 解決方案

### 方案 1: 使用免費 PHP 主機（推薦）

部署到支援 PHP 的免費主機：

#### A. InfinityFree（推薦）
- 網址：https://infinityfree.net/
- 免費提供：PHP, MySQL, 無限流量
- 步驟：
  1. 註冊帳號
  2. 創建網站
  3. 上傳所有檔案到 `htdocs/`
  4. 訪問您的網站 URL

#### B. 000webhost
- 網址：https://www.000webhost.com/
- 免費提供：PHP, MySQL
- 類似步驟

#### C. Vercel（需要修改）
- 網址：https://vercel.com/
- 支援 PHP（通過 Serverless Functions）
- 需要修改檔案結構

### 方案 2: 僅使用 GitHub 作為圖片存儲

如果您只想用 GitHub 存儲圖片：

1. **在本地使用 XAMPP 運行 OpenUpPng**
   - 上傳和轉換圖片

2. **手動上傳圖片到 GitHub**
   ```powershell
   git add uploads/*.png
   git commit -m "Add images"
   git push
   ```

3. **使用 GitHub 的圖片連結**
   ```
   https://raw.githubusercontent.com/eowilling/eoelior/master/OpenUpPng/uploads/圖片名稱.png
   ```

### 方案 3: 改用純前端方案（進階）

將 OpenUpPng 改為純前端應用：

- 使用 JavaScript 在瀏覽器中轉換圖片
- 使用 GitHub API 直接上傳圖片
- 需要 GitHub Personal Access Token
- 需要大幅修改程式碼

## 🚀 快速開始：使用免費 PHP 主機

### InfinityFree 部署步驟

1. **註冊並創建網站**
   - 訪問 https://infinityfree.net/
   - 註冊免費帳號
   - 創建新網站

2. **上傳檔案**
   - 使用 FTP 客戶端（如 FileZilla）
   - 或使用網頁版檔案管理器
   - 上傳所有檔案到 `htdocs/` 目錄

3. **訪問您的網站**
   - 使用分配的免費域名
   - 例如：`yoursite.infinityfreeapp.com`

4. **測試功能**
   - 上傳圖片
   - 獲取圖片連結
   - 分享到 OPENCLAW

## 📝 當前 GitHub 倉庫用途

您的 GitHub 倉庫（https://github.com/eowilling/eoelior）可以用於：

1. **程式碼版本控制**
   - 保存和追蹤程式碼變更
   - 與他人分享原始碼

2. **圖片存儲**
   - 存儲已上傳的 PNG 圖片
   - 提供穩定的圖片連結

3. **展示專案**
   - 在 GitHub Pages 上展示前端介面
   - 作為專案說明頁面

## 🔧 修改 sync_to_github.bat

由於您使用 `master` 分支，更新同步腳本：

```batch
@echo off
cd /d "%~dp0"
git add uploads/*.png
git commit -m "Sync images %date% %time%"
git push origin master
echo 圖片已同步到 GitHub！
pause
```

## 📊 總結

| 功能 | GitHub Pages | 免費 PHP 主機 | 本地 XAMPP |
|------|-------------|--------------|-----------|
| 顯示前端 | ✅ | ✅ | ✅ |
| 上傳圖片 | ❌ | ✅ | ✅ |
| PNG 轉換 | ❌ | ✅ | ✅ |
| 自動刪除 | ❌ | ✅ | ✅ |
| 圖片存儲 | ✅ | ✅ | ✅ |

## 🎯 建議方案

**最佳組合：**
1. 使用 **InfinityFree** 部署完整應用程式
2. 使用 **GitHub** 作為程式碼倉庫和備份
3. 使用 **本地 XAMPP** 進行開發和測試

這樣您就能：
- ✅ 完整使用所有功能
- ✅ 免費託管
- ✅ 穩定的圖片連結
- ✅ 版本控制

## 🔗 有用的連結

- GitHub 倉庫：https://github.com/eowilling/eoelior
- GitHub Pages：https://eowilling.github.io/eoelior/OpenUpPng/
- 圖片連結格式：https://raw.githubusercontent.com/eowilling/eoelior/master/OpenUpPng/uploads/圖片名稱.png

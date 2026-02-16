# OpenUpPng - GitHub 圖床方案

## 💡 使用 GitHub 作為圖床

將 OpenUpPng 上傳到 GitHub 後，您可以利用 GitHub 作為免費的圖片存放空間！

## 🎯 優勢

1. **免費存儲空間** - GitHub 提供免費的倉庫空間
2. **穩定的 CDN** - GitHub 的圖片連結穩定可靠
3. **版本控制** - 可以追蹤圖片的上傳歷史
4. **公開分享** - 圖片連結可以直接分享給任何人

## 📝 使用方式

### 方案 A: 直接提交圖片到 GitHub（推薦用於重要圖片）

如果您想要永久保存某些圖片，可以修改 `.gitignore`：

```bash
# 編輯 .gitignore，移除或註釋掉這一行：
# uploads/*.png
```

然後提交圖片：

```powershell
cd C:\xampp\htdocs\eoelior\OpenUpPng

# 添加特定圖片
git add uploads/img_xxxxx.png

# 或添加所有圖片
git add uploads/*.png

# 提交
git commit -m "Add images"

# 推送到 GitHub
git push
```

**圖片連結格式：**
```
https://raw.githubusercontent.com/您的用戶名/OpenUpPng/main/uploads/圖片名稱.png
```

### 方案 B: 使用 GitHub Issues 作為圖床（更簡單）

1. 在您的 GitHub 倉庫中創建一個 Issue
2. 直接拖曳圖片到 Issue 的評論框
3. GitHub 會自動上傳並生成連結
4. 複製生成的連結使用

**優點：**
- 不需要 git 命令
- 上傳速度快
- 自動生成 CDN 連結

### 方案 C: 使用 GitHub Releases

1. 在 GitHub 倉庫頁面點擊 "Releases"
2. 創建新的 Release
3. 上傳圖片作為附件
4. 獲得永久下載連結

## 🔧 修改 OpenUpPng 以支援 GitHub 圖床

### 選項 1: 保留本地上傳，手動同步到 GitHub

保持現有功能，需要分享時手動提交到 GitHub：

```powershell
# 快速提交腳本
git add uploads/*.png
git commit -m "Update images $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push
```

### 選項 2: 修改為直接使用 GitHub API（進階）

可以修改 `upload.php` 直接通過 GitHub API 上傳圖片，但需要：
- GitHub Personal Access Token
- 修改上傳邏輯

### 選項 3: 混合方案（推薦）

1. **本地測試** - 使用 XAMPP 本地上傳和預覽
2. **重要圖片** - 手動提交到 GitHub 獲得永久連結
3. **臨時圖片** - 保持 3 天自動刪除

## 📦 建議的 .gitignore 配置

### 如果您想要所有圖片都上傳到 GitHub：

```gitignore
# 移除 uploads/*.png 這一行
# 這樣所有圖片都會被追蹤

# 但保留其他忽略規則
*.log
.DS_Store
test.php
```

### 如果您想要選擇性上傳：

使用 git 的強制添加功能：

```powershell
# 即使在 .gitignore 中，也強制添加特定圖片
git add -f uploads/重要圖片.png
```

## 🌐 獲取 GitHub 圖片連結

上傳到 GitHub 後，圖片連結格式：

```
# Raw 連結（直接顯示圖片）
https://raw.githubusercontent.com/用戶名/OpenUpPng/main/uploads/img_xxxxx.png

# 或使用 GitHub 的 CDN
https://github.com/用戶名/OpenUpPng/raw/main/uploads/img_xxxxx.png
```

## 💾 存儲限制

- **倉庫大小限制**: 建議不超過 1GB
- **單個檔案限制**: 100MB（使用 Git LFS 可以更大）
- **推送大小限制**: 單次推送不超過 2GB

## 🚀 快速開始

1. **初始化並上傳到 GitHub**：
   ```powershell
   cd C:\xampp\htdocs\eoelior\OpenUpPng
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/您的用戶名/OpenUpPng.git
   git push -u origin main
   ```

2. **上傳圖片**：
   - 使用本地 OpenUpPng 上傳圖片
   - 圖片會保存在 `uploads/` 目錄

3. **同步到 GitHub**：
   ```powershell
   git add uploads/*.png
   git commit -m "Add new images"
   git push
   ```

4. **獲取分享連結**：
   ```
   https://raw.githubusercontent.com/您的用戶名/OpenUpPng/main/uploads/圖片名稱.png
   ```

## 📱 在 OPENCLAW 中使用

上傳到 GitHub 後，您可以：

1. 使用本地 OpenUpPng 上傳和轉換圖片
2. 將圖片提交到 GitHub
3. 獲取 GitHub 的圖片連結
4. 在 OPENCLAW 中使用這個連結分享圖片

## ⚡ 自動化腳本（可選）

創建一個快速同步腳本 `sync_to_github.bat`：

```batch
@echo off
cd C:\xampp\htdocs\eoelior\OpenUpPng
git add uploads/*.png
git commit -m "Sync images %date% %time%"
git push
echo 圖片已同步到 GitHub！
pause
```

雙擊執行即可快速同步所有圖片到 GitHub。

## 🎉 完成！

現在您有了：
- ✅ 本地圖片上傳和轉換工具
- ✅ GitHub 作為永久圖片存儲
- ✅ 穩定的圖片分享連結
- ✅ 免費的 CDN 加速

完美的圖床解決方案！🎊

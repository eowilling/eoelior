# 🔥 Firebase 連線問題排查指南

## ✅ 已完成的修復

1. ✅ **已加入 Firebase 配置文件載入**
   - 在 `index.html` 的 `<head>` 中加入 `<script src="firebase-config.js"></script>`

2. ✅ **已加入 Firebase SDK**
   - 在 `</body>` 前加入 Firebase SDK 和初始化代碼

## 🔍 需要檢查的項目

### 1. GitHub Secrets 設定

前往你的 GitHub 專案設定頁面檢查：
```
https://github.com/eowilling/eoelior/settings/secrets/actions
```

確保以下 Secrets 都已設定（不是在 Environment Secrets，而是在 Repository Secrets）：

- ✅ `FIREBASE_API_KEY`
- ✅ `FIREBASE_AUTH_DOMAIN`
- ✅ `FIREBASE_PROJECT_ID`
- ✅ `FIREBASE_STORAGE_BUCKET`
- ✅ `FIREBASE_MESSAGING_SENDER_ID`
- ✅ `FIREBASE_APP_ID`
- ✅ `FIREBASE_MEASUREMENT_ID`
- ✅ `GEMINI_API_KEY`

### 2. GitHub Actions 權限設定

前往：
```
https://github.com/eowilling/eoelior/settings/actions
```

確保以下設定正確：

1. **Workflow permissions** 設定為：
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

2. **Actions permissions** 設定為：
   - ✅ Allow all actions and reusable workflows

### 3. GitHub Pages 設定

前往：
```
https://github.com/eowilling/eoelior/settings/pages
```

確保：
- ✅ Source 設定為 **GitHub Actions**（不是 Deploy from a branch）

### 4. 觸發部署

修改完成後，需要推送代碼到 GitHub 來觸發自動部署：

```bash
git add .
git commit -m "Fix: 加入 Firebase SDK 和配置載入"
git push origin main
```

### 5. 檢查部署狀態

前往 GitHub Actions 頁面查看部署狀態：
```
https://github.com/eowilling/eoelior/actions
```

點擊最新的 workflow run，檢查是否有錯誤訊息。

## 🧪 測試 Firebase 連線

部署完成後，開啟瀏覽器的開發者工具（F12），前往你的網站：

```
https://eowilling.github.io/eoelior/eveday/
```

在 Console 中應該看到：
```
✅ Firebase 配置已載入
✅ Firebase 匿名登入成功
✅ Firebase 使用者已認證: [user-id]
```

如果看到錯誤，請將錯誤訊息告訴我！

## 🔑 Firebase 專案設定檢查

前往 Firebase Console：
```
https://console.firebase.google.com/project/eoelior-17bed
```

### Authentication 設定
1. 前往 **Authentication** > **Sign-in method**
2. 確保 **Anonymous** 已啟用

### Firestore 設定
1. 前往 **Firestore Database**
2. 確保資料庫已建立
3. 檢查 **Rules** 是否正確設定

### Web App 設定
1. 前往 **Project Settings** > **General**
2. 檢查 Web App 是否已註冊
3. 確認 API Key 和配置資訊與 GitHub Secrets 一致

## 🚨 常見錯誤排除

### 錯誤 1: "Firebase: Error (auth/configuration-not-found)"
**原因**：Firebase 配置文件未載入或配置錯誤
**解決方法**：
1. 檢查 `firebase-config.js` 是否存在
2. 檢查 GitHub Secrets 是否正確設定
3. 重新觸發 GitHub Actions 部署

### 錯誤 2: "Firebase: Error (auth/unauthorized-domain)"
**原因**：你的網域未在 Firebase 中授權
**解決方法**：
1. 前往 Firebase Console > Authentication > Settings > Authorized domains
2. 加入 `eowilling.github.io`
3. 如果本地測試，也要加入 `localhost`

### 錯誤 3: "Failed to fetch firebase-config.js"
**原因**：配置文件路徑錯誤或未生成
**解決方法**：
1. 檢查 GitHub Actions workflow 是否成功執行
2. 確認 deploy.yml 中有生成 firebase-config.js 的步驟

## 📞 還是無法解決？

請提供以下資訊：

1. 瀏覽器 Console 中的完整錯誤訊息
2. GitHub Actions 執行的錯誤訊息（如果有）
3. 你的 Firebase 專案 ID
4. 你正在訪問的網址

我會進一步協助你解決問題！

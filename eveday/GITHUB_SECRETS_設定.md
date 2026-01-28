# GitHub Secrets 設定指南

## 📋 需要設定的 Secrets

前往 GitHub 專案設定頁面:

```
https://github.com/eowilling/eoelior/settings/secrets/actions
```

點擊 **"New repository secret"** 並新增以下 Secrets:

### Firebase 設定

1. **FIREBASE_API_KEY**

   ```
   AIzaSyDRjxIWJc5BabyvRbhR6uZ8ZaO3J70OKfc
   ```

2. **FIREBASE_AUTH_DOMAIN**

   ```
   eoelior-17bed.firebaseapp.com
   ```

3. **FIREBASE_PROJECT_ID**

   ```
   eoelior-17bed
   ```

4. **FIREBASE_STORAGE_BUCKET**

   ```
   eoelior-17bed.firebasestorage.app
   ```

5. **FIREBASE_MESSAGING_SENDER_ID**

   ```
   722816989754
   ```

6. **FIREBASE_APP_ID**

   ```
   1:722816989754:web:4ec2a41fe13c96db769303
   ```

7. **FIREBASE_MEASUREMENT_ID**

   ```
   G-Y0D90RPHNF
   ```

### Gemini API

1. **GEMINI_API_KEY**
   - 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)
   - 創建新的 API 金鑰
   - 複製金鑰並添加到 GitHub Secrets
   - ⚠️ **重要：切勿在此文件或任何文件中貼上實際的 API 金鑰！**
   - 格式範例：`AIzaSy...YOUR_KEY_HERE`

---

## ✅ 設定完成後

每次 push 到 main 分支時,GitHub Actions 會:

1. 從 Secrets 讀取 API Key
2. 動態生成 `firebase-config.js`
3. 部署到 GitHub Pages

**您的 API Key 永遠不會出現在 Git 歷史中!** 🔒

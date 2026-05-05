# Firebase 連線測試檢查清單

## ✅ 測試步驟

### 1. 開啟測試頁面
- 在瀏覽器中開啟 `buytonobuy/index.html`
- 或通過伺服器訪問（例如：`http://localhost/buytonobuy/index.html`）

### 2. 檢查連線狀態
查看右上角的連線狀態顯示：
- ✅ **綠色「雲端已連線」** = Firebase 連線成功
- 🟡 **黃色「連線中...」** = 正在嘗試連線
- ⚪ **灰色「未連線」** = Firebase 未啟用或配置錯誤
- ❌ **「連線失敗」** = 配置或權限問題

### 3. 檢查瀏覽器控制台（F12）
開啟開發者工具（F12），查看 Console 標籤：

#### 成功訊息應該看到：
```
✅ Firebase 配置載入成功
✅ Firebase 初始化成功
✅ 認證成功 (UID: xxxxx...)
```

#### 錯誤訊息可能看到：
```
❌ Firebase 配置解析失敗: ...
❌ Firebase 初始化失敗: ...
❌ 權限被拒絕: ...
```

### 4. 測試轉盤功能
- [ ] 轉盤能正常顯示
- [ ] 點擊「開始旋轉」按鈕能正常旋轉
- [ ] 結果能正常顯示

### 5. 測試雲端分享功能
- [ ] 點擊「生成分享連結」按鈕
- [ ] 確認按鈕狀態變為「儲存中...」
- [ ] 等待完成後，分享連結應該顯示在下方
- [ ] 點擊「複製連結」按鈕測試複製功能

### 6. 測試分享連結載入
- [ ] 複製分享連結
- [ ] 在新分頁開啟連結（應該包含 `?share=xxx` 參數）
- [ ] 確認轉盤配置自動載入

---

## 🔍 常見問題排查

### 問題 1: 「未檢測到外部 Firebase 配置」
**原因**：`firebase-config.js` 檔案未正確載入

**解決方案**：
1. 確認 `firebase-config.js` 檔案存在於 `buytonobuy/` 目錄
2. 確認 `index.html` 的 `<head>` 中有 `<script src="firebase-config.js"></script>`
3. 檢查瀏覽器 Network 標籤，確認 `firebase-config.js` 載入成功（狀態碼 200）

### 問題 2: 「Firebase 初始化失敗」
**原因**：配置資訊錯誤或專案不存在

**解決方案**：
1. 確認 Firebase Console 中的配置資訊正確
2. 檢查 `apiKey`、`projectId` 等欄位是否正確
3. 確認 Firebase 專案已啟用 Firestore Database

### 問題 3: 「權限被拒絕」或「Permission denied」
**原因**：Firestore 安全規則未設定或過於嚴格

**解決方案**：
1. 前往 Firebase Console → Firestore Database → 規則
2. 暫時使用測試模式規則：
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. 發布規則後重新測試

### 問題 4: 「CORS 錯誤」
**原因**：API Key 未設定允許的網域

**解決方案**：
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. API 和服務 → 憑證
3. 找到您的 API Key 並點擊編輯
4. 在「應用程式限制」中設定「HTTP 參照網址」
5. 加入您的網域（例如：`http://localhost/*`、`https://yourdomain.com/*`）

---

## 🎯 成功指標

當所有測試通過時，您應該看到：

1. ✅ 右上角顯示綠色「雲端已連線」
2. ✅ 控制台無錯誤訊息
3. ✅ 「生成分享連結」按鈕能正常運作
4. ✅ 分享連結能成功生成並可複製
5. ✅ 透過分享連結開啟時，配置能自動載入

---

## 📝 下一步

測試成功後，建議：

1. **設定 Firestore 安全規則**（參見 `FIREBASE_SETUP.md`）
2. **設定 API Key 限制**（限制僅允許您的網域使用）
3. **測試分享功能**（確認配置能正確儲存和載入）

# Firebase 認證失敗排除指南

## 🔍 常見錯誤與解決方案

### 錯誤 1: `auth/operation-not-allowed` - 匿名認證未啟用

**錯誤訊息**：
```
❌ Firebase 匿名認證失敗: auth/operation-not-allowed
```

**原因**：Firebase 專案中未啟用匿名登入方式

**解決步驟**：

1. **前往 Firebase Console**
   - 訪問 [Firebase Console](https://console.firebase.google.com/)
   - 選擇您的專案：`eoelior-17bed`

2. **啟用匿名認證**
   - 在左側選單點擊「Authentication」
   - 如果尚未設定，點擊「開始使用」
   - 點擊「登入方式」分頁
   - 在登入提供者列表中找到「匿名」
   - 點擊「匿名」選項
   - **啟用**「匿名」登入方式
   - 點擊「儲存」

3. **重新測試**
   - 重新整理頁面
   - 查看控制台是否顯示「✅ Firebase 認證成功」

---

### 錯誤 2: `auth/unauthorized-domain` - 未授權的網域

**錯誤訊息**：
```
❌ Firebase 匿名認證失敗: auth/unauthorized-domain
```

**原因**：當前網域未在 Firebase 授權網域列表中

**解決步驟**：

1. **前往 Firebase Console**
   - Authentication → 設定 → 授權網域

2. **添加授權網域**
   - 點擊「新增網域」
   - 輸入您的網域：
     - 開發環境：`localhost`
     - 生產環境：您的實際網域（例如：`yourdomain.com`）
   - 點擊「新增」

3. **重新測試**

---

### 錯誤 3: `auth/api-key-not-valid` - API Key 無效

**錯誤訊息**：
```
❌ Firebase 匿名認證失敗: auth/api-key-not-valid
```

**原因**：配置檔案中的 API Key 錯誤或已失效

**解決步驟**：

1. **檢查配置檔案**
   - 開啟 `firebase-config.js`
   - 確認 `apiKey` 是否正確

2. **重新取得 API Key**
   - 前往 Firebase Console → 專案設定（⚙️）
   - 在「您的應用程式」區塊找到您的 Web 應用程式
   - 複製 `apiKey` 欄位
   - 更新 `firebase-config.js` 中的 `apiKey`

3. **檢查 API Key 限制**
   - 前往 [Google Cloud Console](https://console.cloud.google.com/)
   - API 和服務 → 憑證
   - 找到您的 API Key 並點擊編輯
   - 確認「應用程式限制」設定正確
   - 如果設定了限制，請確認當前網域在允許列表中

---

### 錯誤 4: `auth/network-request-failed` - 網路連線失敗

**錯誤訊息**：
```
❌ Firebase 匿名認證失敗: auth/network-request-failed
```

**可能原因**：
- 網路連線問題
- API Key 的 HTTP 參照限制設定錯誤
- 防火牆或代理伺服器阻擋

**解決步驟**：

1. **檢查網路連線**
   - 確認能夠正常上網
   - 嘗試訪問其他網站確認

2. **檢查 API Key 限制**
   - 前往 Google Cloud Console → API 和服務 → 憑證
   - 找到您的 API Key
   - 檢查「應用程式限制」設定：
     - 如果是「HTTP 參照網址」，確認已添加正確的網域
     - 如果測試時遇到問題，可以暫時設為「無」以進行測試

3. **檢查防火牆設定**
   - 確認防火牆未阻擋 Firebase 相關服務
   - 確認代理伺服器設定正確

---

## 🔧 快速診斷步驟

### 步驟 1: 檢查控制台訊息
開啟瀏覽器開發者工具（F12），查看 Console 標籤的詳細錯誤訊息。

### 步驟 2: 確認 Firebase 配置已載入
在控制台輸入：
```javascript
console.log(window.__firebase_config);
```
應該顯示您的 Firebase 配置物件。如果顯示 `undefined`，表示配置文件未正確載入。

### 步驟 3: 測試 Firebase 連線
在控制台輸入：
```javascript
// 檢查 Firebase 是否初始化
console.log('Firebase enabled:', typeof firebase !== 'undefined');
```

### 步驟 4: 檢查認證狀態
認證成功後，在控制台應該看到：
```
✅ Firebase 認證成功，UID: xxxxxxxx...
```

---

## ✅ 驗證檢查清單

- [ ] Firebase 專案已建立
- [ ] Firestore Database 已啟用
- [ ] **匿名認證已啟用**（最重要！）
- [ ] 網域已加入授權網域列表
- [ ] `firebase-config.js` 檔案存在且配置正確
- [ ] `index.html` 中有正確引入 `firebase-config.js`
- [ ] 控制台無錯誤訊息

---

## 🆘 仍然無法解決？

如果以上步驟都已完成但仍無法連線，請提供以下資訊：

1. **錯誤訊息**：完整的控制台錯誤訊息（包含錯誤代碼）
2. **Firebase 專案 ID**：`eoelior-17bed`
3. **測試環境**：使用的網域（localhost 或實際網域）
4. **瀏覽器資訊**：瀏覽器類型和版本

---

## 📚 相關資源

- [Firebase Authentication 文件](https://firebase.google.com/docs/auth)
- [匿名認證設定指南](https://firebase.google.com/docs/auth/web/anonymous-auth)
- [Firebase Console](https://console.firebase.google.com/)

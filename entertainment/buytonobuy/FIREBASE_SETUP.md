# Firebase / Google Cloud 連線設定指南

## 📋 目錄

1. [建立 Firebase 專案](#建立-firebase-專案)
2. [取得配置資訊](#取得配置資訊)
3. [配置方式](#配置方式)
4. [設定 Firestore 安全規則](#設定-firestore-安全規則)
5. [測試連線](#測試連線)

---

## 🔥 建立 Firebase 專案

### 步驟 1: 前往 Firebase Console

1. 訪問 [Firebase Console](https://console.firebase.google.com/)
2. 點擊「新增專案」或選擇現有專案

### 步驟 2: 啟用 Firestore Database

1. 在左側選單選擇「Firestore Database」
2. 點擊「建立資料庫」
3. 選擇「以測試模式啟動」（之後需要設定安全規則）
4. 選擇資料庫位置（建議選擇離您最近的區域）

### 步驟 3: 建立 Web 應用程式

1. 點擊專案設定（⚙️）圖示
2. 滾動到「您的應用程式」區塊
3. 點擊「</>」圖示（Web 應用程式）
4. 註冊應用程式名稱（例如：`eoelior-wheel`）
5. **複製配置資訊**（稍後會用到）

---

## 🔑 取得配置資訊

從 Firebase Console 複製的配置資訊格式如下：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## ⚙️ 配置方式

### 方式 1: 外部配置文件（推薦，最安全）

#### 步驟 1: 建立配置文件

1. 複製 `firebase-config.example.js` 為 `firebase-config.js`
2. 填入您的 Firebase 配置資訊
3. **重要：將 `firebase-config.js` 加入 `.gitignore`**

#### 步驟 2: 在 HTML 中引入

在 `index.html` 的 `<head>` 或 `<body>` 開頭加入：

```html
<!-- 在 Firebase SDK 之前載入配置 -->
<script src="firebase-config.js"></script>
```

#### 步驟 3: 更新 .gitignore

確保 `firebase-config.js` 不會被提交到 Git：

```
# Firebase 配置（包含敏感資訊）
buytonobuy/firebase-config.js
```

### 方式 2: 內嵌配置（不推薦，僅用於開發）

直接在 `index.html` 的 `<script>` 標籤中定義：

```html
<script>
    // 在載入 Firebase SDK 之前定義
    window.__firebase_config = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        // ... 其他配置
    };
</script>
```

### 方式 3: 環境變數（適用於建置工具）

如果使用 Webpack、Vite 等建置工具，可以使用環境變數：

```javascript
// .env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## 🛡️ 設定 Firestore 安全規則

為了保護您的資料庫，必須設定安全規則。

### 步驟 1: 前往 Firestore 規則

1. 在 Firebase Console 選擇「Firestore Database」
2. 點擊「規則」分頁

### 步驟 2: 設定規則

#### 範例 1: 僅允許匿名讀取，管理員寫入

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 轉盤分享資料
    match /artifacts/{appId}/public/data/shared_wheels/{wheelId} {
      // 任何人都可以讀取
      allow read: if true;
      // 只有已認證的用戶可以寫入
      allow write: if request.auth != null;
    }
  }
}
```

#### 範例 2: 完全公開（僅用於測試）

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

#### 範例 3: 限制 API Key 使用（進階）

在 Firebase Console 設定 API Key 限制：

1. 前往「Google Cloud Console」→「API 和服務」→「憑證」
2. 點擊您的 API Key
3. 設定「應用程式限制」為「HTTP 參照網址」
4. 加入您的網域（例如：`https://yourdomain.com/*`）

---

## ✅ 測試連線

### 測試步驟

1. 開啟 `index.html`
2. 檢查瀏覽器控制台（F12）
3. 查看右上角的連線狀態：
   - ✅ 「雲端已連線」= 成功
   - ⚠️ 「連線中...」= 正在連線
   - ❌ 「連線失敗」= 檢查配置

### 常見問題

#### 問題 1: "Firebase 配置解析失敗"

- **原因**：配置格式錯誤
- **解決**：檢查 JSON 格式是否正確

#### 問題 2: "Firebase 初始化失敗"

- **原因**：API Key 無效或專案不存在
- **解決**：確認配置資訊是否正確

#### 問題 3: "權限被拒絕"

- **原因**：Firestore 安全規則限制
- **解決**：檢查並更新 Firestore 規則

#### 問題 4: "CORS 錯誤"

- **原因**：API Key 未設定允許的網域
- **解決**：在 Google Cloud Console 設定 API Key 限制

---

## 🔒 安全建議

1. **永遠不要將 API Key 提交到公開 Git 倉庫**
2. **使用外部配置文件並加入 .gitignore**
3. **設定 Firestore 安全規則限制存取**
4. **在 Google Cloud Console 設定 API Key 限制**
5. **定期輪換 API Key（如果可能）**
6. **監控 Firebase 使用量，防止異常存取**

---

## 📚 相關資源

- [Firebase 官方文件](https://firebase.google.com/docs)
- [Firestore 安全規則文件](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase 認證文件](https://firebase.google.com/docs/auth)

---

## 💡 進階功能

### 自訂認證

如果需要更嚴格的認證，可以使用自訂 Token：

```javascript
// 在後端生成 Token
const customToken = await admin.auth().createCustomToken(uid);

// 在前端使用
await signInWithCustomToken(auth, customToken);
```

### 資料結構

轉盤配置會儲存在以下路徑：

```
artifacts/{appId}/public/data/shared_wheels/{wheelId}
```

資料格式：

```json
{
  "title": "命運輪盤",
  "segments": [
    {
      "label": "買",
      "color": "#10b981",
      "visualPercent": 50,
      "realPercent": 80
    }
  ]
}
```

// Firebase 與 API 設定檔範例
// 使用方式:
// 1. 複製此檔案為 firebase-config.js
// 2. 填入您的實際 Firebase 設定與 API Key
// 3. firebase-config.js 不會被上傳到 Git (已在 .gitignore 中)

// 您的 Firebase 設定 (從 Firebase Console > Project Settings > General > Your apps 取得)
window.__firebase_config = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// 應用程式識別碼 (用於區分不同的資料集合)
window.__app_id = "eveday-calendar";

// Gemini API Key (從 https://aistudio.google.com/ 取得)
window.__gemini_api_key = "YOUR_GEMINI_API_KEY";

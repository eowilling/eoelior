// Firebase 設定 (與 rebox/buytonobuy 共用同一個 Firebase 專案)
// ⚠️ 請勿上傳真實 API Key 到 GitHub!
// 使用方式: 複製 firebase-config.example.js 並填入您的真實設定

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

// Gemini API Key (用於 AI 圖片生成)
window.__gemini_api_key = "YOUR_GEMINI_API_KEY";

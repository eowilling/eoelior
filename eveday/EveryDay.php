<?php

/**
 * 每日語錄日曆 - PHP 版本
 *
 * 配置方式（選擇其中一種）：
 *
 * 方式 1: 使用配置文件（推薦）
 * - 複製 config.example.php 為 config.php
 * - 在 config.php 中填入您的配置
 * - 取消下面 require_once 的註解
 */
// require_once __DIR__ . '/config.php';
// $config = require __DIR__ . '/config.php';
// $appId = $config['appId'] ?? 'default-app-id';
// $firebaseConfig = $config['firebaseConfig'] ?? [];
// $initialAuthToken = $config['initialAuthToken'] ?? null;
// $geminiApiKey = $config['geminiApiKey'] ?? '';

/**
 * 方式 2: 使用環境變數（適合生產環境）
 */
$appId = $_ENV['APP_ID'] ?? getenv('APP_ID') ?: 'default-app-id';
$firebaseConfigJson = $_ENV['FIREBASE_CONFIG'] ?? getenv('FIREBASE_CONFIG') ?: '{}';
$firebaseConfig = json_decode($firebaseConfigJson, true) ?: [];
$initialAuthToken = $_ENV['INITIAL_AUTH_TOKEN'] ?? getenv('INITIAL_AUTH_TOKEN') ?: null;
$geminiApiKey = $_ENV['GEMINI_API_KEY'] ?? getenv('GEMINI_API_KEY') ?: '';

/**
 * 方式 3: 直接設定（僅用於開發測試，不建議用於生產環境）
 */
// $appId = 'your-app-id';
// $firebaseConfig = [
//     'apiKey' => 'your-api-key',
//     'authDomain' => 'your-project.firebaseapp.com',
//     'projectId' => 'your-project-id',
//     'storageBucket' => 'your-project.appspot.com',
//     'messagingSenderId' => 'your-sender-id',
//     'appId' => 'your-app-id'
// ];
// $initialAuthToken = null;
// $geminiApiKey = 'your-gemini-api-key';

// 如果配置為空，顯示警告（僅開發環境）
if (empty($firebaseConfig) || empty($firebaseConfig['apiKey'])) {
    // 開發環境可以顯示提示，生產環境應該隱藏
    error_log('警告: Firebase 配置未設定');
}

if (empty($geminiApiKey)) {
    error_log('警告: Gemini API Key 未設定');
}
?>
<!DOCTYPE html>
<html lang="zh-TW">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        // 視覺桌機模式：在手機上用「桌機寬度」渲染（可切換）
        (function () {
            try {
                const KEY = 'eveday_force_desktop';
                const TARGET_WIDTH = 1280;
                const meta = document.querySelector('meta[name="viewport"]');
                if (!meta) return;

                const hasPref = localStorage.getItem(KEY) !== null;
                let enabled = localStorage.getItem(KEY) === 'true';
                const isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
                if (!hasPref && isSmallScreen) enabled = true;

                if (!enabled) return;
                const scale = Math.max(0.25, Math.min(1, window.innerWidth / TARGET_WIDTH));
                meta.setAttribute('content', `width=${TARGET_WIDTH}, initial-scale=${scale}, viewport-fit=cover`);
                document.documentElement.classList.add('eveday-force-desktop');
            } catch (_) {}
        })();
    </script>
    <title>每日語錄日曆</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background-color: #f7f7f7;
        }

        .record-card {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
            transition: transform 0.2s;
        }

        .record-card:hover {
            transform: translateY(-2px);
        }

        /* 確保日曆網格在移動端良好顯示 */
        #calendarDays>div {
            min-height: 120px;
        }

        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* 手機版整體縮小 20%（僅在「手機視覺模式」下；桌機視覺模式另有 viewport 縮放） */
        @media (max-width: 900px) {
            html:not(.eveday-force-desktop) #app {
                transform: scale(0.8);
                transform-origin: top left;
                width: 125%;
            }
        }
    </style>
</head>

<body>
    <div id="evedayNav"></div>
    <div id="app" class="min-h-screen p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">每日打卡語錄日曆</h1>

            <!-- 認證狀態和用戶 ID 顯示 -->
            <div id="authStatus" class="text-sm text-center mb-4 p-2 bg-blue-100 text-blue-800 rounded-lg">
                正在初始化 Firebase...
            </div>

            <!-- 日期輸入區域 -->
            <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">快速生成語錄</h2>
                <div class="flex flex-col sm:flex-row gap-3 sm:items-end">
                    <div class="flex-1 w-full">
                        <label class="block text-sm font-medium text-gray-700 mb-2">輸入日期 (格式：MMDD，例如：1217)</label>
                        <input type="text" id="dateInput" placeholder="例如：1217" maxlength="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-mono"
                            onkeypress="if(event.key==='Enter') window.handleDateInput()">
                        <p class="text-xs text-gray-500 mt-1">輸入 4 位數字，例如：1217 代表 12 月 17 日</p>
                    </div>
                    <button onclick="window.handleDateInput()"
                        class="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 whitespace-nowrap">
                        生成語錄
                    </button>
                </div>
            </div>

            <!-- 月曆元件 (主介面) -->
            <div id="calendarWrapper" class="bg-white p-6 rounded-xl shadow-lg mb-8">
                <h2 class="text-2xl font-semibold text-gray-700 mb-4">語錄月曆</h2>
                <div id="calendarContent">
                    <!-- 月曆內容將由 JavaScript 注入 -->
                    <div class="text-center text-gray-500">載入月曆中...</div>
                </div>
            </div>

            <!-- 記錄列表區域 (可選，但保留以便查看歷史記錄) -->
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">歷史記錄列表</h2>
            <div id="recordsList" class="space-y-6">
                <p class="text-center text-gray-500" id="initialLoading">載入記錄中...</p>
            </div>
        </div>
    </div>

    <!-- 語錄小卡 / 打卡表單 Modal 區域 -->
    <div id="modalBox" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 hidden">
        <div id="modalContentWrapper" class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            <div class="p-6">
                <h3 id="modalTitle" class="text-2xl font-bold text-indigo-600 mb-4 text-center"></h3>
                <div id="modalContent" class="space-y-4">
                    <!-- 內容將由 JavaScript 注入 (表單或語錄卡) -->
                </div>
                <div id="modalFooter" class="mt-6">
                    <button onclick="document.getElementById('modalBox').classList.add('hidden')" class="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-200">關閉</button>
                </div>
            </div>
        </div>
    </div>


    <script type="module">
        import {
            initializeApp
        } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import {
            getAuth,
            signInAnonymously,
            signInWithCustomToken,
            onAuthStateChanged
        } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import {
            getFirestore,
            addDoc,
            onSnapshot,
            collection,
            query,
            serverTimestamp,
            setLogLevel
        } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import {
            getStorage,
            ref,
            uploadBytes,
            getDownloadURL
        } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

        // 設定 Firebase Debug 等級
        setLogLevel('debug');

        // --- Firebase 初始化和變數 (由 PHP 注入) ---
        const appId = <?php echo json_encode($appId ?? 'default-app-id'); ?>;
        const firebaseConfig = <?php echo json_encode($firebaseConfig ?? []); ?>;
        const initialAuthToken = <?php echo json_encode($initialAuthToken ?? null); ?>;
        const geminiApiKey = <?php echo json_encode($geminiApiKey ?? ''); ?>;

        let app, db, auth, storage;
        let userId = null;

        // 新增：用於解決競態條件的 Promise
        let resolveAuthReady;
        const authReadyPromise = new Promise(resolve => {
            resolveAuthReady = resolve;
        });

        // UI 元素
        const recordsList = document.getElementById('recordsList');
        const authStatus = document.getElementById('authStatus');
        const initialLoading = document.getElementById('initialLoading');
        const calendarContent = document.getElementById('calendarContent');
        const modalBox = document.getElementById('modalBox');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const modalFooter = document.getElementById('modalFooter');


        // --- Calendar State ---
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        // Key: 'YYYY-MM-DD', Value: Check-in record object (first one of the day)
        let recordsByDate = new Map();

        // --- 錯誤和載入狀態處理 ---
        function showModalMessage(message, isError = false) {
            modalContent.innerHTML = `
                <div class="text-center p-4 rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">
                    <p class="font-medium">${message}</p>
                </div>
            `;
            // 確保關閉按鈕是唯一的操作
            modalFooter.innerHTML = `<button onclick="document.getElementById('modalBox').classList.add('hidden')" class="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-200">關閉</button>`;
        }


        // --- Firebase 初始化 ---
        async function initializeFirebase() {
            try {
                app = initializeApp(firebaseConfig);
                auth = getAuth(app);
                db = getFirestore(app);
                storage = getStorage(app);

                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }

                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        userId = user.uid;
                        console.log("Firebase 認證成功. User ID:", userId);
                        authStatus.textContent = `已登入 (用戶 ID: ${userId})`;
                        startRecordListener();
                    } else {
                        userId = null;
                        authStatus.textContent = '未登入或認證失敗，使用匿名模式。';
                        if (!initialAuthToken) {
                            // 再次嘗試匿名登入，確保至少有匿名 session
                            signInAnonymously(auth);
                        }
                    }

                    resolveAuthReady(); // <-- 身份驗證流程完成，解析 Promise
                    renderCalendar().catch(console.error); // Rerender the calendar after auth status is known
                });

            } catch (error) {
                console.error("Firebase 初始化失敗:", error);
                authStatus.textContent = `Firebase 初始化失敗: ${error.message}`;
            }
        }

        // --- 下載圖片功能 ---
        function downloadImage(imageUrl, dateKey) {
            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `語錄小卡_${dateKey}.png`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    showModalMessage(`已開始下載檔案：語錄小卡_${dateKey}.png`);
                })
                .catch(() => showModalMessage('下載圖片時發生錯誤。', true));
        }

        // --- 工具函數：Base64 轉 Blob ---
        function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                byteArrays.push(new Uint8Array(byteNumbers));
            }
            return new Blob(byteArrays, {
                type: contentType
            });
        }


        // --- 1. LLM 呼叫：產生語錄 ---
        async function generateQuote(dateKey) {
            const systemPrompt = "Act as a sophisticated poet and philosopher. Provide a short, inspirational daily quote or philosophical thought suitable for a check-in card. The response MUST be in Traditional Chinese (Taiwanese dialect) and contain ONLY the quote text, no more than 30 characters long.";
            const userQuery = `Generate an inspirational quote for the date ${dateKey}.`;
            const apiKey = geminiApiKey;
            if (!apiKey) {
                throw new Error('Gemini API Key 未設定，請檢查 PHP 配置文件');
            }
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

            // 實作指數退避重試邏輯 (最多 3 次)
            for (let i = 0; i < 3; i++) {
                try {
                    const payload = {
                        contents: [{
                            parts: [{
                                text: userQuery
                            }]
                        }],
                        systemInstruction: {
                            parts: [{
                                text: systemPrompt
                            }]
                        },
                    };

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) throw new Error(`API returned status ${response.status}`);
                    const result = await response.json();
                    const text = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

                    if (text) {
                        return text;
                    } else {
                        throw new Error("Text generation failed to return content.");
                    }
                } catch (error) {
                    console.warn(`Quote generation attempt ${i + 1} failed:`, error);
                    if (i < 2) await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                }
            }
            return "今天也是值得記錄的一天。"; // 備用語錄
        }


        // --- 2. LLM 呼叫：產生圖片 ---
        async function generateImage(quote, dateKey) {
            const prompt = `A highly aesthetic, minimalist abstract digital art background suitable for a daily quote card. Use soft, ambient lighting and colors inspired by the current time of day. Incorporate subtle elements related to inspiration or success, like a gentle upward curve or a blurred horizon. The style should be modern, serene, and clean. Resolution 1024x1024. The central theme relates to: "${quote}".`;
            const apiKey = geminiApiKey;
            if (!apiKey) {
                throw new Error('Gemini API Key 未設定，請檢查 PHP 配置文件');
            }
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

            // 實作指數退避重試邏輯 (最多 3 次)
            for (let i = 0; i < 3; i++) {
                try {
                    const payload = {
                        instances: [{
                            prompt: prompt
                        }],
                        parameters: {
                            "sampleCount": 1,
                            "aspectRatio": "1:1"
                        }
                    };

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) throw new Error(`API returned status ${response.status}`);
                    const result = await response.json();

                    const base64Data = result.predictions?.[0]?.bytesBase64Encoded;

                    if (base64Data) {
                        return base64Data;
                    } else {
                        throw new Error("Image generation failed to return base64 data.");
                    }
                } catch (error) {
                    console.warn(`Image generation attempt ${i + 1} failed:`, error);
                    if (i < 2) await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                }
            }
            throw new Error("Failed to generate image after multiple retries.");
        }


        // --- 核心打卡邏輯 (自動生成與儲存) ---
        async function handleCheckin(dateKey) {
            const saveButton = document.getElementById('modalSaveButton');

            // <-- 確保在執行任何 Firebase 操作前，強制等待身份驗證完成
            try {
                await authReadyPromise;
            } catch (error) {
                console.error("等待身份驗證失敗:", error);
                showModalMessage('錯誤：身份驗證等待超時。', true);
                return;
            }

            // 檢查 userId，確保有權限執行 Storage 操作
            if (!userId) {
                showModalMessage('錯誤：尚未完成用戶認證或權限無效。', true);
                return;
            }
            // --- 身份驗證已確認 ---

            // 禁用按鈕並顯示載入狀態（檢查按鈕是否存在）
            if (saveButton) {
                saveButton.disabled = true;
                saveButton.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 正在生成小卡...`;
            }

            // 清除初始提示並顯示載入狀態
            modalContent.innerHTML = `<div id="generationStatus" class="p-6 bg-indigo-50 text-indigo-800 rounded-xl text-center shadow-inner">
                                <svg class="animate-spin mx-auto h-8 w-8 text-indigo-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <p class="font-bold">步驟 1/3: 正在產生每日語錄...</p>
                             </div>`;

            try {
                // 1. 生成語錄
                const description = await generateQuote(dateKey);

                document.getElementById('generationStatus').innerHTML = `
                    <svg class="animate-spin mx-auto h-8 w-8 text-indigo-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p class="font-bold">步驟 2/3: 正在根據語錄生成背景圖片...</p>
                    <p class="text-sm mt-2">語錄: 「${description}」</p>
                `;

                // 2. 生成圖片 (Base64)
                const base64Data = await generateImage(description, dateKey);

                document.getElementById('generationStatus').innerHTML = `
                    <svg class="animate-spin mx-auto h-8 w-8 text-indigo-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p class="font-bold">步驟 3/3: 正在上傳與儲存記錄...</p>
                `;

                // 3. 上傳圖片到 Firebase Storage
                const imageBlob = b64toBlob(base64Data, 'image/png');

                // FIX: 將 Storage 路徑更改為公共資料路徑，以避免嚴格的 private 權限檢查
                const storagePath = `artifacts/${appId}/public/data/images/${userId}/${dateKey}_${Date.now()}.png`;

                const storageRef = ref(storage, storagePath);
                const uploadTask = await uploadBytes(storageRef, imageBlob);
                const imageUrl = await getDownloadURL(uploadTask.ref);

                // 4. 將記錄儲存到 Firestore (保持在私有路徑)
                const recordsColRef = collection(db, 'artifacts', appId, 'users', userId, 'checkin_records');
                const newRecord = {
                    description: description,
                    imageUrl: imageUrl,
                    dateKey: dateKey,
                    timestamp: serverTimestamp()
                };
                await addDoc(recordsColRef, newRecord);

                console.log("打卡記錄儲存成功！");

                // 5. 立即顯示語錄小卡 (使用臨時記錄)
                const tempRecord = {
                    description: description,
                    imageUrl: imageUrl,
                    // 使用一個模擬時間戳記物件
                    timestamp: {
                        toMillis: () => Date.now(),
                        toDate: () => new Date(),
                    }
                };
                showQuoteCard(dateKey, true, tempRecord);

            } catch (error) {
                console.error("自動生成與儲存記錄時出錯:", error);
                if (saveButton) { // Ensure button exists before accessing properties
                    saveButton.disabled = false;
                    saveButton.innerHTML = `生成並打卡`;
                }
                showModalMessage(`自動生成與打卡失敗: ${error.message}`, true);
            }
        }

        // --- 日期工具函數 ---
        function getFormattedDate(date) {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        }

        // --- 農曆轉換功能 (簡化版，使用 API) ---
        async function getLunarDate(solarDate) {
            try {
                // 使用公開的農曆 API
                const year = solarDate.getFullYear();
                const month = solarDate.getMonth() + 1;
                const day = solarDate.getDate();

                // 使用簡化的農曆轉換（可以替換為更準確的 API）
                // 這裡使用一個簡單的計算方式，實際應用中建議使用專業的農曆庫
                const lunarInfo = await fetch(`https://www.mxnzp.com/api/calendar/solar/${year}/${month}/${day}`)
                    .then(res => res.json())
                    .catch(() => null);

                if (lunarInfo && lunarInfo.data) {
                    return {
                        lunar: lunarInfo.data.lunar || '',
                        lunarMonth: lunarInfo.data.lMonth || '',
                        lunarDay: lunarInfo.data.lDay || '',
                        zodiac: lunarInfo.data.zodiac || '',
                        ganZhi: lunarInfo.data.ganZhi || ''
                    };
                }

                // Fallback: 簡單的農曆顯示
                return {
                    lunar: '農曆計算中',
                    lunarMonth: '',
                    lunarDay: '',
                    zodiac: '',
                    ganZhi: ''
                };
            } catch (error) {
                console.warn('農曆轉換失敗:', error);
                return {
                    lunar: '',
                    lunarMonth: '',
                    lunarDay: '',
                    zodiac: '',
                    ganZhi: ''
                };
            }
        }

        // --- 處理日期輸入 (MMDD 格式) ---
        window.handleDateInput = async function() {
            const input = document.getElementById('dateInput');
            const dateStr = input.value.trim();

            if (dateStr.length !== 4 || !/^\d{4}$/.test(dateStr)) {
                showModalMessage('請輸入正確的日期格式 (4 位數字，例如：1217)', true);
                modalBox.classList.remove('hidden');
                return;
            }

            const month = parseInt(dateStr.substring(0, 2));
            const day = parseInt(dateStr.substring(2, 4));

            if (month < 1 || month > 12 || day < 1 || day > 31) {
                showModalMessage('日期無效，請檢查月份和日期是否正確', true);
                modalBox.classList.remove('hidden');
                return;
            }

            const today = new Date();
            const targetDate = new Date(today.getFullYear(), month - 1, day);

            // 檢查日期是否有效（例如 2/30 會自動調整）
            if (targetDate.getMonth() !== month - 1 || targetDate.getDate() !== day) {
                showModalMessage('日期無效，請檢查日期是否正確', true);
                modalBox.classList.remove('hidden');
                return;
            }

            const dateKey = getFormattedDate(targetDate);

            // 檢查是否已經打卡
            if (recordsByDate.has(dateKey)) {
                showModalMessage('該日期已經有語錄記錄了', true);
                modalBox.classList.remove('hidden');
                return;
            }

            // 清空輸入框
            input.value = '';

            // 顯示生成進度
            modalTitle.textContent = `生成 ${month} 月 ${day} 日的語錄`;
            modalContent.innerHTML = `<div class="text-center p-4"><p class="text-gray-600">正在生成語錄...</p></div>`;
            modalFooter.innerHTML = '';
            modalBox.classList.remove('hidden');

            // 執行打卡流程
            await handleCheckin(dateKey);
        };

        // --- 月曆邏輯 ---
        async function renderCalendar() {
            const today = new Date();
            const currentDisplayDate = new Date(currentYear, currentMonth, 1);
            const firstDayIndex = currentDisplayDate.getDay(); // 0 (Sun) to 6 (Sat)
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            const dayNames = ["日", "一", "二", "三", "四", "五", "六"];

            let calendarDaysHTML = '';

            // Add placeholders for the first week
            for (let i = 0; i < firstDayIndex; i++) {
                calendarDaysHTML += '<div class="text-center p-2"></div>';
            }

            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = new Date(currentYear, currentMonth, day);
                const dateKey = getFormattedDate(currentDate);
                const isCheckedIn = recordsByDate.has(dateKey);
                const record = isCheckedIn ? recordsByDate.get(dateKey) : null;
                const isToday = currentDate.toDateString() === today.toDateString();
                const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const currentDayMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                const isFuture = currentDayMidnight > todayMidnight;

                // 獲取農曆資訊
                const lunarInfo = await getLunarDate(currentDate);
                const lunarDisplay = lunarInfo.lunarMonth && lunarInfo.lunarDay ?
                    `${lunarInfo.lunarMonth}月${lunarInfo.lunarDay}` :
                    '';

                let dayClasses = 'min-h-[92px] sm:min-h-[120px] flex flex-col rounded-lg transition duration-150 relative border-2 p-1 sm:p-2';
                let content = '';
                let clickHandler = '';

                if (isToday) {
                    dayClasses += ' border-indigo-500 ring-2 ring-indigo-300';
                } else {
                    dayClasses += ' border-gray-200';
                }

                if (isFuture) {
                    dayClasses += ' bg-gray-100 text-gray-400 cursor-not-allowed';
                    content = `
                        <div class="text-center">
                            <div class="text-lg font-bold mb-1">${day}</div>
                            <div class="text-xs">${lunarDisplay || ''}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mx-auto mt-1 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 10h-1V7c0-2.76-2.24-5-5-5S7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2z"/>
                            </svg>
                        </div>
                    `;
                } else if (isCheckedIn && record) {
                    dayClasses += ' bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 cursor-pointer border-green-300';
                    clickHandler = `onclick="showQuoteCard('${dateKey}', true)"`;

                    // 顯示語錄圖片和資訊
                    content = `
                        <div class="flex-1 flex flex-col">
                            <div class="text-xs font-bold text-gray-700 mb-1 text-center">${day}</div>
                            ${lunarDisplay ? `<div class="text-xs text-gray-600 text-center mb-1">${lunarDisplay}</div>` : ''}
                            <div class="flex-1 rounded overflow-hidden bg-white shadow-sm">
                                <img src="${record.imageUrl}" alt="語錄"
                                     class="w-full h-full object-cover"
                                     onerror="this.onerror=null;this.src='https://placehold.co/100x100/e0f2f7/0e7490?text=圖片'">
                            </div>
                            <div class="text-xs text-gray-700 mt-1 line-clamp-2 text-center leading-tight">${record.description || ''}</div>
                        </div>
                    `;
                } else {
                    dayClasses += ' bg-white text-gray-700 hover:bg-gray-50 cursor-pointer';
                    clickHandler = `onclick="showQuoteCard('${dateKey}', false)"`;
                    content = `
                        <div class="text-center">
                            <div class="text-lg font-bold mb-1">${day}</div>
                            ${lunarDisplay ? `<div class="text-xs text-gray-600 mb-1">${lunarDisplay}</div>` : ''}
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto mt-1 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 8h-2V7c0-2.76-2.24-5-5-5S7 4.24 7 7v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 7c0-1.66 1.34-3 3-3s3 1.34 3 3v1H9V7zm10 13H5V10h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h6v2c0 .55.45 1 1 1s1-.45 1-1v-2h2v10z"/>
                            </svg>
                        </div>
                    `;
                }

                calendarDaysHTML += `<div data-date="${dateKey}" class="${dayClasses}" ${clickHandler}>${content}</div>`;
            }

            const header = `
                <div class="flex justify-between items-center mb-4">
                    <button onclick="changeMonth(-1)" class="p-2 rounded-full hover:bg-gray-200 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h3 class="text-xl font-semibold text-gray-800">${currentYear} 年 ${monthNames[currentMonth]}</h3>
                    <button onclick="changeMonth(1)" class="p-2 rounded-full hover:bg-gray-200 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
                <div class="grid grid-cols-7 text-center font-bold text-sm text-gray-500 mb-2">
                    ${dayNames.map(d => `<div>${d}</div>`).join('')}
                </div>
            `;

            calendarContent.innerHTML = header + `
                <div id="calendarDays" class="grid grid-cols-7 gap-1 sm:gap-2">
                    ${calendarDaysHTML}
                </div>
            `;
        }

        async function changeMonth(delta) {
            currentMonth += delta;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            } else if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            await renderCalendar();
        }

        // --- 顯示 Modal 內容 ---
        function showQuoteCard(dateKey, isCheckedIn, tempRecord = null) {
            const dateDisplay = new Date(dateKey).toLocaleDateString('zh-TW', {
                month: 'long',
                day: 'numeric'
            });

            if (isCheckedIn) {
                const record = tempRecord || recordsByDate.get(dateKey);
                modalTitle.textContent = `${dateDisplay} 的語錄小卡 (已開啟)`;

                // 處理時間戳記顯示
                let recordTime = '時間未知';
                if (record.timestamp) {
                    // 使用 toDate() for actual Timestamp, or new Date(toMillis()) for the mock object
                    const dateObj = typeof record.timestamp.toDate === 'function' ?
                        record.timestamp.toDate() :
                        new Date(record.timestamp.toMillis());
                    recordTime = dateObj.toLocaleString('zh-TW');
                }

                modalContent.innerHTML = `
                    <div class="text-center bg-gray-50 p-4 rounded-lg border-t-4 border-indigo-500 shadow-inner">
                        <!-- 確保圖片在載入時有高度避免 CLS -->
                        <div class="w-full h-48 mb-4 rounded-lg shadow-md overflow-hidden bg-gray-200 flex items-center justify-center">
                            <img src="${record.imageUrl}" alt="打卡圖片" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x300/e0f2f7/0e7490?text=圖片載入失敗'">
                        </div>
                        <p class="text-gray-800 text-xl font-medium italic border-l-4 border-indigo-400 pl-4 py-2">
                            「${record.description || '（無語錄或描述）'}」
                        </p>
                        <p class="text-xs text-gray-500 mt-4">記錄時間: ${recordTime}</p>
                    </div>
                `;
                modalFooter.innerHTML = `
                    <button onclick="downloadImage('${record.imageUrl}', '${dateKey}')" class="w-full mb-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200">下載小卡圖片</button>
                    <button onclick="document.getElementById('modalBox').classList.add('hidden')" class="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-200">關閉</button>
                `;

            } else {
                // 未打卡，顯示準備生成提示
                modalTitle.textContent = `開啟 ${dateDisplay} 的禮物盒`;
                modalContent.innerHTML = `
                    <div class="space-y-4 text-center">
                        <div class="p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                            <p>點擊下方按鈕，系統將為您自動生成當日語錄小卡並完成打卡！</p>
                        </div>
                        <!-- Loading placeholder will be replaced by handleCheckin -->
                    </div>
                `;
                modalFooter.innerHTML = `
                    <button id="modalSaveButton" onclick="handleCheckin('${dateKey}')" class="w-full mb-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200">生成並打卡</button>
                    <button onclick="document.getElementById('modalBox').classList.add('hidden')" class="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-200">取消</button>
                `;
            }

            modalBox.classList.remove('hidden');
        }


        // --- 監聽 Firestore 記錄 ---
        function startRecordListener() {
            if (!db || !userId) return;

            // 保持 Firestore 記錄在私有路徑
            const recordsColRef = collection(db, 'artifacts', appId, 'users', userId, 'checkin_records');
            const q = query(recordsColRef);

            console.log("開始監聽打卡記錄...");

            onSnapshot(q, (snapshot) => {
                const records = [];
                recordsByDate.clear(); // 清空舊資料

                snapshot.forEach(doc => {
                    const data = doc.data();
                    // 確保 timestamp 存在且有效
                    if (data.timestamp && typeof data.timestamp.toDate === 'function') {
                        const date = data.timestamp.toDate();
                        const dateKey = getFormattedDate(date);

                        // 只儲存當天找到的第一筆記錄
                        if (!recordsByDate.has(dateKey)) {
                            recordsByDate.set(dateKey, {
                                description: data.description,
                                imageUrl: data.imageUrl,
                                timestamp: data.timestamp
                            });
                        }
                    }
                    records.push({
                        id: doc.id,
                        ...data
                    });
                });

                // 在客戶端進行降冪排序 (最新記錄在前)
                records.sort((a, b) => (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0));

                renderCalendar().catch(console.error); // 更新月曆
                renderRecords(records);
                initialLoading.classList.add('hidden');
            }, (error) => {
                console.error("監聽打卡記錄時發生錯誤:", error);
                recordsList.innerHTML = `<p class="text-center text-red-500">載入記錄失敗: ${error.message}</p>`;
            });
        }

        // --- 渲染記錄 (用於底部的歷史列表) ---
        function renderRecords(records) {
            if (records.length === 0) {
                recordsList.innerHTML = '<p class="text-center text-gray-500 p-4">目前沒有打卡記錄。</p>';
                return;
            }

            recordsList.innerHTML = records.map(record => {
                let date = '時間未知';
                if (record.timestamp) {
                    const dateObj = typeof record.timestamp.toDate === 'function' ? record.timestamp.toDate() : new Date(record.timestamp.toMillis());
                    date = dateObj.toLocaleString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    });
                }

                return `
                    <div class="record-card flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md">
                        <div class="md:w-1/3 bg-gray-100 flex items-center justify-center">
                            <!-- 加上 onerror 處理圖片載入失敗 -->
                            <img src="${record.imageUrl}" alt="打卡圖片" class="w-full h-48 object-cover md:h-full" onerror="this.onerror=null;this.src='https://placehold.co/400x300/e0f2f7/0e7490?text=圖片載入失敗'">
                        </div>
                        <div class="md:w-2/3 p-4 space-y-2">
                            <p class="text-xs font-medium text-indigo-600">${date}</p>
                            <p class="text-lg font-semibold text-gray-800">${record.description || '無描述'}</p>
                            <p class="text-xs text-gray-500 break-all">圖片來源: <a href="${record.imageUrl}" target="_blank" class="text-indigo-500 hover:underline">點擊查看原始圖片</a></p>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // --- 啟動與事件監聽 ---
        window.onload = () => {
            // 使函數可被 HTML 內聯調用
            window.showQuoteCard = showQuoteCard;
            window.changeMonth = changeMonth;
            window.handleCheckin = handleCheckin;
            window.downloadImage = downloadImage;

            initializeFirebase();
            renderCalendar().catch(console.error); // Initial render before data loads
        };
    </script>

</body>
</html>
<script src="shared-nav.js" defer></script>
<script>
    // 小螢幕浮動切換按鈕：桌機/手機視覺模式
    (function () {
        const KEY = 'eveday_force_desktop';
        try {
            const isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
            if (!isSmallScreen) return;

            const getEnabled = () => localStorage.getItem(KEY) === 'true';
            const setEnabled = (v) => localStorage.setItem(KEY, v ? 'true' : 'false');

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'fixed bottom-4 right-4 z-50 px-3 py-2 rounded-full shadow-lg bg-gray-900 text-white text-xs font-semibold opacity-90 hover:opacity-100';
            btn.textContent = getEnabled() ? '切回手機版' : '切到桌機版';
            btn.onclick = () => {
                setEnabled(!getEnabled());
                window.location.reload();
            };
            document.body.appendChild(btn);
        } catch (_) {}
    })();
</script>

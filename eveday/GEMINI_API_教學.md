# Gemini API Key 取得教學 (繁體中文)

## 📋 目錄

1. [前置準備](#前置準備)
2. [取得 API Key 步驟](#取得-api-key-步驟)
3. [在專案中使用 API Key](#在專案中使用-api-key)
4. [測試 API Key](#測試-api-key)
5. [安全注意事項](#安全注意事項)
6. [常見問題](#常見問題)

---

## 前置準備

### 您需要

- ✅ Google 帳號 (Gmail)
- ✅ 可以連上網際網路
- ✅ 瀏覽器 (Chrome/Edge/Firefox)

### 費用說明

- 🆓 **免費額度**: 每分鐘 15 次請求,每天 1,500 次請求
- 💰 **付費方案**: 超過免費額度後才需付費
- 💡 **圖片生成**: 約 NT$1.2 元/張 (1024x1024)

---

## 取得 API Key 步驟

### 步驟 1: 前往 Google AI Studio

1. 開啟瀏覽器,前往:

   ```
   https://aistudio.google.com/
   ```

2. 點擊右上角的 **「Get API key」** 或 **「開始使用」**

![Google AI Studio 首頁](https://aistudio.google.com/)

---

### 步驟 2: 登入 Google 帳號

1. 使用您的 **Google 帳號** 登入
2. 如果沒有帳號,點擊 **「建立帳戶」** 註冊新帳號

---

### 步驟 3: 建立 API Key


eveday
https://aistudio.google.com/
AIzaSyAJa3BvmNyR5s0rlIOoOMJOsnr-pNdgVVI
722816989754

curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AIzaSyAJa3BvmNyR5s0rlIOoOMJOsnr-pNdgVVI' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'


projects/722816989754
1. 登入後,點擊左側選單的 **「Get API key」** (取得 API 金鑰)

2. 您會看到兩個選項:

   **選項 A: 在新專案中建立 API 金鑰 (推薦新手)**
   - 點擊 **「Create API key in new project」**
   - Google 會自動建立一個新的 Google Cloud 專案
   - 適合第一次使用的人

   **選項 B: 在現有專案中建立 API 金鑰**
   - 如果您已有 Google Cloud 專案,可選擇此選項
   - 從下拉選單選擇專案
   - 點擊 **「Create API key」**

3. 等待幾秒鐘,系統會生成您的 API Key

---

### 步驟 4: 複製並保存 API Key

1. API Key 生成後,會顯示類似這樣的字串:

   ```
   AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
   ```

2. **立即複製** 這個 API Key (點擊複製按鈕 📋)

3. **重要**: 將 API Key 保存到安全的地方:
   - 記事本 (Notepad)
   - 密碼管理器 (如 LastPass, 1Password)
   - **不要** 分享給任何人!

---

## 在專案中使用 API Key

### 方法 1: 直接在 HTML 中使用 (僅用於測試)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Gemini API 測試</title>
</head>
<body>
    <h1>Gemini API 測試</h1>
    <button onclick="testGemini()">測試 API</button>
    <div id="result"></div>

    <script>
        const GEMINI_API_KEY = ' AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz'; // 替換成您的 API Key

        async function testGemini() {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "你好!請用繁體中文回答:今天天氣如何?"
                        }]
                    }]
                })
            });

            const data = await response.json();
            document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        }
    </script>
</body>
</html>
```

⚠️ **警告**: 這種方法會將 API Key 暴露在前端,僅適合測試!

---

### 方法 2: 使用 PHP 後端 (推薦用於生產環境)

#### 建立 `config.php` (不要上傳到 Git)

```php
<?php
return [
    'geminiApiKey' => 'AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz', // 替換成您的 API Key
];
?>
```

#### 建立 `gemini-api.php`

```php
<?php
header('Content-Type: application/json');

// 載入配置
$config = require __DIR__ . '/config.php';
$apiKey = $config['geminiApiKey'];

// 接收前端請求
$input = json_decode(file_get_contents('php://input'), true);
$prompt = $input['prompt'] ?? '你好';

// 呼叫 Gemini API
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" . $apiKey;

$data = [
    'contents' => [
        [
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ]
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;
?>
```

#### 前端呼叫 (安全)

```javascript
async function callGeminiAPI(prompt) {
    const response = await fetch('gemini-api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt })
    });
    
    const data = await response.json();
    return data;
}

// 使用範例
callGeminiAPI('生成一張溫暖色調的勵志圖片').then(result => {
    console.log(result);
});
```

---

## 測試 API Key

### 使用瀏覽器測試 (最簡單)

1. 複製以下網址,**替換 YOUR_API_KEY** 為您的 API Key:

   ```
   https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_API_KEY
   ```

2. 在瀏覽器中開啟,如果看到錯誤訊息 `"error": { "code": 400, "message": "Request payload size exceeds the limit"` 表示 API Key 有效 ✅

3. 如果看到 `"error": { "code": 401, "message": "API key not valid"` 表示 API Key 無效 ❌

---

### 使用 Postman 測試 (進階)

1. 下載並安裝 [Postman](https://www.postman.com/downloads/)

2. 建立新的 POST 請求:
   - URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_API_KEY`
   - Method: `POST`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):

     ```json
     {
       "contents": [{
         "parts": [{
           "text": "你好!請用繁體中文自我介紹。"
         }]
       }]
     }
     ```

3. 點擊 **Send**,如果收到回應表示成功!

---

## 安全注意事項

### ⚠️ 絕對不要

- ❌ 將 API Key 上傳到 GitHub/GitLab
- ❌ 在前端 JavaScript 中直接寫入 API Key (除非測試)
- ❌ 分享 API Key 給他人
- ❌ 將 API Key 寫在公開的文件中

### ✅ 應該做

- ✅ 使用 `.gitignore` 排除 `config.php`
- ✅ 使用環境變數或配置文件儲存 API Key
- ✅ 定期檢查 API 使用量
- ✅ 如果 API Key 洩漏,立即刪除並重新生成

---

### 建立 `.gitignore` (防止上傳 API Key)

在專案根目錄建立 `.gitignore` 檔案:

```
# 排除配置文件 (包含 API Key)
config.php
.env

# 排除 Firebase 配置
firebase-config.js
```

---

## 常見問題

### Q1: API Key 可以免費使用嗎?

**A**: 是的!免費額度為:

- 每分鐘 15 次請求
- 每天 1,500 次請求
- 對於個人專案來說非常充足

---

### Q2: 如何查看 API 使用量?

**A**:

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 選擇您的專案
3. 點擊左側選單 **「API 和服務」** > **「已啟用的 API 和服務」**
4. 點擊 **「Generative Language API」**
5. 查看 **「配額」** 和 **「指標」**

---

### Q3: 超過免費額度會怎樣?

**A**:

- 系統會要求您啟用計費帳戶
- 如果不啟用,API 會停止運作
- 啟用後,超過免費額度的部分才會收費

---

### Q4: API Key 洩漏了怎麼辦?

**A**:

1. 立即前往 [Google AI Studio](https://aistudio.google.com/)
2. 點擊 **「Get API key」**
3. 找到洩漏的 API Key,點擊 **「刪除」** (垃圾桶圖示)
4. 建立新的 API Key
5. 更新專案中的 API Key

---

### Q5: 可以生成圖片嗎?

**A**: 可以!使用 Gemini 2.5 Flash Image 模型:

```javascript
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;

const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        contents: [{
            parts: [{
                text: "生成一張溫暖色調的勵志圖片,包含文字:不期待 不假設 不強求"
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        }
    })
});
```

---

## 下一步

✅ 您已經學會如何取得 Gemini API Key!

接下來可以:

1. 整合到您的每日打卡行事曆專案
2. 實作 AI 圖文小卡生成功能
3. 建立 Firebase 資料庫

需要協助嗎?隨時告訴我! 🚀

---

## 相關連結

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API 官方文件](https://ai.google.dev/docs)
- [定價資訊](https://ai.google.dev/pricing)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**最後更新**: 2026-01-27

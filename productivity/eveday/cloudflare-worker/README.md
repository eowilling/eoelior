# Gemini API Proxy — Cloudflare Worker

用來隱藏 Gemini API Key，讓前端安全呼叫 Gemini API。

## 部署方式（5 分鐘，完全免費）

### 1. 建立 Cloudflare 帳號
前往 https://workers.cloudflare.com 註冊免費帳號。
免費方案每天 10 萬次請求，個人使用完全夠用。

### 2. 建立新 Worker
1. 進入 Cloudflare Dashboard → Workers & Pages → Create
2. 選 "Create Worker"
3. 把 `worker.js` 的內容全部貼入編輯器
4. 點 "Deploy"

### 3. 設定 API Key（重要！）
1. 進入 Worker 設定頁 → Settings → Variables
2. 新增 Environment Variable：
   - Name: `GEMINI_API_KEY`
   - Value: 你的 Gemini API Key（從 https://aistudio.google.com 取得）
3. 點 Save and Deploy

### 4. 取得 Worker URL
部署後會得到類似這樣的 URL：
```
https://gemini-proxy.你的名字.workers.dev
```

### 5. 更新前端設定
在 `eveday/index.html` 中找到 `API_PROXY_URL` 變數，改為你的 Worker URL。

---

## 目前狀態

`eveday` 前端目前直接使用使用者輸入的 API Key（存在 localStorage），
**不需要** 這個 Worker 也能運作。

若想改為伺服器端管理 Key（更安全），部署此 Worker 後更新前端即可。

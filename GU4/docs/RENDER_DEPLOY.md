# 🚀 Render.com 部署指南

> **完全免費部署 GU4 台股智能分析系統到雲端**

## ✨ 為什麼選擇 Render.com？

- ✅ **完全免費** - Free plan 永久免費
- ✅ **自動部署** - 從 GitHub 推送後自動更新
- ✅ **HTTPS 支援** - 免費 SSL 憑證
- ✅ **環境變數** - 安全管理 API 金鑰
- ✅ **無需信用卡** - 只需 GitHub 或 Email 註冊

## 📋 部署前準備

### 1. 推送到 GitHub

確保您的代碼已經推送到 GitHub（已完成 ✅）

### 2. 準備 API 金鑰

- Google Gemini API Key（必需）
- Telegram Bot Token（選填）
- Email 設定（選填）

## 🚀 部署步驟

### 第一步：註冊 Render.com

1. 訪問 https://render.com/
2. 點擊右上角 **Sign Up**
3. 選擇 **Sign up with GitHub**（推薦）
4. 授權 Render 訪問您的 GitHub

### 第二步：創建 Web Service

1. 點擊 Dashboard 的 **New +** 按鈕
2. 選擇 **Web Service**
3. 選擇 **Connect a repository**
4. 找到並選擇 `GU4-Taiwan-Stock-Analysis`
5. 點擊 **Connect**

### 第三步：配置服務

填寫以下資訊：

| 欄位 | 填入內容 |
|------|---------|
| **Name** | `gu4-taiwan-stock` |
| **Region** | `Singapore (Southeast Asia)` |
| **Branch** | `main` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn --bind 0.0.0.0:$PORT web_app:app` |
| **Instance Type** | `Free` |

### 第四步：設定環境變數

點擊 **Advanced** 展開，添加以下環境變數：

#### 必填環境變數

```
GEMINI_API_KEY = 你的_GEMINI_API_KEY
```

#### 選填環境變數（通知功能）

```
TELEGRAM_BOT_TOKEN = 你的_TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID = 你的_TELEGRAM_CHAT_ID
EMAIL_SENDER = your.email@gmail.com
EMAIL_PASSWORD = 你的應用程式密碼
EMAIL_RECEIVERS = receiver@gmail.com
```

#### 系統設定（可選）

```
STOCK_LIST = 2330,2454,0050
AUTO_PICK_METHOD = institutional
AUTO_PICK_COUNT = 5
REPORT_TYPE = simple
LOG_LEVEL = INFO
```

### 第五步：部署

1. 點擊 **Create Web Service**
2. 等待部署完成（約 3-5 分鐘）
3. 部署成功後會顯示網址，例如：
   ```
   https://gu4-taiwan-stock.onrender.com
   ```

## 🎉 部署完成！

您的系統現在已經在雲端運行，可以通過以下網址訪問：

```
https://你的服務名稱.onrender.com
```

## 📱 使用雲端版本

### 訪問 Web UI

1. 打開瀏覽器
2. 訪問您的 Render 網址
3. 開始使用股票分析功能

### 分享給朋友

直接發送網址給朋友：
```
https://gu4-taiwan-stock.onrender.com
```

他們無需安裝任何軟體，直接使用瀏覽器訪問！

## ⚡ 自動更新部署

每次推送到 GitHub 後，Render 會自動重新部署：

```bash
# 修改代碼後
git add .
git commit -m "更新功能"
git push

# Render 會自動偵測並重新部署
```

## ⚠️ 免費方案限制

### Render Free Plan

- ✅ 750 小時/月運行時間（夠用）
- ⚠️ 閒置 15 分鐘後自動休眠
- ⚠️ 喚醒需要 30-60 秒
- ✅ 512MB RAM（足夠）
- ✅ 無限流量

### 解決休眠問題

創建 UptimeRobot 定時喚醒（選填）：

1. 訪問 https://uptimerobot.com/
2. 註冊免費帳號
3. 添加 Monitor：
   - Type: `HTTP(s)`
   - URL: `https://你的服務名稱.onrender.com/health`
   - Monitoring Interval: `5 minutes`

這樣系統會保持活躍狀態！

## 🔧 進階配置

### 使用 render.yaml 自動配置

專案已包含 `render.yaml`，直接使用 Blueprint 部署：

1. Render Dashboard → **Blueprints**
2. 選擇您的 Repository
3. 系統會自動讀取 `render.yaml`
4. 只需添加敏感環境變數即可

### 查看日誌

1. Render Dashboard → 選擇您的服務
2. 點擊 **Logs** 標籤
3. 即時查看系統運行狀況

### 重啟服務

1. Render Dashboard → 選擇您的服務
2. 點擊 **Manual Deploy** → **Clear build cache & deploy**

## 🆘 常見問題

### Q: 部署失敗怎麼辦？

A: 檢查 Logs 標籤的錯誤訊息：
- 確認 `requirements.txt` 格式正確
- 確認 `gunicorn` 已在 requirements.txt 中
- 確認環境變數已正確設定

### Q: 訪問網址顯示錯誤？

A: 
1. 檢查是否設定 `GEMINI_API_KEY`
2. 查看 Logs 確認錯誤原因
3. 確認服務狀態是 "Live"

### Q: 如何更新環境變數？

A:
1. Dashboard → 選擇服務
2. Environment 標籤
3. 修改變數後會自動重新部署

### Q: 免費方案夠用嗎？

A: 對於個人使用完全夠用！
- 分析速度不受影響
- 只是閒置時會休眠
- 配合 UptimeRobot 可以避免休眠

## 🌟 其他免費平台選擇

如果 Render 不適合，可以試試：

### Railway.app
- $5 免費額度/月
- 更快的喚醒速度
- 部署方式類似

### Fly.io
- 免費 3 個 apps
- 更多地區選擇
- 需要信用卡驗證

### PythonAnywhere
- 專門運行 Python
- 永久免費方案
- 但設定較複雜

## 📊 效能優化

### 1. 使用 CDN

Render 自帶 CDN，無需額外設定

### 2. 快取策略

在 `web_app.py` 中已實現：
- 靜態檔案快取
- API 回應快取

### 3. 資料庫（選用）

免費方案建議：
- Supabase (PostgreSQL)
- MongoDB Atlas
- PlanetScale (MySQL)

## 🎯 部署檢查清單

部署前確認：

- ✅ 代碼已推送到 GitHub
- ✅ `.env` 已加入 `.gitignore`
- ✅ `requirements.txt` 包含所有依賴
- ✅ `render.yaml` 配置正確
- ✅ 準備好所有 API 金鑰
- ✅ 測試本地運行正常

部署後檢查：

- ✅ 服務狀態顯示 "Live"
- ✅ 網址可以訪問
- ✅ 日誌無錯誤訊息
- ✅ Web UI 正常顯示
- ✅ 分析功能正常運作

## 🎊 恭喜！

您的台股智能分析系統現在已經在雲端運行！

- 🌐 隨時隨地訪問
- 📱 支援手機瀏覽器
- 🔗 分享給朋友使用
- 🚀 自動更新部署

---

**遇到問題？** 查看 Render 官方文檔：https://render.com/docs

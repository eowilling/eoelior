# 🌐 Render 部署指南

## 📋 前置準備

### 1. 註冊 Render 帳號

前往 [Render 官網](https://render.com/) 註冊並連接您的 GitHub 帳號。

### 2. 關於方案選擇

⚠️ **重要**: Telegram Bot 是一個長時間運行的背景程序。

- 在 Render 上，建議選擇 **"Background Worker"** 類型。
- 如果選擇 "Web Service" 免費版, 程式會在一段時間無流量後自動休眠。

---

## 🛠️ 部署步驟

### 步驟 1: 更新程式碼到 GitHub

確保您的 GitHub `uber` 分支包含以下新檔案：

- `render-build.sh` (建置腳本)
- `render.yaml` (Blueprint 配置)
- `requirements.txt` (依賴清單)

### 步驟 2: 在 Render 建立新服務

1. 登入 Render Dashboard。
2. 點擊 **"New +"** 按鈕，選擇 **"Blueprint"** (或選擇 **"Background Worker"**)。
3. 連接您的 GitHub 倉庫 `eowilling/eoelior`。
4. 在 **Blueprint** 模式下，它會自動讀取 `render.yaml`。

### 步驟 3: 設定環境變數

在部署過程中或部署後的 **"Environment"** 設定中，添加：

- `TELEGRAM_BOT_TOKEN`: 您的機器人 Token。

### 步驟 4: 執行建置與部署

Render 會自動執行 `./render-build.sh` 來安裝 Python 套件與 Playwright 瀏覽器。

---

## 🔍 Playwright 在 Render 上的特殊說明

Render 的原生環境有時會缺少 Playwright 執行所需的 Linux 系統庫。

- 如果部署後出現 `libX11` 相關錯誤，我們可能需要切換到 **Docker 部署** (這是最穩定的方式)。
- 💡 **Docker 方案**: 我也為您準備了 `Dockerfile` 作為備案。

---

## 📈 為什麼選擇 Render?

- ✅ **連線穩定**: 比 Heroku 更簡單的 GitHub 自動連線。
- ✅ **介面友善**: Dashboard 資訊一目瞭然。
- ✅ **效能優秀**: 提供強大的背景運算能力。

---

## ✅ 驗證部署

部署成功後，查看 **"Logs"** 標籤，應會看到：
`🚀 Uber Eats 訂單追蹤 Bot 已啟動!`
`📱 請在 Telegram 中傳送訂單 URL 給 Bot`

---

**準備好開始佈署到雲端了嗎?** 🚀

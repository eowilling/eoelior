# 📈 台灣股市智能分析系統

> 🤖 基於 AI 大模型的台股自選股智能分析系統，每日自動分析並推送「決策儀表板」

改編自 [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)，針對台灣股市優化。

## ✨ 功能特性

### 🎯 核心功能

- **AI 決策儀表板** - 一句話核心結論 + 精確買賣點位 + 檢查清單
- **多維度分析** - 技術面 + 籌碼分布 + 市場情報 + 即時行情
- **台股大盤** - 每日市場概覽、類股漲跌、外資動向
- **多渠道推送** - 支援 Line Notify、Telegram、Email
- **零成本部署** - GitHub Actions 免費運行，無需伺服器

### 📊 數據來源

- **行情數據**: Yahoo Finance (台股)、FinMind (選用)
- **新聞搜索**: Google Custom Search、鉅亨網
- **AI 分析**: Google Gemini (免費額度)

### 🛡️ 交易理念內置

- ❌ **嚴禁追高** - 乖離率 > 5% 自動標記「危險」
- ✅ **趨勢交易** - MA5 > MA10 > MA20 多頭排列
- 📍 **精確點位** - 買入價、停損價、目標價
- 📋 **檢查清單** - 每項條件用 ✅ ⚠️ ❌ 標記

## 🚀 快速開始

### 1. 安裝依賴

```bash
pip install -r requirements.txt
```

### 2. 配置環境變量

複製 `.env.example` 為 `.env` 並填寫：

```bash
# AI 模型 (必選其一)
GEMINI_API_KEY=your_gemini_api_key

# 股票代碼 (台股格式: 2330,2454,0050)
STOCK_LIST=2330,2454,0050

# 通知渠道 (可選)
LINE_NOTIFY_TOKEN=your_line_token
TELEGRAM_BOT_TOKEN=your_telegram_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 3. 運行分析

```bash
python main.py
```

## 📱 台股特性適配

- ✅ 漲跌停限制：±10%
- ✅ 交割制度：T+2
- ✅ 交易時間：09:00-13:30
- ✅ 股票代碼：4 位數字 (2330, 0050 等)
- ✅ 類股分類：電子、金融、傳產等

## 📁 項目結構

```
tw_stock_analysis/
├── main.py                 # 主程序入口
├── data_provider/          # 數據源模組
│   ├── __init__.py
│   ├── base.py            # 基礎類
│   ├── taiwan_fetcher.py  # 台股數據獲取
│   └── yfinance_fetcher.py
├── src/                    # 核心業務代碼
│   ├── analyzer.py        # AI 分析器
│   ├── config.py          # 配置管理
│   ├── notification.py    # 消息推送
│   └── storage.py         # 數據存儲
├── docs/                   # 文檔
├── requirements.txt        # 依賴列表
└── .env.example           # 環境變量範例
```

## 🔧 開發狀態

- [x] 項目架構
- [x] 台股數據源 (Yahoo Finance)
- [ ] FinMind 數據源
- [ ] 鉅亨網新聞爬蟲
- [ ] AI 分析引擎
- [ ] Line Notify 推送
- [ ] GitHub Actions 自動化

## ⚠️ 免責聲明

本項目僅供學習和研究使用，不構成任何投資建議。股市有風險，投資需謹慎。

## 📄 授權

MIT License

---

**基於原專案**: [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)

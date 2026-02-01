# 快速開始指南

## 📋 前置需求

- Python 3.10 或以上
- pip (Python 套件管理器)

## 🚀 安裝步驟

### 1. 安裝依賴套件

```bash
cd tw_stock_analysis
pip install -r requirements.txt
```

### 2. 配置環境變量

複製 `.env.example` 為 `.env`:

```bash
copy .env.example .env  # Windows
# 或
cp .env.example .env    # macOS/Linux
```

編輯 `.env` 文件，填入必要資訊：

```bash
# 必填: Gemini API Key
GEMINI_API_KEY=你的_API_KEY

# 必填: 自選股代碼 (逗號分隔)
STOCK_LIST=2330,2454,0050

# 選填: Line Notify Token
LINE_NOTIFY_TOKEN=你的_TOKEN
```

#### 如何獲取 API Keys

**Google Gemini API Key** (免費):
1. 訪問 https://aistudio.google.com/
2. 登入 Google 帳號
3. 點擊「Get API Key」
4. 複製 API Key

**Line Notify Token** (免費):
1. 訪問 https://notify-bot.line.me/my/
2. 登入 Line 帳號
3. 點擊「發行權杖」
4. 選擇接收通知的群組/個人
5. 複製權杖

## ✅ 測試系統

運行測試腳本驗證配置：

```bash
python test.py
```

你應該會看到：
- ✅ 配置驗證通過
- ✅ 數據獲取成功 (台積電範例)
- ✅ AI 分析器測試通過

## 🎯 開始分析

運行主程式：

```bash
python main.py
```

系統會：
1. 讀取 `.env` 中的自選股列表
2. 獲取每隻股票的最新數據
3. 使用 AI 進行技術分析
4. 輸出詳細的分析報告

## 📊 輸出範例

```
====================================================
📊 台股分析報告
時間: 2026-02-01 14:30:00
====================================================

📈 台積電 (2330)
----------------------------------------------------
當前價格: 580 元
漲跌幅: 📈 +1.5%

一句話結論: 多頭趨勢明確，建議逢低布局

核心理由: MA5 > MA10 > MA20 多頭排列，量價配合良好

技術面分析:
- 趨勢: 多頭
- 均線: 黃金交叉，支撐明確
- 量能: 量比 1.2，溫和放量
- 支撐: 570 元
- 壓力: 590 元

操作建議:
- 方向: 買入
- 建議價: 575 元
- 停損價: 565 元
- 目標價: 595 元
- 持倉: 半倉

檢查清單:
✅ 趨勢向上 (MA5 > MA10 > MA20)
✅ 乖離率安全 (2.8% < 5%)
✅ 量能配合 (量比 1.2 > 1)
✅ 未接近漲停 (1.5% < 8%)
✅ 技術面健康
```

## 🔧 常見問題

### Q1: 提示「未配置 GEMINI_API_KEY」
A: 請確認 `.env` 文件存在且包含有效的 API Key

### Q2: 股票數據獲取失敗
A: 檢查網路連線，或稍後再試。Yahoo Finance 可能暫時無法訪問。

### Q3: 分析速度較慢
A: Gemini API 首次呼叫可能較慢，後續會加快。如果持續緩慢，可能是網路問題。

### Q4: 想分析更多股票
A: 修改 `.env` 中的 `STOCK_LIST`，例如：
```
STOCK_LIST=2330,2454,0050,2317,2881
```

## 📚 下一步

- 查看 [完整文檔](docs/README.md)
- 設定 GitHub Actions 自動化
- 配置 Line Notify 推送
- 客製化分析 Prompt

## ⚠️ 注意事項

1. **API 配額**: Gemini 免費版有每日請求限制
2. **數據延遲**: Yahoo Finance 數據可能有 15 分鐘延遲
3. **投資風險**: 本系統僅供參考，不構成投資建議

## 🆘 需要幫助？

如有問題，請檢查：
1. Python 版本是否 >= 3.10
2. 所有依賴是否正確安裝
3. `.env` 配置是否完整
4. 網路連線是否正常

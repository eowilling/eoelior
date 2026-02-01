# 🚀 快速開始指南

## 📋 前置需求

- **Python 3.10+**
- **pip** (Python 套件管理器)
- 穩定的網路連線

## ⚡ 5分鐘快速上手

### 步驟 1: 安裝依賴

```bash
cd GU4
pip install -r requirements.txt
```

### 步驟 2: 配置環境

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

編輯 `.env` 文件，填入必要資訊：

```env
# 必填: Google Gemini API Key
GEMINI_API_KEY=AIzaSy...your_key_here

# 必填: 自選股代碼 (逗號分隔)
STOCK_LIST=2330,2454,0050

# 選填: Line Notify Token
LINE_NOTIFY_TOKEN=your_token_here
```

#### 📌 如何獲取 API Keys

**Google Gemini API** (免費):
1. 訪問 https://aistudio.google.com/
2. 登入 Google 帳號
3. 點擊「Get API key」
4. 建立新專案或選擇現有專案
5. 複製 API Key

**Line Notify Token** (選用):
1. 訪問 https://notify-bot.line.me/my/
2. 登入 Line 帳號
3. 點擊「發行權杖」
4. 選擇接收通知的群組
5. 複製權杖

### 步驟 3: 測試系統

```bash
python test.py
```

你應該會看到：

```
==================================================
🧪 台股分析系統測試
==================================================

1️⃣ 測試模組導入...
  ✅ src.config
  ✅ src.utils
  ✅ data_provider
  ✅ src.analyzer
  ✅ 所有模組導入成功

2️⃣ 測試配置...
  ✅ 配置驗證通過

3️⃣ 測試數據獲取...
  ✅ 成功 (來源: YFinanceTaiwan)
  ...

📋 測試摘要
總計: 5/5 通過

🎉 所有測試通過！系統就緒。
```

### 步驟 4: 開始分析

```bash
python main.py
```

## 📊 輸出範例

```
==================================================
🇹🇼 台股智能分析系統
==================================================
📅 分析時間: 2026-02-01 14:30:00
📊 自選股列表: 2330, 2454, 0050
📈 股票數量: 3 支
==================================================

[1/3] 分析中...
[2/3] 分析中...
[3/3] 分析中...

==================================================
📊 台股分析報告
==================================================

✅ 成功: 3 支  ❌ 失敗: 0 支

────────────────────────────────────────────────
📈 台積電 (2330)
────────────────────────────────────────────────
💰 當前價格: 580 元
📈 漲跌幅: +1.5%
📊 成交量: 50,000 股
📉 ✅ 多頭排列 (MA5=575.00 MA10=570.00 MA20=565.00)
📐 乖離率: +2.65%

🎯 一句話結論
建議逢低布局，目標價 600 元，停損 565 元

💡 核心理由
多頭排列明確，量價配合良好，技術面健康

📊 技術面分析
- 趨勢判斷: 多頭
- 均線系統: 黃金交叉，支撐明確
- 量價關係: 量比 1.2，溫和放量
...

⚠️  本系統僅供參考，不構成投資建議。
==================================================
```

## 🎯 常見問題

### Q1: 提示 "ModuleNotFoundError"

**解答**: 請確認已安裝所有依賴
```bash
pip install -r requirements.txt
```

### Q2: "未配置 GEMINI_API_KEY"

**解答**: 請確認：
1. `.env` 文件存在
2. `GEMINI_API_KEY` 已填寫
3. API Key 格式正確 (以 AIzaSy 開頭)

### Q3: 股票數據獲取失敗

**解答**: 可能原因：
- 網路連線問題
- Yahoo Finance 暫時無法訪問
- 股票代碼錯誤

嘗試：
```bash
# 測試單一股票
python -c "from data_provider import *; m=DataFetcherManager(); m.add_fetcher(YFinanceTaiwanFetcher()); print(m.get_daily_data('2330', 5))"
```

### Q4: 想分析更多股票

**解答**: 編輯 `.env` 文件：
```env
# 可以添加任意數量的股票 (用逗號分隔)
STOCK_LIST=2330,2454,0050,2317,2881,2882,2412,2308
```

### Q5: API 超過限額

**解答**: Gemini 免費版限制：
- 每分鐘 60 次請求
- 每天 1500 次請求

如果超過，可以：
1. 調整 `.env` 中的 `ANALYSIS_DELAY` (秒)
2. 減少 `STOCK_LIST` 中的股票數量
3. 等待配額重置

## 🔧 自訂配置

### 調整分析延遲

```env
# 每支股票分析後延遲秒數 (避免 API 限流)
ANALYSIS_DELAY=5
```

### 更改報告類型

```env
# simple: 精簡版 (預設)
# full: 完整版 (包含更多技術指標)
REPORT_TYPE=full
```

### 調整日誌級別

```env
# DEBUG: 最詳細
# INFO: 一般資訊 (預設)
# WARNING: 警告
# ERROR: 僅錯誤
LOG_LEVEL=DEBUG
```

## 📱 設定 Line Notify 推送

1. 取得 Line Notify Token (見上方)
2. 在 `.env` 中填入：
   ```env
   LINE_NOTIFY_TOKEN=your_token_here
   ```
3. 運行系統後會自動推送到 Line

## 🎓 進階功能

### 指定特定股票分析

修改 `main.py` 或創建自己的腳本：

```python
from src.config import get_config
from data_provider import DataFetcherManager, YFinanceTaiwanFetcher
from src.analyzer import StockAnalyzer

# 初始化
manager = DataFetcherManager()
manager.add_fetcher(YFinanceTaiwanFetcher())
analyzer = StockAnalyzer()

# 分析單一股票
df, source = manager.get_daily_data("2330", days=60)
quote = manager.get_realtime_quote("2330")

# 進行分析
result = analyzer.analyze_stock(
    stock_code="2330",
    stock_name="台積電",
    technical_data={
        'quote': quote,
        'latest': df.iloc[-1].to_dict(),
        # ... 更多數據
    }
)

print(result)
```

### 整合到自己的專案

```python
from GU4.main import TaiwanStockAnalysisApp

app = TaiwanStockAnalysisApp()
results = app.run()

# results 是分析結果列表
for result in results:
    if result['success']:
        print(f"{result['name']}: {result['analysis']}")
```

## 📚 相關文檔

- [完整配置說明](CONFIG.md) (TODO)
- [API 文檔](API.md) (TODO)
- [開發指南](DEVELOPMENT.md) (TODO)

## 🆘 需要幫助？

1. 查看 `logs/` 目錄下的日誌文件
2. 檢查 `.env` 配置是否正確
3. 確認 Python 版本 >= 3.10
4. 確認網路連線正常

## ⚠️ 重要提醒

1. **投資風險**: 本系統僅供學習參考，不構成投資建議
2. **數據準確性**: Yahoo Finance 數據可能有延遲
3. **API 配額**: 注意 Gemini API 的免費額度限制
4. **個人資訊**: 不要將 `.env` 文件上傳到公開倉庫

---

**準備好了嗎？立即開始分析台股！** 🚀

```bash
python main.py
```

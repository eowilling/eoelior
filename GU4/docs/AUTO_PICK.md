# 智能選股使用說明

## 功能說明

系統現在支援**自動選股**功能，不需要手動指定股票清單，系統會自動抓取市場熱門股票進行分析。

## 使用方式

### 方式一：手動指定股票（原有方式）

編輯 `.env` 檔案：
```
STOCK_LIST=2330,2454,0050
```

### 方式二：智能選股（新功能）

編輯 `.env` 檔案，**清空** `STOCK_LIST`：
```
STOCK_LIST=

# 選股方法
AUTO_PICK_METHOD=institutional

# 選股數量
AUTO_PICK_COUNT=5
```

## 選股方法

### 1. institutional - 三大法人買超（預設）
抓取外資、投信、自營商買超排行，適合穩健投資者。
```
AUTO_PICK_METHOD=institutional
```

### 2. gainers - 漲幅排行
抓取當日漲幅最大的股票，適合短線操作。
```
AUTO_PICK_METHOD=gainers
```

### 3. volume - 成交量排行
抓取成交量最大的股票，代表市場關注度高。
```
AUTO_PICK_METHOD=volume
```

### 4. mixed - 綜合評分
綜合法人買超、漲幅、成交量，計算綜合得分排名。
```
AUTO_PICK_METHOD=mixed
```

## 完整範例

### 範例 1：分析法人最看好的 5 支股票
```env
STOCK_LIST=
AUTO_PICK_METHOD=institutional
AUTO_PICK_COUNT=5
```

### 範例 2：分析今日漲幅前 3 名
```env
STOCK_LIST=
AUTO_PICK_METHOD=gainers
AUTO_PICK_COUNT=3
```

### 範例 3：綜合評分選出 8 支股票
```env
STOCK_LIST=
AUTO_PICK_METHOD=mixed
AUTO_PICK_COUNT=8
```

## 運行系統

```bash
python main.py
```

系統會自動：
1. 檢查 `STOCK_LIST` 是否為空
2. 如果為空，使用智能選股
3. 根據設定的方法抓取股票
4. 進行完整技術分析和 AI 建議

## 注意事項

1. **網路連線**：智能選股需要連接網路抓取排行資料
2. **備用機制**：如果無法抓取，會使用預設藍籌股清單（台積電、聯發科等）
3. **執行時間**：智能選股會增加 5-10 秒的啟動時間
4. **混合使用**：可以根據市場狀況切換手動和自動模式

## 測試選股功能

測試各種選股方法：
```bash
python -m src.stock_picker
```

會顯示四種方法的選股結果，幫助你選擇最適合的方法。

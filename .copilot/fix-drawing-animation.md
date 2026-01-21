# 修復：開獎動畫無法正常顯示的問題

## 問題描述
- 開獎動畫頁面不顯示或顯示不完整
- 號碼滾動動畫沒有出現
- 動畫跳幀或卡頓
- 快速跳到結果頁面

## 根本原因分析

### 1. **React 狀態更新時序問題**
```jsx
// 原始代碼的問題
setCurrentWinners(animatingWinners);
await delay(100);  // 延遲太短，React 還沒完成 re-render

const spinInterval = setInterval(() => {
  setCurrentWinners(prev => ...);  // 可能在上一次 setState 完成前就執行
}, 50);
```

**問題：** 
- React 的 `setState` 是異步的，100ms 延遲不足以確保 DOM 更新完成
- 同時有多個 `setCurrentWinners` 調用，可能造成狀態覆蓋

### 2. **動畫時序控制不當**
```jsx
await delay(1500);  // 滾動動畫時間不固定
```

**問題：** 
- 滾動和鎖定動畫的時間銜接不清晰
- 大量抽獎人數時，循環延遲邏輯混亂

### 3. **UI 視覺反饋不足**
- 動畫卡片陰影和邊框太淡
- 沒有明確的「準備中」狀態提示
- 文字大小和對比度不夠

## 修復方案

### 修改 1: executeDraw 函數邏輯優化
**位置：** 第 554-610 行

**主要改動：**
1. 增加初始延遲至 **300ms**，確保頁面切換完成
2. 引入 `isSpinning` 標誌量管理動畫狀態
3. 將滾動動畫時間改為 **2000ms**（2秒），更清晰
4. 簡化號碼鎖定邏輯，移除多餘的 state 轉換

```jsx
// 關鍵改動
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
await delay(300);  // ← 從 100ms 增加到 300ms

let isSpinning = true;
const spinInterval = setInterval(() => {
  if (!isSpinning) {
    clearInterval(spinInterval);
    return;
  }
  // 更新 state
}, 50);

await delay(2000);  // ← 滾動 2 秒
isSpinning = false;
clearInterval(spinInterval);

// 逐一鎖定號碼
for (let i = 0; i < winners.length; i++) {
  // ... 鎖定邏輯
  const dropDelay = drawQuantity > 10 ? 200 : 600;  // ← 調整延遲
}
```

### 修改 2: DrawingScreen 組件增強
**位置：** 第 991-1035 行

**視覺改進：**
1. 增加卡片尺寸（64 → 72）
2. 加強邊框和陰影效果
3. 加入「準備中」狀態檢查
4. 動畫銜接更平滑

```jsx
// 卡片樣式改進
w.locked ? 'border-yellow-400/90 shadow-[0_0_80px_rgba(234,179,8,0.6)]' 
         : 'border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.4)]'

// 加入狀態檢查
{currentWinners && currentWinners.length > 0 ? (
  // 顯示號碼
) : (
  <div className="text-2xl text-slate-500 animate-pulse">準備中...</div>
)}
```

## 動畫流程圖

```
1. 點擊「開始抽獎」
   ↓
2. executeDraw() 執行
   ├─ 設置 displayStage = 'drawing'
   ├─ 初始化 currentWinners = ['000', '000', ...]
   ├─ await 300ms (確保頁面切換)
   │
3. 進入 DrawingScreen
   ├─ 顯示號碼卡片，開始動畫
   │
4. spinInterval 開始滾動 (2000ms)
   ├─ 每 50ms 更新一次號碼
   ├─ isSpinning = true
   │
5. 逐一鎖定號碼 (600ms 間隔)
   ├─ setCurrentWinners(locked: true)
   ├─ 觸發 animate-drop-in 動畫
   │
6. 等待 1500ms
   ├─ 確保所有落下動畫完成
   │
7. 切換到 ResultScreen
   ├─ displayStage = 'result'
   ├─ 播放禮花動畫
```

## 測試檢查清單

- [ ] 點擊「開始抽獎」後，動畫頁面正常顯示
- [ ] 號碼卡片可見且清晰
- [ ] 號碼滾動動畫流暢（沒有跳幀）
- [ ] 號碼逐一鎖定並落下
- [ ] 動畫完成後切換到結果頁面
- [ ] 結果頁面顯示禮花動畫
- [ ] 抽獎 1 個、5 個、10+ 個時，動畫都能正常進行

## 相關文件
- `/home/eoelior/eoelior/weare/src/App.jsx` - 主應用邏輯
- `/home/eoelior/eoelior/weare/src/index.css` - 動畫定義（animate-drop-in, animate-bounce）


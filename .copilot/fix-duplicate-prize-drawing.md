# 修復：獎項抽完後仍能重複抽獎的漏洞

**問題描述：**
- 獎項已抽完（剩餘名額=0），卡片仍可點擊進入
- 進入數量設定頁面後，仍能點擊「開始抽獎」
- 結果導致獎項人數變成複數，待抽名單出現錯誤

**根本原因：**
1. 點擊事件和 disabled 屬性的邏輯分離
2. Firebase 實時數據更新可能有延遲（競態條件）
3. selectPrize 函數設置狀態後才進行檢查，導致有時序漏洞

**修復方案：**

### 修改 1: selectPrize 函數
**位置：** 第 481 行
```jsx
// 修改前
const selectPrize = (prize) => {
  setSelectedPrizeId(prize.id);  // 先設置狀態
  const remaining = prize.quantity - (prize.winners?.length || 0);
  if (remaining <= 0) {
    // 檢查
    return;
  }
};

// 修改後
const selectPrize = (prize) => {
  // 即時重新檢查剩餘名額（防止競態條件）
  const remaining = prize.quantity - (prize.winners?.length || 0);
  if (remaining <= 0) {
    showAlert('無可用名額', '此獎項已抽完，無剩餘名額！');
    return;  // 檢查失敗則直接返回，不設置狀態
  }
  setSelectedPrizeId(prize.id);  // 檢查通過後才設置狀態
  setDrawQuantity(Math.max(1, remaining));
  setDisplayStage('config-qty');
};
```

### 修改 2: PrizeSelectionScreen 按鈕
**位置：** 第 804 行
```jsx
// 修改前
onClick={() => !isDone && selectPrize(p)}

// 修改後
onClick={() => selectPrize(p)}
```
> 去掉 onClick 中的條件判斷，改由 selectPrize 內部進行檢查

### 修改 3: executeDraw 函數
**位置：** 第 498 行
```jsx
// 添加註解強調這是防止競態條件的重新檢查
// 即時重新檢查剩餘名額（防止競態條件）
const remaining = prize.quantity - (prize.winners?.length || 0);
```

### 修改 4: ConfigQtyScreen 返回按鈕
**位置：** 第 858 行
```jsx
// 修改前
onClick={() => setDisplayStage('select-prize')}

// 修改後
onClick={() => {
  setDisplayStage('select-prize');
  setSelectedPrizeId(null);  // 清除選中的獎項
}}
```
> 確保返回時清除狀態，避免再次進入時顯示舊數據

**驗證邏輯：**
✅ selectPrize 函數：檢查 → 設置狀態 → 進入頁面  
✅ executeDraw 函數：重新檢查剩餘名額 → 驗證 → 執行抽獎  
✅ ConfigQtyScreen：顯示錯誤時自動清除狀態

**測試場景：**
1. 抽完某個獎項後，該卡片應無法點擊
2. 如果網絡延遲導致卡片可點擊，進入後應顯示「無可用名額」錯誤
3. 點擊「重新選擇獎項」返回後，狀態應被清除


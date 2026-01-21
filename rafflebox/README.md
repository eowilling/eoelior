# Rafflebox 抽獎系統 v2.0

全新架構、清晰邏輯、優化性能的企業級抽獎系統

## ✨ 特色

- 🎯 **完全重構** - 從零開始設計，邏輯清晰
- 🔥 **多頁面設計** - 展示頁 / 管理頁 / 抽獎頁 / 結果頁
- ⚡ **科技感動畫** - 號碼旋轉、卡片落下、禮花效果
- 🛡️ **嚴密驗證** - 多層防護，防止邏輯漏洞
- 📱 **響應式設計** - 適配各種屏幕尺寸
- 🔗 **Firebase 實時同步** - 多屏同步無延遲

## 🚀 快速開始

```bash
cd rafflebox
npm install
npm run dev
```

訪問 `http://localhost:5173`

## 📁 文件結構

```
rafflebox/
├── src/
│   ├── App.jsx          # 主應用（1800+ 行，包含所有邏輯）
│   ├── main.jsx         # React 入口
│   └── index.css        # 全局樣式和動畫
├── index.html           # HTML 入口
├── firebase-config.js   # Firebase 配置
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
└── package.json         # 依賴管理
```

## 🎮 功能說明

### 展示頁 (Display)
- 實時顯示所有獎項和剩餘名額
- 區分最大獎和普通獎
- 點擊獎項進入抽獎頁面

### 管理頁 (Admin)
- 新增/編輯/刪除獎項
- 生成/清空彩票
- 查看統計數據

### 抽獎頁 (Draw)
- 調整抽獎數量
- 實時動畫顯示
- 嚴密的驗證邏輯

### 結果頁 (Results)
- 顯示中獎號碼
- 禮花動畫慶祝
- 繼續下一輪抽獎

## 🔐 邏輯保護

| 層級 | 保護方式 |
|------|--------|
| **UI 層** | 禁用按鈕、輸入驗證 |
| **狀態層** | Math.max/min 範圍限制 |
| **函數層** | 條件檢查和錯誤提示 |
| **數據層** | Firebase 事務更新 |

## 🎨 動畫特效

- **號碼旋轉** - 0.3s 動畫，視覺效果流暢
- **卡片落下** - cubic-bezier 緩動，自然落下
- **禮花** - 80 個粒子，隨機速度和延遲
- **脈衝光暈** - 2s 循環，呼吸感十足

## 📊 數據模型

```javascript
// 獎項
{
  id: string,
  name: string,          // 獎項名稱
  quantity: number,      // 總人數
  winners: string[],     // 中獎號碼數組
  isGrandPrize?: boolean, // 是否為最大獎
  order: number,         // 排序
}

// 彩票
{
  id: string,
  number: string,        // 號碼 (001-999)
  isWinner: boolean,     // 是否中獎
  wonPrizeId?: string,   // 中獎獎項 ID
}

// 配置
{
  title: string,         // 活動標題
}
```

## 🛠️ 開發注意

- 所有狀態邏輯都在 App.jsx 中集中管理
- 使用 Firestore 實時監聽確保數據同步
- 動畫通過 CSS 和狀態控制，性能最優化


# 尾牙抽獎系統 - 項目說明
## 🎯 項目簡介
這是一個基於HTML/CSS/JavaScript開發的純前端尾牙抽獎系統，具備完整的抽獎功能和科技感界面，適用於企業尾牙、年會、活動抽獎等場合。
## 📁 項目結構
```
├── lottery.html          # 主程序文件
├── README.md             # 使用說明書
├── PROJECT.md            # 項目說明文件
└── demo_participants.txt # 演示數據文件
```
## 🚀 技術棧
- **HTML5**：結構標記
- **CSS3**：樣式設計、動畫效果
- **JavaScript (ES6+)**：業務邏輯
- **localStorage**：數據存儲
## ✨ 核心功能實現
### 1. 數據管理系統
```javascript
// 本地存儲實現
function saveToStorage() {
    const data = { prizes, participants, winners };
    localStorage.setItem('lotterySystem', JSON.stringify(data));
}
```
### 2. 隨機抽獎算法
```javascript
// 公平隨機抽獎邏輯
const winnerIndex = Math.floor(Math.random() * availableParticipants.length);
const prizeIndex = Math.floor(Math.random() * availablePrizes.length);
```
### 3. 動畫效果
```css
/* 粒子動畫 */
@keyframes float {
    0%, 100% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
    }
}
```
## 🎨 設計特色
### 1. 視覺設計
- **深色主題**：營造科技感和專業感
- **霓虹光效**：藍色、紫色漸變，符合現代審美
- **玻璃擬態**：半透明背景，層次分明
### 2. 交互設計
- **直觀操作**：按鈕顏色區分功能（藍色-操作、紅色-危險、綠色-成功）
- **狀態反饋**：即時顯示操作結果
- **動畫引導**：抽獎滾動效果，提升期待感
### 3. 響應式設計
- **移動優先**：支持手機、平板、電腦
- **大屏優化**：適配會議室投影、LED屏幕
## 📊 性能優化
1. **動畫優化**：使用CSS3硬件加速
2. **內存管理**：及時清理定時器
3. **DOM操作**：減少重繪和回流
4. **數據處理**：批量操作優化
## 🔧 擴展功能建議
### 1. 高級功能
- [ ] 雲端數據同步
- [ ] 多用戶權限管理
- [ ] 抽獎記錄審計
- [ ] 自定義模板
### 2. 動畫增強
- [ ] 3D抽獎動畫
- [ ] 音效支持
- [ ] 互動特效
### 3. 數據分析
- [ ] 中獎數據統計
- [ ] 參與率分析
- [ ] 活動效果評估
## 📦 部署說明
### 本地運行
1. 下載所有文件到本地
2. 直接打開 `lottery.html` 文件即可
### 服務器部署
1. 上傳所有文件到網站服務器
2. 通過域名或IP地址訪問
### 大屏展示
1. 使用Chrome瀏覽器打開
2. 按F11進入全屏模式
3. 禁用瀏覽器通知
## 🎯 使用場景
- 企業尾牙抽獎
- 年會活動抽獎
- 員工福利活動
- 客戶答謝會
- 產品發布會
- 校園活動
## 📝 開發日誌
### v1.0.0 (2026-01-22)
- 完成核心抽獎功能
- 實現科技感界面設計
- 添加動畫效果
- 完成本地存儲功能
- 編寫使用說明書
## 🤝 貢獻指南
歡迎提交Issue和Pull Request來改進這個項目！
## 📄 許可證
MIT License - 可自由使用和修改
---
**祝您使用愉快！🎉**
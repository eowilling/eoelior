# eoelior 🛠️

一個實用的 Web 工具集合，提供多種日常工作和娛樂小工具。

## 🌟 專案簡介

eoelior 是一個個人工具倉庫，收集和整理各種實用的 Web 工具和腳本，無需安裝即可在瀏覽器中直接使用。所有工具皆為純前端應用，簡單、輕量且易於使用。

## 📦 工具列表

### 生產力工具

- **流程圖工具** (`FlowChart/`) - 視覺化流程圖繪製工具
- **SOP 編寫工具** (`SOPlist/`) - 標準作業程序文件編寫器
- **SOP 目錄工具** (`LUSH/`) - SOP 文件管理和索引系統
- **每日打卡日曆** (`eveday/`) - 追蹤每日習慣和目標的日曆系統

### 圖像處理

- **HEIC 轉 PNG/JPG** (`HeicPngJpg/`) - HEIC 格式圖片轉換工具
- **QRcode 產生器** (`QRcode/`) - 快速生成 QR Code

### 專業工具

- **債權工具** (`flower/`) - 債權計算和管理工具
- **高鐵搶票助手** (`IRS/`) - 台灣高鐵訂票輔助工具

### 遊戲娛樂

- **轉盤遊戲** (`buytonobuy/`) - 互動式決策輔助轉盤，支援自訂選項
- **數獨遊戲** (`sudo/`) - 完整的數獨遊戲系統，包含多種難度等級

### 其他工具

- **自動備份工具** (`bakauto/`) - Python 自動備份腳本
- **會議分析工具** (`talktalk/`) - 會議記錄統計和分析系統

## 🚀 開始使用

### 線上使用

1. 將專案部署到支援靜態網頁的伺服器（如 Apache、Nginx、GitHub Pages）
2. 訪問 `index.html` 即可看到工具入口頁面
3. 點擊任意工具按鈕，即可在新分頁中開啟該工具

### 本地使用

```bash
# 1. 克隆專案
git clone https://github.com/yourusername/eoelior.git

# 2. 使用任意本地伺服器開啟
# 方法 1: 使用 Python
cd eoelior
python -m http.server 8000

# 方法 2: 使用 PHP
php -S localhost:8000

# 方法 3: 直接用瀏覽器開啟 index.html
```

然後在瀏覽器中訪問 `http://localhost:8000`

## 🏗️ 專案結構

```
eoelior/
├── index.html              # 主入口頁面
├── README.md              # 專案說明文件
│
├── FlowChart/             # 流程圖工具
├── HeicPngJpg/            # 圖片格式轉換
├── QRcode/                # QR Code 生成器
├── SOPlist/               # SOP 編寫工具
├── LUSH/                  # SOP 目錄管理
├── flower/                # 債權工具
├── IRS/                   # 高鐵訂票助手
├── buytonobuy/            # 轉盤遊戲
│   ├── index.html         # 遊戲主頁
│   ├── admin.html         # 管理介面
│   └── adminplus.html     # 進階管理
├── eveday/                # 每日打卡系統
├── sudo/                  # 數獨遊戲
├── bakauto/               # 自動備份腳本
└── talktalk/              # 會議分析工具
```

## 🔧 技術棧

- **前端框架**: 原生 HTML5 + CSS3 + JavaScript
- **UI 框架**: Tailwind CSS
- **後端語言**: Python (部分工具)
- **伺服器**: PHP (部分功能)
- **其他**: Canvas API、LocalStorage、File API

## 📖 文檔

- [專案紀錄](./專案紀錄.md) - 查看詳細的專案記錄和版本歷程

## 💡 特色功能

- ✅ **無需安裝** - 所有前端工具在瀏覽器中直接運行
- ✅ **響應式設計** - 支援桌面和行動裝置
- ✅ **簡單易用** - 直覺的使用者介面
- ✅ **開箱即用** - 無需複雜設定
- ✅ **持續更新** - 不斷加入新工具

## 🛠️ 開發中的功能

本專案持續改進，更多工具將陸續加入。

## 📝 版本歷史

查看 [Releases](../../releases) 頁面了解各版本的更新內容。

## 🤝 貢獻

這是一個個人專案，目前不接受外部貢獻。如有建議或問題，歡迎開啟 Issue 討論。

## 📄 授權

本專案僅供個人使用和學習參考。

## 👤 作者

**eoelior** - 個人工具集合專案

---

⭐ 如果這個專案對您有幫助，歡迎給個 Star！

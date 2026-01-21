# eoelior

一個可直接用瀏覽器開啟的工具集合（以純前端為主，少部分工具含 PHP / Python 輔助腳本）。

## 入口

- `index.html`：工具入口頁（`./index.html`）
- `FlowChart/FlowChat.html`：流程圖工具（推薦，`./FlowChart/FlowChat.html`）

## 工具列表（以目前專案目錄為準）

### 生產力

- **流程圖工具**：`FlowChart/FlowChat.html`
- **每日打卡**：`eveday/index.html`（另含 `EveryDay.php` 等檔案）
- **LUSH（文件索引）**：`LUSH/index.html`
- **ISMS**：`ISMS/isms.html`

### 圖像處理

- **HEIC 轉 PNG/JPG**：`HeicPngJpg/H2PJ.html`
- **QR Code 產生器**：`QRcode/qr-generate-standalone.html`

### 遊戲娛樂

- **數獨遊戲**：`sudo/index.html`
- **買不買轉盤**：`buytonobuy/index.html`（同資料夾另有 `admin.html` 等）

### 其他/報表/腳本

- **會議分析/統計**：`talktalk/`（報表：`talktalk/analysis_results/meeting_statistics_report.html`）
- **自動備份腳本**：`bakauto/`

## 本地使用

### 方式 1：XAMPP / Apache（建議）

把整個資料夾放到你的網站根目錄（你目前是 `htdocs/eoelior`），然後開啟：

- `http://localhost/eoelior/index.html`

### 方式 2：任意靜態伺服器

例如 Python：

```bash
python -m http.server 8000
```

再開啟 `http://localhost:8000/index.html`。

## 專案結構（節錄）

```
eoelior/
├── index.html
├── README.md
├── FlowChart/FlowChat.html
├── HeicPngJpg/H2PJ.html
├── QRcode/qr-generate-standalone.html
├── LUSH/index.html
├── ISMS/isms.html
├── eveday/index.html
├── sudo/index.html
├── buytonobuy/index.html
└── talktalk/analysis_results/meeting_statistics_report.html
```

## 維護入口頁的方法

入口頁 `index.html` 使用一個 `TOOLS` 陣列產生卡片與分類；要新增/移除工具，修改該清單即可。

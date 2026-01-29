# Samsung DEX Controller

一個方便的 Python GUI 工具，用於控制 scrcpy 連接 Samsung DEX。

## 功能特色

✨ **主要功能**
- 🔌 一鍵啟動有線 DEX
- 📡 一鍵啟動無線 DEX
- 🔄 快速重啟 ADB 連接
- ⏹️ 關閉 DEX 連接
- 📌 最小化到系統托盤

🎯 **特別優化**
- ✅ 支援注音輸入法（使用 uhid 鍵盤模式）
- ✅ 可自訂解析度和更新率
- ✅ 配置自動儲存
- ✅ 系統托盤常駐

## 安裝步驟

### 1. 安裝 Python 套件

```bash
pip install -r requirements.txt
```

### 2. 設定 scrcpy 路徑

首次啟動時，請在設定區域填入你的 scrcpy 安裝路徑：
```
D:\EO\KeepTool\scrcpy-win64-v3.3.4
```

### 3. 啟動程式

**方法一：使用批次檔**
```bash
啟動控制器.bat
```

**方法二：直接執行**
```bash
python scrcpy_dex_controller.py
```

## 使用說明

### 鍵盤模式說明

為了解決注音輸入法問題，程式提供三種鍵盤模式：

- **uhid** (推薦) - 最佳注音輸入法支援
- **aoa** - 備用模式，相容性較好
- **sdk** - 預設模式，但對注音支援較差

### 注音輸入法設定技巧

1. **使用 uhid 模式** - 在設定中選擇 `uhid` 鍵盤模式
2. **添加 --prefer-text 參數** - 程式已自動添加此參數
3. **確保 Android 版本** - Android 14+ 支援 uhid 模式最佳

### 系統托盤功能

點擊「最小化到系統托盤」後，程式會隱藏到工作列托盤：
- 右鍵點擊托盤圖標可快速執行各項功能
- 選擇「顯示主視窗」可重新打開介面
- 選擇「退出」可完全關閉程式

## 故障排除

### 問題：注音輸入無法使用

**解決方案：**
1. 確認鍵盤模式設定為 `uhid`
2. 更新 scrcpy 到最新版本 (v3.3+)
3. 檢查 Android 裝置是否支援 UHID 模式

### 問題：找不到 scrcpy

**解決方案：**
1. 確認 scrcpy 路徑設定正確
2. 檢查路徑中是否包含 `scrcpy.exe`
3. 儲存設定後重新啟動程式

### 問題：無線連接失敗

**解決方案：**
1. 確保電腦和手機在同一網路
2. 先使用有線連接測試
3. 執行「重啟 ADB」後再試

## 技術細節

- **語言**: Python 3.x
- **GUI 框架**: tkinter
- **系統托盤**: pystray
- **圖像處理**: Pillow

## 參考資料

- [scrcpy GitHub](https://github.com/Genymobile/scrcpy)
- [Samsung DEX on PC替代方案](https://www.reddit.com/r/SamsungDex/comments/1ppoxhe/samsung_dex_on_pc_is_gone_heres_how_to_run_full/)
- [無線 DEX 設定](https://www.reddit.com/r/SamsungDex/comments/1omaa21/found_a_proper_way_to_use_wireless_dex_on_windows/)

## 授權

MIT License

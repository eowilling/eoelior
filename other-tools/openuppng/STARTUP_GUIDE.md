# 啟動 OpenUpPng 應用程式

## 問題診斷

您遇到的錯誤是因為 **Apache 伺服器沒有運行**。

錯誤訊息：
- `上傳失敗: Failed to fetch`
- `載入失敗`

## 解決方案

### 方法 1: 使用 XAMPP Control Panel（推薦）

1. **開啟 XAMPP Control Panel**
   - 執行 `C:\xampp\xampp-control.exe`
   - 或從開始選單搜尋 "XAMPP Control Panel"

2. **啟動 Apache**
   - 在 XAMPP Control Panel 中找到 "Apache" 那一行
   - 點擊 "Start" 按鈕
   - 等待狀態變為綠色

3. **驗證 Apache 已啟動**
   - 在瀏覽器中訪問：`http://localhost`
   - 應該會看到 XAMPP 歡迎頁面

4. **訪問 OpenUpPng**
   - 在瀏覽器中開啟：`http://localhost/eoelior/OpenUpPng/`
   - 現在應該可以正常使用了！

### 方法 2: 使用命令列啟動 Apache

```powershell
# 啟動 Apache
C:\xampp\apache\bin\httpd.exe

# 或者使用 XAMPP 的啟動腳本
C:\xampp\apache_start.bat
```

### 方法 3: 使用 PHP 內建伺服器（臨時測試）

如果 XAMPP Apache 有問題，可以使用 PHP 內建伺服器：

```powershell
# 在 OpenUpPng 目錄中執行
cd C:\xampp\htdocs\eoelior\OpenUpPng
php -S localhost:8000
```

然後在瀏覽器中訪問：`http://localhost:8000/`

## 測試步驟

### 1. 測試 PHP 配置
訪問：`http://localhost/eoelior/OpenUpPng/test.php`

應該會看到 JSON 格式的配置資訊，例如：
```json
{
    "php_version": "8.x.x",
    "gd_enabled": true,
    "upload_max_filesize": "10M",
    "uploads_exists": true,
    "uploads_writable": true
}
```

### 2. 測試圖片庫 API
訪問：`http://localhost/eoelior/OpenUpPng/get_images.php`

應該會看到：
```json
{
    "success": true,
    "images": []
}
```

### 3. 測試主頁面
訪問：`http://localhost/eoelior/OpenUpPng/`

應該會看到漂亮的上傳介面。

## 常見問題

### Q: Apache 無法啟動
**可能原因：**
- 端口 80 被其他程式佔用（如 IIS、Skype）
- 防火牆阻擋

**解決方法：**
1. 檢查端口佔用：
   ```powershell
   netstat -ano | findstr :80
   ```

2. 修改 Apache 端口（如果需要）：
   - 編輯 `C:\xampp\apache\conf\httpd.conf`
   - 將 `Listen 80` 改為 `Listen 8080`
   - 重啟 Apache
   - 訪問 `http://localhost:8080/eoelior/OpenUpPng/`

### Q: 上傳後顯示 "無法處理圖片"
**解決方法：**
- 確認 PHP GD 擴展已啟用
- 檢查 `test.php` 中的 `gd_enabled` 是否為 `true`

### Q: 圖片無法顯示
**解決方法：**
- 確認 `uploads/` 目錄存在且可寫入
- 檢查檔案權限

## 快速啟動指令

```powershell
# 1. 啟動 XAMPP Control Panel
Start-Process "C:\xampp\xampp-control.exe"

# 2. 在瀏覽器中開啟應用程式
Start-Process "http://localhost/eoelior/OpenUpPng/"
```

## 已修復的問題

✅ 已添加 CORS 標頭到 `upload.php` 和 `get_images.php`
✅ 已創建 `uploads/` 目錄
✅ 已添加錯誤處理和日誌記錄
✅ 已創建診斷測試文件 `test.php`

## 下一步

1. **啟動 Apache** - 使用上述任一方法
2. **測試應用程式** - 訪問 `http://localhost/eoelior/OpenUpPng/`
3. **上傳圖片** - 拖曳或選擇圖片進行測試
4. **分享連結** - 複製生成的 PNG 圖片連結

如果仍有問題，請檢查：
- Apache 錯誤日誌：`C:\xampp\apache\logs\error.log`
- PHP 錯誤日誌：`C:\xampp\php\logs\php_error_log`

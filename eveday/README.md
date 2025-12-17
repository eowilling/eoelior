# 每日語錄日曆

## 使用 PHP 版本（推薦）

### 為什麼使用 PHP？

1. **安全性**：API Key 和 Firebase 配置不會暴露在前端代碼中
2. **配置管理**：可以從環境變數或配置文件讀取
3. **靈活性**：未來可以擴展後端功能

### 設定步驟

#### 方式 1: 使用配置文件（推薦用於開發）

1. 複製 `config.example.php` 為 `config.php`：
   ```bash
   cp config.example.php config.php
   ```

2. 編輯 `config.php`，填入您的配置：
   ```php
   return [
       'appId' => 'your-app-id',
       'firebaseConfig' => [
           'apiKey' => 'your-firebase-api-key',
           // ... 其他 Firebase 配置
       ],
       'geminiApiKey' => 'your-gemini-api-key'
   ];
   ```

3. 在 `EveryDay.php` 中取消註解配置文件的引用：
   ```php
   require_once __DIR__ . '/config.php';
   $config = require __DIR__ . '/config.php';
   ```

#### 方式 2: 使用環境變數（推薦用於生產環境）

在 XAMPP 中設定環境變數，或使用 `.htaccess` 設定：

```apache
SetEnv APP_ID "your-app-id"
SetEnv FIREBASE_CONFIG '{"apiKey":"...","authDomain":"..."}'
SetEnv GEMINI_API_KEY "your-api-key"
```

#### 方式 3: 直接設定（僅用於開發測試）

在 `EveryDay.php` 中直接填入配置（不建議用於生產環境）。

### 安全注意事項

⚠️ **重要**：
- 不要將 `config.php` 提交到版本控制系統
- 確保 `config.php` 在 `.gitignore` 中
- 生產環境請使用環境變數或安全的配置管理方式

### 訪問方式

在瀏覽器中訪問：
```
http://localhost/eveday/EveryDay.php
```

## 使用 HTML 版本（不推薦）

如果您堅持使用 HTML 版本，請注意：
- API Key 會暴露在前端代碼中
- 任何人都可以在瀏覽器中查看您的 API Key
- 不建議用於生產環境


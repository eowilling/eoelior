# GitHub 上傳指南

## ⚠️ 重要：上傳前檢查清單

### ✅ 必須確認的事項

1. **敏感檔案已加入 .gitignore**
   - ✅ `firebase-config.js` - 包含 Firebase API Key（已忽略）
   - ✅ `irebase-config.js` - 備份配置檔案（已忽略）
   - ❌ `firebase-config.example.js` - 範例檔案（可提交，不含真實金鑰）

2. **確認沒有硬編碼的 API Key**
   - ✅ `index.html` - 使用外部配置注入
   - ✅ `buyROnobuy.html` - 檢查是否包含敏感資訊
   - ✅ `admin.html` / `adminplus.html` - 檢查是否包含敏感資訊

---

## 📤 上傳步驟

### 方法 1: 使用 Git 命令列（推薦）

#### 步驟 1: 檢查狀態
```bash
git status
```

#### 步驟 2: 確認要提交的檔案
確認以下檔案**不包含**敏感資訊：
- ✅ `buytonobuy/index.html` - 已使用外部配置
- ✅ `buytonobuy/firebase-config.example.js` - 僅範例，不含真實金鑰
- ✅ `buytonobuy/FIREBASE_SETUP.md` - 文件
- ✅ `buytonobuy/AUTH_TROUBLESHOOTING.md` - 文件
- ✅ `buytonobuy/TEST_CHECKLIST.md` - 文件

#### 步驟 3: 加入要提交的檔案
```bash
# 加入修改的檔案
git add .gitignore
git add buytonobuy/index.html
git add index.html

# 加入新檔案（文件）
git add buytonobuy/FIREBASE_SETUP.md
git add buytonobuy/AUTH_TROUBLESHOOTING.md
git add buytonobuy/TEST_CHECKLIST.md
git add buytonobuy/firebase-config.example.js

# 注意：不要加入 firebase-config.js 或 irebase-config.js
```

#### 步驟 4: 提交變更
```bash
git commit -m "feat: 新增 Firebase 雲端同步功能

- 整合 Firebase Firestore 用於轉盤配置分享
- 新增外部配置注入機制（firebase-config.js）
- 新增雲端分享連結功能
- 新增詳細的文件和排除指南
- 更新 .gitignore 保護敏感配置檔案"
```

#### 步驟 5: 推送到 GitHub
```bash
git push origin main
```

---

### 方法 2: 使用 GitHub Desktop（圖形介面）

1. **開啟 GitHub Desktop**
2. **檢查變更**
   - 左側會顯示所有修改的檔案
   - 確認 `firebase-config.js` 和 `irebase-config.js` **沒有**出現在列表中

3. **選擇要提交的檔案**
   - ✅ 勾選 `.gitignore`
   - ✅ 勾選 `buytonobuy/index.html`
   - ✅ 勾選 `index.html`
   - ✅ 勾選所有 `.md` 文件
   - ✅ 勾選 `firebase-config.example.js`
   - ❌ **不要勾選** `firebase-config.js` 或 `irebase-config.js`

4. **填寫提交訊息**
   ```
   feat: 新增 Firebase 雲端同步功能
   
   - 整合 Firebase Firestore 用於轉盤配置分享
   - 新增外部配置注入機制
   - 新增雲端分享連結功能
   - 新增詳細的文件和排除指南
   ```

5. **點擊「Commit to main」**

6. **推送到 GitHub**
   - 點擊「Push origin」按鈕

---

## 🔒 安全檢查

### 上傳前最後檢查

在推送之前，執行以下命令確認敏感檔案不會被提交：

```bash
# 檢查是否有敏感檔案被追蹤
git ls-files | grep -i "firebase-config.js"
git ls-files | grep -i "irebase-config.js"

# 如果上述命令有輸出，表示檔案被追蹤了，需要從 Git 中移除：
# git rm --cached buytonobuy/firebase-config.js
# git rm --cached buytonobuy/irebase-config.js
```

### 檢查 .gitignore 是否生效

```bash
# 檢查 .gitignore 規則
git check-ignore -v buytonobuy/firebase-config.js
git check-ignore -v buytonobuy/irebase-config.js

# 應該顯示匹配的規則，如果沒有輸出，表示未被忽略
```

---

## 📝 提交訊息範例

### 功能新增
```
feat: 新增 Firebase 雲端同步功能
```

### 錯誤修正
```
fix: 修正 Firebase 認證錯誤處理
```

### 文件更新
```
docs: 新增 Firebase 設定指南
```

### 安全性改進
```
security: 將 Firebase 配置移至外部檔案
```

---

## 🚨 如果意外提交了敏感資訊

### 緊急處理步驟

1. **立即撤銷最後一次提交**（如果還沒推送）
   ```bash
   git reset --soft HEAD~1
   ```

2. **如果已經推送，需要從歷史中移除**
   ```bash
   # 從 Git 歷史中移除檔案
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch buytonobuy/firebase-config.js" \
     --prune-empty --tag-name-filter cat -- --all
   
   # 強制推送（危險操作，請謹慎）
   git push origin --force --all
   ```

3. **在 Firebase Console 中輪換 API Key**
   - 前往 Firebase Console → 專案設定
   - 重新生成 API Key
   - 更新本地的 `firebase-config.js`

---

## ✅ 上傳後確認

上傳完成後，請在 GitHub 上確認：

1. ✅ 檢查 `firebase-config.js` **不存在**於倉庫中
2. ✅ 檢查 `irebase-config.js` **不存在**於倉庫中
3. ✅ 確認 `firebase-config.example.js` 存在（不含真實金鑰）
4. ✅ 確認所有文件都已上傳
5. ✅ 確認 `.gitignore` 包含正確的規則

---

## 📚 相關資源

- [Git 官方文件](https://git-scm.com/doc)
- [GitHub 文件](https://docs.github.com/)
- [.gitignore 語法](https://git-scm.com/docs/gitignore)

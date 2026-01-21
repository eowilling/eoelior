# 如何上傳到 GitHub

由於 GitHub CLI 未安裝,請按照以下步驟手動創建 repository:

## 方法 1: 使用 GitHub 網頁介面

1. **前往 GitHub 創建新 repository**
   - 訪問: <https://github.com/new>
   - Repository name: `lottery-weare`
   - Description: `尾牙抽獎系統 - 使用 React + Firebase + Tailwind CSS`
   - 選擇 Public
   - **不要**勾選 "Add a README file"
   - 點擊 "Create repository"

2. **在本地執行以下命令**

   ```bash
   cd c:\xampp\htdocs\eoelior\weare
   git remote add origin https://github.com/YOUR_USERNAME/lottery-weare.git
   git branch -M main
   git push -u origin main
   ```

## 方法 2: 使用現有的 eoelior repository (推薦)

如果您想將此專案放在現有的 eoelior repository 的子目錄中:

```bash
cd c:\xampp\htdocs\eoelior\weare
git remote add origin https://github.com/eowilling/eoelior.git
git subtree push --prefix=weare origin main
```

## 當前狀態

✅ 已完成:

- Git 初始化
- 所有檔案已 commit
- Firebase 配置完成
- 開發伺服器運行正常

⏳ 待完成:

- 設定 GitHub remote
- Push 到 GitHub

## 快速指令 (複製貼上即可)

請告訴我您的 GitHub username,我會提供完整的指令!

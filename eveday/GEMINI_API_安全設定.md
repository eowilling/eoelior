# Gemini API Key 安全設定指南

## 🔒 如何保護您的 Gemini API Key

雖然 API Key 會出現在前端程式碼中,但您可以透過 **HTTP Referrer Restrictions** 來限制只有特定網域可以使用。

### 設定步驟

1. **前往 Google AI Studio**

   ```
   https://aistudio.google.com/
   ```

2. **點擊左側選單的 "Get API key"**

3. **找到您的 API Key,點擊右側的 ⋮ (更多選項)**

4. **選擇 "Edit API key"**

5. **在 "Application restrictions" 中選擇 "HTTP referrers (web sites)"**

6. **新增允許的網域:**

   ```
   https://eowilling.github.io/*
   http://localhost/*
   http://127.0.0.1/*
   ```

7. **點擊 "Save"**

### ✅ 設定完成後

- ✅ 只有您指定的網域可以使用這個 API Key
- ✅ 其他人即使複製了 API Key 也無法使用
- ✅ 可以安全地將 API Key 放在前端程式碼中

### ⚠️ 注意事項

- 設定生效需要幾分鐘時間
- 建議同時設定 **Quota limits** 限制每日使用量
- 定期檢查 API 使用情況

### 📊 監控使用量

前往 [Google Cloud Console](https://console.cloud.google.com/) 查看 API 使用統計。

---

**最後更新**: 2026-01-27

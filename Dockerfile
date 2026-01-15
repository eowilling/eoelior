# 使用官方 Python 映像檔並預裝 Playwright 依賴
FROM mcr.microsoft.com/playwright/python:v1.40.0-jammy

# 設定工作目錄
WORKDIR /app

# 複製依賴清單並安裝
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製所有程式碼
COPY . .

# 設定環境變數
ENV PYTHONUNBUFFERED=1

# 啟動指令 (作為背景服務)
CMD ["python", "telegram_order_bot.py"]

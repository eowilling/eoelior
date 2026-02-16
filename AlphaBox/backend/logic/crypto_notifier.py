import os
import requests
import logging
from pathlib import Path
from dotenv import load_dotenv
from datetime import datetime

# Load env using the same logic as sentinel.py
env_path = Path(__file__).parent.parent / 'GU4' / '.env'
if not env_path.exists():
    env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

logger = logging.getLogger(__name__)

TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

def send_alert(symbol, price, condition, target_price):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        logger.error("Telegram credentials missing in .env")
        return False

    # 處理測試訊息
    if condition == 'test':
        emoji = "🧪"
        msg = f"{emoji} **AlphaBox 系統測試通知**\\n\\n" \
              f"✅ Telegram 推播功能正常\\n" \
              f"📊 警報監控運行中\\n" \
              f"⏰ 測試時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\\n\\n" \
              f"這是一則測試訊息,用於驗證通知功能是否正常運作。"
    else:
        emoji = "🚀" if condition == 'above' else "🔻"
        condition_text = "突破高點" if condition == 'above' else "跌破低點"
        msg = f"{emoji} **價格警報觸發: {symbol}**\\n\\n" \
              f"📍 當前價格: **${price:.2f}**\\n" \
              f"🎯 觸發條件: {condition_text} ${target_price:.2f}\\n" \
              f"⏰ 觸發時間: {datetime.now().strftime('%H:%M:%S')}\\n\\n" \
              f"請前往 AlphaBox 查看詳情"

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": msg,
        "parse_mode": "Markdown"
    }

    try:
        resp = requests.post(url, json=payload, timeout=5)
        if resp.status_code == 200:
            logger.info(f"✅ Telegram 發送成功: {symbol}")
            return True
        else:
            logger.error(f"❌ Telegram 發送失敗: {resp.text}")
            return False
    except Exception as e:
        logger.error(f"❌ Telegram 發送異常: {e}")
        return False

import os
import requests
import logging
from pathlib import Path
from dotenv import load_dotenv

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

    emoji = "🚀" if condition == 'above' else "🔻"
    msg = f"{emoji} **Sentinel Alert: {symbol}**\n\n" \
          f"Current Price: **${price}**\n" \
          f"Target: {condition} ${target_price}\n\n" \
          f"Check Sentinel: https://crypto-sentinel.onrender.com"

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": msg,
        "parse_mode": "Markdown"
    }

    try:
        resp = requests.post(url, json=payload, timeout=5)
        if resp.status_code == 200:
            return True
        else:
            logger.error(f"Failed to send TG: {resp.text}")
            return False
    except Exception as e:
        logger.error(f"Error sending TG: {e}")
        return False

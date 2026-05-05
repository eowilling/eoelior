import os
import sys
import logging
from pathlib import Path
from dotenv import load_dotenv

# Setup basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 1. Load Environment Variables
env_path = Path(__file__).parent / '.env'
print(f"Loading .env from: {env_path}")
load_dotenv(dotenv_path=env_path)

TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

print(f"Token Loaded: {'Yes' if TELEGRAM_BOT_TOKEN else 'No'}")
if TELEGRAM_BOT_TOKEN:
    print(f"Token Prefix: {TELEGRAM_BOT_TOKEN[:5]}...")

print(f"Chat ID Loaded: {'Yes' if TELEGRAM_CHAT_ID else 'No'}")
if TELEGRAM_CHAT_ID:
    print(f"Chat ID: {TELEGRAM_CHAT_ID}")

# 2. Try to Send Message via Notifier Module (Mocking web_app usage)
try:
    sys.path.append(os.path.dirname(__file__)) # Add GU4 to path
    from src.notifier import NotificationManager
    
    print("\nAttempting to initialize NotificationManager...")
    # Simulate how web_app initializes it (often with None/Empty if user didn't provide override)
    notifier = NotificationManager(token="", chat_id="")
    
    print(f"DEBUG: Notifier Channels: {notifier.channels}")
    print(f"DEBUG: Config Token Present: {bool(notifier.config.telegram_bot_token)}")
    if notifier.config.telegram_bot_token:
         print(f"DEBUG: Config Token Prefix: {notifier.config.telegram_bot_token[:5]}...")
    
    print("Sending Test Message...")
    # Using the correct signature: title, content
    result = notifier.send_analysis_report(
        title="🔔 GU4 測試通知",
        content="這是一條測試訊息\n\n如果您收到這則訊息，代表 GU4 的發送功能是正常的。\nToken check: Passed."
    )
    
    # send_analysis_report returns a dict of results per channel, e.g. {'Telegram': True, 'Email': False}
    print(f"\n發送結果: {result}")
    
    if result.get('Telegram'):
        print("\n✅ 發送成功！請檢查您的 Telegram。")
    else:
        print("\n❌ 發送失敗！請檢查上方的錯誤日誌。")

except Exception as e:
    print(f"\n❌發生錯誤: {e}")
    import traceback
    traceback.print_exc()

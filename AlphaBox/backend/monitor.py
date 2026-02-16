import os
import sys
import time
import threading
import logging
from datetime import datetime

# 調整路徑以導入 logic 資料夾中的內容
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
LOGIC_DIR = os.path.join(BASE_DIR, 'logic')
GU4_DIR = os.path.join(LOGIC_DIR, 'gu4')

if LOGIC_DIR not in sys.path: sys.path.insert(0, LOGIC_DIR)
if GU4_DIR not in sys.path: sys.path.insert(0, GU4_DIR)

# 導入本地模組
from backend.db import get_active_alerts, deactivate_alert
from backend.logic.crypto_sentinel import CryptoSentinel
from backend.logic.crypto_notifier import send_alert as send_crypto_alert

# 導入股市組件
from data_provider import DataFetcherManager, YFinanceTaiwanFetcher, TwstockFetcher

logger = logging.getLogger(__name__)

class AlphaMonitor:
    def __init__(self):
        self.crypto_engine = CryptoSentinel()
        self.stock_fetcher = DataFetcherManager()
        self.stock_fetcher.add_fetcher(TwstockFetcher())
        self.stock_fetcher.add_fetcher(YFinanceTaiwanFetcher())
        self.running = False
        self.thread = None

    def start(self):
        if self.running: return
        self.running = True
        self.thread = threading.Thread(target=self._loop, daemon=True)
        self.thread.start()
        print("AlphaBox Monitoring Service Started.")

    def _loop(self):
        while self.running:
            try:
                alerts = get_active_alerts()
                if not alerts:
                    time.sleep(30)
                    continue

                for alert in alerts:
                    if alert['asset_type'] == 'crypto':
                        self._check_crypto(alert)
                    elif alert['asset_type'] == 'stock':
                        self._check_stock(alert)
                
                time.sleep(60) 
            except Exception as e:
                print(f"Monitor Loop Error: {e}")
                time.sleep(60)

    def _check_crypto(self, alert):
        try:
            symbol = alert['symbol']
            df = self.crypto_engine.fetch_data(symbol, limit=1)
            if df is not None and not df.empty:
                price = df.iloc[-1]['close']
                triggered = False
                if alert['condition'] == 'above' and price >= alert['target_price']: triggered = True
                elif alert['condition'] == 'below' and price <= alert['target_price']: triggered = True

                if triggered:
                    print(f"Crypto Alert triggered: {symbol} at {price}")
                    send_crypto_alert(symbol, price, alert['condition'], alert['target_price'])
                    deactivate_alert(alert['id'])
        except Exception as e:
            print(f"Error checking crypto {alert['symbol']}: {e}")

    def _check_stock(self, alert):
        try:
            symbol = alert['symbol']
            data = self.stock_fetcher.get_realtime_quote(symbol)
            if data and 'price' in data:
                price = data['price']
                triggered = False
                if alert['condition'] == 'above' and price >= alert['target_price']: triggered = True
                elif alert['condition'] == 'below' and price <= alert['target_price']: triggered = True

                if triggered:
                    print(f"Stock Alert triggered: {symbol} at {price}")
                    # 使用加密幣通知器發送 (共通格式)
                    send_crypto_alert(f"台股: {symbol}", price, alert['condition'], alert['target_price'])
                    deactivate_alert(alert['id'])
        except Exception as e:
            print(f"Error checking stock {alert['symbol']}: {e}")

# 全局實例
monitor = AlphaMonitor()

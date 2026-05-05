import time
import threading
import logging
from sentinel import CryptoSentinel
from database import get_alerts, delete_alert
from notifier import send_alert

logger = logging.getLogger(__name__)

class AlertMonitor:
    def __init__(self):
        self.sentinel = CryptoSentinel()
        self.running = False
        self.thread = None

    def start(self):
        if self.running:
            return
        self.running = True
        self.thread = threading.Thread(target=self._loop, daemon=True)
        self.thread.start()
        logger.info("Alert Monitor started.")

    def _loop(self):
        while self.running:
            try:
                alerts = get_alerts()
                if not alerts:
                    time.sleep(60) # Sleep longer if no alerts
                    continue

                unique_symbols = set(a['symbol'] for a in alerts)
                prices = {}

                # Fetch prices (simple version loop, could be optimized via fetch_tickers for multiple)
                for sym in unique_symbols:
                    try:
                        # We use a smaller timeframe or ticker for speed
                        df = self.sentinel.fetch_data(sym, limit=1)
                        if df is not None and not df.empty:
                            prices[sym] = df.iloc[-1]['close']
                    except Exception as e:
                        logger.error(f"Monitor error fetching {sym}: {e}")

                # Check conditions
                for alert in alerts:
                    sym = alert['symbol']
                    if sym not in prices:
                        continue
                    
                    price = prices[sym]
                    target = alert['target_price']
                    condition = alert['condition']
                    triggered = False

                    if condition == 'above' and price >= target:
                        triggered = True
                    elif condition == 'below' and price <= target:
                        triggered = True
                    
                    if triggered:
                        logger.info(f"Alert triggered! {sym} {price}")
                        send_alert(sym, price, condition, target)
                        delete_alert(alert['id']) # Remove one-time alert

                time.sleep(60) # Check every minute
            except Exception as e:
                logger.error(f"Monitor loop error: {e}")
                time.sleep(60)

monitor = AlertMonitor()

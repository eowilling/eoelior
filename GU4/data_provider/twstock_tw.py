
# -*- coding: utf-8 -*-
"""
Twstock 數據源實現
"""
import logging
from typing import Optional, Dict, Any
import pandas as pd
from datetime import datetime

try:
    import twstock
except ImportError:
    twstock = None

from data_provider.base import BaseFetcher

logger = logging.getLogger(__name__)

class TwstockFetcher(BaseFetcher):
    """
    Twstock 數據源 (台灣證交所/櫃買中心 直接抓取)
    
    優先級: 3 (備用)
    """
    name = "Twstock"
    priority = 1
    
    def __init__(self):
        if twstock is None:
            # raise ImportError("請安裝 twstock")
            # 改為不強制報錯，因為我們已經改用 direct requests 抓取
            pass
    
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """獲取即時報價 (直接請求 MIS API，避開 SSL 驗證問題)"""
        try:
            import requests
            import time
            import random
            
            # 判斷上市(tse)或上櫃(otc)
            # 簡單判斷: 6開頭通常是上櫃(不完全準確，但在沒有完整對照表下使用)
            # 更好的方式是都試試看
            
            # 建立 timestamp
            ts = int(time.time() * 1000)
            
            # 嘗試上市 (tse) 和 上櫃 (otc)
            markets = ['tse', 'otc']
            
            for market in markets:
                # 目標 URL (台灣證交所行情資訊網)
                # ex_ch=tse_2330.tw
                target = f"{market}_{stock_code}.tw"
                url = f"https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch={target}&json=1&delay=0&_={ts}"
                
                try:
                    # 關鍵：verify=False 避開 Render 上的 SSL Certificate Error
                    response = requests.get(url, verify=False, timeout=5)
                    
                    if response.status_code == 200:
                        data = response.json()
                        msg_array = data.get('msgArray', [])
                        
                        if msg_array and len(msg_array) > 0:
                            info = msg_array[0]
                            
                            # 檢查是否有有效價格
                            price_str = info.get('z', '-') # 最近成交價
                            if price_str == '-':
                                price_str = info.get('o', '-') # 開盤價
                                
                            if price_str == '-':
                                continue # 換下一個市場試試
                                
                            try:
                                price = float(price_str)
                            except ValueError:
                                continue
                                
                            # 成功獲取！解析數據
                            # y: 昨收, o: 開, h: 高, l: 低, v: 量
                            prev_close = float(info.get('y', 0))
                            open_p = float(info.get('o', price))
                            high = float(info.get('h', price))
                            low = float(info.get('l', price))
                            volume = int(info.get('v', 0))
                            
                            change = price - prev_close
                            change_pct = (change / prev_close * 100) if prev_close else 0
                            
                            name = info.get('n', stock_code)
                            
                            logger.info(f"Twstock (Direct) 成功獲取: {name} {price}")
                            
                            return {
                                'code': stock_code,
                                'name': name,
                                'price': price,
                                'change': round(change, 2),
                                'change_pct': round(change_pct, 2), 
                                'open': open_p,
                                'high': high,
                                'low': low,
                                'volume': volume,
                                'prev_close': prev_close
                            }
                except Exception as e:
                    # 忽略單次連線錯誤，繼續嘗試
                    continue
            
            return None
            
        except Exception as e:
            logger.error(f"Twstock 獲取即時報價失敗: {e}")
            return None

    def get_daily_data(self, stock_code: str, days: int = 30) -> Optional[pd.DataFrame]:
        # Twstock 抓歷史數據較慢且易被擋，主要作為 Realtime 的備援
        # 暫不實作歷史數據抓取，依靠 FinMind/YFinance
        return None

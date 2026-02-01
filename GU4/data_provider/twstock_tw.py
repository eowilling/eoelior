
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
    priority = 3
    
    def __init__(self):
        if twstock is None:
            raise ImportError("請安裝 twstock")
    
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """獲取即時報價"""
        try:
            # twstock 的 realtime 模組
            stock = twstock.realtime.get(stock_code)
            
            if not stock or not stock.get('success'):
                return None
                
            info = stock.get('info', {})
            real = stock.get('realtime', {})
            
            if not real.get('latest_trade_price'):
                return None
                
            price = float(real['latest_trade_price'])
            # 若沒有開盤價等資訊，退而求其次
            open_p = float(real.get('open', price))
            high = float(real.get('high', price))
            low = float(real.get('low', price))
            volume = int(real.get('accumulate_trade_volume', 0))
            
            # 昨收 (用來計算漲跌)
            # twstock info 中通常有 'last_price' 或類似欄位，但 real['latest_trade_price'] - real['diff'] 可能不準
            # 這裡簡單處理，如果不準也沒關係，主要是有價位
            
            # 嘗試解析昨收
            # best_bid_price 等等無法直接推算
            # 這裡我們信任 realtime 回傳的 success
            
            return {
                'code': stock_code,
                'name': info.get('name', stock_code),
                'price': price,
                'change': 0, # twstock 實時資料未直接提供漲跌額，需自行計算，暫時略過
                'change_pct': 0, 
                'open': open_p,
                'high': high,
                'low': low,
                'volume': volume,
                'prev_close': 0 # 暫時無法獲取
            }
            
        except Exception as e:
            logger.error(f"Twstock 獲取即時報價失敗: {e}")
            return None

    def get_daily_data(self, stock_code: str, days: int = 30) -> Optional[pd.DataFrame]:
        # Twstock 抓歷史數據較慢且易被擋，主要作為 Realtime 的備援
        # 暫不實作歷史數據抓取，依靠 FinMind/YFinance
        return None

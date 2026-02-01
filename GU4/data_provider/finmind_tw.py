# -*- coding: utf-8 -*-
"""
FinMind 數據源實現
台灣本土財經數據 API
"""
import logging
from typing import Optional, Dict, Any
from datetime import datetime, timedelta
import pandas as pd
import requests

from data_provider.base import BaseFetcher

logger = logging.getLogger(__name__)


class FinMindTaiwanFetcher(BaseFetcher):
    """
    FinMind 台灣股票數據源
    
    優勢:
    - 台灣本土數據
    - 提供籌碼面數據
    - 有財報資訊
    
    劣勢:
    - 免費版有 API 次數限制
    - 即時報價延遲
    """
    
    name = "FinMind"
    priority = 2  # 次於 YFinance
    
    def __init__(self, token: str = ""):
        self.token = token
        self.base_url = "https://api.finmindtrade.com/api/v4/data"
        
        if not token:
            logger.warning("⚠️ FinMind Token 未設定，將使用受限功能")
    
    def get_daily_data(
        self, 
        stock_code: str, 
        days: int = 30
    ) -> Optional[pd.DataFrame]:
        """獲取日線數據"""
        try:
            # 計算日期範圍
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days+30)  # 多抓一些避免假日
            
            # FinMind API 參數
            params = {
                'dataset': 'TaiwanStockPrice',
                'data_id': stock_code,
                'start_date': start_date.strftime('%Y-%m-%d'),
                'end_date': end_date.strftime('%Y-%m-%d'),
            }
            
            if self.token:
                params['token'] = self.token
            
            # 請求數據
            response = requests.get(self.base_url, params=params, timeout=15)
            
            if response.status_code != 200:
                logger.error(f"FinMind API 錯誤: {response.status_code}")
                return None
            
            data = response.json()
            
            if data.get('status') != 200:
                logger.error(f"FinMind 返回錯誤: {data.get('msg')}")
                return None
            
            records = data.get('data', [])
            
            if not records:
                logger.warning(f"[{stock_code}] FinMind 無數據")
                return None
            
            # 轉換為 DataFrame
            df = pd.DataFrame(records)
            
            # 標準化欄位名稱
            df = df.rename(columns={
                'date': 'date',
                'open': 'open',
                'max': 'high',
                'min': 'low',
                'close': 'close',
                'Trading_Volume': 'volume',
                'Trading_money': 'amount'
            })
            
            # 轉換日期
            df['date'] = pd.to_datetime(df['date'])
            df = df.sort_values('date')
            
            # 計算漲跌幅
            df['pct_chg'] = df['close'].pct_change() * 100
            
            # 計算技術指標
            df = self.calculate_technical_indicators(df)
            
            # 只返回需要的天數
            df = df.tail(days)
            
            logger.info(f"[{stock_code}] FinMind 獲取 {len(df)} 天數據")
            return df
            
        except Exception as e:
            logger.error(f"FinMind 獲取數據失敗: {e}")
            return None
    
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """
        獲取即時報價
        
        Note: FinMind 免費版即時報價延遲較大，建議用於補充
        """
        try:
            params = {
                'dataset': 'TaiwanStockPrice',
                'data_id': stock_code,
                'start_date': datetime.now().strftime('%Y-%m-%d'),
                'end_date': datetime.now().strftime('%Y-%m-%d'),
            }
            
            if self.token:
                params['token'] = self.token
            
            response = requests.get(self.base_url, params=params, timeout=10)
            
            if response.status_code != 200:
                return None
            
            data = response.json()
            records = data.get('data', [])
            
            if not records:
                return None
            
            latest = records[-1]
            
            # 標準化報價格式
            quote = {
                'code': stock_code,
                'name': latest.get('stock_id', stock_code),
                'price': float(latest.get('close', 0)),
                'open': float(latest.get('open', 0)),
                'high': float(latest.get('max', 0)),
                'low': float(latest.get('min', 0)),
                'volume': int(latest.get('Trading_Volume', 0)),
                'change': 0,
                'change_pct': 0,
                'prev_close': 0
            }
            
            return quote
            
        except Exception as e:
            logger.error(f"FinMind 即時報價失敗: {e}")
            return None


def test_finmind():
    """測試 FinMind 數據源"""
    import os
    from dotenv import load_dotenv
    
    load_dotenv()
    
    print("=" * 60)
    print("🧪 測試 FinMind 數據源")
    print("=" * 60)
    
    token = os.getenv('FINMIND_TOKEN', '')
    
    if not token:
        print("⚠️ FINMIND_TOKEN 未設定，將使用受限功能")
    
    fetcher = FinMindTaiwanFetcher(token=token)
    
    # 測試台積電
    print("\n測試: 台積電 (2330)")
    print("-" * 60)
    
    df = fetcher.get_daily_data('2330', days=5)
    
    if df is not None and not df.empty:
        print(f"✅ 成功獲取 {len(df)} 天數據\n")
        print(df[['date', 'close', 'volume', 'pct_chg']].tail())
        
        quote = fetcher.get_realtime_quote('2330')
        if quote:
            print(f"\n即時報價: {quote['price']} 元")
        
        return True
    else:
        print("❌ 數據獲取失敗")
        return False


if __name__ == '__main__':
    test_finmind()

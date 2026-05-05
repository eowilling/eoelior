# -*- coding: utf-8 -*-
"""
Yahoo Finance 台股數據源
"""
import logging
from typing import Optional, Dict, Any
from datetime import datetime, timedelta
import pandas as pd
import yfinance as yf

from .base import BaseFetcher

logger = logging.getLogger(__name__)


class YFinanceTaiwanFetcher(BaseFetcher):
    """
    Yahoo Finance 台股數據源
    
    優先級: 1
    數據來源: Yahoo Finance
    特點: 免費、穩定、數據全面
    
    台股代碼格式:
    - 輸入: 2330, 0050
    - Yahoo: 2330.TW, 0050.TW
    """
    
    name = "YFinanceTaiwanFetcher"
    priority = 1
    
    def __init__(self):
        logger.info("初始化 YFinance 台股數據源")
    
    def _convert_code(self, stock_code: str) -> str:
        """
        轉換股票代碼為 Yahoo Finance 格式
        
        Args:
            stock_code: 台股代碼 (2330, 0050)
            
        Returns:
            Yahoo Finance 代碼 (2330.TW, 0050.TW)
        """
        # 移除可能的後綴
        code = stock_code.replace('.TW', '').replace('.TWO', '').strip()
        
        # 台股代碼通常是 4 位數字
        if len(code) == 4 and code.isdigit():
            return f"{code}.TW"
        
        # 已經是正確格式
        if '.TW' in stock_code or '.TWO' in stock_code:
            return stock_code
        
        return f"{code}.TW"
    
    def get_daily_data(
        self, 
        stock_code: str, 
        days: int = 30
    ) -> Optional[pd.DataFrame]:
        """
        獲取日線數據
        
        Args:
            stock_code: 台股代碼
            days: 獲取天數
            
        Returns:
            標準格式的 DataFrame
        """
        try:
            yf_code = self._convert_code(stock_code)
            logger.info(f"獲取 {stock_code} ({yf_code}) 日線數據，天數: {days}")
            
            # 計算起始日期 (多取一些數據以便計算技術指標)
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days + 100)
            
            # 獲取數據
            ticker = yf.Ticker(yf_code)
            df = ticker.history(start=start_date, end=end_date)
            
            if df.empty:
                logger.warning(f"{yf_code} 無數據")
                return None
            
            # 標準化列名
            df = df.reset_index()
            df.columns = df.columns.str.lower()
            
            # 重命名列
            column_mapping = {
                'date': 'date',
                'open': 'open',
                'high': 'high',
                'low': 'low',
                'close': 'close',
                'volume': 'volume'
            }
            
            df = df.rename(columns=column_mapping)
            
            # 確保日期格式
            if 'date' not in df.columns:
                df['date'] = df.index
            df['date'] = pd.to_datetime(df['date']).dt.date
            
            # 計算漲跌幅
            df['pct_chg'] = df['close'].pct_change() * 100
            
            # 計算技術指標
            df = self.calculate_ma(df, [5, 10, 20, 60])
            df = self.calculate_volume_ratio(df)
            
            # 只返回最近 days 天
            df = df.tail(days)
            
            # 選擇標準列
            standard_cols = ['date', 'open', 'high', 'low', 'close', 'volume', 'pct_chg', 
                           'ma5', 'ma10', 'ma20', 'ma60', 'volume_ratio']
            available_cols = [col for col in standard_cols if col in df.columns]
            df = df[available_cols]
            
            logger.info(f"成功獲取 {len(df)} 條數據")
            return df
            
        except Exception as e:
            logger.error(f"獲取 {stock_code} 數據失敗: {e}")
            return None
    
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """
        獲取即時報價
        
        Args:
            stock_code: 台股代碼
            
        Returns:
            即時報價字典
        """
        try:
            yf_code = self._convert_code(stock_code)
            logger.info(f"獲取 {stock_code} ({yf_code}) 即時報價")
            
            ticker = yf.Ticker(yf_code)
            info = ticker.info
            
            # 獲取最新數據
            hist = ticker.history(period='1d')
            if hist.empty:
                logger.warning(f"{yf_code} 無即時數據")
                return None
            
            latest = hist.iloc[-1]
            
            # 提取數據
            current_price = latest['Close']
            open_price = latest['Open']
            high_price = latest['High']
            low_price = latest['Low']
            volume = latest['Volume']
            
            # 計算漲跌
            prev_close = info.get('previousClose', current_price)
            change = current_price - prev_close
            change_pct = (change / prev_close * 100) if prev_close else 0
            
            quote = {
                'code': stock_code,
                'name': info.get('longName', stock_code),
                'price': round(current_price, 2),
                'change': round(change, 2),
                'change_pct': round(change_pct, 2),
                'open': round(open_price, 2),
                'high': round(high_price, 2),
                'low': round(low_price, 2),
                'volume': int(volume),
                'prev_close': round(prev_close, 2)
            }
            
            logger.info(f"{stock_code} 當前價格: {quote['price']} ({quote['change_pct']:+.2f}%)")
            return quote
            
        except Exception as e:
            logger.error(f"獲取 {stock_code} 即時報價失敗: {e}")
            return None
    
    def get_stock_info(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """
        獲取股票基本資訊
        
        Args:
            stock_code: 台股代碼
            
        Returns:
            股票資訊字典
        """
        try:
            yf_code = self._convert_code(stock_code)
            ticker = yf.Ticker(yf_code)
            info = ticker.info
            
            return {
                'code': stock_code,
                'name': info.get('longName', ''),
                'industry': info.get('industry', ''),
                'sector': info.get('sector', ''),
                'market_cap': info.get('marketCap', 0),
                'pe_ratio': info.get('trailingPE', 0),
                'pb_ratio': info.get('priceToBook', 0),
                'dividend_yield': info.get('dividendYield', 0) * 100 if info.get('dividendYield') else 0
            }
            
        except Exception as e:
            logger.error(f"獲取 {stock_code} 基本資訊失敗: {e}")
            return None

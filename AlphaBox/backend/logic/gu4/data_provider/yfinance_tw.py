# -*- coding: utf-8 -*-
"""
Yahoo Finance 台股數據源
"""
import logging
from typing import Optional, Dict, Any
from datetime import datetime, timedelta
import pandas as pd

try:
    import yfinance as yf
except ImportError:
    yf = None

from .base import BaseFetcher

logger = logging.getLogger(__name__)


class YFinanceTaiwanFetcher(BaseFetcher):
    """
    Yahoo Finance 台股數據源
    
    優先級: 1
    數據來源: Yahoo Finance
    特點: 免費、穩定、數據全面
    
    台股代碼格式轉換:
    - 輸入: 2330, 0050
    - Yahoo: 2330.TW, 0050.TW (上市) 或 .TWO (上櫃)
    """
    
    name = "YFinanceTaiwan"
    priority = 2
    
    def __init__(self):
        if yf is None:
            raise ImportError("請安裝 yfinance: pip install yfinance")
        
        logger.info(f"[{self.name}] 初始化完成")
    
    def _convert_to_yfinance_code(self, stock_code: str) -> str:
        """
        轉換為 Yahoo Finance 代碼格式
        
        Args:
            stock_code: 台股代碼 (2330, 0050)
            
        Returns:
            Yahoo Finance 代碼 (2330.TW, 0050.TW)
        """
        # 移除可能的後綴
        code = stock_code.replace('.TW', '').replace('.TWO', '').strip()
        
        # 預設使用 .TW (上市)
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
            yf_code = self._convert_to_yfinance_code(stock_code)
            logger.info(f"[{self.name}] 獲取 {stock_code} ({yf_code}) 日線數據，天數: {days}")
            
            # 計算日期範圍 (多取一些數據以便計算指標)
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days + 100)
            
            # 下載數據
            df = yf.download(yf_code, start=start_date, end=end_date, progress=False)
            
            if df.empty:
                logger.warning(f"[{self.name}] {yf_code} 無數據")
                return None
            
            # 標準化數據
            df = self._normalize_data(df, stock_code)
            
            # 計算技術指標
            df = self.calculate_technical_indicators(df)
            
            # 只返回請求的天數
            df = df.tail(days)
            
            logger.info(f"[{self.name}] 成功獲取 {len(df)} 條數據")
            return df
            
        except Exception as e:
            logger.error(f"[{self.name}] 獲取 {stock_code} 失敗: {e}")
            return None
    
    def _normalize_data(self, df: pd.DataFrame, stock_code: str) -> pd.DataFrame:
        """標準化數據格式"""
        # 重置索引
        df = df.reset_index()
        
        # 統一列名為小寫
        df.columns = df.columns.str.lower()
        
        # 確保有 date 列
        if 'date' not in df.columns and 'datetime' in df.columns:
            df.rename(columns={'datetime': 'date'}, inplace=True)
        
        # 轉換日期格式
        if 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date']).dt.date
        
        # 計算漲跌幅
        if 'pct_chg' not in df.columns:
            df['pct_chg'] = df['close'].pct_change() * 100
        
        # 選擇標準欄位
        standard_cols = ['date', 'open', 'high', 'low', 'close', 'volume', 'pct_chg']
        available_cols = [col for col in standard_cols if col in df.columns]
        
        return df[available_cols]
    
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """
        獲取即時報價
        
        Args:
            stock_code: 台股代碼
            
        Returns:
            報價字典
        """
        try:
            yf_code = self._convert_to_yfinance_code(stock_code)
            logger.info(f"[{self.name}] 獲取 {stock_code} ({yf_code}) 即時報價")
            
            ticker = yf.Ticker(yf_code)
            
            # 獲取基本資訊
            info = ticker.info
            
            # 獲取最新交易數據
            hist = ticker.history(period='1d')
            
            if hist.empty:
                logger.warning(f"[{self.name}] {yf_code} 無即時數據")
                return None
            
            latest = hist.iloc[-1]
            
            # 計算漲跌
            current_price = latest['Close']
            prev_close = info.get('previousClose', info.get('regularMarketPreviousClose', current_price))
            
            change = current_price - prev_close
            change_pct = (change / prev_close * 100) if prev_close else 0
            
            quote = {
                'code': stock_code,
                'name': info.get('longName', info.get('shortName', stock_code)),
                'price': round(current_price, 2),
                'change': round(change, 2),
                'change_pct': round(change_pct, 2),
                'open': round(latest['Open'], 2),
                'high': round(latest['High'], 2),
                'low': round(latest['Low'], 2),
                'volume': int(latest['Volume']),
                'prev_close': round(prev_close, 2)
            }
            
            logger.info(f"[{self.name}] {stock_code} 價格: {quote['price']} ({quote['change_pct']:+.2f}%)")
            return quote
            
        except Exception as e:
            logger.error(f"[{self.name}] 獲取 {stock_code} 即時報價失敗: {e}")
            return None
    
    def get_stock_info(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """
        獲取股票基本資訊
        
        Args:
            stock_code: 台股代碼
            
        Returns:
            基本資訊字典
        """
        try:
            yf_code = self._convert_to_yfinance_code(stock_code)
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
                'dividend_yield': info.get('dividendYield', 0) * 100 if info.get('dividendYield') else 0,
                'description': info.get('longBusinessSummary', '')
            }
            
        except Exception as e:
            logger.error(f"[{self.name}] 獲取 {stock_code} 基本資訊失敗: {e}")
            return None

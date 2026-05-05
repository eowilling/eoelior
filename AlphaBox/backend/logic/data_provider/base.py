# -*- coding: utf-8 -*-
"""
數據源基礎抽象類
"""
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any, List
from datetime import datetime, timedelta
import pandas as pd


class BaseFetcher(ABC):
    """
    數據源抽象基類
    
    所有數據源實現必須繼承此類並實現抽象方法
    """
    
    name: str = "BaseFetcher"
    priority: int = 99  # 優先級，數字越小越優先
    
    @abstractmethod
    def get_daily_data(
        self, 
        stock_code: str, 
        days: int = 30
    ) -> Optional[pd.DataFrame]:
        """
        獲取日線數據
        
        Args:
            stock_code: 股票代碼 (台股: 2330, 0050)
            days: 獲取天數
            
        Returns:
            標準格式的 DataFrame，包含以下欄位:
            - date: 日期
            - open: 開盤價
            - high: 最高價
            - low: 最低價
            - close: 收盤價
            - volume: 成交量
            - amount: 成交金額 (選填)
            - pct_chg: 漲跌幅 (%)
        """
        pass
    
    @abstractmethod
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """
        獲取即時報價
        
        Args:
            stock_code: 股票代碼
            
        Returns:
            報價字典，包含:
            - code: 股票代碼
            - name: 股票名稱
            - price: 當前價格
            - change: 漲跌
            - change_pct: 漲跌幅 (%)
            - volume: 成交量
            - open: 開盤價
            - high: 最高價
            - low: 最低價
            - prev_close: 昨收價
        """
        pass
    
    def calculate_technical_indicators(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        計算技術指標
        
        Args:
            df: 原始數據 DataFrame
            
        Returns:
            添加了技術指標的 DataFrame
        """
        if df is None or df.empty:
            return df
        
        # 移動平均線
        df = self._calculate_ma(df, [5, 10, 20, 60])
        
        # 量比
        df = self._calculate_volume_ratio(df)
        
        # RSI
        df = self._calculate_rsi(df, period=14)
        
        # MACD
        df = self._calculate_macd(df)
        
        # 布林帶
        df = self._calculate_bollinger(df)
        
        return df
    
    def _calculate_ma(self, df: pd.DataFrame, periods: List[int]) -> pd.DataFrame:
        """計算移動平均線"""
        for period in periods:
            df[f'ma{period}'] = df['close'].rolling(window=period).mean()
        return df
    
    def _calculate_volume_ratio(self, df: pd.DataFrame, period: int = 5) -> pd.DataFrame:
        """計算量比"""
        avg_volume = df['volume'].rolling(window=period).mean()
        df['volume_ratio'] = df['volume'] / avg_volume
        return df
    
    def _calculate_rsi(self, df: pd.DataFrame, period: int = 14) -> pd.DataFrame:
        """計算 RSI 相對強弱指標"""
        delta = df['close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        
        rs = gain / loss
        df['rsi'] = 100 - (100 / (1 + rs))
        return df
    
    def _calculate_macd(
        self, 
        df: pd.DataFrame, 
        fast: int = 12, 
        slow: int = 26, 
        signal: int = 9
    ) -> pd.DataFrame:
        """計算 MACD 指標"""
        exp1 = df['close'].ewm(span=fast, adjust=False).mean()
        exp2 = df['close'].ewm(span=slow, adjust=False).mean()
        
        df['macd'] = exp1 - exp2
        df['macd_signal'] = df['macd'].ewm(span=signal, adjust=False).mean()
        df['macd_hist'] = df['macd'] - df['macd_signal']
        
        return df
    
    def _calculate_bollinger(self, df: pd.DataFrame, period: int = 20, std: int = 2) -> pd.DataFrame:
        """計算布林帶"""
        df['bb_mid'] = df['close'].rolling(window=period).mean()
        bb_std = df['close'].rolling(window=period).std()
        
        df['bb_upper'] = df['bb_mid'] + (bb_std * std)
        df['bb_lower'] = df['bb_mid'] - (bb_std * std)
        
        return df


class DataFetcherManager:
    """
    數據源管理器
    
    管理多個數據源，實現自動故障切換
    """
    
    def __init__(self, fetchers: Optional[List[BaseFetcher]] = None):
        self._fetchers = fetchers or []
        self._fetchers.sort(key=lambda x: x.priority)
    
    def add_fetcher(self, fetcher: BaseFetcher) -> None:
        """添加數據源並按優先級排序"""
        self._fetchers.append(fetcher)
        self._fetchers.sort(key=lambda x: x.priority)
    
    def get_daily_data(
        self, 
        stock_code: str, 
        days: int = 30
    ) -> tuple[Optional[pd.DataFrame], str]:
        """
        獲取日線數據 (自動切換數據源)
        
        Returns:
            (DataFrame, 數據源名稱)
        """
        errors = []
        
        for fetcher in self._fetchers:
            try:
                df = fetcher.get_daily_data(stock_code, days)
                if df is not None and not df.empty:
                    return df, fetcher.name
            except Exception as e:
                errors.append(f"{fetcher.name}: {str(e)}")
                continue
        
        # 所有數據源都失敗
        error_msg = "; ".join(errors)
        raise Exception(f"所有數據源獲取失敗: {error_msg}")
    
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """獲取即時報價 (自動切換數據源)"""
        for fetcher in self._fetchers:
            try:
                quote = fetcher.get_realtime_quote(stock_code)
                if quote:
                    return quote
            except Exception:
                continue
        
        return None
    
    @property
    def available_fetchers(self) -> List[str]:
        """返回可用數據源名稱列表"""
        return [f.name for f in self._fetchers]

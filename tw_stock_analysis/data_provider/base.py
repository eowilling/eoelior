# -*- coding: utf-8 -*-
"""
數據源基礎類
"""
from abc import ABC, abstractmethod
from typing import Optional, List, Dict, Any
import pandas as pd
from datetime import datetime, timedelta


class BaseFetcher(ABC):
    """
    數據源抽象基類
    
    所有數據源必須實現以下方法：
    - get_daily_data(): 獲取日線數據
    - get_realtime_quote(): 獲取即時報價
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
            stock_code: 股票代碼 (台股格式: 2330, 0050)
            days: 獲取天數
            
        Returns:
            包含標準列的 DataFrame:
            - date: 日期
            - open: 開盤價
            - high: 最高價
            - low: 最低價
            - close: 收盤價
            - volume: 成交量
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
            包含以下欄位的字典:
            - code: 股票代碼
            - name: 股票名稱
            - price: 當前價格
            - change: 漲跌
            - change_pct: 漲跌幅 (%)
            - volume: 成交量
            - high: 最高價
            - low: 最低價
            - open: 開盤價
        """
        pass
    
    def calculate_ma(self, df: pd.DataFrame, periods: List[int] = [5, 10, 20, 60]) -> pd.DataFrame:
        """
        計算移動平均線
        
        Args:
            df: 包含 close 列的 DataFrame
            periods: MA 週期列表
            
        Returns:
            添加了 MA 列的 DataFrame
        """
        for period in periods:
            df[f'ma{period}'] = df['close'].rolling(window=period).mean()
        return df
    
    def calculate_volume_ratio(self, df: pd.DataFrame, period: int = 5) -> pd.DataFrame:
        """
        計算量比
        
        Args:
            df: 包含 volume 列的 DataFrame
            period: 計算週期
            
        Returns:
            添加了 volume_ratio 列的 DataFrame
        """
        avg_volume = df['volume'].rolling(window=period).mean()
        df['volume_ratio'] = df['volume'] / avg_volume
        return df


class DataFetcherManager:
    """
    數據源管理器
    
    管理多個數據源，實現自動故障切換
    """
    
    def __init__(self, fetchers: Optional[List[BaseFetcher]] = None):
        self._fetchers = fetchers or []
        # 按優先級排序
        self._fetchers.sort(key=lambda x: x.priority)
    
    def add_fetcher(self, fetcher: BaseFetcher) -> None:
        """添加數據源"""
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
        error_msg = "\n".join(errors)
        raise Exception(f"所有數據源獲取失敗:\n{error_msg}")
    
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """
        獲取即時報價 (自動切換數據源)
        """
        for fetcher in self._fetchers:
            try:
                quote = fetcher.get_realtime_quote(stock_code)
                if quote:
                    return quote
            except Exception as e:
                continue
        
        return None
    
    @property
    def available_fetchers(self) -> List[str]:
        """返回可用數據源名稱列表"""
        return [f.name for f in self._fetchers]

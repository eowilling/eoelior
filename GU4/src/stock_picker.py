# -*- coding: utf-8 -*-
"""
智能選股模組
自動抓取市場熱門股票、法人買超、漲幅排行等
"""
import logging
import requests
import pandas as pd
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)


class StockPicker:
    """智能選股器"""
    
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def get_recommended_stocks(
        self, 
        method: str = 'institutional',
        top_n: int = 5
    ) -> List[str]:
        """
        獲取推薦股票清單
        
        Args:
            method: 選股方法
                - 'institutional': 三大法人買超 (預設)
                - 'gainers': 漲幅排行
                - 'volume': 成交量排行
                - 'mixed': 綜合評分
            top_n: 返回幾支股票
            
        Returns:
            股票代碼清單
        """
        logger.info(f"使用 {method} 方法選股，目標 {top_n} 支")
        
        try:
            if method == 'institutional':
                return self._get_institutional_favorites(top_n)
            elif method == 'gainers':
                return self._get_top_gainers(top_n)
            elif method == 'volume':
                return self._get_top_volume(top_n)
            elif method == 'mixed':
                return self._get_mixed_ranking(top_n)
            else:
                logger.warning(f"不支援的選股方法: {method}，使用預設方法")
                return self._get_institutional_favorites(top_n)
                
        except Exception as e:
            logger.error(f"選股失敗: {e}")
            # 返回預設股票清單
            return ['2330', '2454', '0050'][:top_n]
    
    def _get_institutional_favorites(self, top_n: int) -> List[str]:
        """抓取三大法人買超排行"""
        try:
            # 使用 Yahoo 股市的法人買賣超資料
            url = "https://tw.stock.yahoo.com/rank/institutional-investors"
            
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                logger.warning("無法取得法人買超資料")
                return self._get_fallback_stocks(top_n)
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # 尋找股票代碼
            stock_codes = []
            # 尋找包含股票代碼的連結或文字
            links = soup.find_all('a', href=True)
            
            for link in links:
                href = link.get('href', '')
                # Yahoo 股市的股票連結格式: /quote/2330.TW
                if '/quote/' in href and '.TW' in href:
                    code = href.split('/quote/')[1].split('.TW')[0]
                    if code.isdigit() and len(code) == 4:
                        if code not in stock_codes:
                            stock_codes.append(code)
                            if len(stock_codes) >= top_n:
                                break
            
            if len(stock_codes) >= top_n:
                logger.info(f"成功取得 {len(stock_codes)} 支法人買超股票")
                return stock_codes[:top_n]
            
            return self._get_fallback_stocks(top_n)
            
        except Exception as e:
            logger.error(f"抓取法人買超失敗: {e}")
            return self._get_fallback_stocks(top_n)
    
    def _get_top_gainers(self, top_n: int) -> List[str]:
        """抓取漲幅排行"""
        try:
            # 使用 Yahoo 股市漲幅排行
            url = "https://tw.stock.yahoo.com/rank/rise"
            
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                return self._get_fallback_stocks(top_n)
            
            soup = BeautifulSoup(response.text, 'html.parser')
            stock_codes = []
            
            links = soup.find_all('a', href=True)
            for link in links:
                href = link.get('href', '')
                if '/quote/' in href and '.TW' in href:
                    code = href.split('/quote/')[1].split('.TW')[0]
                    if code.isdigit() and len(code) == 4:
                        if code not in stock_codes:
                            stock_codes.append(code)
                            if len(stock_codes) >= top_n:
                                break
            
            if len(stock_codes) >= top_n:
                logger.info(f"成功取得 {len(stock_codes)} 支漲幅排行股票")
                return stock_codes[:top_n]
            
            return self._get_fallback_stocks(top_n)
            
        except Exception as e:
            logger.error(f"抓取漲幅排行失敗: {e}")
            return self._get_fallback_stocks(top_n)
    
    def _get_top_volume(self, top_n: int) -> List[str]:
        """抓取成交量排行"""
        try:
            url = "https://tw.stock.yahoo.com/rank/volume"
            
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                return self._get_fallback_stocks(top_n)
            
            soup = BeautifulSoup(response.text, 'html.parser')
            stock_codes = []
            
            links = soup.find_all('a', href=True)
            for link in links:
                href = link.get('href', '')
                if '/quote/' in href and '.TW' in href:
                    code = href.split('/quote/')[1].split('.TW')[0]
                    if code.isdigit() and len(code) == 4:
                        if code not in stock_codes:
                            stock_codes.append(code)
                            if len(stock_codes) >= top_n:
                                break
            
            if len(stock_codes) >= top_n:
                logger.info(f"成功取得 {len(stock_codes)} 支成交量排行股票")
                return stock_codes[:top_n]
            
            return self._get_fallback_stocks(top_n)
            
        except Exception as e:
            logger.error(f"抓取成交量排行失敗: {e}")
            return self._get_fallback_stocks(top_n)
    
    def _get_mixed_ranking(self, top_n: int) -> List[str]:
        """綜合評分選股"""
        try:
            # 綜合法人買超、漲幅、成交量
            institutional = self._get_institutional_favorites(10)
            gainers = self._get_top_gainers(10)
            volume = self._get_top_volume(10)
            
            # 計算出現次數（權重）
            stock_score = {}
            
            for i, code in enumerate(institutional):
                stock_score[code] = stock_score.get(code, 0) + (10 - i) * 2  # 法人買超權重 2
            
            for i, code in enumerate(gainers):
                stock_score[code] = stock_score.get(code, 0) + (10 - i)
            
            for i, code in enumerate(volume):
                stock_score[code] = stock_score.get(code, 0) + (10 - i)
            
            # 排序並返回
            sorted_stocks = sorted(stock_score.items(), key=lambda x: x[1], reverse=True)
            result = [code for code, score in sorted_stocks[:top_n]]
            
            logger.info(f"綜合評分選出 {len(result)} 支股票")
            return result
            
        except Exception as e:
            logger.error(f"綜合選股失敗: {e}")
            return self._get_fallback_stocks(top_n)
    
    def _get_fallback_stocks(self, top_n: int) -> List[str]:
        """備用股票清單（藍籌股）"""
        fallback = [
            '2330',  # 台積電
            '2454',  # 聯發科
            '0050',  # 元大台灣50
            '2317',  # 鴻海
            '2412',  # 中華電
            '2308',  # 台達電
            '2881',  # 富邦金
            '2882',  # 國泰金
        ]
        logger.info(f"使用預設藍籌股清單")
        return fallback[:top_n]


# 測試程式
if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    
    picker = StockPicker()
    
    print("=" * 60)
    print("智能選股測試")
    print("=" * 60)
    
    print("\n1. 三大法人買超:")
    institutional = picker.get_recommended_stocks('institutional', 5)
    for i, code in enumerate(institutional, 1):
        print(f"   {i}. {code}")
    
    print("\n2. 漲幅排行:")
    gainers = picker.get_recommended_stocks('gainers', 5)
    for i, code in enumerate(gainers, 1):
        print(f"   {i}. {code}")
    
    print("\n3. 成交量排行:")
    volume = picker.get_recommended_stocks('volume', 5)
    for i, code in enumerate(volume, 1):
        print(f"   {i}. {code}")
    
    print("\n4. 綜合評分:")
    mixed = picker.get_recommended_stocks('mixed', 5)
    for i, code in enumerate(mixed, 1):
        print(f"   {i}. {code}")

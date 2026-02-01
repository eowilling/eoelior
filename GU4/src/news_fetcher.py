# -*- coding: utf-8 -*-
"""
新聞搜索模組
使用 Google Custom Search 抓取台股相關新聞
"""
import logging
import requests
from typing import List, Dict, Optional
from datetime import datetime, timedelta

from src.config import get_config

logger = logging.getLogger(__name__)


class NewsFetcher:
    """新聞搜索器"""
    
    def __init__(self):
        self.config = get_config()
        self.api_key = self.config.google_cse_key
        self.search_id = self.config.google_cse_id
        # 強制使用爬蟲模式（Google CSE API 已不可用）
        self.use_api = False
        
        logger.info("使用新聞爬蟲模式")
        from src.news_scraper import TaiwanNewsScaper
        self.scraper = TaiwanNewsScaper()
    
    def search_stock_news(
        self, 
        stock_code: str, 
        stock_name: str,
        days: int = 7,
        max_results: int = 5
    ) -> List[Dict[str, str]]:
        """
        搜索股票相關新聞
        
        優先使用網頁爬蟲（Google CSE 已不開放新用戶）
        """
        # 使用爬蟲模式
        if not self.use_api:
            return self.scraper.search_stock_news(stock_code, stock_name, max_results)
        
        # 使用 Google CSE API（舊客戶）
        return self._search_with_api(stock_code, stock_name, days, max_results)
    
    def search_stock_news(
        self, 
        stock_code: str, 
        stock_name: str,
        days: int = 7,
        max_results: int = 5
    ) -> List[Dict[str, str]]:
        """
        搜索股票相關新聞
        
        優先使用網頁爬蟲（Google CSE 已不開放新用戶）
        
        Args:
            stock_code: 股票代碼
            stock_name: 股票名稱
            days: 搜索幾天內的新聞
            max_results: 最多返回幾則新聞
            
        Returns:
            新聞列表
        """
        # 使用爬蟲模式
        if not self.use_api:
            return self.scraper.search_stock_news(stock_code, stock_name, max_results)
        
        # 使用 Google CSE API（舊客戶）
        return self._search_with_api(stock_code, stock_name, days, max_results)
    
    def _search_with_api(
        self,
        stock_code: str,
        stock_name: str, 
        days: int,
        max_results: int
    ) -> List[Dict[str, str]]:
        """使用 Google CSE API 搜索"""
        try:
            # 構建搜索查詢
            query = f"{stock_code} {stock_name} 台股"
            
            # 時間範圍
            date_restrict = f"d{days}"
            
            # Google CSE API
            url = "https://www.googleapis.com/customsearch/v1"
            params = {
                'key': self.api_key,
                'cx': self.search_id,
                'q': query,
                'dateRestrict': date_restrict,
                'num': max_results,
                'lr': 'lang_zh-TW',  # 繁體中文
                'gl': 'tw'  # 台灣
            }
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code != 200:
                logger.error(f"新聞搜索失敗: {response.status_code}")
                return []
            
            data = response.json()
            items = data.get('items', [])
            
            news_list = []
            for item in items:
                news_list.append({
                    'title': item.get('title', ''),
                    'snippet': item.get('snippet', ''),
                    'link': item.get('link', ''),
                    'source': item.get('displayLink', '')
                })
            
            logger.info(f"[{stock_code}] 找到 {len(news_list)} 則新聞")
            return news_list
            
        except Exception as e:
            logger.error(f"新聞搜索異常: {e}")
            return []
    
    def format_news_for_analysis(self, news_list: List[Dict]) -> str:
        """格式化新聞供 AI 分析"""
        if not news_list:
            return "無相關新聞"
        
        formatted = "### 近期相關新聞\n\n"
        for i, news in enumerate(news_list, 1):
            formatted += f"{i}. **{news['title']}**\n"
            formatted += f"   {news['snippet']}\n"
            formatted += f"   來源: {news['source']}\n\n"
        
        return formatted
    
    def format_news_for_report(self, news_list: List[Dict]) -> str:
        """格式化新聞供報告顯示"""
        if not news_list:
            return "📰 暫無相關新聞\n"
        
        formatted = f"📰 近期新聞 ({len(news_list)} 則)\n"
        formatted += "─" * 60 + "\n"
        
        for i, news in enumerate(news_list, 1):
            formatted += f"\n{i}. {news['title']}\n"
            formatted += f"   {news['snippet'][:100]}...\n"
            formatted += f"   🔗 {news['link']}\n"
        
        return formatted


def test_news_fetcher():
    """測試新聞搜索"""
    print("=" * 60)
    print("🧪 測試新聞搜索功能")
    print("=" * 60)
    
    fetcher = NewsFetcher()
    
    if not fetcher.enabled:
        print("❌ Google CSE 未配置，無法測試")
        return False
    
    # 測試搜索台積電新聞
    print("\n搜索「台積電 (2330)」新聞...")
    news_list = fetcher.search_stock_news(
        stock_code="2330",
        stock_name="台積電",
        days=7,
        max_results=3
    )
    
    if news_list:
        print(f"✅ 找到 {len(news_list)} 則新聞\n")
        print(fetcher.format_news_for_report(news_list))
        return True
    else:
        print("❌ 未找到新聞")
        return False


if __name__ == '__main__':
    test_news_fetcher()

# -*- coding: utf-8 -*-
"""
台灣財經新聞爬蟲（替代 Google CSE）
直接抓取鉅亨網、經濟日報等新聞網站
"""
import logging
import requests
from typing import List, Dict
from datetime import datetime
from bs4 import BeautifulSoup
import time

logger = logging.getLogger(__name__)


class TaiwanNewsScaper:
    """台灣財經新聞爬蟲"""
    
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Referer': 'https://news.cnyes.com/',
            'Cache-Control': 'max-age=0'
        }
    
    def search_stock_news(
        self, 
        stock_code: str, 
        stock_name: str,
        max_results: int = 5
    ) -> List[Dict[str, str]]:
        """
        搜索股票相關新聞
        
        Args:
            stock_code: 股票代碼
            stock_name: 股票名稱
            max_results: 最多返回幾則新聞
            
        Returns:
            新聞列表
        """
        news_list = []
        
        # 1. 抓取 Yahoo 財經 RSS（最穩定）
        try:
            yahoo_news = self._fetch_yahoo_rss(stock_code, stock_name)
            news_list.extend(yahoo_news)
        except Exception as e:
            logger.debug(f"Yahoo RSS 失敗: {e}")
        
        # 2. 抓取經濟日報新聞
        try:
            udn_news = self._fetch_udn_news(stock_name)
            news_list.extend(udn_news)
        except Exception as e:
            logger.debug(f"經濟日報失敗: {e}")
        
        # 3. 如果沒有新聞，返回通用台股新聞
        if not news_list:
            news_list = self._fetch_general_tw_stock_news(stock_name)
        
        # 去重並限制數量
        seen = set()
        unique_news = []
        for news in news_list:
            if news['title'] not in seen:
                seen.add(news['title'])
                unique_news.append(news)
                if len(unique_news) >= max_results:
                    break
        
        logger.info(f"[{stock_code}] 找到 {len(unique_news)} 則新聞")
        return unique_news
    
    def _fetch_udn_news(self, stock_name: str) -> List[Dict]:
        """抓取經濟日報台股新聞（穩定來源）"""
        try:
            url = "https://money.udn.com/rssfeed/news/1001/5591"  # 台股新聞 RSS
            
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                return []
            
            soup = BeautifulSoup(response.text, 'xml')
            items = soup.find_all('item', limit=20)
            
            news_list = []
            for item in items:
                try:
                    title = item.find('title').text if item.find('title') else ''
                    link = item.find('link').text if item.find('link') else ''
                    description = item.find('description').text if item.find('description') else ''
                    
                    # 篩選相關新聞（寬鬆條件）
                    if stock_name in title or stock_name in description or self._match_keywords(title):
                        news_list.append({
                            'title': title[:100],
                            'snippet': description[:150] if description else '',
                            'link': link,
                            'source': '經濟日報'
                        })
                except Exception:
                    continue
            
            return news_list
            
        except Exception as e:
            logger.debug(f"經濟日報錯誤: {e}")
            return []
        """抓取鉅亨網新聞（公開 API）"""
        try:
            # 鉅亨網台股新聞列表
            url = "https://news.cnyes.com/news/cat/tw_stock"
            
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                logger.debug(f"鉅亨網無法訪問: {response.status_code}")
                return []
            
            soup = BeautifulSoup(response.text, 'html.parser')
            news_list = []
            
            # 尋找新聞項目
            articles = soup.find_all('a', class_=['_1Zdp'], limit=20)
            if not articles:
                # 備用選擇器
                articles = soup.find_all('a', limit=30)
            
            for article in articles:
                try:
                    title = article.text.strip()
                    link = article.get('href', '')
                    
                    # 篩選包含股票相關的新聞
                    if len(title) > 15 and (stock_name in title or stock_code in title or self._match_keywords(title)):
                        if link and not link.startswith('http'):
                            link = 'https://news.cnyes.com' + link
                        
                        if link.startswith('http'):
                            news_list.append({
                                'title': title[:100],
                                'snippet': '',
                                'link': link,
                                'source': '鉅亨網'
                            })
                except Exception:
                    continue
            
            return news_list
            
        except Exception as e:
            logger.debug(f"鉅亨網錯誤: {e}")
            return []
    
    def _fetch_yahoo_rss(self, stock_code: str, stock_name: str) -> List[Dict]:
        """抓取 Yahoo 財經新聞"""
        try:
            # Yahoo 台股新聞 RSS
            url = "https://tw.stock.yahoo.com/rss"
            
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                return []
            
            soup = BeautifulSoup(response.text, 'xml')
            items = soup.find_all('item', limit=20)
            
            news_list = []
            for item in items:
                try:
                    title = item.find('title').text if item.find('title') else ''
                    link = item.find('link').text if item.find('link') else ''
                    description = item.find('description').text if item.find('description') else ''
                    
                    # 篩選相關新聞
                    if stock_name in title or stock_code in title or stock_name in description:
                        news_list.append({
                            'title': title,
                            'snippet': description[:150],
                            'link': link,
                            'source': 'Yahoo股市'
                        })
                except Exception:
                    continue
            
            return news_list
            
        except Exception as e:
            logger.debug(f"Yahoo RSS 錯誤: {e}")
            return []
    
    def _fetch_general_tw_stock_news(self, stock_name: str) -> List[Dict]:
        """抓取台股通用新聞（備用方案）"""
        try:
            # 經濟日報台股新聞
            url = "https://money.udn.com/money/cate/5591"
            
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                return []
            
            soup = BeautifulSoup(response.text, 'html.parser')
            news_list = []
            
            # 找新聞標題
            articles = soup.find_all('a', limit=15)
            
            for article in articles:
                try:
                    title = article.text.strip()
                    link = article.get('href', '')
                    
                    # 基本篩選
                    if len(title) > 15 and ('台股' in title or '股市' in title or stock_name in title):
                        if link and not link.startswith('http'):
                            link = 'https://money.udn.com' + link
                        
                        if link.startswith('http'):
                            news_list.append({
                                'title': title[:100],
                                'snippet': f'相關新聞：{stock_name}',
                                'link': link,
                                'source': '經濟日報'
                            })
                except Exception:
                    continue
            
            return news_list[:3]  # 最多3則通用新聞
            
        except Exception as e:
            logger.debug(f"經濟日報錯誤: {e}")
            return []
    
    def _match_keywords(self, text: str) -> bool:
        """匹配台股相關關鍵字"""
        keywords = ['台股', '股市', '上市', '上櫃', '大盤', '台灣50', '科技股', '電子股', '半導體']
        return any(keyword in text for keyword in keywords)
        """抓取鉅亨網新聞 (使用 API)"""
        try:
            # 鉅亨網新聞 API（公開接口）
            url = f"https://api.cnyes.com/media/api/v1/newslist/category/tw_stock"
            params = {
                'limit': 10,
                'page': 1
            }
            
            response = requests.get(url, params=params, headers=self.headers, timeout=10)
            if response.status_code != 200:
                return []
            
            data = response.json()
            news_list = []
            
            # 解析新聞項目
            items = data.get('items', {}).get('data', [])
            
            for item in items:
                try:
                    title = item.get('title', '')
                    news_id = item.get('newsId', '')
                    
                    # 篩選包含股票名稱或代碼的新聞
                    if stock_name in title or stock_code in title:
                        link = f"https://news.cnyes.com/news/id/{news_id}"
                        summary = item.get('summary', '')[:100]
                        
                        news_list.append({
                            'title': title,
                            'snippet': summary,
                            'link': link,
                            'source': '鉅亨網'
                        })
                        
                        if len(news_list) >= 5:
                            break
                except Exception:
                    continue
            
            return news_list
            
        except Exception as e:
            logger.error(f"鉅亨網爬取失敗: {e}")
            return []
    
    def _fetch_yahoo_news(self, stock_code: str, stock_name: str) -> List[Dict]:
        """抓取 Yahoo 股市新聞（已廢棄，改用 RSS）"""
        return []
    
    def format_news_for_analysis(self, news_list: List[Dict]) -> str:
        """格式化新聞供 AI 分析"""
        if not news_list:
            return "無相關新聞"
        
        formatted = "### 近期相關新聞\n\n"
        for i, news in enumerate(news_list, 1):
            formatted += f"{i}. **{news['title']}**\n"
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
            formatted += f"   來源: {news['source']}\n"
            formatted += f"   🔗 {news['link']}\n"
        
        return formatted


def test_news_scraper():
    """測試新聞爬蟲"""
    print("=" * 60)
    print("🧪 測試台灣財經新聞爬蟲")
    print("=" * 60)
    
    scraper = TaiwanNewsScaper()
    
    # 測試台積電
    print("\n搜索「台積電 (2330)」新聞...")
    news_list = scraper.search_stock_news(
        stock_code="2330",
        stock_name="台積電",
        max_results=5
    )
    
    if news_list:
        print(f"✅ 找到 {len(news_list)} 則新聞\n")
        print(scraper.format_news_for_report(news_list))
        return True
    else:
        print("❌ 未找到新聞")
        return False


if __name__ == '__main__':
    test_news_scraper()

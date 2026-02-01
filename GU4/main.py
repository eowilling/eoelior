# -*- coding: utf-8 -*-
"""
台股智能分析系統 - 主程式
"""
import sys
import os
from datetime import datetime
from typing import List, Dict, Any
import time

# 強制使用 UTF-8 編碼（修正 PowerShell 亂碼問題）
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')
    os.environ['PYTHONIOENCODING'] = 'utf-8'

from src.config import get_config
from src.utils import setup_logger, get_taiwan_time, format_percentage
from data_provider import DataFetcherManager, YFinanceTaiwanFetcher
from data_provider.finmind_tw import FinMindTaiwanFetcher
from src.analyzer import StockAnalyzer
from src.news_fetcher import NewsFetcher
from src.stock_picker import StockPicker

# 設置日誌
logger = setup_logger(__name__)


class TaiwanStockAnalysisApp:
    """台股分析應用主類"""
    
    def __init__(self):
        logger.info("=" * 80)
        logger.info("台股智能分析系統初始化...")
        
        # 載入配置
        self.config = get_config()
        # print(self.config)  # 避免 PowerShell Unicode 問題
        
        # 驗證配置
        is_valid, errors = self.config.validate()
        if not is_valid or errors:
            logger.warning("配置檢查:")
            for error in errors:
                logger.warning(f"  {error}")
            
            if not is_valid:
                raise ValueError("配置不完整，無法啟動系統")
        
        # 初始化數據源管理器
        logger.info("初始化數據源...")
        self.fetcher_manager = DataFetcherManager()
        self.fetcher_manager.add_fetcher(YFinanceTaiwanFetcher())
        
        # 添加 FinMind 作為備用數據源 (如果有 Token)
        if self.config.finmind_token:
            self.fetcher_manager.add_fetcher(FinMindTaiwanFetcher(token=self.config.finmind_token))
            logger.info("已啟用 FinMind 數據源")
        
        logger.info(f"可用數據源: {', '.join(self.fetcher_manager.available_fetchers)}")
        
        # 初始化 AI 分析器
        logger.info("初始化 AI 分析器...")
        self.analyzer = StockAnalyzer()
        
        # 初始化新聞搜索
        logger.info("初始化新聞搜索...")
        self.news_fetcher = NewsFetcher()
        
        # 初始化智能選股
        self.stock_picker = StockPicker()
        
        logger.info("系統初始化完成")
        logger.info("=" * 80)
    
    def analyze_single_stock(self, stock_code: str) -> Dict[str, Any]:
        """
        分析單隻股票
        
        Args:
            stock_code: 股票代碼
            
        Returns:
            分析結果字典
        """
        logger.info(f"\n{'=' * 80}")
        logger.info(f"開始分析股票: {stock_code}")
        logger.info(f"{'=' * 80}")
        
        try:
            # 1. 獲取日線數據
            logger.info(f"[{stock_code}] 獲取歷史數據...")
            df, source = self.fetcher_manager.get_daily_data(stock_code, days=60)
            
            if df is None or df.empty:
                logger.error(f"[{stock_code}] 無法獲取數據")
                return {
                    'success': False,
                    'code': stock_code,
                    'error': '無法獲取數據'
                }
            
            logger.info(f"[{stock_code}] 獲取 {len(df)} 天數據 (來源: {source})")
            
            # 2. 獲取即時報價
            logger.info(f"[{stock_code}] 獲取即時報價...")
            quote = self.fetcher_manager.get_realtime_quote(stock_code)
            
            if not quote:
                logger.warning(f"[{stock_code}] 無法獲取即時報價，使用最新收盤價")
            
            # 3. 準備技術數據
            latest_row = df.iloc[-1]
            latest_data = latest_row.to_dict()
            
            # 檢查均線狀態
            ma_status = self._analyze_ma_status(latest_data)
            
            # 提取技術指標
            indicators = {
                'rsi': latest_data.get('rsi'),
                'macd': latest_data.get('macd'),
                'macd_signal': latest_data.get('macd_signal'),
                'volume_ratio': latest_data.get('volume_ratio')
            }
            
            technical_data = {
                'quote': quote or {},
                'latest': latest_data,
                'ma_status': ma_status,
                'indicators': indicators,
                'history': df.tail(20).to_dict('records')
            }
            
            # 4. 搜索相關新聞
            stock_name = quote.get('name', stock_code) if quote else stock_code
            logger.info(f"[{stock_code}] 搜索相關新聞...")
            try:
                news = self.news_fetcher.search_stock_news(
                    stock_code=stock_code,
                    stock_name=stock_name
                )
            except Exception as e:
                logger.warning(f"[{stock_code}] 新聞搜索失敗: {e}")
                news = []
            
            # 5. AI 分析
            logger.info(f"[{stock_code}] 執行 AI 分析...")
            analysis = self.analyzer.analyze_stock(
                stock_code=stock_code,
                stock_name=stock_name,
                technical_data=technical_data,
                news=news
            )
            
            result = {
                'success': True,
                'code': stock_code,
                'name': stock_name,
                'quote': quote,
                'technical': latest_data,
                'ma_status': ma_status,
                'analysis': analysis,
                'analyzed_at': get_taiwan_time().isoformat()
            }
            
            logger.info(f"[{stock_code}] 分析完成")
            return result
            
        except Exception as e:
            logger.error(f"[{stock_code}] 分析失敗: {e}", exc_info=True)
            return {
                'success': False,
                'code': stock_code,
                'error': str(e)
            }
    
    def _analyze_ma_status(self, data: Dict) -> Dict[str, Any]:
        """分析均線狀態"""
        ma5 = data.get('ma5')
        ma10 = data.get('ma10')
        ma20 = data.get('ma20')
        close = data.get('close')
        
        if not all([ma5, ma10, ma20, close]):
            return {
                'status': 'unknown',
                'description': '數據不足',
                'bias': 0
            }
        
        # 多頭排列
        is_bullish = ma5 > ma10 > ma20
        # 空頭排列
        is_bearish = ma5 < ma10 < ma20
        
        # 乖離率 (相對MA20)
        bias = ((close - ma20) / ma20 * 100) if ma20 else 0
        
        if is_bullish:
            status = 'bullish'
            emoji = '✅'
            desc = '多頭排列'
        elif is_bearish:
            status = 'bearish'
            emoji = '❌'
            desc = '空頭排列'
        else:
            status = 'neutral'
            emoji = '⚠️'
            desc = '均線糾結'
        
        description = f"{emoji} {desc} (MA5={ma5:.2f} MA10={ma10:.2f} MA20={ma20:.2f})"
        
        return {
            'status': status,
            'is_bullish': is_bullish,
            'is_bearish': is_bearish,
            'bias': bias,
            'description': description
        }
    
    def run(self):
        """執行主流程"""
        taiwan_time = get_taiwan_time()
        
        # 獲取股票清單
        stock_list = self.config.stock_list
        
        # 如果股票清單為空，使用智能選股
        if not stock_list:
            logger.info("股票清單為空，啟用智能選股...")
            method = self.config.get('AUTO_PICK_METHOD', 'institutional')
            count = int(self.config.get('AUTO_PICK_COUNT', 5))
            stock_list = self.stock_picker.get_recommended_stocks(method, count)
            logger.info(f"智能選股結果: {', '.join(stock_list)}")
        
        print("\n" + "=" * 80)
        print("台股智能分析系統")
        print("=" * 80)
        print(f"分析時間: {get_taiwan_time().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"自選股列表: {', '.join(stock_list)}")
        print(f"股票數量: {len(stock_list)} 支")
        print("=" * 80)
        
        results = []
        
        # 分析每隻股票
        for i, stock_code in enumerate(stock_list, 1):
            print(f"\n[{i}/{len(stock_list)}] 分析中...")
            
            result = self.analyze_single_stock(stock_code)
            results.append(result)
            
            # 延遲以避免 API 限流
            if i < len(self.config.stock_list):
                time.sleep(self.config.analysis_delay)
        
        # 輸出報告
        self._print_report(results)
        
        logger.info("=" * 80)
        logger.info("分析完成")
        logger.info("=" * 80)
        
        return results
    
    def _print_report(self, results: List[Dict[str, Any]]):
        """打印分析報告"""
        print("\n" + "=" * 80)
        print("📊 台股分析報告")
        print("=" * 80)
        print(f"⏰ 生成時間: {get_taiwan_time().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 80)
        
        success_count = sum(1 for r in results if r.get('success'))
        fail_count = len(results) - success_count
        
        print(f"\n✅ 成功: {success_count} 支  ❌ 失敗: {fail_count} 支\n")
        
        for result in results:
            if not result.get('success'):
                print(f"\n❌ {result.get('code', 'Unknown')}")
                print(f"   錯誤: {result.get('error', '未知錯誤')}")
                continue
            
            code = result['code']
            name = result['name']
            quote = result.get('quote', {})
            ma_status = result.get('ma_status', {})
            
            print(f"\n{'─' * 80}")
            print(f"📈 {name} ({code})")
            print(f"{'─' * 80}")
            
            if quote:
                change_pct = quote.get('change_pct', 0)
                emoji = '📈' if change_pct > 0 else '📉' if change_pct < 0 else '➡️'
                
                print(f"💰 當前價格: {quote.get('price')} 元")
                print(f"{emoji} 漲跌幅: {format_percentage(change_pct)}")
                print(f"📊 成交量: {quote.get('volume'):,} 股")
            
            print(f"📉 {ma_status.get('description', 'N/A')}")
            print(f"📐 乖離率: {format_percentage(ma_status.get('bias', 0))}")
            
            print(f"\n{result['analysis']}")
        
        print("\n" + "=" * 80)
        print("⚠️  本系統僅供參考，不構成投資建議。投資有風險，請謹慎決策。")
        print("=" * 80)


def main():
    """主函數"""
    try:
        app = TaiwanStockAnalysisApp()
        app.run()
        
    except KeyboardInterrupt:
        logger.info("\n用戶中斷執行")
        sys.exit(0)
        
    except Exception as e:
        logger.error(f"系統錯誤: {e}", exc_info=True)
        sys.exit(1)


if __name__ == '__main__':
    main()

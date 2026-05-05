# -*- coding: utf-8 -*-
"""
台股智能分析系統 - 主程式
"""
import sys
import logging
from datetime import datetime
from typing import List, Dict, Any

from src.config import get_config
from data_provider import DataFetcherManager, YFinanceTaiwanFetcher
from src.analyzer import StockAnalyzer

# 配置日誌
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('tw_stock_analysis.log', encoding='utf-8'),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)


class StockAnalysisApp:
    """台股分析應用主類"""
    
    def __init__(self):
        # 載入配置
        self.config = get_config()
        
        # 驗證配置
        is_valid, errors = self.config.validate()
        if not is_valid:
            logger.error("配置驗證失敗:")
            for error in errors:
                logger.error(f"  {error}")
            raise ValueError("配置不完整")
        
        # 初始化數據源管理器
        self.fetcher_manager = DataFetcherManager()
        self.fetcher_manager.add_fetcher(YFinanceTaiwanFetcher())
        
        # 初始化 AI 分析器
        self.analyzer = StockAnalyzer()
        
        logger.info("系統初始化完成")
        logger.info(f"數據源: {', '.join(self.fetcher_manager.available_fetchers)}")
    
    def analyze_stock(self, stock_code: str) -> Dict[str, Any]:
        """
        分析單隻股票
        
        Args:
            stock_code: 股票代碼
            
        Returns:
            分析結果字典
        """
        logger.info(f"=" * 60)
        logger.info(f"開始分析股票: {stock_code}")
        
        try:
            # 1. 獲取日線數據
            df, source = self.fetcher_manager.get_daily_data(stock_code, days=60)
            if df is None or df.empty:
                logger.error(f"{stock_code} 無數據")
                return {'success': False, 'error': '無數據'}
            
            logger.info(f"獲取到 {len(df)} 天數據 (來源: {source})")
            
            # 2. 獲取即時報價
            quote = self.fetcher_manager.get_realtime_quote(stock_code)
            
            # 3. 準備分析數據
            latest_data = df.iloc[-1].to_dict()
            
            analysis_data = {
                'current': quote if quote else {},
                'latest': latest_data,
                'ma_status': self._check_ma_status(latest_data),
                'history': df.tail(20).to_dict('records')
            }
            
            # 4. AI 分析
            stock_name = quote.get('name', stock_code) if quote else stock_code
            analysis = self.analyzer.analyze_stock(
                stock_code=stock_code,
                stock_name=stock_name,
                data=analysis_data
            )
            
            result = {
                'success': True,
                'code': stock_code,
                'name': stock_name,
                'quote': quote,
                'technical': latest_data,
                'analysis': analysis
            }
            
            logger.info(f"{stock_code} 分析完成")
            return result
            
        except Exception as e:
            logger.error(f"分析 {stock_code} 失敗: {e}", exc_info=True)
            return {'success': False, 'error': str(e)}
    
    def _check_ma_status(self, data: Dict) -> Dict[str, Any]:
        """
        檢查均線狀態
        
        Returns:
            均線狀態字典
        """
        ma5 = data.get('ma5')
        ma10 = data.get('ma10')
        ma20 = data.get('ma20')
        ma60 = data.get('ma60')
        close = data.get('close')
        
        if not all([ma5, ma10, ma20, close]):
            return {'status': 'unknown', 'description': '數據不足'}
        
        # 多頭排列: MA5 > MA10 > MA20
        is_bullish = ma5 > ma10 > ma20
        
        # 空頭排列: MA5 < MA10 < MA20
        is_bearish = ma5 < ma10 < ma20
        
        # 乖離率
        bias = ((close - ma20) / ma20 * 100) if ma20 else 0
        
        if is_bullish:
            status = 'bullish'
            description = f"✅ 多頭排列 (MA5 > MA10 > MA20)，乖離率 {bias:.2f}%"
        elif is_bearish:
            status = 'bearish'
            description = f"❌ 空頭排列 (MA5 < MA10 < MA20)，乖離率 {bias:.2f}%"
        else:
            status = 'neutral'
            description = f"⚠️ 均線糾結，等待方向明朗，乖離率 {bias:.2f}%"
        
        return {
            'status': status,
            'is_bullish': is_bullish,
            'is_bearish': is_bearish,
            'bias': bias,
            'description': description
        }
    
    def run(self):
        """執行主流程"""
        logger.info("=" * 60)
        logger.info("台股智能分析系統啟動")
        logger.info(f"時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        logger.info(f"自選股列表: {', '.join(self.config.stock_list)}")
        logger.info("=" * 60)
        
        results = []
        
        # 分析每隻股票
        for stock_code in self.config.stock_list:
            result = self.analyze_stock(stock_code)
            results.append(result)
        
        # 生成匯總報告
        self._print_summary(results)
        
        logger.info("=" * 60)
        logger.info("分析完成")
        
        return results
    
    def _print_summary(self, results: List[Dict[str, Any]]):
        """打印分析摘要"""
        print("\n" + "=" * 60)
        print("📊 台股分析報告")
        print(f"時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        for result in results:
            if not result.get('success'):
                print(f"\n❌ {result.get('code', 'Unknown')}: {result.get('error', '未知錯誤')}")
                continue
            
            code = result['code']
            name = result['name']
            quote = result.get('quote', {})
            
            print(f"\n📈 {name} ({code})")
            print("-" * 60)
            
            if quote:
                print(f"當前價格: {quote.get('price')} 元")
                change_pct = quote.get('change_pct', 0)
                change_symbol = "📈" if change_pct > 0 else "📉" if change_pct < 0 else "➡️"
                print(f"漲跌幅: {change_symbol} {change_pct:+.2f}%")
            
            print(f"\n{result['analysis']}")
        
        print("\n" + "=" * 60)


def main():
    """主函數"""
    try:
        app = StockAnalysisApp()
        app.run()
    except KeyboardInterrupt:
        logger.info("用戶中斷")
    except Exception as e:
        logger.error(f"系統錯誤: {e}", exc_info=True)
        sys.exit(1)


if __name__ == '__main__':
    main()

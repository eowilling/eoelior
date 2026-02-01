# -*- coding: utf-8 -*-
"""
測試腳本 - 驗證系統功能
"""
import sys
import logging
from src.config import get_config
from data_provider import DataFetcherManager, YFinanceTaiwanFetcher

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def test_config():
    """測試配置載入"""
    print("=" * 60)
    print("1. 測試配置載入")
    print("=" * 60)
    
    config = get_config()
    print(config)
    
    is_valid, errors = config.validate()
    if is_valid:
        print("✅ 配置驗證通過")
    else:
        print("❌ 配置驗證失敗:")
        for error in errors:
            print(f"  {error}")
    
    print()


def test_data_fetch(stock_code: str = "2330"):
    """測試數據獲取"""
    print("=" * 60)
    print(f"2. 測試數據獲取: {stock_code}")
    print("=" * 60)
    
    manager = DataFetcherManager()
    manager.add_fetcher(YFinanceTaiwanFetcher())
    
    print(f"可用數據源: {', '.join(manager.available_fetchers)}\n")
    
    # 測試日線數據
    print("測試日線數據 (最近 5 天)...")
    try:
        df, source = manager.get_daily_data(stock_code, days=5)
        print(f"✅ 獲取成功 (來源: {source})")
        print(f"數據筆數: {len(df)}")
        print("\n最近數據:")
        print(df[['date', 'close', 'pct_chg', 'volume', 'ma5', 'ma10', 'ma20']].tail(3))
    except Exception as e:
        print(f"❌ 失敗: {e}")
    
    print()
    
    # 測試即時報價
    print("測試即時報價...")
    try:
        quote = manager.get_realtime_quote(stock_code)
        if quote:
            print(f"✅ 獲取成功")
            print(f"名稱: {quote['name']}")
            print(f"價格: {quote['price']} 元")
            print(f"漲跌: {quote['change']:+.2f} ({quote['change_pct']:+.2f}%)")
            print(f"成交量: {quote['volume']:,} 股")
        else:
            print("❌ 未獲取到數據")
    except Exception as e:
        print(f"❌ 失敗: {e}")
    
    print()


def test_analyzer():
    """測試 AI 分析器"""
    print("=" * 60)
    print("3. 測試 AI 分析器")
    print("=" * 60)
    
    from src.analyzer import StockAnalyzer
    
    try:
        analyzer = StockAnalyzer()
        print("✅ AI 分析器初始化成功")
        
        # 測試簡單分析
        test_data = {
            'current': {
                'price': 580,
                'change_pct': 1.5,
                'volume': 50000
            },
            'latest': {
                'ma5': 575,
                'ma10': 570,
                'ma20': 565,
                'ma60': 560,
                'volume_ratio': 1.2
            },
            'ma_status': {
                'description': '多頭排列'
            }
        }
        
        print("\n測試分析功能...")
        result = analyzer.analyze_stock(
            stock_code="2330",
            stock_name="台積電",
            data=test_data
        )
        
        print("✅ 分析完成")
        print("\n分析結果:")
        print(result)
        
    except ValueError as e:
        print(f"⚠️ 跳過測試: {e}")
    except Exception as e:
        print(f"❌ 失敗: {e}")
    
    print()


def main():
    """執行所有測試"""
    print("\n" + "=" * 60)
    print("台股分析系統測試")
    print("=" * 60 + "\n")
    
    # 1. 測試配置
    test_config()
    
    # 2. 測試數據獲取
    test_data_fetch("2330")  # 台積電
    
    # 3. 測試 AI 分析
    test_analyzer()
    
    print("=" * 60)
    print("測試完成")
    print("=" * 60)


if __name__ == '__main__':
    main()

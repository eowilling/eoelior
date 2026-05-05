# -*- coding: utf-8 -*-
"""
工具函數模組
"""
import logging
from datetime import datetime, date, timedelta
from typing import Optional
import pytz


def setup_logger(name: str, level: str = 'INFO') -> logging.Logger:
    """
    設置日誌記錄器
    
    Args:
        name: 記錄器名稱
        level: 日誌級別
        
    Returns:
        配置好的 Logger 實例
    """
    logger = logging.getLogger(name)
    
    # 避免重複添加 handler
    if logger.handlers:
        return logger
    
    logger.setLevel(getattr(logging, level.upper()))
    
    # 控制台輸出
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_format = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    console_handler.setFormatter(console_format)
    logger.addHandler(console_handler)
    
    # 文件輸出
    from src.config import get_config
    config = get_config()
    log_file = config.logs_dir / f'{datetime.now():%Y%m%d}.log'
    
    file_handler = logging.FileHandler(log_file, encoding='utf-8')
    file_handler.setLevel(logging.DEBUG)
    file_format = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s'
    )
    file_handler.setFormatter(file_format)
    logger.addHandler(file_handler)
    
    return logger


def get_taiwan_time() -> datetime:
    """獲取台灣時間"""
    tz = pytz.timezone('Asia/Taipei')
    return datetime.now(tz)


def is_trading_day(check_date: Optional[date] = None) -> bool:
    """
    判斷是否為交易日 (簡易版本，僅排除週末)
    
    Args:
        check_date: 要檢查的日期，None 則檢查今天
        
    Returns:
        是否為交易日
        
    Note:
        完整版本應該查詢台灣證交所行事曆
    """
    if check_date is None:
        check_date = get_taiwan_time().date()
    
    # 週一到週五為交易日 (0=週一, 6=週日)
    return check_date.weekday() < 5


def is_trading_hours() -> bool:
    """
    判斷當前是否在交易時間內
    
    交易時間: 09:00 - 13:30
    
    Returns:
        是否在交易時間內
    """
    now = get_taiwan_time()
    
    # 不是交易日
    if not is_trading_day(now.date()):
        return False
    
    # 檢查時間
    current_time = now.time()
    from datetime import time
    
    trading_start = time(9, 0)
    trading_end = time(13, 30)
    
    return trading_start <= current_time <= trading_end


def format_number(num: float, decimals: int = 2) -> str:
    """
    格式化數字，加入千分位
    
    Args:
        num: 數字
        decimals: 小數位數
        
    Returns:
        格式化後的字串
    """
    if num is None or num != num:  # None 或 NaN
        return 'N/A'
    
    return f'{num:,.{decimals}f}'


def format_percentage(num: float, decimals: int = 2, with_sign: bool = True) -> str:
    """
    格式化百分比
    
    Args:
        num: 數字
        decimals: 小數位數
        with_sign: 是否顯示正負號
        
    Returns:
        格式化後的字串
    """
    if num is None or num != num:
        return 'N/A'
    
    sign = '+' if num > 0 and with_sign else ''
    return f'{sign}{num:.{decimals}f}%'


def calculate_change_pct(current: float, previous: float) -> float:
    """
    計算漲跌幅
    
    Args:
        current: 當前價格
        previous: 前一價格
        
    Returns:
        漲跌幅 (%)
    """
    if previous == 0 or previous is None:
        return 0.0
    
    return ((current - previous) / previous) * 100


def is_limit_up(change_pct: float, threshold: float = 9.9) -> bool:
    """
    判斷是否接近漲停
    
    Args:
        change_pct: 漲跌幅 (%)
        threshold: 漲停閾值
        
    Returns:
        是否接近漲停
    """
    return change_pct >= threshold


def is_limit_down(change_pct: float, threshold: float = -9.9) -> bool:
    """
    判斷是否接近跌停
    
    Args:
        change_pct: 漲跌幅 (%)
        threshold: 跌停閾值
        
    Returns:
        是否接近跌停
    """
    return change_pct <= threshold


def get_stock_type(code: str) -> str:
    """
    判斷股票類型
    
    Args:
        code: 股票代碼
        
    Returns:
        股票類型: 'stock', 'etf', 'index'
    """
    if not code or not code.isdigit():
        return 'unknown'
    
    # ETF (代碼通常以 00 或 9 開頭)
    if code.startswith('00') or code.startswith('9'):
        return 'etf'
    
    # 指數 (代碼以 01 或 02 開頭)
    if code.startswith('01') or code.startswith('02'):
        return 'index'
    
    # 一般股票
    return 'stock'


def validate_stock_code(code: str) -> tuple[bool, str]:
    """
    驗證股票代碼格式
    
    Args:
        code: 股票代碼
        
    Returns:
        (是否有效, 錯誤訊息)
    """
    if not code:
        return False, "股票代碼不能為空"
    
    code = code.strip()
    
    # 台股代碼通常是 4 位數字
    if not code.isdigit():
        return False, f"股票代碼應為數字: {code}"
    
    if len(code) != 4:
        return False, f"股票代碼應為4位: {code} (長度: {len(code)})"
    
    return True, ""


if __name__ == '__main__':
    # 測試工具函數
    print("Taiwan Time:", get_taiwan_time())
    print("Is Trading Day:", is_trading_day())
    print("Is Trading Hours:", is_trading_hours())
    print("Format Number:", format_number(1234567.89))
    print("Format Percentage:", format_percentage(5.67))
    print("Stock Type (2330):", get_stock_type('2330'))
    print("Stock Type (0050):", get_stock_type('0050'))
    print("Validate 2330:", validate_stock_code('2330'))
    print("Validate 123:", validate_stock_code('123'))

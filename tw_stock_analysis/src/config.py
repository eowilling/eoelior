# -*- coding: utf-8 -*-
"""
配置管理模組
"""
import os
from pathlib import Path
from typing import List, Optional
from dotenv import load_dotenv

# 載入環境變量
load_dotenv()


class Config:
    """系統配置類"""
    
    def __init__(self):
        # AI 模型
        self.gemini_api_key = os.getenv('GEMINI_API_KEY', '')
        
        # 股票配置
        stock_list_str = os.getenv('STOCK_LIST', '2330')
        self.stock_list = [code.strip() for code in stock_list_str.split(',') if code.strip()]
        
        # 通知渠道
        self.line_notify_token = os.getenv('LINE_NOTIFY_TOKEN', '')
        self.telegram_bot_token = os.getenv('TELEGRAM_BOT_TOKEN', '')
        self.telegram_chat_id = os.getenv('TELEGRAM_CHAT_ID', '')
        self.email_sender = os.getenv('EMAIL_SENDER', '')
        self.email_password = os.getenv('EMAIL_PASSWORD', '')
        self.email_receivers = os.getenv('EMAIL_RECEIVERS', '')
        
        # 新聞搜索
        self.google_cse_key = os.getenv('GOOGLE_CSE_KEY', '')
        self.google_cse_id = os.getenv('GOOGLE_CSE_ID', '')
        
        # 進階配置
        self.report_type = os.getenv('REPORT_TYPE', 'simple')
        self.database_url = os.getenv('DATABASE_URL', 'sqlite:///tw_stock.db')
        self.log_level = os.getenv('LOG_LEVEL', 'INFO')
        
        # 項目根目錄
        self.project_root = Path(__file__).parent.parent
    
    def validate(self) -> tuple[bool, List[str]]:
        """
        驗證配置
        
        Returns:
            (是否有效, 錯誤信息列表)
        """
        errors = []
        
        # 檢查 AI API Key
        if not self.gemini_api_key:
            errors.append("❌ 未配置 GEMINI_API_KEY")
        
        # 檢查股票列表
        if not self.stock_list:
            errors.append("❌ 未配置 STOCK_LIST")
        
        # 檢查通知渠道 (至少一個)
        has_notification = any([
            self.line_notify_token,
            self.telegram_bot_token,
            self.email_sender
        ])
        
        if not has_notification:
            errors.append("⚠️ 未配置任何通知渠道 (Line/Telegram/Email)")
        
        return len(errors) == 0, errors
    
    def __str__(self) -> str:
        """返回配置摘要"""
        return f"""
配置摘要:
  股票列表: {', '.join(self.stock_list)}
  AI 模型: {'✓ Gemini' if self.gemini_api_key else '✗ 未配置'}
  通知渠道:
    - Line Notify: {'✓' if self.line_notify_token else '✗'}
    - Telegram: {'✓' if self.telegram_bot_token else '✗'}
    - Email: {'✓' if self.email_sender else '✗'}
  報告類型: {self.report_type}
"""


# 全局配置實例
_config: Optional[Config] = None


def get_config() -> Config:
    """獲取全局配置實例"""
    global _config
    if _config is None:
        _config = Config()
    return _config


if __name__ == '__main__':
    config = get_config()
    print(config)
    is_valid, errors = config.validate()
    if not is_valid:
        print("\n配置錯誤:")
        for error in errors:
            print(f"  {error}")

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
        
        # 進階配置
        self.report_type = os.getenv('REPORT_TYPE', 'simple')
        self.log_level = os.getenv('LOG_LEVEL', 'INFO')
        self.analysis_delay = int(os.getenv('ANALYSIS_DELAY', '3'))
        self.database_url = os.getenv('DATABASE_URL', 'sqlite:///stock_data.db')
        
        # 數據源配置
        self.yfinance_proxy = os.getenv('YFINANCE_PROXY', '')
        self.finmind_token = os.getenv('FINMIND_TOKEN', '')
        self.google_cse_key = os.getenv('GOOGLE_CSE_KEY', '')
        self.google_cse_id = os.getenv('GOOGLE_CSE_ID', '')
        
        # 專案路徑
        self.project_root = Path(__file__).parent.parent
        self.logs_dir = self.project_root / 'logs'
        self.logs_dir.mkdir(exist_ok=True)
    
    def validate(self) -> tuple[bool, List[str]]:
        """
        驗證配置完整性
        
        Returns:
            (是否有效, 錯誤訊息列表)
        """
        errors = []
        
        # 檢查必要配置
        if not self.gemini_api_key:
            errors.append("❌ 未配置 GEMINI_API_KEY (必填)")
        
        if not self.stock_list:
            errors.append("❌ 未配置 STOCK_LIST (必填)")
        
        # 檢查通知渠道 (至少一個)
        has_notification = any([
            self.line_notify_token,
            self.telegram_bot_token and self.telegram_chat_id,
            self.email_sender and self.email_password
        ])
        
        if not has_notification:
            errors.append("⚠️ 建議配置至少一個通知渠道")
        
        # 驗證股票代碼格式
        for code in self.stock_list:
            if not code.isdigit() or len(code) != 4:
                errors.append(f"⚠️ 股票代碼格式可能有誤: {code} (應為4位數字)")
        
        return len(errors) == 0, errors
    
    def get_notification_channels(self) -> List[str]:
        """獲取已配置的通知渠道列表"""
        channels = []
        if self.line_notify_token:
            channels.append('Line Notify')
        if self.telegram_bot_token:
            channels.append('Telegram')
        if self.email_sender:
            channels.append('Email')
        return channels
    
    def __str__(self) -> str:
        """返回配置摘要"""
        channels = self.get_notification_channels()
        
        return f"""
╔══════════════════════════════════════════════╗
║          系統配置摘要                         ║
╚══════════════════════════════════════════════╝

📊 股票配置:
  自選股列表: {', '.join(self.stock_list[:5])}{'...' if len(self.stock_list) > 5 else ''}
  股票數量: {len(self.stock_list)} 支

🤖 AI 模型:
  Gemini API: {'✅ 已配置' if self.gemini_api_key else '❌ 未配置'}

📱 通知渠道:
  {'✅ ' + ', '.join(channels) if channels else '❌ 未配置'}

⚙️ 進階設定:
  報告類型: {self.report_type}
  日誌級別: {self.log_level}
  分析延遲: {self.analysis_delay} 秒
"""


# 全局配置實例
_config: Optional[Config] = None


def get_config() -> Config:
    """獲取全局配置實例 (單例模式)"""
    global _config
    if _config is None:
        _config = Config()
    return _config


def reload_config() -> Config:
    """重新載入配置"""
    global _config
    _config = None
    return get_config()


if __name__ == '__main__':
    # 測試配置
    config = get_config()
    print(config)
    
    is_valid, errors = config.validate()
    if errors:
        print("\n配置檢查結果:")
        for error in errors:
            print(f"  {error}")

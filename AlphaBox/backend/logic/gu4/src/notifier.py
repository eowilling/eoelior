# -*- coding: utf-8 -*-
"""
通知發送模組
支援 Telegram、Email 多渠道通知
"""
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional, List
import requests

from src.config import get_config

logger = logging.getLogger(__name__)


class NotificationManager:
    """統一通知管理器"""
    
    def __init__(self, token: Optional[str] = None, chat_id: Optional[str] = None):
        self.config = get_config()
        self.channels = self.config.get_notification_channels()
        
        # 允許動態覆蓋 (優先使用傳入的 token/id)
        self.dynamic_token = token
        self.dynamic_chat_id = chat_id
        
        # 如果使用者提供了 token/id，即使系統配置沒開 Telegram，也強制啟用
        if self.dynamic_token and self.dynamic_chat_id:
            if 'Telegram' not in self.channels:
                self.channels.append('Telegram')
                
        logger.info(f"通知渠道: {', '.join(self.channels) if self.channels else '無'}")
    
    def check_connectivity(self) -> bool:
        """檢查 Telegram 連線狀態"""
        # 使用配置中或動態傳入的 token
        token = self.dynamic_token or self.config.telegram_bot_token
        if not token:
            return False
        try:
            url = f"https://api.telegram.org/bot{token}/getMe"
            import requests
            response = requests.get(url, timeout=5)
            return response.status_code == 200
        except Exception:
            return False

    def send_analysis_report(
        self, 
        title: str, 
        content: str,
        html_content: Optional[str] = None
    ) -> dict:
        """
        發送分析報告到所有配置的渠道
        
        Args:
            title: 標題
            content: 純文字內容
            html_content: HTML 格式內容（可選）
            
        Returns:
            發送結果字典 {'telegram': bool, 'email': bool}
        """
        results = {}
        
        # Telegram
        if 'Telegram' in self.channels:
            results['telegram'] = self._send_telegram(title, content)
        
        # Email
        if 'Email' in self.channels:
            results['email'] = self._send_email(title, html_content or content)
        
        return results
    
    def _send_telegram(self, title: str, content: str) -> bool:
        """發送 Telegram 訊息"""
        try:
            # 優先使用動態設定，否則使用系統配置
            bot_token = self.dynamic_token or self.config.telegram_bot_token
            chat_id = self.dynamic_chat_id or self.config.telegram_chat_id
            
            # Debug log to trace what's happening
            masked_token = f"{bot_token[:4]}...{bot_token[-4:]}" if bot_token else "None"
            logger.info(f"嘗試發送 Telegram. Token: {masked_token}, ChatID: {chat_id}")
            
            # Telegram 訊息長度限制 4096
            message = f"📊 {title}\n\n{content}"
            if len(message) > 4096:
                message = message[:4093] + "..."
            
            url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            payload = {
                'chat_id': chat_id,
                'text': message,
                'parse_mode': 'Markdown',
                'disable_web_page_preview': True
            }
            
            response = requests.post(url, json=payload, timeout=10)
            
            if response.status_code == 200:
                logger.info("✅ Telegram 發送成功")
                return True
            else:
                logger.error(f"❌ Telegram 發送失敗: {response.text}")
                return False
                
        except Exception as e:
            logger.error(f"❌ Telegram 發送異常: {e}")
            return False
    
    def _send_email(self, title: str, content: str) -> bool:
        """發送 Email"""
        try:
            sender = self.config.email_sender
            password = self.config.email_password
            receivers = self.config.email_receivers
            
            # 建立郵件
            message = MIMEMultipart('alternative')
            message['From'] = sender
            message['To'] = receivers
            message['Subject'] = title
            
            # 嘗試解析為 HTML
            if '<html>' in content.lower() or '<h' in content.lower():
                message.attach(MIMEText(content, 'html', 'utf-8'))
            else:
                # 純文字轉 HTML
                html_body = f"""
                <html>
                <head>
                    <style>
                        body {{ font-family: 'Microsoft JhengHei', Arial, sans-serif; line-height: 1.6; }}
                        .header {{ background: #1e88e5; color: white; padding: 20px; }}
                        .content {{ padding: 20px; }}
                        pre {{ background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }}
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>📊 {title}</h2>
                    </div>
                    <div class="content">
                        <pre>{content}</pre>
                    </div>
                </body>
                </html>
                """
                message.attach(MIMEText(html_body, 'html', 'utf-8'))
            
            # 發送 (優先 587，失敗則嘗試 465)
            try:
                with smtplib.SMTP('smtp.gmail.com', 587, timeout=10) as server:
                    server.starttls()
                    server.login(sender, password)
                    server.sendmail(sender, receivers.split(','), message.as_string())
                logger.info("✅ Email 發送成功 (Port 587)")
            except Exception as e1:
                logger.warning(f"Port 587 發送失敗，嘗試 Port 465: {e1}")
                try:
                    with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10) as server:
                        server.login(sender, password)
                        server.sendmail(sender, receivers.split(','), message.as_string())
                    logger.info("✅ Email 發送成功 (Port 465)")
                except Exception as e2:
                    logger.error(f"❌ Email 發送皆失敗: {e2}")
                    return False
            return True
            
        except Exception as e:
            logger.error(f"❌ Email 發送失敗: {e}")
            return False
    
    def send_simple_message(self, message: str) -> dict:
        """發送簡單文字訊息"""
        return self.send_analysis_report("台股分析系統通知", message)


def test_notifications():
    """測試通知功能"""
    print("=" * 60)
    print("🧪 測試通知功能")
    print("=" * 60)
    
    notifier = NotificationManager()
    
    test_content = """
📈 台股分析系統測試報告

✅ 系統運行正常
📊 數據來源: Yahoo Finance
🤖 AI 模型: Google Gemini 2.0-flash
📅 測試時間: 2026-02-01

功能檢測:
• Telegram 推播: 測試中...
• Email 報告: 測試中...
• 技術分析: 已完成
• AI 建議: 已完成

⚠️ 本訊息為系統測試，非投資建議。
    """
    
    results = notifier.send_analysis_report(
        title="台股分析系統 - 功能測試",
        content=test_content
    )
    
    print("\n發送結果:")
    for channel, success in results.items():
        status = "✅ 成功" if success else "❌ 失敗"
        print(f"  {channel}: {status}")
    
    print("=" * 60)
    return all(results.values())


if __name__ == '__main__':
    test_notifications()

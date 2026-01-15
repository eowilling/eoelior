#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Uber Eats 訂單監控系統 - 增強版 (已修復首次檢測通知問題)
支援手機推播通知(Telegram Bot、LINE Notify)

修復內容:
- ✅ 首次檢測到訂單狀態時也會發送通知
- ✅ 避免用戶錯過任何狀態更新
"""

import asyncio
import json
import sys
import os
import re
import logging
from datetime import datetime
from typing import Dict, List, Optional
import time
import subprocess
import argparse
import requests

# 設定終端機編碼為 UTF-8(Windows 專用)
if sys.platform.startswith('win'):
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

# 嘗試導入 Playwright
try:
    from playwright.async_api import async_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False
    print("⚠️  Playwright 未安裝,將使用模擬模式進行測試")
    print("   如需監控真實訂單,請執行: pip install playwright && playwright install")


# ==================== 配置管理器 ====================

class ConfigManager:
    """配置檔案管理器"""
    
    def __init__(self, config_path: str = "config.json"):
        self.config_path = config_path
        self.config = self._load_config()
    
    def _load_config(self) -> Dict:
        """載入配置檔案"""
        if os.path.exists(self.config_path):
            try:
                with open(self.config_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"⚠️  載入配置檔案失敗: {e}")
                return self._get_default_config()
        else:
            return self._get_default_config()
    
    def _get_default_config(self) -> Dict:
        """取得預設配置"""
        return {
            "order_url": "https://www.ubereats.com/tw/orders/YOUR_ORDER_ID",
            "check_interval": 60,
            "notifications": {
                "telegram": {
                    "enabled": False,
                    "bot_token": "",
                    "chat_id": ""
                },
                "line": {
                    "enabled": False,
                    "notify_token": ""
                },
                "desktop": {
                    "enabled": True
                },
                "html": {
                    "enabled": True
                }
            },
            "monitoring": {
                "max_checks": None,
                "use_mock_data": not PLAYWRIGHT_AVAILABLE,
                "notify_on_first_check": True  # 🆕 首次檢測是否通知
            }
        }
    
    def save_config(self):
        """儲存配置到檔案"""
        try:
            with open(self.config_path, 'w', encoding='utf-8') as f:
                json.dump(self.config, f, indent=2, ensure_ascii=False)
            print(f"✅ 配置已儲存到: {self.config_path}")
        except Exception as e:
            print(f"❌ 儲存配置失敗: {e}")
    
    def update(self, key_path: str, value):
        """更新配置值"""
        keys = key_path.split('.')
        config = self.config
        for key in keys[:-1]:
            config = config.setdefault(key, {})
        config[keys[-1]] = value


# ==================== 推播通知管理器 ====================

class PushNotificationManager:
    """手機推播通知管理器"""
    
    def __init__(self, config: Dict):
        self.config = config
        self.notification_history = []
        
        # 狀態模板
        self.status_templates = {
            'confirmed': {
                'emoji': '🎉',
                'title': '訂單已確認',
                'body': '您的 Uber Eats 訂單已成功確認,餐廳開始製作中'
            },
            'preparing': {
                'emoji': '🍳',
                'title': '餐點製作中',
                'body': '餐廳正在製作您的餐點,請稍候...'
            },
            'ready': {
                'emoji': '🍔',
                'title': '餐點已準備好',
                'body': '您的餐點已完成,外送員即將取餐'
            },
            'delivering': {
                'emoji': '🚗',
                'title': '餐點配送中',
                'body': '外送員已取餐,正在前往您的位置'
            },
            'delivered': {
                'emoji': '🍽️',
                'title': '餐點已送達',
                'body': '您的餐點已送達,請享用!'
            },
            'cancelled': {
                'emoji': '❌',
                'title': '訂單已取消',
                'body': '您的 Uber Eats 訂單已取消'
            },
            'delayed': {
                'emoji': '⚠️',
                'title': '餐點延遲',
                'body': '抱歉,您的餐點可能會延遲送達'
            }
        }
    
    def send_telegram(self, status_type: str, custom_body: str = None) -> bool:
        """發送 Telegram 通知"""
        telegram_config = self.config.get('notifications', {}).get('telegram', {})
        
        if not telegram_config.get('enabled', False):
            return False
        
        bot_token = telegram_config.get('bot_token', '')
        chat_id = telegram_config.get('chat_id', '')
        
        if not bot_token or not chat_id:
            print("⚠️  Telegram 配置不完整")
            return False
        
        template = self.status_templates.get(status_type, {})
        emoji = template.get('emoji', '📢')
        title = template.get('title', '訂單更新')
        body = custom_body or template.get('body', '')
        
        message = f"{emoji} *{title}*\n\n{body}\n\n_更新時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}_"
        
        try:
            url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            data = {
                'chat_id': chat_id,
                'text': message,
                'parse_mode': 'Markdown'
            }
            
            response = requests.post(url, json=data, timeout=10)
            
            if response.status_code == 200:
                print(f"✅ Telegram 通知已發送: {title}")
                return True
            else:
                print(f"❌ Telegram 通知發送失敗: {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Telegram 通知發送錯誤: {e}")
            return False
    
    def send_line(self, status_type: str, custom_body: str = None) -> bool:
        """發送 LINE Notify 通知"""
        line_config = self.config.get('notifications', {}).get('line', {})
        
        if not line_config.get('enabled', False):
            return False
        
        notify_token = line_config.get('notify_token', '')
        
        if not notify_token:
            print("⚠️  LINE Notify 配置不完整")
            return False
        
        template = self.status_templates.get(status_type, {})
        emoji = template.get('emoji', '📢')
        title = template.get('title', '訂單更新')
        body = custom_body or template.get('body', '')
        
        message = f"{emoji} {title}\n\n{body}\n\n更新時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        
        try:
            url = "https://notify-api.line.me/api/notify"
            headers = {
                'Authorization': f'Bearer {notify_token}'
            }
            data = {
                'message': message
            }
            
            response = requests.post(url, headers=headers, data=data, timeout=10)
            
            if response.status_code == 200:
                print(f"✅ LINE 通知已發送: {title}")
                return True
            else:
                print(f"❌ LINE 通知發送失敗: {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ LINE 通知發送錯誤: {e}")
            return False
    
    def send_desktop(self, status_type: str, custom_body: str = None) -> bool:
        """發送桌面通知"""
        desktop_config = self.config.get('notifications', {}).get('desktop', {})
        
        if not desktop_config.get('enabled', True):
            return False
        
        template = self.status_templates.get(status_type, {})
        emoji = template.get('emoji', '📢')
        title = f"{emoji} {template.get('title', '訂單更新')}"
        body = custom_body or template.get('body', '')
        
        print(f"\n{'='*60}")
        print(f"📢 【Uber Eats 訂單通知】")
        print(f"  {title}")
        print(f"  {body}")
        print(f"{'='*60}\n")
        
        # 嘗試系統通知
        try:
            if sys.platform.startswith('win'):
                # Windows 通知
                try:
                    import ctypes
                    MB_OK = 0
                    MB_ICONINFORMATION = 0x40
                    ctypes.windll.user32.MessageBoxW(0, body, title, MB_OK | MB_ICONINFORMATION)
                except:
                    pass
            elif sys.platform.startswith('darwin'):
                # macOS 通知
                subprocess.run(['osascript', '-e', f'display notification "{body}" with title "{title}"'], 
                             capture_output=True)
            elif sys.platform.startswith('linux'):
                # Linux 通知
                subprocess.run(['notify-send', title, body], capture_output=True)
        except:
            pass
        
        return True
    
    def create_html_notification(self, status_type: str, custom_body: str = None) -> Optional[str]:
        """生成 HTML 通知檔案"""
        html_config = self.config.get('notifications', {}).get('html', {})
        
        if not html_config.get('enabled', True):
            return None
        
        template = self.status_templates.get(status_type, {})
        emoji = template.get('emoji', '📢')
        title = template.get('title', '訂單更新')
        body = custom_body or template.get('body', '')
        
        html_content = f"""<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uber Eats 訂單通知</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
        }}
        .notification {{
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 50px;
            max-width: 500px;
            text-align: center;
            animation: slideIn 0.5s ease-out;
        }}
        @keyframes slideIn {{
            from {{
                opacity: 0;
                transform: translateY(-30px);
            }}
            to {{
                opacity: 1;
                transform: translateY(0);
            }}
        }}
        .emoji {{
            font-size: 80px;
            margin-bottom: 20px;
            animation: bounce 1s infinite;
        }}
        @keyframes bounce {{
            0%, 100% {{ transform: translateY(0); }}
            50% {{ transform: translateY(-10px); }}
        }}
        .title {{
            font-size: 32px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }}
        .body {{
            font-size: 18px;
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
        }}
        .timestamp {{
            font-size: 14px;
            color: #999;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }}
        .logo {{
            color: #06c167;
            font-weight: bold;
            font-size: 16px;
        }}
    </style>
</head>
<body>
    <div class="notification">
        <div class="emoji">{emoji}</div>
        <div class="title">{title}</div>
        <div class="body">{body}</div>
        <div class="logo">Uber Eats 訂單追蹤系統</div>
        <div class="timestamp">通知時間: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</div>
    </div>
</body>
</html>"""
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'ubereats_notification_{status_type}_{timestamp}.html'
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(html_content)
            print(f"✅ HTML 通知已生成: {filename}")
            return filename
        except Exception as e:
            print(f"❌ 生成 HTML 通知失敗: {e}")
            return None
    
    def send_all_notifications(self, status_type: str, custom_body: str = None):
        """發送所有已啟用的通知"""
        results = {
            'telegram': False,
            'line': False,
            'desktop': False,
            'html': None
        }
        
        # 記錄通知
        notification_record = {
            'timestamp': datetime.now().isoformat(),
            'status_type': status_type,
            'results': results
        }
        
        # 發送各種通知
        results['telegram'] = self.send_telegram(status_type, custom_body)
        results['line'] = self.send_line(status_type, custom_body)
        results['desktop'] = self.send_desktop(status_type, custom_body)
        results['html'] = self.create_html_notification(status_type, custom_body)
        
        self.notification_history.append(notification_record)
        
        return results


# ==================== 訂單資訊提取器 ====================

class OrderInfoExtractor:
    """從頁面提取完整訂單資訊"""
    
    def __init__(self):
        pass
    
    def extract_all_info(self, html_content: str) -> Dict:
        """提取所有訂單資訊"""
        info = {
            'status': self._extract_status(html_content),
            'items': self._extract_items(html_content),
            'total_amount': self._extract_amount(html_content),
            'restaurant': self._extract_restaurant(html_content),
            'delivery_person': self._extract_delivery_person(html_content),
            'eta_minutes': self._extract_eta_minutes(html_content),
            'estimated_time': self._extract_estimated_time(html_content),
            'latest_time': self._extract_latest_time(html_content),
            'timestamp': datetime.now().isoformat()
        }
        return info
    
    def _extract_status(self, html: str) -> Optional[str]:
        """提取訂單狀態"""
        html_lower = html.lower()
        
        # 狀態映射（按優先級排序）
        status_patterns = [
            ('delivered', ['已送達', 'delivered', '已完成', '訂單完成', '好好享用', 'enjoy your', '享用您訂購']),
            ('delivering', ['配送中', '正在前往', 'delivering', 'on the way', '外送中']),
            ('ready', ['已準備好', '準備完成', 'ready for pickup', 'ready for delivery', '正在領取', 'picking up']),
            ('preparing', ['製作中', '準備中', 'preparing', 'preparing your order']),
            ('searching_driver', ['尋找', '正在尋找其他外送人員', '不好意思', 'looking for']),
            ('confirmed', ['confirmed', '確認', '已確認', '訂單已確認']),
            ('cancelled', ['cancelled', '已取消', '取消']),
        ]
        
        for status_key, keywords in status_patterns:
            for keyword in keywords:
                if keyword in html_lower:
                    return status_key
        
        return None
    
    def _extract_items(self, html: str) -> List[str]:
        """提取訂單商品"""
        items = []
        
        # 嘗試不同的匹配模式 (優化版)
        patterns = [
            r'div[^>]*>\s*([^<]+(?:豆腐|麵|飯|飲|堡|雞|肉|菜|湯|冰)[^<]*)',
            r'span[^>]*>\s*([^<]+(?:豆腐|麵|飯|飲|堡|雞|肉|菜|湯|冰)[^<]*)',
            r'aria-label="([^"]+)"' # 部份結構在標籤中
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, html, re.IGNORECASE)
            for match in matches:
                cleaned = match.strip()
                # 排除長度過短或不相關的文字
                if 2 < len(cleaned) < 50 and not any(x in cleaned for x in ['Uber', '隱私', '登入', '購物車', '我的']):
                    if cleaned not in items:
                        items.append(cleaned)
        
        return items
    
    def _extract_amount(self, html: str) -> Optional[str]:
        """提取訂單金額"""
        # 匹配金額格式：$129.00, NT$129, 129元
        patterns = [
            r'\$\s*(\d+[.,]\d{2})', # $129.00
            r'NT\$\s*(\d+)',
            r'(\d+)\s*元',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, html)
            if match:
                return f"${match.group(1)}"
        
        return None
    
    def _extract_restaurant(self, html: str) -> Optional[str]:
        """提取店家名稱"""
        patterns = [
            r'<h[1-3][^>]*>([^<]+)</h', # 標題通常是店名
            r'aria-label="([^"]+)"', 
        ]
        
        # 排除已知的非店名標題
        for pattern in patterns:
            match = re.search(pattern, html)
            if match:
                name = match.group(1).strip()
                if 2 < len(name) < 40 and "訂單" not in name:
                    return name
        
        return None
    
    def _extract_delivery_person(self, html: str) -> Optional[str]:
        """提取外送員名稱"""
        patterns = [
            r'([\u4e00-\u9fa5]{2,})\s*已取餐',
            r'([\u4e00-\u9fa5]{2,})\s*正在前往',
            r'外送[員人][：:]?\s*([\u4e00-\u9fa5]{2,4})',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, html)
            if match:
                return match.group(1).strip()
        
        return None
    
    def _extract_eta_minutes(self, html: str) -> Optional[int]:
        """提取預估剩餘時間"""
        patterns = [
            r'(\d+)\s*分鐘後抵達',
            r'(\d+)\s*分鐘',
            r'預計時間\s*(\d+)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, html)
            if match:
                return int(match.group(1))
        
        return None
    
    def _extract_estimated_time(self, html: str) -> Optional[str]:
        """提取預估送達時刻"""
        patterns = [
            r'(\d{1,2}:\d{2}\s*[AP]M)',
            r'(\d{1,2}:\d{2})',
        ]
        for pattern in patterns:
            match = re.search(pattern, html)
            if match:
                return match.group(1)
        return None

    def _extract_latest_time(self, html: str) -> Optional[str]:
        """提取最晚送達時刻"""
        match = re.search(r'最晚[送抵]{1,2}達?時間[：:]?\s*(\d{1,2}:\d{2}\s*[AP]M?)', html)
        return match.group(1) if match else None


# ==================== 訂單監控器 ====================

class UberEatsOrderMonitor:
    """Uber Eats 訂單監控器"""
    
    def __init__(self, order_url: str, check_interval: int = 60, use_mock: bool = False, config: Dict = None):
        self.order_url = order_url
        self.check_interval = check_interval
        self.use_mock = use_mock
        self.config = config or {}
        self.last_status = None
        self.history = []
        self.running = False
        self.extractor = OrderInfoExtractor()
        self.order_info = {} # 儲存當前完整資訊
        
        # 訂單狀態映射
        self.status_mapping = {
            'confirmed': ['confirmed', '確認', '已確認'],
            'preparing': ['preparing', 'preparing your order', '製作中', '準備中'],
            'ready': ['ready for pickup', 'ready for delivery', '已準備好', '待取餐'],
            'delivering': ['delivering', 'on the way', '配送中', '外送中'],
            'delivered': ['delivered', '已送達', '已完成'],
            'cancelled': ['cancelled', '已取消', '取消'],
            'delayed': ['delayed', '延遲', '延後']
        }
        
        self.status_callbacks = []
    
    def add_status_callback(self, callback):
        """新增狀態變化回調函數"""
        self.status_callbacks.append(callback)
    
    async def _extract_status_from_html(self, html_content: str) -> Dict:
        """從 HTML 內容中提取訂單狀態"""
        html_lower = html_content.lower()
        
        status_info = {
            'status': None,
            'details': '',
            'timestamp': datetime.now().isoformat(),
            'raw_text': ''
        }
        
        # 尋找狀態關鍵詞
        for status_key, keywords in self.status_mapping.items():
            for keyword in keywords:
                if keyword.lower() in html_lower:
                    status_info['status'] = status_key
                    status_info['details'] = f"檢測到關鍵詞: {keyword}"
                    break
            if status_info['status']:
                break
        
        return status_info
    
    def _get_mock_html(self) -> str:
        """取得模擬的 HTML(用於測試)"""
        import random
        statuses = ['配送中', '製作中', '已送達', '已準備好']
        selected_status = random.choice(statuses)
        
        mock_html = f"""<html>
        <head><title>Uber Eats 訂單追蹤</title></head>
        <body>
            <div class="order-container">
                <h1>訂單追蹤</h1>
                <div class="order-status">
                    <span class="status-label">狀態:</span>
                    <span class="status-value">{selected_status}</span>
                </div>
                <div class="order-progress">
                    <p>訂單更新時間:{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                </div>
            </div>
        </body>
        </html>"""
        return mock_html
    
    async def _get_page_content(self) -> Optional[str]:
        """獲取頁面內容 (低記憶體優化版)"""
        if self.use_mock or not PLAYWRIGHT_AVAILABLE:
            print("📝 使用模擬數據進行測試...")
            return self._get_mock_html()
        
        try:
            async with async_playwright() as p:
                # 針對 GCE e2-micro (低 RAM) 優化啟動參數
                browser = await p.chromium.launch(
                    headless=True,
                    args=[
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--single-process', # 減少進程數量
                        '--disable-gpu'
                    ]
                )
                context = await browser.new_context(
                    user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                )
                page = await context.new_page()
                
                # 設定較短的導航超時
                await page.goto(self.order_url, wait_until='domcontentloaded', timeout=45000)
                # 等待內容載入
                await page.wait_for_timeout(5000)
                
                content = await page.content()
                await browser.close()
                
                return content
                
        except Exception as e:
            print(f"❌ 獲取頁面內容失敗 (可能逾時或記憶體不足): {e}")
            return None
    
    async def check_status(self) -> Dict:
        """檢查當前訂單狀態與詳細資訊 (加入逾時保護)"""
        print(f"\n🔍 檢查訂單狀態: {datetime.now().strftime('%H:%M:%S')}")
        
        try:
            # 加入 90 秒總體超時保護，防止單次檢查卡死整個 Bot
            html_content = await asyncio.wait_for(self._get_page_content(), timeout=90.0)
        except asyncio.TimeoutError:
            print("⚠️ 檢查訂單超時 (90s)，將在下次循環重試")
            return {'success': False, 'error': '檢查逾時'}
        except Exception as e:
            return {'success': False, 'error': str(e)}
        
        if not html_content:
            return {'success': False, 'error': '無法獲取頁面內容'}
        
        # ... (其餘邏輯與之前更新的一致)
        new_info = self.extractor.extract_all_info(html_content)
        status = new_info.get('status')
        
        is_first_check = self.last_status is None
        status_changed = (self.last_status != status)
        
        if status_changed or is_first_check:
            self.history.append(new_info)
            self.last_status = status
            self.order_info = new_info
            
            notify_on_first = self.config.get('monitoring', {}).get('notify_on_first_check', True)
            should_notify = status_changed or (is_first_check and notify_on_first)
            
            if should_notify and self.status_callbacks:
                for callback in self.status_callbacks:
                    try:
                        await callback(new_info)
                    except Exception as e:
                        print(f"❌ 執行回調函數時發生錯誤: {e}")
        else:
            if not self.order_info.get('items') and new_info.get('items'):
                self.order_info.update(new_info)
            print(f"✓ 狀態無變化: {status}")
        
        return {
            'success': True,
            'current_status': new_info,
            'status_changed': status_changed,
            'is_first_check': is_first_check,
            'history': self.history
        }
    
    async def start_monitoring(self, max_checks: int = None):
        """開始持續監控"""
        self.running = True
        
        print(f"\n{'='*60}")
        print(f"🚀 Uber Eats 訂單監控系統已啟動")
        print(f"{'='*60}")
        print(f"📍 訂單 URL: {self.order_url[:50]}...")
        print(f"⏰ 檢查間隔: {self.check_interval} 秒")
        print(f"🔔 首次檢測通知: {'✅ 啟用' if self.config.get('monitoring', {}).get('notify_on_first_check', True) else '❌ 停用'}")
        print(f"{'='*60}\n")
        
        check_count = 0
        
        try:
            while self.running and (max_checks is None or check_count < max_checks):
                result = await self.check_status()
                
                if not result['success']:
                    print(f"❌ 檢查失敗: {result.get('error', '未知錯誤')}")
                
                check_count += 1
                
                if self.running and (max_checks is None or check_count < max_checks):
                    print(f"⏰ 等待 {self.check_interval} 秒後進行下一次檢查...")
                    print(f"   (已執行 {check_count} 次檢查,按 Ctrl+C 停止)")
                    await asyncio.sleep(self.check_interval)
                
        except KeyboardInterrupt:
            print("\n\n🛑 收到停止信號,正在結束監控...")
            self.running = False
        except Exception as e:
            print(f"\n❌ 監控過程中發生錯誤: {e}")
        
        print(f"\n{'='*60}")
        print(f"📊 監控已結束")
        print(f"   總檢查次數: {check_count}")
        print(f"   狀態變化次數: {len(self.history)}")
        print(f"{'='*60}\n")
        
        return self.history
    
    def stop_monitoring(self):
        """停止監控"""
        self.running = False


# ==================== 主程式 ====================

async def interactive_setup():
    """互動式設定精靈"""
    print("\n" + "="*60)
    print("🎯 Uber Eats 訂單監控系統 - 設定精靈")
    print("="*60 + "\n")
    
    config_mgr = ConfigManager()
    config = config_mgr.config
    
    # 訂單 URL
    print("📍 步驟 1: 設定訂單 URL")
    current_url = config.get('order_url', '')
    if current_url and current_url != "https://www.ubereats.com/tw/orders/YOUR_ORDER_ID":
        print(f"   目前: {current_url}")
        use_current = input("   是否使用目前的 URL?(Y/n): ").strip().lower()
        if use_current != 'n':
            order_url = current_url
        else:
            order_url = input("   請輸入訂單 URL: ").strip()
    else:
        order_url = input("   請輸入訂單 URL: ").strip()
    
    config['order_url'] = order_url
    
    # 檢查間隔
    print("\n⏰ 步驟 2: 設定檢查間隔")
    print("   建議: 30-60 秒(太頻繁可能被限制)")
    interval = input(f"   請輸入檢查間隔(秒,預設 60): ").strip()
    config['check_interval'] = int(interval) if interval.isdigit() else 60
    
    # Telegram 設定
    print("\n📱 步驟 3: Telegram 通知設定(可選)")
    use_telegram = input("   是否啟用 Telegram 通知?(y/N): ").strip().lower()
    if use_telegram == 'y':
        bot_token = input("   請輸入 Bot Token: ").strip()
        chat_id = input("   請輸入 Chat ID: ").strip()
        config['notifications']['telegram'] = {
            'enabled': True,
            'bot_token': bot_token,
            'chat_id': chat_id
        }
        print("   ✅ Telegram 通知已啟用")
    else:
        config['notifications']['telegram']['enabled'] = False
        print("   ⊘ Telegram 通知未啟用")
    
    # LINE 設定
    print("\n📱 步驟 4: LINE Notify 設定(可選)")
    use_line = input("   是否啟用 LINE 通知?(y/N): ").strip().lower()
    if use_line == 'y':
        notify_token = input("   請輸入 LINE Notify Token: ").strip()
        config['notifications']['line'] = {
            'enabled': True,
            'notify_token': notify_token
        }
        print("   ✅ LINE 通知已啟用")
    else:
        config['notifications']['line']['enabled'] = False
        print("   ⊘ LINE 通知未啟用")
    
    # 🆕 首次檢測通知設定
    print("\n🔔 步驟 5: 首次檢測通知設定")
    print("   啟用後,首次檢測到訂單狀態時也會發送通知")
    print("   (建議啟用,避免錯過任何狀態更新)")
    notify_first = input("   是否啟用首次檢測通知?(Y/n): ").strip().lower()
    config['monitoring']['notify_on_first_check'] = notify_first != 'n'
    if config['monitoring']['notify_on_first_check']:
        print("   ✅ 首次檢測通知已啟用")
    else:
        print("   ⊘ 首次檢測通知未啟用")
    
    # 儲存配置
    config_mgr.config = config
    config_mgr.save_config()
    
    print("\n" + "="*60)
    print("✅ 設定完成!配置已儲存")
    print("="*60 + "\n")
    
    return config


async def main():
    """主函數"""
    
    parser = argparse.ArgumentParser(description='Uber Eats 訂單監控系統')
    parser.add_argument('--setup', action='store_true', help='執行互動式設定')
    parser.add_argument('--config', type=str, default='config.json', help='配置檔案路徑')
    parser.add_argument('--mock', action='store_true', help='使用模擬數據測試')
    parser.add_argument('--max-checks', type=int, help='最大檢查次數(測試用)')
    
    args = parser.parse_args()
    
    # 互動式設定
    if args.setup:
        config = await interactive_setup()
    else:
        config_mgr = ConfigManager(args.config)
        config = config_mgr.config
    
    # 建立監控器
    order_url = config.get('order_url', '')
    check_interval = config.get('check_interval', 60)
    use_mock = args.mock or config.get('monitoring', {}).get('use_mock_data', False)
    
    if not order_url or order_url == "https://www.ubereats.com/tw/orders/YOUR_ORDER_ID":
        print("❌ 錯誤: 尚未設定訂單 URL")
        print("   請執行: python uber_monitor_enhanced_fixed.py --setup")
        return
    
    monitor = UberEatsOrderMonitor(order_url, check_interval, use_mock, config)
    push_manager = PushNotificationManager(config)
    
    # 設定狀態變化回調
    async def on_status_change(status_info):
        status_type = status_info.get('status')
        if status_type:
            print(f"\n🔔 觸發通知: {status_type}")
            push_manager.send_all_notifications(status_type)
    
    monitor.add_status_callback(on_status_change)
    
    # 開始監控
    max_checks = args.max_checks or config.get('monitoring', {}).get('max_checks')
    await monitor.start_monitoring(max_checks=max_checks)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n👋 程式已結束")
    except Exception as e:
        print(f"\n❌ 程式錯誤: {e}")
        import traceback
        traceback.print_exc()

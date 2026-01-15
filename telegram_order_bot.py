#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Uber Eats 訂單追蹤 Telegram Bot
讓用戶直接傳送訂單 URL 給 Bot,自動監控並通知狀態變化
"""

import asyncio
import json
import os
import re
import sys
from datetime import datetime
from typing import Dict, Optional
import logging

# Telegram Bot
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes,
    CallbackQueryHandler
)

# 現有的監控器
from uber_monitor_enhanced_fixed import (
    UberEatsOrderMonitor,
    ConfigManager
)

# 設定日誌
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# ==================== 訂單管理器 ====================

class OrderManager:
    """管理多個用戶的多個訂單"""
    
    def __init__(self):
        self.monitors = {}  # {chat_id: {order_id: monitor}}
        self.tasks = {}     # {order_id: asyncio.Task}
        self.bot_instance = None
    
    def set_bot(self, bot):
        """設定 Bot 實例"""
        self.bot_instance = bot
    
    def extract_order_id(self, url: str) -> Optional[str]:
        """從 URL 中提取訂單 ID"""
        match = re.search(r'/orders/([a-f0-9\-]+)', url)
        if match:
            return match.group(1)
        return None
    
    async def add_order(self, chat_id: int, order_url: str) -> str:
        """添加新訂單並啟動監控"""
        order_id = self.extract_order_id(order_url)
        
        if not order_id:
            raise ValueError("無法從 URL 中提取訂單 ID")
        
        # 檢查是否已在追蹤
        if chat_id in self.monitors and order_id in self.monitors[chat_id]:
            raise ValueError(f"訂單 {order_id[:8]}... 已在追蹤中")
        
        # 檢查訂單數量限制
        if chat_id in self.monitors and len(self.monitors[chat_id]) >= 5:
            raise ValueError("您最多只能同時追蹤 5 個訂單")
        
        # 創建監控器
        monitor = TelegramOrderMonitor(
            order_url=order_url,
            chat_id=chat_id,
            bot=self.bot_instance,
            order_id=order_id,
            check_interval=30
        )
        
        # 保存監控器
        if chat_id not in self.monitors:
            self.monitors[chat_id] = {}
        self.monitors[chat_id][order_id] = monitor
        
        # 啟動監控任務
        task = asyncio.create_task(monitor.start_monitoring())
        self.tasks[order_id] = task
        
        logger.info(f"用戶 {chat_id} 開始追蹤訂單 {order_id}")
        
        return order_id
    
    async def stop_order(self, chat_id: int, order_id: str) -> bool:
        """停止追蹤訂單"""
        if chat_id in self.monitors and order_id in self.monitors[chat_id]:
            monitor = self.monitors[chat_id][order_id]
            monitor.stop_monitoring()
            
            # 取消任務
            if order_id in self.tasks:
                self.tasks[order_id].cancel()
                try:
                    await self.tasks[order_id]
                except asyncio.CancelledError:
                    pass
                del self.tasks[order_id]
            
            del self.monitors[chat_id][order_id]
            logger.info(f"用戶 {chat_id} 停止追蹤訂單 {order_id}")
            return True
        return False
    
    def get_user_orders(self, chat_id: int) -> Dict:
        """獲取用戶的所有訂單"""
        if chat_id not in self.monitors:
            return {}
        return self.monitors[chat_id]
    
    async def stop_all_orders(self, chat_id: int):
        """停止用戶的所有訂單"""
        if chat_id in self.monitors:
            order_ids = list(self.monitors[chat_id].keys())
            for order_id in order_ids:
                await self.stop_order(chat_id, order_id)


# ==================== Telegram 訂單監控器 ====================

class TelegramOrderMonitor(UberEatsOrderMonitor):
    """擴展訂單監控器,支援 Telegram 通知"""
    
    def __init__(self, order_url: str, chat_id: int, bot, order_id: str, check_interval: int = 30):
        # 創建配置
        config = {
            'monitoring': {
                'notify_on_first_check': True,
                'use_mock_data': False
            }
        }
        
        super().__init__(order_url, check_interval, use_mock=False, config=config)
        self.chat_id = chat_id
        self.bot = bot
        self.order_id = order_id
        
        # 添加 Telegram 通知回調
        self.add_status_callback(self.send_telegram_notification)
        
        # 狀態 Emoji 映射
        self.status_emoji = {
            'confirmed': '🎉',
            'preparing': '🍳',
            'ready': '🍔',
            'delivering': '🚗',
            'delivered': '🍽️',
            'cancelled': '❌',
            'delayed': '⚠️'
        }
        
        # 狀態中文名稱
        self.status_names = {
            'confirmed': '已確認',
            'preparing': '製作中',
            'ready': '已準備好',
            'delivering': '配送中',
            'delivered': '已送達',
            'cancelled': '已取消',
            'delayed': '延遲'
        }
    
    async def send_telegram_notification(self, status_info: Dict):
        """發送 Telegram 通知 (增強版)"""
        status = status_info.get('status')
        if not status:
            return
        
        emoji = self.status_emoji.get(status, '📢')
        status_name = self.status_names.get(status, status)
        
        # 提取詳細資訊
        restaurant = status_info.get('restaurant')
        items = status_info.get('items', [])
        amount = status_info.get('total_amount')
        delivery_person = status_info.get('delivery_person')
        eta = status_info.get('eta_minutes')
        
        # 判斷是否為首次檢測
        is_first = len(self.history) == 1
        
        if is_first:
            header = f"{emoji} *訂單追蹤已啟動*"
            desc = f"📍 當前狀態: *{status_name}*"
        else:
            prev_status = self.history[-2]['status'] if len(self.history) > 1 else None
            prev_name = self.status_names.get(prev_status, prev_status) if prev_status else '未知'
            header = f"{emoji} *訂單狀態更新*"
            desc = f"📊 狀態變化: {prev_name} → *{status_name}*"

        message = (
            f"{header}\n\n"
            f"📦 訂單 ID: `{self.order_id[:8]}...`\n"
            f"{desc}\n"
        )

        # 顯示餐廳資訊
        if restaurant:
            message += f"🏪 餐廳: *{restaurant}*\n"

        # 顯示明細與金額
        if items:
            message += "\n📝 *餐點明細:*\n"
            for item in items[:8]: # 限制顯示數量避免訊息過長
                message += f"• {item}\n"
            if len(items) > 8:
                message += f"• ...及其他 {len(items)-8} 項\n"
        
        if amount:
            message += f"💰 總金額: *{amount}*\n"

        # 顯示外送員與預計時間
        if delivery_person:
            message += f"👤 外送員: *{delivery_person}*\n"
        
        if eta:
            message += f"⏱️ 預計抵達: *{eta} 分鐘*\n"

        message += f"\n🕐 更新時間: {datetime.now().strftime('%H:%M:%S')}\n"
        
        # 特殊狀態的額外訊息
        if status == 'delivered':
            message += "\n🎊 您的餐點已送達,請享用! 🍽️"
        elif status == 'delivering':
            message += "\n🚗 外送員正在前往您的位置"
        
        # 加入停止按鈕
        keyboard = [[InlineKeyboardButton("🛑 停止追蹤此訂單", callback_data=f"stop_{self.order_id[:8]}")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        try:
            await self.bot.send_message(
                chat_id=self.chat_id,
                text=message,
                parse_mode='Markdown',
                reply_markup=reply_markup
            )
            logger.info(f"已發送增強通知與按鈕給用戶 {self.chat_id}: {status_name}")
        except Exception as e:
            logger.error(f"發送 Telegram 通知失敗: {e}")
    
    async def start_monitoring(self, max_checks: int = None):
        """開始監控(覆寫以移除終端輸出)"""
        self.running = True
        check_count = 0
        
        try:
            while self.running and (max_checks is None or check_count < max_checks):
                result = await self.check_status()
                
                # 如果訂單已送達,自動停止監控
                if result.get('current_status', {}).get('status') == 'delivered':
                    logger.info(f"訂單 {self.order_id} 已送達,將在 60 秒後停止監控")
                    await asyncio.sleep(60)
                    self.running = False
                    break
                
                check_count += 1
                
                if self.running:
                    await asyncio.sleep(self.check_interval)
                
        except asyncio.CancelledError:
            logger.info(f"訂單 {self.order_id} 監控已取消")
        except Exception as e:
            logger.error(f"訂單 {self.order_id} 監控錯誤: {e}")
            # 通知用戶發生錯誤
            try:
                await self.bot.send_message(
                    chat_id=self.chat_id,
                    text=f"⚠️ 訂單 `{self.order_id[:8]}...` 監控發生錯誤:\n{str(e)}",
                    parse_mode='Markdown'
                )
            except:
                pass
        
        return self.history


# ==================== Bot 指令處理器 ====================

# 全域訂單管理器
order_manager = OrderManager()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """處理 /start 指令"""
    welcome_message = (
        "🍔 *歡迎使用 Uber Eats 訂單追蹤 Bot!*\n\n"
        "📱 *使用方式:*\n"
        "直接傳送 Uber Eats 訂單 URL 給我,我會自動幫您追蹤訂單狀態。\n\n"
        "🔗 *訂單 URL 範例:*\n"
        "`https://www.ubereats.com/tw/orders/訂單ID`\n\n"
        "📋 *可用指令:*\n"
        "/status - 查看追蹤中的訂單\n"
        "/stop - 停止追蹤訂單\n"
        "/help - 顯示幫助訊息\n\n"
        "💡 *提示:* 您可以同時追蹤最多 5 個訂單"
    )
    
    await update.message.reply_text(welcome_message, parse_mode='Markdown')

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """處理 /help 指令"""
    help_message = (
        "📖 *使用說明*\n\n"
        "*1️⃣ 開始追蹤訂單*\n"
        "直接傳送訂單 URL 給我:\n"
        "`https://www.ubereats.com/tw/orders/訂單ID`\n\n"
        "*2️⃣ 查看追蹤狀態*\n"
        "使用指令: `/status`\n\n"
        "*3️⃣ 停止追蹤*\n"
        "使用指令: `/stop 訂單ID前8碼`\n"
        "範例: `/stop 04ed23d9`\n\n"
        "*4️⃣ 自動停止*\n"
        "訂單送達後會自動停止追蹤\n\n"
        "❓ *常見問題*\n"
        "• 最多可追蹤 5 個訂單\n"
        "• 檢查間隔為 30 秒\n"
        "• 狀態變化時會立即通知\n"
        "• 首次檢測也會發送通知"
    )
    
    await update.message.reply_text(help_message, parse_mode='Markdown')

async def status_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """處理 /status 指令"""
    chat_id = update.effective_chat.id
    orders = order_manager.get_user_orders(chat_id)
    
    if not orders:
        await update.message.reply_text(
            "📭 您目前沒有追蹤任何訂單\n\n"
            "請直接傳送訂單 URL 給我開始追蹤!"
        )
        return
    
        # 為每一筆訂單加入停止按鈕
        keyboard = [[InlineKeyboardButton(f"🛑 停止訂單 {order_id[:8]}", callback_data=f"stop_{order_id[:8]}")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(message_chunk, parse_mode='Markdown', reply_markup=reply_markup)

    # 最後一段提示訊息
    await update.message.reply_text("💡 您可以隨時點擊下方的按鈕或直接傳送新網址以添加訂單。")

async def stop_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """處理 /stop 指令 (按鈕化)"""
    chat_id = update.effective_chat.id
    orders = order_manager.get_user_orders(chat_id)
    
    if not orders:
        await update.message.reply_text("📭 您目前沒有追蹤任何訂單。")
        return

    keyboard = []
    for order_id, monitor in orders.items():
        restaurant = monitor.order_info.get('restaurant', '未知')
        keyboard.append([InlineKeyboardButton(f"🛑 停止 {restaurant} ({order_id[:8]})", callback_data=f"stop_{order_id[:8]}")])
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("請選擇要停止追蹤的訂單：", reply_markup=reply_markup)

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """處理按鈕點擊事件"""
    query = update.callback_query
    await query.answer()
    
    chat_id = update.effective_chat.id
    data = query.data
    
    if data.startswith("stop_"):
        order_id_prefix = data.split("_")[1]
        orders = order_manager.get_user_orders(chat_id)
        
        matched_order = None
        for order_id in orders.keys():
            if order_id.startswith(order_id_prefix):
                matched_order = order_id
                break
        
        if matched_order:
            success = await order_manager.stop_order(chat_id, matched_order)
            if success:
                await query.edit_message_text(f"✅ 已停止追蹤訂單 `{matched_order[:8]}...`")
            else:
                await query.edit_message_text("❌ 停止失敗")
        else:
            await query.edit_message_text("❌ 找不到該訂單或已自動停止")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """處理一般訊息(訂單 URL)"""
    chat_id = update.effective_chat.id
    text = update.message.text.strip()
    
    # 檢查是否為 Uber Eats URL
    if 'ubereats.com/tw/orders/' not in text:
        await update.message.reply_text(
            "❌ 這不是有效的 Uber Eats 訂單 URL\n\n"
            "請傳送完整的訂單 URL,例如:\n"
            "`https://www.ubereats.com/tw/orders/訂單ID`\n\n"
            "使用 `/help` 查看詳細說明",
            parse_mode='Markdown'
        )
        return
    
    # 添加訂單
    try:
        order_id = await order_manager.add_order(chat_id, text)
        
        await update.message.reply_text(
            f"✅ *訂單追蹤已啟動!*\n\n"
            f"📦 訂單 ID: `{order_id[:8]}...`\n"
            f"⏰ 檢查間隔: 30 秒\n\n"
            f"正在檢測當前狀態,請稍候...",
            parse_mode='Markdown'
        )
        
    except ValueError as e:
        await update.message.reply_text(f"❌ {str(e)}")
    except Exception as e:
        logger.error(f"添加訂單失敗: {e}")
        await update.message.reply_text(
            f"❌ 添加訂單失敗: {str(e)}\n\n"
            f"請檢查 URL 是否正確,或稍後再試"
        )

async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """處理錯誤"""
    logger.error(f"Update {update} caused error {context.error}")


# ==================== 主程式 ====================

def main():
    """主函數"""
    
    # 從環境變數或配置檔案讀取 Bot Token
    config_mgr = ConfigManager()
    config = config_mgr.config
    
    bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
    if not bot_token:
        bot_token = config.get('notifications', {}).get('telegram', {}).get('bot_token')
    
    if not bot_token:
        print("❌ 錯誤: 未設定 TELEGRAM_BOT_TOKEN")
        print("   請設定環境變數或在 config.json 中配置")
        return
    
    # 創建 Application
    application = Application.builder().token(bot_token).build()
    
    # 設定 Bot 實例到訂單管理器
    order_manager.set_bot(application.bot)
    
    # 註冊指令處理器
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("status", status_command))
    application.add_handler(CommandHandler("stop", stop_command))
    
    # 註冊按鈕處理器
    application.add_handler(CallbackQueryHandler(button_handler))
    
    # 註冊訊息處理器
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # 註冊錯誤處理器
    application.add_error_handler(error_handler)
    
    # 啟動 Bot
    print("🚀 Uber Eats 訂單追蹤 Bot 已啟動!")
    print("📱 請在 Telegram 中傳送訂單 URL 給 Bot")
    print("🛑 按 Ctrl+C 停止")
    
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Bot 已停止")
    except Exception as e:
        print(f"\n❌ 錯誤: {e}")
        import traceback
        traceback.print_exc()

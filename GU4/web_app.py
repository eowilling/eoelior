# -*- coding: utf-8 -*-
"""
台股智能分析系統 - Web UI
"""
import os
import sys
import json
import threading
from flask import Flask, render_template, request, jsonify, send_from_directory
from datetime import datetime

from src.config import get_config
from src.utils import setup_logger, get_taiwan_time
from data_provider import DataFetcherManager, YFinanceTaiwanFetcher
from src.analyzer import StockAnalyzer
from src.news_fetcher import NewsFetcher
from src.stock_picker import StockPicker
from src.notifier import NotificationManager
from main import TaiwanStockAnalysisApp

logger = setup_logger(__name__)

app = Flask(__name__, template_folder='templates', static_folder='static')

# 全局變量存儲分析狀態
analysis_status = {
    'running': False,
    'progress': 0,
    'current_stock': '',
    'total_stocks': 0,
    'results': []
}

# 全局應用實例 (延遲載入)
app_instance = None


@app.route('/')
def index():
    """首頁"""
    return render_template('index.html')


@app.route('/api/config', methods=['GET'])
def get_config_api():
    """獲取當前配置"""
    try:
        config = get_config()
        return jsonify({
            'success': True,
            'config': {
                'stock_list': ','.join(config.stock_list) if config.stock_list else '',
                'auto_pick_method': os.getenv('AUTO_PICK_METHOD', 'institutional'),
                'auto_pick_count': int(os.getenv('AUTO_PICK_COUNT', 5)),
                'analysis_delay': int(os.getenv('ANALYSIS_DELAY', 3)),
                'telegram_enabled': bool(config.telegram_bot_token and config.telegram_chat_id),
                'email_enabled': bool(config.email_sender and config.email_password)
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/api/config', methods=['POST'])
def update_config_api():
    """更新配置"""
    try:
        data = request.json
        
        # 讀取現有 .env 內容
        env_path = '.env'
        with open(env_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # 更新配置
        new_lines = []
        updated = set()
        
        for line in lines:
            if line.strip() and not line.strip().startswith('#'):
                key = line.split('=')[0].strip()
                
                if key == 'STOCK_LIST' and 'stock_list' in data:
                    new_lines.append(f"STOCK_LIST={data['stock_list']}\n")
                    updated.add('stock_list')
                elif key == 'AUTO_PICK_METHOD' and 'auto_pick_method' in data:
                    new_lines.append(f"AUTO_PICK_METHOD={data['auto_pick_method']}\n")
                    updated.add('auto_pick_method')
                elif key == 'AUTO_PICK_COUNT' and 'auto_pick_count' in data:
                    new_lines.append(f"AUTO_PICK_COUNT={data['auto_pick_count']}\n")
                    updated.add('auto_pick_count')
                elif key == 'ANALYSIS_DELAY' and 'analysis_delay' in data:
                    new_lines.append(f"ANALYSIS_DELAY={data['analysis_delay']}\n")
                    updated.add('analysis_delay')
                elif key == 'GEMINI_API_KEY' and 'gemini_api_key' in data:
                    new_lines.append(f"GEMINI_API_KEY={data['gemini_api_key']}\n")
                    updated.add('gemini_api_key')
                elif key == 'TELEGRAM_BOT_TOKEN' and 'telegram_bot_token' in data:
                    new_lines.append(f"TELEGRAM_BOT_TOKEN={data['telegram_bot_token']}\n")
                    updated.add('telegram_bot_token')
                elif key == 'TELEGRAM_CHAT_ID' and 'telegram_chat_id' in data:
                    new_lines.append(f"TELEGRAM_CHAT_ID={data['telegram_chat_id']}\n")
                    updated.add('telegram_chat_id')
                else:
                    new_lines.append(line)
            else:
                new_lines.append(line)
        
        # 寫回檔案
        with open(env_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        
        return jsonify({'success': True, 'message': '配置已更新'})
    
    except Exception as e:
        logger.error(f"更新配置失敗: {e}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/search_stock', methods=['POST'])
def search_stock():
    """搜尋單檔股票"""
    try:
        data = request.json
        stock_code = data.get('code')
        
        if not stock_code:
            return jsonify({'success': False, 'error': '未提供股票代碼'})
            
        logger.info(f"搜尋股票: {stock_code}")
        
        # 使用 app_instance 的 fetcher_manager
        # 注意：這裡假設 app_instance 已經在 run_analysis 以外被初始化
        # 為了安全起見，我們在這裡檢查並初始化
        global app_instance
        if app_instance is None:
            from main import TaiwanStockAnalysisApp
            app_instance = TaiwanStockAnalysisApp()
            
        quote = app_instance.fetcher_manager.get_realtime_quote(stock_code)
        
        if quote:
            # 強制將名稱轉為繁體中文 (如果有 twstock)
            try:
                import twstock
                if stock_code in twstock.codes:
                    quote['name'] = twstock.codes[stock_code].name
            except:
                pass
            return jsonify({'success': True, 'data': quote})
        else:
            return jsonify({'success': False, 'error': '找不到此股票或無法獲取數據'})
            
    except Exception as e:
        logger.error(f"搜尋股票失敗: {e}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/test_notification', methods=['POST'])
def test_notification():
    """測試通知"""
    try:
        from src.notifier import NotificationManager
        notifier = NotificationManager()
        
        # 簡單消息
        msg = "🔔 這是一則 GU4 系統測試通知。\n如果您收到此訊息，代表您的 Telegram 設定正確！"
        
        results = notifier.send_simple_message(msg)
        
        # 檢查結果
        success = results.get('telegram', False) or results.get('email', False)
        
        if success:
            return jsonify({'success': True, 'message': '測試訊息發送成功'})
        else:
            return jsonify({'success': False, 'error': '發送失敗，請檢查 Token 與 Chat ID'})
            
    except Exception as e:
        logger.error(f"測試通知失敗: {e}")
        return jsonify({'success': False, 'error': str(e)})


@app.route('/api/analyze', methods=['POST'])
def start_analysis():
    """開始分析"""
    global analysis_status, app_instance
    
    if analysis_status['running']:
        return jsonify({'success': False, 'error': '分析正在進行中'})
    
    try:
        data = request.json
        stock_list = data.get('stock_list', '')
        use_auto_pick = data.get('use_auto_pick', False)
        auto_pick_method = data.get('auto_pick_method', 'institutional')
        auto_pick_count = int(data.get('auto_pick_count', 5))
        
        # 初始化實例
        if app_instance is None:
            from main import TaiwanStockAnalysisApp
            app_instance = TaiwanStockAnalysisApp()
            
        # 重置狀態
        analysis_status = {
            'running': True,
            'progress': 0,
            'current_stock': '',
            'total_stocks': 0,
            'results': [],
            'error': None
        }
        
        # 在背景執行分析
        thread = threading.Thread(
            target=run_analysis_worker,
            args=(stock_list, use_auto_pick, auto_pick_method, auto_pick_count)
        )
        thread.daemon = True
        thread.start()
        
        return jsonify({'success': True, 'message': '分析已開始'})
    
    except Exception as e:
        analysis_status['running'] = False
        logger.error(f"啟動分析失敗: {e}")
        return jsonify({'success': False, 'error': str(e)})


def run_analysis_worker(stock_list, use_auto_pick, auto_pick_method, auto_pick_count):
    """分析工作執行緒"""
    global analysis_status, app_instance
    
    try:
        if app_instance is None:
            from main import TaiwanStockAnalysisApp
            app_instance = TaiwanStockAnalysisApp()
            
        # 確定股票清單
        if use_auto_pick or not stock_list.strip():
            stocks = app_instance.stock_picker.get_recommended_stocks(
                auto_pick_method, 
                auto_pick_count
            )
        else:
            stocks = [s.strip() for s in stock_list.split(',') if s.strip()]
        
        analysis_status['total_stocks'] = len(stocks)
        
        # 分析每一支股票
        for i, stock_code in enumerate(stocks, 1):
            analysis_status['current_stock'] = stock_code
            analysis_status['progress'] = int((i / len(stocks)) * 100)
            
            result = app_instance.analyze_single_stock(stock_code)
            
            if result['success']:
                quote_data = result.get('quote') or {}
                analysis_status['results'].append({
                    'code': result['code'],
                    'name': result['name'],
                    'price': quote_data.get('price'),
                    'change_pct': quote_data.get('change_pct'),
                    'volume': quote_data.get('volume'),
                    'ma_status': result['ma_status'],
                    'technical': result['technical'],
                    'analysis': result['analysis']
                })
            else:
                analysis_status['results'].append({
                    'code': result.get('code', stock_code),
                    'name': result.get('name', 'Unknown'),
                    'price': 0,
                    'change_pct': 0,
                    'volume': 0,
                    'ma_status': {},
                    'technical': {},
                    'analysis': f"❌ 分析失敗: {result.get('error', '未知錯誤')}"
                })
        
        analysis_status['progress'] = 100
        analysis_status['running'] = False
        
        # 發送成交通知 (包含詳細結果)
        try:
            from src.notifier import NotificationManager
            notifier = NotificationManager()
            if analysis_status['results']:
                report_content = f"✅ 分析完成！共 {len(analysis_status['results'])} 支股票\n\n"
                
                for r in analysis_status['results']:
                    # 判斷漲跌符號
                    change = r.get('change_pct', 0)
                    arrow = "▲" if change > 0 else "▼" if change < 0 else "—"
                    
                    # 擷取分析結論 (如果是 Markdown 格式)
                    analysis_text = r.get('analysis', '')
                    summary = "無分析建議"
                    if "句話結論" in analysis_text:
                        # 嘗試找出「一句話結論」後面的內容
                        lines = analysis_text.split('\n')
                        for idx, line in enumerate(lines):
                            if "句話結論" in line and idx + 1 < len(lines):
                                # 找下一個非空行
                                for k in range(idx + 1, min(idx + 5, len(lines))):
                                    if lines[k].strip():
                                        summary = lines[k].strip().replace('*', '') # 去掉 Markdown 星號
                                        break
                                break
                    
                    report_content += f"📊 {r['name']} ({r['code']})\n"
                    report_content += f"   現價: {r['price']} | 漲跌: {arrow} {abs(change):.2f}%\n"
                    report_content += f"   💡 結論: {summary}\n"
                    report_content += "--------------------------------\n"
                
                report_content += "\n⚠️ 本報告僅供參考，不構成投資建議。"
                
                notifier.send_analysis_report(
                    title="Gu4tw 智能分析報告",
                    content=report_content
                )
                logger.info("✅ 詳細通知已發送")
        except Exception as e:
            logger.warning(f"通知發送失敗: {e}")
            
    except Exception as e:
        logger.error(f"分析失敗: {e}")
        analysis_status['error'] = str(e)
        analysis_status['running'] = False


@app.route('/api/status', methods=['GET'])
def get_status():
    """獲取分析狀態"""
    return jsonify(analysis_status)


@app.route('/api/stock-picker/preview', methods=['POST'])
def preview_stock_picker():
    """預覽智能選股結果"""
    try:
        data = request.json
        method = data.get('method', 'institutional')
        count = int(data.get('count', 5))
        
        picker = StockPicker()
        stocks = picker.get_recommended_stocks(method, count)
        
        return jsonify({
            'success': True,
            'stocks': stocks,
            'method': method,
            'count': count
        })
    
    except Exception as e:
        logger.error(f"選股預覽失敗: {e}")
        return jsonify({'success': False, 'error': str(e)})


@app.route('/api/system_status', methods=['GET'])
def system_status():
    """系統連線狀態檢查"""
    now = get_taiwan_time()
    weekdays = ['一', '二', '三', '四', '五', '六', '日']
    chinese_day = f"星期{weekdays[now.weekday()]}"
    
    status = {
        'ai': False,
        'email': False,
        'telegram': False,
        'time': now.strftime('%Y-%m-%d') + f" ({chinese_day})"
    }
    
    config = get_config()
    
    # 1. Check AI (Gemini) simple ping
    try:
        if config.gemini_api_key:
            # 只做基礎設定測試，避免 list_models 因超時或地區限制報錯
            import google.generativeai as genai
            genai.configure(api_key=config.gemini_api_key)
            status['ai'] = True # 有 Key 且能配置即視為初步連線成功
    except Exception as e:
        logger.warning(f"AI 連線檢查基本配置失敗: {e}")

    # 2. Check Telegram
    try:
        if config.telegram_bot_token:
            import requests
            url = f"https://api.telegram.org/bot{config.telegram_bot_token}/getMe"
            resp = requests.get(url, timeout=5)
            if resp.status_code == 200:
                status['telegram'] = True
    except Exception as e:
        logger.warning(f"Telegram 連線檢查失敗: {e}")
        
    # 3. Check Email (SMTP)
    try:
        if config.email_sender and config.email_password:
            import smtplib
            # 先嘗試 587 (TLS)，如果失敗 (Render 常用環境可能封鎖) 則嘗試 465 (SSL)
            try:
                with smtplib.SMTP('smtp.gmail.com', 587, timeout=3) as server:
                    server.starttls()
                    server.login(config.email_sender, config.email_password)
                    status['email'] = True
            except Exception:
                # Fallback to 465
                try:
                    with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=3) as server:
                        server.login(config.email_sender, config.email_password)
                        status['email'] = True
                except Exception as e2:
                    logger.warning(f"Email 連線檢查(587/465)皆失敗: {e2}")
        
    return jsonify(status)


@app.route('/health')
def health():
    """健康檢查"""
    return jsonify({
        'status': 'ok',
        'time': get_taiwan_time().isoformat()
    })


if __name__ == '__main__':
    print("=" * 80)
    print("台股智能分析系統 - Web UI")
    print("=" * 80)
    print(f"啟動時間: {get_taiwan_time().strftime('%Y-%m-%d %H:%M:%S')}")
    print("伺服器地址: http://localhost:5000")
    print("=" * 80)
    print()
    
    # 啟動 Flask
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)

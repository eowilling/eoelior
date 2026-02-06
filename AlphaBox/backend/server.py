import os
import sys
import logging
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
import warnings
from urllib3.exceptions import InsecureRequestWarning

# 禁用所有 SSL 安全警告 (針對無憑證抓取)
warnings.simplefilter('ignore', InsecureRequestWarning)
warnings.simplefilter('ignore', UserWarning)

# 設置日誌級別為 ERROR，減少開發者資訊輸出
logging.basicConfig(level=logging.ERROR)
logging.getLogger('werkzeug').setLevel(logging.ERROR)
logging.getLogger('urllib3').setLevel(logging.ERROR)
logging.getLogger('yfinance').setLevel(logging.ERROR)

# 調整路徑以導入 logic 資料夾中的內容
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGIC_DIR = os.path.join(ROOT_DIR, 'backend', 'logic')
GU4_DIR = os.path.join(LOGIC_DIR, 'gu4')

if ROOT_DIR not in sys.path: sys.path.insert(0, ROOT_DIR)
if LOGIC_DIR not in sys.path: sys.path.insert(0, LOGIC_DIR)
if GU4_DIR not in sys.path: sys.path.insert(0, GU4_DIR)

from backend.db import get_watchlist, add_to_watchlist, remove_from_watchlist, add_alert, get_active_alerts, get_alert_history, deactivate_alert
from backend.logic.crypto_sentinel import CryptoSentinel

# 導入 GU4 核心組件
from src.analyzer import StockAnalyzer
from data_provider import DataFetcherManager, YFinanceTaiwanFetcher
from data_provider.finmind_tw import FinMindTaiwanFetcher
from data_provider.twstock_tw import TwstockFetcher
from src.stock_picker import StockPicker
from src.notifier import NotificationManager

app = Flask(__name__, 
            template_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'templates'),
            static_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static'))
CORS(app)

crypto_engine = CryptoSentinel()
stock_analyzer = StockAnalyzer()
stock_fetcher = DataFetcherManager()
# 優先使用 Twstock (已修正 SSL 與抓取邏輯，最穩定)
stock_fetcher.add_fetcher(TwstockFetcher())
stock_fetcher.add_fetcher(YFinanceTaiwanFetcher())
stock_fetcher.add_fetcher(FinMindTaiwanFetcher())
stock_picker = StockPicker()
notifier = NotificationManager()

@app.route('/')
def index():
    return render_template('index.html')

# --- Watchlist API ---

@app.route('/api/watchlist', methods=['GET'])
def list_watchlist():
    asset_type = request.args.get('type')
    return jsonify({'success': True, 'data': get_watchlist(asset_type)})

@app.route('/api/watchlist', methods=['POST'])
def add_watchlist():
    data = request.json
    res = add_to_watchlist(data['asset_type'], data['symbol'], data.get('name'))
    return jsonify({'success': res})

@app.route('/api/watchlist/<int:item_id>', methods=['DELETE'])
def delete_watchlist(item_id):
    remove_from_watchlist(item_id)
    return jsonify({'success': True})

# --- Analysis API ---

@app.route('/api/analyze/crypto', methods=['POST'])
def analyze_crypto():
    data = request.json
    symbol = data.get('symbol', 'BTC/USDT').upper()
    if '/' not in symbol: symbol += '/USDT'
    try:
        symbol = data.get('symbol', 'BTC/USDT').upper()
        if '/' not in symbol: symbol += '/USDT'
        
        result = crypto_engine.analyze(symbol)
        
        if "error" in result:
            return jsonify({'success': False, 'error': result["error"]})
            
        # 轉換為前端預期的格式
        response_data = {
            'success': True, 
            'data': {
                'symbol': symbol,
                'sentiment': result.get('sentiment', 'NEUTRAL'),
                'ai_analysis': result.get('ai_analysis', '暫無分析內容')
            }
        }
        
        # 發送 Telegram 通知
        notifier.send_analysis_report(
            title=f"Crypto 分析報告: {symbol}",
            content=result.get('ai_analysis', '暫無分析內容')
        )
        
        return jsonify(response_data)
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/analyze/stock', methods=['POST'])
def analyze_stock():
    symbol = request.json.get('symbol')
    try:
        # 1. 獲取日線數據
        df, source = stock_fetcher.get_daily_data(symbol, days=60)
        if df is None or df.empty:
            return jsonify({'success': False, 'error': f'無法獲取股票 {symbol} 歷史數據'})
        
        # 2. 獲取即時報價
        quote = stock_fetcher.get_realtime_quote(symbol)
        
        # 3. 準備技術數據 (參考 GU4 main.py 邏輯)
        latest_data = df.iloc[-1].to_dict()
        
        # Fallback quote if real-time fails
        if not quote:
            quote = {
                'code': symbol,
                'name': symbol,
                'price': latest_data.get('close'),
                'change_pct': 0,
                'volume': latest_data.get('volume')
            }

        technical_data = {
            'quote': quote,
            'latest': latest_data,
            'history': df.tail(20).to_dict('records')
        }
        
        # 4. 調用 AI 分析
        stock_name = quote.get('name', symbol)
        analysis_report = stock_analyzer.analyze_stock(symbol, stock_name, technical_data)
        
        # 簡易判斷情緒
        sentiment = "WATCH"
        if "買入" in analysis_report or "BUY" in analysis_report.upper(): sentiment = "BUY"
        elif "賣出" in analysis_report or "SELL" in analysis_report.upper(): sentiment = "SELL"

        response_data = {
            'success': True,
            'data': {
                'symbol': symbol,
                'name': stock_name,
                'sentiment': sentiment,
                'ai_analysis': analysis_report,
                'price': quote.get('price'),
                'change_pct': quote.get('change_pct')
            }
        }
        
        # 發送 Telegram 通知
        notifier.send_analysis_report(
            title=f"台股分析報告: {symbol} {stock_name}",
            content=analysis_report
        )

        return jsonify(response_data)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/quote', methods=['POST'])
def get_quote():
    """獲取不帶 AI 分析的詳細報價 (含開盤/成交量/最高/最低)"""
    data = request.json
    symbol = data.get('symbol', '').upper()
    if not symbol: return jsonify({'success': False, 'error': '請輸入代號'})

    try:
        # 簡易判斷類型
        is_crypto = not (symbol.isdigit() or '.' in symbol)
        
        if is_crypto:
            # 加密貨幣邏輯
            pair = symbol if '/' in symbol else f"{symbol}/USDT"
            # 獲取最近 2 根 K 線以計算漲跌幅
            df = crypto_engine.fetch_data(pair, limit=2)
            if df is not None and not df.empty:
                latest = df.iloc[-1]
                prev = df.iloc[-2] if len(df) > 1 else latest
                
                change_pct = ((latest['close'] - prev['close']) / prev['close'] * 100) if prev['close'] else 0
                
                return jsonify({
                    'success': True,
                    'type': 'crypto',
                    'data': {
                        'symbol': pair,
                        'price': float(latest['close']),
                        'open': float(latest['open']),
                        'high': float(latest['high']),
                        'low': float(latest['low']),
                        'volume': float(latest['volume']),
                        'change_pct': round(float(change_pct), 2)
                    }
                })
        else:
            # 台股邏輯
            quote = stock_fetcher.get_realtime_quote(symbol)
            if quote:
                return jsonify({
                    'success': True,
                    'type': 'stock',
                    'data': {
                        'symbol': symbol,
                        'name': quote.get('name'),
                        'price': quote.get('price'),
                        'open': quote.get('open'),
                        'high': quote.get('high'),
                        'low': quote.get('low'),
                        'volume': quote.get('volume'),
                        'change_pct': quote.get('change_pct')
                    }
                })
        
        return jsonify({'success': False, 'error': '找不到該標的'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    """獲取智能選股推薦"""
    method = request.args.get('method', 'institutional')
    count = int(request.args.get('count', 5))
    try:
        # StockPicker 的方法名是 get_recommended_stocks
        codes = stock_picker.get_recommended_stocks(method=method, top_n=count)
        
        # 為了前端展示，獲取這些代碼的基本資訊
        results = []
        for code in codes:
            quote = stock_fetcher.get_realtime_quote(code)
            results.append({
                'code': code,
                'name': quote.get('name', '台股') if quote else '台股',
                'change_pct': quote.get('change_pct', 0) if quote else 0,
                'rank': len(results) + 1,
                'reason': method.capitalize()
            })
        return jsonify({'success': True, 'data': results})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

# --- Notification & Alert API ---

@app.route('/api/status')
def get_status():
    """系統連線狀態檢查"""
    # 檢查 Gemini (簡單檢查 Key 是否存在)
    from src.config import get_config
    config = get_config()
    gemini_ok = bool(config.gemini_api_key)
    
    # 檢查 Telegram
    tele_ok = notifier.check_connectivity()
    
    return jsonify({
        'gemini': gemini_ok,
        'telegram': tele_ok
    })

@app.route('/api/alerts', methods=['GET'])
def list_alerts():
    return jsonify({'success': True, 
                    'active': get_active_alerts(),
                    'history': get_alert_history()})

@app.route('/api/alerts', methods=['POST'])
def create_alert():
    data = request.json
    aid = add_alert(data['asset_type'], data['symbol'], data['condition'], data['target_price'])
    return jsonify({'success': True, 'id': aid})

@app.route('/api/check-alert', methods=['POST'])
def check_alert():
    """檢查價格是否觸發警報,若觸發則發送通知"""
    try:
        from backend.logic.crypto_notifier import send_alert
        
        data = request.json
        symbol = data.get('symbol')
        price = data.get('price')
        asset_type = data.get('asset_type', 'crypto')
        
        # 獲取該標的的所有活躍警報
        alerts = get_active_alerts()
        triggered_alerts = []
        
        for alert in alerts:
            if alert['symbol'].upper() != symbol.upper():
                continue
                
            triggered = False
            if alert['condition'] == 'above' and price >= alert['target_price']:
                triggered = True
            elif alert['condition'] == 'below' and price <= alert['target_price']:
                triggered = True
            
            if triggered:
                # 發送 Telegram 通知
                send_alert(symbol, price, alert['condition'], alert['target_price'])
                # 停用警報
                deactivate_alert(alert['id'])
                triggered_alerts.append(alert)
        
        return jsonify({
            'success': True,
            'triggered': len(triggered_alerts) > 0,
            'alerts': triggered_alerts
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/test-notification', methods=['POST'])
def test_notification():
    """發送測試通知到 Telegram"""
    try:
        from backend.logic.crypto_notifier import send_alert
        
        success = send_alert(
            symbol="AlphaBox 系統測試",
            price=0.0,
            condition="test",
            target_price=0.0
        )
        
        if success:
            return jsonify({
                'success': True,
                'message': '✅ 測試通知已成功發送到 Telegram!'
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Telegram 發送失敗,請檢查 .env 配置'
            })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(port=5055, debug=True)

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


@app.route('/api/analyze', methods=['POST'])
def start_analysis():
    """開始分析"""
    global analysis_status
    
    if analysis_status['running']:
        return jsonify({'success': False, 'error': '分析正在進行中'})
    
    try:
        data = request.json
        stock_list = data.get('stock_list', '')
        use_auto_pick = data.get('use_auto_pick', False)
        auto_pick_method = data.get('auto_pick_method', 'institutional')
        auto_pick_count = int(data.get('auto_pick_count', 5))
        
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
            target=run_analysis,
            args=(stock_list, use_auto_pick, auto_pick_method, auto_pick_count)
        )
        thread.daemon = True
        thread.start()
        
        return jsonify({'success': True, 'message': '分析已開始'})
    
    except Exception as e:
        analysis_status['running'] = False
        logger.error(f"啟動分析失敗: {e}")
        return jsonify({'success': False, 'error': str(e)})


def run_analysis(stock_list, use_auto_pick, auto_pick_method, auto_pick_count):
    """執行分析（背景執行）"""
    global analysis_status
    
    try:
        # 初始化系統
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
        
        # 分析每支股票
        for i, stock_code in enumerate(stocks, 1):
            analysis_status['current_stock'] = stock_code
            analysis_status['progress'] = int((i / len(stocks)) * 100)
            
            result = app_instance.analyze_single_stock(stock_code)
            
            if result['success']:
                analysis_status['results'].append({
                    'code': result['code'],
                    'name': result['name'],
                    'price': result['quote'].get('price'),
                    'change_pct': result['quote'].get('change_pct'),
                    'volume': result['quote'].get('volume'),
                    'ma_status': result['ma_status'],
                    'technical': result['technical'],
                    'analysis': result['analysis']
                })
            else:
                # 錯誤處理：也將失敗結果加入，以便前端顯示錯誤
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
        
        # 發送通知
        try:
            notifier = NotificationManager()
            if analysis_status['results']:
                summary = f"✅ 分析完成！共 {len(analysis_status['results'])} 支股票\n\n"
                for r in analysis_status['results'][:5]:  # 只顯示前5支
                    summary += f"📊 {r['symbol']} {r['name']}\n"
                    summary += f"   價格: {r['price']}\n"
                    summary += f"   漲跌: {r['change']:+.2f}%\n\n"
                
                notifier.send_analysis_report(
                    title="台股智能分析報告",
                    content=summary
                )
                logger.info("✅ 通知已發送")
        except Exception as e:
            logger.warning(f"通知發送失敗: {e}")
        
    except Exception as e:
        logger.error(f"分析執行失敗: {e}")
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

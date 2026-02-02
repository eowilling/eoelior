from flask import Flask, render_template, request, jsonify
from sentinel import CryptoSentinel
import os

# 設定 template 資料夾路徑
template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'templates'))
static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
sentinel = CryptoSentinel()

@app.route('/')
def index():
    return render_template('index.html')

# --- Start Monitor ---
from database import init_db, add_alert, get_alerts, delete_alert
from monitor import monitor
init_db()
monitor.start()

# --- Alert API ---
@app.route('/api/alerts', methods=['GET'])
def list_alerts():
    return jsonify({'success': True, 'data': get_alerts()})

@app.route('/api/alerts', methods=['POST'])
def create_alert():
    data = request.json
    try:
        aid = add_alert(data['symbol'], data['condition'], float(data['target_price']))
        return jsonify({'success': True, 'id': aid})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/alerts/<int:alert_id>', methods=['DELETE'])
def remove_alert(alert_id):
    delete_alert(alert_id)
    return jsonify({'success': True})

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    symbol = data.get('symbol', 'BTC/USDT').upper()
    if '/' not in symbol:
        symbol += '/USDT'
        
    try:
        result = sentinel.analyze(symbol)
        if "error" in result:
             return jsonify({'success': False, 'error': result['error']})
        return jsonify({'success': True, 'data': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    print("啟動 CryptoSentinel Web UI...")
    print("請訪問: http://127.0.0.1:5001")
    app.run(host='0.0.0.0', port=5001, debug=True)

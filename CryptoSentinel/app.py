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

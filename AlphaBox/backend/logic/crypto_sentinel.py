import ccxt
import pandas as pd
import numpy as np
import sys
import logging
import os
from pathlib import Path
from dotenv import load_dotenv

# 載入環境變數 (遍歷可能的 .env 位置)
ROOT_DIR = Path(__file__).parent.parent.parent
possible_env_paths = [
    ROOT_DIR / 'backend' / 'logic' / 'gu4' / '.env',
    ROOT_DIR / 'backend' / '.env',
    ROOT_DIR / '.env',
]

env_path = None
for p in possible_env_paths:
    if p.exists():
        env_path = p
        break

if env_path:
    load_dotenv(dotenv_path=env_path)
    # logger.info(f"已從 {env_path} 載入環境變數")

# 設定日誌
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

try:
    import google.generativeai as genai
except ImportError:
    genai = None

class CryptoSentinel:
    def __init__(self, exchange_id='binance'):
        self.exchange_id = exchange_id
        try:
            self.exchange = getattr(ccxt, exchange_id)()
        except AttributeError:
            logger.error(f"Exchange {exchange_id} not found in ccxt.")
            sys.exit(1)
            
        # Init AI
        self.gemini_key = os.getenv('GEMINI_API_KEY')
        if self.gemini_key and genai:
            genai.configure(api_key=self.gemini_key)
            self.model = genai.GenerativeModel('gemini-2.0-flash')
        else:
            self.model = None

    def fetch_data(self, symbol='BTC/USDT', timeframe='1d', limit=200):
        """從交易所獲取 K 線數據 (fallback to yfinance)"""
        # 1. Try CCXT (Exchange)
        try:
            # logger.info(f"正在從 {self.exchange_id} 獲取 {symbol} 數據...")
            # 注意: Binance US IP Block 經常導致此處 TimeOut 或 HTTP 451
            ohlcv = self.exchange.fetch_ohlcv(symbol, timeframe, limit=limit)
            df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
            return df
        except Exception as e_ccxt:
            logger.warning(f"CCXT {self.exchange_id} 獲取失敗 (可能因 IP 地區限制): {e_ccxt}")
            
            # 2. Try YFinance (Yahoo Finance)
            try:
                import yfinance as yf
                # Convert 'BTC/USDT' -> 'BTC-USD'
                yf_symbol = symbol.replace('/USDT', '-USD').replace('/', '-')
                logger.info(f"嘗試使用 YFinance 獲取數據: {yf_symbol}")
                
                ticker = yf.Ticker(yf_symbol)
                # period='1y' (approx 365 days > 200 limit)
                history = ticker.history(period="1y", interval="1d")
                
                if len(history) == 0:
                    logger.error("YFinance 返回空數據")
                    return None
                    
                # Format DataFrame to match CCXT structure
                # YF index is Datetime, cols: Open, High, Low, Close, Volume
                df = history.reset_index()
                df = df[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']]
                df.columns = ['timestamp', 'open', 'high', 'low', 'close', 'volume']
                
                # Ensure timestamp is datetime (YF usually returns tz-aware, CCXT uses UTC naive usually, but pandas handles comparison ok)
                # Remove timezone if needed or standardise
                df['timestamp'] = df['timestamp'].dt.tz_localize(None) 
                
                # Filter last N rows
                if len(df) > limit:
                    df = df.iloc[-limit:].reset_index(drop=True)
                    
                return df
                
            except Exception as e_yf:
                logger.error(f"YFinance 獲取失敗: {e_yf}")
                return None

    def calculate_indicators(self, df):
        """計算技術指標 (使用 Pandas 實現，無需 TA-Lib 二進位依賴)"""
        # SMA 50
        df['sma50'] = df['close'].rolling(window=50).mean()
        
        # EMA 7, 21
        df['ema7'] = df['close'].ewm(span=7, adjust=False).mean()
        df['ema21'] = df['close'].ewm(span=21, adjust=False).mean()
        
        # RSI 14
        delta = df['close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / loss
        df['rsi'] = 100 - (100 / (1 + rs))
        
        # MACD (12, 26, 9)
        exp1 = df['close'].ewm(span=12, adjust=False).mean()
        exp2 = df['close'].ewm(span=26, adjust=False).mean()
        df['macd'] = exp1 - exp2
        df['macd_signal'] = df['macd'].ewm(span=9, adjust=False).mean()
        
        # ATR 14 (用於風控)
        high_low = df['high'] - df['low']
        high_close = np.abs(df['high'] - df['close'].shift())
        low_close = np.abs(df['low'] - df['close'].shift())
        ranges = pd.concat([high_low, high_close, low_close], axis=1)
        true_range = np.max(ranges, axis=1)
        df['atr'] = true_range.rolling(window=14).mean()
        
        return df

    def get_ai_analysis(self, result_dict):
        """調用 Gemini 進行 AI 分析"""
        if not self.model:
            return "⚠️ 未配置 GEMINI_API_KEY 或未安裝 google-generativeai，無法進行 AI 分析。"

        prompt = f"""
你是一位頂尖的加密貨幣交易員，請根據以下 CryptoSentinel 系統的數據對 {result_dict['symbol']} 進行深入分析。

# 📊 技術數據
- 價格: {result_dict['price']}
- 系統評分: {result_dict['score']}/4 (>=3 為買入信號)
- 系統建議: {result_dict['sentiment']}
- 趨勢 (SMA50): {'✅ 多頭' if result_dict['indicators']['trend']['passed'] else '❌ 空頭/盤整'} ({result_dict['indicators']['trend']['value']:.2f})
- 均線 (EMA7/21): {'✅ 黃金交叉' if result_dict['indicators']['ema']['passed'] else '❌ 未交叉'}
- RSI (14): {result_dict['indicators']['rsi']['value']:.2f} ({'✅ 超賣區' if result_dict['indicators']['rsi']['passed'] else '中性/超買區'})
- MACD: {'✅ 多頭動能' if result_dict['indicators']['macd']['passed'] else '❌ 動能不足'}

# 🛡️ 風控建議 (ATR)
- 止損位 (SL): {result_dict['risk']['stop_loss']:.4f}
- 止盈位 (TP): {result_dict['risk']['take_profit']:.4f}

# 📋 分析要求
請用專業但口語化的**繁體中文**，提供一份約 300 字的短評：
1. **🔍 趨勢解讀**：目前市場的情緒與主力動向。
2. **💡 關鍵點評**：針對上述指標中，哪一個最值得關注？（例如 RSI 是否過低？MACD 是否背離？）
3. **💰 操作建議**：
   - 如果系統建議 WAIT：分析還缺什麼條件才能進場？
   - 如果系統建議 BUY：確認進場理由，並強調止損重要性。
4. **🌟 最終進場結論**：
   - **最佳進場時機**：明確指出該在什麼價位或訊號出現時進場。
   - **核心進場原因**：總結為什麼這個時機最理想。
5. **⚠️ 風險提示**：針對該幣種或目前大盤的一句話提醒。

請使用 Markdown 格式，適當使用 emoji。
"""
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(f"AI 生成失敗: {e}")
            return f"❌ AI 分析暫時無法使用: {e}"

    def check_signals(self, df, symbol):
        """根據模組五策略檢查信號，返回分析結果字典"""
        if df is None or len(df) < 50:
            return {"error": "數據不足"}

        latest = df.iloc[-1]
        
        # 1. 趨勢條件: 價格 > 50日 SMA
        cond_trend = bool(latest['close'] > latest['sma50'])
        
        # 2. EMA 交叉: 7日 EMA > 21日 EMA
        cond_ema = bool(latest['ema7'] > latest['ema21'])
        
        # 3. 超賣反彈: RSI < 40
        cond_rsi = bool(latest['rsi'] < 40)
        
        # 4. 動能: MACD > Signal
        cond_macd = bool(latest['macd'] > latest['macd_signal'])
        
        # 5. 成交量: > 20日均量 * 1.5
        vol_ma20 = float(df['volume'].rolling(window=20).mean().iloc[-1])
        # Ensure volume is treated as float/int for comparison, convert to native float
        current_volume = float(latest['volume'])
        cond_vol = bool(current_volume > (vol_ma20 * 1.5))

        factors = [cond_trend, cond_ema, cond_rsi, cond_macd]
        score = int(sum(factors))
        
        atr = float(latest['atr'])
        stop_loss = float(latest['close'] - (2 * atr))
        take_profit = float(latest['close'] + (3 * atr))
        
        sentiment = "WAIT"
        if score >= 3:
            sentiment = "BUY"
            
        result = {
            "symbol": symbol,
            "price": float(latest['close']),
            "score": score,
            "sentiment": sentiment,
            "indicators": {
                "trend": {"passed": cond_trend, "value": float(latest['sma50'])},
                "ema": {"passed": cond_ema, "ema7": float(latest['ema7']), "ema21": float(latest['ema21'])},
                "rsi": {"passed": cond_rsi, "value": float(latest['rsi'])},
                "macd": {"passed": cond_macd, "value": float(latest['macd']), "signal": float(latest['macd_signal'])},
                "volume": {"passed": cond_vol, "value": current_volume, "ma20": vol_ma20}
            },
            "risk": {
                "atr": atr,
                "stop_loss": stop_loss,
                "take_profit": take_profit
            }
        }
        
        # 觸發 AI 分析
        result['ai_analysis'] = self.get_ai_analysis(result)
        return result

    def analyze(self, symbol='BTC/USDT'):
        """執行完整分析並返回結果"""
        df = self.fetch_data(symbol)
        if df is not None:
            df = self.calculate_indicators(df)
            return self.check_signals(df, symbol)
        return {"error": "無法獲取數據"}

    def run(self, symbol='BTC/USDT'):
        # 保持舊版 CLI 兼容性，但改為調用 analyze 並列印
        result = self.analyze(symbol)
        if "error" in result:
            print(result["error"])
            return

        print(f"\n======== 【{result['symbol']}】 技術分析報告 ========")
        print(f"當前價格: {result['price']:.4f}")
        print(f"----------------------------------------")
        inds = result['indicators']
        print(f"1. [趨勢] 價格 > SMA50 ({inds['trend']['value']:.4f}): {'✅ YES' if inds['trend']['passed'] else '❌ NO'}")
        print(f"2. [均線] EMA7 > EMA21: {'✅ YES' if inds['ema']['passed'] else '❌ NO'}")
        print(f"3. [RSI ] RSI ({inds['rsi']['value']:.2f}) < 40: {'✅ YES' if inds['rsi']['passed'] else '❌ NO'}")
        print(f"4. [MACD] MACD > Signal: {'✅ YES' if inds['macd']['passed'] else '❌ NO'}")
        print(f"5. [量能] 爆量 (>1.5倍均量): {'✅ YES' if inds['volume']['passed'] else '❌ NO'}")
        print(f"----------------------------------------")
        
        if result['sentiment'] == "BUY":
            print(f"📢 綜合判定: 【 強力買入信號 (BUY) 】 (得分: {result['score']}/4)")
            print(f"🛡️ 建議風控 (ATR基礎):")
            print(f"   - 止損 (Stop Loss): {result['risk']['stop_loss']:.4f} (-2 ATR)")
            print(f"   - 止盈 (Take Profit): {result['risk']['take_profit']:.4f} (+3 ATR)")
        else:
            print(f"👀 綜合判定: 【 觀望 (WAIT) 】 (得分: {result['score']}/4)")
            
        print("========================================\n")



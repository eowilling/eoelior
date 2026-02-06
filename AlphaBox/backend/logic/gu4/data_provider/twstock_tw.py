
# -*- coding: utf-8 -*-
"""
Twstock 數據源實現
"""
import logging
from typing import Optional, Dict, Any
import pandas as pd
from datetime import datetime, timedelta

try:
    import twstock
except ImportError:
    twstock = None

from data_provider.base import BaseFetcher

logger = logging.getLogger(__name__)

class TwstockFetcher(BaseFetcher):
    """
    Twstock 數據源 (台灣證交所/櫃買中心 直接抓取)
    
    優先級: 3 (備用)
    """
    name = "Twstock"
    priority = 1
    
    def __init__(self):
        if twstock is None:
            # raise ImportError("請安裝 twstock")
            # 改為不強制報錯，因為我們已經改用 direct requests 抓取
            pass
    
    def get_realtime_quote(self, stock_code: str) -> Optional[Dict[str, Any]]:
        """獲取即時報價 (直接請求 MIS API，避開 SSL 驗證問題)"""
        try:
            import requests
            import time
            import random
            
            # 判斷上市(tse)或上櫃(otc)
            # 簡單判斷: 6開頭通常是上櫃(不完全準確，但在沒有完整對照表下使用)
            # 更好的方式是都試試看
            
            # 建立 timestamp
            ts = int(time.time() * 1000)
            
            # 嘗試上市 (tse) 和 上櫃 (otc)
            markets = ['tse', 'otc']
            
            for market in markets:
                # 目標 URL (台灣證交所行情資訊網)
                # ex_ch=tse_2330.tw
                target = f"{market}_{stock_code}.tw"
                url = f"https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch={target}&json=1&delay=0&_={ts}"
                
                try:
                    # 關鍵：加入 User-Agent 模擬瀏覽器，並 verify=False 避開 SSL 驗證問題
                    headers = {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Referer': 'https://mis.twse.com.tw/'
                    }
                    response = requests.get(url, headers=headers, verify=False, timeout=5)
                    
                    if response.status_code == 200:
                        data = response.json()
                        msg_array = data.get('msgArray', [])
                        
                        if msg_array and len(msg_array) > 0:
                            info = msg_array[0]
                            
                            # 檢查是否有有效價格
                            price_str = info.get('z', '-') # 最近成交價
                            if price_str == '-':
                                price_str = info.get('o', '-') # 開盤價
                                
                            if price_str == '-':
                                continue # 換下一個市場試試
                                
                            try:
                                price = float(price_str)
                            except ValueError:
                                continue
                                
                            # 成功獲取！解析數據
                            # y: 昨收, o: 開, h: 高, l: 低, v: 量
                            prev_close = float(info.get('y', 0))
                            open_p = float(info.get('o', price))
                            high = float(info.get('h', price))
                            low = float(info.get('l', price))
                            volume = int(info.get('v', 0))
                            
                            change = price - prev_close
                            change_pct = (change / prev_close * 100) if prev_close else 0
                            
                            name = info.get('n', stock_code)
                            
                            # 雙重確認名稱：如果 API 返回的是代碼或是英文，嘗試用 twstock 庫的對照表修正
                            if name == stock_code or name.isascii():
                                try:
                                    import twstock
                                    if stock_code in twstock.codes:
                                        name = twstock.codes[stock_code].name
                                except:
                                    pass
                            
                            logger.info(f"Twstock (Direct) 成功獲取: {name} {price}")
                            
                            return {
                                'code': stock_code,
                                'name': name,
                                'price': price,
                                'change': round(change, 2),
                                'change_pct': round(change_pct, 2), 
                                'open': open_p,
                                'high': high,
                                'low': low,
                                'volume': volume,
                                'prev_close': prev_close
                            }
                except Exception as e:
                    # 忽略單次連線錯誤，繼續嘗試
                    continue
            
            return None
            
        except Exception as e:
            logger.error(f"Twstock 獲取即時報價失敗: {e}")
            return None

    def get_daily_data(self, stock_code: str, days: int = 30) -> Optional[pd.DataFrame]:
        """直接從 TWSE 官網抓取 CSV 數據 (繞過 SSL 驗證)"""
        try:
            import requests
            import io
            import time
            
            # 獲取當月和上個月數據
            now = datetime.now()
            target_dates = [
                now.strftime("%Y%m01"),
                (now.replace(day=1) - timedelta(days=1)).strftime("%Y%m01")
            ]
            
            all_data = []
            
            for d_str in target_dates:
                url = f"https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=csv&date={d_str}&stockNo={stock_code}"
                try:
                    resp = requests.get(url, verify=False, timeout=10)
                    if resp.status_code == 200:
                        # TWSE CSV 使用 Big5 編碼
                        content = resp.content.decode('big5', errors='ignore')
                        lines = content.split('\n')
                        
                        # 尋找包含 "日期" 的標題行
                        header_idx = -1
                        for i, line in enumerate(lines):
                            if "日期" in line and "收盤價" in line:
                                header_idx = i
                                break
                        
                        if header_idx != -1:
                            # 讀取並清洗
                            clean_lines = []
                            for line in lines[header_idx:]:
                                if line.strip() and not line.startswith('"說明') and not line.startswith('備註'):
                                    clean_lines.append(line)
                            
                            if clean_lines:
                                df_part = pd.read_csv(io.StringIO("\n".join(clean_lines)))
                                df_part = df_part.dropna(subset=['日期'])
                                # 移除欄位名稱中的空格
                                df_part.columns = df_part.columns.str.replace(' ', '')
                                all_data.append(df_part)
                            
                    time.sleep(2)
                except Exception as e:
                    logger.warning(f"抓取 {d_str} 失敗: {e}")
                    continue
            
            if not all_data:
                return None
                
            df = pd.concat(all_data).drop_duplicates()
            
            # 民國轉西元日期
            def convert_date(d_str):
                try:
                    d_str = str(d_str).replace('"', '').replace(' ', '').strip()
                    parts = d_str.split('/')
                    if len(parts) == 3:
                        year = int(parts[0]) + 1911
                        return f"{year}-{parts[1]}-{parts[2]}"
                    return None
                except:
                    return None
            
            df['date_str'] = df['日期'].apply(convert_date)
            df = df.dropna(subset=['date_str'])
            df['date'] = pd.to_datetime(df['date_str']).dt.date
            
            # 清理數值
            for col in ['開盤價', '最高價', '最低價', '收盤價', '成交股數']:
                if col in df.columns:
                    df[col] = df[col].astype(str).str.replace(',', '').str.replace('"', '').apply(pd.to_numeric, errors='coerce')
            
            # 轉換為標準格式
            df = df.rename(columns={
                '開盤價': 'open',
                '最高價': 'high',
                '最低價': 'low',
                '收盤價': 'close',
                '成交股數': 'volume'
            })
            
            df = df.sort_values('date')
            df['pct_chg'] = df['close'].pct_change() * 100
            
            # 計算技術指標
            df = self.calculate_technical_indicators(df)
            
            # 只返回請求的天數
            df = df.tail(days)
            
            logger.info(f"[{self.name}] 成功獲取 {len(df)} 條數據")
            return df
            
        except Exception as e:
            logger.error(f"[{self.name}] Twstock 直抓失敗: {e}")
            import traceback
            traceback.print_exc()
            return None

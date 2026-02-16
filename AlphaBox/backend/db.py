import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'database', 'alphabox.db')

def init_db():
    """初始化統一資料庫"""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    # 1. 自選清單 (Watchlist) - 支援台股與加密幣
    c.execute('''
        CREATE TABLE IF NOT EXISTS watchlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_type TEXT NOT NULL, -- 'stock' 或 'crypto'
            symbol TEXT NOT NULL,      -- 代號 (如 2330, BTC/USDT)
            name TEXT,                 -- 名稱
            note TEXT,                 -- 備註
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(asset_type, symbol)
        )
    ''')
    
    # 2. 警報設定 (Alerts)
    c.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_type TEXT NOT NULL,
            symbol TEXT NOT NULL,
            condition TEXT NOT NULL,   -- 'above' 或 'below'
            target_price REAL NOT NULL,
            is_active BOOLEAN DEFAULT 1,
            triggered_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 3. 系統日誌/歷史紀錄 (History)
    c.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT NOT NULL,  -- 'alert', 'system', 'trade'
            title TEXT NOT NULL,
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# --- Watchlist Operations ---

def add_to_watchlist(asset_type, symbol, name=""):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    try:
        c.execute('INSERT OR REPLACE INTO watchlist (asset_type, symbol, name) VALUES (?, ?, ?)', 
                  (asset_type, symbol.upper(), name))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error adding to watchlist: {e}")
        return False
    finally:
        conn.close()

def get_watchlist(asset_type=None):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    if asset_type:
        c.execute('SELECT * FROM watchlist WHERE asset_type = ? ORDER BY created_at DESC', (asset_type,))
    else:
        c.execute('SELECT * FROM watchlist ORDER BY asset_type, created_at DESC')
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def remove_from_watchlist(asset_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('DELETE FROM watchlist WHERE id = ?', (asset_id,))
    conn.commit()
    conn.close()

# --- Alert Operations ---

def add_alert(asset_type, symbol, condition, target_price):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO alerts (asset_type, symbol, condition, target_price) 
        VALUES (?, ?, ?, ?)
    ''', (asset_type, symbol.upper(), condition, target_price))
    conn.commit()
    alert_id = c.lastrowid
    conn.close()
    return alert_id

def get_active_alerts():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM alerts WHERE is_active = 1')
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def deactivate_alert(alert_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('UPDATE alerts SET is_active = 0, triggered_at = ? WHERE id = ?', 
              (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), alert_id))
    conn.commit()
    conn.close()

def get_alert_history(limit=50):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM alerts WHERE is_active = 0 ORDER BY triggered_at DESC LIMIT ?', (limit,))
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

if __name__ == "__main__":
    init_db()
    print("Database initialized.")

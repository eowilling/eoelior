import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'sentinel.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            symbol TEXT NOT NULL,
            condition TEXT NOT NULL,
            target_price REAL NOT NULL,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def add_alert(symbol, condition, target_price):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT INTO alerts (symbol, condition, target_price) VALUES (?, ?, ?)', 
              (symbol, condition, target_price))
    conn.commit()
    alert_id = c.lastrowid
    conn.close()
    return alert_id

def get_alerts():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM alerts WHERE is_active = 1')
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def delete_alert(alert_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('DELETE FROM alerts WHERE id = ?', (alert_id,))
    conn.commit()
    conn.close()

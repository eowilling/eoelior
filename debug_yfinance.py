
import yfinance as yf
import pandas as pd

stock_code = "2330.TW"
print(f"Attempting to fetch {stock_code}...")

try:
    ticker = yf.Ticker(stock_code)
    df = ticker.history(period="1mo")
    
    if df.empty:
        print("❌ Data is empty!")
    else:
        print(f"✅ Success! Fetched {len(df)} rows.")
        print(df.tail(3))

except Exception as e:
    print(f"❌ Exception occurred: {e}")

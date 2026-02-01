
import twstock
import pandas as pd

stock = twstock.Stock('2330')
print("Fetching 31 days data from twstock...")
data = stock.fetch_31()

if not data:
    print("❌ No data fetched")
else:
    print(f"✅ Fetched {len(data)} rows")
    print(data[0])

print("\nFetching realtime data...")
real = twstock.realtime.get('2330')
print(real)

import os
import csv
import re
from collections import defaultdict

"""
最終統計：以日期為單位去重，計算實際見面次數
解決同一天多個檔案（AM/PM）重複計算的問題
"""

INPUT_CSV = "meeting_confirmed_all.csv"  # 或 meeting_third_filter_arrived_open.csv
OUTPUT_CSV = "meeting_final_count_by_date.csv"

# 從檔名提取日期：2025-10-10_週五.txt 或 2025-10-10.txt
DATE_PATTERN = re.compile(r"(\d{4}-\d{1,2}-\d{1,2})")

def extract_date(fname: str) -> str:
    """從檔名提取日期"""
    m = DATE_PATTERN.search(fname)
    return m.group(1) if m else ""

# 讀取確認見面的檔案列表
confirmed_files = []
with open(INPUT_CSV, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        fname = row.get("file", "").strip()
        if fname:
            confirmed_files.append(fname)

# 以日期為 key，收集該日期的所有檔案
date_to_files = defaultdict(list)
for fname in confirmed_files:
    date = extract_date(fname)
    if date:
        date_to_files[date].append(fname)

# 輸出結果：每個日期只算一次見面
rows_out = []
for date in sorted(date_to_files.keys()):
    files = date_to_files[date]
    rows_out.append({
        "date": date,
        "meeting_count": 1,  # 每個日期算一次見面
        "files": " | ".join(files),
        "file_count": len(files)
    })

# 寫入 CSV
with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["date", "meeting_count", "files", "file_count"]
    )
    writer.writeheader()
    writer.writerows(rows_out)

total_meetings = len(rows_out)
print(f"完成：最終統計")
print(f"  總見面次數（以日期去重）：{total_meetings} 次")
print(f"  已輸出 {OUTPUT_CSV}")


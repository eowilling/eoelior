import os
import re
from datetime import datetime

INPUT_TXT = r"D:\line.txt"
OUTPUT_DIR = "output"
END_DATE = datetime(2025, 6, 2)   # 截止到 2025-06-02（含）

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ✅ 同時支援：
# 2025/6/3（週二）
# 2024/12/06 (五)
date_pattern = re.compile(
    r"(\d{4})/(\d{1,2})/(\d{1,2})\s*[（(].*?[）)]"
)

current_date = None
buffer = []

def flush(date_obj, lines):
    if not date_obj or not lines:
        return
    if date_obj > END_DATE:
        return
    fname = date_obj.strftime("%Y-%m-%d") + ".txt"
    path = os.path.join(OUTPUT_DIR, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

with open(INPUT_TXT, "r", encoding="utf-8") as f:
    for line in f:
        m = date_pattern.search(line)
        if m:
            # 遇到新日期，先輸出前一天
            flush(current_date, buffer)
            buffer = []

            y, mth, d = map(int, m.groups())
            current_date = datetime(y, mth, d)

            # 超過截止日就直接結束
            if current_date > END_DATE:
                break

        # ⚠️ 忽略 LINE 標頭
        if current_date:
            buffer.append(line.rstrip("\n"))

# 最後一天
flush(current_date, buffer)

print("完成：已依日期切分，並限制至 2025-06-02（含）")

import os
import csv

INPUT_CSV = "meeting_second_filter_ge3.csv"
CHAT_DIR = "output"

OUT_CONFIRM = "meeting_confirmed_all.csv"
OUT_GRAY = "meeting_gray_all.csv"
OUT_EXCLUDE = "meeting_excluded_all.csv"

ARRIVE_WORDS = ["到了", "我到", "我到囉", "在門口", "下去", "停哪", "你在哪"]
TRAPS = [
    "吃到了", "如果", "要不要", "可能", "他有", "她有",
    "你要", "你覺得", "會不會", "下週", "這週", "上週",
    "週一", "週二", "週三", "週四", "週五", "週六", "週日"
]

def read_lines(path):
    with open(path, "r", encoding="utf-8-sig") as f:
        return [l.strip() for l in f if l.strip()]

def judge(lines):
    for i, line in enumerate(lines):
        if any(w in line for w in ARRIVE_WORDS):
            if any(t in line for t in TRAPS):
                continue
            window = lines[i:i+6]
            if any(any(w in l for w in ARRIVE_WORDS) for l in window[1:]):
                return "confirm"
            return "gray"
    return "exclude"

targets = []
with open(INPUT_CSV, "r", encoding="utf-8-sig") as f:
    targets = [r["file"] for r in csv.DictReader(f)]

confirmed, gray, excluded = [], [], []

for fname in targets:
    path = os.path.join(CHAT_DIR, fname)
    if not os.path.exists(path):
        continue
    result = judge(read_lines(path))
    if result == "confirm":
        confirmed.append({"file": fname})
    elif result == "gray":
        gray.append({"file": fname})
    else:
        excluded.append({"file": fname})

def dump(path, rows):
    with open(path, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=["file"])
        w.writeheader()
        w.writerows(rows)

dump(OUT_CONFIRM, confirmed)
dump(OUT_GRAY, gray)
dump(OUT_EXCLUDE, excluded)

print("完成：")
print(f"  確定見面：{len(confirmed)}")
print(f"  疑似見面：{len(gray)}")
print(f"  排除誤判：{len(excluded)}")

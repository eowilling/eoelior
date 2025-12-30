import os
import csv
import re

# ===== 來源檔 =====
INPUT_CSV = "meeting_second_filter_ge3.csv"   # 你二次篩選後 >=3 的那份
CHAT_DIR = "output"

# ===== 輸出檔 =====
OUTPUT_CSV = "meeting_keyword_audit.csv"

# ===== 你要檢視的關鍵字 =====
KEYWORDS = ["到了", "幾點", "約", "來", "導航", "晚點"]

# 從檔名抓日期：2025-6-3_週二_PM.txt / 2025-06-03_xxx.txt
DATE_PATTERN = re.compile(r"(\d{4}-\d{1,2}-\d{1,2})")

# 顯示命中行前後幾行（0=只顯示命中行）
CONTEXT_LINES = 2


def extract_date(fname: str) -> str:
    m = DATE_PATTERN.search(fname)
    return m.group(1) if m else ""


def find_keyword_hits(lines, idx):
    """回傳該行命中的關鍵字清單（每個關鍵字只列一次）"""
    text = lines[idx]
    return [k for k in KEYWORDS if k in text]


def collect_context(lines, idx, ctx=2):
    start = max(0, idx - ctx)
    end = min(len(lines), idx + ctx + 1)
    # 用行號標註，方便你回頭定位
    parts = []
    for i in range(start, end):
        prefix = ">>" if i == idx else "  "
        parts.append(f"{prefix}{i+1:05d}: {lines[i]}")
    return "\n".join(parts)


# 讀取二次篩選結果
targets = []
with open(INPUT_CSV, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        fname = row.get("file", "").strip()
        if fname:
            targets.append(fname)

rows_out = []

for fname in targets:
    path = os.path.join(CHAT_DIR, fname)
    date = extract_date(fname)

    if not os.path.exists(path):
        rows_out.append({
            "date": date,
            "file": fname,
            "line_no": "",
            "hit_keywords": "",
            "hit_line": "",
            "context": "",
            "error": "CHAT_FILE_NOT_FOUND"
        })
        continue

    with open(path, "r", encoding="utf-8") as f:
        lines = [l.rstrip("\n") for l in f]

    # 掃描每一行，找出包含關鍵字的行
    for i in range(len(lines)):
        hits = find_keyword_hits(lines, i)
        if not hits:
            continue

        rows_out.append({
            "date": date,
            "file": fname,
            "line_no": i + 1,
            "hit_keywords": "、".join(hits),
            "hit_line": lines[i],
            "context": collect_context(lines, i, CONTEXT_LINES) if CONTEXT_LINES > 0 else "",
            "error": ""
        })

# 輸出 audit CSV（UTF-8 with BOM，Excel 直接開不亂碼）
with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["date", "file", "line_no", "hit_keywords", "hit_line", "context", "error"]
    )
    writer.writeheader()
    writer.writerows(rows_out)

print(f"完成：已輸出 {OUTPUT_CSV}（共 {len(rows_out)} 筆命中行）")

import os
import csv

# ===== 你現有的檔案 =====
INPUT_CSV = "meeting_summary.csv"
CHAT_DIR = "output"

# ===== 輸出 =====
OUTPUT_CSV = "meeting_second_filter_ge3.csv"

# ===== 二次關鍵字（每個命中算 1 分）=====
KEYWORDS = ["到了", "幾點", "約", "來", "導航", "晚點"]

# 誤判關鍵字：如果關鍵字出現在這些上下文中，不計分
FALSE_POSITIVES = [
    "你要", "你覺得", "會不會", "要不要", "如果", "可能", "他有", "她有",
    "下週", "這週", "上週", "週一", "週二", "週三", "週四", "週五", "週六", "週日"
]

def keyword_score(text: str):
    """計算關鍵字分數，排除誤判情況"""
    lines = text.split('\n')
    hits = []

    for line in lines:
        # 檢查是否為誤判（包含疑問句或未來時間）
        is_false_positive = any(fp in line for fp in FALSE_POSITIVES)

        if is_false_positive:
            continue

        # 檢查關鍵字（但排除誤判上下文）
        for kw in KEYWORDS:
            if kw in line:
                # 進一步檢查：如果「來」出現在疑問句，跳過
                if kw == "來" and ("？" in line or "?" in line or "你要" in line):
                    continue
                # 如果「約」出現在未來時間，跳過
                if kw == "約" and any(time_word in line for time_word in ["下", "這週", "週"]):
                    continue

                if kw not in hits:
                    hits.append(kw)

    return len(hits), hits

# 讀取 meeting_summary.csv，先排除「沒有見面」
candidates = []
with open(INPUT_CSV, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        level = row.get("level", "").strip()
        if level == "沒有見面":
            continue
        candidates.append(row)

rows_out = []

for row in candidates:
    fname = row.get("file", "").strip()
    if not fname:
        continue

    path = os.path.join(CHAT_DIR, fname)
    if not os.path.exists(path):
        rows_out.append({
            "file": fname,
            "level": row.get("level", ""),
            "score2": "",
            "hits2": "",
            "error": "CHAT_FILE_NOT_FOUND"
        })
        continue

    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    score2, hits2 = keyword_score(text)

    if score2 >= 3:
        rows_out.append({
            "file": fname,
            "level": row.get("level", ""),
            "score2": score2,
            "hits2": "、".join(hits2),
            "error": ""
        })

# 輸出結果（只包含 >=3 分）
with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["file", "level", "score2", "hits2", "error"]
    )
    writer.writeheader()
    writer.writerows(rows_out)

print(f"完成：二次篩選 >=3 分 共 {len(rows_out)} 筆，輸出 {OUTPUT_CSV}")

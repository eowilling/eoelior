import os
import csv

INPUT_DIR = "output"
OUTPUT_CSV = "meeting_summary.csv"

# ===== 訊號定義 =====

STRONG_SIGNAL = {
    "到了": 3
}

LOCATION_SIGNAL = {
    "國安": 2,
    "東海": 2,
    "海一": 2
}

TIME_SIGNAL = {
    "幾點": 1
}

WEAK_SIGNAL = {
    "見面": 1,
    "快到了": 1,
    "導航": 1,
    "晚點見": 1,
    "等等見": 1
}

def calculate_score(text):
    """計算見面訊號分數，排除誤判情況"""
    score = 0
    hits = []
    lines = text.split('\n')

    # 誤判關鍵字
    FALSE_POSITIVES = ["如果", "要不要", "可能", "下週", "這週", "上週", "你要", "你覺得"]

    for line in lines:
        # 檢查是否為誤判
        is_false_positive = any(fp in line for fp in FALSE_POSITIVES)

        if is_false_positive:
            continue

        # 檢查強訊號
        for k, v in STRONG_SIGNAL.items():
            if k in line and k not in hits:
                score += v
                hits.append(k)

        # 檢查地點訊號
        for k, v in LOCATION_SIGNAL.items():
            if k in line and k not in hits:
                score += v
                hits.append(k)

        # 檢查時間訊號
        for k, v in TIME_SIGNAL.items():
            if k in line and k not in hits:
                score += v
                hits.append(k)

        # 檢查弱訊號
        for k, v in WEAK_SIGNAL.items():
            if k in line and k not in hits:
                score += v
                hits.append(k)

    return score, hits

def classify(score):
    if score >= 4:
        return "確定見面"
    if score >= 2:
        return "疑似有見面"
    if score == 1:
        return "不確定有沒有見面"
    return "沒有見面"


rows = []

for fname in sorted(os.listdir(INPUT_DIR)):
    if not fname.lower().endswith(".txt"):
        continue

    path = os.path.join(INPUT_DIR, fname)
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    score, hits = calculate_score(text)
    level = classify(score)

    rows.append({
        "file": fname,
        "score": score,
        "level": level,
        "signals": "、".join(hits)
    })

with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["file", "score", "level", "signals"]
    )
    writer.writeheader()
    writer.writerows(rows)

print(f"完成：已分級所有檔案，輸出 {OUTPUT_CSV}")

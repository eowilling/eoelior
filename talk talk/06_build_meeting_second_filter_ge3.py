import os
import csv

# ===== 設定區 =====
INPUT_DIR = "output"
OUTPUT_CSV = "meeting_second_filter_ge3.csv"
MIN_SCORE = 3

KEYWORDS = [
    "到了",
    "約",
    "幾點",
    "來",
    "導航",
    "晚點"
]
# ==================

results = []

for fname in sorted(os.listdir(INPUT_DIR)):
    if not fname.endswith(".txt"):
        continue

    path = os.path.join(INPUT_DIR, fname)
    score = 0
    hits = set()

    with open(path, "r", encoding="utf-8-sig") as f:
        for line in f:
            for kw in KEYWORDS:
                if kw in line:
                    score += 1
                    hits.add(kw)

    if score >= MIN_SCORE:
        results.append({
            "file": fname,
            "score": score,
            "hits": "|".join(sorted(hits))
        })

with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["file", "score", "hits"]
    )
    writer.writeheader()
    writer.writerows(results)

print(f"完成：已產生 {OUTPUT_CSV}，共 {len(results)} 筆（score ≥ {MIN_SCORE}）")

import os
import csv

INPUT_CSV = "meeting_second_filter_ge3.csv"   # 你的二次篩選 >=3 分結果
CHAT_DIR = "output"
OUTPUT_CSV = "meeting_third_filter_arrived_open.csv"

K1 = "到了"
K2 = "開門"

def find_lines(lines, kw):
    """回傳包含 kw 的行號(1-based)與內容（最多取前 5 筆，避免太長）"""
    hits = []
    for i, line in enumerate(lines, start=1):
        if kw in line:
            hits.append((i, line))
            if len(hits) >= 5:
                break
    return hits

rows_out = []

with open(INPUT_CSV, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        fname = row.get("file", "").strip()
        if not fname:
            continue

        path = os.path.join(CHAT_DIR, fname)
        if not os.path.exists(path):
            rows_out.append({
                "file": fname,
                "level": row.get("level", ""),
                "score2": row.get("score2", ""),
                "hits2": row.get("hits2", ""),
                "arrived_lines": "",
                "open_door_lines": "",
                "error": "CHAT_FILE_NOT_FOUND"
            })
            continue

        with open(path, "r", encoding="utf-8") as cf:
            lines = [l.rstrip("\n") for l in cf]

        text = "\n".join(lines)

        if (K1 in text) and (K2 in text):
            arrived = find_lines(lines, K1)
            open_door = find_lines(lines, K2)

            rows_out.append({
                "file": fname,
                "level": row.get("level", ""),
                "score2": row.get("score2", ""),
                "hits2": row.get("hits2", ""),
                "arrived_lines": " | ".join([f"{ln}:{txt}" for ln, txt in arrived]),
                "open_door_lines": " | ".join([f"{ln}:{txt}" for ln, txt in open_door]),
                "error": ""
            })

with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["file", "level", "score2", "hits2", "arrived_lines", "open_door_lines", "error"]
    )
    writer.writeheader()
    writer.writerows(rows_out)

print(f"完成：第三次篩選（同時含『{K1}』+『{K2}』）共 {len(rows_out)} 筆，輸出 {OUTPUT_CSV}")

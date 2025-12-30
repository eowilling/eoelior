import os
import csv
from openai import OpenAI

# ===== 設定 =====
INPUT_DIR = "output"          # 切好的檔案資料夾
OUTPUT_CSV = "scan_result.csv"
MODEL = "gpt-4o-mini"         # Quick scan 用，便宜且穩定
MAX_CHARS = 12000             # 每檔最多送這麼多字（避免成本暴衝）

client = OpenAI()

SYSTEM_PROMPT = """你是對話快速掃描器。
只做「粗判斷」，不要摘要內容。
輸出必須是 JSON，不可有多餘文字。
"""

USER_PROMPT_TEMPLATE = """請快速判斷以下聊天紀錄，並輸出 JSON，欄位固定如下：
- sentiment: positive | neutral | negative
- conflict: true | false
- tension: low | medium | high
- worth_deep_analysis: true | false

判斷規則：
- 有指責、冷回、情緒升高 → negative / conflict=true
- 普通日常 → neutral
- 明顯爭執或關係惡化 → worth_deep_analysis=true

聊天紀錄：
<<<
{content}
>>>
"""

def read_limited_text(path):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    return text[:MAX_CHARS]

def quick_scan(text):
    resp = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": USER_PROMPT_TEMPLATE.format(content=text)}
        ],
    )
    return resp.choices[0].message.content

def parse_filename(fname):
    # 例：2025-6-3_週二_AM.txt / 2025-6-1_週日.txt
    base = fname.replace(".txt", "")
    if base.endswith("_AM"):
        return base.replace("_AM", ""), "AM"
    if base.endswith("_PM"):
        return base.replace("_PM", ""), "PM"
    return base, "ALL"

rows = []

for fname in sorted(os.listdir(INPUT_DIR)):
    if not fname.lower().endswith(".txt"):
        continue

    path = os.path.join(INPUT_DIR, fname)
    text = read_limited_text(path)

    try:
        result_json = quick_scan(text)
        date, period = parse_filename(fname)

        rows.append({
            "date": date,
            "period": period,
            "result": result_json
        })
        print(f"OK: {fname}")

    except Exception as e:
        print(f"FAIL: {fname} -> {e}")

# ===== 輸出 CSV =====
with open(OUTPUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=["date", "period", "result"])
    writer.writeheader()
    writer.writerows(rows)

print(f"完成：已輸出 {OUTPUT_CSV}")

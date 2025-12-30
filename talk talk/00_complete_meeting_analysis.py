"""
完整的見面次數統計程式
整合所有改進邏輯，從 output 資料夾統計見面次數
"""

import os
import csv
import re
from collections import defaultdict
from datetime import datetime

# ===== 設定 =====
INPUT_DIR = "output"
OUTPUT_DIR = "analysis_results"
OUTPUT_SUMMARY = "meeting_final_summary.csv"
OUTPUT_DETAIL = "meeting_detailed_analysis.csv"
OUTPUT_MARKDOWN = "meeting_statistics_report.md"
OUTPUT_HTML = "meeting_statistics_report.html"

# ===== 關鍵字定義 =====
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

# 二次篩選關鍵字
SECOND_FILTER_KEYWORDS = ["到了", "幾點", "約", "來", "導航", "晚點"]

# 誤判關鍵字（排除這些上下文）
FALSE_POSITIVES = [
    "吃到了", "如果", "要不要", "可能", "他有", "她有",
    "你要", "你覺得", "會不會", "下週", "這週", "上週",
    "週一", "週二", "週三", "週四", "週五", "週六", "週日"
]

# 確認見面的關鍵字
ARRIVE_WORDS = ["到了", "我到", "我到囉", "在門口", "下去", "停哪", "你在哪"]
OPEN_DOOR_WORDS = ["開門", "開門了", "開門囉"]

# 從檔名提取日期
DATE_PATTERN = re.compile(r"(\d{4})-(\d{1,2})-(\d{1,2})")


def extract_date(fname: str) -> str:
    """從檔名提取日期（標準化為 YYYY-MM-DD）"""
    m = DATE_PATTERN.search(fname)
    if m:
        y, mth, d = m.groups()
        return f"{y}-{int(mth):02d}-{int(d):02d}"
    return ""


def is_false_positive(line: str) -> bool:
    """檢查是否為誤判（疑問句或未來時間）"""
    return any(fp in line for fp in FALSE_POSITIVES)


def calculate_first_score(text: str) -> tuple[int, list]:
    """第一層評分：基本關鍵字評分"""
    score = 0
    hits = []
    lines = text.split('\n')

    for line in lines:
        if is_false_positive(line):
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


def calculate_second_score(text: str) -> tuple[int, list]:
    """第二層評分：二次篩選關鍵字"""
    lines = text.split('\n')
    hits = []

    for line in lines:
        if is_false_positive(line):
            continue

        # 檢查關鍵字（但排除誤判上下文）
        for kw in SECOND_FILTER_KEYWORDS:
            if kw in line:
                # 特殊處理「來」：如果出現在疑問句，跳過
                if kw == "來" and ("？" in line or "?" in line or "你要" in line):
                    continue
                # 特殊處理「約」：如果出現在未來時間，跳過
                if kw == "約" and any(time_word in line for time_word in ["下", "這週", "週"]):
                    continue

                if kw not in hits:
                    hits.append(kw)

    return len(hits), hits


def judge_meeting(lines: list) -> str:
    """判斷是否確定見面：confirm / gray / exclude"""
    # 檢查是否有「到了」+「開門」的組合
    has_arrive = False
    has_open_door = False

    for line in lines:
        if any(w in line for w in ARRIVE_WORDS):
            if not is_false_positive(line):
                has_arrive = True
        if any(w in line for w in OPEN_DOOR_WORDS):
            has_open_door = True

    if has_arrive and has_open_door:
        return "confirm"

    # 檢查是否有多次「到了」的訊號
    arrive_count = 0
    for i, line in enumerate(lines):
        if any(w in line for w in ARRIVE_WORDS):
            if is_false_positive(line):
                continue
            arrive_count += 1
            # 檢查後續 6 行是否有重複的「到了」
            window = lines[i:i+6]
            if any(any(w in l for w in ARRIVE_WORDS) for l in window[1:]):
                return "confirm"

    if has_arrive:
        return "gray"

    return "exclude"


def classify_first_score(score: int) -> str:
    """根據第一層分數分類"""
    if score >= 4:
        return "確定見面"
    if score >= 2:
        return "疑似有見面"
    if score == 1:
        return "不確定有沒有見面"
    return "沒有見面"


# ===== 主程式 =====
os.makedirs(OUTPUT_DIR, exist_ok=True)

all_files_data = []
date_to_files = defaultdict(list)

print("開始分析 output 資料夾...")

# 讀取所有檔案
for fname in sorted(os.listdir(INPUT_DIR)):
    if not fname.lower().endswith(".txt"):
        continue

    path = os.path.join(INPUT_DIR, fname)
    date = extract_date(fname)

    try:
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
            lines = [l.strip() for l in text.split('\n') if l.strip()]

        # 第一層評分
        score1, hits1 = calculate_first_score(text)
        level1 = classify_first_score(score1)

        # 第二層評分
        score2, hits2 = calculate_second_score(text)

        # 第三層判斷（確認見面）
        meeting_status = judge_meeting(lines)

        # 記錄資料
        file_data = {
            "date": date,
            "file": fname,
            "score1": score1,
            "level1": level1,
            "hits1": "、".join(hits1),
            "score2": score2,
            "hits2": "、".join(hits2),
            "meeting_status": meeting_status,
            "line_count": len(lines)
        }

        all_files_data.append(file_data)

        # 記錄日期對應的檔案
        if date:
            date_to_files[date].append(file_data)

        if len(all_files_data) % 50 == 0:
            print(f"  已處理 {len(all_files_data)} 個檔案...")

    except Exception as e:
        print(f"  錯誤：{fname} -> {e}")

print(f"\n總共處理 {len(all_files_data)} 個檔案")

# ===== 輸出詳細分析 =====
detail_path = os.path.join(OUTPUT_DIR, OUTPUT_DETAIL)
with open(detail_path, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["date", "file", "score1", "level1", "hits1", "score2", "hits2", "meeting_status", "line_count"]
    )
    writer.writeheader()
    writer.writerows(all_files_data)

print(f"已輸出詳細分析：{detail_path}")

# ===== 統計最終見面次數（以日期去重）=====
confirmed_dates = set()
gray_dates = set()

for file_data in all_files_data:
    date = file_data["date"]
    if not date:
        continue

    status = file_data["meeting_status"]
    if status == "confirm":
        confirmed_dates.add(date)
    elif status == "gray":
        gray_dates.add(date)

# 建立最終統計
summary_rows = []
for date in sorted(confirmed_dates | gray_dates):
    files = date_to_files[date]
    confirmed_files = [f for f in files if f["meeting_status"] == "confirm"]
    gray_files = [f for f in files if f["meeting_status"] == "gray"]

    summary_rows.append({
        "date": date,
        "meeting_count": 1 if date in confirmed_dates else 0,
        "gray_count": 1 if date in gray_dates else 0,
        "status": "確定見面" if date in confirmed_dates else "疑似見面",
        "confirmed_files": " | ".join([f["file"] for f in confirmed_files]),
        "gray_files": " | ".join([f["file"] for f in gray_files]),
        "total_files": len(files)
    })

# 輸出最終統計
summary_path = os.path.join(OUTPUT_DIR, OUTPUT_SUMMARY)
with open(summary_path, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["date", "meeting_count", "gray_count", "status", "confirmed_files", "gray_files", "total_files"]
    )
    writer.writeheader()
    writer.writerows(summary_rows)

# ===== 輸出統計摘要 =====
print("\n" + "="*60)
print("統計結果摘要")
print("="*60)
print(f"總檔案數：{len(all_files_data)}")
print(f"確定見面日期數：{len(confirmed_dates)}")
print(f"疑似見面日期數：{len(gray_dates)}")
print(f"總見面次數（確定）：{len(confirmed_dates)} 次")
print(f"總見面次數（含疑似）：{len(confirmed_dates) + len(gray_dates)} 次")
print("="*60)
print(f"\n已輸出最終統計：{summary_path}")
print(f"已輸出詳細分析：{detail_path}")

# ===== 輸出 Markdown 報告 =====
from datetime import datetime

def format_date(date_str: str) -> str:
    """格式化日期為可讀格式"""
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        weekdays = ["週一", "週二", "週三", "週四", "週五", "週六", "週日"]
        weekday = weekdays[dt.weekday()]
        return f"{date_str} ({weekday})"
    except:
        return date_str

def get_month_key(date_str: str) -> str:
    """取得月份鍵值（YYYY-MM）"""
    return date_str[:7] if len(date_str) >= 7 else ""

# 按月份統計
monthly_confirmed = defaultdict(list)
monthly_gray = defaultdict(list)

for date in sorted(confirmed_dates):
    month_key = get_month_key(date)
    monthly_confirmed[month_key].append(date)

for date in sorted(gray_dates):
    month_key = get_month_key(date)
    monthly_gray[month_key].append(date)

# 生成 Markdown 內容
md_content = []
md_content.append("# 見面次數統計報告\n")
md_content.append(f"**生成時間**：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

md_content.append("## 📊 總體統計\n")
md_content.append("| 項目 | 數量 |")
md_content.append("|------|------|")
md_content.append(f"| 總檔案數 | {len(all_files_data)} |")
md_content.append(f"| 確定見面日期數 | **{len(confirmed_dates)}** |")
md_content.append(f"| 疑似見面日期數 | {len(gray_dates)} |")
md_content.append(f"| 總見面次數（確定） | **{len(confirmed_dates)} 次** |")
md_content.append(f"| 總見面次數（含疑似） | {len(confirmed_dates) + len(gray_dates)} 次 |\n")

md_content.append("## ✅ 確定見面日期列表\n")
md_content.append("| 日期 | 檔案 |")
md_content.append("|------|------|")

for date in sorted(confirmed_dates):
    files = date_to_files[date]
    confirmed_files = [f for f in files if f["meeting_status"] == "confirm"]
    file_list = "、".join([f["file"] for f in confirmed_files])
    md_content.append(f"| {format_date(date)} | {file_list} |")

md_content.append(f"\n**共 {len(confirmed_dates)} 次確定見面**\n")

md_content.append("## ⚠️ 疑似見面日期列表\n")
md_content.append("| 日期 | 檔案 |")
md_content.append("|------|------|")

for date in sorted(gray_dates):
    files = date_to_files[date]
    gray_files = [f for f in files if f["meeting_status"] == "gray"]
    file_list = "、".join([f["file"] for f in gray_files])
    md_content.append(f"| {format_date(date)} | {file_list} |")

md_content.append(f"\n**共 {len(gray_dates)} 次疑似見面**\n")

md_content.append("## 📅 按月統計\n")
md_content.append("### 確定見面\n")
md_content.append("| 月份 | 次數 | 日期 |")
md_content.append("|------|------|------|")

all_months = sorted(set(list(monthly_confirmed.keys()) + list(monthly_gray.keys())))
for month in all_months:
    dates = monthly_confirmed.get(month, [])
    if dates:
        date_list = "、".join([d.split("-")[2] for d in dates])
        md_content.append(f"| {month} | {len(dates)} | {date_list} |")

md_content.append("\n### 疑似見面\n")
md_content.append("| 月份 | 次數 | 日期 |")
md_content.append("|------|------|------|")

for month in all_months:
    dates = monthly_gray.get(month, [])
    if dates:
        date_list = "、".join([d.split("-")[2] for d in dates])
        md_content.append(f"| {month} | {len(dates)} | {date_list} |")

md_content.append("\n---\n")
md_content.append("*本報告由自動分析程式生成*")

# 寫入 Markdown 檔案
md_path = os.path.join(OUTPUT_DIR, OUTPUT_MARKDOWN)
with open(md_path, "w", encoding="utf-8") as f:
    f.write("\n".join(md_content))

print(f"已輸出 Markdown 報告：{md_path}")

# ===== 輸出 HTML 報告（可點擊日期打開檔案）=====
html_content = []
html_content.append("""<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>見面次數統計報告</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            padding-left: 10px;
            border-left: 4px solid #3498db;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-card.confirmed {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        .stat-card.gray {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .stat-card h3 {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 10px;
        }
        .stat-card .number {
            font-size: 32px;
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
        }
        th {
            background: #34495e;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        td {
            padding: 10px 12px;
            border-bottom: 1px solid #eee;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .date-link {
            color: #3498db;
            text-decoration: none;
            cursor: pointer;
            font-weight: 500;
            padding: 5px 10px;
            border-radius: 4px;
            transition: all 0.3s;
            display: inline-block;
        }
        .date-link:hover {
            background: #3498db;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
        }
        .date-link.confirmed {
            color: #27ae60;
        }
        .date-link.confirmed:hover {
            background: #27ae60;
            box-shadow: 0 2px 5px rgba(39, 174, 96, 0.3);
        }
        .date-link.gray {
            color: #e67e22;
        }
        .date-link.gray:hover {
            background: #e67e22;
            box-shadow: 0 2px 5px rgba(230, 126, 34, 0.3);
        }
        .file-list {
            font-size: 12px;
            color: #7f8c8d;
            margin-top: 5px;
        }
        .month-section {
            margin: 30px 0;
        }
        .month-title {
            font-size: 18px;
            color: #2c3e50;
            margin: 20px 0 10px 0;
            padding: 10px;
            background: #ecf0f1;
            border-radius: 4px;
        }
        .filter-buttons {
            margin: 20px 0;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .filter-btn {
            padding: 8px 16px;
            border: 2px solid #3498db;
            background: white;
            color: #3498db;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
        }
        .filter-btn:hover, .filter-btn.active {
            background: #3498db;
            color: white;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #7f8c8d;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 見面次數統計報告</h1>
        <p><strong>生成時間</strong>：{generation_time}</p>

        <div class="stats">
            <div class="stat-card">
                <h3>總檔案數</h3>
                <div class="number">{total_files}</div>
            </div>
            <div class="stat-card confirmed">
                <h3>確定見面</h3>
                <div class="number">{confirmed_count}</div>
            </div>
            <div class="stat-card gray">
                <h3>疑似見面</h3>
                <div class="number">{gray_count}</div>
            </div>
            <div class="stat-card">
                <h3>總見面次數</h3>
                <div class="number">{total_meetings}</div>
            </div>
        </div>

        <div class="filter-buttons">
            <button class="filter-btn active" onclick="filterTable('all')">全部</button>
            <button class="filter-btn" onclick="filterTable('confirmed')">確定見面</button>
            <button class="filter-btn" onclick="filterTable('gray')">疑似見面</button>
        </div>

        <h2>✅ 確定見面日期列表</h2>
        <table id="confirmed-table">
            <thead>
                <tr>
                    <th>日期</th>
                    <th>檔案</th>
                </tr>
            </thead>
            <tbody>
""")

# 添加確定見面的日期
for date in sorted(confirmed_dates):
    files = date_to_files[date]
    confirmed_files = [f for f in files if f["meeting_status"] == "confirm"]
    file_list = "、".join([f["file"] for f in confirmed_files])

    # 處理多個檔案的情況
    file_links = []
    for f in confirmed_files:
        file_path = f"../output/{f['file']}"
        file_links.append(f'<a href="{file_path}" target="_blank" class="file-link">{f["file"]}</a>')

    date_formatted = format_date(date)
    first_file = confirmed_files[0]['file']
    file_links_str = '、'.join(file_links)
    html_content.append(f"""
                <tr class="row-confirmed">
                    <td>
                        <a href="../output/{first_file}" target="_blank" class="date-link confirmed">{date_formatted}</a>
                    </td>
                    <td>
                        <div class="file-list">{file_links_str}</div>
                    </td>
                </tr>
""")

html_content.append("""            </tbody>
        </table>

        <h2>⚠️ 疑似見面日期列表</h2>
        <table id="gray-table">
            <thead>
                <tr>
                    <th>日期</th>
                    <th>檔案</th>
                </tr>
            </thead>
            <tbody>
""")

# 添加疑似見面的日期
for date in sorted(gray_dates):
    files = date_to_files[date]
    gray_files = [f for f in files if f["meeting_status"] == "gray"]
    file_list = "、".join([f["file"] for f in gray_files])

    # 處理多個檔案的情況
    file_links = []
    for f in gray_files:
        file_path = f"../output/{f['file']}"
        file_links.append(f'<a href="{file_path}" target="_blank" class="file-link">{f["file"]}</a>')

    date_formatted = format_date(date)
    first_file = gray_files[0]['file']
    file_links_str = '、'.join(file_links)
    html_content.append(f"""
                <tr class="row-gray">
                    <td>
                        <a href="../output/{first_file}" target="_blank" class="date-link gray">{date_formatted}</a>
                    </td>
                    <td>
                        <div class="file-list">{file_links_str}</div>
                    </td>
                </tr>
""")

html_content.append("""            </tbody>
        </table>

        <h2>📅 按月統計</h2>
        <div class="month-section">
            <h3 class="month-title">確定見面</h3>
            <table>
                <thead>
                    <tr>
                        <th>月份</th>
                        <th>次數</th>
                        <th>日期</th>
                    </tr>
                </thead>
                <tbody>
""")

for month in all_months:
    dates = monthly_confirmed.get(month, [])
    if dates:
        date_list = "、".join([d.split("-")[2] for d in dates])
        html_content.append(f"""
                    <tr>
                        <td>{month}</td>
                        <td><strong>{len(dates)}</strong></td>
                        <td>{date_list}</td>
                    </tr>
""")

html_content.append("""                </tbody>
            </table>

            <h3 class="month-title">疑似見面</h3>
            <table>
                <thead>
                    <tr>
                        <th>月份</th>
                        <th>次數</th>
                        <th>日期</th>
                    </tr>
                </thead>
                <tbody>
""")

for month in all_months:
    dates = monthly_gray.get(month, [])
    if dates:
        date_list = "、".join([d.split("-")[2] for d in dates])
        html_content.append(f"""
                    <tr>
                        <td>{month}</td>
                        <td><strong>{len(dates)}</strong></td>
                        <td>{date_list}</td>
                    </tr>
""")

html_content.append("""                </tbody>
            </table>
        </div>

        <div class="footer">
            <p>本報告由自動分析程式生成</p>
        </div>
    </div>

    <script>
        function filterTable(type) {
            // 更新按鈕狀態
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            // 顯示/隱藏表格
            const confirmedTable = document.getElementById('confirmed-table');
            const grayTable = document.getElementById('gray-table');

            if (type === 'all') {
                confirmedTable.style.display = 'table';
                grayTable.style.display = 'table';
            } else if (type === 'confirmed') {
                confirmedTable.style.display = 'table';
                grayTable.style.display = 'none';
            } else if (type === 'gray') {
                confirmedTable.style.display = 'none';
                grayTable.style.display = 'table';
            }
        }
    </script>
</body>
</html>
""")

# 替換 HTML 中的變數
html_str = "".join(html_content)
html_str = html_str.replace("{generation_time}", datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
html_str = html_str.replace("{total_files}", str(len(all_files_data)))
html_str = html_str.replace("{confirmed_count}", str(len(confirmed_dates)))
html_str = html_str.replace("{gray_count}", str(len(gray_dates)))
html_str = html_str.replace("{total_meetings}", str(len(confirmed_dates) + len(gray_dates)))

# 寫入 HTML 檔案
html_path = os.path.join(OUTPUT_DIR, OUTPUT_HTML)
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_str)

print(f"已輸出 HTML 報告：{html_path}")


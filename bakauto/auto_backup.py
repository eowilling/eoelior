import os
import shutil
import logging
import sys
import time
import subprocess
from datetime import datetime, timedelta

# 強制設定輸出編碼為 UTF-8
if sys.stdout.encoding != 'utf-8':
    try:
        import codecs
        sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())
    except Exception:
        pass

# --- 設定區 ---
BACKUP_NAME = "Willing_Backup"
CONFIG_FILE_PATH = r"C:\xampp\htdocs\eoelior\bakauto\backup_list.txt"
MYSQL_DUMP_EXE = r"C:\xampp\mysql\bin\mysqldump.exe"
MYSQL_USER = "root"
MYSQL_PASSWORD = ""
# -------------

def setup_logger(log_path):
    for handler in logging.root.handlers[:]:
        logging.root.removeHandler(handler)
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s',
        handlers=[logging.FileHandler(log_path, encoding='utf-8'), logging.StreamHandler(sys.stdout)]
    )

def get_size(path):
    if os.path.isfile(path): return os.path.getsize(path)
    total = 0
    try:
        for root, dirs, files in os.walk(path):
            for f in files: total += os.path.getsize(os.path.join(root, f))
    except: pass
    return total

def format_bytes(size):
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size < 1024: return f"{size:.2f} {unit}"
        size /= 1024

def dump_mysql_item(item, target_dir):
    """
    item 格式可能是 'willing_db' 或 'willing_db.users'
    """
    clean_item = item.replace("DB:", "").strip()
    is_table = "." in clean_item

    if is_table:
        db_name, table_name = clean_item.split(".", 1)
        dump_filename = f"DB_{db_name}_{table_name}.sql"
        cmd = [MYSQL_DUMP_EXE, f"-u{MYSQL_USER}", "--skip-lock-tables", "--force", db_name, table_name, f"--result-file={os.path.join(target_dir, dump_filename)}"]
    else:
        db_name = clean_item
        dump_filename = f"DB_{db_name}_FULL.sql"
        cmd = [MYSQL_DUMP_EXE, f"-u{MYSQL_USER}", "--skip-lock-tables", "--force", "--databases", db_name, f"--result-file={os.path.join(target_dir, dump_filename)}"]

    if MYSQL_PASSWORD:
        cmd.insert(2, f"-p{MYSQL_PASSWORD}")

    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
        return os.path.join(target_dir, dump_filename)
    except Exception as e:
        logging.error(f"[X] 資料庫項 {clean_item} 匯出失敗: {str(e)}")
        return None

def run_backup():
    execution_dir = os.getcwd()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    current_backup_root = os.path.join(execution_dir, f"{BACKUP_NAME}_{timestamp}")
    os.makedirs(current_backup_root, exist_ok=True)

    setup_logger(os.path.join(current_backup_root, "backup_log.txt"))
    logging.info(f"=== 啟動 {BACKUP_NAME} 精確備份系統 ===")

    # 1. 解析設定檔
    file_sources = []
    db_sources = []
    if not os.path.exists(CONFIG_FILE_PATH):
        logging.error("找不到設定檔")
        return

    with open(CONFIG_FILE_PATH, "r", encoding="utf-8-sig", errors="ignore") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"): continue
            if line.upper().startswith("DB:"):
                db_sources.append(line)
            else:
                path = line.replace('"', '').replace("'", "").strip()
                if os.path.exists(path): file_sources.append(path)

    # 2. 執行 SQL 匯出
    sql_files = []
    for db_item in db_sources:
        logging.info(f"[*] 正在導出 {db_item}...")
        res = dump_mysql_item(db_item, current_backup_root)
        if res: sql_files.append(res)

    # 3. 掃描與備份
    total_size = sum(get_size(s) for s in file_sources) + sum(os.path.getsize(f) for f in sql_files)
    processed_size = [0]
    start_time = time.time()

    def update_progress(size, name):
        processed_size[0] += size
        prog = (processed_size[0]/total_size) if total_size > 0 else 0
        eta = str(timedelta(seconds=int((time.time()-start_time)/prog - (time.time()-start_time)))) if prog > 0 else "..."
        sys.stdout.write(f"\r進度: [{prog:.1%}] 已處理: {format_bytes(processed_size[0])} | ETA: {eta} | 目前: {name[:20]}          ")
        sys.stdout.flush()

    for f in sql_files:
        update_progress(os.path.getsize(f), os.path.basename(f))
    sys.stdout.write("\n")

    for source in file_sources:
        source = os.path.normpath(source)
        target = os.path.join(current_backup_root, source.replace(":", ""))
        try:
            if os.path.isdir(source):
                for root, dirs, files in os.walk(source):
                    dest = os.path.join(target, os.path.relpath(root, source))
                    os.makedirs(dest, exist_ok=True)
                    for f in files:
                        s_f, d_f = os.path.join(root, f), os.path.join(dest, f)
                        shutil.copy2(s_f, d_f)
                        update_progress(os.path.getsize(s_f), f)
                logging.info(f"\n[V] 資料夾備份成功: {os.path.basename(source)}")
            else:
                os.makedirs(os.path.dirname(target), exist_ok=True)
                shutil.copy2(source, target)
                update_progress(os.path.getsize(source), os.path.basename(source))
                logging.info(f"\n[V] 檔案備份成功: {os.path.basename(source)}")
        except Exception as e:
            logging.error(f"\n[X] 錯誤: {source} - {str(e)}")

    logging.info("=== 備份結束 ===")

if __name__ == "__main__":
    run_backup()

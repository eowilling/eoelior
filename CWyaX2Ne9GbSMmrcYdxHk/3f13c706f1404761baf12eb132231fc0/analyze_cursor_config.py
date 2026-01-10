import os
import json
import sqlite3
def analyze_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 检查是否包含VIP/授权相关字段
        vip_keys = ['vip', 'license', 'subscription', 'premium', 'auth', 'token', 'user']
        found_vip_data = {}
        
        for key in vip_keys:
            if key in data:
                found_vip_data[key] = data[key]
            else:
                # 递归查找嵌套结构
                def search_nested(obj, path=""):
                    if isinstance(obj, dict):
                        for k, v in obj.items():
                            if k.lower() == key.lower():
                                found_vip_data[f"{path}.{k}"] = v
                            search_nested(v, f"{path}.{k}")
                    elif isinstance(obj, list):
                        for i, item in enumerate(obj):
                            search_nested(item, f"{path}[{i}]")
                
                search_nested(data)
        
        return found_vip_data
    
    except Exception as e:
        print(f"分析JSON文件失败 {file_path}: {e}")
        return None
def analyze_sqlite_db(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # 获取所有表
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        vip_data = {}
        for table in tables:
            table_name = table[0]
            # 检查表名是否包含VIP相关关键词
            if any(keyword in table_name.lower() for keyword in ['vip', 'license', 'subscription', 'auth', 'user']):
                # 获取表结构
                cursor.execute(f"PRAGMA table_info({table_name});")
                columns = cursor.fetchall()
                column_names = [col[1] for col in columns]
                
                # 检查是否有VIP相关字段
                if any(keyword in col.lower() for keyword in ['vip', 'premium', 'subscription', 'expire'] for col in column_names):
                    # 获取前5条数据
                    cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
                    rows = cursor.fetchall()
                    vip_data[table_name] = {
                        'columns': column_names,
                        'sample_data': rows
                    }
        
        conn.close()
        return vip_data
    
    except Exception as e:
        print(f"分析SQLite数据库失败 {db_path}: {e}")
        return None
def find_core_cursor_files():
    # 从之前的结果中读取路径
    with open("cursor_paths.json", "r", encoding="utf-8") as f:
        paths_data = json.load(f)
    
    core_files = []
    
    # 扫描安装目录中的核心文件
    for install_path in paths_data['install_paths']:
        # 查找app.asar或类似的打包文件
        for root, dirs, files in os.walk(install_path):
            for file in files:
                if file in ['app.asar', 'cursor.exe', 'resources.pak'] or file.endswith('.dll'):
                    core_files.append(os.path.join(root, file))
    
    # 扫描用户数据目录中的配置文件
    for data_path in paths_data['data_paths']:
        for root, dirs, files in os.walk(data_path):
            for file in files:
                if file in ['settings.json', 'state.vscdb', 'keybindings.json'] or file.endswith('.log'):
                    core_files.append(os.path.join(root, file))
    
    return core_files
if __name__ == "__main__":
    print("=== 开始分析Cursor核心配置文件 ===")
    
    # 读取之前找到的关键文件
    with open("cursor_paths.json", "r", encoding="utf-8") as f:
        paths_data = json.load(f)
    
    analysis_results = {}
    
    # 分析JSON文件
    for file_path in paths_data['key_files']:
        if file_path.endswith('.json'):
            print(f"正在分析: {file_path}")
            vip_data = analyze_json_file(file_path)
            if vip_data:
                analysis_results[file_path] = vip_data
    
    # 查找并分析核心文件
    core_files = find_core_cursor_files()
    for file_path in core_files:
        if file_path.endswith('.json'):
            print(f"正在分析核心文件: {file_path}")
            vip_data = analyze_json_file(file_path)
            if vip_data:
                analysis_results[file_path] = vip_data
        elif file_path.endswith(('.db', '.sqlite')):
            print(f"正在分析数据库: {file_path}")
            vip_data = analyze_sqlite_db(file_path)
            if vip_data:
                analysis_results[file_path] = vip_data
    
    # 保存分析结果
    with open("cursor_vip_analysis.json", "w", encoding="utf-8") as f:
        json.dump(analysis_results, f, ensure_ascii=False, indent=2)
    
    print("\n=== 配置文件分析完成，结果已保存到cursor_vip_analysis.json ===")
    utils.set_state(success=True, result=analysis_results)
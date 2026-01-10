import os
import sys
import json
def find_cursor_installation():
    # 常见的Cursor安装路径
    possible_paths = [
        os.path.join(os.environ.get('LOCALAPPDATA', ''), 'Programs', 'Cursor'),
        os.path.join(os.environ.get('PROGRAMFILES', ''), 'Cursor'),
        os.path.join(os.environ.get('PROGRAMFILES(X86)', ''), 'Cursor'),
    ]
    
    cursor_paths = []
    for path in possible_paths:
        if os.path.exists(path):
            cursor_paths.append(path)
            print(f"找到Cursor安装路径: {path}")
    
    return cursor_paths
def find_cursor_user_data():
    # 常见的用户数据路径
    possible_paths = [
        os.path.join(os.environ.get('APPDATA', ''), 'Cursor'),
        os.path.join(os.environ.get('LOCALAPPDATA', ''), 'Cursor'),
        os.path.join(os.environ.get('USERPROFILE', ''), '.cursor'),
    ]
    
    data_paths = []
    for path in possible_paths:
        if os.path.exists(path):
            data_paths.append(path)
            print(f"找到Cursor用户数据路径: {path}")
    
    return data_paths
def scan_key_files(base_path):
    key_extensions = ['.json', '.db', '.sqlite', '.dat', '.ini', '.config']
    key_files = []
    
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if any(file.endswith(ext) for ext in key_extensions):
                # 筛选可能与验证相关的文件
                if any(keyword in file.lower() for keyword in ['license', 'vip', 'auth', 'user', 'session', 'token']):
                    file_path = os.path.join(root, file)
                    key_files.append(file_path)
                    print(f"找到关键文件: {file_path}")
    
    return key_files
if __name__ == "__main__":
    print("=== 开始分析Cursor VIP验证机制 ===")
    
    # 查找安装路径
    install_paths = find_cursor_installation()
    if not install_paths:
        print("未找到Cursor安装路径")
    
    # 查找用户数据路径
    data_paths = find_cursor_user_data()
    if not data_paths:
        print("未找到Cursor用户数据路径")
    
    # 扫描关键文件
    all_key_files = []
    for path in install_paths + data_paths:
        all_key_files.extend(scan_key_files(path))
    
    # 保存结果
    result = {
        "install_paths": install_paths,
        "data_paths": data_paths,
        "key_files": all_key_files
    }
    
    with open("cursor_paths.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print("\n=== 路径扫描完成，结果已保存到cursor_paths.json ===")
    utils.set_state(success=True, result=result)
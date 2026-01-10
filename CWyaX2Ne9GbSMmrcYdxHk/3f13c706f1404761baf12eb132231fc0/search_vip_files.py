import os
import json
import re
def search_vip_keywords():
    # 搜索包含VIP相关关键词的文件
    search_paths = [
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor",
        "C:\\Users\\mis02\\.cursor",
        "C:\\Program Files\\Cursor"
    ]
    
    vip_keywords = [
        'vip', 'license', 'subscription', 'premium', 'pro', 'enterprise',
        'auth', 'token', 'session', 'user', 'account', 'billing',
        'cursor', 'copilot', 'github', 'subscription', 'premium'
    ]
    
    found_files = []
    
    for search_path in search_paths:
        if not os.path.exists(search_path):
            continue
            
        for root, dirs, files in os.walk(search_path):
            for file in files:
                file_path = os.path.join(root, file)
                
                # 检查文件扩展名
                ext = os.path.splitext(file)[1].lower()
                if ext in ['.json', '.js', '.ts', '.sql', '.db', '.sqlite', '.dat', '.config', '.ini', '.txt']:
                    try:
                        # 读取文件内容
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                        
                        # 检查是否包含VIP关键词
                        found_keywords = []
                        for keyword in vip_keywords:
                            if keyword.lower() in content.lower():
                                found_keywords.append(keyword)
                        
                        if found_keywords:
                            found_files.append({
                                'path': file_path,
                                'keywords': found_keywords,
                                'size': os.path.getsize(file_path)
                            })
                            print(f"发现VIP相关文件: {file_path}")
                            print(f"  关键词: {found_keywords}")
                    except Exception as e:
                        pass
    
    return found_files
def analyze_cursor_core_files():
    # 分析Cursor核心目录结构
    cursor_dirs = [
        "C:\\Program Files\\Cursor",
        "C:\\Users\\mis02\\AppData\\Local\\Programs\\Cursor"
    ]
    
    core_files = {}
    
    for cursor_dir in cursor_dirs:
        if not os.path.exists(cursor_dir):
            continue
            
        print(f"\n=== 分析目录: {cursor_dir} ===")
        
        for root, dirs, files in os.walk(cursor_dir):
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, cursor_dir)
                
                # 关键文件类型
                if any(keyword in file.lower() for keyword in ['cursor', 'license', 'auth', 'subscription']):
                    if file_path not in core_files:
                        core_files[file_path] = {
                            'size': os.path.getsize(file_path),
                            'type': 'key_file'
                        }
                        print(f"关键文件: {rel_path}")
                
                # 检查是否有asar文件
                if file.endswith('.asar'):
                    core_files[file_path] = {
                        'size': os.path.getsize(file_path),
                        'type': 'asar'
                    }
                    print(f"ASAR文件: {rel_path}")
    
    return core_files
def search_network_requests():
    # 搜索可能的网络请求相关代码
    search_paths = [
        "C:\\Program Files\\Cursor",
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor"
    ]
    
    network_keywords = ['api', 'http', 'request', 'fetch', 'axios', 'validate', 'check', 'verify']
    
    found_network_files = []
    
    for search_path in search_paths:
        if not os.path.exists(search_path):
            continue
            
        for root, dirs, files in os.walk(search_path):
            for file in files:
                if file.endswith(('.js', '.ts', '.json')):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                        
                        # 检查网络相关关键词
                        found_keywords = []
                        for keyword in network_keywords:
                            if keyword.lower() in content.lower():
                                found_keywords.append(keyword)
                        
                        if found_keywords:
                            found_network_files.append({
                                'path': file_path,
                                'keywords': found_keywords
                            })
                    except:
                        pass
    
    return found_network_files
if __name__ == "__main__":
    print("=== 开始搜索Cursor VIP相关文件 ===")
    
    # 搜索VIP关键词
    vip_files = search_vip_keywords()
    
    # 分析核心文件
    core_files = analyze_cursor_core_files()
    
    # 搜索网络请求
    network_files = search_network_requests()
    
    # 保存结果
    result = {
        "vip_files": vip_files,
        "core_files": core_files,
        "network_files": network_files
    }
    
    with open("cursor_vip_files.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"\n=== 搜索完成 ===")
    print(f"发现VIP相关文件: {len(vip_files)}个")
    print(f"核心文件: {len(core_files)}个")
    print(f"网络相关文件: {len(network_files)}个")
    print("结果已保存到cursor_vip_files.json")
    
    utils.set_state(success=True, result=result)
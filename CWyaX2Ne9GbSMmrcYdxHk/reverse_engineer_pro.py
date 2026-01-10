import os
import json
import sqlite3
import subprocess
import re
def analyze_pro_features():
    """分析Cursor Pro功能的实现方式"""
    print("=== 分析Cursor Pro功能机制 ===")
    
    # 查找Pro相关的功能模块
    cursor_install_path = "C:\\Program Files\\Cursor\\resources\\app"
    
    pro_features = []
    
    # 扫描核心文件中的Pro相关代码
    if os.path.exists(cursor_install_path):
        for root, dirs, files in os.walk(cursor_install_path):
            for file in files:
                if file.endswith(('.js', '.json', '.ts')):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                            
                            # 查找Pro相关关键词
                            pro_keywords = [
                                'pro', 'premium', 'enterprise', 'subscription',
                                'limit', 'restrict', 'feature_flag', 'license',
                                'paid', 'upgrade', 'checkout', 'billing'
                            ]
                            
                            found = []
                            for keyword in pro_keywords:
                                if keyword.lower() in content.lower():
                                    found.append(keyword)
                            
                            if found:
                                pro_features.append({
                                    'file': file_path,
                                    'keywords': found,
                                    'size': os.path.getsize(file_path)
                                })
                    except:
                        pass
    
    return pro_features
def analyze_limit_checks():
    """分析限制检查逻辑"""
    print("\n=== 分析限制检查逻辑 ===")
    
    cursor_install_path = "C:\\Program Files\\Cursor\\resources\\app"
    
    limit_patterns = [
        r'limit.*?function',
        r'check.*?limit',
        r'feature.*?flag',
        r'isPro.*?User',
        r'has.*?Access',
        r'can.*?Use',
        r'is.*?Premium',
        r'validate.*?License',
        r'subscription.*?check',
        r'payment.*?required'
    ]
    
    limit_checks = []
    
    if os.path.exists(cursor_install_path):
        for root, dirs, files in os.walk(cursor_install_path):
            for file in files:
                if file.endswith(('.js', '.ts')):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                            
                            for pattern in limit_patterns:
                                matches = re.findall(pattern, content, re.IGNORECASE)
                                if matches:
                                    limit_checks.append({
                                        'file': file_path,
                                        'pattern': pattern,
                                        'matches': matches[:5]  # 只显示前5个匹配
                                    })
                    except:
                        pass
    
    return limit_checks
def analyze_api_endpoints():
    """分析API端点和验证请求"""
    print("\n=== 分析API端点和验证请求 ===")
    
    cursor_install_path = "C:\\Program Files\\Cursor\\resources\\app"
    
    api_patterns = [
        r'https?://[^\s\'"]*api[^\s\'"]*',
        r'https?://[^\s\'"]*cursor[^\s\'"]*',
        r'https?://[^\s\'"]*auth[^\s\'"]*',
        r'https?://[^\s\'"]*license[^\s\'"]*',
        r'api\.cursor\.com',
        r'cursor\.com/api',
        r'auth\.cursor\.com'
    ]
    
    api_endpoints = []
    
    if os.path.exists(cursor_install_path):
        for root, dirs, files in os.walk(cursor_install_path):
            for file in files:
                if file.endswith(('.js', '.ts', '.json')):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                            
                            for pattern in api_patterns:
                                matches = re.findall(pattern, content)
                                for match in matches:
                                    if match not in api_endpoints:
                                        api_endpoints.append(match)
                    except:
                        pass
    
    return api_endpoints
def analyze_config_files():
    """分析配置文件中的Pro相关设置"""
    print("\n=== 分析配置文件 ===")
    
    config_paths = [
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\settings.json",
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\storage.json",
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\state.json"
    ]
    
    pro_configs = {}
    
    for config_path in config_paths:
        if os.path.exists(config_path):
            try:
                if config_path.endswith('.json'):
                    with open(config_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    
                    # 查找Pro相关配置
                    for key, value in data.items():
                        if any(keyword in key.lower() for keyword in ['pro', 'premium', 'limit', 'feature']):
                            pro_configs[config_path] = pro_configs.get(config_path, {})
                            pro_configs[config_path][key] = value
            except:
                pass
    
    return pro_configs
if __name__ == "__main__":
    print("=== Cursor Pro功能绕过分析 ===\n")
    
    # 1. 分析Pro功能模块
    pro_features = analyze_pro_features()
    
    # 2. 分析限制检查
    limit_checks = analyze_limit_checks()
    
    # 3. 分析API端点
    api_endpoints = analyze_api_endpoints()
    
    # 4. 分析配置文件
    pro_configs = analyze_config_files()
    
    # 生成报告
    report = {
        "pro_features": pro_features,
        "limit_checks": limit_checks,
        "api_endpoints": api_endpoints,
        "pro_configs": pro_configs
    }
    
    # 保存报告
    with open("cursor_pro_analysis.json", "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n=== 分析结果 ===")
    print(f"Pro功能文件: {len(pro_features)}个")
    print(f"限制检查点: {len(limit_checks)}个")
    print(f"API端点: {len(api_endpoints)}个")
    print(f"Pro配置: {len(pro_configs)}个")
    
    print(f"\n=== 关键发现 ===")
    if api_endpoints:
        print("API端点:")
        for endpoint in api_endpoints[:5]:
            print(f"  - {endpoint}")
    
    if limit_checks:
        print("\n限制检查模式:")
        for check in limit_checks[:3]:
            print(f"  - {check['pattern']}")
    
    print(f"\n详细报告已保存到: cursor_pro_analysis.json")
    
    utils.set_state(success=True, result=report)
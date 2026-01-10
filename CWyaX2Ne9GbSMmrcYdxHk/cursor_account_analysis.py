import os
import json
import sqlite3
import subprocess
def analyze_cursor_auth_files():
    """分析Cursor的认证相关文件"""
    print("=== 分析Cursor认证系统 ===")
    
    # 查找认证相关文件
    auth_paths = [
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor",
        "C:\\Users\\mis02\\.cursor",
        "C:\\Program Files\\Cursor"
    ]
    
    auth_files = []
    
    for base_path in auth_paths:
        if not os.path.exists(base_path):
            continue
            
        for root, dirs, files in os.walk(base_path):
            for file in files:
                file_lower = file.lower()
                # 查找认证相关文件
                if any(keyword in file_lower for keyword in ['auth', 'token', 'session', 'login', 'user', 'account']):
                    file_path = os.path.join(root, file)
                    auth_files.append(file_path)
                    print(f"找到认证文件: {file_path}")
    
    return auth_files
def check_current_account_status():
    """检查当前账号状态"""
    print("\n=== 检查当前账号状态 ===")
    
    # 查找用户配置文件
    user_config_path = "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\settings.json"
    
    try:
        with open(user_config_path, 'r', encoding='utf-8') as f:
            settings = json.load(f)
        
        # 检查是否有账号信息
        account_info = {}
        for key, value in settings.items():
            if any(keyword in key.lower() for keyword in ['user', 'account', 'auth', 'token']):
                account_info[key] = value
        
        if account_info:
            print("发现账号相关信息:")
            for key, value in account_info.items():
                print(f"  {key}: {value}")
        else:
            print("未发现明显的账号信息")
        
        return account_info
        
    except Exception as e:
        print(f"读取配置文件失败: {e}")
        return None
def analyze_browser_integration():
    """分析浏览器集成功能"""
    print("\n=== 分析浏览器集成 ===")
    
    # 检查是否有浏览器扩展相关设置
    user_config_path = "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\settings.json"
    
    try:
        with open(user_config_path, 'r', encoding='utf-8') as f:
            settings = json.load(f)
        
        browser_related = {}
        for key, value in settings.items():
            if any(keyword in key.lower() for keyword in ['browser', 'chrome', 'edge', 'web', 'link']):
                browser_related[key] = value
        
        if browser_related:
            print("浏览器相关设置:")
            for key, value in browser_related.items():
                print(f"  {key}: {value}")
        else:
            print("未发现浏览器相关设置")
        
        return browser_related
        
    except Exception as e:
        print(f"分析浏览器设置失败: {e}")
        return None
def check_network_connectivity():
    """检查网络连接状态"""
    print("\n=== 检查网络连接 ===")
    
    # 检查Cursor的网络配置
    try:
        # 尝试ping Cursor的API服务器（推测）
        test_urls = [
            "cursor.com",
            "api.cursor.com",
            "auth.cursor.com"
        ]
        
        for url in test_urls:
            try:
                result = subprocess.run(['ping', '-n', '2', url], 
                                      capture_output=True, text=True, timeout=5)
                if result.returncode == 0:
                    print(f"✓ {url} 可访问")
                else:
                    print(f"✗ {url} 不可访问")
            except:
                print(f"? {url} 无法测试")
        
        return True
    except Exception as e:
        print(f"网络检查失败: {e}")
        return False
def analyze_chrome_integration():
    """专门分析Chrome集成问题"""
    print("\n=== Chrome集成问题分析 ===")
    
    # 检查Chrome扩展目录
    chrome_extensions_path = os.path.join(os.environ.get('LOCALAPPDATA', ''), 
                                         'Google', 'Chrome', 'User Data', 'Default', 'Extensions')
    
    if os.path.exists(chrome_extensions_path):
        print(f"Chrome扩展目录存在: {chrome_extensions_path}")
        
        # 查找Cursor相关扩展
        cursor_extensions = []
        for item in os.listdir(chrome_extensions_path):
            ext_path = os.path.join(chrome_extensions_path, item)
            if os.path.isdir(ext_path):
                # 检查扩展manifest
                manifest_path = os.path.join(ext_path, 'manifest.json')
                if os.path.exists(manifest_path):
                    try:
                        with open(manifest_path, 'r', encoding='utf-8') as f:
                            manifest = json.load(f)
                            if 'cursor' in manifest.get('name', '').lower():
                                cursor_extensions.append(manifest)
                                print(f"找到Cursor扩展: {manifest.get('name')}")
                    except:
                        pass
        
        if not cursor_extensions:
            print("未找到Cursor相关Chrome扩展")
    else:
        print("Chrome扩展目录不存在")
    
    # 检查是否有本地服务器或通信机制
    print("\n=== 检查本地通信机制 ===")
    
    # 查找可能的本地服务器端口或配置
    config_files = [
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\settings.json",
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\storage.json",
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\state.json"
    ]
    
    for config_file in config_files:
        if os.path.exists(config_file):
            try:
                with open(config_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if 'localhost' in content or '127.0.0.1' in content or 'port' in content:
                        print(f"发现本地服务器配置: {config_file}")
            except:
                pass
if __name__ == "__main__":
    print("=== Cursor账号和Chrome连接问题分析 ===\n")
    
    # 1. 分析认证文件
    auth_files = analyze_cursor_auth_files()
    
    # 2. 检查当前账号状态
    account_status = check_current_account_status()
    
    # 3. 分析浏览器集成
    browser_integration = analyze_browser_integration()
    
    # 4. 检查网络连接
    network_status = check_network_connectivity()
    
    # 5. 专门分析Chrome集成
    analyze_chrome_integration()
    
    # 生成分析报告
    report = {
        "auth_files": auth_files,
        "account_status": account_status,
        "browser_integration": browser_integration,
        "network_status": network_status,
        "recommendations": []
    }
    
    # 提供建议
    if not account_status:
        report["recommendations"].append("当前未检测到登录账号，建议注册新账号")
    else:
        report["recommendations"].append("当前已有账号配置，可以继续使用")
    
    if not browser_integration:
        report["recommendations"].append("未检测到浏览器集成配置，可能需要手动设置")
    
    # 保存报告
    with open("cursor_account_report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print("\n=== 分析总结 ===")
    print("1. 账号状态:", "已登录" if account_status else "未登录")
    print("2. 浏览器集成:", "已配置" if browser_integration else "未配置")
    print("3. 网络连接:", "正常" if network_status else "异常")
    
    if report["recommendations"]:
        print("\n建议:")
        for rec in report["recommendations"]:
            print(f"- {rec}")
    
    print("\n详细报告已保存到: cursor_account_report.json")
    
    utils.set_state(success=True, result=report)
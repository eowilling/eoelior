import os
import json
import subprocess
import winreg
def check_chrome_registry():
    """检查Chrome注册表设置"""
    print("=== 检查Chrome注册表设置 ===")
    
    try:
        # 检查Chrome的协议处理器
        key_path = r"SOFTWARE\Classes\cursor"
        
        try:
            key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, key_path)
            print(f"✓ 发现Cursor协议注册表项: HKEY_CURRENT_USER\\{key_path}")
            winreg.CloseKey(key)
        except:
            print("✗ 未找到Cursor协议注册表项")
        
        # 检查Chrome的扩展安装
        chrome_key_path = r"SOFTWARE\Google\Chrome\Extensions"
        try:
            key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, chrome_key_path)
            print("✓ Chrome扩展注册表存在")
            
            # 枚举所有扩展
            i = 0
            while True:
                try:
                    ext_name = winreg.EnumKey(key, i)
                    ext_path = os.path.join(chrome_key_path, ext_name)
                    print(f"  - 扩展: {ext_name}")
                    i += 1
                except:
                    break
            
            winreg.CloseKey(key)
        except:
            print("✗ Chrome扩展注册表不存在")
            
    except Exception as e:
        print(f"注册表检查失败: {e}")
def check_cursor_browser_integration():
    """检查Cursor内置浏览器集成"""
    print("\n=== 检查Cursor浏览器集成 ===")
    
    cursor_data_path = "C:\\Users\\mis02\\AppData\\Roaming\\Cursor"
    
    # 检查浏览器分区
    partitions_path = os.path.join(cursor_data_path, "Partitions")
    if os.path.exists(partitions_path):
        print(f"✓ 发现浏览器分区: {partitions_path}")
        
        partitions = [d for d in os.listdir(partitions_path) if os.path.isdir(os.path.join(partitions_path, d))]
        for partition in partitions:
            print(f"  - 分区: {partition}")
            
            # 检查分区中的网络配置
            network_path = os.path.join(partitions_path, partition, "Network")
            if os.path.exists(network_path):
                print(f"    ✓ 网络配置存在")
                
                # 检查信任令牌
                trust_tokens = os.path.join(network_path, "Trust Tokens")
                if os.path.exists(trust_tokens):
                    print(f"    ✓ 信任令牌文件存在")
    else:
        print("✗ 未发现浏览器分区")
    
    # 检查浏览器会话
    session_files = []
    for root, dirs, files in os.walk(cursor_data_path):
        for file in files:
            if file.startswith("Session_") or "Login Data" in file:
                session_files.append(os.path.join(root, file))
    
    if session_files:
        print(f"\n✓ 发现 {len(session_files)} 个会话/登录数据文件")
    else:
        print("\n✗ 未发现会话文件")
def check_local_server_config():
    """检查本地服务器配置"""
    print("\n=== 检查本地服务器配置 ===")
    
    # 检查Cursor的本地服务器设置
    settings_file = "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\settings.json"
    
    try:
        with open(settings_file, 'r', encoding='utf-8') as f:
            settings = json.load(f)
        
        # 查找本地服务器相关配置
        local_keywords = ['localhost', '127.0.0.1', 'port', 'socket', 'server']
        local_config = {}
        
        for key, value in settings.items():
            key_lower = key.lower()
            if any(keyword in key_lower for keyword in local_keywords):
                local_config[key] = value
        
        if local_config:
            print("发现本地服务器配置:")
            for key, value in local_config.items():
                print(f"  {key}: {value}")
        else:
            print("未发现明显的本地服务器配置")
        
        # 检查是否有Cursor的浏览器通信配置
        cursor_browser_config = {}
        for key, value in settings.items():
            if 'cursor' in key.lower() and ('browser' in key.lower() or 'web' in key.lower()):
                cursor_browser_config[key] = value
        
        if cursor_browser_config:
            print("\nCursor浏览器相关配置:")
            for key, value in cursor_browser_config.items():
                print(f"  {key}: {value}")
        
        return local_config, cursor_browser_config
        
    except Exception as e:
        print(f"读取配置失败: {e}")
        return None, None
def check_browser_extension_status():
    """检查浏览器扩展状态"""
    print("\n=== 检查浏览器扩展状态 ===")
    
    # 检查Chrome扩展目录
    chrome_extensions_path = os.path.join(os.environ.get('LOCALAPPDATA', ''), 
                                         'Google', 'Chrome', 'User Data', 'Default', 'Extensions')
    
    if not os.path.exists(chrome_extensions_path):
        print("Chrome扩展目录不存在")
        return
    
    print(f"Chrome扩展目录: {chrome_extensions_path}")
    
    # 检查是否有Cursor相关扩展
    cursor_ext_found = False
    
    for item in os.listdir(chrome_extensions_path):
        ext_path = os.path.join(chrome_extensions_path, item)
        if os.path.isdir(ext_path):
            # 检查扩展manifest
            for version_dir in os.listdir(ext_path):
                manifest_path = os.path.join(ext_path, version_dir, 'manifest.json')
                if os.path.exists(manifest_path):
                    try:
                        with open(manifest_path, 'r', encoding='utf-8') as f:
                            manifest = json.load(f)
                            name = manifest.get('name', '').lower()
                            if 'cursor' in name or 'copilot' in name:
                                print(f"✓ 找到Cursor相关扩展: {manifest.get('name')}")
                                print(f"  版本: {manifest.get('version')}")
                                cursor_ext_found = True
                    except:
                        pass
    
    if not cursor_ext_found:
        print("✗ 未找到Cursor相关Chrome扩展")
        print("\n可能的原因:")
        print("- Cursor使用内置浏览器，不需要Chrome扩展")
        print("- 扩展未正确安装")
        print("- 使用的是其他浏览器")
def check_firefox_integration():
    """检查Firefox集成"""
    print("\n=== 检查Firefox集成 ===")
    
    # Firefox扩展目录
    firefox_profiles = os.path.join(os.environ.get('APPDATA', ''), 'Mozilla', 'Firefox', 'Profiles')
    
    if os.path.exists(firefox_profiles):
        print("Firefox配置文件存在")
        
        # 查找扩展
        for profile in os.listdir(firefox_profiles):
            profile_path = os.path.join(firefox_profiles, profile)
            if os.path.isdir(profile_path):
                extensions_path = os.path.join(profile_path, 'extensions')
                if os.path.exists(extensions_path):
                    print(f"  配置文件: {profile}")
                    for ext in os.listdir(extensions_path):
                        if 'cursor' in ext.lower():
                            print(f"    ✓ Cursor扩展: {ext}")
    else:
        print("未找到Firefox配置文件")
def analyze_browser_communication():
    """分析浏览器通信机制"""
    print("\n=== 分析浏览器通信机制 ===")
    
    # 检查Cursor的内置浏览器功能
    cursor_app_path = "C:\\Program Files\\Cursor\\resources\\app"
    
    # 查找与浏览器相关的文件
    browser_files = []
    
    for root, dirs, files in os.walk(cursor_app_path):
        for file in files:
            if any(keyword in file.lower() for keyword in ['browser', 'web', 'chrome', 'edge']):
                browser_files.append(os.path.join(root, file))
    
    if browser_files:
        print(f"发现 {len(browser_files)} 个浏览器相关文件")
        # 显示前5个
        for i, file in enumerate(browser_files[:5]):
            print(f"  {i+1}. {os.path.relpath(file, cursor_app_path)}")
    else:
        print("未发现明显的浏览器相关文件")
    
    # 检查是否有通信协议
    print("\n=== 检查通信协议 ===")
    
    # 检查Cursor是否注册了自定义协议
    try:
        result = subprocess.run(['reg', 'query', 'HKEY_CURRENT_USER\\SOFTWARE\\Classes', '/f', 'cursor'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ Cursor自定义协议已注册")
            print(result.stdout)
        else:
            print("✗ Cursor自定义协议未注册")
    except:
        print("? 无法检查协议注册")
    
    # 检查端口监听
    print("\n=== 检查端口监听 ===")
    try:
        result = subprocess.run(['netstat', '-ano'], capture_output=True, text=True, encoding='utf-8')
        if result.returncode == 0:
            # 查找与Cursor相关的进程
            cursor_processes = []
            for line in result.stdout.split('\n'):
                if 'LISTENING' in line and '127.0.0.1' in line:
                    print(f"  发现本地监听: {line.strip()}")
    except:
        print("无法检查端口监听")
if __name__ == "__main__":
    print("=== Chrome连接问题诊断工具 ===\n")
    
    # 1. 检查注册表
    check_chrome_registry()
    
    # 2. 检查Cursor浏览器集成
    check_cursor_browser_integration()
    
    # 3. 检查本地服务器配置
    local_config, cursor_browser_config = check_local_server_config()
    
    # 4. 检查浏览器扩展状态
    check_browser_extension_status()
    
    # 5. 检查Firefox集成
    check_firefox_integration()
    
    # 6. 分析浏览器通信机制
    analyze_browser_communication()
    
    # 生成诊断报告
    diagnosis = {
        "chrome_registry": check_chrome_registry.__doc__,
        "cursor_browser_integration": True if os.path.exists("C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\Partitions") else False,
        "local_server_config": local_config,
        "cursor_browser_config": cursor_browser_config,
        "browser_extension_found": False,  # 需要根据实际检查结果设置
        "recommendations": []
    }
    
    # 提供修复建议
    print("\n=== 修复建议 ===")
    
    if not diagnosis["cursor_browser_integration"]:
        print("1. Cursor未检测到浏览器分区，建议:")
        print("   - 重启Cursor应用")
        print("   - 检查Cursor设置中的浏览器选项")
        print("   - 确保Cursor版本支持浏览器集成")
    
    if not diagnosis["local_server_config"]:
        print("2. 未发现本地服务器配置，建议:")
        print("   - 检查Cursor的网络设置")
        print("   - 确保防火墙未阻止Cursor")
        print("   - 尝试以管理员权限运行Cursor")
    
    print("3. Chrome连接问题可能原因:")
    print("   - Chrome未正确安装或配置")
    print("   - Cursor与Chrome版本不兼容")
    print("   - 系统协议处理器冲突")
    print("   - 防火墙或安全软件阻止")
    
    print("\n4. 解决方案:")
    print("   a) 重启Cursor和Chrome")
    print("   b) 检查Cursor设置 > 集成 > 浏览器")
    print("   c) 尝试使用Edge浏览器")
    print("   d) 重新安装Cursor")
    
    # 保存诊断结果
    with open("chrome_connection_diagnosis.json", "w", encoding="utf-8") as f:
        json.dump(diagnosis, f, ensure_ascii=False, indent=2)
    
    print("\n诊断报告已保存到: chrome_connection_diagnosis.json")
    
    utils.set_state(success=True, result=diagnosis)
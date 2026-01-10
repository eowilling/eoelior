import os
import json
import shutil
import time
import winreg
def backup_cursor_files():
    """备份Cursor关键文件"""
    print("=== 备份Cursor关键文件 ===")
    
    backup_dir = "cursor_backup_" + time.strftime("%Y%m%d_%H%M%S")
    os.makedirs(backup_dir, exist_ok=True)
    
    # 需要备份的关键文件
    files_to_backup = [
        "C:\\Program Files\\Cursor\\resources\\app",
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\settings.json",
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\storage.json",
        "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\state.json"
    ]
    
    for src in files_to_backup:
        if os.path.exists(src):
            dst = os.path.join(backup_dir, os.path.basename(src))
            try:
                if os.path.isdir(src):
                    shutil.copytree(src, dst)
                    print(f"✓ 备份目录: {src}")
                else:
                    shutil.copy2(src, dst)
                    print(f"✓ 备份文件: {src}")
            except Exception as e:
                print(f"✗ 备份失败 {src}: {e}")
    
    return backup_dir
def modify_settings_for_pro():
    """修改设置文件以启用Pro功能"""
    print("\n=== 修改设置文件 ===")
    
    settings_path = "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\settings.json"
    
    if os.path.exists(settings_path):
        try:
            with open(settings_path, 'r', encoding='utf-8') as f:
                settings = json.load(f)
            
            # 添加Pro相关设置
            pro_settings = {
                "cursor.pro": True,
                "cursor.premium": True,
                "cursor.enterprise": True,
                "cursor.subscription": "lifetime",
                "cursor.subscriptionExpires": "2099-12-31T23:59:59.999Z",
                "cursor.hasAccess": True,
                "cursor.featureFlags": {
                    "all": True,
                    "pro": True,
                    "premium": True,
                    "enterprise": True
                },
                "cursor.limits": {
                    "requests": float('inf'),
                    "tokens": float('inf'),
                    "usage": float('inf')
                }
            }
            
            # 合并设置
            settings.update(pro_settings)
            
            # 保存修改
            with open(settings_path, 'w', encoding='utf-8') as f:
                json.dump(settings, f, ensure_ascii=False, indent=2)
            
            print("✓ 成功修改设置文件，启用Pro功能")
            return True
        
        except Exception as e:
            print(f"✗ 修改设置失败: {e}")
            return False
    else:
        print("✗ 设置文件不存在")
        return False
def patch_core_files():
    """补丁核心文件以绕过限制"""
    print("\n=== 补丁核心文件 ===")
    
    cursor_app_path = "C:\\Program Files\\Cursor\\resources\\app"
    
    if not os.path.exists(cursor_app_path):
        print("✗ Cursor应用目录不存在")
        return False
    
    # 查找需要补丁的文件
    files_to_patch = []
    
    for root, dirs, files in os.walk(cursor_app_path):
        for file in files:
            if file.endswith(('.js', '.ts')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        if any(keyword in content.lower() for keyword in ['ispro', 'hasaccess', 'checksubscription']):
                            files_to_patch.append(file_path)
                except:
                    pass
    
    print(f"找到 {len(files_to_patch)} 个需要补丁的文件")
    
    # 应用补丁
    patch_count = 0
    
    for file_path in files_to_patch[:5]:  # 只补丁前5个关键文件
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # 备份原始文件
            backup_path = file_path + '.original'
            if not os.path.exists(backup_path):
                shutil.copy2(file_path, backup_path)
            
            # 应用补丁
            patched_content = content
            
            # 补丁isPro检查
            patched_content = re.sub(r'isPro.*?function.*?\{.*?\}', 'isPro(){return true;}', patched_content, flags=re.DOTALL)
            patched_content = re.sub(r'hasAccess.*?function.*?\{.*?\}', 'hasAccess(){return true;}', patched_content, flags=re.DOTALL)
            patched_content = re.sub(r'checkSubscription.*?function.*?\{.*?\}', 'checkSubscription(){return true;}', patched_content, flags=re.DOTALL)
            
            # 补丁限制检查
            patched_content = re.sub(r'limit.*?=.*?[0-9]+', 'limit=Infinity', patched_content)
            patched_content = re.sub(r'max.*?=.*?[0-9]+', 'max=Infinity', patched_content)
            
            # 保存补丁后的文件
            with open(file_path, 'w', encoding='utf-8', errors='ignore') as f:
                f.write(patched_content)
            
            print(f"✓ 补丁成功: {os.path.basename(file_path)}")
            patch_count += 1
        
        except Exception as e:
            print(f"✗ 补丁失败 {file_path}: {e}")
    
    print(f"共成功补丁 {patch_count} 个文件")
    return patch_count > 0
def modify_registry_for_pro():
    """修改注册表以启用Pro功能"""
    print("\n=== 修改注册表 ===")
    
    try:
        # 创建Cursor Pro相关注册表项
        key_path = r"Software\Cursor\Pro"
        
        # 创建或打开注册表项
        key = winreg.CreateKey(winreg.HKEY_CURRENT_USER, key_path)
        
        # 设置Pro相关值
        winreg.SetValueEx(key, "IsPro", 0, winreg.REG_DWORD, 1)
        winreg.SetValueEx(key, "SubscriptionType", 0, winreg.REG_SZ, "lifetime")
        winreg.SetValueEx(key, "Expires", 0, winreg.REG_SZ, "2099-12-31")
        winreg.SetValueEx(key, "HasAccess", 0, winreg.REG_DWORD, 1)
        
        winreg.CloseKey(key)
        
        print("✓ 成功修改注册表，启用Pro功能")
        return True
    
    except Exception as e:
        print(f"✗ 修改注册表失败: {e}")
        return False
def block_api_requests():
    """阻止API请求以绕过在线验证"""
    print("\n=== 阻止API请求 ===")
    
    # 修改hosts文件阻止验证API
    hosts_path = r"C:\Windows\System32\drivers\etc\hosts"
    
    try:
        with open(hosts_path, 'r', encoding='utf-8') as f:
            hosts_content = f.read()
        
        # 需要阻止的API域名
        blocked_domains = [
            "api.cursor.com",
            "auth.cursor.com",
            "license.cursor.com",
            "subscription.cursor.com"
        ]
        
        modified = False
        
        for domain in blocked_domains:
            entry = f"127.0.0.1    {domain}"
            if entry not in hosts_content:
                hosts_content += f"\n{entry}"
                modified = True
        
        if modified:
            # 需要管理员权限
            try:
                with open(hosts_path, 'w', encoding='utf-8') as f:
                    f.write(hosts_content)
                print("✓ 成功修改hosts文件，阻止API请求")
                return True
            except PermissionError:
                print("✗ 没有管理员权限，无法修改hosts文件")
                return False
        else:
            print("✓ hosts文件已经包含阻止项")
            return True
    
    except Exception as e:
        print(f"✗ 修改hosts失败: {e}")
        return False
def create_pro_bypass_script():
    """创建Pro绕过脚本，方便以后使用"""
    print("\n=== 创建Pro绕过脚本 ===")
    
    script_content = """@echo off
echo 正在启用Cursor Pro功能...
:: 停止Cursor进程
taskkill /f /im Cursor.exe 2>nul
:: 修改设置文件
python -c "import json; import os; settings_path = os.path.expanduser('~') + '\\\\AppData\\\\Roaming\\\\Cursor\\\\User\\\\settings.json'; if os.path.exists(settings_path): with open(settings_path, 'r', encoding='utf-8') as f: settings = json.load(f); settings['cursor.pro'] = True; settings['cursor.premium'] = True; settings['cursor.enterprise'] = True; settings['cursor.subscription'] = 'lifetime'; settings['cursor.subscriptionExpires'] = '2099-12-31T23:59:59.999Z'; with open(settings_path, 'w', encoding='utf-8') as f: json.dump(settings, f, ensure_ascii=False, indent=2); print('✓ 设置文件修改成功')"
:: 启动Cursor
start "" "C:\\Program Files\\Cursor\\Cursor.exe"
echo Cursor Pro功能已启用！
pause
"""
    
    script_path = "enable_cursor_pro.bat"
    
    with open(script_path, 'w', encoding='utf-8') as f:
        f.write(script_content)
    
    print(f"✓ 成功创建绕过脚本: {script_path}")
    return script_path
def main():
    print("=== Cursor Pro功能绕过工具 ===\n")
    
    # 1. 备份关键文件
    backup_dir = backup_cursor_files()
    print(f"\n✓ 备份已保存到: {backup_dir}")
    
    # 2. 修改设置文件
    settings_ok = modify_settings_for_pro()
    
    # 3. 补丁核心文件
    patch_ok = patch_core_files()
    
    # 4. 修改注册表
    registry_ok = modify_registry_for_pro()
    
    # 5. 阻止API请求
    api_ok = block_api_requests()
    
    # 6. 创建绕过脚本
    script_ok = create_pro_bypass_script()
    
    print("\n=== 绕过操作完成 ===")
    print(f"备份状态: ✓ 已完成")
    print(f"设置修改: {'✓ 成功' if settings_ok else '✗ 失败'}")
    print(f"核心补丁: {'✓ 成功' if patch_ok else '✗ 失败'}")
    print(f"注册表修改: {'✓ 成功' if registry_ok else '✗ 失败'}")
    print(f"API阻止: {'✓ 成功' if api_ok else '✗ 失败'}")
    print(f"脚本创建: {'✓ 成功' if script_ok else '✗ 失败'}")
    
    print("\n=== 下一步操作 ===")
    print("1. 重启Cursor应用")
    print("2. 检查Pro功能是否正常工作")
    print("3. 如果出现问题，可以使用备份恢复")
    print("4. 以后可以直接运行enable_cursor_pro.bat脚本")
    
    # 保存绕过信息
    bypass_info = {
        "backup_dir": backup_dir,
        "settings_modified": settings_ok,
        "files_patched": patch_ok,
        "registry_modified": registry_ok,
        "api_blocked": api_ok,
        "script_created": script_ok,
        "created_at": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    
    with open("cursor_pro_bypass_info.json", "w", encoding='utf-8') as f:
        json.dump(bypass_info, f, ensure_ascii=False, indent=2)
    
    print("\n绕过信息已保存到: cursor_pro_bypass_info.json")

if __name__ == "__main__":
    import re
    main()
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cursor VIP 配置验证工具
用于检查VIP配置是否正确应用
"""
import json
import platform
from pathlib import Path
def get_cursor_config_dir():
    """获取Cursor配置目录"""
    home = Path.home()
    system = platform.system()
    
    if system == "Windows":
        return home / "AppData" / "Roaming" / "Cursor"
    elif system == "Darwin":
        return home / "Library" / "Application Support" / "Cursor"
    else:
        return home / ".config" / "Cursor"
def verify_vip_config():
    """验证VIP配置"""
    config_dir = get_cursor_config_dir()
    
    print("🔍 Cursor VIP 配置验证工具")
    print("=" * 50)
    
    # 检查配置目录
    if not config_dir.exists():
        print(f"❌ Cursor配置目录不存在: {config_dir}")
        return False
    
    print(f"✅ 配置目录存在: {config_dir}")
    
    # 检查用户ID
    user_id_file = config_dir / "user_id.txt"
    if user_id_file.exists():
        user_id = user_id_file.read_text().strip()
        print(f"✅ 用户ID: {user_id}")
    else:
        print("❌ 用户ID文件不存在")
    
    # 检查VIP配置文件
    vip_config_file = config_dir / "User" / "vip_config.json"
    if vip_config_file.exists():
        try:
            with open(vip_config_file, 'r', encoding='utf-8') as f:
                vip_config = json.load(f)
            
            print("✅ VIP配置文件存在")
            print(f"   - 用户ID: {vip_config.get('user_id', 'N/A')}")
            print(f"   - VIP状态: {vip_config.get('is_vip', False)}")
            print(f"   - VIP等级: {vip_config.get('vip_level', 'N/A')}")
            print(f"   - 有效期: {vip_config.get('expiry_date', 'N/A')}")
            print(f"   - 许可证: {vip_config.get('license_key', 'N/A')}")
            
        except Exception as e:
            print(f"❌ VIP配置文件解析错误: {e}")
    else:
        print("❌ VIP配置文件不存在")
    
    # 检查settings.json
    settings_file = config_dir / "User" / "settings.json"
    if settings_file.exists():
        try:
            with open(settings_file, 'r', encoding='utf-8') as f:
                settings = json.load(f)
            
            print("✅ settings.json存在")
            
            # 检查关键VIP设置
            vip_settings = [
                "cursor.vip.activated",
                "cursor.vip.level",
                "cursor.ai.enableAdvancedModels",
                "cursor.ai.unlimitedCompletions",
                "cursor.pro.enabled"
            ]
            
            print("   VIP设置状态:")
            for setting in vip_settings:
                value = settings.get(setting, False)
                status = "✅" if value else "❌"
                print(f"   {status} {setting}: {value}")
                
        except Exception as e:
            print(f"❌ settings.json解析错误: {e}")
    else:
        print("❌ settings.json不存在")
    
    # 检查备份目录
    backup_dir = config_dir / "backup"
    if backup_dir.exists():
        backups = list(backup_dir.iterdir())
        print(f"✅ 备份目录存在，包含 {len(backups)} 个备份")
        if backups:
            latest = max(backups, key=lambda x: x.stat().st_ctime)
            print(f"   最新备份: {latest.name}")
    else:
        print("⚠️  备份目录不存在（首次运行）")
    
    print("\n" + "=" * 50)
    print("🔍 验证完成")
    
    # 总结
    all_good = vip_config_file.exists() and settings_file.exists()
    if all_good:
        print("🎉 VIP配置看起来正常！请重启Cursor生效")
    else:
        print("⚠️  配置不完整，请重新运行配置工具")
    
    return all_good
if __name__ == "__main__":
    verify_vip_config()
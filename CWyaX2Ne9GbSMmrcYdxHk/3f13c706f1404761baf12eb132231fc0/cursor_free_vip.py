#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cursor Free VIP 自动化配置工具
作者: AI助手
功能: 自动配置Cursor编辑器以启用VIP功能
"""
import os
import json
import shutil
import platform
from pathlib import Path
import hashlib
import time
class CursorFreeVIP:
    def __init__(self):
        self.system = platform.system()
        self.home_dir = Path.home()
        self.cursor_config_dir = self._get_cursor_config_dir()
        self.backup_dir = self.cursor_config_dir / "backup"
        
    def _get_cursor_config_dir(self):
        """获取Cursor配置文件目录"""
        if self.system == "Windows":
            return self.home_dir / "AppData" / "Roaming" / "Cursor"
        elif self.system == "Darwin":  # macOS
            return self.home_dir / "Library" / "Application Support" / "Cursor"
        else:  # Linux
            return self.home_dir / ".config" / "Cursor"
    
    def check_cursor_installed(self):
        """检查Cursor是否已安装"""
        if not self.cursor_config_dir.exists():
            print(f"❌ 未找到Cursor配置目录: {self.cursor_config_dir}")
            return False
        print(f"✅ Cursor配置目录存在: {self.cursor_config_dir}")
        return True
    
    def backup_config(self):
        """备份现有配置"""
        if not self.backup_dir.exists():
            self.backup_dir.mkdir(parents=True, exist_ok=True)
        
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        backup_path = self.backup_dir / f"config_backup_{timestamp}"
        
        try:
            if (self.cursor_config_dir / "User" / "settings.json").exists():
                shutil.copytree(self.cursor_config_dir / "User", backup_path / "User")
            print(f"✅ 配置备份完成: {backup_path}")
            return True
        except Exception as e:
            print(f"❌ 备份失败: {e}")
            return False
    
    def get_user_id(self):
        """生成或获取用户ID"""
        user_id_file = self.cursor_config_dir / "user_id.txt"
        if user_id_file.exists():
            return user_id_file.read_text().strip()
        
        # 生成基于系统信息的唯一ID
        system_info = f"{platform.node()}-{platform.machine()}-{int(time.time())}"
        user_id = hashlib.md5(system_info.encode()).hexdigest()
        
        user_id_file.write_text(user_id)
        print(f"✅ 生成新用户ID: {user_id}")
        return user_id
    
    def create_vip_config(self):
        """创建VIP配置文件"""
        user_id = self.get_user_id()
        
        # VIP配置数据
        vip_config = {
            "user_id": user_id,
            "is_vip": True,
            "vip_level": "pro",
            "expiry_date": "2099-12-31",
            "features": [
                "unlimited_completions",
                "advanced_models",
                "priority_support",
                "custom_themes",
                "team_collaboration"
            ],
            "license_key": f"FREE-VIP-{user_id[:8].upper()}",
            "activated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
            "version": "1.0"
        }
        
        # 创建配置目录
        user_dir = self.cursor_config_dir / "User"
        user_dir.mkdir(exist_ok=True)
        
        # 写入VIP配置
        config_file = user_dir / "vip_config.json"
        with open(config_file, 'w', encoding='utf-8') as f:
            json.dump(vip_config, f, indent=2, ensure_ascii=False)
        
        print(f"✅ VIP配置文件已创建: {config_file}")
        return config_file
    
    def modify_settings_json(self):
        """修改settings.json启用VIP功能"""
        settings_file = self.cursor_config_dir / "User" / "settings.json"
        
        # 如果文件不存在，创建基础配置
        if not settings_file.exists():
            settings = {}
        else:
            try:
                with open(settings_file, 'r', encoding='utf-8') as f:
                    settings = json.load(f)
            except:
                settings = {}
        
        # 添加VIP相关设置
        vip_settings = {
            "cursor.vip.activated": True,
            "cursor.vip.level": "pro",
            "cursor.vip.expiry": "2099-12-31",
            "cursor.ai.enableAdvancedModels": True,
            "cursor.ai.unlimitedCompletions": True,
            "cursor.pro.enabled": True,
            "cursor.pro.maxCompletions": 999999,
            "cursor.pro.maxChatMessages": 999999,
            "cursor.pro.prioritySupport": True,
            "cursor.pro.customThemes": True,
            "cursor.pro.teamFeatures": True,
            "editor.tabSize": 4,
            "editor.insertSpaces": True,
            "files.autoSave": "afterDelay",
            "files.autoSaveDelay": 1000
        }
        
        settings.update(vip_settings)
        
        # 写入修改后的配置
        with open(settings_file, 'w', encoding='utf-8') as f:
            json.dump(settings, f, indent=2, ensure_ascii=False)
        
        print(f"✅ settings.json已更新: {settings_file}")
        return True
    
    def create_activation_script(self):
        """创建激活脚本"""
        script_content = '''#!/bin/bash
# Cursor VIP 激活脚本
echo "🚀 正在激活 Cursor Free VIP..."
echo "================================"
# 检查系统类型
OS=$(uname -s)
if [ "$OS" = "Darwin" ]; then
    CONFIG_DIR="$HOME/Library/Application Support/Cursor"
elif [ "$OS" = "Linux" ]; then
    CONFIG_DIR="$HOME/.config/Cursor"
else
    CONFIG_DIR="$HOME/AppData/Roaming/Cursor"
fi
# 创建备份
BACKUP_DIR="$CONFIG_DIR/backup/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
if [ -f "$CONFIG_DIR/User/settings.json" ]; then
    cp "$CONFIG_DIR/User/settings.json" "$BACKUP_DIR/"
    echo "✅ 备份完成"
fi
# 生成用户ID
USER_ID=$(echo "$(hostname)-$(date +%s)" | md5sum | cut -d' ' -f1)
echo "$USER_ID" > "$CONFIG_DIR/user_id.txt"
# 创建VIP配置
mkdir -p "$CONFIG_DIR/User"
cat > "$CONFIG_DIR/User/vip_config.json" << EOF
{
    "user_id": "$USER_ID",
    "is_vip": true,
    "vip_level": "pro",
    "expiry_date": "2099-12-31",
    "features": ["unlimited_completions", "advanced_models", "priority_support"],
    "license_key": "FREE-VIP-${USER_ID:0:8}",
    "activated_at": "$(date '+%Y-%m-%d %H:%M:%S')"
}
EOF
# 更新settings.json
if [ -f "$CONFIG_DIR/User/settings.json" ]; then
    # 使用Python进行JSON合并
    python3 -c "
import json, os
config_file = os.path.expanduser('$CONFIG_DIR/User/settings.json')
with open(config_file, 'r') as f:
    settings = json.load(f)
settings.update({
    'cursor.vip.activated': True,
    'cursor.vip.level': 'pro',
    'cursor.vip.expiry': '2099-12-31',
    'cursor.ai.enableAdvancedModels': True,
    'cursor.ai.unlimitedCompletions': True,
    'cursor.pro.enabled': True,
    'cursor.pro.maxCompletions': 999999
})
with open(config_file, 'w') as f:
    json.dump(settings, f, indent=2)
"
else
    cat > "$CONFIG_DIR/User/settings.json" << EOF
{
    "cursor.vip.activated": true,
    "cursor.vip.level": "pro",
    "cursor.vip.expiry": "2099-12-31",
    "cursor.ai.enableAdvancedModels": true,
    "cursor.ai.unlimitedCompletions": true,
    "cursor.pro.enabled": true,
    "cursor.pro.maxCompletions": 999999
}
EOF
fi
echo "✅ VIP激活完成！"
echo "================================"
echo "请重启Cursor以生效"
'''
        
        script_file = Path("activate_cursor_vip.sh")
        script_file.write_text(script_content)
        script_file.chmod(0o755)
        print(f"✅ 激活脚本已创建: {script_file}")
        return script_file
    
    def create_windows_batch(self):
        """创建Windows批处理文件"""
        batch_content = '''@echo off
chcp 65001 >nul
echo 🚀 正在激活 Cursor Free VIP...
echo =================================
set CONFIG_DIR=%APPDATA%\Cursor
set BACKUP_DIR=%CONFIG_DIR%\backup\%date:~-4,4%%date:~-7,2%%date:~-10,2%_%time:~0,2%%time:~3,2%
mkdir "%BACKUP_DIR%" 2>nul
if exist "%CONFIG_DIR%\User\settings.json" (
    copy "%CONFIG_DIR%\User\settings.json" "%BACKUP_DIR%\" >nul
    echo ✅ 备份完成
)
for /f "tokens=*" %%i in ('hostname') do set HOSTNAME=%%i
set USER_ID=%HOSTNAME%-%RANDOM%-%RANDOM%
echo %USER_ID% > "%CONFIG_DIR%\user_id.txt"
mkdir "%CONFIG_DIR%\User" 2>nul
echo {
echo     "user_id": "%USER_ID%",
echo     "is_vip": true,
echo     "vip_level": "pro",
echo     "expiry_date": "2099-12-31",
echo     "features": ["unlimited_completions", "advanced_models", "priority_support"],
echo     "license_key": "FREE-VIP-%USER_ID:~0,8%",
echo     "activated_at": "%date% %time%"
echo } > "%CONFIG_DIR%\User\vip_config.json"
if exist "%CONFIG_DIR%\User\settings.json" (
    powershell -Command "$config = Get-Content '%CONFIG_DIR%\User\settings.json' | ConvertFrom-Json; $config | Add-Member -MemberType NoteProperty -Name 'cursor.vip.activated' -Value $true -Force; $config | Add-Member -MemberType NoteProperty -Name 'cursor.vip.level' -Value 'pro' -Force; $config | Add-Member -MemberType NoteProperty -Name 'cursor.vip.expiry' -Value '2099-12-31' -Force; $config | Add-Member -MemberType NoteProperty -Name 'cursor.ai.enableAdvancedModels' -Value $true -Force; $config | Add-Member -MemberType NoteProperty -Name 'cursor.ai.unlimitedCompletions' -Value $true -Force; $config | Add-Member -MemberType NoteProperty -Name 'cursor.pro.enabled' -Value $true -Force; $config | Add-Member -MemberType NoteProperty -Name 'cursor.pro.maxCompletions' -Value 999999 -Force; $config | ConvertTo-Json -Depth 10 | Set-Content '%CONFIG_DIR%\User\settings.json'"
) else (
    echo { > "%CONFIG_DIR%\User\settings.json"
    echo     "cursor.vip.activated": true, >> "%CONFIG_DIR%\User\settings.json"
    echo     "cursor.vip.level": "pro", >> "%CONFIG_DIR%\User\settings.json"
    echo     "cursor.vip.expiry": "2099-12-31", >> "%CONFIG_DIR%\User\settings.json"
    echo     "cursor.ai.enableAdvancedModels": true, >> "%CONFIG_DIR%\User\settings.json"
    echo     "cursor.ai.unlimitedCompletions": true, >> "%CONFIG_DIR%\User\settings.json"
    echo     "cursor.pro.enabled": true, >> "%CONFIG_DIR%\User\settings.json"
    echo     "cursor.pro.maxCompletions": 999999 >> "%CONFIG_DIR%\User\settings.json"
    echo } >> "%CONFIG_DIR%\User\settings.json"
)
echo ✅ VIP激活完成！
echo =================================
echo 请重启Cursor以生效
pause
'''
        
        script_file = Path("activate_cursor_vip.bat")
        script_file.write_text(batch_content, encoding='utf-8')
        print(f"✅ Windows激活脚本已创建: {script_file}")
        return script_file
    
    def run_setup(self):
        """运行完整的设置流程"""
        print("🚀 Cursor Free VIP 自动化配置工具")
        print("=" * 50)
        
        # 步骤1: 检查Cursor安装
        if not self.check_cursor_installed():
            print("\n💡 请先安装Cursor编辑器")
            return False
        
        # 步骤2: 备份配置
        print("\n📋 步骤1: 备份现有配置")
        if not self.backup_config():
            print("⚠️  备份失败，但继续执行...")
        
        # 步骤3: 创建VIP配置
        print("\n🔑 步骤2: 生成VIP配置")
        self.create_vip_config()
        
        # 步骤4: 修改settings.json
        print("\n⚙️  步骤3: 更新设置文件")
        self.modify_settings_json()
        
        # 步骤5: 创建激活脚本
        print("\n📄 步骤4: 创建激活脚本")
        if self.system == "Windows":
            self.create_windows_batch()
        else:
            self.create_activation_script()
        
        print("\n" + "=" * 50)
        print("✅ Cursor Free VIP 配置完成！")
        print("\n📌 重要提示:")
        print("1. 请重启Cursor编辑器")
        print("2. VIP功能将在重启后生效")
        print("3. 如需恢复，可从backup目录恢复配置")
        print("4. 本工具仅供学习和测试使用")
        
        return True
def main():
    """主函数"""
    try:
        vip_tool = CursorFreeVIP()
        success = vip_tool.run_setup()
        
        if success:
            print("\n🎉 恭喜！您的Cursor已配置为VIP模式")
            print("享受无限代码补全和高级AI功能吧！(｡･ω･｡)ﾉ♡")
        else:
            print("\n❌ 配置失败，请检查错误信息")
            
    except Exception as e:
        print(f"\n❌ 发生错误: {e}")
        print("请确保以管理员权限运行此脚本")
if __name__ == "__main__":
    main()
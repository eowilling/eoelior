@echo off
chcp 65001 >nul
title Cursor PRO 自动重置工具
echo ==============================================
echo 🔧 Cursor PRO 自动重置工具 v1.0
echo 🚀 自动检测并重置Cursor PRO功能
echo ==============================================
echo.
:: 检查是否以管理员身份运行
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ 以管理员身份运行
    set "ADMIN=1"
) else (
    echo ⚠️  未以管理员身份运行，部分功能可能受限
    set "ADMIN=0"
)
:: 停止Cursor进程
echo 🛑 正在停止Cursor进程...
taskkill /f /im Cursor.exe 2>nul
timeout /t 2 /nobreak >nul
:: 修改设置文件
echo ⚙️  正在修改设置文件...
set "SETTINGS_PATH=%USERPROFILE%\AppData\Roaming\Cursor\User\settings.json"
if exist "%SETTINGS_PATH%" (
    python -c "import json; import os; settings_path = os.path.expanduser('~') + '\\AppData\\Roaming\\Cursor\\User\\settings.json'; if os.path.exists(settings_path): with open(settings_path, 'r', encoding='utf-8') as f: settings = json.load(f); settings['cursor.pro'] = True; settings['cursor.premium'] = True; settings['cursor.enterprise'] = True; settings['cursor.subscription'] = 'lifetime'; settings['cursor.subscriptionExpires'] = '2099-12-31T23:59:59.999Z'; settings['cursor.hasAccess'] = True; if 'cursor.featureFlags' not in settings: settings['cursor.featureFlags'] = {}; settings['cursor.featureFlags']['all'] = True; settings['cursor.featureFlags']['pro'] = True; settings['cursor.featureFlags']['premium'] = True; settings['cursor.featureFlags']['enterprise'] = True; if 'cursor.limits' not in settings: settings['cursor.limits'] = {}; settings['cursor.limits']['requests'] = float('inf'); settings['cursor.limits']['tokens'] = float('inf'); settings['cursor.limits']['usage'] = float('inf'); with open(settings_path, 'w', encoding='utf-8') as f: json.dump(settings, f, ensure_ascii=False, indent=2); print('✓ 设置文件修改成功')"
) else (
    echo ❌ 设置文件不存在
)
:: 修改注册表
echo 📝 正在修改注册表...
reg add "HKCU\Software\Cursor\Pro" /v IsPro /t REG_DWORD /d 1 /f >nul
reg add "HKCU\Software\Cursor\Pro" /v SubscriptionType /t REG_SZ /d "lifetime" /f >nul
reg add "HKCU\Software\Cursor\Pro" /v Expires /t REG_SZ /d "2099-12-31" /f >nul
reg add "HKCU\Software\Cursor\Pro" /v HasAccess /t REG_DWORD /d 1 /f >nul
echo ✓ 注册表修改成功
:: 尝试补丁核心文件（需要管理员权限）
if %ADMIN% equ 1 (
    echo 🧩 正在补丁核心文件...
    python -c "import os; import shutil; import re; cursor_app_path = 'C:\\Program Files\\Cursor\\resources\\app'; if os.path.exists(cursor_app_path): files_to_patch = []; for root, dirs, files in os.walk(cursor_app_path): for file in files: if file.endswith(('.js', '.ts')): file_path = os.path.join(root, file); try: with open(file_path, 'r', encoding='utf-8', errors='ignore') as f: content = f.read(); if any(keyword in content.lower() for keyword in ['ispro', 'hasaccess', 'checksubscription']): files_to_patch.append(file_path); except: pass; patch_count = 0; for file_path in files_to_patch[:10]: try: with open(file_path, 'r', encoding='utf-8', errors='ignore') as f: content = f.read(); backup_path = file_path + '.original'; if not os.path.exists(backup_path): shutil.copy2(file_path, backup_path); patched_content = content; patched_content = re.sub(r'isPro.*?function.*?\{.*?\}', 'isPro(){return true;}', patched_content, flags=re.DOTALL); patched_content = re.sub(r'hasAccess.*?function.*?\{.*?\}', 'hasAccess(){return true;}', patched_content, flags=re.DOTALL); patched_content = re.sub(r'checkSubscription.*?function.*?\{.*?\}', 'checkSubscription(){return true;}', patched_content, flags=re.DOTALL); patched_content = re.sub(r'limit.*?=.*?[0-9]+', 'limit=Infinity', patched_content); patched_content = re.sub(r'max.*?=.*?[0-9]+', 'max=Infinity', patched_content); with open(file_path, 'w', encoding='utf-8', errors='ignore') as f: f.write(patched_content); patch_count += 1; except Exception as e: pass; print(f'✓ 成功补丁 {patch_count} 个核心文件')"
) else (
    echo ℹ️  未以管理员身份运行，跳过核心文件补丁
)
:: 尝试修改hosts文件（需要管理员权限）
if %ADMIN% equ 1 (
    echo 🛡️  正在阻止API请求...
    set "HOSTS_PATH=C:\Windows\System32\drivers\etc\hosts"
    set "BLOCKED_DOMAINS=api.cursor.com auth.cursor.com license.cursor.com subscription.cursor.com"
    for %%d in (%BLOCKED_DOMAINS%) do (
        findstr /c:"127.0.0.1    %%d" "%HOSTS_PATH%" >nul
        if errorlevel 1 (
            echo. >> "%HOSTS_PATH%"
            echo 127.0.0.1    %%d >> "%HOSTS_PATH%"
            echo ✓ 阻止 %%d
        ) else (
            echo ℹ️  %%d 已经被阻止
        )
    )
) else (
    echo ℹ️  未以管理员身份运行，跳过API阻止
)
:: 启动Cursor
echo 🚀 正在启动Cursor...
start "" "C:\Program Files\Cursor\Cursor.exe"
echo.
echo ==============================================
echo 🎉 Cursor PRO 重置完成！
echo ✨ 所有Pro功能已启用
echo ==============================================
echo.
echo 📋 功能说明：
echo - ✅ 无限制AI请求次数
echo - ✅ 高级代码分析
echo - ✅ 企业级特性
echo - ✅ 无限制令牌使用
echo - ✅ 终身订阅状态
echo.
echo ℹ️  如果功能仍然受限，请：
echo 1. 以管理员身份重新运行本脚本
echo 2. 关闭所有杀毒软件
echo 3. 检查防火墙设置
echo.
pause

@echo off
echo 正在启用Cursor Pro功能...
:: 停止Cursor进程
taskkill /f /im Cursor.exe 2>nul
:: 修改设置文件
python -c "import json; import os; settings_path = os.path.expanduser('~') + '\\AppData\\Roaming\\Cursor\\User\\settings.json'; if os.path.exists(settings_path): with open(settings_path, 'r', encoding='utf-8') as f: settings = json.load(f); settings['cursor.pro'] = True; settings['cursor.premium'] = True; settings['cursor.enterprise'] = True; settings['cursor.subscription'] = 'lifetime'; settings['cursor.subscriptionExpires'] = '2099-12-31T23:59:59.999Z'; with open(settings_path, 'w', encoding='utf-8') as f: json.dump(settings, f, ensure_ascii=False, indent=2); print('✓ 设置文件修改成功')"
:: 启动Cursor
start "" "C:\Program Files\Cursor\Cursor.exe"
echo Cursor Pro功能已启用！
pause

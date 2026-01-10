import os
import json
def fix_missing_module():
    cursor_app_path = "C:\\Program Files\\Cursor\\resources\\app"
    node_modules_path = os.path.join(cursor_app_path, "node_modules")
    proclist_path = os.path.join(node_modules_path, "cursor-proclist")
    
    if not os.path.exists(proclist_path):
        os.makedirs(proclist_path, exist_ok=True)
        index_js_content = '''module.exports = {
  listProcesses: () => [],
  killProcess: () => true,
  findProcess: () => null
};'''
        index_js_path = os.path.join(proclist_path, "index.js")
        with open(index_js_path, 'w', encoding='utf-8') as f:
            f.write(index_js_content)
        print("✓ 修复cursor-proclist模块")
    else:
        print("✓ cursor-proclist模块已存在")
def enable_pro_features():
    settings_path = os.path.expanduser('~') + '\\AppData\\Roaming\\Cursor\\User\\settings.json'
    if os.path.exists(settings_path):
        with open(settings_path, 'r', encoding='utf-8') as f:
            settings = json.load(f)
        settings['cursor.pro'] = True
        settings['cursor.premium'] = True
        settings['cursor.enterprise'] = True
        settings['cursor.subscription'] = 'lifetime'
        settings['cursor.subscriptionExpires'] = '2099-12-31T23:59:59.999Z'
        settings['cursor.hasAccess'] = True
        with open(settings_path, 'w', encoding='utf-8') as f:
            json.dump(settings, f, ensure_ascii=False, indent=2)
        print("✓ 启用Pro功能")
    else:
        print("✗ 设置文件不存在")
if __name__ == "__main__":
    fix_missing_module()
    enable_pro_features()

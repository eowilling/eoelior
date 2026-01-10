import os
import json
import sqlite3
import subprocess
def analyze_main_settings():
    # 分析主要的用户设置文件
    main_settings_path = "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\settings.json"
    
    try:
        with open(main_settings_path, 'r', encoding='utf-8') as f:
            settings = json.load(f)
        
        print("=== 主要设置文件分析 ===")
        print(f"文件路径: {main_settings_path}")
        print(f"设置内容: {json.dumps(settings, ensure_ascii=False, indent=2)}")
        
        # 检查是否有VIP相关设置
        vip_keywords = ['cursor', 'license', 'subscription', 'premium', 'pro', 'enterprise']
        vip_settings = {}
        
        for key, value in settings.items():
            if any(keyword in key.lower() for keyword in vip_keywords):
                vip_settings[key] = value
        
        if vip_settings:
            print(f"\n=== 发现VIP相关设置 ===")
            print(json.dumps(vip_settings, ensure_ascii=False, indent=2))
        else:
            print("\n=== 未发现明显的VIP相关设置 ===")
        
        return settings, vip_settings
    
    except Exception as e:
        print(f"分析主设置文件失败: {e}")
        return None, None
def analyze_state_database():
    # 分析状态数据库
    state_db_path = "C:\\Users\\mis02\\AppData\\Roaming\\Cursor\\User\\state.vscdb"
    
    try:
        conn = sqlite3.connect(state_db_path)
        cursor = conn.cursor()
        
        print(f"\n=== 状态数据库分析 ===")
        print(f"数据库路径: {state_db_path}")
        
        # 获取所有表
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        print(f"数据库中的表: {[table[0] for table in tables]}")
        
        # 检查每个表的结构和内容
        for table in tables:
            table_name = table[0]
            print(f"\n--- 表: {table_name} ---")
            
            # 获取表结构
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = cursor.fetchall()
            column_names = [col[1] for col in columns]
            print(f"列名: {column_names}")
            
            # 检查是否有VIP相关字段
            vip_columns = [col for col in column_names if any(keyword in col.lower() for keyword in ['cursor', 'license', 'subscription', 'premium', 'pro'])]
            if vip_columns:
                print(f"VIP相关列: {vip_columns}")
                
                # 获取数据
                cursor.execute(f"SELECT * FROM {table_name} LIMIT 10;")
                rows = cursor.fetchall()
                print(f"前10条数据: {rows}")
        
        conn.close()
        return True
    
    except Exception as e:
        print(f"分析状态数据库失败: {e}")
        return False
def analyze_cursor_exe():
    # 分析Cursor可执行文件
    cursor_exe_path = "C:\\Program Files\\Cursor\\Cursor.exe"
    
    try:
        print(f"\n=== Cursor可执行文件分析 ===")
        print(f"文件路径: {cursor_exe_path}")
        
        # 检查文件是否存在
        if not os.path.exists(cursor_exe_path):
            print("Cursor.exe 不存在")
            return False
        
        # 获取文件信息
        file_size = os.path.getsize(cursor_exe_path)
        print(f"文件大小: {file_size} 字节")
        
        # 尝试查看文件版本信息
        try:
            result = subprocess.run(['powershell', '-Command', f'(Get-Item "{cursor_exe_path}").VersionInfo'], 
                                  capture_output=True, text=True, encoding='utf-8')
            if result.returncode == 0:
                print(f"版本信息:\n{result.stdout}")
        except Exception as e:
            print(f"获取版本信息失败: {e}")
        
        return True
    
    except Exception as e:
        print(f"分析Cursor可执行文件失败: {e}")
        return False
def analyze_app_asar():
    # 分析app.asar文件
    app_asar_path = "C:\\Program Files\\Cursor\\resources\\app.asar"
    
    try:
        print(f"\n=== App.asar文件分析 ===")
        print(f"文件路径: {app_asar_path}")
        
        if not os.path.exists(app_asar_path):
            print("app.asar 文件不存在")
            return False
        
        # 检查文件大小
        file_size = os.path.getsize(app_asar_path)
        print(f"文件大小: {file_size} 字节")
        
        # 尝试提取asar文件内容
        try:
            # 检查是否安装了asar工具
            result = subprocess.run(['asar', '--version'], capture_output=True, text=True)
            if result.returncode == 0:
                print(f"已安装asar工具，版本: {result.stdout.strip()}")
                
                # 创建临时目录
                temp_dir = "temp_asar_extract"
                os.makedirs(temp_dir, exist_ok=True)
                
                # 提取asar文件
                extract_cmd = f'asar extract "{app_asar_path}" "{temp_dir}"'
                result = subprocess.run(extract_cmd, shell=True, capture_output=True, text=True)
                
                if result.returncode == 0:
                    print(f"成功提取asar文件到: {temp_dir}")
                    
                    # 查找VIP相关文件
                    vip_files = []
                    for root, dirs, files in os.walk(temp_dir):
                        for file in files:
                            if any(keyword in file.lower() for keyword in ['license', 'auth', 'subscription', 'premium', 'cursor']):
                                vip_files.append(os.path.join(root, file))
                    
                    if vip_files:
                        print(f"发现VIP相关文件: {vip_files}")
                    else:
                        print("未发现明显的VIP相关文件")
                    
                    return True
                else:
                    print(f"提取asar文件失败: {result.stderr}")
            else:
                print("未安装asar工具，无法提取asar文件")
        
        except Exception as e:
            print(f"处理asar文件失败: {e}")
        
        return False
    
    except Exception as e:
        print(f"分析app.asar文件失败: {e}")
        return False
if __name__ == "__main__":
    print("=== 开始深度分析Cursor VIP验证机制 ===")
    
    # 分析主要设置文件
    settings, vip_settings = analyze_main_settings()
    
    # 分析状态数据库
    db_success = analyze_state_database()
    
    # 分析Cursor可执行文件
    exe_success = analyze_cursor_exe()
    
    # 分析app.asar文件
    asar_success = analyze_app_asar()
    
    # 保存分析结果
    analysis_result = {
        "main_settings": settings,
        "vip_settings": vip_settings,
        "database_analysis": db_success,
        "exe_analysis": exe_success,
        "asar_analysis": asar_success
    }
    
    with open("cursor_deep_analysis.json", "w", encoding="utf-8") as f:
        json.dump(analysis_result, f, ensure_ascii=False, indent=2)
    
    print("\n=== 深度分析完成，结果已保存到cursor_deep_analysis.json ===")
    utils.set_state(success=True, result=analysis_result)
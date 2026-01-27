"""測試 Firebase 寫入功能"""
import firebase_admin
from firebase_admin import credentials, firestore
import json

# 讀取 Firebase 配置
print("📝 讀取 Firebase 配置...")

# 你需要從 Firebase Console 下載 Service Account Key
# 路徑: Project Settings > Service Accounts > Generate New Private Key
# 把下載的 JSON 檔案命名為 firebase-admin-key.json 放在這個資料夾

try:
    cred = credentials.Certificate('firebase-admin-key.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client(database_id='eveday')
    print("✅ Firebase 連線成功！（使用 eveday 資料庫）")
except Exception as e:
    print(f"❌ Firebase 連線失敗: {e}")
    print("\n請從 Firebase Console 下載 Service Account Key:")
    print("1. 打開 https://console.firebase.google.com/u/0/project/eoelior-17bed/settings/serviceaccounts/adminsdk")
    print("2. 點擊 'Generate New Private Key'")
    print("3. 將下載的 JSON 檔案命名為 'firebase-admin-key.json' 並放在此資料夾")
    exit(1)

# 測試寫入一筆資料
print("\n🧪 測試寫入一筆金句...")
test_quote = {
    'text': '測試金句：這是用 Python 寫入的',
    'createdAt': firestore.SERVER_TIMESTAMP,
    'order': 0
}

try:
    doc_ref = db.collection('quotes').document('test_python_001')
    doc_ref.set(test_quote)
    print("✅ 寫入成功！")
    print(f"📍 文件 ID: test_python_001")
    
    # 讀取驗證
    doc = doc_ref.get()
    if doc.exists:
        print(f"✅ 驗證成功，內容: {doc.to_dict()}")
    else:
        print("⚠️ 寫入後讀取不到資料")
        
except Exception as e:
    print(f"❌ 寫入失敗: {e}")
    print(f"錯誤類型: {type(e).__name__}")

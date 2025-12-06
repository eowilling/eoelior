import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import logging

# 設定 logging 級別，以便在控制台看到 WebDriver 的下載和連線資訊
logging.basicConfig(level=logging.INFO)

# ==========================================
# 設定區 (Configuration)
# ==========================================

# 預設參數
START_STATION = "{{START_STATION}}"      # 出發站
END_STATION = "{{END_STATION}}"        # 抵達站
DEPART_DATE = "{{DEPART_DATE}}" # 格式：YYYY/MM/DD
DEPART_TIME = "{{DEPART_TIME}}"      # 格式：HH:mm（從 08:00 開始查詢）
TICKET_QTY = "{{TICKET_QTY}}"           # 訂票張數

# 【重要設定】指定車次號碼
TRAIN_NO = "{{TRAIN_NO}}"          # 監控車次

# 【重要設定】自動重新查詢間隔時間 (秒)
REFRESH_INTERVAL_SECONDS = {{REFRESH_INTERVAL}}  # 刷新間隔

def find_and_select_train(driver, train_no):
    """嘗試尋找並選取指定的車次，並點擊確認。"""

    try:
        # 1. 簡化等待 - 直接等待任何 radio button 出現（代表查詢結果已載入）
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='radio']"))
        )
        # 額外等待確保所有車次都載入完成
        time.sleep(2)
        print("✅ 查詢結果已載入")
    except Exception as e:
        print(f"⚠️ 無法找到車次列表（可能頁面尚未完全載入）")
        print(f"   當前 URL: {driver.current_url}")
        return False

    # 2. 尋找包含指定車次號碼的元素
    xpath_patterns = [
        f"//td[text()='{train_no}']",
        f"//td[normalize-space(text())='{train_no}']",
        f"//*[text()='{train_no}']"
    ]

    train_cell = None
    for xpath in xpath_patterns:
        try:
            train_cell = driver.find_element(By.XPATH, xpath)
            if train_cell:
                print(f"✅ 找到車次 {train_no}")
                break
        except:
            continue

    if not train_cell:
        print(f"❌ 未找到車次 {train_no}")
        # 列出頁面上的車次號碼幫助除錯
        try:
            # 方法1: 找出所有 td 元素
            all_cells = driver.find_elements(By.XPATH, "//td")
            train_numbers = []
            all_texts = []

            for cell in all_cells:
                text = cell.text.strip()
                if text:  # 記錄所有非空文字
                    all_texts.append(text)
                # 車次號碼通常是 3-4 位數字
                if text.isdigit() and 3 <= len(text) <= 4:
                    if text not in train_numbers:
                        train_numbers.append(text)

            if train_numbers:
                print(f"   📋 頁面上的車次: {', '.join(train_numbers)}")
            else:
                print(f"   ⚠️ 第一種方法無法識別車次號碼")

            # 顯示前20個文字內容幫助除錯（加強）
            if all_texts:
                print(f"   🔍 頁面所有文字前20項: {all_texts[:20]}")

            # 方法2: 嘗試用不同方式尋找 - 找所有包含數字的元素
            all_elements = driver.find_elements(By.XPATH, "//*")
            numbers_found = []
            for elem in all_elements[:200]:  # 增加搜尋範圍
                try:
                    text = elem.text.strip()
                    if text and text.isdigit() and 3 <= len(text) <= 4:
                        if text not in numbers_found:
                            numbers_found.append(text)
                except:
                    continue

            if numbers_found:
                print(f"   📋 用備用方法找到的車次: {', '.join(numbers_found[:15])}")
            else:
                print(f"   ⚠️ 備用方法也無法找到車次")

        except Exception as debug_e:
            print(f"   ⚠️ 除錯時發生錯誤: {str(debug_e)[:80]}")
        return False

    try:
        # 3. 找到該行中的 radio button（改用更穩定的方式）
        train_row = train_cell.find_element(By.XPATH, "./ancestor::tr[1]")

        # 嘗試多種方式找 radio button
        radio_button = None
        try:
            radio_button = train_row.find_element(By.XPATH, ".//input[@type='radio']")
        except:
            try:
                radio_button = train_row.find_element(By.CSS_SELECTOR, "input[type='radio']")
            except:
                radio_button = train_row.find_element(By.TAG_NAME, "input")

        if not radio_button:
            print(f"❌ 無法找到車次 {train_no} 的選取按鈕")
            return False

        # 4. 檢查是否可點選 (是否有票)
        if radio_button.is_enabled():
            # 使用 JavaScript 點擊，更穩定
            driver.execute_script("arguments[0].click();", radio_button)
            time.sleep(1)

            # 5. 自動點擊「確認」/下一步按鈕
            confirm_button = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.ID, "confirm"))
            )
            confirm_button.click()
            print(f"\n🎉🎉🎉 成功搶到車次 {train_no} 的票！🎉🎉🎉")
            print(f"✅ 已自動點擊「確認」，正在跳轉到購買頁面...")
            return True
        else:
            print(f"⚠️ 找到車次 {train_no}，但目前無票（選取鈕不可點擊）")
            return False

    except Exception as e:
        print(f"❌ 處理車次 {train_no} 時發生錯誤: {str(e)[:80]}")
        # 額外除錯資訊
        try:
            print(f"   除錯：train_cell 文字內容 = {train_cell.text}")
        except:
            pass
        return False

def run_booking_bot():
    print(f"🚀 啟動高鐵訂票小幫手 (自動輪詢模式)...")
    print(f"📍 行程：{START_STATION} -> {END_STATION}")
    print(f"📅 日期：{DEPART_DATE} {DEPART_TIME}")
    print(f"🚄 鎖定車次：{TRAIN_NO} | 🔄 輪詢間隔: {REFRESH_INTERVAL_SECONDS} 秒")

    # 1. 設定 Chrome Driver
    options = webdriver.ChromeOptions()
    # 讓視窗不會在程式結束時被關閉（便於人工介入）
    options.add_experimental_option("detach", True)
    # 避免某些環境中 data: 空白頁問題的可疑旗標，改採較穩定做法
    # 隱藏自動化痕跡，但不使用 useAutomationExtension（部分版本會造成啟動頁面為 data:）
    options.add_argument("--disable-blink-features=AutomationControlled")
    # 一些穩定性旗標（Windows 常見）
    # options.add_argument("--start-maximized")  # 改為最小化啟動
    options.add_argument("--start-minimized")  # 啟動時最小化到工作列
    options.add_argument("--no-default-browser-check")
    options.add_argument("--no-first-run")
    options.add_argument("--disable-background-networking")
    options.add_argument("--disable-sync")
    options.add_argument("--disable-features=TranslateUI")
    # 確保頁面載入策略為正常
    options.page_load_strategy = 'normal'

    try:
        driver_path = ChromeDriverManager().install()
        service = Service(driver_path)
        # 接受潛在的憑證異常（若本機時間或中間人憑證造成 HTTPS 連線異常，可避免被攔截成空白頁）
        driver = webdriver.Chrome(service=service, options=options)

        # 啟動後先做一次健康檢查，確認瀏覽器可正常載入外部網站
        try:
            driver.get("https://example.com")
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "h1"))
            )
            print("✅ 健康檢查通過：可正常載入外部網站。")
        except Exception as health_e:
            print("❌ 健康檢查失敗：瀏覽器無法載入外部網站。可能是以下原因：")
            print("   - Chrome/ChromeDriver 版本不相容，或被安全性軟體攔截")
            print("   - 系統時間不正確導致 HTTPS 憑證判定不安全")
            print("   - 企業代理/防毒 MITM 導致憑證錯誤")
            print(f"   除錯訊息：{health_e}")
            print("   建議：更新 Chrome 至最新版本、重新安裝對應版 ChromeDriver，或暫時停用攔截")
            # 不中止流程，嘗試繼續導向高鐵網站

        # === 關鍵修正：確保網頁已成功載入且 URL 正確 (增加重試機制) ===
        target_url = "https://irs.thsrc.com.tw/IMINT/"
        max_attempts = 3

        for attempt in range(max_attempts):
            try:
                # 如果當前不在目標頁面，則導航（先清空再導頁，避免前一頁殘留）
                if driver.current_url != target_url:
                    try:
                        driver.delete_all_cookies()
                    except Exception:
                        pass
                    driver.get(target_url)
                    print(f"嘗試導航到高鐵頁面 (第 {attempt + 1} 次)...")

                # 等待直到 URL 正確且頁面上第一個關鍵元素（出發站下拉選單）出現
                # 有些版本在載入過程中可能短暫顯示 data:，改用等待關鍵元素而非僅校正 URL
                WebDriverWait(driver, 15).until(
                    EC.any_of(
                        EC.url_to_be(target_url),
                        EC.presence_of_element_located((By.NAME, "selectStartStation"))
                    )
                )
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.NAME, "selectStartStation"))
                )
                print("✅ 網頁成功載入高鐵訂票頁面。")
                break  # 成功，跳出迴圈
            except Exception as e:
                current_url = driver.current_url
                print(f"❌ 第 {attempt + 1} 次嘗試失敗。目前的 URL 是: {current_url}。")

                if attempt < max_attempts - 1:
                    print("🔄 重新嘗試導航...")
                    time.sleep(5) # 等待5秒後再試
                else:
                    print("❌ 錯誤：已達到最大重試次數，網頁載入超時或導航失敗。這通常是 Chrome 驅動程式版本問題。")
                    driver.quit()
                    return
        # =================================================

        # 處理「個人資料使用說明」彈窗
        try:
            # 等待「我同意」按鈕出現並可以點擊 (使用 XPath 確保找到正確的按鈕文字)
            agree_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '我同意')]"))
            )
            agree_button.click()
            print("✅ 成功關閉「個人資料使用說明」彈窗。")
        except Exception as e:
            # 如果找不到按鈕，可能是彈窗沒有出現，這不影響主流程，只列印警告
            print("⚠️ 未偵測到或未成功關閉「個人資料使用說明」彈窗。如果彈窗還在，請手動關閉。")
            # print(f"除錯資訊: {e}")

        # 2. 填寫出發站與抵達站、日期與時間
        # 等待表單元素完全可互動
        time.sleep(2)  # 給予頁面額外載入時間

        # 出發站
        start_station_select = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.NAME, "selectStartStation"))
        )
        Select(start_station_select).select_by_visible_text(START_STATION)
        time.sleep(0.5)

        # 抵達站
        end_station_select = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.NAME, "selectDestinationStation"))
        )
        Select(end_station_select).select_by_visible_text(END_STATION)
        time.sleep(0.5)

        # 日期（使用 JavaScript 直接設定，避免 datepicker 干擾）
        try:
            date_input = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, "toTimeInputField"))
            )
            # 先移除 readonly 屬性（如果有）
            driver.execute_script("arguments[0].removeAttribute('readonly');", date_input)
            # 清空並設定日期值
            driver.execute_script("arguments[0].value = '';", date_input)
            driver.execute_script(f"arguments[0].value = '{DEPART_DATE}';", date_input)
            # 觸發 change 事件確保網站接收到變更
            driver.execute_script("arguments[0].dispatchEvent(new Event('change', { bubbles: true }));", date_input)
            print(f"✅ 已設定日期：{DEPART_DATE}")
            time.sleep(0.5)
        except Exception as e:
            print(f"⚠️ 日期設定發生錯誤: {e}")
            print("   請手動設定日期")

        # 時間
        try:
            time_select = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.NAME, "toTimeTable"))
            )
            Select(time_select).select_by_visible_text(DEPART_TIME)
            time.sleep(0.5)
        except:
            print(f"⚠️ 找不到時間 {DEPART_TIME}，將保持預設或選擇最接近時間。")

        # 填寫票數
        try:
            qty_select = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.NAME, "ticketPanel:rows:0:ticketAmount"))
            )
            Select(qty_select).select_by_visible_text(TICKET_QTY)
            time.sleep(0.5)
        except Exception as e:
            print(f"⚠️ 無法設定票數為 {TICKET_QTY} 張。請手動檢查。 (錯誤: {e})")


        print("\n==================================================")
        print("✅ 表單基本資訊填寫完成！")
        print(f"👉 訂票張數已設定為 {TICKET_QTY} 張。")
        print("⚡ 步驟 1：請**手動輸入圖形驗證碼**並按下「開始查詢」！")

        # 讓程式暫停，等待使用者手動完成 CAPTCHA 和點擊查詢
        # *** 關鍵修正: 強化提示，要求用戶等到結果頁面出現 ***
        input("⏳ 【重要】請在瀏覽器中：1. 輸入驗證碼。 2. 點擊「開始查詢」。 3. **等待「請稍候...」消失，顯示車次列表後**，再回到 PowerShell 按 Enter 啟動自動輪詢...")
        print("==================================================")

        # 3. 自動輪詢流程（使用頁面刷新方式）
        refresh_count = 0
        print("\n" + "="*60)
        print("🚀 開始自動監控模式")
        print(f"⏰ 每 {REFRESH_INTERVAL_SECONDS} 秒刷新一次頁面")
        print(f"🎯 目標車次：{TRAIN_NO}")
        print("="*60 + "\n")

        while True:
            refresh_count += 1
            print(f"\n{'─'*60}")
            print(f"🔎 第 {refresh_count} 次檢查 [{time.strftime('%Y-%m-%d %H:%M:%S')}]")
            print(f"{'─'*60}")

            # 嘗試選取車次
            if find_and_select_train(driver, TRAIN_NO):
                # 成功選取並確認，跳出迴圈
                print("\n" + "="*60)
                print("✅ 監控完成！請在瀏覽器中繼續完成購票流程。")
                print("="*60)
                break

            # 4. 等待後重新查詢
            print(f"\n⏳ 等待 {REFRESH_INTERVAL_SECONDS} 秒後重新查詢...")
            time.sleep(REFRESH_INTERVAL_SECONDS)

            # 方法1: 嘗試點擊「重新查詢」按鈕（不需重新輸入驗證碼）
            try:
                requery_button = driver.find_element(By.ID, "bookingQuery")
                driver.execute_script("arguments[0].click();", requery_button)
                print("🔄 已點擊「重新查詢」按鈕，等待結果...")

                # 等待查詢結果載入
                WebDriverWait(driver, 20).until(
                    EC.presence_of_element_located((By.XPATH, "//input[@type='radio']"))
                )
                print("✅ 車次列表已重新載入")
                time.sleep(2)

            except Exception as e1:
                # 方法2: 如果找不到按鈕或點擊失敗，嘗試刷新頁面
                print(f"⚠️ 「重新查詢」按鈕失敗，嘗試刷新頁面...")
                try:
                    driver.refresh()
                    print("🔄 頁面已刷新，等待載入...")

                    # 等待查詢結果載入
                    WebDriverWait(driver, 20).until(
                        EC.presence_of_element_located((By.XPATH, "//input[@type='radio']"))
                    )
                    print("✅ 頁面重新載入完成")
                    time.sleep(2)

                except Exception as e2:
                    # 即使刷新失敗，也繼續下一次循環
                    print(f"⚠️ 頁面刷新也失敗: {str(e2)[:100]}")
                    print(f"   當前 URL: {driver.current_url}")
                    print("🔄 將繼續嘗試下一次查詢...")
                    time.sleep(3)  # 額外等待3秒再繼續

        print("\n🎉 訂票輔助流程完成！")

    except Exception as e:
        print(f"\n==================================================")
        print(f"❌ 發生嚴重錯誤：程式運行失敗！")
        print(f"完整的錯誤訊息：{e}")
        print(f"==================================================")

if __name__ == "__main__":
    run_booking_bot()

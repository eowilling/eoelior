import sys
import os
import threading
import time
from PyQt6.QtWidgets import (QApplication, QMainWindow, QSystemTrayIcon, 
                             QMenu, QStyle, QVBoxLayout, QWidget)
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QUrl, Qt
from PyQt6.QtGui import QIcon, QAction

# 導入本地模組
from backend.db import init_db

# 假定稍後會建立 server.py
# from backend.server import app as flask_app

class AlphaBoxApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("AlphaBox - 全能監控系統")
        self.resize(1200, 800)
        
        # 1. 設置 WebEngine 視窗
        self.browser = QWebEngineView()
        # 預設指向本地 Flask Server (稍後啟動)
        self.browser.setUrl(QUrl("http://127.0.0.1:5055"))
        
        # 穩定 UI 縮放
        self.browser.setZoomFactor(1.0)
        
        
        layout = QVBoxLayout()
        layout.addWidget(self.browser)
        layout.setContentsMargins(0,0,0,0)
        
        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)
        
        # 2. 設置系統托盤 (System Tray)
        self.init_tray()
        
        # 3. 視窗關閉行為：攔截關閉事件改為隱藏
        self.quit_flag = False

    def init_tray(self):
        self.tray_icon = QSystemTrayIcon(self)
        # 使用系統內置圖標作為預設
        self.tray_icon.setIcon(self.style().standardIcon(QStyle.StandardPixmap.SP_ComputerIcon))
        
        # 托盤選單
        tray_menu = QMenu()
        
        show_action = QAction("顯示視窗", self)
        show_action.triggered.connect(self.show_normal)
        
        quit_action = QAction("徹底退出", self)
        quit_action.triggered.connect(self.really_quit)
        
        tray_menu.addAction(show_action)
        tray_menu.addSeparator()
        tray_menu.addAction(quit_action)
        
        self.tray_icon.setContextMenu(tray_menu)
        self.tray_icon.show()
        
        # 雙擊托盤圖標顯示視窗
        self.tray_icon.activated.connect(self.on_tray_activated)

    def on_tray_activated(self, reason):
        if reason == QSystemTrayIcon.ActivationReason.DoubleClick:
            self.show_normal()

    def show_normal(self):
        self.show()
        self.setWindowState(Qt.WindowState.WindowNoState)
        self.activateWindow()

    def closeEvent(self, event):
        """阻止視窗關閉，改為最小化到托盤"""
        if not self.quit_flag:
            event.ignore()
            self.hide()
            self.tray_icon.showMessage(
                "AlphaBox",
                "系統已縮小至工作列，持續監控中。",
                QSystemTrayIcon.MessageIcon.Information,
                2000
            )
        else:
            event.accept()

    def really_quit(self):
        self.quit_flag = True
        QApplication.quit()

def run_flask():
    """啟動 Flask 背景服務"""
    from backend.server import app as flask_app
    # 關閉 reloader 因為在線程中運行
    flask_app.run(port=5055, debug=False, use_reloader=False, host='127.0.0.1')

if __name__ == "__main__":
    # 初始化資料庫
    init_db()
    
    # 啟動背景線程執行 Flask
    flask_thread = threading.Thread(target=run_flask, daemon=True)
    flask_thread.start()
    
    # 啟動警報監控服務
    from backend.monitor import monitor
    monitor.start()
    
    # 給 Server 一點時間啟動
    time.sleep(1)
    
    # 啟動 PyQt6
    app = QApplication(sys.argv)
    app.setApplicationName("AlphaBox")
    app.setQuitOnLastWindowClosed(False)
    
    window = AlphaBoxApp()
    window.show()
    
    sys.exit(app.exec())

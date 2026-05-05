@echo off
title ScreamKiller 啟動器
echo 正在準備環境...
:: 確保可以抓到目錄下的 ffmpeg.exe
set PATH=%CD%;%PATH%
:: 啟動虛擬環境
call venv\Scripts\activate
echo 正在開啟 ScreamKiller 網頁...
streamlit run scream_killer_web.py --browser.gatherUsageStats false --server.headless true
pause

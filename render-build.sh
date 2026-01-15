#!/usr/bin/env bash
# exit on error
set -o errexit

# 安裝 Python 依賴
pip install -r requirements.txt

# 安裝 Playwright 瀏覽器及其系統依賴
# 注意: Render 的預設 Ubuntu 環境可能需要額外處理
playwright install chromium
# playwright install-deps chromium # 這通常需要 root 權限,在 Render 上可能會有問題

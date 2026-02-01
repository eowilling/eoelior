// 台股智能分析系統 - 前端邏輯

// 全局狀態
let analysisInterval = null;

// DOM 元素
const elements = {
    stockModeRadios: document.querySelectorAll('input[name="stock_mode"]'),
    manualPanel: document.getElementById('manual-stock-panel'),
    autoPanel: document.getElementById('auto-stock-panel'),
    stockList: document.getElementById('stock-list'),
    autoPickMethod: document.getElementById('auto-pick-method'),
    autoPickCount: document.getElementById('auto-pick-count'),
    analysisDelay: document.getElementById('analysis-delay'),
    startBtn: document.getElementById('start-analysis'),
    loadConfigBtn: document.getElementById('load-config'),
    saveConfigBtn: document.getElementById('save-config'),
    previewBtn: document.getElementById('preview-stocks'),
    previewResult: document.getElementById('preview-result'),
    progressPanel: document.getElementById('progress-panel'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    progressPercent: document.getElementById('progress-percent'),
    resultsPanel: document.getElementById('results-panel'),
    currentTime: document.getElementById('current-time'),
    systemStatus: document.getElementById('system-status'),
    notificationStatus: document.getElementById('notification-status')
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    loadConfig();
    updateTime();
    setInterval(updateTime, 1000);
});

// 事件監聽
function initEventListeners() {
    // 選股模式切換
    elements.stockModeRadios.forEach(radio => {
        radio.addEventListener('change', toggleStockMode);
    });

    // 按鈕事件
    elements.startBtn.addEventListener('click', startAnalysis);
    elements.loadConfigBtn.addEventListener('click', loadConfig);
    elements.saveConfigBtn.addEventListener('click', saveConfig);
    elements.previewBtn.addEventListener('click', previewStocks);
}

// 切換選股模式
function toggleStockMode() {
    const mode = document.querySelector('input[name="stock_mode"]:checked').value;
    if (mode === 'manual') {
        elements.manualPanel.style.display = 'block';
        elements.autoPanel.style.display = 'none';
    } else {
        elements.manualPanel.style.display = 'none';
        elements.autoPanel.style.display = 'block';
    }
}

// 載入配置
async function loadConfig() {
    try {
        const response = await fetch('/api/config');
        const data = await response.json();

        if (data.success) {
            const config = data.config;
            elements.stockList.value = config.stock_list || '';
            elements.autoPickMethod.value = config.auto_pick_method || 'institutional';
            elements.autoPickCount.value = config.auto_pick_count || 5;
            elements.analysisDelay.value = config.analysis_delay || 3;

            // 更新通知狀態
            const notifications = [];
            if (config.telegram_enabled) notifications.push('Telegram');
            if (config.email_enabled) notifications.push('Email');
            elements.notificationStatus.textContent = notifications.length > 0 
                ? notifications.join(', ') 
                : '未設定';

            showMessage('配置載入成功', 'success');
        }
    } catch (error) {
        console.error('載入配置失敗:', error);
        showMessage('載入配置失敗', 'error');
    }
}

// 儲存配置
async function saveConfig() {
    try {
        const config = {
            stock_list: elements.stockList.value.trim(),
            auto_pick_method: elements.autoPickMethod.value,
            auto_pick_count: parseInt(elements.autoPickCount.value),
            analysis_delay: parseInt(elements.analysisDelay.value)
        };

        const response = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });

        const data = await response.json();
        if (data.success) {
            showMessage('配置儲存成功', 'success');
        } else {
            showMessage('儲存失敗: ' + data.error, 'error');
        }
    } catch (error) {
        console.error('儲存配置失敗:', error);
        showMessage('儲存配置失敗', 'error');
    }
}

// 預覽選股
async function previewStocks() {
    const method = elements.autoPickMethod.value;
    const count = parseInt(elements.autoPickCount.value);

    elements.previewBtn.disabled = true;
    elements.previewBtn.textContent = '載入中...';

    try {
        const response = await fetch('/api/stock-picker/preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method, count })
        });

        const data = await response.json();
        if (data.success) {
            elements.previewResult.style.display = 'block';
            elements.previewResult.innerHTML = `
                <div class="preview-stocks">
                    ${data.stocks.map(code => `<span class="stock-tag">${code}</span>`).join('')}
                </div>
            `;
        }
    } catch (error) {
        console.error('預覽失敗:', error);
        showMessage('預覽失敗', 'error');
    } finally {
        elements.previewBtn.disabled = false;
        elements.previewBtn.textContent = '預覽選股結果';
    }
}

// 開始分析
async function startAnalysis() {
    const mode = document.querySelector('input[name="stock_mode"]:checked').value;
    const useAutoPick = mode === 'auto';
    const stockList = elements.stockList.value.trim();

    // 驗證輸入
    if (!useAutoPick && !stockList) {
        showMessage('請輸入股票代碼或選擇智能選股', 'error');
        return;
    }

    // 禁用按鈕
    elements.startBtn.disabled = true;
    elements.startBtn.textContent = '分析中...';

    // 顯示進度
    elements.progressPanel.style.display = 'block';
    elements.resultsPanel.innerHTML = '';

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stock_list: stockList,
                use_auto_pick: useAutoPick,
                auto_pick_method: elements.autoPickMethod.value,
                auto_pick_count: parseInt(elements.autoPickCount.value)
            })
        });

        const data = await response.json();
        if (data.success) {
            // 開始輪詢狀態
            startStatusPolling();
        } else {
            showMessage('啟動分析失敗: ' + data.error, 'error');
            resetUI();
        }
    } catch (error) {
        console.error('啟動分析失敗:', error);
        showMessage('啟動分析失敗', 'error');
        resetUI();
    }
}

// 輪詢分析狀態
function startStatusPolling() {
    analysisInterval = setInterval(async () => {
        try {
            const response = await fetch('/api/status');
            const status = await response.json();

            // 更新進度
            elements.progressFill.style.width = status.progress + '%';
            elements.progressPercent.textContent = status.progress + '%';
            
            if (status.current_stock) {
                elements.progressText.textContent = `分析中: ${status.current_stock}`;
            }

            // 更新系統狀態
            if (status.running) {
                elements.systemStatus.textContent = '分析中';
                elements.systemStatus.style.background = '#f59e0b';
            }

            // 檢查是否完成
            if (!status.running && status.progress === 100) {
                clearInterval(analysisInterval);
                displayResults(status.results);
                resetUI();
                elements.systemStatus.textContent = '系統就緒';
                elements.systemStatus.style.background = '#10b981';
                showMessage('分析完成！', 'success');
            }

            // 檢查錯誤
            if (status.error) {
                clearInterval(analysisInterval);
                showMessage('分析失敗: ' + status.error, 'error');
                resetUI();
            }

        } catch (error) {
            console.error('狀態更新失敗:', error);
        }
    }, 1000);
}

// 顯示分析結果
function displayResults(results) {
    if (!results || results.length === 0) {
        elements.resultsPanel.innerHTML = '<div class="card"><p>沒有分析結果</p></div>';
        return;
    }

    elements.resultsPanel.innerHTML = results.map(result => `
        <div class="result-card">
            <div class="result-header">
                <div>
                    <div class="result-title">${result.name}</div>
                    <div class="result-code">${result.code}</div>
                </div>
            </div>

            <div class="result-stats">
                <div class="stat-item">
                    <span class="stat-label">當前價格</span>
                    <span class="stat-value">${result.price ? result.price.toFixed(2) : 'N/A'} 元</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">漲跌幅</span>
                    <span class="stat-value ${result.change_pct >= 0 ? 'stat-positive' : 'stat-negative'}">
                        ${result.change_pct ? (result.change_pct > 0 ? '+' : '') + result.change_pct.toFixed(2) : 'N/A'}%
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">成交量</span>
                    <span class="stat-value">${result.volume ? formatNumber(result.volume) : 'N/A'}</span>
                </div>
            </div>

            <div class="result-analysis">${result.analysis || '分析失敗'}</div>
        </div>
    `).join('');
}

// 重置 UI
function resetUI() {
    elements.startBtn.disabled = false;
    elements.startBtn.textContent = '🚀 開始分析';
    elements.progressPanel.style.display = 'none';
    elements.progressFill.style.width = '0%';
    elements.progressText.textContent = '準備中...';
    elements.progressPercent.textContent = '0%';
}

// 更新時間
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    elements.currentTime.textContent = timeString;
}

// 顯示訊息
function showMessage(message, type = 'info') {
    // 簡單的 alert，可以替換成更好的通知系統
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    console.log(`${emoji} ${message}`);
    // 可以使用 toast 通知庫
}

// 格式化數字
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

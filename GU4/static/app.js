
// GU4 AI Analyzer - Frontend Logic
// Tech-style enhanced version

// State
let stockList = new Set(['2330', '2454']); // Default stocks
let analysisInterval = null;

// DOM Elements
const el = {
    // Nav & Search
    navbarSearch: document.getElementById('navbarSearch'),
    btnSettings: document.getElementById('btnSettings'),

    // Settings Modal
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsBtn: document.getElementById('closeSettingsBtn'),
    closeSettingsBackdrop: document.getElementById('closeSettingsBackdrop'),
    btnSaveConfig: document.getElementById('btnSaveConfig'),
    inputGeminiKey: document.getElementById('inputGeminiKey'),
    inputTgToken: document.getElementById('inputTgToken'),
    inputTgChatId: document.getElementById('inputTgChatId'),

    // Search Result Modal
    searchModal: document.getElementById('searchModal'),
    closeSearchBtn: document.getElementById('closeSearchBtn'),
    closeSearchBackdrop: document.getElementById('closeSearchBackdrop'),
    searchResultContent: document.getElementById('searchResultContent'),

    // Main Controls
    addStockInput: document.getElementById('addStockInput'),
    btnAddStock: document.getElementById('btnAddStock'),
    stockChips: document.getElementById('stockChips'),

    // Auto Pick
    autoPickToggle: document.getElementById('autoPickToggle'),
    autoPickConfig: document.getElementById('autoPickConfig'),
    autoPickMethod: document.getElementById('autoPickMethod'),
    autoPickCount: document.getElementById('autoPickCount'),
    pickCountVal: document.getElementById('pickCountVal'),

    // Analysis Status
    btnStartAnalysis: document.getElementById('btnStartAnalysis'),
    progressContainer: document.getElementById('progressContainer'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    progressPercent: document.getElementById('progressPercent'),

    // Results
    welcomeState: document.getElementById('welcomeState'),
    resultsGrid: document.getElementById('resultsGrid'),

    // System Info
    todayDate: document.getElementById('todayDate'),
    systemStatus: document.getElementById('systemStatus'),
    toastContainer: document.getElementById('toastContainer')
};

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    updateDate();
    renderStockChips();
    loadConfig();
});

function initEventListeners() {
    // Search
    el.navbarSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch(e.target.value);
    });

    // Settings Modal
    el.btnSettings.addEventListener('click', () => toggleModal(el.settingsModal, true));
    el.closeSettingsBtn.addEventListener('click', () => toggleModal(el.settingsModal, false));
    el.closeSettingsBackdrop.addEventListener('click', () => toggleModal(el.settingsModal, false));
    el.btnSaveConfig.addEventListener('click', saveConfig);

    // Search Result Modal
    el.closeSearchBtn.addEventListener('click', () => toggleModal(el.searchModal, false));
    el.closeSearchBackdrop.addEventListener('click', () => toggleModal(el.searchModal, false));

    // Stock List Management
    el.btnAddStock.addEventListener('click', addStockFromInput);
    el.addStockInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addStockFromInput();
    });

    // Auto Pick Toggle
    el.autoPickToggle.addEventListener('change', (e) => {
        el.autoPickConfig.style.display = e.target.checked ? 'block' : 'none';
        if (e.target.checked) showToast('已啟用智能選股模式', 'info');
    });

    el.autoPickCount.addEventListener('input', (e) => {
        el.pickCountVal.textContent = e.target.value;
    });

    // Analysis
    el.btnStartAnalysis.addEventListener('click', startAnalysis);
}

// ==========================================
// Stock List Logic
// ==========================================
function renderStockChips() {
    el.stockChips.innerHTML = '';
    const stocks = Array.from(stockList);

    stocks.forEach(code => {
        const chip = document.createElement('div');
        chip.className = 'stock-chip inline-flex items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-full px-3 py-1 text-sm text-slate-200';
        chip.innerHTML = `
            <span>${code}</span>
            <button class="remove-btn text-slate-500 hover:text-red-400 transition-colors" onclick="removeStock('${code}')">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        el.stockChips.appendChild(chip);
    });

    // Add remove handler to window scope for inline onclick
    window.removeStock = (code) => {
        stockList.delete(code);
        renderStockChips();
    };
}

function addStockFromInput() {
    const val = el.addStockInput.value.trim().toUpperCase();
    if (!val) return;

    if (stockList.has(val)) {
        showToast('該股票已在清單中', 'warning');
        el.addStockInput.value = '';
        return;
    }

    stockList.add(val);
    renderStockChips();
    el.addStockInput.value = '';
}

// ==========================================
// Search Logic
// ==========================================
async function handleSearch(query) {
    if (!query) return;
    const code = query.trim().toUpperCase();

    // Show Modal Loading
    toggleModal(el.searchModal, true);
    el.searchResultContent.innerHTML = `
        <div class="flex flex-col items-center gap-3 py-8">
            <div class="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p class="text-slate-400">正在搜尋 ${code}...</p>
        </div>
    `;

    try {
        const res = await fetch('/api/search_stock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });
        const json = await res.json();

        if (json.success) {
            const data = json.data;
            const isPositive = (data.change || 0) >= 0;
            const colorClass = isPositive ? 'text-red-400' : 'text-green-400'; // 台股 紅漲綠跌

            el.searchResultContent.innerHTML = `
                <div class="text-left w-full">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h4 class="text-2xl font-bold text-white">${data.name}</h4>
                            <span class="text-slate-400 font-mono">${data.code}</span>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold ${colorClass}">${data.price}</div>
                            <div class="text-sm ${colorClass}">
                                ${data.change > 0 ? '+' : ''}${data.change} (${data.change_pct}%)
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                        <div class="bg-slate-800 p-2 rounded">
                            <div class="text-xs text-slate-500">開盤</div>
                            <div class="text-white">${data.open}</div>
                        </div>
                        <div class="bg-slate-800 p-2 rounded">
                            <div class="text-xs text-slate-500">最高</div>
                            <div class="text-white">${data.high}</div>
                        </div>
                        <div class="bg-slate-800 p-2 rounded">
                            <div class="text-xs text-slate-500">最低</div>
                            <div class="text-white">${data.low}</div>
                        </div>
                    </div>
                    
                    <button onclick="addToAndClose('${data.code}')" class="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                        加入自選清單
                    </button>
                </div>
            `;

            window.addToAndClose = (c) => {
                if (!stockList.has(c)) {
                    stockList.add(c);
                    renderStockChips();
                    showToast(`已加入 ${c}`, 'success');
                }
                toggleModal(el.searchModal, false);
            };

        } else {
            el.searchResultContent.innerHTML = `
                <div class="py-8 text-center">
                    <i class="fa-regular fa-face-frown text-4xl text-slate-600 mb-3"></i>
                    <p class="text-slate-300">找不到此股票 (${code})</p>
                    <p class="text-xs text-slate-500 mt-2">請確認代碼是否正確</p>
                </div>
            `;
        }
    } catch (e) {
        console.error(e);
        el.searchResultContent.innerHTML = `<p class="text-red-400">搜尋發生錯誤</p>`;
    }
}

// ==========================================
// Config Logic
// ==========================================
async function loadConfig() {
    try {
        const res = await fetch('/api/config');
        const json = await res.json();

        if (json.success) {
            const cfg = json.config;

            // Restore Stock List
            if (cfg.stock_list) {
                stockList = new Set(cfg.stock_list.split(',').map(s => s.trim()).filter(s => s));
                renderStockChips();
            }

            // Restore Auto Pick
            if (cfg.auto_pick_method) el.autoPickMethod.value = cfg.auto_pick_method;
            if (cfg.auto_pick_count) {
                el.autoPickCount.value = cfg.auto_pick_count;
                el.pickCountVal.textContent = cfg.auto_pick_count;
            }

            // Note: API keys are usually secrets, might not be returned by GET /api/config for security
            // If they are, we populate them. If not, inputs remain empty.
        }
    } catch (e) {
        console.error("Config load failed", e);
    }
}

async function saveConfig() {
    const payload = {
        stock_list: Array.from(stockList).join(','),
        auto_pick_method: el.autoPickMethod.value,
        auto_pick_count: parseInt(el.autoPickCount.value),
        gemini_api_key: el.inputGeminiKey.value.trim(),
        telegram_bot_token: el.inputTgToken.value.trim(),
        telegram_chat_id: el.inputTgChatId.value.trim()
    };

    // Remove empty keys to avoid overwriting with empty string if user didn't type anything
    if (!payload.gemini_api_key) delete payload.gemini_api_key;
    if (!payload.telegram_bot_token) delete payload.telegram_bot_token;
    if (!payload.telegram_chat_id) delete payload.telegram_chat_id;

    try {
        const res = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await res.json();

        if (json.success) {
            showToast('設定已儲存 ✅', 'success');
            toggleModal(el.settingsModal, false);
        } else {
            showToast('儲存失敗: ' + json.error, 'error');
        }
    } catch (e) {
        showToast('連線錯誤', 'error');
    }
}

// ==========================================
// Analysis Logic
// ==========================================
async function startAnalysis() {
    const useAutoPick = el.autoPickToggle.checked;
    const currentList = Array.from(stockList).join(',');

    if (!useAutoPick && !currentList) {
        showToast('請先加入股票或是開啟智能選股', 'warning');
        return;
    }

    // UI State: Loading
    el.btnStartAnalysis.disabled = true;
    el.btnStartAnalysis.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> AI 分析運算中...`;
    el.progressContainer.classList.remove('hidden');
    el.welcomeState.classList.add('hidden');
    el.resultsGrid.classList.remove('hidden');
    el.resultsGrid.innerHTML = ''; // Clear old

    try {
        const res = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stock_list: currentList,
                use_auto_pick: useAutoPick,
                auto_pick_method: el.autoPickMethod.value,
                auto_pick_count: parseInt(el.autoPickCount.value)
            })
        });

        const json = await res.json();
        if (json.success) {
            pollStatus();
        } else {
            throw new Error(json.error);
        }
    } catch (e) {
        showToast('啟動失敗: ' + e.message, 'error');
        resetUIstate();
    }
}

function pollStatus() {
    if (analysisInterval) clearInterval(analysisInterval);

    analysisInterval = setInterval(async () => {
        try {
            const res = await fetch('/api/status');
            const status = await res.json();

            // Update Progress
            const pct = status.progress;
            el.progressBar.style.width = pct + '%';
            el.progressPercent.textContent = pct + '%';

            if (status.current_stock) {
                el.progressText.textContent = `正在分析: ${status.current_stock}...`;
            }

            // Complete
            if (!status.running && pct === 100) {
                clearInterval(analysisInterval);
                renderResults(status.results);
                resetUIstate();
                showToast('分析完成！', 'success');
                el.systemStatus.textContent = '分析完成';
                el.systemStatus.className = 'text-green-400';
            }

        } catch (e) {
            console.error(e);
        }
    }, 1000);
}

function renderResults(results) {
    if (!results || results.length === 0) {
        el.resultsGrid.innerHTML = `
            <div class="p-8 text-center text-slate-500">無結果</div>
        `;
        return;
    }

    el.resultsGrid.innerHTML = results.map((r, idx) => {
        const isAppreciation = (r.change_pct || 0) >= 0;
        const colorClass = isAppreciation ? 'text-red-400' : 'text-green-400';
        const arrow = isAppreciation ? '▲' : '▼';

        // Simple Markdown parsing for analysis text
        let analysisHtml = (r.analysis || '暫無結果')
            .replace(/## (.*)/g, '<h4 class="text-lg font-bold text-cyan-300 mt-4 mb-2">$1</h4>')
            .replace(/\*\*(.*)\*\*/g, '<strong class="text-amber-300">$1</strong>')
            .replace(/- /g, '• ')
            .replace(/\n/g, '<br>');

        return `
            <div class="glass-panel rounded-2xl p-6 animate-fade-in" style="animation-delay: ${idx * 0.1}s">
                <div class="flex flex-col md:flex-row justify-between md:items-center mb-6 border-b border-slate-700/50 pb-4">
                    <div class="mb-4 md:mb-0">
                        <div class="flex items-baseline gap-3">
                            <h3 class="text-2xl font-bold text-white">${r.name}</h3>
                            <span class="text-slate-400 font-mono text-lg">${r.code}</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-6">
                        <div class="text-center">
                            <div class="text-xs text-slate-500 mb-1">現價</div>
                            <div class="text-2xl font-bold text-white">${r.price ?? 'N/A'}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-xs text-slate-500 mb-1">漲跌幅</div>
                            <div class="text-lg font-bold ${colorClass}">
                                ${r.change_pct ? `${arrow} ${Math.abs(r.change_pct).toFixed(2)}%` : 'N/A'}
                            </div>
                        </div>
                        <div class="text-center hidden md:block">
                            <div class="text-xs text-slate-500 mb-1">成交量</div>
                            <div class="text-lg font-mono text-slate-300">${formatVolume(r.volume)}</div>
                        </div>
                    </div>
                </div>

                <div class="analysis-content text-sm text-slate-300 leading-relaxed max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    ${analysisHtml}
                </div>
            </div>
        `;
    }).join('');
}

function resetUIstate() {
    el.btnStartAnalysis.disabled = false;
    el.btnStartAnalysis.innerHTML = `<i class="fa-solid fa-bolt"></i> 開始 AI 分析`;
    el.progressText.textContent = '完成';
    setTimeout(() => el.progressContainer.classList.add('hidden'), 2000);
}

// ==========================================
// Utilities
// ==========================================
function toggleModal(modal, show) {
    if (show) {
        modal.classList.remove('hidden');
        modal.querySelector('.modal-content')?.classList.add('modal-enter-active');
    } else {
        modal.classList.add('hidden');
    }
}

function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    const colors = {
        success: 'bg-green-500/20 text-green-300 border-green-500/50',
        error: 'bg-red-500/20 text-red-300 border-red-500/50',
        warning: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
        info: 'bg-blue-500/20 text-blue-300 border-blue-500/50'
    };

    toast.className = `px-4 py-3 rounded-lg border backdrop-blur-md shadow-lg flex items-center gap-3 animate-fade-in ${colors[type] || colors.info}`;
    toast.innerHTML = `
        <i class="fa-solid fa-circle-info"></i>
        <span class="font-medium text-sm">${msg}</span>
    `;

    el.toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateDate() {
    const d = new Date();
    el.todayDate.textContent = `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
}

function formatVolume(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

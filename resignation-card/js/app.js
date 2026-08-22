// 🏃 離職集點卡 - 樹莓派雲端同步與互動引擎
const STORAGE_KEY = 'eoelior_resignation_card_v2';
const UID_KEY = 'eoelior_quit_uid';
const API_BASE = 'https://hello.5b2c1990eo.shop/api/resignation-card';

const TEMPLATES = {
    zombie: {
        icon: '🧟',
        title: '死透Q版喪屍',
        desc: '累翻了就是要擺爛，每次蓋章都像喪屍一樣無力',
        stamps: ['死了 😵', '累死 😫', '滿頭星 💫', '喪屍臉 🧟', '原地GG ☠️'],
        colors: ['#e11d48', '#881337', '#9333ea', '#4f46e5']
    },
    raccoon: {
        icon: '🦝',
        title: '厭世浣熊',
        desc: '翻白眼、收離職信、老子不幹了，厭世到極致',
        stamps: ['翻白眼 🙄', '哼 😒', '隨便 🤷', '不想上班 🚫', '收工 👋'],
        colors: ['#ea580c', '#d97706', '#ca8a04', '#65a30d']
    },
    quokka: {
        icon: '🦘',
        title: '無所謂矮袋鼠',
        desc: '慢慢來、慢慢逃，什麼都無所謂的佛系離職',
        stamps: ['無所謂 🤷', '隨緣 🍃', '再說 😴', '不急 🐌', '哦 🦘'],
        colors: ['#0d9488', '#059669', '#16a34a', '#0284c7']
    },
    fox: {
        icon: '🦊',
        title: '就這樣吧狐朦',
        desc: '管他的、不關我事、我只是打工仔，淡定到無感',
        stamps: ['管他的 🦊', '不關我事 😑', '我只打工 💼', '隨便 🤷', 'OK 👌'],
        colors: ['#f97316', '#ef4444', '#84cc16', '#64748b']
    },
    guanyin: {
        icon: '🙇',
        title: '拯救蒼生觀世音',
        desc: '我是來度眾生的，不是來受苦的，阿彌陀佛',
        stamps: ['阿彌陀佛 🙏', '我佛慈悲 ☸️', '大慈大悲 🕉️', '在渡劫 🧘', '善哉 🙇'],
        colors: ['#eab308', '#ca8a04', '#d97706', '#b45309']
    },
    tudigong: {
        icon: '🧙',
        title: '我愛世人土地公',
        desc: '土地公也想離職，但我還是愛你們的，祝福滿滿',
        stamps: ['祝福你 🧙', '平安好 🏠', '財源廣進 🧧', '保佑你 🙏', '好運來 🍊'],
        colors: ['#dc2626', '#b91c1c', '#991b1b', '#7f1d1d']
    }
};

const RANDOM_REASONS = [
    '主管又在開毫無重點的廢話會議',
    '需求改了五次又改回第一版',
    '被要求通靈客戶沒說出口的想法',
    '星期一症候群重度發作，靈魂出竅',
    '老闆畫的大餅我真的消化不良',
    '今天只想躺平當一條快樂的鹹魚',
    '薪水小偷今日打卡上班',
    '隔壁同事甩鍋技巧又上一層樓',
    '連假剛結束，整個人都不好了',
    '忍一時越想越氣，退一步原地離職'
];

let state = {
    total_stamps: 12,
    template: 'zombie',
    stamps: [], // { text, reason, time, color }
};

let currentUid = '';
let syncTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    initUid();
    loadLocalState();
    initUI();
    render();
    fetchRemoteState();
});

// 初始化用戶 UID（支援 URL 參數 ?uid= 或 localStorage）
function initUid() {
    const urlParams = new URLSearchParams(window.location.search);
    const qUid = urlParams.get('uid') || urlParams.get('id');

    if (qUid && qUid.trim()) {
        currentUid = qUid.trim();
        localStorage.setItem(UID_KEY, currentUid);
    } else {
        const savedUid = localStorage.getItem(UID_KEY);
        if (savedUid && savedUid.trim()) {
            currentUid = savedUid.trim();
        } else {
            currentUid = 'guest_' + Math.random().toString(36).substring(2, 9);
            localStorage.setItem(UID_KEY, currentUid);
        }
    }
    updateUidDisplay();
}

function updateUidDisplay() {
    const el = document.getElementById('userIdDisplay');
    if (!el) return;
    const shortUid = currentUid.length > 14
        ? currentUid.substring(0, 6) + '...' + currentUid.substring(currentUid.length - 4)
        : currentUid;
    el.textContent = shortUid;
    el.title = `當前 UID: ${currentUid} (點擊可切換/複製)`;
}

function setSyncStatus(type, text) {
    const dot = document.getElementById('statusDot');
    const label = document.getElementById('statusText');
    if (!dot || !label) return;

    dot.className = `status-dot ${type}`;
    label.textContent = text;

    if (type === 'online' && text.includes('已同步')) {
        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
            label.textContent = '🌲 樹莓派雲端同步 (已連線)';
        }, 3000);
    }
}

function loadLocalState() {
    try {
        const key = `${STORAGE_KEY}_${currentUid}`;
        const saved = localStorage.getItem(key) || localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === 'object') {
                state.total_stamps = parsed.total_stamps || 12;
                state.template = parsed.template || 'zombie';
                state.stamps = Array.isArray(parsed.stamps) ? parsed.stamps : [];
            }
        }
    } catch (e) {
        console.error('Failed to load state from localStorage', e);
    }
}

function saveLocalState() {
    try {
        const key = `${STORAGE_KEY}_${currentUid}`;
        localStorage.setItem(key, JSON.stringify(state));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save state to localStorage', e);
    }
}

// 向樹莓派後端取得用戶即時集點卡資料
async function fetchRemoteState() {
    setSyncStatus('syncing', '🔄 讀取樹莓派中...');
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(`${API_BASE}?uid=${encodeURIComponent(currentUid)}`, {
            method: 'GET',
            mode: 'cors',
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();

        if (result && result.success && result.data) {
            const remote = result.data;
            if (remote.template) state.template = remote.template;
            if (remote.total_stamps) state.total_stamps = remote.total_stamps;
            if (Array.isArray(remote.stamps)) state.stamps = remote.stamps;

            saveLocalState();
            render();
            setSyncStatus('online', '🌲 樹莓派雲端同步 (已連線)');
        } else {
            setSyncStatus('online', '🌲 樹莓派連線正常');
        }
    } catch (err) {
        console.warn('[Sync] 樹莓派連線未達或處於離線狀態:', err.message);
        setSyncStatus('offline', '🟡 本機離線模式 (離線可用)');
    }
}

// 異步將最新狀態同步存入樹莓派 SQLite 資料庫
async function pushRemoteState() {
    setSyncStatus('syncing', '🔄 存檔至樹莓派...');
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(API_BASE, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid: currentUid,
                template: state.template,
                total_stamps: state.total_stamps,
                stamps: state.stamps,
            }),
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();
        if (result && result.success) {
            setSyncStatus('online', '🌲 樹莓派已同步 💾');
        } else {
            setSyncStatus('online', '🌲 樹莓派連線正常');
        }
    } catch (err) {
        console.warn('[Sync] 寫入樹莓派失敗:', err.message);
        setSyncStatus('offline', '🟡 本機離線模式 (已存於本機)');
    }
}

function initUI() {
    // 快速理由 Chips
    document.querySelectorAll('.chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById('customReasonInput');
            input.value = btn.dataset.reason;
            input.focus();
        });
    });

    // 蓋一個印章按鈕
    document.getElementById('stampOneBtn').addEventListener('click', () => {
        stampNext();
    });

    // 重置卡片
    document.getElementById('resetCardBtn').addEventListener('click', () => {
        if (state.stamps.length === 0) {
            alert('目前卡片已經是空的囉！');
            return;
        }
        if (confirm('確定要清空目前的集點卡嗎？（歷史紀錄將會清除並同步至樹莓派）')) {
            state.stamps = [];
            saveLocalState();
            render();
            pushRemoteState();
        }
    });

    // 複製戰績
    document.getElementById('shareCardBtn').addEventListener('click', () => {
        copyShareText();
    });

    // 格數按鈕切換
    document.querySelectorAll('.stamp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const count = parseInt(btn.dataset.count);
            setGridCount(count);
            document.getElementById('customGridInput').value = '';
        });
    });

    // 自訂格數輸入
    const customInput = document.getElementById('customGridInput');
    customInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        if (val >= 6 && val <= 30) {
            setGridCount(val);
        }
    });

    // 主題選擇
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.template = btn.dataset.template;
            saveLocalState();
            render();
            pushRemoteState();
        });
    });

    // 切換 / 綁定 UID 彈窗事件
    const modal = document.getElementById('uidModal');
    const switchBtn = document.getElementById('switchIdBtn');
    const closeBtn = document.getElementById('closeUidModal');
    const saveUidBtn = document.getElementById('saveUidBtn');
    const randomUidBtn = document.getElementById('randomUidBtn');
    const uidInput = document.getElementById('uidInput');

    if (switchBtn && modal) {
        switchBtn.addEventListener('click', () => {
            uidInput.value = currentUid;
            modal.style.display = 'flex';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    if (saveUidBtn && uidInput) {
        saveUidBtn.addEventListener('click', () => {
            const val = uidInput.value.trim();
            if (!val) {
                alert('請輸入有效的用戶 ID！');
                return;
            }
            currentUid = val;
            localStorage.setItem(UID_KEY, currentUid);
            updateUidDisplay();
            modal.style.display = 'none';
            loadLocalState();
            render();
            fetchRemoteState();
        });
    }

    if (randomUidBtn && uidInput) {
        randomUidBtn.addEventListener('click', () => {
            const newGuest = 'guest_' + Math.random().toString(36).substring(2, 9);
            uidInput.value = newGuest;
        });
    }
}

function setGridCount(count) {
    document.querySelectorAll('.stamp-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.count) === count);
    });
    state.total_stamps = count;
    if (state.stamps.length > count) {
        state.stamps = state.stamps.slice(0, count);
    }
    saveLocalState();
    render();
    pushRemoteState();
}

function stampNext(customReasonText = null) {
    if (state.stamps.length >= state.total_stamps) {
        alert('🎉 恭喜你！集點卡已經全部集滿囉！\n請立即向老闆領取自由，或點擊「重置卡片」開啟第二回合！');
        return;
    }

    const t = TEMPLATES[state.template] || TEMPLATES.zombie;
    const randomStamp = t.stamps[Math.floor(Math.random() * t.stamps.length)];
    const randomColor = t.colors[Math.floor(Math.random() * t.colors.length)];

    const input = document.getElementById('customReasonInput');
    const reason = customReasonText || input.value.trim() || RANDOM_REASONS[Math.floor(Math.random() * RANDOM_REASONS.length)];

    const now = new Date();
    const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    state.stamps.push({
        text: randomStamp,
        reason: reason,
        time: timeStr,
        color: randomColor
    });

    input.value = '';
    saveLocalState();
    render();
    pushRemoteState();

    // 集滿提醒
    if (state.stamps.length === state.total_stamps) {
        setTimeout(() => {
            alert(`🎉 恭喜達成【${state.total_stamps}/${state.total_stamps}】滿點成就！\n\n「既然都集滿了，那這破班就不用上了！快逃吧孩子！🚀」`);
        }, 300);
    }
}

function unstamp(index) {
    if (index >= 0 && index < state.stamps.length) {
        if (confirm(`確定要取消第 ${index + 1} 個印章嗎？`)) {
            state.stamps.splice(index, 1);
            saveLocalState();
            render();
            pushRemoteState();
        }
    }
}

function render() {
    const t = TEMPLATES[state.template] || TEMPLATES.zombie;

    // 更新頂部資訊
    document.getElementById('themeIcon').textContent = t.icon;
    document.getElementById('themeTitle').textContent = t.title;
    document.getElementById('stampedCount').textContent = state.stamps.length;
    document.getElementById('totalCount').textContent = state.total_stamps;

    // 更新主題說明與按鈕狀態
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.template === state.template);
    });

    const descBox = document.getElementById('templateDescBox');
    descBox.innerHTML = `
        <p><strong>${t.icon} ${t.title}：</strong>${t.desc}</p>
        <p><strong>💫 印章風格：</strong>${t.stamps.join('、')}</p>
    `;

    // 更新印章池預覽
    const previewList = document.getElementById('stampsPreviewList');
    previewList.innerHTML = t.stamps.map((stamp, i) => {
        const c = t.colors[i % t.colors.length];
        return `<span class="stamp-chip" style="background:${c}">${stamp}</span>`;
    }).join('');

    // 更新格數按鈕狀態
    let matchedPreset = false;
    document.querySelectorAll('.stamp-btn').forEach(btn => {
        const isMatch = parseInt(btn.dataset.count) === state.total_stamps;
        btn.classList.toggle('active', isMatch);
        if (isMatch) matchedPreset = true;
    });
    if (!matchedPreset) {
        document.getElementById('customGridInput').value = state.total_stamps;
    }

    // 渲染印章網格
    const grid = document.getElementById('stampsGrid');
    grid.innerHTML = '';

    for (let i = 0; i < state.total_stamps; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';

        if (i < state.stamps.length) {
            const stampData = state.stamps[i];
            cell.classList.add('stamped');
            cell.style.borderColor = stampData.color;
            cell.innerHTML = `
                <div class="stamp-badge" style="background:${stampData.color}">
                    <span class="stamp-text">${stampData.text}</span>
                    <span class="stamp-idx">#${i + 1}</span>
                </div>
            `;
            cell.title = `第 ${i + 1} 點：${stampData.reason} (${stampData.time}) - 點擊可撤銷`;
            cell.addEventListener('click', () => unstamp(i));
        } else {
            cell.classList.add('empty');
            cell.innerHTML = `
                <span class="cell-number">${i + 1}</span>
                <span class="cell-hint">點擊蓋章</span>
            `;
            cell.title = `點擊直接蓋第 ${i + 1} 個印章`;
            cell.addEventListener('click', () => stampNext());
        }
        grid.appendChild(cell);
    }

    // 更新最近理由與語錄
    const quoteText = document.getElementById('recentReasonText');
    if (state.stamps.length > 0) {
        const last = state.stamps[state.stamps.length - 1];
        quoteText.textContent = `[${last.time}] ${last.reason}（印章：${last.text}）`;
    } else {
        quoteText.textContent = '尚未蓋章，今天還在堅強打工中...';
    }

    // 更新歷史紀錄
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('historyList');
    if (state.stamps.length === 0) {
        list.innerHTML = '<div class="empty-history">暫無蓋章記錄，點擊上方按鈕開始蓋章！</div>';
        return;
    }

    let html = '';
    for (let i = state.stamps.length - 1; i >= 0; i--) {
        const item = state.stamps[i];
        html += `
            <div class="history-item">
                <div class="h-stamp" style="background:${item.color}">${item.text}</div>
                <div class="h-info">
                    <div class="h-reason">第 ${i + 1} 格：${item.reason}</div>
                    <div class="h-time">${item.time}</div>
                </div>
                <button class="h-del-btn" onclick="unstamp(${i})" title="撤銷此章">✕</button>
            </div>
        `;
    }
    list.innerHTML = html;
}

function copyShareText() {
    const t = TEMPLATES[state.template] || TEMPLATES.zombie;
    const count = state.stamps.length;
    const total = state.total_stamps;
    const pct = Math.round((count / total) * 100);
    const lastReason = count > 0 ? state.stamps[count - 1].reason : '還在忍耐中';

    const text = `🏃 【eoElior 離職集點卡戰績】
🎪 模式：${t.icon} ${t.title}
📊 當前進度：${count} / ${total} 格 (${pct}%)
💬 最新厭世理由：${lastReason}
${count >= total ? '🚀 恭喜滿點！老子不幹了！' : '💪 距離原地解脫還剩 ' + (total - count) + ' 點'}
🔗 查看我的集點卡：https://eowilling.github.io/eoelior/resignation-card/?uid=${encodeURIComponent(currentUid)}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('📋 戰績已複製到剪貼簿！可直接貼到 LINE 聊天室與好友分享！');
        }).catch(() => {
            prompt('請複製以下文字：', text);
        });
    } else {
        prompt('請複製以下文字：', text);
    }
}

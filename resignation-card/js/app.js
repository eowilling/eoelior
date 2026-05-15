// 離職集點卡設計器 - JavaScript

// 設定狀態
let config = {
    total_stamps: 12,
    template: 'zombie',  // 改為預設 zombie
    created_at: null
};

// LIFF 設定（暫時禁用）
const LIFF_ID = ''; // 留空直到設定完成

// Webhook URL（你的 LINE Bot）
const WEBHOOK_URL = 'https://linebot.5b2c1990eo.shop/line/webhook';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // initLIFF();  // 暫時註解掉
    initEventListeners();
    updatePreview();
    updateTemplateDescription('zombie');  // 初始化預設模板說明
});

// 初始化事件監聽器
function initEventListeners() {
    // 集點數量按鈕
    document.querySelectorAll('.stamp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.stamp-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const count = parseInt(btn.dataset.count);
            config.total_stamps = count;
            
            document.getElementById('customCount').value = '';
            updatePreview();
        });
    });
    
    // 自訂格數
    const customInput = document.getElementById('customCount');
    customInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        
        if (value >= 6 && value <= 30) {
            document.querySelectorAll('.stamp-btn').forEach(b => b.classList.remove('active'));
            config.total_stamps = value;
            updatePreview();
        }
    });
    
    // 模板選擇
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            config.template = btn.dataset.template;
            updateTemplateDescription(config.template);
        });
    });
    
    // 提交按鈕（暫時禁用）
    document.getElementById('submitBtn').addEventListener('click', () => {
        alert('⚠️ LIFF 功能尚未啟用\n\n請先在 LINE Bot 中直接使用「離職」觸發集點卡功能');
    });
}

// 更新預覽
function updatePreview() {
    const total = config.total_stamps;
    document.getElementById('previewTotal').textContent = total;
    
    const grid = document.getElementById('progressGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < total; i++) {
        const cell = document.createElement('div');
        cell.className = 'progress-cell';
        cell.textContent = '□';
        grid.appendChild(cell);
    }
}

// 更新模板說明
function updateTemplateDescription(template) {
    const descriptions = {
        zombie: {
            title: '🧟 死透Q版喪屍',
            desc: '累翻了就是要擺爛，每次蓋章都像喪屍一樣無力',
            stamps: ['死了 😵', '累死 😫', '滿頭星星 💫', '喪屍臉 🧟', 'GG ☠️']
        },
        raccoon: {
            title: '🦝 厭世浣熊',
            desc: '翻白眼、收離職信、老子不幹了，厭世到極致',
            stamps: ['翻白眼 🙄', '哼 😒', '隨便 🤷', '不想上班 🚫', '收 👋']
        },
        quokka: {
            title: '🦘 無所謂矮袋鼠',
            desc: '慢慢來、慢慢逃，什麼都無所謂的佛系離職',
            stamps: ['無所謂 🤷', '随緣 🍃', '再說 😴', '不急 🐌', '哦 🦘']
        },
        fox: {
            title: '🦊 就這樣吧狐朦',
            desc: '管他的、不關我事、我只是打工仔，淡定到無感',
            stamps: ['管他的 🦊', '不關我事 😑', '我只是打工 💼', '隨便 🤷', 'OK 👌']
        },
        guanyin: {
            title: '🙇 拯救蒼生觀世音',
            desc: '我是來度眾生的，不是來受苦的，阿彌陀佛',
            stamps: ['阿彌陀佛 🙏', '我佛慈悲 ☸️', '大慈大悲 🕉️', '渡你們就好 🧘', '善哉 🙇']
        },
        tudigong: {
            title: '🧙 我愛世人土地公',
            desc: '土地公也想離職，但我還是愛你們的，祝福滿滿',
            stamps: ['祝福你 🧙', '平安好 🏠', '財源廣進 🧧', '保佑你 🙏', '好運來 🍊']
        }
    };
    
    const desc = descriptions[template];
    const preview = document.getElementById('templatePreview');
    
    preview.innerHTML = `
        <div class="template-desc">
            <p><strong>${desc.title}：</strong>${desc.desc}</p>
            <p><strong>💫 印章風格：</strong>${desc.stamps.join('、')}</p>
        </div>
    `;
    
    // 更新印章預覽
    updateStampPreview(template);
}

// 更新印章預覽
function updateStampPreview(template) {
    const stampData = {
        zombie: ['死了', '累死', '滿頭星星', '喪屍臉', 'GG'],
        raccoon: ['翻白眼', '哼', '隨便', '不想上班', '收'],
        quokka: ['無所謂', '随緣', '再說', '不急', '哦'],
        fox: ['管他的', '不關我事', '我只是打工', '隨便', 'OK'],
        guanyin: ['阿彌陀佛', '我佛慈悲', '大慈大悲', '渡你們就好', '善哉'],
        tudigong: ['祝福你', '平安好', '財源廣進', '保佑你', '好運來']
    };
    
    const colors = ['red', 'blue', 'green'];
    const stamps = stampData[template] || stampData.zombie;
    const preview = document.getElementById('stampPreview');
    
    preview.innerHTML = '';
    stamps.forEach((text, index) => {
        const color = colors[index % 3];
        const span = document.createElement('span');
        span.className = `stamp ${color}`;
        span.textContent = text;
        preview.appendChild(span);
    });
}

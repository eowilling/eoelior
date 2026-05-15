// 離職集點卡設計器 - JavaScript

// 設定狀態
let config = {
    total_stamps: 12,
    template: 'classic',
    created_at: null
};

// LIFF 設定（需要替換成你的 LIFF ID）
const LIFF_ID = '2006642341-5pjr2yYe'; // ⚠️ 需要替換成實際的 LIFF ID

// Webhook URL（你的 LINE Bot）
const WEBHOOK_URL = 'https://linebot.5b2c1990eo.shop/line/webhook';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initLIFF();
    initEventListeners();
    updatePreview();
});

// 初始化 LIFF
async function initLIFF() {
    try {
        await liff.init({ liffId: LIFF_ID });
        
        if (!liff.isLoggedIn()) {
            liff.login();
        }
        
        console.log('✅ LIFF 初始化成功');
    } catch (error) {
        console.error('❌ LIFF 初始化失敗:', error);
        // 如果 LIFF 失敗，仍然允許預覽功能
        document.getElementById('submitBtn').textContent = '⚠️ LIFF 初始化失敗，無法綁定';
        document.getElementById('submitBtn').disabled = true;
    }
}

// 初始化事件監聽器
function initEventListeners() {
    // 集點數量按鈕
    document.querySelectorAll('.stamp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有 active
            document.querySelectorAll('.stamp-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新設定
            const count = parseInt(btn.dataset.count);
            config.total_stamps = count;
            
            // 清空自訂輸入
            document.getElementById('customCount').value = '';
            
            // 更新預覽
            updatePreview();
        });
    });
    
    // 自訂格數
    const customInput = document.getElementById('customCount');
    customInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        
        if (value >= 6 && value <= 30) {
            // 移除所有 active
            document.querySelectorAll('.stamp-btn').forEach(b => b.classList.remove('active'));
            
            // 更新設定
            config.total_stamps = value;
            
            // 更新預覽
            updatePreview();
        }
    });
    
    // 模板選擇
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有 active
            document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新設定
            config.template = btn.dataset.template;
            
            // 更新模板說明
            updateTemplateDescription(config.template);
        });
    });
    
    // 提交按鈕
    document.getElementById('submitBtn').addEventListener('click', submitConfig);
}

// 更新預覽
function updatePreview() {
    const total = config.total_stamps;
    document.getElementById('previewTotal').textContent = total;
    
    // 更新進度格子
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
            stamps: '死了、累死、滿頭星星、喪屍臉、GG'
        },
        raccoon: {
            title: '🦝 厭世浣熊',
            desc: '翻白眼、收離職信、老子不幹了，厭世到極致',
            stamps: '翻白眼、哼、隨便、不想上班、收'
        },
        quokka: {
            title: '🦘 無所謂矮袋鼠',
            desc: '慢慢來、慢慢逃，什麼都無所謂的佛系離職',
            stamps: '無所謂、随緣、再說、不急、哦'
        },
        fox: {
            title: '🦊 就這樣吧狐朦',
            desc: '管他的、不關我事、我只是打工仔，淡定到無感',
            stamps: '管他的、不關我事、我只是打工、随便、OK'
        },
        guanyin: {
            title: '🙇 拯救萱生觀世音',
            desc: '我是來渡眾生的，不是來受苦的，阿彌陀佛',
            stamps: '阿彌陀佛、我佛慈悲、大慈大悲、渡你們就好、善哉'
        },
        tudigong: {
            title: '🧙 我愛世人土地公',
            desc: '土地公也想離職，但我還是愛你們的，祝福满滿',
            stamps: '祝福你、平安好、財源廣進、保佑你、好運來'
        }
    };
    
    const desc = descriptions[template];
    const preview = document.getElementById('templatePreview');
    
    preview.innerHTML = `
        <div class="template-desc">
            <p><strong>${desc.title}：</strong>${desc.desc}</p>
            <p><strong>💫 印章風格：</strong>${desc.stamps}</p>
        </div>
    `;
}

// 提交設定
async function submitConfig() {
    try {
        // 取得使用者資訊
        const profile = await liff.getProfile();
        const userId = profile.userId;
        
        console.log('使用者 ID:', userId);
        console.log('設定:', config);
        
        // 設定建立時間
        config.created_at = new Date().toISOString();
        
        // 發送到 LINE Bot webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'resignation_card_setup',
                user_id: userId,
                config: config
            })
        });
        
        if (response.ok) {
            // 成功後關閉 LIFF 視窗並發送訊息
            await liff.sendMessages([{
                type: 'text',
                text: '✅ 離職集點卡設定完成！\n\n現在可以使用「離職」或「快逃」觸發集點卡了 🏃💨'
            }]);
            
            liff.closeWindow();
        } else {
            alert('設定失敗，請稍後再試');
        }
        
    } catch (error) {
        console.error('提交失敗:', error);
        alert('發生錯誤：' + error.message);
    }
}

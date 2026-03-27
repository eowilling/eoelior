// DOM Elements
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadProgress = document.getElementById('uploadProgress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const uploadResult = document.getElementById('uploadResult');
const resultImage = document.getElementById('resultImage');
const resultUrl = document.getElementById('resultUrl');
const copyBtn = document.getElementById('copyBtn');
const galleryGrid = document.getElementById('galleryGrid');
const refreshBtn = document.getElementById('refreshBtn');
const toast = document.getElementById('toast');

// Event Listeners
uploadZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
copyBtn.addEventListener('click', copyToClipboard);
refreshBtn.addEventListener('click', loadGallery);

// Drag and Drop
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

// Handle File Selection
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFiles(files);
    }
}

// Handle Files Upload
async function handleFiles(files) {
    // Upload first file only for now
    const file = files[0];

    if (!file.type.startsWith('image/')) {
        showToast('請選擇圖片檔案', 'error');
        return;
    }

    // Show progress
    uploadProgress.style.display = 'block';
    uploadResult.style.display = 'none';
    progressFill.style.width = '0%';
    progressText.textContent = '上傳中...';

    // Create FormData
    const formData = new FormData();
    formData.append('image', file);

    try {
        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress <= 90) {
                progressFill.style.width = progress + '%';
            }
        }, 100);

        // Upload file
        const response = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });

        clearInterval(progressInterval);
        progressFill.style.width = '100%';

        const data = await response.json();

        if (data.success) {
            // Show result
            resultImage.src = data.url;
            resultUrl.value = data.url;

            uploadProgress.style.display = 'none';
            uploadResult.style.display = 'block';

            showToast('上傳成功！', 'success');

            // Reload gallery
            setTimeout(() => loadGallery(), 500);
        } else {
            throw new Error(data.error || '上傳失敗');
        }
    } catch (error) {
        console.error('Upload error:', error);
        uploadProgress.style.display = 'none';
        showToast('上傳失敗: ' + error.message, 'error');
    }
}

// Copy to Clipboard
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(resultUrl.value);
        showToast('已複製到剪貼簿！', 'success');
        copyBtn.textContent = '✅ 已複製';

        setTimeout(() => {
            copyBtn.textContent = '📋 複製';
        }, 2000);
    } catch (error) {
        console.error('Copy error:', error);
        showToast('複製失敗', 'error');
    }
}

// Copy Gallery URL
async function copyGalleryUrl(url, button) {
    try {
        await navigator.clipboard.writeText(url);
        showToast('已複製到剪貼簿！', 'success');
        const originalText = button.textContent;
        button.textContent = '✅';

        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    } catch (error) {
        console.error('Copy error:', error);
        showToast('複製失敗', 'error');
    }
}

// Load Gallery
async function loadGallery() {
    try {
        galleryGrid.innerHTML = '<div class="loading">載入中...</div>';

        const response = await fetch('get_images.php');
        const data = await response.json();

        if (data.success && data.images.length > 0) {
            galleryGrid.innerHTML = '';

            data.images.forEach(image => {
                const item = createGalleryItem(image);
                galleryGrid.appendChild(item);
            });
        } else {
            galleryGrid.innerHTML = `
                <div class="empty-gallery">
                    <div class="icon">📭</div>
                    <p>尚無上傳的圖片</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Gallery load error:', error);
        galleryGrid.innerHTML = '<div class="loading">載入失敗</div>';
    }
}

// Create Gallery Item
function createGalleryItem(image) {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const expiresInHours = Math.floor(image.expiresIn / 3600);
    const expiresInDays = Math.floor(expiresInHours / 24);
    const remainingHours = expiresInHours % 24;

    let expiresText = '';
    if (expiresInDays > 0) {
        expiresText = `${expiresInDays} 天 ${remainingHours} 小時後過期`;
    } else if (expiresInHours > 0) {
        expiresText = `${expiresInHours} 小時後過期`;
    } else {
        expiresText = '即將過期';
    }

    const expiresClass = expiresInHours < 24 ? 'expires-soon' : '';

    const uploadDate = new Date(image.uploaded * 1000);
    const dateStr = uploadDate.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const sizeKB = Math.round(image.size / 1024);

    item.innerHTML = `
        <img src="${image.url}" alt="${image.filename}" class="gallery-image" loading="lazy">
        <div class="gallery-info">
            <div class="gallery-url">
                <input type="text" value="${image.url}" readonly>
                <button onclick="copyGalleryUrl('${image.url}', this)">📋</button>
            </div>
            <div class="gallery-meta">
                <span>📅 ${dateStr}</span>
                <span>💾 ${sizeKB} KB</span>
                <span class="${expiresClass}">⏰ ${expiresText}</span>
            </div>
        </div>
    `;

    return item;
}

// Show Toast Notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast show ' + type;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format Time Remaining
function formatTimeRemaining(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);

    if (days > 0) {
        return `${days} 天 ${hours} 小時`;
    } else if (hours > 0) {
        return `${hours} 小時`;
    } else {
        return '不到 1 小時';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});

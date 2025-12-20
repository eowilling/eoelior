// eveday/shared-nav.js
// 用法：在頁面 <body> 內放 <div id="evedayNav"></div>，並引入本檔（建議 defer）
// 目的：讓 eveday 各頁有一致的導覽（簡易「框架」）

(function () {
  const mount = document.getElementById('evedayNav');
  if (!mount) return;

  const pathname = (window.location && window.location.pathname) ? window.location.pathname : '';
  const current = pathname.split('/').pop() || 'index.html';

  const items = [
    { href: '../index.html', label: '回入口' },
    { href: 'index.html', label: '待辦日曆' },
    { href: 'EveryDay.php', label: '語錄打卡（PHP）' },
    { href: 'quote-manager.html', label: '語錄管理' },
  ];

  function isActive(href) {
    // `EveryDay.php` 有時會被導到目錄預設頁，這裡用包含判斷更穩
    if (href === '../index.html') return current.toLowerCase() === 'index.html' && pathname.split('/').slice(-2, -1)[0] !== 'eveday';
    if (href === 'EveryDay.php') return current.toLowerCase() === 'everyday.php';
    return current.toLowerCase() === href.toLowerCase();
  }

  const links = items.map(({ href, label }) => {
    const active = isActive(href);
    const base =
      'px-3 py-2 rounded-lg text-sm font-semibold transition ' +
      'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';
    const cls = active
      ? `${base} bg-indigo-600 text-white`
      : `${base} text-gray-700 hover:bg-gray-100`;

    return `<a class="${cls}" href="${href}">${label}</a>`;
  }).join('');

  mount.innerHTML = `
    <div class="sticky top-0 z-40 -mx-4 md:-mx-8 mb-4 bg-white/90 backdrop-blur border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center gap-2 justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base font-bold text-gray-800">eveday</span>
          <span class="text-xs text-gray-400">工具集</span>
        </div>
        <nav class="flex flex-wrap items-center gap-2">
          ${links}
        </nav>
      </div>
    </div>
  `;
})();


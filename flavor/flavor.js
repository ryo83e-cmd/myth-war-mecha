(function () {
    // 1. CSSを自動読み込み
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'flavor/flavor.css';
    document.head.appendChild(link);

    // 2. モーダルのHTMLを自動生成してbodyに挿入
    const modalHTML = `
    <div id="flavor-modal-overlay">
      <div class="flavor-modal-container">
        <div class="flavor-modal-topbar">
          <span>// TACTICAL FIELD ARCHIVES // 現地調査記録データベース</span>
          <button class="flavor-modal-close-btn" onclick="closeFieldArchivesModal()">✕ CLOSE</button>
        </div>
        <div class="flavor-modal-body">
          <aside class="flavor-modal-sidebar" id="flavor-modal-nav-list">
            <p style="color: #9ca3af; font-size: 0.85rem;">目録読込中...</p>
          </aside>
          <main class="flavor-modal-main" id="flavor-modal-content">
            <p style="color: #9ca3af; text-align: center; margin-top: 50px;">レポートを選択してください。</p>
          </main>
        </div>
      </div>
    </div>
  `;
    document.addEventListener('DOMContentLoaded', () => {
        const div = document.createElement('div');
        div.innerHTML = modalHTML;
        document.body.appendChild(div);
    });
})();

// モーダルを開く関数
async function openFieldArchivesModal() {
    const overlay = document.getElementById('flavor-modal-overlay');
    if (overlay) overlay.classList.add('active');
    await loadArchiveNav();
}

// モーダルを閉じる関数
function closeFieldArchivesModal() {
    const overlay = document.getElementById('flavor-modal-overlay');
    if (overlay) overlay.classList.remove('active');
}

// 目録リストを読み込む
async function loadArchiveNav(selectedId = null) {
    try {
        const res = await fetch('flavor/data/list.json');
        const flavorList = await res.json();

        const navListEl = document.getElementById('flavor-modal-nav-list');
        if (!navListEl) return;

        const currentId = selectedId || (flavorList.length > 0 ? flavorList[0].flavorId : null);

        navListEl.innerHTML = flavorList.map(item => `
      <div onclick="loadArchiveContent('${item.flavorId}')" class="flavor-nav-item ${item.flavorId === currentId ? 'active' : ''}">
        <span style="display:block; font-weight:bold; font-size:0.9rem;">${item.title}</span>
        <span style="display:block; font-size:0.75rem; color:#60a5fa; margin-top:2px;">${item.sector}</span>
      </div>
    `).join("");

        if (currentId) {
            await loadArchiveContent(currentId, flavorList);
        }
    } catch (err) {
        console.error("Failed to load archive list:", err);
        const navListEl = document.getElementById('flavor-modal-nav-list');
        if (navListEl) navListEl.innerHTML = `<p style="color: #ef4444; font-size: 0.85rem;">※ 目録の取得に失敗しました。</p>`;
    }
}

// 選択された個別のレポート詳細を読み込む
async function loadArchiveContent(flavorId, preloadedList = null) {
    try {
        let flavorList = preloadedList;
        if (!flavorList) {
            const res = await fetch('flavor/data/list.json');
            flavorList = await res.json();
        }

        // アクティブ表示の切り替え
        document.querySelectorAll('.flavor-nav-item').forEach(el => el.classList.remove('active'));
        // 簡易的に一致するものをハイライト

        const targetMeta = flavorList.find(item => item.flavorId === flavorId);
        if (!targetMeta) return;

        const dataRes = await fetch(`flavor/data/${targetMeta.json}`);
        const data = await dataRes.json();

        const contentEl = document.getElementById('flavor-modal-content');
        if (!contentEl) return;

        contentEl.innerHTML = `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #374151; padding-bottom: 15px;">
        <h2 style="margin: 0; font-size: 1.5rem; color: #f3f4f6; font-family: 'Cinzel', serif;">${data.name}</h2>
        <div style="font-size: 0.85rem; color: #60a5fa; margin-top: 5px; font-family: monospace;">LOCATION: ${data.location} | DATE: ${data.date}</div>
      </div>

      <div style="width: 100%; max-height: 450px; background: #000; border-radius: 6px; overflow: hidden; margin-bottom: 20px; display: flex; justify-content: center; align-items: center; border: 1px solid #374151;">
        <img src="flavor/${data.image}" alt="${data.name}" style="max-width: 100%; max-height: 450px; object-fit: contain;">
      </div>

      <div style="background: #1f2937; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 0 4px 4px 0; font-size: 0.95rem; line-height: 1.8; color: #e5e7eb; font-family: 'Noto Serif JP', serif;">
        <p style="margin: 0;">${data.text}</p>
      </div>
    `;
    } catch (err) {
        console.error("Failed to load archive content:", err);
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get("id");

    const titleEl = document.getElementById("flavor-title");
    const metaEl = document.getElementById("flavor-meta");
    const imgEl = document.getElementById("flavor-img");
    const textEl = document.getElementById("flavor-text");
    const listContainer = document.getElementById("flavor-nav-list");

    try {
        // 1. 目録リストを読み込む
        const listRes = await fetch("data/list.json");
        const flavorList = await listRes.json();

        // 2. サイドバーのナビゲーションを生成
        if (listContainer) {
            listContainer.innerHTML = flavorList.map(item => `
        <a href="view.html?id=${item.flavorId}" class="flavor-nav-item ${item.flavorId === targetId ? 'active' : ''}">
          <span class="nav-name">${item.title}</span>
          <span class="nav-sector">${item.sector}</span>
        </a>
      `).join("");
        }

        // デフォルトIDの設定（指定がなければリストの先頭）
        const currentId = targetId || (flavorList.length > 0 ? flavorList[0].flavorId : null);
        if (!currentId) return;

        // 3. 該当するメタデータを特定して個別JSONを取得
        const targetMeta = flavorList.find(item => item.flavorId === currentId);
        if (!targetMeta) throw new Error("Flavor report not found.");

        const dataRes = await fetch(`data/${targetMeta.json}`);
        const data = await dataRes.json();

        // 4. DOMへ反映
        if (titleEl) titleEl.textContent = data.name;
        if (metaEl) metaEl.textContent = `LOCATION: ${data.location} | DATE: ${data.date}`;
        if (imgEl) {
            imgEl.src = data.image;
            imgEl.alt = data.name;
        }
        if (textEl) textEl.textContent = data.text;

    } catch (err) {
        console.error("Failed to load flavor archive:", err);
        if (textEl) textEl.textContent = "※ 現地調査レポートの読み込みに失敗しました。";
    }
});
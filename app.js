// =========================================================================
// UI DISPLAY & ACCORDION CONTROL (DATA-DRIVEN THEME SUPPORT)
// =========================================================================
const mainPanel = document.getElementById('main-content-panel');
const navContainer = document.getElementById('nav-buttons-container');

// ナビボタン生成
SECTORS_DATA.forEach(sec => {
  const btn = document.createElement('button');
  btn.className = 'nav-btn';
  btn.id = `nav-${sec.id}`;
  btn.textContent = sec.btnLabel;
  btn.onclick = () => selectSector(sec.id);
  navContainer.appendChild(btn);
});

// 全体概要表示
function showOverview() {
  updateActiveNav('overview');
  mainPanel.innerHTML = `
    <div class="overview-view">
      <div class="panel-tag">// GLOBAL BRIEFING // プロジェクト概要</div>
      <h2>超古代神話兵器 構造考証・発掘解析全書</h2>
      <p>
        西暦20XX年、世界各地の超古代地層・海溝・霊峰地下より、現代物理学の定義を覆す巨大人型機動兵器「神代機体」が相次いで発掘された。
      </p>
      <p>
        解析の結果、世界各国に口伝・記述されてきた「神話」とは、かつてこの星で繰り広げられた文明間最終戦争の記録であることが判明。
        上の発掘国ボタン、または画面右下の戦術地球儀から各発掘地域を選択することで、所属部族・系統別の詳細諸元、個別機体発掘記録、および地域調査白書を閲覧できます。
      </p>
      <div class="overview-meta-grid">
        <div class="overview-meta-item">
          <div class="label">CONFIRMED SECTORS</div>
          <div class="val">${SECTORS_DATA.length} 勢力 / 地域</div>
        </div>
        <div class="overview-meta-item">
          <div class="label">ESTIMATED AGE</div>
          <div class="val">約 10,000 年前</div>
        </div>
        <div class="overview-meta-item">
          <div class="label">SYSTEM STATUS</div>
          <div class="val" style="color:var(--accent-gold)">STANDBY / ONLINE</div>
        </div>
      </div>
    </div>
  `;
}

// セクター選択表示（data.js の theme 定義を動的反映）
function selectSector(sectorId) {
  const sec = SECTORS_DATA.find(s => s.id === sectorId);
  if (!sec) return;

  updateActiveNav(sectorId);

  const theme = sec.theme || { accent: "#d4af37", pattern: "", symbol: "", code: "DEFAULT" };
  const patternClass = theme.pattern || "";

  // mainPanel（display-panel）に直接パターンクラスとCSS変数をセット
  mainPanel.className = `display-panel ${patternClass}`;
  mainPanel.style.setProperty('--sector-accent', theme.accent);

  const subFactionsHTML = sec.subFactions.map((faction, fIdx) => {
    const mechaItemsHTML = faction.mechaList.map((m, mIdx) => {
      const specRows = m.specs.map(s => `<tr><th>${s.label}</th><td>${s.value}</td></tr>`).join('');
      const openClass = (fIdx === 0 && mIdx === 0) ? 'open' : '';
      const itemId = `m-item-${fIdx}-${mIdx}`;
      
      const relicStoryHTML = m.relicStory ? `
        <div class="mecha-relic-log">
          <div class="relic-log-tag">// ${m.relicStory.tag}</div>
          <div class="relic-log-title">${m.relicStory.title}</div>
          <div class="relic-log-text">"${m.relicStory.text}"</div>
        </div>
      ` : '';

      return `
        <div class="mecha-accordion-item ${openClass}" id="${itemId}">
          <div class="accordion-header" onclick="toggleAccordion('${itemId}')">
            <span class="m-name">▶ ${m.name}</span>
            <span class="toggle-icon">▼</span>
          </div>
          <div class="accordion-body">
            <div class="image-frame" onclick="openModal('${m.image}', '${m.name}')">
              <img src="${m.image}" alt="${m.name}" onerror="this.outerHTML='<div class=\\'placeholder\\'>[ ${m.name} // 画像未設定 ]</div>'">
            </div>
            <div class="mecha-info-block">
              <table class="spec-table">
                ${specRows}
              </table>
              <div class="doctrine-box">
                <strong>${m.doctrineTitle}</strong><br>
                ${m.doctrineText}
              </div>
              ${relicStoryHTML}
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="subfaction-block">
        <div class="subfaction-header">
          <span class="subfaction-code">${faction.factionCode}</span>
          <h3 class="subfaction-title">${faction.factionName}</h3>
        </div>
        <div class="subfaction-mecha-list">
          ${mechaItemsHTML}
        </div>
      </div>
    `;
  }).join('');

  mainPanel.innerHTML = `
    <div class="sector-view">
      <div class="sector-header-flex">
        <div class="sector-title-group">
          <span class="tag">${sec.sectorTag} // ${theme.code}</span>
          <h2>${sec.sectorName} <span class="hud-badge" style="margin-left:0.5rem; border-color:${theme.accent}; color:${theme.accent};">${sec.mythBadge}</span></h2>
          <div class="sector-watermark-symbol">${theme.symbol}</div>
        </div>
        <button class="back-btn" onclick="showOverview()">◀ 全体概要に戻る</button>
      </div>

      <div class="sector-factions-container">
        ${subFactionsHTML}
      </div>

      <div class="story-card" style="border-left-color: ${theme.accent};">
        <div class="tag">// ${sec.story.tag}</div>
        <div class="title">${sec.story.title}</div>
        <div class="text">"${sec.story.text}"</div>
      </div>
    </div>
  `;
}

function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (item) item.classList.toggle('open');
}

function updateActiveNav(activeId) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  if (activeId === 'overview') {
    const overviewBtn = document.querySelector('.overview-btn');
    if (overviewBtn) overviewBtn.classList.add('active');
  } else {
    const targetBtn = document.getElementById(`nav-${activeId}`);
    if (targetBtn) targetBtn.classList.add('active');
  }
}

// =========================================================================
// THREE.JS GLOBE SETUP (SHARED FACTORY)
// =========================================================================
const textureLoader = new THREE.TextureLoader();
textureLoader.setCrossOrigin('anonymous');
const earthMap = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_atmos_2048.jpg');
const earthBump = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_normal_2048.jpg');
const earthSpec = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_specular_2048.jpg');
const cloudsMap = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_clouds_1024.png');

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// --- 1. ミニ地球儀（右下HUD） ---
const miniContainer = document.getElementById('mini-globe-canvas');
const miniScene = new THREE.Scene();
const miniCamera = new THREE.PerspectiveCamera(45, miniContainer.clientWidth / miniContainer.clientHeight, 0.1, 500);
miniCamera.position.z = 175;

const miniRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
miniRenderer.setSize(miniContainer.clientWidth, miniContainer.clientHeight);
miniContainer.appendChild(miniRenderer.domElement);

const miniGroup = new THREE.Group();
miniScene.add(miniGroup);

const miniEarth = new THREE.Mesh(
  new THREE.SphereGeometry(60, 32, 32),
  new THREE.MeshPhongMaterial({ map: earthMap, bumpMap: earthBump, bumpScale: 0.05, shininess: 10 })
);
miniGroup.add(miniEarth);

const miniClouds = new THREE.Mesh(
  new THREE.SphereGeometry(60.8, 32, 32),
  new THREE.MeshLambertMaterial({ map: cloudsMap, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending })
);
miniGroup.add(miniClouds);

miniScene.add(new THREE.AmbientLight(0xffffff, 1.2));
const miniSun = new THREE.DirectionalLight(0xffffff, 1.2);
miniSun.position.set(100, 50, 100);
miniScene.add(miniSun);

const miniPinGeo = new THREE.SphereGeometry(1.8, 8, 8);
const miniPinMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
SECTORS_DATA.forEach(sec => {
  const pos = latLonToVector3(sec.lat, sec.lon, 61.2);
  const p = new THREE.Mesh(miniPinGeo, miniPinMat);
  p.position.copy(pos);
  miniGroup.add(p);
});

// --- 2. モーダル展開用・全画面地球儀 ---
const modalContainer = document.getElementById('modal-globe-canvas');
const modalScene = new THREE.Scene();
const modalCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
modalCamera.position.z = 200;

const modalRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
modalContainer.appendChild(modalRenderer.domElement);

const modalGroup = new THREE.Group();
modalScene.add(modalGroup);

const modalEarth = new THREE.Mesh(
  new THREE.SphereGeometry(68, 64, 64),
  new THREE.MeshPhongMaterial({ map: earthMap, bumpMap: earthBump, bumpScale: 0.05, specularMap: earthSpec, specular: new THREE.Color(0x223344), shininess: 15 })
);
modalGroup.add(modalEarth);

const modalClouds = new THREE.Mesh(
  new THREE.SphereGeometry(68.8, 64, 64),
  new THREE.MeshLambertMaterial({ map: cloudsMap, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending })
);
modalGroup.add(modalClouds);

const modalAtmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(72.5, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0x00d4ff, side: THREE.BackSide, transparent: true, opacity: 0.18 })
);
modalScene.add(modalAtmosphere);

modalScene.add(new THREE.AmbientLight(0x404855, 1.2));
const modalSun = new THREE.DirectionalLight(0xffffff, 1.5);
modalSun.position.set(180, 80, 150);
modalScene.add(modalSun);

const modalPinObjects = [];
const modalPinGeo = new THREE.SphereGeometry(2.0, 16, 16);
const modalRingGeo = new THREE.RingGeometry(2.8, 4.0, 24);

SECTORS_DATA.forEach(sec => {
  const pos = latLonToVector3(sec.lat, sec.lon, 69.5);
  const pin = new THREE.Mesh(modalPinGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
  pin.position.copy(pos);
  pin.userData = { targetId: sec.id };
  modalGroup.add(pin);
  modalPinObjects.push(pin);

  const ring = new THREE.Mesh(modalRingGeo, new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide }));
  ring.position.copy(pos.clone().multiplyScalar(1.005));
  ring.lookAt(pos.clone().multiplyScalar(2));
  modalGroup.add(ring);
});

// モーダル操作制御
let isDragging = false;
let prevPos = { x: 0, y: 0 };
let autoRotateModal = true;

modalContainer.addEventListener('pointerdown', e => {
  isDragging = true;
  autoRotateModal = false;
  prevPos = { x: e.clientX, y: e.clientY };
});

window.addEventListener('pointerup', () => { isDragging = false; });

modalContainer.addEventListener('pointermove', e => {
  if (isDragging) {
    const deltaX = e.clientX - prevPos.x;
    const deltaY = e.clientY - prevPos.y;
    modalGroup.rotation.y += deltaX * 0.005;
    modalGroup.rotation.x += deltaY * 0.005;
    prevPos = { x: e.clientX, y: e.clientY };
  }
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

modalContainer.addEventListener('click', e => {
  const rect = modalContainer.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / modalContainer.clientWidth) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / modalContainer.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, modalCamera);
  const intersects = raycaster.intersectObjects(modalPinObjects);

  if (intersects.length > 0) {
    const targetId = intersects[0].object.userData.targetId;
    closeGlobeModal();
    selectSector(targetId);
  }
});

// モーダル開閉
function openGlobeModal() {
  const modal = document.getElementById('globe-modal');
  modal.classList.add('active');
  resizeModalGlobe();
  autoRotateModal = true;
}

function closeGlobeModal() {
  document.getElementById('globe-modal').classList.remove('active');
}

function resizeModalGlobe() {
  const w = modalContainer.clientWidth;
  const h = modalContainer.clientHeight;
  if (w && h) {
    modalCamera.aspect = w / h;
    modalCamera.updateProjectionMatrix();
    modalRenderer.setSize(w, h);
  }
}

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);

  // ミニ地球儀の自転
  miniGroup.rotation.y += 0.004;
  miniClouds.rotation.y += 0.006;
  miniRenderer.render(miniScene, miniCamera);

  // モーダル地球儀の自転 / 描画
  if (document.getElementById('globe-modal').classList.contains('active')) {
    if (!isDragging && autoRotateModal) {
      modalGroup.rotation.y += 0.0015;
      modalClouds.rotation.y += 0.0022;
    }
    modalRenderer.render(modalScene, modalCamera);
  }
}
animate();

window.addEventListener('resize', () => {
  resizeModalGlobe();
});

// =========================================================================
// MODAL CONTROLLER & INITIALIZATION
// =========================================================================
function openModal(src, title) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const caption = document.getElementById('modal-caption');
  modalImg.src = src;
  caption.textContent = `DEEP ARCHIVE ANALYSIS // ${title}`;
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('image-modal').classList.remove('active');
}

// 初期表示
showOverview();

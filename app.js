// =========================================================================
// UI DISPLAY & ACCORDION CONTROL (DUAL STORY SUPPORT)
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
  autoRotate = true;
  targetRotation = null;

  mainPanel.innerHTML = `
    <div class="overview-view">
      <div class="panel-tag">// GLOBAL BRIEFING // プロジェクト概要</div>
      <h2>超古代神話兵器 構造考証・発掘解析全書</h2>
      <p>
        西暦20XX年、世界各地の超古代地層・海溝・霊峰地下より、現代物理学の定義を覆す巨大人型機動兵器「神代機体」が相次いで発掘された。
      </p>
      <p>
        解析の結果、世界各国に口伝・記述されてきた「神話」とは、かつてこの星で繰り広げられた文明間最終戦争の記録であることが判明。
        上の地球儀、またはナビゲーションボタンから各発掘地域（セクター）を選択することで、所属部族・系統別の詳細諸元、個別機体発掘記録、および地域調査白書を閲覧できます。
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

// セクター選択表示
function selectSector(sectorId) {
  const sec = SECTORS_DATA.find(s => s.id === sectorId);
  if (!sec) return;

  updateActiveNav(sectorId);
  rotateGlobeTo(sec.lat, sec.lon);

  // 部族（Sub-faction）ごとのブロックを組み立てる
  const subFactionsHTML = sec.subFactions.map((faction, fIdx) => {
    const mechaItemsHTML = faction.mechaList.map((m, mIdx) => {
      const specRows = m.specs.map(s => `<tr><th>${s.label}</th><td>${s.value}</td></tr>`).join('');
      const openClass = (fIdx === 0 && mIdx === 0) ? 'open' : '';
      const itemId = `m-item-${fIdx}-${mIdx}`;
      
      // 機体個別ストーリーのHTML
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
          <span class="tag">${sec.sectorTag}</span>
          <h2>${sec.sectorName} <span class="hud-badge" style="margin-left:0.5rem;">${sec.mythBadge}</span></h2>
        </div>
        <button class="back-btn" onclick="showOverview()">◀ 全体概要に戻る</button>
      </div>

      <div class="sector-factions-container">
        ${subFactionsHTML}
      </div>

      <!-- 地域全体の発掘総括レポート -->
      <div class="story-card">
        <div class="tag">// ${sec.story.tag}</div>
        <div class="title">${sec.story.title}</div>
        <div class="text">"${sec.story.text}"</div>
      </div>
    </div>
  `;
}

function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (item) {
    item.classList.toggle('open');
  }
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
// THREE.JS 3D GLOBE
// =========================================================================
const container = document.getElementById('globe-canvas');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const globeGroup = new THREE.Group();
scene.add(globeGroup);

const textureLoader = new THREE.TextureLoader();
textureLoader.setCrossOrigin('anonymous');

const earthMap = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_atmos_2048.jpg');
const earthBump = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_normal_2048.jpg');
const earthSpec = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_specular_2048.jpg');

const earthMat = new THREE.MeshPhongMaterial({
  map: earthMap,
  bumpMap: earthBump,
  bumpScale: 0.05,
  specularMap: earthSpec,
  specular: new THREE.Color(0x223344),
  shininess: 15
});
const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(68, 64, 64), earthMat);
globeGroup.add(earthMesh);

const cloudsMap = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_clouds_1024.png');
const cloudsMat = new THREE.MeshLambertMaterial({
  map: cloudsMap,
  transparent: true,
  opacity: 0.35,
  blending: THREE.AdditiveBlending
});
const cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(68.8, 64, 64), cloudsMat);
globeGroup.add(cloudsMesh);

const atmosphereMat = new THREE.MeshBasicMaterial({
  color: 0x00d4ff,
  side: THREE.BackSide,
  transparent: true,
  opacity: 0.18
});
const atmosphereMesh = new THREE.Mesh(new THREE.SphereGeometry(72.5, 64, 64), atmosphereMat);
scene.add(atmosphereMesh);

const ambientLight = new THREE.AmbientLight(0x404855, 1.2);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(180, 80, 150);
scene.add(sunLight);

const rimLight = new THREE.DirectionalLight(0x00f0ff, 0.6);
rimLight.position.set(-180, -50, -100);
scene.add(rimLight);

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

const pinObjects = [];
const pinGeo = new THREE.SphereGeometry(1.8, 16, 16);
const ringGeo = new THREE.RingGeometry(2.6, 3.6, 24);

SECTORS_DATA.forEach(sec => {
  const pos = latLonToVector3(sec.lat, sec.lon, 69.5);

  const pinMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const pin = new THREE.Mesh(pinGeo, pinMat);
  pin.position.copy(pos);
  pin.userData = { targetId: sec.id };
  globeGroup.add(pin);
  pinObjects.push(pin);

  const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.copy(pos.clone().multiplyScalar(1.005));
  ring.lookAt(pos.clone().multiplyScalar(2));
  globeGroup.add(ring);
});

globeGroup.rotation.y = -Math.PI / 2;

let isDragging = false;
let prevPos = { x: 0, y: 0 };
let autoRotate = true;
let targetRotation = null;

container.addEventListener('pointerdown', e => {
  isDragging = true;
  autoRotate = false;
  targetRotation = null;
  prevPos = { x: e.clientX, y: e.clientY };
});

window.addEventListener('pointerup', () => { isDragging = false; });

container.addEventListener('pointermove', e => {
  if (isDragging) {
    const deltaX = e.clientX - prevPos.x;
    const deltaY = e.clientY - prevPos.y;
    globeGroup.rotation.y += deltaX * 0.005;
    globeGroup.rotation.x += deltaY * 0.005;
    prevPos = { x: e.clientX, y: e.clientY };
  }
});

function rotateGlobeTo(lat, lon) {
  autoRotate = false;
  const targetY = - (lon + 90) * (Math.PI / 180);
  const targetX = (lat) * (Math.PI / 180) * 0.3;
  targetRotation = { x: targetX, y: targetY };
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

container.addEventListener('click', e => {
  const rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(pinObjects);

  if (intersects.length > 0) {
    const targetId = intersects[0].object.userData.targetId;
    selectSector(targetId);
  }
});

function animate() {
  requestAnimationFrame(animate);

  if (targetRotation) {
    globeGroup.rotation.y += (targetRotation.y - globeGroup.rotation.y) * 0.06;
    globeGroup.rotation.x += (targetRotation.x - globeGroup.rotation.x) * 0.06;
  } else if (!isDragging && autoRotate) {
    globeGroup.rotation.y += 0.0012;
    cloudsMesh.rotation.y += 0.0018;
  }

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
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

// 起動時初期化
showOverview();

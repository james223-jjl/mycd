import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const POINT_COUNT = 80;
const SPHERE_RADIUS = 5;
const LINE_COLOR = 0x333333;
const NODE_COLOR = 0xAB51C5;
const SPECIAL_COLOR = 0xAB51C5;
const SPECIAL_COUNT = 16;
const CONNECTION_DISTANCE = 3.5;

const AVATAR_FILES = [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];

interface UserProfile {
  type: 'user';
  name: string;
  avatar: string;
  winRate: string;
  pnl: string;
  volume: string;
  followers: string;
}

interface ExchangeInfo {
  type: 'exchange';
  name: string;
  avatar: string;
}

type TooltipData = UserProfile | ExchangeInfo;

const TOOLTIP_DATA: TooltipData[] = [
  { type: 'user', name: '@CryptoWhale', avatar: `/avatars/${AVATAR_FILES[0]}.png`, winRate: '78.5%', pnl: '+$245K', volume: '$12.5M', followers: '12.4K' },
  { type: 'exchange', name: 'Binance', avatar: '/exchanges/binance.svg' },
  { type: 'user', name: '@DiamondHands', avatar: `/avatars/${AVATAR_FILES[1]}.png`, winRate: '74.2%', pnl: '+$198K', volume: '$9.8M', followers: '8.2K' },
  { type: 'exchange', name: 'OKX', avatar: '/exchanges/okx.svg' },
  { type: 'user', name: '@MoonTrader', avatar: `/avatars/${AVATAR_FILES[2]}.png`, winRate: '71.8%', pnl: '+$187K', volume: '$8.4M', followers: '5.7K' },
  { type: 'exchange', name: 'Bybit', avatar: '/exchanges/bybit.svg' },
  { type: 'user', name: '@BullMarket', avatar: `/avatars/${AVATAR_FILES[3]}.png`, winRate: '69.3%', pnl: '+$145K', volume: '$7.2M', followers: '4.1K' },
  { type: 'exchange', name: 'Bitget', avatar: '/exchanges/bitget.svg' },
  { type: 'user', name: '@TraderPro', avatar: `/avatars/${AVATAR_FILES[4]}.png`, winRate: '68.7%', pnl: '+$134K', volume: '$6.8M', followers: '3.8K' },
  { type: 'user', name: '@CoinMaster', avatar: `/avatars/${AVATAR_FILES[5]}.png`, winRate: '67.4%', pnl: '+$125K', volume: '$6.1M', followers: '3.2K' },
  { type: 'user', name: '@CryptoKing', avatar: `/avatars/${AVATAR_FILES[6]}.png`, winRate: '66.8%', pnl: '+$118K', volume: '$5.9M', followers: '2.9K' },
  { type: 'user', name: '@SatoshiFan', avatar: `/avatars/${AVATAR_FILES[7]}.png`, winRate: '65.2%', pnl: '+$109K', volume: '$5.5M', followers: '2.5K' },
  { type: 'user', name: '@AlphaTrader', avatar: `/avatars/${AVATAR_FILES[8]}.png`, winRate: '64.1%', pnl: '+$98K', volume: '$4.8M', followers: '2.1K' },
  { type: 'user', name: '@DeFiKing', avatar: `/avatars/${AVATAR_FILES[9]}.png`, winRate: '63.5%', pnl: '+$87K', volume: '$4.2M', followers: '1.8K' },
  { type: 'user', name: '@ChartMaster', avatar: `/avatars/${AVATAR_FILES[10]}.png`, winRate: '62.8%', pnl: '+$76K', volume: '$3.9M', followers: '1.5K' },
  { type: 'user', name: '@WhaleAlert', avatar: `/avatars/${AVATAR_FILES[11]}.png`, winRate: '61.3%', pnl: '+$65K', volume: '$3.5M', followers: '1.2K' },
];

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const spread = 0.8 + Math.random() * 0.4;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius * spread,
        y * radius * spread,
        Math.sin(theta) * r * radius * spread,
      ),
    );
  }
  return points;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  data: TooltipData | null;
}

export function ConstellationOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, data: null });
  const [expandedUser, setExpandedUser] = useState<UserProfile | null>(null);

  // Auto-dismiss expanded card after 4s, or on any click/tap anywhere
  useEffect(() => {
    if (!expandedUser) return;
    const close = () => setExpandedUser(null);
    const timer = setTimeout(close, 4000);
    // Delay attaching close listeners so the opening touch/click doesn't immediately close it
    const delayTimer = setTimeout(() => {
      document.addEventListener('click', close);
      document.addEventListener('touchstart', close);
    }, 300);
    return () => {
      clearTimeout(timer);
      clearTimeout(delayTimer);
      document.removeEventListener('click', close);
      document.removeEventListener('touchstart', close);
    };
  }, [expandedUser]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.3;

    // Generate points on a fibonacci sphere
    const points = fibonacciSphere(POINT_COUNT, SPHERE_RADIUS);

    // Pick special nodes
    const specialIndices = new Set<number>();
    while (specialIndices.size < SPECIAL_COUNT) {
      specialIndices.add(Math.floor(Math.random() * POINT_COUNT));
    }

    // Map special indices to tooltip data
    const specialIndexArray = Array.from(specialIndices);
    const dataMap = new Map<number, TooltipData>();
    specialIndexArray.forEach((idx, i) => {
      dataMap.set(idx, TOOLTIP_DATA[i % TOOLTIP_DATA.length]);
    });

    // Load exchange logo textures at high resolution via Image → Canvas
    const exchangeTextures: Record<string, THREE.Texture> = {};
    const texSize = 256;
    const loadSvgTexture = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = texSize;
          c.height = texSize;
          const ctx2 = c.getContext('2d')!;
          const scale = Math.min(texSize / img.width, texSize / img.height) * 0.8;
          const w = img.width * scale;
          const h = img.height * scale;
          ctx2.drawImage(img, (texSize - w) / 2, (texSize - h) / 2, w, h);
          const tex = new THREE.CanvasTexture(c);
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          exchangeTextures[url] = tex;
          resolve();
        };
        img.src = url;
      });
    };
    Promise.all([
      loadSvgTexture('/exchanges/binance.svg'),
      loadSvgTexture('/exchanges/okx.svg'),
      loadSvgTexture('/exchanges/bybit.svg'),
      loadSvgTexture('/exchanges/bitget.svg'),
    ]).then(() => {
      // Re-update sprite materials once textures are ready
      exchangeSprites.forEach((sprite) => {
        const data = dataMap.get(sprite.userData.index);
        if (data && data.type === 'exchange' && exchangeTextures[data.avatar]) {
          (sprite.material as THREE.SpriteMaterial).map = exchangeTextures[data.avatar];
          (sprite.material as THREE.SpriteMaterial).needsUpdate = true;
        }
      });
    });

    // Create node meshes
    const nodes: THREE.Mesh[] = [];
    const specialMeshes: THREE.Mesh[] = [];
    const exchangeSprites: THREE.Sprite[] = [];
    const group = new THREE.Group();

    points.forEach((point, i) => {
      const isSpecial = specialIndices.has(i);
      const data = dataMap.get(i);

      // Exchange nodes: use sprite with logo + dark bg circle
      if (isSpecial && data && data.type === 'exchange') {
        // Dark background sprite (renders behind logo but above lines)
        const bgCanvas = document.createElement('canvas');
        bgCanvas.width = 64;
        bgCanvas.height = 64;
        const ctx = bgCanvas.getContext('2d')!;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fill();
        const bgTex = new THREE.CanvasTexture(bgCanvas);
        const bgSpriteMat = new THREE.SpriteMaterial({ map: bgTex, transparent: true, depthTest: false });
        const bgSprite = new THREE.Sprite(bgSpriteMat);
        bgSprite.position.copy(point);
        bgSprite.scale.set(1.2, 1.2, 1.2);
        bgSprite.renderOrder = 1;
        group.add(bgSprite);

        // Logo sprite on top (texture assigned async after load)
        const spriteMat = new THREE.SpriteMaterial({ transparent: true, opacity: 1.0, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.copy(point);
        sprite.scale.set(0.75, 0.75, 0.75);
        sprite.renderOrder = 2;
        sprite.userData = { index: i, isSpecial: true, targetScale: 1, bgSprite, baseScale: 0.75, baseBgScale: 1.2 };
        group.add(sprite);
        // Use a hidden mesh for raycasting
        const hitGeo = new THREE.SphereGeometry(0.4, 8, 8);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.position.copy(point);
        hitMesh.userData = { index: i, isSpecial: true, targetScale: 1 };
        group.add(hitMesh);
        nodes.push(hitMesh);
        specialMeshes.push(hitMesh);
        exchangeSprites.push(sprite);
        return;
      }

      // User profile nodes: use avatar sprite with circular dark bg
      if (isSpecial && data && data.type === 'user') {
        // Dark circular background
        const bgCanvas = document.createElement('canvas');
        bgCanvas.width = 64;
        bgCanvas.height = 64;
        const ctxBg = bgCanvas.getContext('2d')!;
        ctxBg.beginPath();
        ctxBg.arc(32, 32, 32, 0, Math.PI * 2);
        ctxBg.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctxBg.fill();
        const bgTex = new THREE.CanvasTexture(bgCanvas);
        const bgSpriteMat = new THREE.SpriteMaterial({ map: bgTex, transparent: true, depthTest: false });
        const bgSprite = new THREE.Sprite(bgSpriteMat);
        bgSprite.position.copy(point);
        bgSprite.scale.set(0.35, 0.35, 0.35);
        bgSprite.renderOrder = 1;
        group.add(bgSprite);

        // Avatar sprite (loaded async)
        const avatarMat = new THREE.SpriteMaterial({ transparent: true, opacity: 1.0, depthTest: false });
        const avatarSprite = new THREE.Sprite(avatarMat);
        avatarSprite.position.copy(point);
        avatarSprite.scale.set(0.28, 0.28, 0.28);
        avatarSprite.renderOrder = 2;
        avatarSprite.userData = { index: i, isSpecial: true, targetScale: 1, bgSprite, baseScale: 0.28, baseBgScale: 0.35 };
        group.add(avatarSprite);

        // Load avatar image as circular texture
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const c = document.createElement('canvas');
          const sz = 128;
          c.width = sz;
          c.height = sz;
          const ctxA = c.getContext('2d')!;
          ctxA.beginPath();
          ctxA.arc(sz / 2, sz / 2, sz / 2, 0, Math.PI * 2);
          ctxA.clip();
          ctxA.drawImage(img, 0, 0, sz, sz);
          const tex = new THREE.CanvasTexture(c);
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          avatarMat.map = tex;
          avatarMat.needsUpdate = true;
        };
        img.src = data.avatar;

        // Hit mesh for raycasting
        const hitGeo = new THREE.SphereGeometry(0.4, 8, 8);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.position.copy(point);
        hitMesh.userData = { index: i, isSpecial: true, targetScale: 1 };
        group.add(hitMesh);
        nodes.push(hitMesh);
        specialMeshes.push(hitMesh);
        exchangeSprites.push(avatarSprite);
        return;
      }

      // Regular (non-special) nodes
      const size = 0.04;
      const geo = new THREE.SphereGeometry(size, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: NODE_COLOR,
        transparent: true,
        opacity: 0.6,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(point);
      mesh.userData = { index: i, isSpecial: false, targetScale: 1 };
      group.add(mesh);
      nodes.push(mesh);
    });

    // Create connections between nearby points
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const baseColor = new THREE.Color(LINE_COLOR);
    const specialColorObj = new THREE.Color(SPECIAL_COLOR);

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < CONNECTION_DISTANCE) {
          linePositions.push(points[i].x, points[i].y, points[i].z);
          linePositions.push(points[j].x, points[j].y, points[j].z);

          const bothSpecial = specialIndices.has(i) && specialIndices.has(j);
          const oneSpecial = specialIndices.has(i) || specialIndices.has(j);
          const color = bothSpecial
            ? specialColorObj
            : oneSpecial
              ? new THREE.Color().lerpColors(baseColor, specialColorObj, 0.3)
              : baseColor;

          lineColors.push(color.r, color.g, color.b);
          lineColors.push(color.r, color.g, color.b);
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // Add a subtle glow sphere
    const glowGeo = new THREE.SphereGeometry(SPHERE_RADIUS * 1.05, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: SPECIAL_COLOR,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    scene.add(group);

    // Invisible larger hit targets for touch/click on special nodes
    const hitMeshes: THREE.Mesh[] = [];
    specialMeshes.forEach((mesh) => {
      const hitGeo = new THREE.SphereGeometry(0.6, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(mesh.position);
      hitMesh.userData = mesh.userData;
      group.add(hitMesh);
      hitMeshes.push(hitMesh);
    });

    // Raycaster for hover/touch detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredNode: THREE.Mesh | null = null;
    let hoveredSprite: THREE.Sprite | null = null;
    const defaultAutoRotateSpeed = 0.6;
    // Map hit mesh index to exchange sprite
    const spriteByIndex = new Map<number, THREE.Sprite>();
    exchangeSprites.forEach((s) => spriteByIndex.set(s.userData.index, s));
    let tooltipTimeout: ReturnType<typeof setTimeout> | null = null;

    const clearHover = () => {
      if (hoveredNode) {
        hoveredNode.userData.targetScale = 1;
        hoveredNode = null;
      }
      if (hoveredSprite) {
        hoveredSprite.userData.targetScale = 1;
        hoveredSprite = null;
      }
      controls.autoRotateSpeed = defaultAutoRotateSpeed;
      renderer.domElement.style.cursor = 'grab';
      setTooltip(prev => ({ ...prev, visible: false }));
    };

    const handleHit = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hitMeshes);

      if (intersects.length > 0) {
        const hitTarget = intersects[0].object as THREE.Mesh;
        const idx = hitTarget.userData.index;
        const matchedNode = specialMeshes.find(m => m.userData.index === idx);
        if (matchedNode && hoveredNode !== matchedNode) {
          if (hoveredNode) hoveredNode.userData.targetScale = 1;
          if (hoveredSprite) hoveredSprite.userData.targetScale = 1;
          hoveredNode = matchedNode;
          hoveredNode.userData.targetScale = 2.5;
          // Scale up exchange sprite on hover
          const sprite = spriteByIndex.get(idx);
          if (sprite) {
            sprite.userData.targetScale = 1.8;
            hoveredSprite = sprite;
          } else {
            hoveredSprite = null;
          }
          controls.autoRotateSpeed = 0.15;
          renderer.domElement.style.cursor = 'pointer';
        }
        const data = dataMap.get(hitTarget.userData.index) || null;
        // User nodes: show expanded card directly, no small tooltip
        if (data && data.type === 'user') {
          setTooltip({ visible: false, x: 0, y: 0, data: null });
          setExpandedUser(data);
        } else {
          setTooltip({ visible: true, x: clientX - rect.left, y: clientY - rect.top, data });
        }
        return true;
      }
      return false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!handleHit(e.clientX, e.clientY)) {
        clearHover();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (handleHit(touch.clientX, touch.clientY)) {
        e.stopPropagation();
      }
    };

    const onTouchEnd = () => {
      // Don't auto-clear if expanded user card is showing
    };

    const onClick = () => {
      // Click on empty space — close expanded card
      setExpandedUser(null);
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseleave', clearHover);
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    renderer.domElement.addEventListener('touchend', onTouchEnd);
    renderer.domElement.addEventListener('click', onClick);

    // Animation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();

      const time = Date.now() * 0.001;
      nodes.forEach((node) => {
        if (node.userData.isSpecial) {
          const pulse = 1 + 0.3 * Math.sin(time * 1.5 + node.userData.index);
          const target = node.userData.targetScale * pulse;
          const current = node.scale.x;
          node.scale.setScalar(current + (target - current) * 0.15);
        }
      });
      // Sync all special sprites and bg
      exchangeSprites.forEach((sprite) => {
        const target = sprite.userData.targetScale || 1;
        const pulse = 1 + 0.1 * Math.sin(time * 1.2 + sprite.userData.index);
        const baseLogoSize = sprite.userData.baseScale || 0.75;
        const baseBgSize = sprite.userData.baseBgScale || 1.2;
        const logoBase = baseLogoSize * target * pulse;
        const currentLogo = sprite.scale.x;
        const logoScale = currentLogo + (logoBase - currentLogo) * 0.12;
        sprite.scale.set(logoScale, logoScale, logoScale);
        if (sprite.userData.bgSprite) {
          const bgBase = baseBgSize * target * pulse;
          const currentBg = sprite.userData.bgSprite.scale.x;
          const bgScale = currentBg + (bgBase - currentBg) * 0.12;
          sprite.userData.bgSprite.scale.set(bgScale, bgScale, bgScale);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseleave', clearHover);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      renderer.domElement.removeEventListener('click', onClick);
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      cancelAnimationFrame(animId);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[340px] w-[340px] sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px]"
      style={{ cursor: 'grab' }}
    >
      {/* Exchange Tooltip */}
      {tooltip.visible && tooltip.data && tooltip.data.type === 'exchange' && !expandedUser && (
        <div
          className="pointer-events-none absolute z-10 flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#1a1a1a]/95 px-3 py-2 backdrop-blur-sm"
          style={{
            left: tooltip.x,
            top: tooltip.y - 52,
            transform: 'translateX(-50%)',
          }}
        >
          <img
            src={tooltip.data.avatar}
            alt={tooltip.data.name}
            className="h-5 w-5 shrink-0 object-contain"
          />
          <div className="text-xs font-semibold text-white">{tooltip.data.name}</div>
        </div>
      )}

      {/* Expanded User Profile Card */}
      {expandedUser && (
        <div
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-xl border border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm"
          onClick={() => setExpandedUser(null)}
        >
          <button className="absolute right-2 top-2 text-white/30 transition-colors hover:text-white">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 1l8 8M9 1L1 9" /></svg>
          </button>
          <div className="flex items-center gap-3 p-3 pb-2 pr-7">
            <img
              src={expandedUser.avatar}
              alt={expandedUser.name}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 pr-2">
              <div className="whitespace-nowrap text-xs font-bold text-white">{expandedUser.name}</div>
              <div className="whitespace-nowrap text-xs font-semibold text-[#22c55e]">{expandedUser.pnl}</div>
            </div>
          </div>
          <div className="px-3 pb-3">
            <span className="block w-full rounded-lg bg-white/10 py-1.5 text-center text-[10px] font-medium text-white/70">
              View Profile &rsaquo;
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

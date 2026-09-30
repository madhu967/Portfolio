"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const IMAGES = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", 
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80", 
  "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", 
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", 
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", 
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80", 
  "https://images.unsplash.com/photo-1512413914488-842211623910?w=800&q=80",
  "https://images.unsplash.com/photo-1512413914488-842211623910?w=800&q=80", 
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80", 
  "https://images.unsplash.com/photo-1509631179647-0c1157beec08?w=800&q=80",
];

const CAPTIONS = [
  "EMBER", "AURELIA", "NOCTURNE", "GILDED", "INDIGO HOUR", "MONOCHROME",
  "STILL LIFE", "THE MUSE", "VERMILION", "ATELIER", "PORCELAIN", "AFTERGLOW",
];

const TEXT_DATA = [
  { title: "The Edition Vol. 01", desc: "A curated fashion folio exploring the boundaries of light, shadow, and editorial design. Leaf through the collection to discover a new visual narrative." },
  { title: "Ember & Aurelia", desc: "Contrasting warmth and golden hour hues create a striking visual dichotomy. The first chapter sets a dramatic tone." },
  { title: "Nocturne & Gilded", desc: "Deep shadows meet metallic accents. A study in luxury and the spaces where light refuses to go." },
  { title: "Indigo & Monochrome", desc: "Stripped of color, the focus shifts to pure form, texture, and silhouette against the fading twilight." },
  { title: "Still Life & The Muse", desc: "Capturing the quiet, stationary beauty of our subjects in suspended animation." },
  { title: "Vermilion & Atelier", desc: "A burst of vibrant reds and the raw, unfiltered behind-the-scenes energy of the creative studio." },
  { title: "Porcelain & Afterglow", desc: "The delicate conclusion. Soft, ethereal lighting leaves a lasting, fading impression on the senses." }
];

const PW = 2.0;            
const PH = 2.9;            
const NIMG = 12;
const SHEETS = NIMG / 2;   
const PAGE_Y = 0.012;      
const PER_SHEET = 0.011;   
const NX = 48;             
const NZ = 18;             
const BEND_MAX = 1.42;     
const LEAD = 0.22;         
const FLIP_MS = 980;       

export default function Pageflip() {
  const hostRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const isCard = new URLSearchParams(window.location.search).has("card");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── renderer ────────────────────────────────────────────────────────
    const canvas = document.createElement("canvas");
    canvas.className = "kpf-gl";
    host.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;

    const scene = new THREE.Scene();
    // scene.background is left null so the HTML background (#f4f1ea) shines through seamlessly.
    // This prevents tone-mapping from changing the background color and creating a visible seam.

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    // ── lights ──────────────────────────────────────────────────────────
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(-3.6, 8.2, 4.4);
    key.castShadow = true;
    key.shadow.mapSize.set(isCard ? 1024 : 2048, isCard ? 1024 : 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 26;
    const sc = key.shadow.camera;
    sc.left = -4.2; sc.right = 4.2; sc.top = 4.2; sc.bottom = -4.2;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.025;
    key.shadow.radius = 7;
    scene.add(key);

    const fill = new THREE.HemisphereLight(0xffffff, 0xc7bba3, 0.8);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.5);
    rim.position.set(4.5, 3.5, -5.5);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // ── ground: invisible plane that only catches shadows ───────────────
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.ShadowMaterial({ opacity: 0.15 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── page-texture baking ─────────────────────────────────────────────
    const TW = 760, TH = Math.round((760 * PH) / PW);
    const texCache = new Map();
    const imgs = new Array(NIMG).fill(null);

    function coverDraw(ctx, img, x, y, w, h) {
      const ir = img.width / img.height, cr = w / h;
      let dw, dh;
      if (ir > cr) { dh = h; dw = h * ir; } else { dw = w; dh = w / ir; }
      ctx.save();
      ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
      ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
      ctx.restore();
    }

    function bakePhoto(index, gutterRight) {
      const c = document.createElement("canvas");
      c.width = TW; c.height = TH;
      const ctx = c.getContext("2d");

      ctx.fillStyle = "#fcfbf9"; ctx.fillRect(0, 0, TW, TH);

      const m = Math.round(TW * 0.045);
      const px = m, py = m, pw = TW - m * 2, ph = TH - m * 2;
      const img = imgs[index];
      if (img) coverDraw(ctx, img, px, py, pw, ph);
      else { ctx.fillStyle = "#cfc7b8"; ctx.fillRect(px, py, pw, ph); }

      const vg = ctx.createRadialGradient(TW / 2, TH * 0.46, TH * 0.2, TW / 2, TH * 0.5, TH * 0.66);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.fillStyle = vg; ctx.fillRect(px, py, pw, ph);

      const sg = ctx.createLinearGradient(0, TH * 0.62, 0, TH);
      sg.addColorStop(0, "rgba(8,8,10,0)");
      sg.addColorStop(1, "rgba(8,8,10,0.62)");
      ctx.fillStyle = sg; ctx.fillRect(px, py, pw, ph);

      const tx = gutterRight ? px + pw * 0.07 : px + pw * 0.07;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      ctx.font = `600 ${Math.round(TW * 0.028)}px "DM Mono", monospace`;
      ctx.fillText(`№ ${String(index + 1).padStart(2, "0")} — EDITORIAL`, tx, TH - ph * 0.14);
      ctx.fillStyle = "#fbf7ef";
      ctx.font = `italic 500 ${Math.round(TW * 0.085)}px "Playfair Display", serif`;
      ctx.fillText(CAPTIONS[index] || "KEXSIO", tx, TH - ph * 0.055);

      ctx.fillStyle = "rgba(40,38,34,0.55)";
      ctx.font = `500 ${Math.round(TW * 0.022)}px "DM Mono", monospace`;
      ctx.textAlign = gutterRight ? "left" : "right";
      ctx.fillText("KEXSIO · THE EDITION", gutterRight ? m * 1.3 : TW - m * 1.3, m * 0.74);

      const gw = TW * 0.2;
      const gx = gutterRight ? TW - gw : 0;
      const gg = ctx.createLinearGradient(gutterRight ? TW : 0, 0, gutterRight ? TW - gw : gw, 0);
      gg.addColorStop(0, "rgba(0,0,0,0.30)");
      gg.addColorStop(0.5, "rgba(0,0,0,0.07)");
      gg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gg; ctx.fillRect(gx, 0, gw, TH);

      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      return t;
    }

    function bakeCover(gutterRight) {
      const c = document.createElement("canvas");
      c.width = TW; c.height = TH;
      const ctx = c.getContext("2d");
      const g = ctx.createLinearGradient(0, 0, 0, TH);
      g.addColorStop(0, "#2a1418"); g.addColorStop(1, "#15090c");
      ctx.fillStyle = g; ctx.fillRect(0, 0, TW, TH);
      ctx.textAlign = "center";
      ctx.fillStyle = "#e9c98c";
      ctx.font = `500 ${Math.round(TW * 0.018)}px "DM Mono", monospace`;
      ctx.fillText("THE EDITION · VOL. 01", TW / 2, TH * 0.2);
      ctx.fillStyle = "#f6efe2";
      ctx.font = `700 ${Math.round(TW * 0.17)}px "Playfair Display", serif`;
      ctx.fillText("KEXSIO", TW / 2, TH * 0.54);
      ctx.fillStyle = "rgba(233,201,140,0.8)";
      ctx.font = `italic 500 ${Math.round(TW * 0.04)}px "Playfair Display", serif`;
      ctx.fillText("a fashion folio", TW / 2, TH * 0.62);
      const gw = TW * 0.2, gx = gutterRight ? TW - gw : 0;
      const gg = ctx.createLinearGradient(gutterRight ? TW : 0, 0, gutterRight ? TW - gw : gw, 0);
      gg.addColorStop(0, "rgba(0,0,0,0.42)"); gg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gg; ctx.fillRect(gx, 0, gw, TH);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return t;
    }

    let coverFront = null; 
    let coverBack = null;  

    function texFor(index) {
      if (index < 0) return (coverFront ??= bakeCover(true));
      if (index >= NIMG) return (coverBack ??= bakeCover(false));
      const hit = texCache.get(index);
      if (hit) return hit;
      const t = bakePhoto(index, index % 2 === 1);
      texCache.set(index, t);
      return t;
    }

    // ── page geometry (shared rest grid) ────────────────────────────────
    function makeGrid(uMin, uMax) {
      const g = new THREE.BufferGeometry();
      const verts = (NX + 1) * (NZ + 1);
      const pos = new Float32Array(verts * 3);
      const uv = new Float32Array(verts * 2);
      for (let iz = 0; iz <= NZ; iz++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iz * (NX + 1) + ix;
          pos[k * 3] = (ix / NX) * PW;
          pos[k * 3 + 1] = 0;
          pos[k * 3 + 2] = -PH / 2 + (iz / NZ) * PH;
          uv[k * 2] = uMin + (uMax - uMin) * (ix / NX);
          uv[k * 2 + 1] = 1 - iz / NZ;
        }
      }
      const idx = [];
      for (let iz = 0; iz < NZ; iz++) {
        for (let ix = 0; ix < NX; ix++) {
          const a = iz * (NX + 1) + ix, b = a + 1, c = a + (NX + 1), d = c + 1;
          idx.push(a, c, b, b, c, d);
        }
      }
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
      g.setIndex(idx);
      g.computeVertexNormals();
      return g;
    }

    function makeFlatPage(side) {
      const g = makeGrid(0, 1);
      const p = g.attributes.position;
      const arr = p.array;
      for (let i = 0; i < arr.length; i += 3) {
        if (side === "left") arr[i] -= PW; 
        const frac = Math.abs(arr[i]) / PW;
        arr[i + 1] = PAGE_Y + Math.sin(frac * Math.PI) * 0.055;
      }
      p.needsUpdate = true;
      g.computeVertexNormals();
      const mat = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0 });
      const m = new THREE.Mesh(g, mat);
      m.castShadow = true; m.receiveShadow = true;
      return m;
    }

    const leftPage = makeFlatPage("left");
    const rightPage = makeFlatPage("right");
    scene.add(leftPage, rightPage);

    // ── the turning leaf (deformable, two-sided texture) ────────────────
    const flipGeo = makeGrid(0, 1);
    const restS = new Float32Array(NX + 1);
    const restZ = new Float32Array(NZ + 1);
    for (let ix = 0; ix <= NX; ix++) restS[ix] = (ix / NX) * PW;
    for (let iz = 0; iz <= NZ; iz++) restZ[iz] = -PH / 2 + (iz / NZ) * PH;

    const backMapU = { value: texFor(1) };
    const flipMat = new THREE.MeshStandardMaterial({
      map: texFor(0), roughness: 0.6, metalness: 0, side: THREE.DoubleSide,
    });
    flipMat.onBeforeCompile = (shader) => {
      shader.uniforms.backMap = backMapU;
      shader.fragmentShader = "uniform sampler2D backMap;\n" + shader.fragmentShader.replace(
        "#include <map_fragment>",
        `vec4 sampledDiffuseColor;
         if (gl_FrontFacing) sampledDiffuseColor = texture2D( map, vMapUv );
         else sampledDiffuseColor = texture2D( backMap, vec2(1.0 - vMapUv.x, vMapUv.y) );
         diffuseColor *= sampledDiffuseColor;`,
      );
    };
    const flipMesh = new THREE.Mesh(flipGeo, flipMat);
    flipMesh.castShadow = true; flipMesh.receiveShadow = true;
    flipMesh.visible = false;
    scene.add(flipMesh);

    function deformFlip(tv) {
      const theta = tv * Math.PI;
      const curl = Math.sin(tv * Math.PI);     
      const bend = curl * BEND_MAX;
      const lead = curl * LEAD;
      const bowFade = 1 - curl;                
      const pos = flipGeo.attributes.position;
      const arr = pos.array;
      const flat = bend < 1e-4;
      const rho = flat ? 0 : PW / bend;
      for (let iz = 0; iz <= NZ; iz++) {
        const zc = restZ[iz];
        const th = theta + lead * (zc / PH);
        const ct = Math.cos(th), st = Math.sin(th);
        for (let ix = 0; ix <= NX; ix++) {
          const s = restS[ix];
          let cx, cy;
          if (flat) { cx = s; cy = 0; }
          else { const a = (s / PW) * bend; cx = rho * Math.sin(a); cy = rho * (1 - Math.cos(a)); }
          const bow = Math.sin((s / PW) * Math.PI) * 0.055 * bowFade;
          const k = (iz * (NX + 1) + ix) * 3;
          arr[k] = cx * ct - cy * st;
          arr[k + 1] = cx * st + cy * ct + PAGE_Y + 0.006 + bow;
          arr[k + 2] = zc;
        }
      }
      pos.needsUpdate = true;
      flipGeo.computeVertexNormals();
    }

    function makeStack(side) {
      const mat = new THREE.MeshStandardMaterial({ color: 0xece5d6, roughness: 0.9, metalness: 0 });
      const g = new THREE.BoxGeometry(PW, 1, PH);
      const m = new THREE.Mesh(g, mat);
      m.castShadow = true; m.receiveShadow = true;
      m.position.x = side === "left" ? -PW / 2 : PW / 2;
      scene.add(m);
      return m;
    }
    const leftStack = makeStack("left");
    const rightStack = makeStack("right");
    const spine = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.06, PH),
      new THREE.MeshStandardMaterial({ color: 0x2a2622, roughness: 0.8 }),
    );
    scene.add(spine);

    function layoutStacks(open) {
      const lh = Math.max(0.02, open * PER_SHEET);
      const rh = Math.max(0.02, (SHEETS - open) * PER_SHEET);
      leftStack.scale.y = lh; leftStack.position.y = -lh / 2;
      rightStack.scale.y = rh; rightStack.position.y = -rh / 2;
      spine.position.y = 0.0;
    }

    let o = 0; // Start at 0 for cover
    let flip = null;

    function setStatics() {
      leftPage.material.map = texFor(2 * o - 1);
      rightPage.material.map = texFor(2 * o);
      leftPage.material.needsUpdate = true;
      rightPage.material.needsUpdate = true;
      layoutStacks(o);

      // Update React DOM Headings directly to avoid React state lag
      if (titleRef.current && descRef.current) {
        const textObj = TEXT_DATA[Math.min(o, TEXT_DATA.length - 1)];
        titleRef.current.style.opacity = 0;
        descRef.current.style.opacity = 0;
        setTimeout(() => {
          titleRef.current.innerText = textObj.title;
          descRef.current.innerText = textObj.desc;
          titleRef.current.style.opacity = 1;
          descRef.current.style.opacity = 1;
        }, 150);
      }
    }

    function beginFlip(dir, drag) {
      if (flip) return false;
      if (dir > 0 && o >= SHEETS) return false;
      if (dir < 0 && o <= 0) return false;
      const base = dir > 0 ? o : o - 1;
      leftPage.material.map = texFor(2 * base - 1);
      rightPage.material.map = texFor(2 * base + 2);
      leftPage.material.needsUpdate = true;
      rightPage.material.needsUpdate = true;
      flipMat.map = texFor(2 * base);
      backMapU.value = texFor(2 * base + 1);
      flipMat.needsUpdate = true;
      flipMesh.visible = true;
      const from = dir > 0 ? 0 : 1;
      const to = dir > 0 ? 1 : 0;
      flip = { base, from, to: drag ? to : to, tv: from, drag, t0: performance.now() };
      if (drag) flip.to = to;
      deformFlip(from);
      layoutStacks(base + from);
      return true;
    }

    function commitFlip(target) {
      if (!flip) return;
      o = flip.base + target;
      flip = null;
      flipMesh.visible = false;
      setStatics();
    }

    const easeInOut = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    const raycaster = new THREE.Raycaster();
    const deskPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -PAGE_Y);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    function surfaceX(cx, cy) {
      const rect = host.getBoundingClientRect();
      ndc.x = ((cx - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((cy - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(deskPlane, hit)) return null;
      return hit.x;
    }
    const xToTv = (x) => Math.acos(THREE.MathUtils.clamp(x / PW, -1, 1)) / Math.PI;

    let down = false, moved = false, downX = 0, downY = 0;
    const onDown = (e) => {
      if (flip) return;
      const x = surfaceX(e.clientX, e.clientY);
      if (x == null) return;
      down = true; moved = false; downX = e.clientX; downY = e.clientY;
      host.setPointerCapture?.(e.pointerId);
      const dir = x >= 0 ? 1 : -1;
      if (beginFlip(dir, true)) {
        flip.tv = xToTv(x);
        deformFlip(flip.tv);
        layoutStacks(flip.base + flip.tv);
      }
    };
    const onMoveP = (e) => {
      if (!down || !flip || !flip.drag) return;
      if (Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY) > 5) moved = true;
      const x = surfaceX(e.clientX, e.clientY);
      if (x == null) return;
      flip.tv = THREE.MathUtils.clamp(xToTv(x), 0, 1);
      deformFlip(flip.tv);
      layoutStacks(flip.base + flip.tv);
    };
    const onUp = (e) => {
      host.releasePointerCapture?.(e.pointerId);
      if (!down) return;
      down = false;
      if (!flip) return;
      if (!moved) {
        const target = flip.base === o ? 1 : 0; 
        startAuto(target);
      } else {
        startAuto(flip.tv > 0.5 ? 1 : 0);
      }
    };

    function startAuto(target) {
      if (!flip) return;
      flip.drag = false;
      flip.from = flip.tv;
      flip.to = target;
      flip.t0 = performance.now();
    }

    function autoFlip(dir) {
      if (flip) return;
      if (beginFlip(dir, false)) {
        flip.from = dir > 0 ? 0 : 1;
        flip.to = dir > 0 ? 1 : 0;
        flip.tv = flip.from;
        flip.t0 = performance.now();
      }
    }

    const onWheel = (e) => {
      // Completely disable scroll hijacking and wheel flipping on mobile devices.
      // Mobile users will natively scroll the page and tap/click to flip the book.
      if (window.innerWidth <= 960) return;

      const wrapper = host.closest('.kpf-wrapper');
      const rect = wrapper ? wrapper.getBoundingClientRect() : host.getBoundingClientRect();
      const inViewRatio = (Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top)) / rect.height;
      
      // Allow seamless exit: if we are at the end/beginning, let the browser scroll natively
      if (e.deltaY > 0 && o >= SHEETS) return; 
      if (e.deltaY < 0 && o <= 0) return;

      // When the book is mostly on screen, trap the scroll
      if (inViewRatio > 0.65) {
         e.preventDefault();

         // Instant snap to center. `behavior: 'auto'` eliminates the glitch/jerk 
         // caused by smooth-scrolling fighting against native trackpad momentum.
         if (Math.abs(rect.top) > 1) {
            window.scrollBy({ top: rect.top, behavior: 'auto' });
         }

         if (flip) return;

         if (e.deltaY > 4) autoFlip(1);
         else if (e.deltaY < -4) autoFlip(-1);
      }
    };

    if (!isCard && !reduced) {
      host.addEventListener("pointerdown", onDown);
      host.addEventListener("pointermove", onMoveP);
      window.addEventListener("pointerup", onUp);
      host.addEventListener("wheel", onWheel, { passive: false });
    }

    const camDir = new THREE.Vector3();
    function frame() {
      const isMobile = window.innerWidth <= 960;
      const w = host.clientWidth || (isMobile ? window.innerWidth : window.innerWidth / 2);
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      
      // On mobile, use a smaller bounding radius so the camera moves closer, making the book larger
      const radius = isMobile ? 2.5 : 2.95;
      const vFov = (camera.fov * Math.PI) / 180;
      let dist = radius / Math.sin(vFov / 2);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      dist = Math.max(dist, radius / Math.sin(hFov / 2));
      
      camDir.set(0.62 * Math.sin(0.34), 0.86, 0.62 * Math.cos(0.34)).normalize();
      camera.position.copy(camDir.multiplyScalar(dist));
      camera.lookAt(0, -0.05, 0);
      camera.updateProjectionMatrix();
    }
    frame();
    const ro = new ResizeObserver(frame);
    ro.observe(host);

    let ready = false;
    let loaded = 0;
    function refreshTextures() {
      for (const [i, t] of texCache) {
        const fresh = bakePhoto(i, i % 2 === 1);
        t.image = fresh.image;
        t.needsUpdate = true;
      }
      setStatics();
      backMapU.value = texFor(2 * Math.max(0, o - 1) + 1);
    }
    IMAGES.forEach((src, i) => {
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = () => {
        imgs[i] = im; loaded += 1;
        if (loaded === NIMG) { ready = true; refreshTextures(); }
      };
      im.onerror = () => { loaded += 1; if (loaded === NIMG) { ready = true; refreshTextures(); } };
      im.src = src;
    });

    setStatics();
    deformFlip(0);

    if (document.fonts && "load" in document.fonts) {
      Promise.all([
        document.fonts.load('italic 500 80px "Playfair Display"').catch(() => {}),
        document.fonts.load('500 30px "DM Mono"').catch(() => {}),
      ]).then(() => { if (ready) refreshTextures(); });
    }

    let cardDir = 1;
    let cardNext = performance.now() + 700;
    let raf = 0;

    function loop() {
      const now = performance.now();

      if (flip) {
        if (!flip.drag) {
          const p = THREE.MathUtils.clamp((now - flip.t0) / FLIP_MS, 0, 1);
          flip.tv = flip.from + (flip.to - flip.from) * easeInOut(p);
          deformFlip(flip.tv);
          layoutStacks(flip.base + flip.tv);
          if (p >= 1) commitFlip(flip.to);
        }
      } else if (isCard && now >= cardNext) {
        if (o >= SHEETS) cardDir = -1;
        else if (o <= 0) cardDir = 1;
        autoFlip(cardDir);
        cardNext = now + FLIP_MS + 620;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }

    if (reduced) {
      o = 1; setStatics(); deformFlip(0);
      const renderOnce = () => renderer.render(scene, camera);
      renderOnce();
      const id = window.setTimeout(renderOnce, 500);
      return () => {
        window.clearTimeout(id);
        ro.disconnect();
        renderer.dispose();
        canvas.remove();
      };
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onMoveP);
      window.removeEventListener("pointerup", onUp);
      host.removeEventListener("wheel", onWheel);
      renderer.dispose();
      flipGeo.dispose();
      flipMat.dispose();
      texCache.forEach((t) => t.dispose());
      if (coverFront) coverFront.dispose(); 
      if (coverBack) coverBack.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <section className="kpf-wrapper">
      <div className="kpf-text-side">
        <div className="kpf-text-content">
          <h4 className="kpf-kicker">KEXSIO FOLIO</h4>
          <h2 ref={titleRef} className="kpf-title">The Edition Vol. 01</h2>
          <p ref={descRef} className="kpf-desc">A curated fashion folio exploring the boundaries of light, shadow, and editorial design. Leaf through the collection to discover a new visual narrative.</p>
        </div>
      </div>
      <div className="kpf-book-side">
        <div ref={hostRef} className="kpf-stage">
          <div className="kpf-chrome">
            <span className="kpf-tl">Kexsio®</span>
            <span className="kpf-tr">Pageflip · Book</span>
            <span className="kpf-bl">Drag a corner · scroll · click to turn</span>
            <span className="kpf-br">Book / 01</span>
            
            {/* Mobile specific hint */}
            <span className="kpf-mobile-hint">Click book edges to flip pages</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Mono:wght@400;500&display=swap');
        
        .kpf-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #ffffff;
          display: flex;
          z-index: 50;
        }

        .kpf-text-side {
          width: 45%;
          flex: none;
          display: flex;
          align-items: center;
          padding: 5rem 0 5rem 8rem;
          box-sizing: border-box;
        }

        .kpf-text-content {
          max-width: 460px;
          min-height: 250px; /* Pre-allocate height so text changes don't shift vertical layout */
        }

        .kpf-kicker {
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ea580c;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .kpf-title {
          font-family: 'Spectral', serif;
          font-size: clamp(3rem, 5vw, 4.5rem);
          font-weight: 300;
          color: #171717;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 1.5rem;
          transition: opacity 0.3s ease;
        }

        .kpf-desc {
          font-family: 'Space Mono', monospace;
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(23, 23, 23, 0.7);
          transition: opacity 0.3s ease;
        }

        .kpf-book-side {
          width: 55%;
          flex: none;
          position: relative;
        }

        .kpf-stage {
          position: absolute; inset: 0; overflow: hidden;
          background: transparent; cursor: grab;
          font-family: "DM Mono", monospace; touch-action: none;
        }
        .kpf-stage:active { cursor: grabbing; }
        .kpf-gl { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        
        .kpf-chrome {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          color: #171717; mix-blend-mode: normal;
          text-transform: uppercase; letter-spacing: 0.16em;
          opacity: 0.5;
        }
        .kpf-chrome span { position: absolute; font-size: 11px; font-weight: 500; white-space: nowrap; }
        .kpf-tl { top: 26px; left: 30px; font-weight: 700; letter-spacing: 0.04em; opacity: 0; }
        .kpf-tr { top: 26px; right: 30px; }
        .kpf-bl { bottom: 26px; left: 30px; opacity: 0; }
        .kpf-br { bottom: 26px; right: 30px; }
        
        .kpf-mobile-hint { display: none; }

        @media (max-width: 960px) {
          .kpf-wrapper {
            display: flex;
            flex-direction: column;
          }
          .kpf-text-side {
            width: 100%;
            height: 35%;
            flex: none;
            position: relative;
            padding: 3rem 1.5rem 1rem;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }
          .kpf-text-content {
            max-width: 100%;
            text-align: center;
            min-height: auto;
          }
          .kpf-kicker {
            margin-bottom: 0.5rem;
          }
          .kpf-title {
            font-size: 2.2rem;
            margin-bottom: 0.5rem;
            text-shadow: none;
          }
          .kpf-desc {
            font-size: 0.95rem;
            text-shadow: none;
          }
          .kpf-book-side {
            width: 100%;
            height: 65%;
            flex: none;
            position: relative;
          }
          
          /* Hide desktop chrome texts on mobile */
          .kpf-tl, .kpf-tr, .kpf-bl, .kpf-br { display: none !important; }
          
          /* Show specific mobile instruction */
          .kpf-mobile-hint {
            display: block;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px !important;
            opacity: 0.7;
            letter-spacing: 0.15em;
          }
        }
      `}</style>
    </section>
  );
}

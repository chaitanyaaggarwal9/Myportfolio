import * as THREE from "three";

const CANVAS_ID = "signal-canvas";
const HERO_ID = "hero";
const ZONE_END_ID = "trajectory";

const VERTEX_SHADER = `
  attribute vec3 aEnd;
  attribute float aSeed;
  uniform float uMorph;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  varying float vSeed;

  void main() {
    vSeed = aSeed;

    float spin = uTime * 0.5 * (1.0 - uMorph);
    float ca = cos(spin);
    float sa = sin(spin);
    vec3 spun = vec3(
      position.x * ca - position.y * sa,
      position.x * sa + position.y * ca,
      position.z
    );

    float bobT = uTime * 0.3 + aSeed * 6.2831;
    vec3 bob = aEnd + vec3(
      sin(bobT) * 0.05,
      cos(bobT * 1.3) * 0.05,
      sin(bobT * 0.7) * 0.05
    ) * uMorph;

    vec3 pos = mix(spun, bob, uMorph);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float atten = clamp(300.0 / -mvPosition.z, 0.4, 3.0);
    gl_PointSize = uSize * uPixelRatio * atten * (0.7 + aSeed * 0.6);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uMorph;
  uniform vec3 uColorTurbine;
  uniform vec3 uColorNeural;
  uniform vec3 uColorAccent;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d) * 0.5;
    if (alpha <= 0.001) discard;

    vec3 color = mix(uColorTurbine, uColorNeural, uMorph);
    color = mix(color, uColorAccent, smoothstep(0.6, 1.0, vSeed) * uMorph * 0.6);

    gl_FragColor = vec4(color, alpha);
  }
`;

function deviceTier() {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 700;
  const weakCpu = (navigator.hardwareConcurrency || 4) <= 4;
  const lowPower = (coarse && small) || weakCpu;
  return {
    count: lowPower ? 1400 : 4200,
    edgesEnabled: !lowPower,
    dprCap: lowPower ? 1.5 : 2,
  };
}

function generateTurbine(count) {
  const positions = new Float32Array(count * 3);
  const hubEnd = Math.floor(count * 0.15);
  const bladeEnd = hubEnd + Math.floor(count * 0.65);
  const bladeCount = 12;
  const hubRadius = 0.4;
  const outerRadius = 2.6;

  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let z = 0;

    if (i < hubEnd) {
      const angle = Math.random() * Math.PI * 2;
      const r = hubRadius * (0.5 + Math.random() * 0.5);
      x = Math.cos(angle) * r;
      y = Math.sin(angle) * r;
      z = (Math.random() - 0.5) * 1.4;
    } else if (i < bladeEnd) {
      const b = Math.floor(Math.random() * bladeCount);
      const row = Math.random() < 0.5 ? 0.35 : -0.35;
      const t = Math.sqrt(Math.random());
      const c = (Math.random() - 0.5) * 2;
      const baseAngle = (b / bladeCount) * Math.PI * 2 + (row > 0 ? 0 : Math.PI / bladeCount);
      const twist = t * 1.1;
      const angle = baseAngle + twist + c * 0.06;
      const radius = hubRadius + t * (outerRadius - hubRadius);
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius;
      z = row + c * 0.22 + t * 0.12;
    } else {
      const angle = Math.random() * Math.PI * 2;
      const tubeAngle = Math.random() * Math.PI * 2;
      const majorRadius = outerRadius + 0.18;
      const tubeRadius = 0.14;
      const rr = majorRadius + tubeRadius * Math.cos(tubeAngle);
      x = rr * Math.cos(angle);
      y = rr * Math.sin(angle);
      z = tubeRadius * Math.sin(tubeAngle);
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  return positions;
}

function generateNeural(count) {
  const positions = new Float32Array(count * 3);
  const layerOf = new Int32Array(count);
  const layerCount = 5;
  const layerZ = (l) => -2.2 + (4.4 * l) / (layerCount - 1);
  const layerRadius = [0.7, 1.5, 1.7, 1.4, 0.6];

  for (let i = 0; i < count; i++) {
    const l = Math.min(layerCount - 1, Math.floor((i / count) * layerCount));
    layerOf[i] = l;
    const r = layerRadius[l] * Math.sqrt(Math.random());
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = layerZ(l) + (Math.random() - 0.5) * 0.25;
  }

  return { positions, layerOf, layerCount };
}

function buildEdges(neuralPositions, layerOf, layerCount, edgesPerNode) {
  const byLayer = Array.from({ length: layerCount }, () => []);
  for (let i = 0; i < layerOf.length; i++) byLayer[layerOf[i]].push(i);

  const verts = [];
  for (let l = 0; l < layerCount - 1; l++) {
    const from = byLayer[l];
    const to = byLayer[l + 1];
    if (!to.length) continue;
    for (const fromIdx of from) {
      for (let k = 0; k < edgesPerNode; k++) {
        const toIdx = to[Math.floor(Math.random() * to.length)];
        verts.push(
          neuralPositions[fromIdx * 3], neuralPositions[fromIdx * 3 + 1], neuralPositions[fromIdx * 3 + 2],
          neuralPositions[toIdx * 3], neuralPositions[toIdx * 3 + 1], neuralPositions[toIdx * 3 + 2]
        );
      }
    }
  }
  return new Float32Array(verts);
}

function initFallback2D(canvas) {
  const ctx = canvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles.length = 0;
    const count = Math.min(90, Math.floor((width * height) / 17000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(73, 215, 255, 0.55)";
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

function init() {
  const canvas = document.getElementById(CANVAS_ID);
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  } catch (err) {
    initFallback2D(canvas);
    return;
  }
  if (!renderer) {
    initFallback2D(canvas);
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tier = deviceTier();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8.5);

  const turbinePositions = generateTurbine(tier.count);
  const { positions: neuralPositions, layerOf, layerCount } = generateNeural(tier.count);
  const seeds = new Float32Array(tier.count);
  for (let i = 0; i < tier.count; i++) seeds[i] = Math.random();

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(turbinePositions, 3));
  geometry.setAttribute("aEnd", new THREE.BufferAttribute(neuralPositions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, tier.dprCap) },
      uSize: { value: 4.4 },
      uColorTurbine: { value: new THREE.Color("#ff7a3d") },
      uColorNeural: { value: new THREE.Color("#49d7ff") },
      uColorAccent: { value: new THREE.Color("#50f2a8") },
    },
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let edgesMaterial = null;
  if (tier.edgesEnabled) {
    const edgeVerts = buildEdges(neuralPositions, layerOf, layerCount, 2);
    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute("position", new THREE.BufferAttribute(edgeVerts, 3));
    edgesMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#49d7ff"),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgeGeometry, edgesMaterial);
    scene.add(edges);
  }

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, tier.dprCap));
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, tier.dprCap);
  }

  let zoneEnd = 1;
  function measureZone() {
    const zoneEl = document.getElementById(ZONE_END_ID);
    const bottom = zoneEl ? zoneEl.offsetTop + zoneEl.offsetHeight : document.body.scrollHeight * 0.6;
    zoneEnd = Math.max(bottom - window.innerHeight * 0.5, window.innerHeight);
  }

  function scrollProgress() {
    if (reducedMotion) return 0.35;
    const raw = Math.min(Math.max(window.scrollY / zoneEnd, 0), 1);
    return raw * raw * (3 - 2 * raw);
  }

  let currentMorph = 0;
  let running = true;
  let clockStart = performance.now();

  function animate(now) {
    if (!running) return;
    requestAnimationFrame(animate);

    const t = reducedMotion ? 0 : (now - clockStart) / 1000;
    const target = scrollProgress();
    currentMorph += (target - currentMorph) * 0.06;

    material.uniforms.uTime.value = t;
    material.uniforms.uMorph.value = currentMorph;

    if (edgesMaterial) {
      edgesMaterial.opacity = Math.max(0, (currentMorph - 0.55) / 0.45) * 0.5;
    }

    if (!reducedMotion) {
      const orbitAngle = currentMorph * 1.1 + Math.sin(t * 0.06) * 0.12;
      const orbitRadius = 9 - currentMorph * 1.6;
      camera.position.x = Math.sin(orbitAngle) * orbitRadius;
      camera.position.z = Math.cos(orbitAngle) * orbitRadius;
      camera.position.y = currentMorph * 1.4 + Math.sin(t * 0.05) * 0.15;
    }
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", () => {
    resize();
    measureZone();
  });
  window.addEventListener("scroll", () => {}, { passive: true });
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(animate);
  });

  resize();
  measureZone();
  requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", init);

// ===== SECTION LOADER =====
async function loadSection(id, file) {
  try {
    const res = await fetch(`sections/${file}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch(e) {
    console.warn(`Could not load ${file}`, e);
  }
}

async function loadAllSections() {
  await Promise.all([
    loadSection('section-hero', 'hero.html'),
    loadSection('section-advantage', 'advantage.html'),
    loadSection('section-cases', 'cases.html'),
    loadSection('section-skills', 'skills.html'),
    loadSection('section-chat', 'contact.html'),
  ]);
  initAll();
}

// ===== CUSTOM CURSOR =====
function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
  function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(animRing); }
  animRing();
  document.querySelectorAll('a,button,.card,.chip,.cert-card,.case-card').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.style.width = '14px'; dot.style.height = '14px'; ring.style.width = '48px'; ring.style.height = '48px'; ring.style.opacity = '0.2'; });
    el.addEventListener('mouseleave', () => { dot.style.width = '8px'; dot.style.height = '8px'; ring.style.width = '32px'; ring.style.height = '32px'; ring.style.opacity = '0.5'; });
  });
}

// ===== TYPEWRITER =====
function initTypewriter() {
  const el = document.getElementById('typed-roles');
  if (!el) return;
  const roles = ['Product Manager.', 'AI/LLM Specialist.', '0→1 Builder.', 'Team Leader.', 'Founder.'];
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  setTimeout(type, 1600);
}

// ===== COUNT UP =====
function animateCountUp(el) {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const isDecimal = String(target).includes('.');
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
  }, duration / steps);
}

function initCountUp() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCountUp(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-countup]').forEach(el => observer.observe(el));
}

// ===== SCROLL REVEALS =====
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== JOURNEY LINE =====
function initJourneyLine() {
  const line = document.getElementById('journey-line');
  if (!line) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { line.style.width = '80%'; observer.unobserve(entry.target); }
    });
  }, { threshold: 0.3 });
  observer.observe(line.parentElement);
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(scrolled, 100) + '%';
  });
}

// ===== NAV SCROLL =====
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ===== FLOATING PILL =====
function initPill() {
  const pill = document.getElementById('open-pill');
  if (!pill) return;
  setTimeout(() => pill.classList.add('show'), 2500);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) pill.classList.add('show');
  });
}

// ===== SCENARIO TOGGLE =====
function toggleScenario(card) {
  const answer = card.querySelector('.scenario-answer');
  const cta = card.querySelector('div:last-child');
  if (!answer) return;
  const isOpen = answer.style.display !== 'none';
  answer.style.display = isOpen ? 'none' : 'block';
  if (cta) cta.textContent = isOpen ? 'Click to see my answer →' : 'Close ↑';
  card.style.background = isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(230,57,70,0.08)';
}

// ===== PAGE LOADER =====
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 600);
  }, 1300);
}

// ===== CERT CARD HOVER =====
function initCertCards() {
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--red)';
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = 'var(--shadow-md)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--cream-border)';
      card.style.transform = 'none';
      card.style.boxShadow = 'none';
    });
  });
}

// ===== CASE CARD HOVER =====
function initCaseCards() {
  document.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('mouseenter', () => { card.style.boxShadow = 'var(--shadow-lg)'; card.style.transform = 'translateY(-2px)'; });
    card.addEventListener('mouseleave', () => { card.style.boxShadow = 'var(--shadow-sm)'; card.style.transform = 'none'; });
  });
}

// ===== INIT ALL =====
function initAll() {
  initCursor();
  initTypewriter();
  initCountUp();
  initReveal();
  initJourneyLine();
  initScrollProgress();
  initNav();
  initPill();
  initCertCards();
  initCaseCards();
  initLoader();
}

// Start
document.addEventListener('DOMContentLoaded', loadAllSections);

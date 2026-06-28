/* ══════════════════════════════════════════
   JARVIS AI — script.js
══════════════════════════════════════════ */

'use strict';

/* ── AOS INIT ─────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  initCursor();
  initNavbar();
  initScrollProgress();
  initTypewriter();
  initParticleCanvas();
  initFeatCards3D();
  initStatsCounter();
  initGallery();
  initFAQ();
  initBackToTop();
});

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  if (!cursor || !trail) return;

  let mx = -100, my = -100;
  let tx = -100, ty = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smooth trail
  (function animateTrail() {
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animateTrail);
  })();

  // Scale on hover of interactive elements
  const hoverEls = document.querySelectorAll('a, button, .feat-card, .gallery-item, .faq-q');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      cursor.style.opacity   = '0.5';
      trail.style.transform  = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.opacity   = '1';
      trail.style.transform  = 'translate(-50%,-50%) scale(1)';
    });
  });
}

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ══════════════════════════════════════
   SCROLL PROGRESS
══════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const doc  = document.documentElement;
    const pct  = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ══════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Voice Controlled.',
    'AI Chat Powered.',
    'Desktop Automation.',
    'Image Generation.',
    'Browser Automation.',
    'Real-Time Search.',
    'WhatsApp Control.',
    'Windows Native.',
  ];

  let i = 0, j = 0, deleting = false;
  const SPEED_TYPE = 65, SPEED_DEL = 30, PAUSE = 1800;

  function tick() {
    const phrase = phrases[i % phrases.length];
    if (deleting) {
      el.textContent = phrase.substring(0, j--);
      if (j < 0) { deleting = false; i++; setTimeout(tick, 400); return; }
      setTimeout(tick, SPEED_DEL);
    } else {
      el.textContent = phrase.substring(0, j++);
      if (j > phrase.length) { deleting = true; setTimeout(tick, PAUSE); return; }
      setTimeout(tick, SPEED_TYPE);
    }
  }
  setTimeout(tick, 800);
}

/* ══════════════════════════════════════
   PARTICLE / GRID CANVAS BACKGROUND
══════════════════════════════════════ */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const N = 80;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  // Particles
  for (let k = 0; k < N; k++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .3,
      a: Math.random() * .6 + .2,
    });
  }

  function drawGrid() {
    const step = 80;
    ctx.strokeStyle = 'rgba(0,212,255,0.025)';
    ctx.lineWidth = .5;
    for (let x = 0; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  function drawMouseGlow() {
    const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
    grd.addColorStop(0, 'rgba(0,212,255,0.05)');
    grd.addColorStop(1, 'rgba(0,212,255,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawMouseGlow();

    // Draw connections & particles
    for (let a = 0; a < particles.length; a++) {
      const p = particles[a];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.a})`;
      ctx.fill();

      for (let b = a + 1; b < particles.length; b++) {
        const q = particles[b];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${.07 * (1 - dist/120)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  }
  loop();
}

/* ══════════════════════════════════════
   FEATURE CARD 3D TILT
══════════════════════════════════════ */
function initFeatCards3D() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) / (r.width  / 2);
      const dy  = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `translateY(-5px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ══════════════════════════════════════
   STATS COUNTER
══════════════════════════════════════ */
function initStatsCounter() {
  const items = document.querySelectorAll('.stat-num[data-target]');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const text   = el.dataset.text;
      if (text) { el.textContent = text; observer.unobserve(el); return; }
      if (!target) { observer.unobserve(el); return; }

      let start = 0;
      const step = Math.ceil(target / 60);
      const id = setInterval(() => {
        start += step;
        if (start >= target) { el.textContent = target; clearInterval(id); }
        else { el.textContent = start; }
      }, 24);
      observer.unobserve(el);
    });
  }, { threshold: .5 });

  items.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════
   GALLERY — auto-load screenshots
══════════════════════════════════════ */
function initGallery() {
  const grid    = document.getElementById('gallery-grid');
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  if (!grid) return;

  /*
   * GitHub Pages cannot directory-list /assets/screenshots/, so we use
   * a predefined list. Edit SCREENSHOTS below to add your images:
   * just drop files into assets/screenshots/ AND add the filenames here.
   *
   * If you want fully automatic detection, you'll need a build step or
   * a screenshots.json manifest — both require no backend, just a
   * one-time file list update.
   */
  const SCREENSHOTS = [
    // Add your screenshot filenames here, e.g.:
    // 'assets/screenshots/home.png',
    // 'assets/screenshots/voice.png',
    // 'assets/screenshots/chat.png',
  ];

  if (SCREENSHOTS.length === 0) {
    // Keep placeholder
    return;
  }

  // Remove placeholder
  grid.innerHTML = '';

  SCREENSHOTS.forEach((src, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-aos', 'zoom-in');
    item.setAttribute('data-aos-delay', String(i * 60));

    const img = document.createElement('img');
    img.src     = src;
    img.alt     = `Screenshot ${i + 1}`;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'gallery-item-overlay';
    overlay.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';

    item.appendChild(img);
    item.appendChild(overlay);
    grid.appendChild(item);

    item.addEventListener('click', () => {
      lbImg.src = src;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lbClose?.addEventListener('click', closeLB);
  lb?.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

  function closeLB() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ══════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════ */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling?.classList.remove('open');
      });
      // Open clicked (unless it was already open)
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling?.classList.add('open');
      }
    });
  });
}

/* ══════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════
   RIPPLE EFFECT ON PRIMARY BUTTONS
══════════════════════════════════════ */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect  = this.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      width:6px;height:6px;
      border-radius:50%;
      background:rgba(255,255,255,0.5);
      left:${x}px;top:${y}px;
      transform:translate(-50%,-50%) scale(0);
      animation:ripple-anim .6s ease-out forwards;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = `
@keyframes ripple-anim {
  to { transform: translate(-50%,-50%) scale(50); opacity: 0; }
}`;
document.head.appendChild(style);

/* ══════════════════════════════════════
   SMOOTH SECTION REVEAL via IntersectionObserver
   (supplements AOS for non-AOS elements)
══════════════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(s => {
  revealObs.observe(s);
});

/* ══════════════════════════════════════
   NAVBAR ACTIVE LINK TRACKING
══════════════════════════════════════ */
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => {
        l.style.color = '';
        if (l.getAttribute('href') === '#' + e.target.id) {
          l.style.color = 'var(--cyan)';
        }
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
})();

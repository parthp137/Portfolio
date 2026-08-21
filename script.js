// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
  body.classList.add('light-theme');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  
  // Update icon
  if (body.classList.contains('light-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

// ============================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================
const animated = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  animated.forEach(el => observer.observe(el));
} else {
  // Fallback for older browsers
  const reveal = () => {
    animated.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('show');
      }
    });
  };
  window.addEventListener('scroll', reveal);
  reveal();
}

// Active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let currentId = '';
  const scrollY = window.scrollY;

  sections.forEach(sec => {
    const offsetTop = sec.offsetTop - 220; // adjust for navbar
    if (scrollY >= offsetTop) {
      currentId = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const hrefId = link.getAttribute('href').slice(1);
    if (hrefId === currentId) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    const offset = 80;
    const top = targetEl.offsetTop - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================
// TOAST NOTIFICATION & CONTACT FORM
// ============================================
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
  toast.classList.add('show-toast');
  setTimeout(() => {
    toast.classList.remove('show-toast');
  }, 3500);
}

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Message sent! Thank you for reaching out.');
    form.reset();
  });
}

// ============================================
// BACK TO TOP
// ============================================
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// DYNAMIC FOOTER YEAR
// ============================================
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============================================
// ELASTIC JELLY & MAGNETIC CURSOR
// ============================================
function initElasticCursor() {
  // Only enable on desktop/mouse devices
  if (window.matchMedia('(max-width: 768px)').matches || !window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  const jellyEl = document.getElementById('jelly-cursor');
  const dotEl = document.getElementById('dot-cursor');
  if (!jellyEl || !dotEl || typeof gsap === 'undefined') return;

  document.body.classList.add('has-custom-cursor');

  const CURSOR_DIAMETER = 50;
  const WRAP_PADDING = 8;
  const WRAP_RADIUS = 12;
  const WRAP_EASE = 0.2;
  const TARGET_PULL = 0.35;
  const TARGET_EASE = 0.25;
  const TARGET_MAX_PULL = 12;
  const CURSOR_PARALLAX = 0.12;
  const CURSOR_MAX_LEAD = 10;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const getScale = (dx, dy) => Math.min(Math.sqrt(dx * dx + dy * dy) / 735, 0.35);
  const getAngle = (dx, dy) => (Math.atan2(dy, dx) * 180) / Math.PI;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const vel = { x: 0, y: 0 };
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const jelly = {
    x: pos.x,
    y: pos.y,
    w: CURSOR_DIAMETER,
    h: CURSOR_DIAMETER,
    r: CURSOR_DIAMETER / 2,
    sx: 1,
    sy: 1
  };
  const active = { el: null, base: null, offX: 0, offY: 0 };
  let cursorMoved = false;
  let isHidden = false;

  gsap.set([jellyEl, dotEl], { xPercent: -50, yPercent: -50 });
  const setX = gsap.quickSetter(jellyEl, 'x', 'px');
  const setY = gsap.quickSetter(jellyEl, 'y', 'px');
  const setR = gsap.quickSetter(jellyEl, 'rotate', 'deg');
  const setSX = gsap.quickSetter(jellyEl, 'scaleX');
  const setSY = gsap.quickSetter(jellyEl, 'scaleY');
  const setW = gsap.quickSetter(jellyEl, 'width', 'px');
  const setH = gsap.quickSetter(jellyEl, 'height', 'px');
  const setRadius = gsap.quickSetter(jellyEl, 'borderRadius', 'px');
  const setOpacity = gsap.quickSetter(jellyEl, 'opacity');
  const setDotX = gsap.quickSetter(dotEl, 'x', 'px');
  const setDotY = gsap.quickSetter(dotEl, 'y', 'px');
  const setDotOpacity = gsap.quickSetter(dotEl, 'opacity');

  function measure(el) {
    const r = el.getBoundingClientRect();
    return {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2
    };
  }

  function render() {
    setDotX(pointer.x);
    setDotY(pointer.y);

    const el = active.el;
    if (el && active.base) {
      // Magnetic pull effect on element
      const b = active.base;
      const pullX = clamp((pointer.x - b.cx) * TARGET_PULL, -TARGET_MAX_PULL, TARGET_MAX_PULL);
      const pullY = clamp((pointer.y - b.cy) * TARGET_PULL, -TARGET_MAX_PULL, TARGET_MAX_PULL);
      active.offX = lerp(active.offX, pullX, TARGET_EASE);
      active.offY = lerp(active.offY, pullY, TARGET_EASE);
      gsap.set(el, { x: active.offX, y: active.offY });

      // Cursor snaps to hug the target
      const leadX = clamp((pointer.x - b.cx) * CURSOR_PARALLAX, -CURSOR_MAX_LEAD, CURSOR_MAX_LEAD);
      const leadY = clamp((pointer.y - b.cy) * CURSOR_PARALLAX, -CURSOR_MAX_LEAD, CURSOR_MAX_LEAD);
      const tx = b.cx + active.offX + leadX;
      const ty = b.cy + active.offY + leadY;

      jelly.x = lerp(jelly.x, tx, WRAP_EASE);
      jelly.y = lerp(jelly.y, ty, WRAP_EASE);
      jelly.w = lerp(jelly.w, b.width + WRAP_PADDING * 2, WRAP_EASE);
      jelly.h = lerp(jelly.h, b.height + WRAP_PADDING * 2, WRAP_EASE);
      jelly.r = lerp(jelly.r, WRAP_RADIUS, WRAP_EASE);
      jelly.sx = lerp(jelly.sx, 1, 0.3);
      jelly.sy = lerp(jelly.sy, 1, 0.3);

      setX(jelly.x);
      setY(jelly.y);
      setW(jelly.w);
      setH(jelly.h);
      setRadius(jelly.r);
      setSX(jelly.sx);
      setSY(jelly.sy);
      setR(0);
      setOpacity(isHidden ? 0 : 1);
      setDotOpacity(0); // Hide dot while wrapped
    } else {
      // Free-roam jelly physics
      const rotation = getAngle(vel.x, vel.y);
      const scale = getScale(vel.x, vel.y);

      jelly.x = pos.x;
      jelly.y = pos.y;
      jelly.w = lerp(jelly.w, CURSOR_DIAMETER + scale * 300, 0.4);
      jelly.h = lerp(jelly.h, CURSOR_DIAMETER, 0.4);
      jelly.r = lerp(jelly.r, CURSOR_DIAMETER / 2, 0.4);
      jelly.sx = 1 + scale;
      jelly.sy = 1 - scale * 2;

      setX(pos.x);
      setY(pos.y);
      setW(jelly.w);
      setH(jelly.h);
      setRadius(jelly.r);
      setR(rotation);
      setSX(jelly.sx);
      setSY(jelly.sy);
      setOpacity(isHidden ? 0 : 1);
      setDotOpacity(isHidden ? 0 : 1);
    }
  }

  window.addEventListener('mousemove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;

    if (!cursorMoved) {
      cursorMoved = true;
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.ticker.add(render);
    }

    gsap.to(pos, {
      x: e.clientX,
      y: e.clientY,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
      onUpdate: () => {
        vel.x = (e.clientX - pos.x) * 1.2;
        vel.y = (e.clientY - pos.y) * 1.2;
      }
    });

    const hide = !!e.target?.closest?.('[data-no-custom-cursor="true"]');
    isHidden = hide;
  });

  const acquire = (el) => {
    gsap.killTweensOf(el);
    active.el = el;
    active.base = measure(el);
    active.offX = 0;
    active.offY = 0;
    jelly.x = pos.x;
    jelly.y = pos.y;
    el.style.willChange = 'transform';
  };

  const release = () => {
    const el = active.el;
    if (el) {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.35)',
        clearProps: 'transform',
        onComplete: () => {
          el.style.willChange = '';
        }
      });
    }
    active.el = null;
    active.base = null;
    active.offX = 0;
    active.offY = 0;
  };

  document.addEventListener('pointerover', (e) => {
    const target = e.target;
    if (target?.closest?.('[data-no-custom-cursor="true"]')) {
      if (active.el) release();
      return;
    }
    const t = target?.closest?.('a, button, .cursor-can-hover, .theme-toggle, .social-icon, .btn');
    if (t === active.el) return;
    if (active.el) release();
    if (t) acquire(t);
  });

  const onLeave = () => { if (active.el) release(); isHidden = true; };
  const onEnter = () => { isHidden = false; };

  document.addEventListener('mouseleave', onLeave);
  document.addEventListener('mouseenter', onEnter);
  window.addEventListener('blur', onLeave);

  window.addEventListener('scroll', () => {
    if (!active.el || !active.base) return;
    const r = active.el.getBoundingClientRect();
    active.base.left = r.left - active.offX;
    active.base.top = r.top - active.offY;
    active.base.width = r.width;
    active.base.height = r.height;
    active.base.cx = active.base.left + r.width / 2;
    active.base.cy = active.base.top + r.height / 2;
  }, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initElasticCursor);
} else {
  initElasticCursor();
}


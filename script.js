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
// GITHUB ACTIVITY HEATMAP
// ============================================
async function initGitHubActivity() {
  const gridContainer = document.getElementById('github-graph-grid');
  const monthLabelsContainer = document.getElementById('graph-month-labels');
  const subtitleEl = document.getElementById('gh-contributions-subtitle');

  if (!gridContainer) return;

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const USERNAME = 'parthp137';

  let activityData = null;

  // 1. Try fetching real-time live data first
  try {
    const liveRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
    if (liveRes.ok) {
      const live = await liveRes.json();
      const days = live.contributions || [];
      const total = days.reduce((acc, d) => acc + (d.count || 0), 0);

      const sorted = [...days].filter(d => d && d.date).sort((a, b) => a.date.localeCompare(b.date));
      let idx = sorted.length - 1;
      if (idx >= 0 && sorted[idx].count === 0) idx--;
      let streak = 0;
      for (let i = idx; i >= 0; i--) {
        if (sorted[i].count > 0) streak++;
        else break;
      }

      activityData = {
        updatedAt: new Date().toISOString(),
        github: {
          username: USERNAME,
          totalContributions: total,
          streak: streak,
          calendar: days
        }
      };
    }
  } catch (err) {
    console.warn('Live GitHub API fetch failed, trying local activity.json...', err);
  }

  // 2. Fallback to cached activity.json if live API is unavailable
  if (!activityData || !activityData.github) {
    try {
      const res = await fetch('activity.json');
      if (res.ok) {
        activityData = await res.json();
      }
    } catch (err) {
      console.warn('Could not load activity.json:', err);
    }
  }

  if (!activityData || !activityData.github) {
    gridContainer.innerHTML = '<div class="graph-loading">Unable to load contribution data.</div>';
    if (subtitleEl) subtitleEl.textContent = 'Activity data currently unavailable';
    return;
  }

  const { github } = activityData;

  if (subtitleEl) {
    const contribWord = github.totalContributions === 1 ? 'contribution' : 'contributions';
    subtitleEl.textContent = `${github.totalContributions.toLocaleString()} ${contribWord} · ${github.streak}-day streak`;
  }

  // Sort and slice last ~371 days (52-53 weeks)
  const sortedDays = (github.calendar || [])
    .filter(d => d && d.date)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-371);

  if (!sortedDays.length) {
    gridContainer.innerHTML = '<div class="graph-loading">No activity recorded yet.</div>';
    return;
  }

  // Align start padding with day of the week
  const startDate = new Date(`${sortedDays[0].date}T12:00:00Z`);
  const startPad = startDate.getUTCDay();
  const paddedDays = [...Array(startPad).fill(null), ...sortedDays];

  // Group into weeks
  const weeks = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }

  // Generate Month Labels matching Sumedh's exact algorithm
  const monthNames = weeks.map((week, wIdx) => {
    const valid = week.find(Boolean);
    if (!valid) return '';
    const monthNum = parseInt(valid.date.slice(5, 7), 10) - 1;
    if (wIdx === 0) return MONTHS[monthNum];
    const prevValid = weeks[wIdx - 1]?.find(Boolean);
    if (prevValid && parseInt(prevValid.date.slice(5, 7), 10) - 1 === monthNum) {
      return '';
    }
    return MONTHS[monthNum];
  });

  if (monthLabelsContainer) {
    monthLabelsContainer.innerHTML = '';
    monthNames.forEach((monthText) => {
      const span = document.createElement('span');
      span.className = 'month-label';
      span.textContent = monthText;
      monthLabelsContainer.appendChild(span);
    });
  }

  // Create Tooltip Element
  let tooltip = document.getElementById('graph-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'graph-tooltip';
    tooltip.className = 'graph-tooltip';
    document.body.appendChild(tooltip);
  }

  // Generate Grid Columns
  gridContainer.innerHTML = '';

  weeks.forEach((week) => {
    const col = document.createElement('div');
    col.className = 'week-col';

    for (let dIdx = 0; dIdx < 7; dIdx++) {
      const day = week[dIdx];
      const cell = document.createElement('span');

      if (!day) {
        cell.className = 'day-cell empty';
      } else {
        const level = Math.min(4, Math.max(0, day.level ?? 0));
        cell.className = `day-cell level-${level}`;
        cell.dataset.date = day.date;
        cell.dataset.count = day.count;

        const dateObj = new Date(`${day.date}T12:00:00Z`);
        const formattedDate = dateObj.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        const countText = day.count === 0 ? 'No contributions' : `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`;

        cell.setAttribute('title', `${day.date}: ${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`);

        cell.addEventListener('mouseenter', () => {
          tooltip.innerHTML = `<strong>${countText}</strong> on ${formattedDate}`;
          const rect = cell.getBoundingClientRect();
          tooltip.style.left = `${rect.left + rect.width / 2}px`;
          tooltip.style.top = `${rect.top}px`;
          tooltip.classList.add('visible');
        });

        cell.addEventListener('mouseleave', () => {
          tooltip.classList.remove('visible');
        });
      }

      col.appendChild(cell);
    }

    gridContainer.appendChild(col);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGitHubActivity);
} else {
  initGitHubActivity();
}

/*
// ============================================
// ELASTIC JELLY & MAGNETIC CURSOR (DISABLED - UNCOMMENT TO RE-ENABLE)
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
*/


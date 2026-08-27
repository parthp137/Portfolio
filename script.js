// ============================================
// THEME TOGGLE (with system preference fallback)
// Default Theme: Theme 1 (Cyber Emerald)
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const currentTheme = savedTheme || (prefersLight ? 'light' : 'dark');

if (currentTheme === 'light') {
  body.classList.add('light-theme');
  if (themeIcon) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

if (themeToggle && themeIcon) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

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
}

// ============================================
// SCROLL PROGRESS BAR & NAVBAR ELEVATION
// ============================================
const scrollProgressBar = document.getElementById('scroll-progress');
const navbarEl = document.getElementById('navbar');

function handleNavbarScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${scrollPercent}%`;
  }

  if (navbarEl) {
    if (scrollTop > 20) {
      navbarEl.classList.add('scrolled');
    } else {
      navbarEl.classList.remove('scrolled');
    }
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

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
  window.addEventListener('scroll', reveal, { passive: true });
  reveal();
}

// ============================================
// ACTIVE NAV LINK TRACKING
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileNavLinks = document.querySelectorAll('.mobile-link');

function setActiveNav() {
  let currentId = '';
  const scrollY = window.scrollY;

  sections.forEach(sec => {
    const offsetTop = sec.offsetTop - 180;
    if (scrollY >= offsetTop) {
      currentId = sec.id;
    }
  });

  const updateLinks = (links) => {
    links.forEach(link => {
      link.classList.remove('active');
      const hrefId = link.getAttribute('href')?.slice(1);
      if (hrefId === currentId) {
        link.classList.add('active');
      }
    });
  };

  updateLinks(navLinks);
  updateLinks(mobileNavLinks);
}

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// ============================================
// MOBILE NAVIGATION DRAWER
// ============================================
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileCloseBtn = document.getElementById('mobile-close-btn');

function openMobileMenu() {
  if (!mobileNav) return;
  mobileNav.classList.add('is-open');
  mobileNav.setAttribute('aria-hidden', 'false');
  if (mobileBackdrop) mobileBackdrop.classList.add('is-open');
  if (hamburgerBtn) {
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  if (!mobileNav) return;
  mobileNav.classList.remove('is-open');
  mobileNav.setAttribute('aria-hidden', 'true');
  if (mobileBackdrop) mobileBackdrop.classList.remove('is-open');
  if (hamburgerBtn) {
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav && mobileNav.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener('click', closeMobileMenu);
}

if (mobileBackdrop) {
  mobileBackdrop.addEventListener('click', closeMobileMenu);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
    closeMobileMenu();
  }
});

// Smooth scroll (handles desktop links, mobile drawer links & buttons)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    closeMobileMenu();

    const offset = 76;
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

      // Merge with activity.json if local cache has newer or higher counts for today (handles third-party scraper delay)
      try {
        const localRes = await fetch('activity.json');
        if (localRes.ok) {
          const localData = await localRes.json();
          const localDays = localData?.github?.calendar || [];
          const localMap = new Map(localDays.map(d => [d.date, d]));

          const existingDates = new Set(days.map(d => d.date));
          days.forEach(d => {
            const localEntry = localMap.get(d.date);
            if (localEntry && (localEntry.count || 0) > (d.count || 0)) {
              d.count = localEntry.count;
              d.level = localEntry.level;
            }
          });

          // Also include any dates in activity.json not yet present in the third-party API response
          localDays.forEach(ld => {
            if (ld && ld.date && !existingDates.has(ld.date)) {
              days.push({ date: ld.date, count: ld.count, level: ld.level });
            }
          });
        }
      } catch (_) {}

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

// ============================================
// ORIGINKIT INKBLEED PIXELATED CURSOR
// ============================================
function initInkbleedCursor(options = {}) {
  // Only enable on desktop devices with fine pointer
  if (window.matchMedia('(max-width: 768px)').matches || !window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  if (document.getElementById('inkbleed-cursor-host')) return;

  const DEFAULTS = {
    pixelCount: 30,
    pixelSize: 20,
    pixelShape: 'circle', // 'circle' | 'square'
    trailStyle: 'solid',  // 'solid' | 'dashed' | 'wave'
    trailSpacing: 2,
    followSpeed: 10,
    stiffness: 10,
    damping: 10,
    fadeOut: true,
    scaleVariation: true,
    idleFadeDuration: 1.5,
  };

  const config = { ...DEFAULTS, ...options };

  const NAMED_EASES = {
    idle: [0.4, 0, 0.2, 1]
  };

  function makeEaseFn(pts = NAMED_EASES.idle) {
    const [x1, y1, x2, y2] = pts;
    if (x1 === y1 && x2 === y2) return (t) => t;
    const bez = (a, b, t) => {
      const u = 1 - t;
      return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
    };
    return (t) => {
      const x = Math.max(0, Math.min(1, t));
      let s = x;
      for (let i = 0; i < 8; i++) {
        const cx = bez(x1, x2, s) - x;
        const u = 1 - s;
        const dx = 3 * u * u * x1 + 6 * u * s * (x2 - x1) + 3 * s * s * (1 - x2);
        if (Math.abs(dx) < 1e-6) break;
        s -= cx / dx;
        s = Math.max(0, Math.min(1, s));
      }
      return bez(y1, y2, s);
    };
  }

  const idleEase = makeEaseFn(NAMED_EASES.idle);
  const IDLE_FADE_SECONDS = Math.max(0.1, config.idleFadeDuration);

  // Create host container
  const host = document.createElement('div');
  host.id = 'inkbleed-cursor-host';
  host.className = 'inkbleed-cursor-host';
  document.body.appendChild(host);
  document.body.classList.add('has-custom-cursor');

  const pool = [];
  const count = Math.max(1, config.pixelCount);
  const cursor = { x: -1000, y: -1000 };

  for (let i = 0; i < count; i++) {
    const node = document.createElement('div');
    node.className = 'inkbleed-pixel';
    node.style.width = `${config.pixelSize}px`;
    node.style.height = `${config.pixelSize}px`;
    node.style.borderRadius = config.pixelShape === 'circle' ? '50%' : '0';
    host.appendChild(node);
    pool.push({
      node,
      x: cursor.x,
      y: cursor.y,
      vx: 0,
      vy: 0,
      hidden: false
    });
  }

  let seen = false;
  let inside = false;
  let lastMove = 0;

  const onMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    if (Math.hypot(x - cursor.x, y - cursor.y) > 0.5) {
      lastMove = performance.now();
    }
    cursor.x = x;
    cursor.y = y;
    host.style.opacity = '1';

    if (!seen || !inside) {
      seen = true;
      for (const px of pool) {
        px.x = cursor.x;
        px.y = cursor.y;
        px.vx = 0;
        px.vy = 0;
      }
    }
    inside = true;
  };

  const onWindowLeave = () => {
    inside = false;
    host.style.opacity = '0';
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onWindowLeave);
  window.addEventListener('blur', onWindowLeave);

  let activity = 0;
  let raf = 0;
  let last = performance.now();

  const frame = (now) => {
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;

    if (!pool.length || !seen) {
      raf = requestAnimationFrame(frame);
      return;
    }

    const moving = now - lastMove < 100;
    activity = moving
      ? Math.min(1, activity + dt / 0.2)
      : Math.max(0, activity - dt / IDLE_FADE_SECONDS);
    const fadeMul = 1 - idleEase(1 - activity);

    const k = config.stiffness * 72 * (config.followSpeed / 10);
    const retain = Math.max(0.05, 1 - config.damping / 20);
    const decay = Math.pow(retain, dt * 60);
    const pull = 1 - Math.exp(-dt / 0.028);
    const spacing = Math.max(1, config.trailSpacing);
    const size = config.pixelSize;

    for (let i = 0; i < pool.length; i++) {
      const px = pool[i];
      const ax = i === 0 ? cursor.x : pool[i - 1].x;
      const ay = i === 0 ? cursor.y : pool[i - 1].y;
      const dx = ax - px.x;
      const dy = ay - px.y;

      px.vx = (px.vx + dx * k * dt) * decay;
      px.vy = (px.vy + dy * k * dt) * decay;
      px.x += px.vx * dt;
      px.y += px.vy * dt;

      if (i > 0) {
        const dist = Math.hypot(dx, dy);
        if (dist > spacing) {
          const ratio = ((dist - spacing) / dist) * pull;
          px.x += dx * ratio;
          px.y += dy * ratio;
        }
      }

      const progress = i / pool.length;
      let opacity = config.fadeOut ? 1 - progress : 1;
      let scale = config.scaleVariation ? 1 - progress * 0.5 : 1;
      opacity *= fadeMul;
      scale *= fadeMul;

      const visible = config.trailStyle === 'dashed' ? i % 5 < 3 : true;

      let offX = 0;
      let offY = 0;
      if (i > 0 && config.trailStyle === 'wave') {
        const prev = pool[i - 1];
        const sx = px.x - prev.x;
        const sy = px.y - prev.y;
        const len = Math.hypot(sx, sy);
        if (len > 0) {
          const amount = Math.sin(i * 0.3) * size * 2;
          offX = (-sy / len) * amount;
          offY = (sx / len) * amount;
        }
      }

      const s = px.node.style;
      const hide = !visible || opacity < 0.01 || scale <= 0;
      if (hide !== px.hidden) {
        s.display = hide ? 'none' : 'block';
        px.hidden = hide;
      }
      if (hide) continue;

      s.transform = `translate3d(${px.x + offX}px, ${px.y + offY}px, 0) translate(-50%, -50%) scale(${scale})`;
      s.opacity = opacity.toFixed(3);
    }

    raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initInkbleedCursor());
} else {
  initInkbleedCursor();
}


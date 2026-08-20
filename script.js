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

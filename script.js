// Scroll reveal
const animated = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

function reveal() {
  animated.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal();

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
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    const offset = 80;
    const top = targetEl.offsetTop - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Dummy contact submit
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent! (This is a front-end demo only.)');
  });
}

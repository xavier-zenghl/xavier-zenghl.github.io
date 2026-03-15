// === i18n ===
const LANG_KEY = 'site-lang';
const langToggle = document.getElementById('langToggle');

function getStoredLang() {
  return localStorage.getItem(LANG_KEY) || 'en';
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n-en]').forEach(el => {
    const text = el.getAttribute(`data-i18n-${lang}`);
    if (text) el.textContent = text;
  });

  langToggle.textContent = lang === 'en' ? 'EN' : '中';
}

langToggle.addEventListener('click', () => {
  const current = getStoredLang();
  setLang(current === 'en' ? 'zh' : 'en');
});

// Initialize language on load
setLang(getStoredLang());

// === Nav scroll shadow ===
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// === Section fade-in on scroll ===
const faders = document.querySelectorAll('.section-fade');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

faders.forEach(section => fadeObserver.observe(section));

// === Publication toggle ===
const pubToggle = document.getElementById('pubToggle');
const pubMoreItems = document.querySelectorAll('.pub-more');

pubToggle.addEventListener('click', () => {
  const expanded = pubToggle.getAttribute('data-expanded') === 'true';
  const lang = getStoredLang();

  pubMoreItems.forEach(item => {
    item.hidden = !item.hidden;
  });

  pubToggle.setAttribute('data-expanded', !expanded);
  pubToggle.setAttribute('data-i18n-en', expanded ? 'Show More' : 'Show Less');
  pubToggle.setAttribute('data-i18n-zh', expanded ? '展开更多' : '收起');
  pubToggle.textContent = expanded
    ? (lang === 'zh' ? '展开更多' : 'Show More')
    : (lang === 'zh' ? '收起' : 'Show Less');
});

// === Image lightbox ===
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<img src="" alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.pub-figure img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// === Mobile hamburger menu ===
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// === Timeline accordion ===
document.querySelectorAll('.timeline-header[role="button"]').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.timeline-item');
    const isExpanded = item.classList.contains('expanded');

    // Accordion: close all open items
    document.querySelectorAll('.timeline-item.expanded').forEach(openItem => {
      openItem.classList.remove('expanded');
      openItem.querySelector('.timeline-header').setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked item (open if was closed)
    if (!isExpanded) {
      item.classList.add('expanded');
      header.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard: Enter/Space
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

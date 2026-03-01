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
}, { threshold: 0.15 });

faders.forEach(section => fadeObserver.observe(section));

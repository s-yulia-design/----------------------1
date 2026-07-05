/**
 * Основной JavaScript: навигация, FAQ, шапка
 */
document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initHeaderScroll();
  initFAQ();
  initContactLinks();
  initMobileCTA();
});

function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--open');
    nav.classList.toggle('nav--open');
    document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('burger--open');
      nav.classList.remove('nav--open');
      document.body.style.overflow = '';
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-item__question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.contains('faq-item--open');

      document.querySelectorAll('.faq-item--open').forEach(openItem => {
        openItem.classList.remove('faq-item--open');
      });

      if (!isOpen) {
        item.classList.add('faq-item--open');
      }
    });
  });
}

function initContactLinks() {
  if (typeof SITE_CONFIG === 'undefined') return;

  document.querySelectorAll('[data-phone]').forEach(el => {
    el.textContent = SITE_CONFIG.phone;
  });

  document.querySelectorAll('[data-phone-link]').forEach(el => {
    el.href = SITE_CONFIG.phoneLink;
  });

  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    el.href = SITE_CONFIG.whatsapp;
  });

  document.querySelectorAll('[data-telegram]').forEach(el => {
    el.href = SITE_CONFIG.telegram;
  });

  document.querySelectorAll('[data-city]').forEach(el => {
    el.textContent = SITE_CONFIG.city;
  });

  document.querySelectorAll('[data-region]').forEach(el => {
    el.textContent = SITE_CONFIG.region;
  });
}

function initMobileCTA() {
  const mobileCta = document.querySelector('.mobile-cta a');
  if (mobileCta && !mobileCta.getAttribute('href')) {
    mobileCta.href = '/contacts/#form';
  }
}

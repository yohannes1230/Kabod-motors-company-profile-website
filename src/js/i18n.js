/**
 * I18N LOCALIZATION RUNTIME MODULE
 * Switches language between English ('en') and Amharic ('am') dynamically,
 * updating data-i18n elements across the page and persisting in localStorage.
 */

import { translations } from '../data/i18n.js';

let currentLang = 'en';

export function getLang() {
  return currentLang;
}

export function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('kabod_lang', lang);
  document.documentElement.setAttribute('lang', lang);

  const dict = translations[lang];

  // Update text for all elements with data-i18n attribute: "section.key"
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keyPath = el.getAttribute('data-i18n').split('.');
    let val = dict;
    for (const k of keyPath) {
      if (val && val[k] !== undefined) {
        val = val[k];
      } else {
        val = null;
        break;
      }
    }
    if (val) {
      el.textContent = val;
    }
  });

  // Update placeholder for elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const keyPath = el.getAttribute('data-i18n-placeholder').split('.');
    let val = dict;
    for (const k of keyPath) {
      if (val && val[k] !== undefined) {
        val = val[k];
      } else {
        val = null;
        break;
      }
    }
    if (val) {
      el.setAttribute('placeholder', val);
    }
  });

  // Update toggle button text
  const toggleBtn = document.getElementById('lang-toggle-btn');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? 'አማ' : 'EN';
    toggleBtn.setAttribute('aria-label', lang === 'en' ? 'አማ - Switch to Amharic' : 'EN - Switch to English');
  }

  const waBtn = document.querySelector('.floating-whatsapp-btn');
  if (waBtn) {
    waBtn.setAttribute('aria-label', lang === 'en' ? 'Chat with Us on WhatsApp' : 'በዋትስአፕ ያናግሩን - WhatsApp');
  }
}

export function initI18n() {
  const saved = localStorage.getItem('kabod_lang') || 'en';
  const toggleBtn = document.getElementById('lang-toggle-btn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'am' : 'en';
      setLanguage(nextLang);
    });
  }

  setLanguage(saved);
}

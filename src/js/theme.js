/**
 * THEME TOGGLE MODULE (Dark / Light Mode)
 * Syncs with localStorage and system preference with accessible iconography
 */

export function initTheme() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  function getPreferredTheme() {
    const saved = localStorage.getItem('kabod_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches 
      ? 'light' 
      : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kabod_theme', theme);

    toggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
      btn.innerHTML = theme === 'dark' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    });
  }

  // Initialize
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = active === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  // Listen for system theme changes if user hasn't set an explicit preference
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('kabod_theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
}

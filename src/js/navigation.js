/**
 * NAVIGATION MODULE
 * Handles sticky navbar behavior, mobile slide-out drawer, ARIA states, active link highlighting, and smooth scrolling.
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .nav-quote-btn, .mobile-drawer-btn');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggling
  function toggleDrawer(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer?.classList.contains('open');
    if (isOpen) {
      mobileDrawer?.classList.add('open');
      drawerBackdrop?.classList.add('open');
      mobileMenuBtn?.classList.add('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Focus first link in drawer
      setTimeout(() => {
        mobileDrawer?.querySelector('a')?.focus();
      }, 100);
    } else {
      mobileDrawer?.classList.remove('open');
      drawerBackdrop?.classList.remove('open');
      mobileMenuBtn?.classList.remove('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  mobileMenuBtn?.addEventListener('click', () => toggleDrawer());
  drawerBackdrop?.addEventListener('click', () => toggleDrawer(false));

  // Escape key closes mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      toggleDrawer(false);
      mobileMenuBtn?.focus();
    }
  });

  // Close drawer on link click & smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const cleanId = targetId.split('?')[0];
        const targetEl = document.querySelector(cleanId);
        if (targetEl) {
          e.preventDefault();
          toggleDrawer(false);
          const headerHeight = header?.offsetHeight || 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Active section tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

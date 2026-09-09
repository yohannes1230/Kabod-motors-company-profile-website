/**
 * MOTION & SCROLL REVEAL MODULE
 * Efficient IntersectionObserver triggering staggered CSS reveals
 */

export function initMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const heroVideo = document.querySelector('.hero-video');
  const supportVideo = document.querySelector('[data-support-video]');

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-revealed');
    });

    if (heroVideo) {
      heroVideo.pause();
      heroVideo.removeAttribute('autoplay');
    }

    if (supportVideo) {
      supportVideo.pause();
      supportVideo.removeAttribute('autoplay');
    }

    return;
  }

  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));

  if (supportVideo) {
    const videoObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          supportVideo.play().catch(() => { });
        } else {
          supportVideo.pause();
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.35
    });

    videoObserver.observe(supportVideo);
  }
}

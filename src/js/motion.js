/**
 * MOTION & SCROLL REVEAL MODULE
 * Efficient IntersectionObserver triggering staggered CSS reveals, count-up animations, and responsive video control
 */

export function initMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  const heroVideo = document.querySelector('.hero-video');
  const supportVideo = document.querySelector('[data-support-video]');

  // Performance budget: do not autoplay video on mobile screens (< 768px)
  if (isMobile) {
    if (heroVideo) {
      heroVideo.pause();
      heroVideo.removeAttribute('autoplay');
    }
    if (supportVideo) {
      supportVideo.pause();
      supportVideo.removeAttribute('autoplay');
    }
  }

  // Count-up stat animation function
  function initCountUp() {
    const counterElements = document.querySelectorAll('[data-counter]');
    if (!counterElements.length) return;

    if (prefersReducedMotion || isMobile) {
      counterElements.forEach(el => {
        const target = el.getAttribute('data-counter');
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const prefix = el.getAttribute('data-counter-prefix') || '';
        el.textContent = `${prefix}${parseFloat(target).toLocaleString()}${suffix}`;
      });
      return;
    }

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          obs.unobserve(el);

          const targetNum = parseFloat(el.getAttribute('data-counter'));
          const suffix = el.getAttribute('data-counter-suffix') || '';
          const prefix = el.getAttribute('data-counter-prefix') || '';
          const duration = 1400; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic: 1 - pow(1 - progress, 3)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(targetNum * easeOut);

            el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${targetNum.toLocaleString()}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
        }
      });
    }, {
      threshold: 0.2
    });

    counterElements.forEach(el => counterObserver.observe(el));
  }

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

    initCountUp();
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
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
  initCountUp();

  // Desktop video viewport observer
  if (supportVideo && !isMobile) {
    const videoObserver = new IntersectionObserver((entries) => {
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


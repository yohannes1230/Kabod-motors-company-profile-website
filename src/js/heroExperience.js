/**
 * Premium rotating hero statement.
 * Uses a layout-stable, accessible cross-fade and respects reduced motion.
 */
export function initHeroExperience() {
  const rotator = document.querySelector('[data-hero-rotator]');
  if (!rotator) return;

  const messages = [
    'Powering Mobility.',
    'Driving Progress.',
    'Moving Business Forward.',
    'Connecting Ethiopia to Global Opportunity.'
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = undefined;
  };

  const start = () => {
    stop();
    if (reduceMotion.matches) {
      rotator.textContent = messages[0];
      return;
    }

    timer = window.setInterval(() => {
      rotator.classList.add('is-switching');

      window.setTimeout(() => {
        index = (index + 1) % messages.length;
        rotator.textContent = messages[index];
        rotator.classList.remove('is-switching');
      }, 280);
    }, 3200);
  };

  reduceMotion.addEventListener?.('change', start);
  start();
}
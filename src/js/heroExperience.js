/**
 * KABOD MOTORS HERO STORY
 * Text and image rotate together from one shared hero scope.
 */
export function initHeroExperience() {
  const hero = document.querySelector('[data-hero-story]');
  if (!hero) return;

  const stories = [
    {
      kicker: 'Electric Mobility',
      title: 'Tomorrow’s Drive, Today.',
      copy: 'Discover intelligent electric mobility that brings innovation, comfort and a new driving experience closer to Ethiopia.',
      image: '/images/GettyImages-2043061619-e1710106398958.webp',
      alt: 'BYD Yangwang U8 electric luxury SUV',
      imageTitle: 'BYD Yangwang U8',
      imageSubtitle: 'Intelligent flagship electric mobility',
      badge: 'Electric Mobility'
    },
    {
      kicker: 'Automotive Energy',
      title: 'Power You Can Rely On.',
      copy: 'Dependable automotive energy solutions for everyday vehicles, commercial fleets and businesses that cannot afford to stop.',
      image: '/images/images (29).webp',
      alt: 'Maxtorm Korea automotive battery',
      imageTitle: 'Maxtorm Korea',
      imageSubtitle: 'High-performance automotive battery solutions',
      badge: 'Energy Solutions'
    },
    {
      kicker: 'Premium Lubricants',
      title: 'Protection in Every Kilometer.',
      copy: 'Premium lubricants selected for drivers and businesses that value engine protection, performance and dependable long-term care.',
      image: '/images/images (21).webp',
      alt: 'Koryo premium engine oil',
      imageTitle: 'Koryo Oil',
      imageSubtitle: 'Premium lubrication for demanding engines',
      badge: 'Premium Lubricants'
    },
    {
      kicker: 'Heavy Industry',
      title: 'Built for the Work Ahead.',
      copy: 'Heavy-duty machinery and commercial transport solutions ready to support construction, infrastructure and ambitious business operations.',
      image: '/images/Howo-Tx-Dump-Truck-6x4-1.webp',
      alt: 'Sinotruk Howo heavy-duty dump truck',
      imageTitle: 'Sinotruk Howo',
      imageSubtitle: 'Heavy-duty solutions for serious work',
      badge: 'Heavy Machinery'
    }
  ];

  const $ = selector => hero.querySelector(selector);
  const elements = {
    kicker: $('[data-story-kicker]'),
    title: $('[data-story-title]'),
    copy: $('[data-story-copy]'),
    image: $('[data-story-image]'),
    imageTitle: $('[data-story-image-title]'),
    imageSubtitle: $('[data-story-image-subtitle]'),
    badge: $('[data-story-badge]'),
    current: $('[data-story-current]')
  };
  const dots = [...hero.querySelectorAll('[data-story-index]')];

  if (Object.values(elements).some(el => !el)) {
    console.error('Kabod hero: required story elements were not found.');
    return;
  }

  let index = 0;
  let timerId;
  let changing = false;

  function render(nextIndex, animate = true) {
    if (changing || nextIndex === index && animate) return;
    changing = true;
    const story = stories[nextIndex];

    const apply = () => {
      elements.kicker.textContent = story.kicker;
      elements.title.textContent = story.title;
      elements.copy.textContent = story.copy;
      elements.imageTitle.textContent = story.imageTitle;
      elements.imageSubtitle.textContent = story.imageSubtitle;
      elements.badge.textContent = story.badge;
      elements.current.textContent = String(nextIndex + 1).padStart(2, '0');

      elements.image.onload = () => {
        elements.image.classList.remove('is-loading');
      };
      elements.image.onerror = () => {
        console.error('Kabod hero image failed to load:', story.image);
        elements.image.classList.remove('is-loading');
      };
      elements.image.classList.add('is-loading');
      elements.image.src = story.image;
      elements.image.alt = story.alt;

      dots.forEach((dot, i) => {
        const active = i === nextIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });

      index = nextIndex;
      requestAnimationFrame(() => {
        hero.classList.remove('hero-story-changing');
        window.setTimeout(() => { changing = false; }, 180);
      });
    };

    if (!animate) {
      apply();
      changing = false;
      return;
    }

    hero.classList.add('hero-story-changing');
    window.setTimeout(apply, 180);
  }

  function advance() {
    render((index + 1) % stories.length);
  }

  function restartTimer() {
    window.clearInterval(timerId);
    timerId = window.setInterval(advance, 4000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = Number(dot.dataset.storyIndex);
      if (Number.isInteger(target) && target >= 0 && target < stories.length && target !== index) {
        render(target);
        restartTimer();
      }
    });
  });

  // Initial state is already visible; begin automatic synchronized rotation.
  index = 0;
  restartTimer();
}

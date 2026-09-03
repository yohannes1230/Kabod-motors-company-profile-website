/**
 * SYNCHRONIZED HERO STORY
 * Rotates Kabod Motors' key solution categories with matching imagery and copy.
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
      copy: 'From everyday driving to demanding commercial use, dependable battery solutions help keep people and businesses moving with confidence.',
      image: '/images/images (29).webp',
      alt: 'Maxtorm Korea automotive battery',
      imageTitle: 'Maxtorm Korea',
      imageSubtitle: 'High-performance automotive battery solutions',
      badge: 'Energy Solutions'
    },
    {
      kicker: 'Premium Lubricants',
      title: 'Protection in Every Kilometer.',
      copy: 'Premium Koryo lubricants are sourced for drivers and businesses that value engine protection, performance and dependable long-term care.',
      image: '/images/images (21).webp',
      alt: 'Koryo premium engine oil',
      imageTitle: 'Koryo Oil',
      imageSubtitle: 'Premium lubrication for demanding engines',
      badge: 'Premium Lubricants'
    },
    {
      kicker: 'Heavy Industry',
      title: 'Built for the Work Ahead.',
      copy: 'Heavy-duty machinery and commercial transport solutions designed to support construction, infrastructure and ambitious business operations.',
      image: '/images/Howo-Tx-Dump-Truck-6x4-1.webp',
      alt: 'Sinotruk Howo heavy-duty dump truck',
      imageTitle: 'Sinotruk Howo',
      imageSubtitle: 'Heavy-duty solutions for serious work',
      badge: 'Heavy Machinery'
    }
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const kicker = hero.querySelector('[data-story-kicker]');
  const title = hero.querySelector('[data-story-title]');
  const copy = hero.querySelector('[data-story-copy]');
  const image = hero.querySelector('[data-story-image]');
  const imageTitle = hero.querySelector('[data-story-image-title]');
  const imageSubtitle = hero.querySelector('[data-story-image-subtitle]');
  const badge = hero.querySelector('[data-story-badge]');
  const current = hero.querySelector('[data-story-current]');
  const dots = [...hero.querySelectorAll('[data-story-index]')];

  let index = 0;
  let timer;
  let transitionTimer;

  function setActive(nextIndex, immediate = false) {
    index = nextIndex;
    const story = stories[index];

    if (!immediate && !reduceMotion.matches) {
      [kicker, title, copy, imageTitle].forEach(el => el?.classList.add('is-switching'));
      image?.classList.add('is-switching');

      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => updateStory(story), 420);
    } else {
      updateStory(story);
    }
  }

  function updateStory(story) {
    kicker.textContent = story.kicker;
    title.textContent = story.title;
    copy.textContent = story.copy;
    image.src = story.image;
    image.alt = story.alt;
    imageTitle.textContent = story.imageTitle;
    imageSubtitle.textContent = story.imageSubtitle;
    badge.textContent = story.badge;
    current.textContent = String(index + 1).padStart(2, '0');

    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });

    requestAnimationFrame(() => {
      [kicker, title, copy, imageTitle].forEach(el => el?.classList.remove('is-switching'));
      image?.classList.remove('is-switching');
    });
  }

  function start() {
    window.clearInterval(timer);
    if (reduceMotion.matches) return;
    timer = window.setInterval(() => setActive((index + 1) % stories.length), 5200);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      setActive(Number(dot.dataset.storyIndex));
      start();
    });
  });

  hero.addEventListener('mouseenter', () => window.clearInterval(timer));
  hero.addEventListener('mouseleave', start);
  reduceMotion.addEventListener?.('change', () => {
    setActive(index, true);
    start();
  });

  setActive(0, true);
  start();
}
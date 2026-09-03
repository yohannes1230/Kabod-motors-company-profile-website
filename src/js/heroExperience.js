/**
 * KABOD MOTORS HERO STORY
 * A simple, deterministic synchronized rotator. Text and image always change together.
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

  const get = selector => hero.querySelector(selector);
  const kicker = get('[data-story-kicker]');
  const title = get('[data-story-title]');
  const copy = get('[data-story-copy]');
  const image = get('[data-story-image]');
  const imageTitle = get('[data-story-image-title]');
  const imageSubtitle = get('[data-story-image-subtitle]');
  const badge = get('[data-story-badge]');
  const current = get('[data-story-current]');
  const dots = [...hero.querySelectorAll('[data-story-index]')];

  if (![kicker, title, copy, image, imageTitle, imageSubtitle, badge, current].every(Boolean)) {
    console.error('Hero markup is incomplete.');
    return;
  }

  let index = 0;
  let timer = null;
  let isChanging = false;
  let failedStories = new Set();

  // Preload every available image. Missing assets are remembered instead of freezing the hero.
  stories.forEach((story, storyIndex) => {
    const preload = new Image();
    preload.onload = () => { failedStories.delete(storyIndex); };
    preload.onerror = () => {
      failedStories.add(storyIndex);
      console.warn(`Hero image unavailable: ${story.image}`);
    };
    preload.src = story.image;
  });

  function paint(story, storyIndex) {
    kicker.textContent = story.kicker;
    title.textContent = story.title;
    copy.textContent = story.copy;
    image.src = story.image;
    image.alt = story.alt;
    imageTitle.textContent = story.imageTitle;
    imageSubtitle.textContent = story.imageSubtitle;
    badge.textContent = story.badge;
    current.textContent = String(storyIndex + 1).padStart(2, '0');

    dots.forEach((dot, i) => {
      const active = i === storyIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function nextAvailable(startIndex) {
    for (let step = 1; step <= stories.length; step += 1) {
      const candidate = (startIndex + step) % stories.length;
      if (!failedStories.has(candidate)) return candidate;
    }
    return startIndex;
  }

  function setActive(nextIndex, immediate = false) {
    if (isChanging && !immediate) return;
    const story = stories[nextIndex];
    if (!story) return;

    // If the image was confirmed missing, do not leave the UI blurred or stuck.
    if (failedStories.has(nextIndex)) {
      setActive(nextAvailable(nextIndex), true);
      return;
    }

    isChanging = true;
    hero.classList.add('hero-story-changing');

    const apply = () => {
      index = nextIndex;
      paint(story, index);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          hero.classList.remove('hero-story-changing');
          isChanging = false;
        });
      });
    };

    if (immediate) {
      apply();
    } else {
      window.setTimeout(apply, 220);
    }
  }

  function advance() {
    setActive(nextAvailable(index));
  }

  function start() {
    stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = window.setInterval(advance, 5200);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = Number(dot.dataset.storyIndex);
      if (Number.isInteger(target) && target >= 0 && target < stories.length) {
        setActive(target);
        start();
      }
    });
  });

  // Do not pause the slideshow on mouse hover: visitors often keep the cursor over the hero.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  setActive(0, true);
  start();
}

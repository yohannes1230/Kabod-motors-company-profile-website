/**
 * GALLERY & LIGHTBOX MODULE
 * Category filtering across all audited assets and full-featured fullscreen lightbox
 */

import { galleryItems } from '../data/gallery.js';

export function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryGrid = document.getElementById('gallery-grid-container');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentCategory = 'all';
  let activeItems = [...galleryItems];
  let currentIndex = 0;

  function renderGallery(cat) {
    if (!galleryGrid) return;
    currentCategory = cat;
    activeItems = cat === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === cat);

    galleryGrid.innerHTML = activeItems.map((item, idx) => `
      <div class="gallery-item" data-index="${idx}">
        <img src="${item.src}" alt="${item.title}" loading="lazy" width="400" height="300">
        <div class="gallery-overlay">
          <span class="badge badge-bronze" style="margin-bottom: 0.35rem; align-self: flex-start;">${item.tag}</span>
          <h5>${item.title}</h5>
          <p>${item.caption}</p>
        </div>
      </div>
    `).join('');
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';
      renderGallery(cat);
    });
  });

  // Lightbox functions
  function openLightbox(index) {
    if (index < 0 || index >= activeItems.length) return;
    currentIndex = index;
    const item = activeItems[currentIndex];

    if (lightboxImg && lightboxTitle && lightboxCaption) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
      lightboxTitle.textContent = item.title;
      lightboxCaption.textContent = `${item.caption} (${item.tag})`;
    }

    lightboxModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % activeItems.length;
    openLightbox(currentIndex);
  }

  // Click on gallery item
  galleryGrid?.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const idx = parseInt(item.getAttribute('data-index') || '0', 10);
      openLightbox(idx);
    }
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', showPrev);
  nextBtn?.addEventListener('click', showNext);

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Initial render
  renderGallery('all');
}

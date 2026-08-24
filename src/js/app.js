/**
 * MAIN APP ENTRY POINT
 * Coordinates all modules, navigation, showcases, and interactive UI
 */

import { initNavigation } from './navigation.js';
import { initVehiclesShowcase } from './vehiclesShowcase.js';
import { initProductShowcase } from './productShowcase.js';
import { initSourcingMap } from './sourcingMap.js';
import { initGalleryLightbox } from './galleryLightbox.js';
import { initInquiryForm } from './inquiryForm.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initVehiclesShowcase();
  initProductShowcase();
  initSourcingMap();
  initGalleryLightbox();
  initInquiryForm();

  // Handle B2B direct inquiry triggers
  document.querySelectorAll('.b2b-inquire-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sector = btn.getAttribute('data-sector') || 'Commercial Fleets & Machinery';
      const interestSelect = document.getElementById('inquiry-interest');
      const messageTextarea = document.getElementById('inquiry-message');
      if (interestSelect) interestSelect.value = 'Industrial Products';
      if (messageTextarea) {
        messageTextarea.value = `Hello Kabod Motors Business Team, We are inquiring on behalf of our company regarding commercial supply / fleet procurement for ${sector}.`;
      }
    });
  });
});

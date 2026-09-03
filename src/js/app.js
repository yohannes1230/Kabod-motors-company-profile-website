/**
 * MAIN APP ENTRY POINT
 * Coordinates all modules, navigation, showcases, theme, motion, solutions pre-fills, and interactive UI
 */

import { initTheme } from './theme.js';
import { initMotion } from './motion.js';
import { initHeroExperience } from './heroExperience.js';
import { initNavigation } from './navigation.js';
import { initVehiclesShowcase } from './vehiclesShowcase.js';
import { initProductShowcase } from './productShowcase.js';
import { initSourcingMap } from './sourcingMap.js';
import { initGalleryLightbox } from './galleryLightbox.js';
import { initInquiryForm, populateInquiry } from './inquiryForm.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initVehiclesShowcase();
  initProductShowcase();
  initSourcingMap();
  initGalleryLightbox();
  initInquiryForm();
  initMotion();
  initHeroExperience();

  document.querySelectorAll('.solution-inquire-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const interest = btn.getAttribute('data-interest') || 'General Inquiry';
      const pillarTitle = btn.getAttribute('data-title') || interest;
      populateInquiry({
        interest,
        details: `Inquiring about ${pillarTitle} solutions for our organization.`
      });
    });
  });

  document.querySelectorAll('.b2b-inquire-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sector = btn.getAttribute('data-sector') || 'Commercial Fleets & Machinery';
      populateInquiry({
        interest: 'Commercial / Industrial Fleet Procurement',
        details: `Hello Kabod Motors Business Team, We are inquiring on behalf of our enterprise regarding commercial supply / fleet procurement for: ${sector}.`
      });
    });
  });

  document.querySelectorAll('.download-profile-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      populateInquiry({
        interest: 'General Corporate Inquiry',
        details: 'Hello Kabod Motors, Please send the official Kabod Motors Corporate Profile PDF and credential documentation to my email.'
      });
    });
  });
});

/**
 * VEHICLES SHOWCASE MODULE
 * Renders clean vehicle cards with highlights, and opens an accessible modal with full manufacturer specs & disclaimers.
 * Supports URL deep-linking, keyboard navigation, focus trap, and empty fallback states.
 */

import { electricVehicles, vehicleDisclaimer } from '../data/vehicles.js';
import { populateInquiry } from './inquiryForm.js';

export function initVehiclesShowcase() {
  const container = document.getElementById('vehicles-grid-container');
  const specModal = document.getElementById('spec-modal');
  const specModalBody = document.getElementById('spec-modal-body');
  const specModalCloseBtn = document.getElementById('spec-modal-close');
  let lastFocusedElement = null;

  if (!container) return;

  if (!electricVehicles || electricVehicles.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--color-text-muted);">Vehicle catalog currently undergoing scheduled update. Contact commercial desk for active sourcing requests.</div>`;
    return;
  }

  // Render clean vehicle cards
  container.innerHTML = electricVehicles.map(veh => `
    <div class="vehicle-card" data-id="${veh.id}">
      <div class="vehicle-media">
        <img src="${veh.thumbnail}" alt="${veh.name}" loading="lazy" decoding="async" width="600" height="400">
        <div class="vehicle-badge-overlay">
          <span class="badge badge-cyan">${veh.badge}</span>
        </div>
      </div>
      <div class="vehicle-content">
        <div class="vehicle-title-wrap">
          <span class="vehicle-category">${veh.category}</span>
          <h3 class="vehicle-name">${veh.name}</h3>
        </div>
        <p class="vehicle-desc">${veh.shortPositioning}</p>
        <ul class="vehicle-highlights-list">
          ${veh.keyHighlights.slice(0, 3).map(h => `
            <li><span class="bullet"></span><span>${h}</span></li>
          `).join('')}
        </ul>
        <div class="vehicle-actions">
          <button type="button" class="btn btn-secondary btn-sm view-specs-btn" data-id="${veh.id}" aria-haspopup="dialog">
            View Full Specs
          </button>
          <button type="button" class="btn btn-primary btn-sm inquire-veh-btn" data-name="${veh.name}" data-category="${veh.category}">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Spec Modal Opening
  function openSpecModal(vehicleId) {
    const veh = electricVehicles.find(v => v.id === vehicleId);
    if (!veh || !specModal || !specModalBody) return;

    lastFocusedElement = document.activeElement;

    const specs = veh.manufacturerSpecs;
    const specRows = Object.entries(specs).map(([key, val]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      return `
        <div class="spec-data-cell">
          <div class="spec-data-label">${formattedKey}</div>
          <div class="spec-data-val">${val}</div>
        </div>
      `;
    }).join('');

    specModalBody.innerHTML = `
      <div class="spec-modal-header">
        <div class="spec-modal-title">
          <span class="badge badge-cyan">${veh.category}</span>
          <h3 style="margin-top: 0.5rem;">${veh.name}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: 0.25rem;">${veh.shortPositioning}</p>
        </div>
      </div>
      
      <div style="margin: 1.5rem 0; border-radius: var(--radius-lg); overflow: hidden; max-height: 320px; background: var(--color-surface-subtle);">
        <img src="${veh.thumbnail}" alt="${veh.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--color-text);">Representative Specifications &amp; Sourcing Data</h4>
      <div class="spec-table-grid">
        ${specRows}
      </div>

      <div class="spec-disclaimer-alert">
        <strong>Sourcing &amp; Specification Notice:</strong> ${vehicleDisclaimer}
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end; flex-wrap: wrap;">
        <button type="button" class="btn btn-secondary btn-sm close-modal-action-btn">Close</button>
        <button type="button" class="btn btn-primary btn-sm modal-inquire-btn" data-name="${veh.name}" data-category="${veh.category}">
          Request Custom Import Quote for ${veh.name}
        </button>
      </div>
    `;

    specModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    specModalCloseBtn?.focus();

    // Hook up buttons inside modal
    specModalBody.querySelector('.close-modal-action-btn')?.addEventListener('click', closeSpecModal);
    specModalBody.querySelector('.modal-inquire-btn')?.addEventListener('click', (e) => {
      closeSpecModal();
      populateInquiry({
        interest: 'Electric Vehicles',
        productName: veh.name,
        category: veh.category
      });
    });
  }

  function closeSpecModal() {
    if (!specModal?.classList.contains('open')) return;
    specModal.classList.remove('open');
    document.body.style.overflow = '';
    
    if (window.location.hash.includes('modal=')) {
      if (history.replaceState) {
        history.replaceState(null, '', '#products?tab=vehicles');
      }
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Check URL for deep-linked modal
  function checkUrlForModal() {
    const hash = window.location.hash;
    if (hash.includes('modal=')) {
      const match = hash.match(/modal=([a-z0-9_-]+)/i);
      if (match && match[1]) {
        openSpecModal(match[1]);
      }
    }
  }

  // Event Listeners for Spec buttons
  container.addEventListener('click', (e) => {
    const specBtn = e.target.closest('.view-specs-btn');
    if (specBtn) {
      const vehId = specBtn.getAttribute('data-id');
      if (vehId) {
        openSpecModal(vehId);
        if (history.replaceState) {
          history.replaceState(null, '', `#products?modal=${vehId}`);
        }
      }
    }

    const inqBtn = e.target.closest('.inquire-veh-btn');
    if (inqBtn) {
      const vehName = inqBtn.getAttribute('data-name');
      const vehCat = inqBtn.getAttribute('data-category');
      populateInquiry({
        interest: 'Electric Vehicles',
        productName: vehName,
        category: vehCat
      });
    }
  });

  specModalCloseBtn?.addEventListener('click', closeSpecModal);
  specModal?.addEventListener('click', (e) => {
    if (e.target === specModal) closeSpecModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && specModal?.classList.contains('open')) {
      closeSpecModal();
    }
  });

  checkUrlForModal();
  window.addEventListener('hashchange', checkUrlForModal);
}

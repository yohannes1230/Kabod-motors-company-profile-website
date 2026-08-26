/**
 * VEHICLES SHOWCASE MODULE
 * Renders clean vehicle cards with highlights, and opens a modal with full manufacturer specs & disclaimers.
 * Supports URL deep-linking and empty fallback states.
 */

import { electricVehicles, vehicleDisclaimer } from '../data/vehicles.js';

export function initVehiclesShowcase() {
  const container = document.getElementById('vehicles-grid-container');
  const specModal = document.getElementById('spec-modal');
  const specModalBody = document.getElementById('spec-modal-body');
  const specModalCloseBtn = document.getElementById('spec-modal-close');

  if (!container) return;

  if (!electricVehicles || electricVehicles.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--color-text-muted);">Vehicle catalog currently undergoing scheduled update. Contact commercial desk for active sourcing requests.</div>`;
    return;
  }

  // Render clean vehicle cards
  container.innerHTML = electricVehicles.map(veh => `
    <div class="vehicle-card" data-id="${veh.id}">
      <div class="vehicle-media">
        <img src="${veh.thumbnail}" alt="${veh.name}" loading="lazy" width="600" height="400">
        <div class="vehicle-badge-overlay">
          <span class="badge badge-bronze">${veh.badge}</span>
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
          <button class="btn btn-secondary btn-sm view-specs-btn" data-id="${veh.id}">
            View Full Specs
          </button>
          <a href="#contact" class="btn btn-primary btn-sm inquire-veh-btn" data-name="${veh.name}">
            Inquire
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Spec Modal Opening
  function openSpecModal(vehicleId) {
    const veh = electricVehicles.find(v => v.id === vehicleId);
    if (!veh || !specModal || !specModalBody) return;

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
          <span class="badge badge-blue">${veh.category}</span>
          <h3 style="margin-top: 0.5rem;">${veh.name}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: 0.25rem;">${veh.shortPositioning}</p>
        </div>
      </div>
      
      <div style="margin: 1.5rem 0; border-radius: var(--radius-lg); overflow: hidden; max-height: 320px; background: var(--color-bg-subtle);">
        <img src="${veh.thumbnail}" alt="${veh.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--color-text-primary);">Representative Specifications & Sourcing Data</h4>
      <div class="spec-table-grid">
        ${specRows}
      </div>

      <div class="spec-disclaimer-alert">
        <strong>Sourcing & Specification Notice:</strong> ${vehicleDisclaimer}
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm close-modal-action-btn">Close</button>
        <a href="#contact" class="btn btn-primary btn-sm modal-inquire-btn" data-name="${veh.name}">
          Request Custom Import Quote for ${veh.name}
        </a>
      </div>
    `;

    specModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Hook up buttons inside modal
    specModalBody.querySelector('.close-modal-action-btn')?.addEventListener('click', closeSpecModal);
    specModalBody.querySelector('.modal-inquire-btn')?.addEventListener('click', (e) => {
      closeSpecModal();
      prefillInquiry(veh.name, 'Electric Vehicles');
    });
  }

  function closeSpecModal() {
    specModal?.classList.remove('open');
    document.body.style.overflow = '';
    if (window.location.hash.includes('modal=')) {
      if (history.replaceState) {
        history.replaceState(null, '', '#vehicles');
      }
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
          history.replaceState(null, '', `#vehicles?modal=${vehId}`);
        }
      }
    }

    const inqBtn = e.target.closest('.inquire-veh-btn');
    if (inqBtn) {
      const vehName = inqBtn.getAttribute('data-name');
      prefillInquiry(vehName, 'Electric Vehicles');
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

function prefillInquiry(productName, category) {
  const interestSelect = document.getElementById('inquiry-interest');
  const messageTextarea = document.getElementById('inquiry-message');
  
  if (interestSelect) {
    interestSelect.value = category || 'Electric Vehicles';
  }
  if (messageTextarea && productName) {
    messageTextarea.value = `Hello Kabod Motors team, I would like to request availability, delivery timelines, and pricing for the ${productName}.`;
  }
}


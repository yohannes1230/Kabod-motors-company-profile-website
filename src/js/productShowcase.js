/**
 * PRODUCT SHOWCASE MODULE
 * Renders Maxtorm Batteries, Koryo Lubricants, and Sinotruk Howo Heavy Machinery
 */

import { maxtormBatteries, koryoLubricants, heavyMachinery, productDisclaimer } from '../data/products.js';

export function initProductShowcase() {
  const tabButtons = document.querySelectorAll('.product-tab-btn');
  const energyContainer = document.getElementById('energy-products-grid');
  const lubricantsContainer = document.getElementById('lubricants-products-grid');
  const machineryContainer = document.getElementById('machinery-products-grid');
  const tabPanels = document.querySelectorAll('.product-tab-panel');

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanels.forEach(panel => {
        if (panel.id === `${targetTab}-panel`) {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });

  // Render Maxtorm Batteries
  if (energyContainer) {
    energyContainer.innerHTML = maxtormBatteries.map(bat => `
      <div class="prod-item-card">
        <div class="prod-item-media">
          <img src="${bat.image}" alt="${bat.name}" loading="lazy">
          <span class="badge badge-bronze" style="position: absolute; top: 1rem; right: 1rem;">${bat.badge}</span>
        </div>
        <div class="prod-item-body">
          <span class="prod-item-brand">${bat.brand}</span>
          <h3 class="prod-item-title">${bat.name}</h3>
          <p style="font-size: 0.825rem; color: var(--color-text-muted); margin-bottom: 0.75rem;">${bat.tagline}</p>
          
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.785rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
            ${bat.highlights.slice(0, 3).map(h => `<li>• ${h}</li>`).join('')}
          </ul>

          <table class="prod-tech-table">
            <tbody>
              <tr><td>Technology:</td><td>${bat.technicalData.technology}</td></tr>
              <tr><td>Voltage:</td><td>${bat.technicalData.voltage}</td></tr>
              <tr><td>Manufacturer:</td><td>${bat.manufacturer}</td></tr>
            </tbody>
          </table>

          <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem;">
            <a href="#contact" class="btn btn-primary btn-sm prod-inquire-btn" data-name="${bat.name}" data-cat="Batteries / Energy" style="width: 100%;">
              Inquire / Request Pricing
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Koryo Lubricants
  if (lubricantsContainer) {
    lubricantsContainer.innerHTML = koryoLubricants.map(oil => `
      <div class="prod-item-card">
        <div class="prod-item-media">
          <img src="${oil.image}" alt="${oil.name}" loading="lazy">
          <span class="badge badge-blue" style="position: absolute; top: 1rem; right: 1rem;">${oil.badge}</span>
        </div>
        <div class="prod-item-body">
          <span class="prod-item-brand">${oil.brand} • ${oil.packSize}</span>
          <h3 class="prod-item-title">${oil.name}</h3>
          <p style="font-size: 0.825rem; color: var(--color-text-muted); margin-bottom: 0.75rem;">${oil.category}</p>

          <table class="prod-tech-table">
            <tbody>
              <tr><td>Viscosity:</td><td>${oil.technicalData.viscosityGrade}</td></tr>
              <tr><td>Category:</td><td>${oil.technicalData.serviceCategory}</td></tr>
              <tr><td>Origin:</td><td>${oil.technicalData.origin}</td></tr>
            </tbody>
          </table>

          <div style="margin-top: 1.5rem;">
            <a href="#contact" class="btn btn-primary btn-sm prod-inquire-btn" data-name="${oil.name}" data-cat="Lubricants" style="width: 100%;">
              Order / Inquire
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Heavy Machinery
  if (machineryContainer) {
    machineryContainer.innerHTML = heavyMachinery.map(mach => `
      <div class="prod-item-card">
        <div class="prod-item-media">
          <img src="${mach.image}" alt="${mach.name}" loading="lazy">
          <span class="badge badge-bronze" style="position: absolute; top: 1rem; right: 1rem;">${mach.badge}</span>
        </div>
        <div class="prod-item-body">
          <span class="prod-item-brand">${mach.brand}</span>
          <h3 class="prod-item-title">${mach.name}</h3>
          <p style="font-size: 0.825rem; color: var(--color-text-muted); margin-bottom: 0.75rem;">${mach.category}</p>

          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.785rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
            ${mach.highlights.slice(0, 3).map(h => `<li>• ${h}</li>`).join('')}
          </ul>

          <div style="margin-top: auto; padding-top: 1rem;">
            <a href="#contact" class="btn btn-primary btn-sm prod-inquire-btn" data-name="${mach.name}" data-cat="Heavy Machinery" style="width: 100%;">
              Request Machinery Quote
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Hook all product inquiry buttons to pre-populate form
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.prod-inquire-btn');
    if (btn) {
      const prodName = btn.getAttribute('data-name');
      const prodCat = btn.getAttribute('data-cat');
      const interestSelect = document.getElementById('inquiry-interest');
      const messageTextarea = document.getElementById('inquiry-message');
      if (interestSelect && prodCat) interestSelect.value = prodCat;
      if (messageTextarea && prodName) {
        messageTextarea.value = `Hello Kabod Motors team, I would like to request technical documentation, availability, and pricing for ${prodName}.`;
      }
    }
  });
}

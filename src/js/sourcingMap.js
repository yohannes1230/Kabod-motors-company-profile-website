/**
 * SOURCING MAP MODULE
 * Interactive conceptual supply chain flow (South Korea, China, UAE -> Ethiopia)
 */

export function initSourcingMap() {
  const nodes = document.querySelectorAll('.sourcing-node');
  const detailsBox = document.getElementById('sourcing-details-display');

  const nodeInfo = {
    korea: {
      title: "South Korea — Advanced Energy & Chemical Engineering",
      details: "Direct sourcing of Maxtorm automotive & Start-Stop battery systems engineered by Sebang Global Battery Co., Ltd., and Koryo Oil high-performance synthetic lubricants."
    },
    china: {
      title: "China — High-Tech EV & Heavy Machinery Hub",
      details: "Direct procurement of premier electric vehicles (BYD e-Platform 3.0 & Blade Battery models) and Sinotruk Howo heavy construction tippers and transit mixer trucks."
    },
    uae: {
      title: "United Arab Emirates (UAE) — Sister Company & Logistics Gateway",
      details: "Kabod Motors' sister company in the UAE provides regional freight consolidation, customs coordination, and streamlined supply chain staging for East Africa."
    },
    ethiopia: {
      title: "Addis Ababa, Ethiopia — Corporate Headquarters & Distribution",
      details: "Central distribution, client fulfillment, and corporate account management located at Bole Sub-City (Jacros Area), delivering certified products nationwide."
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-node');
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      if (detailsBox && nodeInfo[key]) {
        detailsBox.innerHTML = `
          <h4 style="color: var(--color-text-primary); margin-bottom: 0.35rem;">${nodeInfo[key].title}</h4>
          <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 0;">${nodeInfo[key].details}</p>
        `;
      }
    });
  });
}

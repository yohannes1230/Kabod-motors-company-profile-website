# Kabod Motors — Corporate Website & Sourcing Platform

[![Production Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)](#)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF.svg?logo=vite&logoColor=white)](#)
[![Design System](https://img.shields.io/badge/Design-Obsidian%20%26%20Titanium-2563EB.svg)](#)
[![A11y](https://img.shields.io/badge/WCAG-2.2%20AA-10B981.svg)](#)

> **Official corporate website and commercial sourcing platform for Kabod Motors / Kabod Trading.**  
> Established in 2016 in Addis Ababa, Ethiopia, Kabod Motors connects commercial and private clients with world-class electric vehicles, Maxtorm Korea energy storage systems, Koryo synthetic lubricants, and Sinotruk Howo heavy construction machinery.

---

## 🏛️ Company Profile & Verified Facts (Tier A)

- **Company Name**: Kabod Motors / Kabod Trading
- **Founder**: Abiy Belay Belete
- **Year Established**: 2016
- **Initial Paid-Up Capital**: Birr 2,000,000 (2016)
- **Equity Expansion**: Expanded to approx. Birr 8.6 Million (documented as of July 7, 2019)
- **Corporate Philosophy**: *"Quality Without Compromise"*
- **Head Office Address**: Jacros Area, Around Faith Bible International Church – Good News Chapel, Bole Sub-City, Addis Ababa, Ethiopia
- **Verified Telephone**: `+251-911235960`
- **Verified WhatsApp**: `+251-911235960`
- **Verified Fax**: `+251-130295151`
- **Official Email**: `Kabodtrading094@gmail.com`
- **International Presence**: Sister company in the United Arab Emirates (UAE) coordinating Middle East, Asian, and East African freight logistics

---

## 🚀 Key Business Solutions & Portfolios

1. **Electric Mobility & Fleet Sourcing**: BYD Yangwang U8, BYD Sealion 7, BYD Atto 3, BYD Song Plus EV, BYD Seagull, BYD Atto 2, Toyota bZ4X (Available for import on client order).
2. **Energy Storage & Automotive Batteries**: Authorized distribution of Maxtorm Korea (Sebang Global Battery) AGM, EFB Start-Stop, and SMF sealed calcium batteries.
3. **High-Performance Synthetic Lubricants**: Koryo Oil South Korea API SP / SN engine lubricants, rotary compressor fluids, and heavy gear oils.
4. **Heavy Machinery & Construction**: Sinotruk Howo 6x4 heavy dump trucks and transit concrete mixer trucks.
5. **Automotive Import & Customs Logistics**: End-to-end multi-point inspected vehicle sourcing backed by our UAE sister company.
6. **Industrial Consumables & Supplies**: Manufacturing plant compressor lubricants, spare parts, and electrical components.

---

## 💻 Tech Stack & Architecture

- **Core**: Vanilla JavaScript (ES Modules, zero heavy runtime overhead)
- **Structure**: HTML5 with semantic hierarchy, structured data (`schema.org/AutomotiveBusiness`), OpenGraph & Twitter cards
- **Styling**: Vanilla CSS Design Tokens (`tokens.css`, `base.css`, `components.css`, `animations.css`)
- **Asset Pipeline**: 100% WebP image format, responsive dimensions, native lazy loading, async decoding
- **Build Tool**: Vite `v5.4.21`

---

## 📂 Project Structure

```
.
├── public/
│   ├── favicon.svg               # Vector brand mark
│   ├── robots.txt                # Search crawler instructions
│   ├── sitemap.xml               # XML sitemap with all core sections
│   └── images/                   # 40 curated, optimized WebP assets
│       ├── brilliant-bronze_Large-Landscape.webp
│       ├── GettyImages-2043061619-e1710106398958.webp
│       ├── Howo-Tx-Dump-Truck-6x4-1.webp
│       └── images (1..36).webp / images.webp
├── src/
│   ├── data/
│   │   ├── company.js            # Verified corporate background, vision & values
│   │   ├── gallery.js            # 40 cataloged media items with full metadata
│   │   ├── products.js           # Maxtorm batteries, Koryo oils, Howo machinery data
│   │   ├── solutions.js          # Six strategic business solution pillars
│   │   └── vehicles.js           # EV models with technical specifications & disclaimers
│   ├── js/
│   │   ├── app.js                # Application entry point & event wiring
│   │   ├── galleryLightbox.js    # Filterable grid & accessible keyboard lightbox
│   │   ├── inquiryForm.js        # RFQ submission, honeypot & dual-channel fallbacks
│   │   ├── navigation.js         # Sticky navbar, drawer & smooth scrolling
│   │   ├── productShowcase.js    # Tab-switched catalog with deep-link support
│   │   ├── sourcingMap.js        # Conceptual international trade flow map
│   │   └── vehiclesShowcase.js   # Vehicle cards & accessible spec modal drawer
│   └── styles/
│       ├── tokens.css            # Colors, typography, spacing, border radii
│       ├── base.css              # Reset, typography, section wrappers, buttons
│       ├── components.css        # Navbar, hero, cards, forms, modals, footer, mobile bar
│       └── animations.css        # Subtle transitions respecting prefers-reduced-motion
├── index.html                    # Single-page corporate platform
├── package.json                  # Scripts and dependencies
├── AUDIT.md                      # Comprehensive technical audit & asset verification
├── SYSTEM_MAP.md                 # Architectural map, diagrams, and lifecycle
└── README.md                     # Project documentation
```

---

## 🛠️ Development & Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates production-optimized output in the `/dist` directory.

### 4. Environment Configuration
To connect the RFQ form to a custom webhook or Formspree endpoint, create a `.env` file (never commit this file):
```env
VITE_FORM_ENDPOINT=https://formspree.io/f/your_form_id
```

---

## 🛡️ Security & Privacy

- Safe DOM rendering prevents XSS vulnerabilities.
- Anti-spam honeypot filtering protects lead generation from automated bot submissions.
- Secrets, `.env` files, and local credentials are strictly excluded via `.gitignore`.

---

## 📄 License & Attribution

© 2016 - 2026 Kabod Motors (Kabod Trading). All Rights Reserved.  
All third-party brand names, trademarks, and logos (BYD, Toyota, Sinotruk, Sebang Global Battery, Koryo Oil) are the property of their respective trademark holders and referenced solely for commercial identification and sourcing capability representation.

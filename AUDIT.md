# Kabod Motors Website — Technical Audit & System Verification

## 1. Project Overview
- **Project Name**: Kabod Motors Corporate Website (`kabod-motors-corporate-website`)
- **Primary Domain/Entity**: Kabod Motors / Kabod Trading (Established 2016, Addis Ababa, Ethiopia)
- **Framework / Core Tech**: Vanilla JavaScript (ES Modules), HTML5 Semantic Structure, Vanilla CSS Design System with CSS Custom Properties (Tokens)
- **Build Tool / Bundler**: Vite `v5.4.21`
- **Asset Pipeline**: 100% WebP image format, responsive sizes, lazy-loading
- **Conversion Funnel**: Asynchronous RFQ submission with automated mailto and WhatsApp failover dispatch

---

## 2. Information Architecture & Verification Tiers

The site content is partitioned into two distinct verification tiers to eliminate false-advertising and inventory representation risks:

### Tier A: Verified Corporate Facts (Directly Sourced from Company Profile PDF)
- **Legal Entity**: Kabod Motors / Kabod Trading
- **Founder**: Abiy Belay Belete
- **Incorporation Date**: 2016 with initial paid-up capital of Birr 2,000,000
- **Equity Expansion**: Expanded to approx. Birr 8.6 Million (documented as of July 7, 2019)
- **Head Office Address**: Jacros Area, Around Faith Bible International Church – Good News Chapel, Bole Sub-City, Addis Ababa, Ethiopia
- **Verified Contacts**:
  - Telephone: `+251-911235960`
  - Fax: `+251-130295151`
  - Official Email: `Kabodtrading094@gmail.com`
- **International Presence**: UAE Sister Company coordinating regional trade, logistics, and customs staging
- **Governance**: Managing Director -> General Manager -> Business Directorate, Commercial & Marketing Directorate, Finance/Admin/HCM Directorate

### Tier B: Representative Sourcing Capabilities (Import on Order)
- **Scope**: Specific vehicle models (BYD Yangwang U8, Sealion 7, Atto 3, Song Plus EV, Seagull, Atto 2, Toyota bZ4X), energy storage technologies (Maxtorm Korea / Sebang AGM/EFB/SMF), synthetic lubricants (Koryo Oil Korea), and heavy construction machinery (Sinotruk Howo 6x4 tippers and transit mixers).
- **Commercial Framing**: Explicitly designated as **"Representative Sourcing Portfolio — Available for Import on Client Order"**.
- **Disclaimers & Trademarks**: Every vehicle card, product tab, specification modal, gallery item, and footer contains clear disclosures stating that inventory, trim specifications, and pricing are confirmed on custom quotation. All manufacturer trademarks are property of their respective trademark holders.

---

## 3. Product & Vehicle Catalog

| Item Name | Category | Primary Asset | Specs Available | Status / Framing | Sourcing Channel |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BYD Yangwang U8** | Luxury Off-Road EV | `GettyImages-2043061619-...webp` | Yes (1,180 HP, e⁴ Quad-Motor) | **Representative Portfolio** | Custom Order / Asian Hubs |
| **BYD Sealion 7** | Mid-Size SUV EV | `images (2).webp` | Yes (CTB, e-Platform 3.0 Evo) | **Representative Portfolio** | Custom Order / Asian Hubs |
| **BYD Atto 3** | Compact Crossover EV | `images (1).webp` | Yes (Blade Battery, 420 km WLTP) | **Representative Portfolio** | Custom Order / Asian Hubs |
| **BYD Song Plus EV** | Executive SUV EV | `images (3).webp` | Yes (71.8/87.0 kWh, Ocean-X) | **Representative Portfolio** | Custom Order / Asian Hubs |
| **BYD Seagull** | Urban Hatchback EV | `images (4).webp` | Yes (30.08/38.88 kWh, 305-405 km) | **Representative Portfolio** | Custom Order / Asian Hubs |
| **BYD Atto 2 (Yuan UP)**| Subcompact SUV EV | `images (9).webp` | Yes (32/45.12 kWh, 301-401 km) | **Representative Portfolio** | Custom Order / Asian Hubs |
| **Toyota bZ4X** | Electric Crossover | `brilliant-bronze_Large-...webp` | Yes (e-TNGA, X-MODE AWD) | **Representative Portfolio** | Custom Order / Global |
| **Maxtorm AGM** | Start-Stop Battery | `images (29).webp` | Yes (VRLA AGM, 60-105 Ah) | **Representative Portfolio** | Sebang Korea Channel |
| **Maxtorm Gold-ISS** | EFB Battery | `images (33).webp` | Yes (N-55/65/70, S-95) | **Representative Portfolio** | Sebang Korea Channel |
| **Maxtorm Silver SMF**| Maintenance-Free Bat | `images (30).webp` | Yes (Calcium-Lead, MF95D26L) | **Representative Portfolio** | Sebang Korea Channel |
| **Koryo SN 5W-50** | Synthetic Engine Oil | `images (21).webp` | Yes (API SN, 4L Can) | **Representative Portfolio** | Koryo South Korea |
| **Koryo GOLD 5W-30** | Dual Petrol/Diesel | `images (23).webp` | Yes (API SL, ACEA A3/B4, 4L) | **Representative Portfolio** | Koryo South Korea |
| **Koryo SP 10W-30** | ILSAC GF-6A Oil | `images (25).webp` | Yes (API SP, LSPI Protection, 4L)| **Representative Portfolio** | Koryo South Korea |
| **Koryo Compressor Oil**| Industrial Fluid (20L)| `images (22).webp` | Yes (ISO VG 32/46/68, 20L Pail) | **Representative Portfolio** | Koryo South Korea |
| **Koryo LSD 80W-90** | Gear & Axle Oil | `images (27).webp` | Yes (API GL-5, Limited Slip, 4L) | **Representative Portfolio** | Koryo South Korea |
| **Koryo 4T MOTO 10W-40**| Motorcycle Oil | `images (24).webp` | Yes (API SN, JASO MB, 4L Jug) | **Representative Portfolio** | Koryo South Korea |
| **Sinotruk Howo TX** | 6x4 Dump Truck | `Howo-Tx-Dump-Truck-6x4-1.webp` | Yes (336-400 HP, 25-30T Payload)| **Representative Portfolio** | Sinotruk Channel |
| **Sinotruk Concrete Mixer**| Transit Batching Truck| `images (17).webp` | Yes (9-12 m³ Drum, Closed Hydr.)| **Representative Portfolio** | Sinotruk Channel |

---

## 4. Image Pipeline & Asset Optimization
- **Asset Count**: 40 curated assets
- **Format**: 100% WebP (`.webp`) format across hero, solutions, product tabs, and media lightbox.
- **Loading Strategy**:
  - Flagship hero asset has `fetchpriority="high"`.
  - All gallery and catalog items use native `loading="lazy"` and `decoding="async"`.
  - Explicit `width` and `height` dimensions prevent layout shifts (CLS = 0).
- **Attribution & Licensing**: Product imagery and manufacturer logos are displayed strictly under commercial reference and fair-use representation with prominent footer and modal disclaimers.

---

## 5. RFQ Conversion Funnel & Lead Protection
- **Form Architecture**:
  - Asynchronous JSON dispatch to configured endpoint (`VITE_FORM_ENDPOINT` or Formspree).
  - Active submitting state with loading spinner and button lock.
  - Success state with inquiry reference and confirmation.
- **Fail-Safe Fallback**:
  - If the endpoint encounters network errors or submission caps, the form automatically engages a dual-channel fallback:
    1. **Pre-populated Email** (`mailto:Kabodtrading094@gmail.com`) with complete RFQ payload.
    2. **Instant WhatsApp Dispatch** (+251911235960) with formatted inquiry details.
  - Zero dropped leads even during total API downtime or offline submissions.

---

## 6. Deep-Linking & UX Architecture
- **Tab State Synchronization**: `#products?tab=energy`, `#products?tab=lubricants`, `#products?tab=machinery` deep-links directly activate the respective catalog views.
- **Modal Deep-Linking**: `#vehicles?modal=yangwang-u8` opens the full technical specification drawer automatically.
- **Fallback UI**: Dynamic containers render informative fallback empty states if dataset arrays are empty.
- **Accessibility (a11y)**: Focus states, ARIA roles (`role="tab"`, `aria-selected`, `role="dialog"`), and full keyboard navigation (`Escape` to close modals, Arrow keys for gallery lightbox).

---

## 7. Known Limits & Production Deployment Readiness

### Operational Limits:
- **Formspree Free Tier**: Free Formspree forms have a 50 submissions/month cap. For enterprise volume, upgrade to Formspree Gold or configure a dedicated webhook in `VITE_FORM_ENDPOINT`.
- **Manufacturer Press Imagery**: While disclaimers protect commercial intent, replacing third-party press photos with Kabod's own warehouse and yard photography upon local arrival is recommended.

### Deployment Instructions:
1. Run `npm run build` to generate `/dist`.
2. Connect repository to Vercel, Netlify, or GitHub Pages.
3. If using a custom webhook or Formspree endpoint, add `VITE_FORM_ENDPOINT=https://formspree.io/f/your_form_id` in project environment variables.

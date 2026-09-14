# Kabod Motors — Client Content Update Guide

This guide explains how to update vehicle models, specifications, pricing notes, battery/lubricant products, and gallery images without altering application code.

---

## 1. Electric Vehicles Catalog (`src/data/vehicles.js`)

Each vehicle is represented as a JavaScript object inside the `electricVehicles` array.

### To Update an Existing Vehicle:
Open `src/data/vehicles.js` and locate the vehicle entry by `id` (e.g., `byd-atto-3`, `byd-sealion-7`, `yangwang-u8`).
- **Badge / Sourcing Note**: Modify the `badge` string (e.g. `"Flagship Luxury Off-Road (Import on Order)"`).
- **Short Overview**: Modify `shortPositioning` for homepage summary copy.
- **Key Highlights**: Edit items in the `keyHighlights` list (3-4 bullet points).
- **Manufacturer Technical Specs**: Update values inside the `manufacturerSpecs` object:
  - `drivetrain`, `totalPower`, `totalTorque`, `acceleration`, `topSpeed`, `batteryType`, `batteryCapacity`, `pureElectricRange`, `chargingTime`, etc.
- **Gallery Images**: Add or replace image paths pointing to `/images/<your-descriptive-image-name>.webp`.

### To Add a New Vehicle:
1. Place optimized WebP image(s) into `public/images/`. Use clean, lowercase names (e.g. `byd-tang-ev-exterior.webp`).
2. Duplicate an existing object in `src/data/vehicles.js`.
3. Give it a unique `id` (e.g. `byd-tang-ev`), vehicle `name`, category, and fill in `manufacturerSpecs`.

---

## 2. Energy, Lubricants & Heavy Machinery Products (`src/data/products.js`)

Products are split into three arrays:
1. **`maxtormBatteries`**:
   - `name`: Model name (e.g., `"Maxtorm Gold AGM Start-Stop (ISS)"`).
   - `badge`: Battery series tag (e.g., `"AGM Technology"`).
   - `specs`: Key technical metrics (voltage, capacity, CCA).
   - `image`: Image path in `/images/`.
2. **`koryoLubricants`**:
   - `name`: Lubricant grade (e.g., `"Koryo Gold 5W-30 Full Synthetic"`).
   - `badge`: API standard (e.g., `"API SP / ILSAC GF-6A"`).
   - `application`: Recommended engine/machinery type.
3. **`heavyMachinery`**:
   - `name`: Truck or mixer designation (e.g., `"Sinotruk Howo 6x4 Heavy Dump Truck"`).
   - `tonnage`, `enginePower`, `specs`: Capacity and job site highlights.

---

## 3. Media & Product Gallery (`src/data/gallery.js`)

All media items in the lightbox gallery are defined in the `galleryItems` array.

### To Add a Gallery Image:
1. Compress and place the new image in `public/images/<descriptive-name>.webp`.
2. In `src/data/gallery.js`, add an item:
```javascript
{
  id: "byd-tang-exterior-01",
  title: "BYD Tang EV — All-Wheel Drive Touring",
  category: "vehicles", // Options: "vehicles", "batteries", "lubricants", "machinery"
  tag: "Electric SUV",
  src: "/images/byd-tang-exterior-01.webp",
  caption: "Flagship 7-seater electric SUV for long-distance family and executive touring."
}
```

---

## 4. Company Profile & Strategic Overview (`src/data/company.js`)

- **Company Contacts**: Telephone, fax, official email (`Kabodtrading094@gmail.com`), physical office location in Addis Ababa (Jacros Area, Bole Sub-City).
- **Core Values & Milestones**: Founding history, strategic pillars, and governance structure labels.

---

## 5. Bilingual Text Strings (`src/data/i18n.js`)

To update English or Amharic translations for section titles, headers, form labels, or WhatsApp prompt copy:
1. Open `src/data/i18n.js`.
2. Locate the language key (`en` for English, `am` for Amharic).
3. Update the corresponding section string.

---

## 6. How to Deploy Updates
1. Save your edited files.
2. Run `npm run build` in your terminal to ensure there are no syntax errors.
3. Commit and push your changes to git:
   ```bash
   git add src/data/ public/images/
   git commit -m "content: update vehicle specs and catalog items"
   git push origin main
   ```
4. Vercel will automatically build and deploy the updated website to production.

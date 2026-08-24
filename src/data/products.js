/**
 * PRODUCTS DATA & TECHNICAL SPECIFICATIONS (Tier B)
 * Verified against local repository image assets.
 * 
 * Sourced:
 * 1. Maxtorm Batteries (Sebang Global Battery Co., Ltd., South Korea)
 * 2. Koryo Oil (South Korea)
 * 3. Sinotruk Howo Heavy Machinery (China)
 */

export const productDisclaimer = "Technical specifications derived from manufacturer documentation. Capacities, packaging, and certifications may vary by production batch and destination market. Contact Kabod Motors for verified local availability.";

export const maxtormBatteries = [
  {
    id: "maxtorm-agm",
    brand: "MAXTORM KOREA",
    manufacturer: "Sebang Global Battery Co., Ltd. (South Korea)",
    name: "Maxtorm AGM Start-Stop Battery",
    tagline: "Absorbent Glass Mat Technology for High Electrical Loads",
    image: "/images/images (29).jfif",
    diagramImage: "/images/images (35).jfif",
    badge: "AGM / Start-Stop",
    highlights: [
      "Engineered for modern vehicles equipped with regenerative braking & Start-Stop (ISS)",
      "3x to 4x higher cycle life compared to conventional flooded batteries",
      "Superior cold cranking amperage (CCA) in adverse temperature conditions",
      "100% sealed, spill-proof, and maintenance-free design"
    ],
    technicalData: {
      technology: "Absorbent Glass Mat (AGM) Sealed Valve-Regulated Lead-Acid (VRLA)",
      voltage: "12V",
      capacityRange: "60 Ah - 105 Ah options",
      ccaRating: "680A - 950A (EN/SAE)",
      gridAlloy: "Calcium-Tin High-Density Cast Grid with Reinforced Separator",
      vibrationResistance: "V3 / V4 Extreme Heavy-Duty Commercial Grade",
      origin: "Engineered & Manufactured in South Korea (Sebang Global Battery)"
    }
  },
  {
    id: "maxtorm-gold-iss",
    brand: "MAXTORM KOREA",
    manufacturer: "Sebang Global Battery Co., Ltd. (South Korea)",
    name: "Maxtorm Gold-ISS / EFB Series",
    tagline: "Enhanced Flooded Battery for Idling Stop System Vehicles",
    image: "/images/images (33).jfif",
    specLabelImage: "/images/images (32).jfif",
    badge: "Gold-ISS / EFB",
    highlights: [
      "Optimized for micro-hybrid ISS / Idling Stop vehicle applications",
      "Rapid charge acceptance for efficient energy recovery during driving",
      "High thermal stability engineered for warm African climatic conditions",
      "Reinforced carbon additive plates preventing active material shedding"
    ],
    technicalData: {
      technology: "Enhanced Flooded Battery (EFB) with Carbon Additive Tech",
      voltage: "12V",
      modelDesignations: "N-55, N-65, N-70 (B24L), S-95 (D26L), Q-85",
      capacityRange: "50 Ah - 90 Ah options",
      cycleDurability: "2x Standard Flooded Battery Life under frequent start cycles",
      origin: "South Korea"
    }
  },
  {
    id: "maxtorm-silver-smf",
    brand: "MAXTORM KOREA",
    manufacturer: "Sebang Global Battery Co., Ltd. (South Korea)",
    name: "Maxtorm Silver Sealed Maintenance-Free (SMF)",
    tagline: "High-Reliability Automotive & Commercial Starter Battery",
    image: "/images/images (30).jfif",
    boxedImage: "/images/images (31).jfif",
    badge: "Silver SMF",
    highlights: [
      "Zero water loss calcium-calcium expanded metal alloy technology",
      "Integrated magic-eye hydrometer for instant state-of-charge verification",
      "Built-in flame arrestor preventing external spark ignition",
      "High-impact polypropylene casing engineered for severe road vibration"
    ],
    technicalData: {
      technology: "Sealed Maintenance-Free (SMF) Calcium-Lead Alloy",
      voltage: "12V",
      models: "MF95D26L, S-120L, MF55D23L, MF80D26L, MF105D31L",
      electrolyte: "Sulfuric acid immobilized with specialized gas recombination lid",
      origin: "South Korea"
    }
  }
];

export const koryoLubricants = [
  {
    id: "koryo-sn-5w50",
    brand: "KORYO OIL",
    name: "Koryo SN 5W-50 Fully Synthetic Engine Oil",
    category: "High-Performance Passenger & Performance Lubricant",
    image: "/images/images (21).jfif",
    badge: "API SN • 5W-50",
    packSize: "4 Liters (Tin Can)",
    highlights: [
      "100% Fully Synthetic formulation for extreme thermal shear stability",
      "Wide viscosity index providing immediate cold-start protection and robust high-temp film strength",
      "Active detergent additives neutralizing combustion acids and preventing sludge",
      "Engineered for high-output turbocharged and naturally aspirated petrol engines"
    ],
    technicalData: {
      viscosityGrade: "SAE 5W-50",
      serviceCategory: "API SN",
      baseOil: "Group III / IV Synthetic Base Stocks",
      recommendedApplication: "High-performance gasoline passenger cars, SUVs, and high-heat operating environments",
      packaging: "4L Sealed Metallic Can",
      origin: "Made in South Korea"
    }
  },
  {
    id: "koryo-gold-5w30",
    brand: "KORYO OIL",
    name: "Koryo GOLD A3/B4 5W-30 Dual Engine Oil",
    category: "Dual Petrol & Diesel Passenger / Light Commercial Lubricant",
    image: "/images/images (23).jfif",
    badge: "API SL • ACEA A3/B4",
    packSize: "4 Liters (Tin Can)",
    highlights: [
      "Universal dual-fuel formulation engineered for both gasoline and light diesel engines",
      "Enhanced anti-wear zinc-phosphorus chemistry protecting camshaft and valve train",
      "Optimal fuel economy performance meeting international emission standards",
      "Exceptional oxidation resistance extending commercial drain intervals"
    ],
    technicalData: {
      viscosityGrade: "SAE 5W-30",
      serviceCategory: "API SL / CF, ACEA A3/B4",
      baseOil: "Premium Hydrocracked Synthetic",
      recommendedApplication: "Modern passenger cars, light commercial vans, petrol and common-rail diesel engines",
      packaging: "4L Sealed Metallic Can",
      origin: "Made in South Korea"
    }
  },
  {
    id: "koryo-sp-10w30",
    brand: "KORYO OIL",
    name: "Koryo SP 10W-30 ILSAC GF-6A Synthetic Oil",
    category: "Next-Gen Emission & Timing Chain Protection Lubricant",
    image: "/images/images (25).jfif",
    badge: "API SP • ILSAC GF-6A",
    packSize: "4 Liters (Tin Can)",
    highlights: [
      "Formulated to meet latest API SP specifications protecting against Low-Speed Pre-Ignition (LSPI)",
      "Superior timing chain wear protection and piston deposit control",
      "ILSAC GF-6A resource-conserving fuel efficiency enhancement",
      "Reduces exhaust catalyst poisoning and supports strict emissions compliance"
    ],
    technicalData: {
      viscosityGrade: "SAE 10W-30",
      serviceCategory: "API SP, ILSAC GF-6A",
      baseOil: "Advanced Synthetic Blend",
      recommendedApplication: "Modern direct-injection turbocharged (TGDI) and hybrid gasoline engines",
      packaging: "4L Sealed Metallic Can",
      origin: "Made in South Korea"
    }
  },
  {
    id: "koryo-compressor-oil",
    brand: "KORYO OIL",
    name: "Koryo Synthetic Rotary Screw Compressor Oil (20L)",
    category: "Industrial Machinery & Manufacturing Fluid",
    image: "/images/images (22).jfif",
    badge: "Industrial Long-Life",
    packSize: "20 Liters (Heavy-Duty Pail)",
    highlights: [
      "Synthetic long-life formulation engineered for stationary rotary screw air compressors",
      "Exceptional air release and low foaming tendencies preventing cavitation",
      "Outstanding water demulsibility allowing rapid separation in condensate traps",
      "Extended service life up to 4,000 - 8,000 operational hours"
    ],
    technicalData: {
      viscosityGrade: "ISO VG 32 / 46 / 68 equivalent",
      baseOil: "Synthetic Polyalphaolefin (PAO) / Ester Blend",
      recommendedApplication: "Industrial rotary screw, vane, and centrifugal compressors in manufacturing plants",
      packaging: "20L Industrial Steel Pail with Carry Handle",
      origin: "Made in South Korea"
    }
  },
  {
    id: "koryo-lsd-80w90",
    brand: "KORYO OIL",
    name: "Koryo LSD 80W-90 API GL-5 Axle & Gear Oil",
    category: "Heavy-Duty Drivetrain & Differential Lubricant",
    image: "/images/images (27).jfif",
    badge: "API GL-5 • LSD",
    packSize: "4 Liters (Tin Can)",
    highlights: [
      "Extreme-pressure hypoid gear lubricant formulated with Limited Slip Differential (LSD) friction modifiers",
      "Protects heavily loaded gears against scuffing, pitting, and spalling under shock loads",
      "Suppresses chatter and vibration in multi-plate limited slip differentials",
      "Excellent seal compatibility preventing oil leaks in heavy commercial axles"
    ],
    technicalData: {
      viscosityGrade: "SAE 80W-90",
      serviceCategory: "API GL-5, Limited Slip (LSD), MIL-L-2105D",
      baseOil: "Heavy-Duty Extreme-Pressure Mineral / Synthetic Blend",
      recommendedApplication: "Commercial truck axles, differentials, transfer cases, and heavy machinery final drives",
      packaging: "4L Sealed Metallic Can",
      origin: "Made in South Korea"
    }
  },
  {
    id: "koryo-4t-moto",
    brand: "KORYO OIL",
    name: "Koryo 4T MOTO 10W-40 Scooter & Motorcycle Oil",
    category: "4-Stroke Small Engine Lubricant",
    image: "/images/images (24).jfif",
    badge: "API SN • JASO MB",
    packSize: "4 Liters (Ergonomic Jug)",
    highlights: [
      "Specialized low-friction additive chemistry tailored for 4-stroke scooters and automatic motorcycles",
      "JASO MB specification minimizing internal engine friction for maximum fuel economy",
      "High thermal resistance in air-cooled high-RPM urban stop-and-go conditions",
      "Keeps combustion chambers and pistons clean of carbon buildup"
    ],
    technicalData: {
      viscosityGrade: "SAE 10W-40",
      serviceCategory: "API SN, JASO MB (For automatic scooters and dedicated 4T engines)",
      packaging: "4L Ergonomic Plastic Jug with Measurement Scale",
      origin: "Made in South Korea"
    }
  }
];

export const heavyMachinery = [
  {
    id: "howo-tx-dump-truck",
    brand: "SINOTRUK HOWO",
    name: "Howo TX Heavy-Duty Dump Truck 6x4",
    category: "Heavy Construction & Mining Hauler",
    image: "/images/Howo-Tx-Dump-Truck-6x4-1.webp",
    galleryImages: [
      "/images/Howo-Tx-Dump-Truck-6x4-1.webp",
      "/images/images (15).jfif",
      "/images/images (16).jfif"
    ],
    badge: "6x4 • Heavy Hauler",
    highlights: [
      "Reinforced multi-leaf spring suspension engineered for harsh off-highway quarry roads",
      "High-torque Weichai / MAN technology engine with high power-to-weight ratio",
      "High-strength wear-resistant steel dump box with hydraulic front-tipping hoist",
      "Ergonomic cabin with air suspension seat and high visibility layout"
    ],
    technicalData: {
      driveType: "6x4 (Three Axles, Tandem Rear Drive)",
      enginePower: "336 HP - 400 HP options",
      transmission: "10-speed manual with synchromesh and PTO",
      payloadCapacity: "25 - 30 Metric Tons",
      dumpBoxVolume: "18 - 22 m³ (High-strength manganese steel)",
      rearAxles: "HC16 / AC16 Heavy Hub Reduction Axles with Differential Locks",
      fuelTank: "300L - 400L Aluminum Alloy"
    }
  },
  {
    id: "howo-mixer-truck",
    brand: "SINOTRUK HOWO",
    name: "Howo High-Capacity Concrete Mixer Truck",
    category: "Transit Concrete Batching & Infrastructure Vehicle",
    image: "/images/images (17).jfif",
    galleryImages: [
      "/images/images (17).jfif",
      "/images/images (18).jfif",
      "/images/images (19).jfif",
      "/images/images (20).jfif"
    ],
    badge: "Concrete Mixer • 6x4 / 8x4",
    highlights: [
      "High-capacity wear-resistant spiral blade mixing drum ensuring homogenous batching",
      "High-reliability closed hydraulic pump and motor system with integrated oil cooling",
      "Pressurized water tank with washing system for quick job-site chute cleaning",
      "Robust double-reduction axles capable of navigating muddy construction sites"
    ],
    technicalData: {
      driveConfiguration: "6x4 or 8x4 Heavy-Duty Chassis",
      mixingDrumCapacity: "9 m³ - 12 m³ geometric capacity",
      drumMaterial: "High-Strength Alloy Wear-Resistant Steel Plates",
      hydraulicSystem: "Eaton / Rexroth hydraulic pump, motor, and planetary reducer",
      dischargeSpeed: "≥ 2.0 m³/min with residual rate < 0.5%",
      waterSupplySystem: "Pneumatic pressurized water tank (400L)"
    }
  }
];

export interface CarPart {
  id: string;
  name: string;
  category: 'Fuel System' | 'Electrical' | 'Braking' | 'Engine' | 'Suspension' | 'Cooling' | 'Ignition';
  manufacturer: string;
  oemNumbers: string[];
  estimatedPrice: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  laborHours: string;
  confidence: number;
  description: string;
  compatibility: string;
  symptoms: string[];
  toolsNeeded: string[];
  imageSrc: string;
  replacementInterval: string;
}

export interface VehicleModel {
  id: string;
  make: string;
  model: string;
  year: string;
  trim: string;
  bodyStyle: string;
  engine: string;
  horsepower: string;
  tireSize: string;
  commonParts: string[];
  confidence: number;
  imageSrc: string;
}

export interface BrandInfo {
  name: string;
  country: string;
  founded: string;
  slug: string;
  popularModels: string[];
  oemCodeFormat: string;
  topParts: string[];
  accentColor: string;
}

export const AUTOMOTIVE_BRANDS: BrandInfo[] = [
  {
    name: 'Ford',
    country: 'USA',
    founded: '1903',
    slug: 'ford-part-identifier',
    popularModels: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Ranger'],
    oemCodeFormat: 'Prefix-BasicPart-Suffix (e.g. FL-500S, 8L3Z-18124-B)',
    topParts: ['Oil Filters (Motorcraft FL-820S)', 'Spark Plugs (SP-546)', 'Cam Phaser Solenoids', 'Brake Pads'],
    accentColor: '#003478',
  },
  {
    name: 'Toyota',
    country: 'Japan',
    founded: '1937',
    slug: 'toyota-part-identifier',
    popularModels: ['Camry', 'Corolla', 'RAV4', 'Tacoma', 'Highlander'],
    oemCodeFormat: '10 or 12 digits (e.g. 90915-YZZN1, 04465-06100)',
    topParts: ['Denso Alternator', 'Oil Filter Cartridge', 'Front Brake Rotors', 'MAF Sensor'],
    accentColor: '#EB0A1E',
  },
  {
    name: 'Nissan',
    country: 'Japan',
    founded: '1933',
    slug: 'nissan-part-identifier',
    popularModels: ['Altima', 'Rogue', 'Sentra', 'Frontier', 'GT-R'],
    oemCodeFormat: '5+5 alphanumeric (e.g. 15208-65F0E, 22448-ED000)',
    topParts: ['CVT Fluid NS-3', 'Ignition Coil Packs', 'Camshaft Position Sensor', 'Brake Calipers'],
    accentColor: '#C3002F',
  },
  {
    name: 'Volkswagen',
    country: 'Germany',
    founded: '1937',
    slug: 'volkswagen-part-identifier',
    popularModels: ['Golf GTI', 'Jetta', 'Tiguan', 'Passat', 'Atlas'],
    oemCodeFormat: '9-character format (e.g. 06L 115 562 B, 1K0 615 301 T)',
    topParts: ['DSG Clutch Assembly', 'PCV Breather Valve', 'Water Pump Housing', 'Ignition Coils'],
    accentColor: '#001E50',
  },
  {
    name: 'BMW',
    country: 'Germany',
    founded: '1916',
    slug: 'bmw-part-identifier',
    popularModels: ['330i', 'M3', 'X5', '540i', 'M5'],
    oemCodeFormat: '11 digits (e.g. 11 42 8 575 211, 34 11 6 864 060)',
    topParts: ['VANOS Solenoid', 'Electric Water Pump', 'Brembo Brake Rotors', 'Charge Pipe'],
    accentColor: '#0066B1',
  },
  {
    name: 'Mercedes-Benz',
    country: 'Germany',
    founded: '1926',
    slug: 'mercedes-part-identifier',
    popularModels: ['C300', 'E350', 'GLC 300', 'GLE 450', 'S580'],
    oemCodeFormat: 'Letter A + 10 digits (e.g. A 270 180 01 09)',
    topParts: ['Conductor Plate', 'Auxiliary Battery', 'Air Suspension Strut', 'Fuel Injectors'],
    accentColor: '#00ADEF',
  },
  {
    name: 'Honda',
    country: 'Japan',
    founded: '1948',
    slug: 'honda-part-identifier',
    popularModels: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
    oemCodeFormat: '5-3-3 pattern (e.g. 15400-PLM-A02, 45022-T2G-A01)',
    topParts: ['VTEC Spool Valve', 'Engine Mounts', 'Starter Motor', 'Cabin & Air Filters'],
    accentColor: '#E40521',
  },
  {
    name: 'Audi',
    country: 'Germany',
    founded: '1909',
    slug: 'audi-part-identifier',
    popularModels: ['A4', 'A6', 'Q5', 'Q7', 'S4'],
    oemCodeFormat: 'VAG standard (e.g. 06E 115 562 C, 8K0 698 151 F)',
    topParts: ['Timing Chain Tensioner', 'High Pressure Fuel Pump', 'Control Arm Bushing Kit'],
    accentColor: '#BB0A30',
  },
  {
    name: 'Chevrolet',
    country: 'USA',
    founded: '1911',
    slug: 'chevrolet-part-identifier',
    popularModels: ['Silverado 1500', 'Corvette', 'Equinox', 'Tahoe', 'Malibu'],
    oemCodeFormat: '8-digit ACDelco number (e.g. 12673134, 19330123)',
    topParts: ['AFM Lifters', 'Transmission Solenoid Pack', 'Wheel Hub Bearings', 'Water Pump'],
    accentColor: '#D1A300',
  },
  {
    name: 'Tata Motors',
    country: 'India',
    founded: '1945',
    slug: 'tata-part-identifier',
    popularModels: ['Nexon', 'Harrier', 'Safari', 'Punch', 'Prima Commercial'],
    oemCodeFormat: 'Numeric 12-digit (e.g. 2786 0710 0104)',
    topParts: ['Fuel/Water Separator Unit', 'Turbocharger Cartridge', 'Clutch Master Cylinder', 'Diesel Injectors'],
    accentColor: '#00539C',
  }
];

export const SAMPLE_PARTS: CarPart[] = [
  {
    id: 'sample-fuel-water-separator',
    name: 'High Performance Fuel/Water Separator',
    category: 'Fuel System',
    manufacturer: 'TATA Genuine / Fleetguard',
    oemNumbers: ['2786 0710 0104', 'FS19732', 'TATA-D44901'],
    estimatedPrice: '$48 - $75',
    difficulty: 'Moderate',
    laborHours: '0.5 - 1.0 hr',
    confidence: 100,
    description: 'Heavy-duty diesel fuel and water separator filter assembly engineered to coalesce and drain suspended water and particulate contamination before diesel fuel enters the high-pressure common-rail injection pump. Essential for preventing pump cavitation, injector tip corrosion, and engine stutter.',
    compatibility: 'TATA Xenon, Safari, Harrier Diesel, Fleetguard Commercial Platforms, Cummins 4B/6B conversions.',
    symptoms: [
      'Water in Fuel dash warning indicator illuminated',
      'Engine hesitation, sputtering or loss of power under acceleration',
      'Hard start or prolonged cranking in cold weather',
      'Black smoke or irregular idle due to contaminated diesel'
    ],
    toolsNeeded: [
      'Filter strap wrench',
      'Fuel drain catch basin',
      '10mm socket and ratchet',
      'Clean diesel fuel for pre-priming',
      'Nitrile gloves & safety glasses'
    ],
    replacementInterval: 'Every 15,000 to 20,000 miles (or every 2nd oil change)',
    imageSrc: '', // Assigned dynamically in component
  },
  {
    id: 'sample-alternator',
    name: '150-Amp High Output Alternator',
    category: 'Electrical',
    manufacturer: 'Denso / Bosch OEM',
    oemNumbers: ['104210-4470', '27060-31010', 'AL0844N'],
    estimatedPrice: '$165 - $280',
    difficulty: 'Moderate',
    laborHours: '1.2 - 2.0 hrs',
    confidence: 98.7,
    description: 'Brushless dual-internal fan high output alternator with integrated solid-state voltage regulator. Supplies 12-14.4V DC to vehicle electronics while continuously recharging the primary battery during engine operation.',
    compatibility: 'Toyota Camry, RAV4 2.5L / 3.5L, Lexus ES350, Honda Accord V6, Ford Explorer 3.5L.',
    symptoms: [
      'Battery dashboard light glowing while engine is running',
      'Dimming headlights or erratic gauge needles at idle',
      'Burning rubber smell from belt slippage or overheated diode',
      'Dead battery after leaving car parked overnight'
    ],
    toolsNeeded: [
      'Serpentine belt tensioner tool',
      '12mm & 14mm sockets and extension',
      'Digital multimeter (to verify 13.8V-14.5V output)',
      '10mm battery terminal wrench'
    ],
    replacementInterval: 'Typically 100,000 to 150,000 miles',
    imageSrc: '',
  },
  {
    id: 'sample-brake-caliper',
    name: 'Dual-Piston Performance Front Brake Caliper',
    category: 'Braking',
    manufacturer: 'Brembo / Akebono',
    oemNumbers: ['09.A427.11', '34116799469', 'BRC-88210'],
    estimatedPrice: '$110 - $210',
    difficulty: 'Moderate',
    laborHours: '1.5 - 2.5 hrs',
    confidence: 99.2,
    description: 'Precision cast aluminum twin-piston floating brake caliper with heat-resistant EPDM rubber dust boots and anti-rattle clips. Clamps brake pads directly against the rotor via hydraulic pressure from the master cylinder.',
    compatibility: 'BMW 3-Series (F30/G20), Audi A4/A5 Quattro, Volkswagen Golf R, Subaru WRX STI.',
    symptoms: [
      'Car pulling strongly to one side when applying brakes',
      'Excessive heat or burning smell coming from one wheel well',
      'Soft or spongy brake pedal feel due to leaking seal',
      'Uneven pad wear (inner pad worn down to metal while outer is full)'
    ],
    toolsNeeded: [
      'Brake line flare nut wrench (10mm/11mm)',
      'Brake caliper piston compression tool or C-clamp',
      'DOT 4 brake fluid & one-man bleeder bottle',
      '17mm mounting bracket socket & torque wrench'
    ],
    replacementInterval: 'Replace upon leaking, stuck slide pins, or piston seizure (approx 100k miles)',
    imageSrc: '',
  },
  {
    id: 'sample-turbocharger',
    name: 'Twin-Scroll Ball Bearing Turbocharger Assembly',
    category: 'Engine',
    manufacturer: 'Garrett / BorgWarner',
    oemNumbers: ['775517-5002S', '06K145702K', '53039880290'],
    estimatedPrice: '$650 - $1,150',
    difficulty: 'Difficult',
    laborHours: '4.0 - 6.0 hrs',
    confidence: 97.4,
    description: 'Forced-induction turbocharger with twin-scroll turbine housing, billet forged compressor wheel, and electronic wastegate actuator. Forces compressed ambient air into combustion chambers to significantly boost engine horsepower and torque efficiency.',
    compatibility: 'Volkswagen 2.0T TSI Gen3, Audi A4/Q5 2.0 TFSI, Ford 2.3L EcoBoost, BMW N20/B48.',
    symptoms: [
      'Loud siren, whining, or dentist-drill noise under boost',
      'Excessive blue/gray exhaust smoke from oil seal blow-by',
      'P0299 Underboost check engine error code',
      'Noticeable sluggish acceleration and lag'
    ],
    toolsNeeded: [
      'E-Torx sockets & metric Allen keys',
      'Turbo oil feed line replacement kit',
      'New copper crush washers and manifold gaskets',
      'Torque wrench (accurate down to 10 Nm)'
    ],
    replacementInterval: '120,000 - 160,000 miles (with frequent synthetic oil changes)',
    imageSrc: '',
  }
];

export const CATALOG_DATABASE = [
  ...SAMPLE_PARTS,
  {
    id: 'cat-spark-plug',
    name: 'Laser Iridium Spark Plug Set',
    category: 'Ignition' as const,
    manufacturer: 'NGK / Denso',
    oemNumbers: ['ILKAR7B11', '90919-01253', 'SK20R11'],
    estimatedPrice: '$32 - $55 (Pack of 4)',
    difficulty: 'Easy' as const,
    laborHours: '0.5 - 1.0 hr',
    confidence: 99.8,
    description: 'Ultra-fine 0.6mm iridium center electrode and platinum tipped ground electrode ensuring consistent high-energy spark across all RPM ranges.',
    compatibility: 'Toyota, Honda, Nissan, Subaru 4-cylinder and V6 engines.',
    symptoms: ['Engine misfire codes (P0300 - P0304)', 'Rough idle at red lights', 'Decreased fuel economy (MPG)'],
    toolsNeeded: ['5/8" magnetic spark plug socket', 'Ratchet extension bar', 'Gap measurement tool'],
    replacementInterval: '60,000 - 100,000 miles',
    imageSrc: '',
  },
  {
    id: 'cat-oxygen-sensor',
    name: 'Upstream Air/Fuel Ratio Oxygen Sensor',
    category: 'Electrical' as const,
    manufacturer: 'Bosch / NTK',
    oemNumbers: ['15733', '234-9041', '22693-1AA0A'],
    estimatedPrice: '$85 - $140',
    difficulty: 'Moderate' as const,
    laborHours: '0.8 - 1.5 hrs',
    confidence: 98.1,
    description: 'Wideband zirconia ceramic lambda sensor that measures exhaust oxygen content to allow the ECU to dynamically optimize air-fuel ratio.',
    compatibility: 'Universal across 95% of gasoline OBD-II passenger vehicles.',
    symptoms: ['P0420 / P0135 Check Engine Code', 'Poor fuel economy', 'Failed emissions inspection'],
    toolsNeeded: ['7/8" (22mm) slotted oxygen sensor socket', 'Penetrating oil (PB Blaster)', 'Anti-seize thread paste'],
    replacementInterval: '80,000 - 100,000 miles',
    imageSrc: '',
  },
  {
    id: 'cat-radiator',
    name: 'Aluminum Core Engine Cooling Radiator',
    category: 'Cooling' as const,
    manufacturer: 'Denso / TYC',
    oemNumbers: ['221-3142', '16400-0V020', 'CU2958'],
    estimatedPrice: '$120 - $210',
    difficulty: 'Moderate' as const,
    laborHours: '2.0 - 3.0 hrs',
    confidence: 97.9,
    description: 'High-density aluminum tube and fin radiator with glass-filled polymer tanks for rapid heat exchange with passing air.',
    compatibility: 'Ford F-150, Chevy Silverado, Toyota Tundra, Dodge Ram.',
    symptoms: ['Engine temperature gauge climbing in traffic', 'Puddle of sweet-smelling green/orange coolant', 'Visible cracked plastic tank seams'],
    toolsNeeded: ['Hose clamp pliers', 'Coolant funnel spill-free kit', 'Drain pan', 'Metric socket set'],
    replacementInterval: '100,000 - 150,000 miles',
    imageSrc: '',
  },
  {
    id: 'cat-control-arm',
    name: 'Front Lower Control Arm with Ball Joint',
    category: 'Suspension' as const,
    manufacturer: 'Moog / Lemförder',
    oemNumbers: ['RK620566', '48068-06070', 'CMS861036'],
    estimatedPrice: '$75 - $145',
    difficulty: 'Difficult' as const,
    laborHours: '2.5 - 3.5 hrs',
    confidence: 96.5,
    description: 'Heavy duty stamped steel A-arm with pre-pressed elastomeric vibration dampening bushings and sealed greasable ball joint.',
    compatibility: 'Honda Civic, Accord, Toyota Camry, Ford Fusion, Subaru Outback.',
    symptoms: ['Clunking noise over bumps or potholes', 'Vibration in steering wheel at highway speeds', 'Uneven front tire shoulder wear'],
    toolsNeeded: ['Ball joint separator / pickle fork', 'Breaker bar (1/2" drive)', 'Floor jack & jack stands', 'Torque wrench'],
    replacementInterval: '80,000 - 120,000 miles',
    imageSrc: '',
  }
];

export const BLOG_POSTS = [
  {
    id: 'diesel-fuel-separator-guide',
    title: 'How to Inspect and Drain a Diesel Fuel/Water Separator',
    snippet: 'Water in diesel is the #1 killer of common rail injectors. Learn how to purge accumulated water and replace the secondary coalescing filter before catastrophic pump damage occurs.',
    author: 'Chief Master Tech Marcus Vance',
    readTime: '6 min read',
    date: 'Oct 2, 2026',
    category: 'Preventative Maintenance',
    content: `Water contamination in diesel fuel can ruin a $3,000 common rail injection system in a matter of weeks. Diesel fuel naturally attracts condensation from storage tanks, temperature fluctuations, and humidity.

    ### Why It Matters
    Unlike gasoline engines which run at 40-60 PSI, modern common-rail diesel engines inject fuel at upwards of 29,000 PSI (2,000 bar). Tolerances inside the injector needle and spool valve are measured in microns. When water passes through:
    1. It eliminates lubrication (diesel fuel is its own lubricant).
    2. It creates rapid cavitation and localized pitting.
    3. Flash vaporization creates extreme pressure spikes that shear nozzle tips.

    ### How to Drain It Monthly
    1. Locate the bowl at the bottom of your separator filter.
    2. Place a clean glass jar or drain pan directly below the drain petcock.
    3. Twist the valve counter-clockwise by 1-2 turns.
    4. Allow fluid to drain until pure, golden diesel flows without milky bubbles.
    5. Hand-tighten the petcock firmly.`
  },
  {
    id: 'alternator-diagnostic-guide',
    title: 'Alternator vs. Battery: 5 Quick Tests With a $15 Multimeter',
    snippet: 'Before you spend $200 on an unnecessary battery replacement, use these exact voltage drop tests to pinpoint whether your alternator diode bridge has failed.',
    author: 'Elena Rostova, ASE Certified Master Electrician',
    readTime: '5 min read',
    date: 'Sep 28, 2026',
    category: 'Electrical Troubleshooting',
    content: `A dead battery in the morning is frustrating, but replacing it only to have the new battery die three days later is worse. Here is how to verify charging system health in 5 minutes:

    ### 1. Resting Battery Voltage Test
    With the vehicle off for at least 1 hour, touch your multimeter leads to the battery terminals:
    - 12.6V - 12.8V: 100% Charged
    - 12.2V: ~50% Charged
    - Under 12.0V: Severely discharged or bad cell

    ### 2. Engine Running Charging Test
    Start the engine and hold idle at 1,500 RPM. Measure voltage across battery terminals:
    - Healthy alternator: **13.8V to 14.5V**
    - Weak or failing alternator: **Under 13.2V**
    - Overcharging (dead regulator): **Above 15.1V** (can boil battery acid)`
  },
  {
    id: 'ai-vision-auto-repair-evolution',
    title: 'How AI Computer Vision Is Solving the Obsolete OEM Part Crisis',
    snippet: 'Discover how neural vision models compare bolt hole patterns, casting numbers, and flange geometries to match aftermarket cross-references in seconds.',
    author: 'Dr. Sanjay Patel, Automotive Vision Systems',
    readTime: '8 min read',
    date: 'Sep 15, 2026',
    category: 'Technology & AI',
    content: `Finding a replacement part for a 15-year-old vehicle or a foreign market commercial platform used to require hours of flipping through dusty microfiche or deciphering rusted casting stamps.

    Modern convolutional and multimodal neural networks are trained on millions of 3D CAD models, OEM service microfiche, and salvage yard teardowns. By analyzing:
    - Number of mounting ears and bolt spacing
    - Inlet/outlet bore diameter
    - Sensor connector pin count and keyway orientation
    - Casting flange ribs

    Our AI model reaches over 98% accuracy even when greasy, rusted, or partially obscured.`
  }
];

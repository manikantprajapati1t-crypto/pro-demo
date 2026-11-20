export interface BrandConfig {
  name: string;
  tagline: string;
  fullTitle: string;
  estYear: string;
  heroHeadline: string;
  heroSubheadline: string;
  artisanHeadline: string;
  heritageHeadline: string;
  whatsappNumber: string;
  email: string;
  phoneDisplay: string;
  atelierLocation: string;
  freeShippingThresholdINR: number;
  instagramHandle: string;
  colors: {
    forestGreen: string;
    warmIvory: string;
    burntTerracotta: string;
  };
}

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  name: 'KARIGAR',
  tagline: 'The Art of Indian Craft',
  fullTitle: 'KARIGAR — The Art of Indian Craft',
  estYear: 'MMXXV',
  heroHeadline: 'Every Creation Has A Story.',
  heroSubheadline:
    'Discover the beauty of Indian craftsmanship, where generations of tradition meet timeless design.',
  artisanHeadline: 'Behind Every Masterpiece, There Is A Master Artisan.',
  heritageHeadline: 'More Than Art. A Legacy Of Generations.',
  whatsappNumber: '919876543210',
  email: 'concierge@karigaratelier.in',
  phoneDisplay: '+91 (0141) 268-4920',
  atelierLocation: 'Johari Bazar Heritage Precinct, Jaipur & Mehrauli, New Delhi',
  freeShippingThresholdINR: 5000,
  instagramHandle: '@karigar.atelier',
  colors: {
    forestGreen: '#183C32',
    warmIvory: '#F5F0E6',
    burntTerracotta: '#BC6847',
  },
};

export type CraftCategoryName =
  | 'Handmade Pottery'
  | 'Wooden Handicrafts'
  | 'Brass & Metal Art'
  | 'Handwoven Textiles'
  | 'Handmade Jewellery'
  | 'Traditional Indian Paintings';

export interface CraftCategory {
  id: string;
  name: CraftCategoryName;
  regionTag: string;
  subtitle: string;
  description: string;
  artisanCountText: string;
  image: string;
  fallbackImage: string;
  featuredTechnique: string;
}

export const CRAFT_CATEGORIES: CraftCategory[] = [
  {
    id: 'pottery',
    name: 'Handmade Pottery',
    regionTag: 'Jaipur & Manipur',
    subtitle: 'Quartz Blue Glaze & Black Longpi Stoneware',
    description:
      'Wheel-thrown earthen vessels shaped from river silt, ground quartz, and serpentine stone—fired in traditional wood kilns without synthetic glazes.',
    artisanCountText: '14 Heritage Potters',
    image: 'images/cat-pottery.jpg',
    fallbackImage: 'images/cat-pottery.jpg',
    featuredTechnique: 'Ground Quartz Low-Fire Glazing',
  },
  {
    id: 'wood',
    name: 'Wooden Handicrafts',
    regionTag: 'Saharanpur & Kashmir',
    subtitle: 'Seasoned Walnut & Sheesham Jali Carving',
    description:
      'Heirloom architectural boxes, relief panels, and sculptural forms hand-carved with fine steel chisels from sustainably seasoned Indian rosewood and walnut.',
    artisanCountText: '19 Master Woodcarvers',
    image: 'images/cat-wood.jpg',
    fallbackImage: 'images/cat-wood.jpg',
    featuredTechnique: 'Takai Relief & Pinjra Latticework',
  },
  {
    id: 'brass',
    name: 'Brass & Metal Art',
    regionTag: 'Bastar & Moradabad',
    subtitle: '4,000-Year Lost-Wax Dhokra & Kansa Bronze',
    description:
      'One-of-a-kind molten bronze and hand-beaten brass vessels cast using beeswax threads and river clay moulds—where no two pieces can ever be identical.',
    artisanCountText: '22 Metalwork Foundries',
    image: 'images/cat-brass.jpg',
    fallbackImage: 'images/cat-brass.jpg',
    featuredTechnique: 'Ancient Lost-Wax (Madhuchista Vidhana)',
  },
  {
    id: 'textiles',
    name: 'Handwoven Textiles',
    regionTag: 'Varanasi & Kutch',
    subtitle: 'Pure Mulberry Zari Brocade & Organic Ajrakh',
    description:
      'Slow-woven pit-loom silks and 16-stage natural indigo and madder-root block prints requiring weeks of rhythmic devotion for a single yard.',
    artisanCountText: '31 Handloom Weavers',
    image: 'images/cat-textiles.jpg',
    fallbackImage: 'images/cat-textiles.jpg',
    featuredTechnique: 'Kadhwa Pit-Loom & Natural Alizarin Dyeing',
  },
  {
    id: 'jewellery',
    name: 'Handmade Jewellery',
    regionTag: 'Jaipur & Bikaner',
    subtitle: '24K Kundan-Meenakari & Temple Silver Filigree',
    description:
      'Wearable miniature architecture featuring hand-Burnished gold foil settings, uncut polki stones, and vitreous enamel painted on both front and reverse.',
    artisanCountText: '11 Royal Goldsmiths',
    image: 'images/cat-jewellery.jpg',
    fallbackImage: 'images/cat-jewellery.jpg',
    featuredTechnique: 'Champlevé Vitreous Meenakari Enamel',
  },
  {
    id: 'paintings',
    name: 'Traditional Indian Paintings',
    regionTag: 'Raghurajpur & Nathdwara',
    subtitle: 'Tussar Silk Pattachitra & Gold-Leaf Pichwai',
    description:
      'Sacred narrative scrolls painted using squirrel-hair brushes and colours ground by hand from conch shells, hingula cinnabar, lapis, and lamp soot.',
    artisanCountText: '9 Chitrakar Families',
    image: 'images/cat-paintings.jpg',
    fallbackImage: 'images/cat-paintings.jpg',
    featuredTechnique: 'Natural Mineral Pigment on Treated Tussar',
  },
];

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CraftCategoryName;
  priceINR: number;
  originalPriceINR?: number;
  origin: string;
  artisanName: string;
  artisanExperience: string;
  craftHours: number;
  image: string;
  secondaryImage: string;
  fallbackImage: string;
  badge?: string;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  story: string;
  dimensions: string;
  materials: string;
  weight: string;
  careInstructions: string;
  inStockCount: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'KRG-BRS-01',
    name: 'Bastar Dhokra Lost-Wax Ceremonial Steed',
    category: 'Brass & Metal Art',
    priceINR: 14800,
    origin: 'Kondagaon, Bastar (Chhattisgarh)',
    artisanName: 'Ustad बुधराम बघेल (Budhram Baghel)',
    artisanExperience: '38 Years in Lost-Wax Bronze Casting',
    craftHours: 64,
    image: 'images/cat-brass.jpg',
    secondaryImage: 'images/hero-craft.jpg',
    fallbackImage: 'images/cat-brass.jpg',
    badge: 'Museum Edition',
    isBestseller: true,
    rating: 4.9,
    reviewCount: 42,
    shortDescription:
      'Cast from a single hand-coiled beeswax core wrapped in riverbed termite clay—broken open once to reveal an unrepeatable bronze sculpture.',
    story:
      'Practiced for over four millennia since the Indus Valley Dancing Girl, Dhokra metallurgy uses zero moulds that can be reused. Master artisan Budhram coils fine ribbons of wild forest beeswax over a sun-dried clay core, encases it in earthen paste, and pours molten bell-metal brass heated over wood charcoal.',
    dimensions: '28 cm × 11 cm × 31 cm (H)',
    materials: '88% Virgin Bell Brass, Wild Beeswax Patina',
    weight: '2.45 kg',
    careInstructions: 'Buff gently with a dry soft cotton cloth. Avoid harsh chemical polishes to preserve the natural antique oxidation.',
    inStockCount: 3,
  },
  {
    id: 'prod-2',
    sku: 'KRG-POT-02',
    name: 'Jaipur Quartz-Clay Surahi & Longpi Amphora Duo',
    category: 'Handmade Pottery',
    priceINR: 6450,
    origin: 'Sanganer, Jaipur & Ukhrul, Manipur',
    artisanName: 'Rameshwar Prajapati & Machihan Sasa',
    artisanExperience: '3rd Generation Master Ceramists',
    craftHours: 36,
    image: 'images/cat-pottery.jpg',
    secondaryImage: 'https://images.pexels.com/photos/33878963/pexels-photo-33878963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fallbackImage: 'images/cat-pottery.jpg',
    badge: 'GI Tagged Craft',
    isBestseller: true,
    rating: 4.9,
    reviewCount: 37,
    shortDescription:
      'Hand-thrown quartz-paste vessel paired with smoked black serpentine stoneware burnished with smooth river pebbles.',
    story:
      'Unlike ordinary ceramics, Jaipur Blue & Terracotta pottery contains no clay—it is kneaded from powdered quartz stone, raw glaze, fuller’s earth (Multani Mitti), and tree gum, then fired once at low temperatures for a luminous mineral depth.',
    dimensions: 'Amphora: 26 cm (H) × 16 cm (Dia)',
    materials: 'Ground Quartz Stone, Black Serpentine Rock, Natural Oxide Glaze',
    weight: '1.60 kg',
    careInstructions: 'Hand wash with mild soap and lukewarm water. Do not use abrasive scrubbers.',
    inStockCount: 6,
  },
  {
    id: 'prod-3',
    sku: 'KRG-WOD-03',
    name: 'Kashmir Walnut Wood Pinjra Jali Heirloom Chest',
    category: 'Wooden Handicrafts',
    priceINR: 18500,
    origin: 'Srinagar, Kashmir & Saharanpur',
    artisanName: 'Ghulam Nabi Khan',
    artisanExperience: '44 Years in Walnut Naqashi Carving',
    craftHours: 92,
    image: 'images/cat-wood.jpg',
    secondaryImage: 'https://images.pexels.com/photos/37870822/pexels-photo-37870822.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fallbackImage: 'images/cat-wood.jpg',
    badge: 'Single-Timber Carve',
    isBestseller: true,
    rating: 5.0,
    reviewCount: 29,
    shortDescription:
      'Deep-relief chinar leaf and geometric latticework carved entirely by hand from air-seasoned Himalayan walnut heartwood.',
    story:
      'Seasoned naturally for seven years to prevent warping, each chest is carved using 28 specialized forged steel chisels (kalam). The interior is lined with raw handwoven mulberry velvet and fitted with hand-forged antique brass clasps.',
    dimensions: '32 cm × 22 cm × 16 cm',
    materials: 'Air-Seasoned Juglans Regia Walnut Wood, Hand-Forged Brass Hardware, Raw Silk Lining',
    weight: '2.10 kg',
    careInstructions: 'Nourish once a year with a drop of pure cold-pressed walnut or beeswax oil.',
    inStockCount: 4,
  },
  {
    id: 'prod-4',
    sku: 'KRG-TEX-04',
    name: 'Varanasi Kadhwa Pure Silk Zari Ceremonial Throw',
    category: 'Handwoven Textiles',
    priceINR: 24900,
    origin: 'Madanpura, Varanasi & Dhamadka, Kutch',
    artisanName: 'Haji Maqbool Ansari',
    artisanExperience: '4th Generation Banarasi Master Weaver',
    craftHours: 140,
    image: 'images/cat-textiles.jpg',
    secondaryImage: 'https://images.pexels.com/photos/28389703/pexels-photo-28389703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fallbackImage: 'images/cat-textiles.jpg',
    badge: '140 Loom Hours',
    isBestseller: true,
    rating: 5.0,
    reviewCount: 51,
    shortDescription:
      'Hand-interlocked Kadhwa brocade woven on a traditional pit loom with mulberry silk and electroplated real silver-gold zari.',
    story:
      'In the Kadhwa weaving technique, every single motif is individually interlocked by two weavers working in tandem on a wooden pit loom—leaving zero loose floating threads on the reverse side and creating a textile destined to be passed down for generations.',
    dimensions: '245 cm × 112 cm',
    materials: '100% Pure Mulberry Katan Silk, Antique Gold-Dipped Silver Zari',
    weight: '0.68 kg',
    careInstructions: 'Professional silk dry-clean only. Store wrapped in unbleached cotton muslin away from direct moisture.',
    inStockCount: 2,
  },
  {
    id: 'prod-5',
    sku: 'KRG-JEW-05',
    name: 'Bikaner 24K Kundan & Terracotta Meenakari Hasli',
    category: 'Handmade Jewellery',
    priceINR: 32000,
    origin: 'Johari Bazar, Jaipur (Rajasthan)',
    artisanName: 'Mahaveer Singh Surana',
    artisanExperience: '5th Generation Meenakar & Jadau Chiteri',
    craftHours: 110,
    image: 'images/cat-jewellery.jpg',
    secondaryImage: 'images/hero-craft.jpg',
    fallbackImage: 'images/cat-jewellery.jpg',
    badge: 'Collector’s Piece',
    isBestseller: true,
    rating: 4.9,
    reviewCount: 24,
    shortDescription:
      'Hand-forged sterling silver-gilt collar set with uncut polki rock crystals and fired with double-sided vitreous enamel.',
    story:
      'Creating a single Meenakari piece requires collaboration between four specialists: the Ghadia (framer), Chiteri (designer), Khudia (engraver), and Meenakar (enamellist). Even the hidden back of the necklace is hand-painted with protective floral motifs that touch only the wearer’s skin.',
    dimensions: 'Inner Collar Diameter: 14.5 cm (Adjustable Tassel Dori)',
    materials: '92.5 Sterling Silver Core, 24K Gold Foil (Kundan), Vitreous Mineral Enamel, Uncut Polki',
    weight: '0.145 kg',
    careInstructions: 'Keep away from perfumes and moisture. Store in the included cedarwood velvet box.',
    inStockCount: 2,
  },
  {
    id: 'prod-6',
    sku: 'KRG-PNT-06',
    name: 'Raghurajpur Pattachitra Sacred Lotus Scroll on Tussar',
    category: 'Traditional Indian Paintings',
    priceINR: 16200,
    origin: 'Raghurajpur Heritage Village, Odisha',
    artisanName: 'Sharat Chandra Mohapatra',
    artisanExperience: 'National Awardee Chitrakar Lineage',
    craftHours: 85,
    image: 'images/cat-paintings.jpg',
    secondaryImage: 'images/heritage-banner.jpg',
    fallbackImage: 'images/cat-paintings.jpg',
    badge: 'Signed Original',
    isBestseller: true,
    rating: 5.0,
    reviewCount: 19,
    shortDescription:
      'Intricate mythological flora and peacock symphony painted with crushed sea-shell white, hingula red, and 22K gold leaf.',
    story:
      'Before a single brushstroke is applied, the artist prepares the canvas (Patta) by laminating layers of tussar silk with tamarind seed paste and burnishing it with smooth river stones for ten days. Every pigment is derived from raw earth minerals and soot collected from sesame oil lamps.',
    dimensions: '90 cm × 60 cm (Unframed Archival Scroll / Custom Teak Frame Included)',
    materials: 'Hand-Treated Tussar Silk, Crushed Conch Shell, Hingula Mineral, Tamarind Resin',
    weight: '1.85 kg (Framed)',
    careInstructions: 'Hang away from harsh direct afternoon sunlight and high humidity.',
    inStockCount: 1,
  },
  {
    id: 'prod-7',
    sku: 'KRG-BRS-07',
    name: 'Moradabad Hand-Hammered Kansa Lotus Urli Vessel',
    category: 'Brass & Metal Art',
    priceINR: 9800,
    origin: 'Moradabad & Kerala Bell-Metal Guild',
    artisanName: 'Keshav Das & Sons',
    artisanExperience: '32 Years in Kansa & Brass Hammerwork',
    craftHours: 48,
    image: 'images/prod-urli.jpg',
    secondaryImage: 'images/cat-brass.jpg',
    fallbackImage: 'images/prod-urli.jpg',
    badge: 'Architectural Centerpiece',
    isBestseller: true,
    rating: 4.8,
    reviewCount: 64,
    shortDescription:
      'Heavy-gauge acoustic bell-metal urli vessel shaped by over 8,000 individual hammer strikes for resonant warmth.',
    story:
      'Traditionally placed at the threshold of Indian courtyard homes filled with spring water and floating mogra or marigold blossoms, this Kansa urli combines copper and tin in an ancient Ayurvedic proportion known for its warm golden luster.',
    dimensions: '36 cm Diameter × 14 cm Height',
    materials: 'Heavy-Gauge Hand-Beaten Brass & Kansa Bronze Alloy',
    weight: '3.60 kg',
    careInstructions: 'Rinse and wipe dry after water use. Polish occasionally with natural tamarind or lemon-salt paste.',
    inStockCount: 7,
  },
  {
    id: 'prod-8',
    sku: 'KRG-POT-08',
    name: 'Pokhran Terracotta Carved Jharokha Lantern & Carafe',
    category: 'Handmade Pottery',
    priceINR: 4950,
    origin: 'Pokhran & Molela, Rajasthan',
    artisanName: 'Mohanlal Kumhar',
    artisanExperience: '29 Years in Desert Terracotta Architecture',
    craftHours: 28,
    image: 'images/hero-craft.jpg',
    secondaryImage: 'images/cat-pottery.jpg',
    fallbackImage: 'images/hero-craft.jpg',
    badge: 'Artisan Favourite',
    isBestseller: false,
    rating: 4.9,
    reviewCount: 31,
    shortDescription:
      'Breathable desert red-clay vessel pierced with miniature Haveli jharokha arches that cast warm lattice shadows.',
    story:
      'Harvested from the mineral-rich lakebeds of the Thar desert, this high-iron clay turns a rich burnt terracotta hue when pit-fired with wild desert brushwood. Pierced while leather-hard with a pointed bamboo stylus.',
    dimensions: '30 cm Height × 18 cm Diameter',
    materials: '100% Unbleached Thar Desert Alluvial Terracotta Clay',
    weight: '1.95 kg',
    careInstructions: 'Wipe with a damp cloth. Season overnight with water before first use if used as a carafe.',
    inStockCount: 9,
  },
];

export interface MakingProcessStage {
  stepNumber: string;
  stageTitle: 'Design' | 'Materials' | 'Craftsmanship' | 'Masterpiece';
  sanskritTerm: string;
  headline: string;
  description: string;
  durationNote: string;
  image: string;
  fallbackImage: string;
  highlights: string[];
}

export const MAKING_PROCESS_STAGES: MakingProcessStage[] = [
  {
    stepNumber: '01',
    stageTitle: 'Design',
    sanskritTerm: 'Sankalpa — Sacred Proportion',
    headline: 'Rooted in Centuries of Oral Geometry',
    description:
      'Before touching clay, timber, or silk, the master karigar sketches motifs drawn from temple friezes, Mughal botanical manuscripts, and ancestral talim (coded pattern books) passed from parent to child.',
    durationNote: 'Days 1–4 • Pattern & Proportion Study',
    image: 'https://images.pexels.com/photos/28389703/pexels-photo-28389703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fallbackImage: 'images/cat-paintings.jpg',
    highlights: [
      'Hand-drawn khaka stencils perforated on tracing parchment',
      'Harmonious golden-ratio proportions adapted for modern interiors',
      'Zero CAD mass-replication—every piece carries human asymmetry',
    ],
  },
  {
    stepNumber: '02',
    stageTitle: 'Materials',
    sanskritTerm: 'Prakriti — Honest Earth Elements',
    headline: 'Raw Minerals, Seasoned Timber & Wild Silk',
    description:
      'We source only unadulterated natural materials directly from regional ecosystems: Bastar forest beeswax, 7-year air-dried Kashmir walnut, ground Jaipur quartz, and organic madder-root and indigo vats.',
    durationNote: 'Days 5–14 • Earth Preparation & Seasoning',
    image: 'images/cat-textiles.jpg',
    fallbackImage: 'images/cat-textiles.jpg',
    highlights: [
      '100% lead-free mineral glazes & plant-extracted textile dyes',
      'Ethically harvested, naturally fallen or agro-forested hardwood',
      'Virgin bell-metal bronze and 92.5 hallmarked silver cores',
    ],
  },
  {
    stepNumber: '03',
    stageTitle: 'Craftsmanship',
    sanskritTerm: 'Sadhana — The Meditative Hand',
    headline: 'Thousands of Hours of Rhythmic Devotion',
    description:
      'In sunlit courtyard workshops across India, artisans shape each creation entirely by hand—whether coiling beeswax threads for lost-wax casting, throwing stoneware on a flywheel, or interlocking zari threads on a pit loom.',
    durationNote: 'Weeks 2–6 • Hand Shaping, Firing & Weaving',
    image: 'https://images.pexels.com/photos/33878963/pexels-photo-33878963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fallbackImage: 'images/artisan-master.jpg',
    highlights: [
      'Over 8,000 hand-hammer strikes on a single Kansa vessel',
      'Wood-kiln & pit-firing for organic, unrepeatable fire marks',
      'Direct fair-trade guild patronage retaining 78% value with artisans',
    ],
  },
  {
    stepNumber: '04',
    stageTitle: 'Masterpiece',
    sanskritTerm: 'Purnata — Timeless Heirloom',
    headline: 'Signed by the Maker, Built for Generations',
    description:
      'Each completed object undergoes rigorous curatorial inspection, natural beeswax or river-stone burnishing, and is accompanied by an archival provenance dossier naming the master artisan who brought it to life.',
    durationNote: 'Final Stage • Burnishing & Provenance Seal',
    image: 'images/hero-craft.jpg',
    fallbackImage: 'images/hero-craft.jpg',
    highlights: [
      'Individually numbered provenance card signed by the master karigar',
      'Museum-grade plastic-free khadi & cedarwood packaging',
      'Designed to gain richer patina with every passing decade',
    ],
  },
];

export interface DemoTestimonial {
  id: string;
  quote: string;
  patronName: string;
  patronRole: string;
  location: string;
  acquiredPiece: string;
  category: CraftCategoryName;
}

export const DEMO_TESTIMONIALS: DemoTestimonial[] = [
  {
    id: 'test-1',
    quote:
      'The Bastar Dhokra bronze sculpture arrived wrapped in unbleached khadi with a handwritten provenance card detailing the Kondagaon foundry. The weight, the tactile beeswax ridges, and the warm patina feel like a museum acquisition rather than a typical online purchase.',
    patronName: 'Arundhati Sen-Roy',
    patronRole: 'Principal Interior Architect (Illustrative Demo Review)',
    location: 'South Mumbai, Maharashtra',
    acquiredPiece: 'Bastar Dhokra Lost-Wax Ceremonial Steed',
    category: 'Brass & Metal Art',
  },
  {
    id: 'test-2',
    quote:
      'As a collector of Indian textiles, finding genuine Kadhwa pit-loom weave with zero loose threads on the reverse is increasingly rare. You can feel the rhythm of the weaver’s hands in every inch of this Varanasi silk throw.',
    patronName: 'Vikramaditya & Meera Kapur',
    patronRole: 'Art & Heritage Patrons (Illustrative Demo Review)',
    location: 'Lutyens’ New Delhi',
    acquiredPiece: 'Varanasi Kadhwa Pure Silk Zari Ceremonial Throw',
    category: 'Handwoven Textiles',
  },
  {
    id: 'test-3',
    quote:
      'We commissioned three Kashmir walnut chests and Jaipur quartz amphoras for our boutique heritage hotel suite. Guests constantly ask about the artisans behind them. The storytelling and transparency set a new benchmark for Indian craft.',
    patronName: 'Kabir Rajawat',
    patronRole: 'Hospitality Creative Director (Illustrative Demo Review)',
    location: 'Udaipur, Rajasthan',
    acquiredPiece: 'Kashmir Walnut Wood Pinjra Jali Heirloom Chest',
    category: 'Wooden Handicrafts',
  },
  {
    id: 'test-4',
    quote:
      'What moved me most was the hidden Meenakari floral enamel on the reverse of the necklace—craftsmanship created solely for the wearer’s joy. It is heirloom art in its purest, most respectful form.',
    patronName: 'Dr. Nandini Iyer',
    patronRole: 'Cultural Historian (Illustrative Demo Review)',
    location: 'Indiranagar, Bengaluru',
    acquiredPiece: 'Bikaner 24K Kundan & Terracotta Meenakari Hasli',
    category: 'Handmade Jewellery',
  },
];

export interface InstagramPost {
  id: string;
  image: string;
  fallbackImage: string;
  caption: string;
  location: string;
  craftTag: string;
  likesText: string;
}

export const INSTAGRAM_GALLERY: InstagramPost[] = [
  {
    id: 'ig-1',
    image: 'images/artisan-master.jpg',
    fallbackImage: 'images/artisan-master.jpg',
    caption: 'Morning sunbeams in our Jaipur brass engraving courtyard. Every chisel strike is guided by memory, never a machine.',
    location: 'Jaipur, Rajasthan',
    craftTag: 'Master Artisan',
    likesText: 'Atelier Journal • Vol. IV',
  },
  {
    id: 'ig-2',
    image: 'images/cat-pottery.jpg',
    fallbackImage: 'images/cat-pottery.jpg',
    caption: 'Ground quartz stone, raw glaze, and fuller’s earth drying in the desert breeze before wood-kiln firing.',
    location: 'Sanganer, Rajasthan',
    craftTag: 'Handmade Pottery',
    likesText: 'Craft Study • #018',
  },
  {
    id: 'ig-3',
    image: 'images/cat-brass.jpg',
    fallbackImage: 'images/cat-brass.jpg',
    caption: '4,000 years of unbroken continuity: lost-wax Dhokra bronze horses fresh from their earthen clay moulds.',
    location: 'Bastar, Chhattisgarh',
    craftTag: 'Brass & Metal Art',
    likesText: 'Foundry Notes • #042',
  },
  {
    id: 'ig-4',
    image: 'images/cat-textiles.jpg',
    fallbackImage: 'images/cat-textiles.jpg',
    caption: 'Golden zari threads meeting organic indigo and madder-root Ajrakh textiles on a century-old teak loom.',
    location: 'Varanasi & Kutch',
    craftTag: 'Handwoven Textiles',
    likesText: 'Loom Chronicles • #029',
  },
  {
    id: 'ig-5',
    image: 'images/cat-wood.jpg',
    fallbackImage: 'images/cat-wood.jpg',
    caption: 'Seven years of natural air-seasoning before the first kalam chisel touches Himalayan walnut heartwood.',
    location: 'Srinagar, Kashmir',
    craftTag: 'Wooden Handicrafts',
    likesText: 'Timber & Chisel • #011',
  },
  {
    id: 'ig-6',
    image: 'images/cat-jewellery.jpg',
    fallbackImage: 'images/cat-jewellery.jpg',
    caption: 'Vitreous mineral enamel fired at 850°C—painted on both front and reverse in royal Bikaner tradition.',
    location: 'Bikaner & Jaipur',
    craftTag: 'Handmade Jewellery',
    likesText: 'Royal Treasury • #064',
  },
  {
    id: 'ig-7',
    image: 'images/cat-paintings.jpg',
    fallbackImage: 'images/cat-paintings.jpg',
    caption: 'Crushed sea-shells and hingula cinnabar ground by hand on river stone for our Raghurajpur Pattachitra scrolls.',
    location: 'Raghurajpur, Odisha',
    craftTag: 'Traditional Paintings',
    likesText: 'Sacred Pigment • #053',
  },
  {
    id: 'ig-8',
    image: 'images/prod-urli.jpg',
    fallbackImage: 'images/prod-urli.jpg',
    caption: 'The resonant acoustic hum of hand-beaten Kansa bronze—designed to welcome calm into the modern home.',
    location: 'Moradabad & Kerala',
    craftTag: 'Living Heritage',
    likesText: 'Sanctuary Objects • #077',
  },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

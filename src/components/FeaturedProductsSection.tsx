import React, { useMemo, useRef, useState } from 'react';
import {
  Heart,
  Eye,
  ShoppingBag,
  SlidersHorizontal,
  Search,
  Sparkles,
  Clock,
  MapPin,
  Rotate3d,
  Check,
  X,
} from 'lucide-react';
import {
  CRAFT_CATEGORIES,
  CraftCategoryName,
  Product,
  formatINR,
} from '../config/brandConfig';

interface ProductCard3DProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = x / rect.width;
    const pctY = y / rect.height;

    const rotateY = (pctX - 0.5) * 12; // -6deg to +6deg
    const rotateX = (0.5 - pctY) * 12; // -6deg to +6deg

    setTilt({
      rotateX,
      rotateY,
      glareX: pctX * 100,
      glareY: pctY * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onQuickView(product)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#183C32]/14 bg-[#EBE3D5]/55 text-[#183C32] transition-all duration-300 ease-out hover:border-[#BC6847] hover:shadow-[0_24px_48px_rgba(24,60,50,0.16)] cursor-pointer will-change-transform"
    >
      {/* Dynamic 3D Specular Sheen Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(245,240,230,0.8), transparent 60%)`,
          }}
        />
      )}

      {/* Image Wrapper with Hover Zoom */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#183C32]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== window.location.origin + product.fallbackImage) {
              target.src = product.fallbackImage;
            }
          }}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#183C32]/85 via-transparent to-[#183C32]/20 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Left: Badge & Category */}
        <div className="absolute top-3.5 left-3.5 right-14 flex flex-wrap items-center gap-1.5 z-10">
          {product.badge && (
            <span className="rounded-full bg-[#BC6847] px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#F5F0E6] shadow">
              {product.badge}
            </span>
          )}
          <span className="rounded-full bg-[#183C32]/85 border border-[#F5F0E6]/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#F5F0E6] backdrop-blur-xs">
            {product.category}
          </span>
        </div>

        {/* Top Right: Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className={`absolute top-3.5 right-3.5 z-30 flex h-10 w-10 items-center justify-center rounded-full border transition-all cursor-pointer ${
            isWishlisted
              ? 'border-[#BC6847] bg-[#BC6847] text-[#F5F0E6] scale-105 shadow-lg'
              : 'border-[#F5F0E6]/30 bg-[#183C32]/70 text-[#F5F0E6] hover:bg-[#BC6847] hover:border-[#BC6847]'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Overlay inside Image: Quick View & Provenance */}
        <div className="absolute inset-x-3.5 bottom-3.5 z-20 flex items-end justify-between gap-2">
          <div className="text-[#F5F0E6]">
            <p className="flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[#BC6847] font-medium">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{product.origin}</span>
            </p>
            <p className="flex items-center gap-1 text-[11px] text-[#F5F0E6]/85 mt-0.5">
              <Clock className="h-3 w-3 text-[#BC6847] shrink-0" />
              <span>{product.craftHours} Hours Hand-Crafted</span>
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label={`Quick view ${product.name}`}
            className="flex items-center gap-1.5 rounded-full bg-[#F5F0E6]/95 px-3.5 py-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#183C32] shadow-md hover:bg-[#BC6847] hover:text-[#F5F0E6] transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#183C32]/65 mb-1.5">
            <span className="truncate">By {product.artisanName}</span>
            <span className="font-mono-num text-[10px] text-[#BC6847] shrink-0">
              {product.sku}
            </span>
          </div>

          <h3 className="font-editorial text-2xl font-medium leading-snug text-[#183C32] group-hover:text-[#BC6847] transition-colors">
            {product.name}
          </h3>

          <p className="mt-2 text-xs text-[#183C32]/75 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="mt-5 pt-4 border-t border-[#183C32]/12 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-[#183C32]/60">
              Atelier Price
            </span>
            <span className="font-mono-num text-lg sm:text-xl font-semibold text-[#183C32]">
              {formatINR(product.priceINR)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`relative z-30 inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer ${
              justAdded
                ? 'bg-[#183C32] text-[#F5F0E6]'
                : 'bg-[#BC6847] text-[#F5F0E6] hover:bg-[#183C32]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>In Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

interface FeaturedProductsSectionProps {
  products: Product[];
  selectedCategory: CraftCategoryName | 'All';
  onSelectCategory: (category: CraftCategoryName | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-asc' | 'price-desc' | 'craft-hours'
  >('featured');

  // Interactive 3D Rotating Handmade Object Inspector State
  const [vesselAngle, setVesselAngle] = useState(25);
  const [activeLayerIndex, setActiveLayerIndex] = useState(2);

  const craftAnatomyLayers = [
    {
      title: '01. Sun-Dried River Clay Core',
      subtitle: 'Bastar Alluvial Termite-Soil Foundation',
      detail:
        'Shaped by hand and mixed with rice husks so gases escape safely during molten casting.',
      ringRadius: 55,
    },
    {
      title: '02. Wild Beeswax Thread Lattice',
      subtitle: 'Hand-Coiled 1mm Wax Filaments',
      detail:
        'Drawn through a brass sieve (pichki) and wound around the clay core to form intricate geometric motifs.',
      ringRadius: 72,
    },
    {
      title: '03. Molten Bell-Metal Bronze Pour',
      subtitle: '1,100°C Wood-Charcoal Kiln Casting',
      detail:
        'Liquid brass melts and replaces every microscopic beeswax thread—creating a one-of-a-kind metal skin.',
      ringRadius: 88,
    },
    {
      title: '04. Natural Beeswax Heirloom Patina',
      subtitle: 'River-Stone Burnishing & Oxidation',
      detail:
        'Buffed by hand without synthetic lacquer so the bronze deepens in warmth over decades.',
      ringRadius: 102,
    },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.artisanName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'craft-hours') {
      list.sort((a, b) => b.craftHours - a.craftHours);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const categoriesList: (CraftCategoryName | 'All')[] = [
    'All',
    ...CRAFT_CATEGORIES.map((c) => c.name),
  ];

  return (
    <section
      id="featured-products"
      className="relative bg-[#F5F0E6] text-[#183C32] py-20 sm:py-28 lg:py-32 border-t border-[#183C32]/12"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#BC6847] font-semibold mb-3">
              Section III • The Collector’s Vault
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#183C32]">
              Curated Masterworks of{' '}
              <span className="italic text-[#BC6847]">Indian Craft.</span>
            </h2>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Inline Search */}
            <div className="relative flex items-center rounded-full border border-[#183C32]/20 bg-[#EBE3D5]/70 px-4 py-2">
              <Search className="h-4 w-4 text-[#BC6847] mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter by craft, city, artisan..."
                aria-label="Filter products by craft, city, or artisan"
                className="w-full sm:w-52 bg-transparent text-xs text-[#183C32] placeholder-[#183C32]/55 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="ml-1 text-[#183C32]/60 hover:text-[#BC6847]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 rounded-full border border-[#183C32]/20 bg-[#EBE3D5]/70 px-4 py-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#BC6847] shrink-0" />
              <label htmlFor="sort-products" className="sr-only">
                Sort products
              </label>
              <select
                id="sort-products"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | 'featured'
                      | 'price-asc'
                      | 'price-desc'
                      | 'craft-hours'
                  )
                }
                className="bg-transparent text-xs uppercase tracking-[0.14em] font-medium text-[#183C32] focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Curated Order</option>
                <option value="price-asc">Price: Low to High (INR)</option>
                <option value="price-desc">Price: High to Low (INR)</option>
                <option value="craft-hours">Intricacy: Most Craft Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Product Category Filter"
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-10 border-b border-[#183C32]/12"
        >
          {categoriesList.map((catName) => {
            const active = selectedCategory === catName;
            return (
              <button
                key={catName}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(catName)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-[#183C32] text-[#F5F0E6] shadow-md'
                    : 'bg-[#EBE3D5]/75 text-[#183C32]/80 hover:bg-[#BC6847] hover:text-[#F5F0E6]'
                }`}
              >
                {catName === 'All' ? 'All 8 Masterworks' : catName}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#183C32]/15 bg-[#EBE3D5]/50 p-12 text-center my-8">
            <p className="font-editorial text-3xl text-[#183C32] mb-2">
              No handcrafted pieces match your current filter.
            </p>
            <p className="text-sm text-[#183C32]/70 mb-6">
              Try clearing your search term or selecting “All 8 Masterworks” to view the full archive.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All');
                onSearchChange('');
              }}
              className="rounded-full bg-[#BC6847] px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F0E6] hover:bg-[#183C32] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {filteredProducts.map((product) => (
              <ProductCard3D
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {/* ============================================================
            SUBTLE 3D ROTATING HANDMADE OBJECT SHOWCASE
        ============================================================ */}
        <div className="mt-20 rounded-3xl bg-[#183C32] text-[#F5F0E6] p-6 sm:p-10 lg:p-12 border border-[#BC6847]/35 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 5 Columns: Interactive 3D Rotating Handmade Object */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center perspective-1000">
              <div className="relative h-80 w-full max-w-xs flex items-center justify-center rounded-2xl border border-[#F5F0E6]/15 bg-[#112B23] p-6 shadow-inner overflow-hidden">
                {/* 3D Rotating Multi-Layered Indian Kalash / Vessel Model */}
                <div
                  style={{
                    transform: `rotateY(${vesselAngle}deg) rotateX(12deg)`,
                  }}
                  className="relative h-56 w-56 flex items-center justify-center preserve-3d transition-transform duration-200"
                >
                  {/* Orbital Layer Rings representing the 4 Craft Anatomy Layers */}
                  {craftAnatomyLayers.map((layer, idx) => {
                    const isCurrent = activeLayerIndex === idx;
                    return (
                      <div
                        key={layer.title}
                        style={{
                          width: `${layer.ringRadius * 2}px`,
                          height: `${layer.ringRadius * 2}px`,
                          transform: `rotateX(${65 + idx * 8}deg) rotateY(${
                            idx * 25
                          }deg)`,
                        }}
                        className={`absolute rounded-full border transition-all duration-500 ${
                          isCurrent
                            ? 'border-[#BC6847] border-2 shadow-[0_0_25px_rgba(188,104,71,0.5)]'
                            : 'border-[#F5F0E6]/25 border-dashed'
                        }`}
                      />
                    );
                  })}

                  {/* Central Sculpted 3D Indian Kalash & Lotus Silhouette */}
                  <svg
                    viewBox="0 0 160 180"
                    className="h-48 w-44 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                    fill="none"
                  >
                    {/* Sacred Lotus Finial */}
                    <path
                      d="M80 12 C88 24, 96 30, 80 40 C64 30, 72 24, 80 12 Z"
                      fill="#BC6847"
                      stroke="#F5F0E6"
                      strokeWidth="1.2"
                    />
                    {/* Rim of Vessel */}
                    <ellipse
                      cx="80"
                      cy="44"
                      rx="28"
                      ry="7"
                      fill="#183C32"
                      stroke="#BC6847"
                      strokeWidth="2"
                    />
                    {/* Vessel Body with Dhokra Coiled Lattice Lines */}
                    <path
                      d="M52 44 C60 62, 32 78, 32 112 C32 144, 52 162, 80 162 C108 162, 128 144, 128 112 C128 78, 100 62, 108 44"
                      fill="rgba(188,104,71,0.22)"
                      stroke="#BC6847"
                      strokeWidth="2.2"
                    />
                    {/* Horizontal Dhokra Beeswax Thread Bands */}
                    <ellipse
                      cx="80"
                      cy="86"
                      rx="42"
                      ry="10"
                      stroke="#F5F0E6"
                      strokeWidth="1.1"
                      strokeDasharray="3 3"
                    />
                    <ellipse
                      cx="80"
                      cy="112"
                      rx="48"
                      ry="12"
                      stroke="#BC6847"
                      strokeWidth="1.6"
                    />
                    <ellipse
                      cx="80"
                      cy="138"
                      rx="40"
                      ry="9"
                      stroke="#F5F0E6"
                      strokeWidth="1.1"
                      strokeDasharray="4 3"
                    />
                    {/* Pedestal Base */}
                    <ellipse
                      cx="80"
                      cy="164"
                      rx="26"
                      ry="6"
                      fill="#BC6847"
                      stroke="#F5F0E6"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>

                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-[#183C32]/90 border border-[#BC6847]/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#BC6847]">
                  <Rotate3d className="h-3.5 w-3.5" />
                  <span>360° Craft Anatomy</span>
                </div>
              </div>

              {/* Interactive 360 Rotation Slider */}
              <div className="mt-4 w-full max-w-xs space-y-1.5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#F5F0E6]/75">
                  <span>Rotate 3D Vessel Form</span>
                  <span className="font-mono-num text-[#BC6847]">{vesselAngle}°</span>
                </div>
                <input
                  type="range"
                  min={-180}
                  max={180}
                  value={vesselAngle}
                  onChange={(e) => setVesselAngle(Number(e.target.value))}
                  aria-label="Rotate 3D handmade vessel"
                  className="w-full accent-[#BC6847] cursor-pointer"
                />
              </div>
            </div>

            {/* Right 7 Columns: Layer Selector & Explanation */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#BC6847] font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Interactive 3D Craft Metallurgy & Materiality</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#F5F0E6] leading-tight">
                Inspect the Four Sacred Layers Inside Every Lost-Wax & Earthen Creation.
              </h3>

              <p className="text-sm text-[#F5F0E6]/80 leading-relaxed">
                Rotate the 3D vessel model and click through the four material layers
                below to understand why authentic Indian handcraft possesses a tactile
                resonance that industrial moulds can never replicate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {craftAnatomyLayers.map((layer, idx) => {
                  const active = activeLayerIndex === idx;
                  return (
                    <button
                      key={layer.title}
                      type="button"
                      onClick={() => {
                        setActiveLayerIndex(idx);
                        setVesselAngle((idx - 1) * 45);
                      }}
                      className={`text-left rounded-xl p-4 border transition-all cursor-pointer ${
                        active
                          ? 'border-[#BC6847] bg-[#BC6847]/20 text-[#F5F0E6] shadow-lg'
                          : 'border-[#F5F0E6]/15 bg-[#112B23]/60 text-[#F5F0E6]/75 hover:border-[#BC6847]/60'
                      }`}
                    >
                      <p className="font-editorial text-lg font-semibold text-[#F5F0E6]">
                        {layer.title}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#BC6847] mt-0.5">
                        {layer.subtitle}
                      </p>
                      <p className="text-xs text-[#F5F0E6]/80 mt-2 leading-relaxed">
                        {layer.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

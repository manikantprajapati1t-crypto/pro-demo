import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Heart,
  Eye,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  Check,
} from 'lucide-react';
import { BrandConfig, Product, formatINR } from '../config/brandConfig';

interface BestsellersAndHeritageProps {
  brand: BrandConfig;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExploreAllClick: () => void;
}

export const BestsellersAndHeritage: React.FC<BestsellersAndHeritageProps> = ({
  brand,
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onExploreAllClick,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(25);
  const [addedId, setAddedId] = useState<string | null>(null);

  const bestsellers = products.filter((p) => p.isBestseller);

  const handleScrollUpdate = () => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    const pct = Math.min(100, Math.max(15, (el.scrollLeft / maxScroll) * 100));
    setScrollProgress(pct);
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -420 : 420;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = carouselRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftPos(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    carouselRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1300);
  };

  const whatsappBespokeUrl = `https://wa.me/${
    brand.whatsappNumber
  }?text=${encodeURIComponent(
    `Namaste ${brand.name} Concierge, I would like to inquire about commissioning or acquiring a heritage handicraft piece.`
  )}`;

  return (
    <>
      {/* ============================================================
          SECTION F — BESTSELLERS (INTERACTIVE HORIZONTAL CAROUSEL)
      ============================================================ */}
      <section
        id="bestsellers"
        className="relative bg-[#F5F0E6] text-[#183C32] py-24 sm:py-32 overflow-hidden"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
          {/* Header & Carousel Arrow Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#BC6847] font-semibold mb-3">
                Section VI • Most Coveted Editions
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#183C32]">
                Patron Favourites &{' '}
                <span className="italic text-[#BC6847]">Bestsellers.</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-xs uppercase tracking-[0.18em] text-[#183C32]/60 mr-2">
                Drag or Use Arrows
              </span>
              <button
                type="button"
                onClick={() => scrollByAmount('left')}
                aria-label="Previous Bestsellers"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#183C32]/25 text-[#183C32] hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount('right')}
                aria-label="Next Bestsellers"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183C32] text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Draggable Horizontal Track */}
          <div
            ref={carouselRef}
            onScroll={handleScrollUpdate}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            data-cursor="Drag"
            className={`flex gap-6 sm:gap-7 overflow-x-auto no-scrollbar pb-6 select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {bestsellers.map((product, index) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isJustAdded = addedId === product.id;

              return (
                <article
                  key={product.id}
                  onClick={() => {
                    if (!isDragging) onQuickView(product);
                  }}
                  className="group relative shrink-0 w-[300px] sm:w-[360px] lg:w-[390px] rounded-2xl border border-[#183C32]/15 bg-[#EBE3D5]/65 overflow-hidden transition-all duration-300 hover:border-[#BC6847] hover:shadow-2xl flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#183C32]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.src = product.fallbackImage;
                      }}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#183C32]/90 via-transparent to-transparent" />

                    {/* Top Number & Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#183C32]/90 border border-[#F5F0E6]/25 font-mono-num text-xs text-[#BC6847]">
                        0{index + 1}
                      </span>
                      <span className="rounded-full bg-[#BC6847] px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#F5F0E6]">
                        Bestseller
                      </span>
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      aria-label={`Wishlist ${product.name}`}
                      className={`absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                        isWishlisted
                          ? 'border-[#BC6847] bg-[#BC6847] text-[#F5F0E6]'
                          : 'border-[#F5F0E6]/25 bg-[#183C32]/75 text-[#F5F0E6] hover:bg-[#BC6847]'
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`}
                      />
                    </button>

                    {/* Quick View Pill */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F5F0E6]">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#BC6847]">
                          {product.category}
                        </p>
                        <p className="text-xs text-[#F5F0E6]/85">
                          {product.origin}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="flex items-center gap-1 rounded-full bg-[#F5F0E6]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#183C32] hover:bg-[#BC6847] hover:text-[#F5F0E6] transition-colors cursor-pointer"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-editorial text-2xl font-medium text-[#183C32] group-hover:text-[#BC6847] transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-[#183C32]/75 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#183C32]/12 flex items-center justify-between">
                      <span className="font-mono-num text-lg font-semibold text-[#183C32]">
                        {formatINR(product.priceINR)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleAdd(e, product)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer ${
                          isJustAdded
                            ? 'bg-[#183C32] text-[#F5F0E6]'
                            : 'bg-[#BC6847] text-[#F5F0E6] hover:bg-[#183C32]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Added</span>
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
            })}
          </div>

          {/* Carousel Progress Indicator Bar */}
          <div className="mt-6 flex items-center justify-between gap-6">
            <div className="h-[2px] flex-1 bg-[#183C32]/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#BC6847] transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="font-mono-num text-xs text-[#183C32]/70">
              {bestsellers.length} Collector Editions
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION G — HERITAGE EXPERIENCE (FULL-WIDTH CINEMATIC BANNER)
          Headline: "More Than Art. A Legacy Of Generations."
      ============================================================ */}
      <section
        id="heritage"
        className="relative min-h-[78vh] w-full overflow-hidden bg-[#183C32] text-[#F5F0E6] flex items-center py-24 sm:py-32"
      >
        {/* Full-Width Immersive Heritage Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/heritage-banner.jpg"
            alt="Historic Indian heritage haveli craft courtyard at golden hour with brass lamps, handwoven textiles, and terracotta vessels"
            loading="lazy"
            className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(24,60,50,0.88) 0%, rgba(24,60,50,0.72) 50%, rgba(24,60,50,0.94) 100%)',
            }}
          />
        </div>

        {/* Ornamental Inner Border */}
        <div className="pointer-events-none absolute inset-6 sm:inset-12 border border-[#F5F0E6]/15 z-10 hidden sm:block" />

        <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#BC6847]/60 bg-[#183C32]/85 px-5 py-2 text-xs uppercase tracking-[0.26em] text-[#BC6847] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Section VII • Cultural Preservation & Patronage</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.05] tracking-[-0.015em] text-[#F5F0E6]">
            {brand.heritageHeadline}
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-[#F5F0E6]/85 font-light leading-relaxed">
            When you bring a work of Indian handcraft into your sanctuary, you do
            more than adorn a room—you sustain an ancient visual language, support
            rural artisan guilds, and keep centuries-old wisdom alive for the next
            generation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onExploreAllClick}
              className="inline-flex items-center gap-3 rounded-full bg-[#BC6847] px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-[#F5F0E6] shadow-xl hover:bg-[#F5F0E6] hover:text-[#183C32] transition-colors cursor-pointer"
            >
              <span>Acquire From The Archive</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <a
              href={whatsappBespokeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-[#F5F0E6]/40 bg-[#183C32]/70 px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#F5F0E6] backdrop-blur-sm hover:border-[#BC6847] hover:bg-[#BC6847] transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-[#BC6847]" />
              <span>Bespoke WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

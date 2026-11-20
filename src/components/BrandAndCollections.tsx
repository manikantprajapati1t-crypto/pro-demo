import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Compass, Feather, Award, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BrandConfig,
  CRAFT_CATEGORIES,
  CraftCategoryName,
} from '../config/brandConfig';

gsap.registerPlugin(ScrollTrigger);

interface BrandAndCollectionsProps {
  brand: BrandConfig;
  selectedCategory: CraftCategoryName | 'All';
  onSelectCategory: (category: CraftCategoryName) => void;
}

export const BrandAndCollections: React.FC<BrandAndCollectionsProps> = ({
  brand,
  selectedCategory,
  onSelectCategory,
}) => {
  const sectionARef = useRef<HTMLElement>(null);
  const sectionBRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-brand-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionARef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-category-card',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionBRef.current,
            start: 'top 78%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ============================================================
          SECTION A — BRAND INTRODUCTION
      ============================================================ */}
      <section
        id="brand-intro"
        ref={sectionARef}
        className="relative overflow-hidden bg-[#F5F0E6] text-[#183C32] py-20 sm:py-28 lg:py-32 border-b border-[#183C32]/12"
      >
        {/* Subtle Floating Decorative Sacred Geometry Watermark */}
        <div className="pointer-events-none absolute -top-24 -right-24 opacity-[0.06]">
          <svg className="h-[460px] w-[460px] text-[#183C32] animate-spin-slow" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
            <path d="M100 8 L122 78 L192 100 L122 122 L100 192 L78 122 L8 100 L78 78 Z" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left 6 Columns: Editorial Manifesto */}
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-brand-reveal inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#BC6847] font-semibold">
                <Feather className="h-3.5 w-3.5" />
                <span>Section I • The Philosophy of {brand.name}</span>
              </div>

              <h2 className="gsap-brand-reveal font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.015em] text-[#183C32]">
                Where the Human Hand Leaves an{' '}
                <span className="italic text-[#BC6847]">Immortal Signature.</span>
              </h2>

              <p className="gsap-brand-reveal text-base sm:text-lg leading-relaxed text-[#183C32]/85 font-normal">
                In an era of hurried mechanical uniformity,{' '}
                <strong className="font-semibold text-[#183C32]">
                  {brand.fullTitle}
                </strong>{' '}
                stands as a living sanctuary for India’s rarest ancestral crafts.
                Across sunlit courtyards in Rajasthan, bronze foundries in Bastar,
                and quiet pit-looms in Varanasi, master{' '}
                <em className="font-editorial text-xl italic text-[#BC6847]">
                  karigars
                </em>{' '}
                transform raw earth, timber, mineral pigment, and wild silk into
                objects of quiet reverence.
              </p>

              <p className="gsap-brand-reveal text-sm sm:text-base leading-relaxed text-[#183C32]/75">
                Every creation in our collection is shaped without assembly lines
                or synthetic shortcuts. The subtle variation of a hand-beaten
                Kansa rim or the rhythmic knot of a Kadhwa weave is not an
                imperfection—it is the living heartbeat of the artisan who devoted
                weeks to its birth.
              </p>

              {/* Three Editorial Pillars */}
              <div className="gsap-brand-reveal grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-[#183C32]/15">
                <div className="rounded-xl border border-[#183C32]/12 bg-[#EBE3D5]/55 p-4">
                  <Award className="h-5 w-5 text-[#BC6847] mb-2" />
                  <h3 className="font-editorial text-xl font-semibold text-[#183C32]">
                    Unbroken Lineage
                  </h3>
                  <p className="text-xs text-[#183C32]/75 mt-1 leading-relaxed">
                    Craft techniques preserved across 4 to 7 generations of guild families.
                  </p>
                </div>

                <div className="rounded-xl border border-[#183C32]/12 bg-[#EBE3D5]/55 p-4">
                  <Compass className="h-5 w-5 text-[#BC6847] mb-2" />
                  <h3 className="font-editorial text-xl font-semibold text-[#183C32]">
                    Pure Earth Matter
                  </h3>
                  <p className="text-xs text-[#183C32]/75 mt-1 leading-relaxed">
                    Natural mineral pigments, seasoned walnut, quartz clay, and pure bell brass.
                  </p>
                </div>

                <div className="rounded-xl border border-[#183C32]/12 bg-[#EBE3D5]/55 p-4">
                  <Sparkles className="h-5 w-5 text-[#BC6847] mb-2" />
                  <h3 className="font-editorial text-xl font-semibold text-[#183C32]">
                    Direct Patronage
                  </h3>
                  <p className="text-xs text-[#183C32]/75 mt-1 leading-relaxed">
                    Transparent provenance naming the master artisan on every piece.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: Layered Editorial Collage with Arch Mask */}
            <div className="lg:col-span-6 relative">
              <div className="gsap-brand-reveal relative mx-auto max-w-lg lg:max-w-none grid grid-cols-12 gap-4 items-end">
                {/* Main Arch Image */}
                <div className="col-span-8 relative overflow-hidden rounded-t-full rounded-b-2xl border border-[#183C32]/15 shadow-2xl bg-[#183C32]">
                  <img
                    src="images/artisan-master.jpg"
                    alt="Master Indian artisan hand-engraving a brass and terracotta vessel in a sunlit courtyard"
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#183C32]/90 via-[#183C32]/40 to-transparent p-5 text-[#F5F0E6]">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#BC6847]">
                      Jaipur & Bastar Guilds
                    </p>
                    <p className="font-editorial text-xl">
                      “Time is the primary ingredient in everything we shape.”
                    </p>
                  </div>
                </div>

                {/* Secondary Offset Craft Detail Card */}
                <div className="col-span-4 space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-[#183C32]/15 shadow-xl bg-[#183C32]">
                    <img
                      src="images/cat-pottery.jpg"
                      alt="Handmade Jaipur pottery and Longpi stoneware vessels"
                      loading="lazy"
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>

                  <div className="rounded-2xl bg-[#183C32] p-4 sm:p-5 text-[#F5F0E6] shadow-xl border border-[#BC6847]/30">
                    <p className="font-mono-num text-xs text-[#BC6847]">
                      EST. {brand.estYear}
                    </p>
                    <p className="font-editorial text-lg sm:text-xl leading-snug mt-1">
                      Curated from 8 Indian States
                    </p>
                    <div className="mt-3 h-[1px] w-full bg-[#F5F0E6]/15" />
                    <p className="mt-2 text-[11px] text-[#F5F0E6]/75 leading-relaxed">
                      Rajasthan • Chhattisgarh • Uttar Pradesh • Kashmir • Odisha • Gujarat • Manipur • Kerala
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION B — EXPLORE COLLECTIONS (6 CATEGORIES)
      ============================================================ */}
      <section
        id="collections"
        ref={sectionBRef}
        className="relative bg-[#F5F0E6] text-[#183C32] py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-[#BC6847] font-semibold mb-3">
                Section II • Curated Craft Guilds
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#183C32]">
                Explore Six Pillars of{' '}
                <span className="italic text-[#BC6847]">Indian Craftsmanship.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-[#183C32]/75 leading-relaxed">
              Select any craft discipline below to filter our curated gallery and
              discover authentic works direct from regional master workshops.
            </p>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {CRAFT_CATEGORIES.map((cat, index) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <article
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.name)}
                  data-cursor="Explore Guild"
                  className={`gsap-category-card group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                    isSelected
                      ? 'border-[#BC6847] bg-[#183C32] text-[#F5F0E6] shadow-2xl -translate-y-1'
                      : 'border-[#183C32]/15 bg-[#EBE3D5]/45 text-[#183C32] hover:border-[#BC6847] hover:bg-[#183C32] hover:text-[#F5F0E6] hover:shadow-2xl hover:-translate-y-1.5'
                  }`}
                >
                  {/* Image Container with Hover Zoom & Overlay */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#183C32]">
                    <img
                      src={cat.image}
                      alt={`${cat.name} — ${cat.subtitle}`}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + cat.fallbackImage) {
                          target.src = cat.fallbackImage;
                        }
                      }}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#183C32]/90 via-[#183C32]/25 to-transparent" />

                    {/* Top Index & Region Pill */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#183C32]/85 border border-[#F5F0E6]/20 px-3 py-1 text-[10px] font-mono-num uppercase tracking-[0.18em] text-[#F5F0E6] backdrop-blur-xs">
                        0{index + 1} • {cat.regionTag}
                      </span>
                      <span className="rounded-full bg-[#BC6847] px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#F5F0E6] shadow">
                        {cat.artisanCountText}
                      </span>
                    </div>

                    {/* Technique Tag on Image Bottom */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#BC6847] font-medium">
                        {cat.featuredTechnique}
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight transition-colors">
                        {cat.name}
                      </h3>
                      <p
                        className={`mt-1 text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                          isSelected
                            ? 'text-[#BC6847]'
                            : 'text-[#BC6847] group-hover:text-[#BC6847]'
                        }`}
                      >
                        {cat.subtitle}
                      </p>
                      <p
                        className={`mt-3 text-sm leading-relaxed transition-colors ${
                          isSelected
                            ? 'text-[#F5F0E6]/85'
                            : 'text-[#183C32]/75 group-hover:text-[#F5F0E6]/85'
                        }`}
                      >
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-current/15 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                        Explore {cat.name}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BC6847] text-[#F5F0E6] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

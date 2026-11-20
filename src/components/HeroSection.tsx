import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Compass, Sparkles, ShieldCheck, Rotate3d } from 'lucide-react';
import { BrandConfig, Product, formatINR } from '../config/brandConfig';
import { MagneticButton } from './PageLoaderAndCursor';

interface HeroSectionProps {
  brand: BrandConfig;
  spotlightProduct: Product;
  onExploreClick: () => void;
  onStoryClick: () => void;
  onQuickViewProduct: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  brand,
  spotlightProduct,
  onExploreClick,
  onStoryClick,
  onQuickViewProduct,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const artifactCardRef = useRef<HTMLDivElement>(null);
  const [rotationY, setRotationY] = useState(14);
  const [rotationX, setRotationX] = useState(-6);
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 250);

    const handleScroll = () => {
      if (!bgImageRef.current) return;
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.2) {
        bgImageRef.current.style.transform = `scale(1.08) translate3d(0, ${
          scrollY * 0.22
        }px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Subtle auto-rotation for the floating 3D object when not hovered
  useEffect(() => {
    if (!isAutoOrbit) return;
    let angle = 0;
    let rafId: number;
    const animate = () => {
      angle += 0.018;
      setRotationY(Math.sin(angle) * 14);
      setRotationX(Math.cos(angle * 0.7) * 6);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoOrbit]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = artifactCardRef.current;
    if (!card) return;
    setIsAutoOrbit(false);
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setRotationY(Math.max(-22, Math.min(22, deltaX * 18)));
    setRotationX(Math.max(-16, Math.min(16, -deltaY * 14)));
  };

  const handleHeroMouseLeave = () => {
    setIsAutoOrbit(true);
  };

  return (
    <section
      ref={heroRef}
      aria-label="Hero Banner"
      className="relative min-h-screen w-full overflow-hidden bg-[#183C32] text-[#F5F0E6] flex flex-col justify-between pt-24 pb-10 lg:pt-28 lg:pb-12"
    >
      {/* Parallax Cinematic Background Image with Reveal Mask */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="images/hero-craft.jpg"
          alt="Authentic Indian hand-hammered brass Dhokra vessel and carved terracotta amphora in sunlit courtyard"
          className={`h-full w-full object-cover object-center transition-all duration-[1800ms] ease-out will-change-transform ${
            revealed ? 'scale-105 opacity-45' : 'scale-125 opacity-0'
          }`}
        />
        {/* Deep Forest Green & Warm Terracotta Atmospheric Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(24,60,50,0.95) 0%, rgba(24,60,50,0.80) 48%, rgba(24,60,50,0.52) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 76% 42%, rgba(188,104,71,0.28) 0%, rgba(24,60,50,0) 58%)',
          }}
        />
      </div>

      {/* Subtle Architectural Framing Lines */}
      <div className="pointer-events-none absolute inset-x-6 sm:inset-x-12 top-24 bottom-8 border border-[#F5F0E6]/10 z-0 hidden sm:block" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left 7 Columns: Editorial Narrative & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Eyebrow Provenance Pill */}
            <div
              className={`inline-flex items-center gap-3 rounded-full border border-[#BC6847]/50 bg-[#183C32]/80 px-4 py-1.5 backdrop-blur-sm transition-all duration-1000 ${
                revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[#BC6847] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#F5F0E6]/90 font-medium">
                Curated Indian Masterworks • Living Heritage
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-editorial text-5xl sm:text-6xl md:text-7xl xl:text-[82px] font-normal leading-[1.03] tracking-[-0.02em] text-[#F5F0E6] transition-all duration-1000 delay-150 ${
                revealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Every Creation{' '}
              <span className="italic font-light text-[#BC6847] block sm:inline">
                Has A Story.
              </span>
            </h1>

            {/* Supporting Text */}
            <p
              className={`max-w-2xl text-base sm:text-lg md:text-xl text-[#F5F0E6]/85 font-light leading-relaxed transition-all duration-1000 delay-300 ${
                revealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {brand.heroSubheadline}
            </p>

            {/* Animated Magnetic CTA Buttons */}
            <div
              className={`flex flex-wrap items-center gap-4 sm:gap-5 pt-2 transition-all duration-1000 delay-500 ${
                revealed ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <MagneticButton
                onClick={onExploreClick}
                cursorText="Explore"
                className="group relative inline-flex items-center gap-3 rounded-full bg-[#BC6847] px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-[#F5F0E6] shadow-xl hover:bg-[#F5F0E6] hover:text-[#183C32] transition-colors cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>

              <MagneticButton
                onClick={onStoryClick}
                cursorText="Read Story"
                className="group inline-flex items-center gap-3 rounded-full border border-[#F5F0E6]/35 bg-[#183C32]/50 px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#F5F0E6] backdrop-blur-sm hover:border-[#BC6847] hover:bg-[#BC6847]/20 transition-colors cursor-pointer"
              >
                <Compass className="h-4 w-4 text-[#BC6847]" />
                <span>Our Story</span>
              </MagneticButton>
            </div>

            {/* Authentic Craft Pillars Bar */}
            <div
              className={`grid grid-cols-3 gap-4 pt-6 border-t border-[#F5F0E6]/15 max-w-xl transition-all duration-1000 delay-700 ${
                revealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div>
                <p className="font-editorial text-2xl sm:text-3xl text-[#BC6847]">
                  100%
                </p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#F5F0E6]/75 mt-0.5">
                  Handcrafted by Master Karigars
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl text-[#BC6847]">
                  6 Guilds
                </p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#F5F0E6]/75 mt-0.5">
                  GI-Tagged Regional Traditions
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl text-[#BC6847]">
                  Signed
                </p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#F5F0E6]/75 mt-0.5">
                  Artisan Provenance Dossier
                </p>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Interactive Floating 3D Handicraft Object & Provenance Showcase */}
          <div
            className={`lg:col-span-5 flex flex-col items-center justify-center perspective-1000 transition-all duration-1000 delay-300 ${
              revealed ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
          >
            <div
              ref={artifactCardRef}
              style={{
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
              }}
              className="relative w-full max-w-[430px] preserve-3d transition-transform duration-200 ease-out"
            >
              {/* Outer Sacred Geometry Rotating Brass Halo */}
              <div
                style={{ transform: 'translateZ(-30px)' }}
                className="pointer-events-none absolute -inset-6 flex items-center justify-center"
              >
                <svg
                  className="w-full h-full text-[#BC6847]/35 animate-spin-slow"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="190"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="168"
                    stroke="currentColor"
                    strokeWidth="0.75"
                  />
                </svg>
              </div>

              {/* Main Arch-Framed 3D Craft Stage */}
              <div className="relative rounded-t-full rounded-b-2xl border border-[#BC6847]/45 bg-gradient-to-b from-[#183C32]/90 via-[#183C32] to-[#112B23] p-5 sm:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-md">
                {/* Floating Top 3D Badge */}
                <div
                  style={{ transform: 'translateZ(42px)' }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-[#BC6847] bg-[#183C32] px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#F5F0E6] shadow-lg whitespace-nowrap"
                >
                  <Rotate3d className="h-3.5 w-3.5 text-[#BC6847]" />
                  <span>Interactive 3D Heirloom View</span>
                </div>

                {/* Arch Image + Layered 3D SVG Craft Vessel Overlay */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-xl border border-[#F5F0E6]/15 bg-[#112B23]">
                  <img
                    src="images/hero-craft.jpg"
                    alt={spotlightProduct.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#183C32] via-transparent to-[#183C32]/25" />

                  {/* Floating 3D Sculpted Kalash / Amphora Wireframe Overlay */}
                  <div
                    style={{
                      transform: `translateZ(55px) translateX(${rotationY * 0.7}px) translateY(${
                        -rotationX * 0.7
                      }px)`,
                    }}
                    className="pointer-events-none absolute top-6 right-5 h-24 w-24 rounded-full border border-[#BC6847]/60 bg-[#183C32]/85 backdrop-blur-md flex flex-col items-center justify-center p-2 shadow-2xl animate-float-slow"
                  >
                    {/* 3D Rotating Indian Kalash / Amphora SVG */}
                    <svg
                      viewBox="0 0 80 80"
                      className="h-12 w-12 text-[#BC6847]"
                      fill="none"
                    >
                      <ellipse
                        cx="40"
                        cy="20"
                        rx="12"
                        ry="4"
                        stroke="#F5F0E6"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M28 20 C32 28, 20 36, 20 50 C20 63, 29 70, 40 70 C51 70, 60 63, 60 50 C60 36, 48 28, 52 20"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <ellipse
                        cx="40"
                        cy="48"
                        rx="19"
                        ry="6"
                        stroke="#F5F0E6"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <path
                        d="M40 12 L44 18 L40 22 L36 18 Z"
                        fill="#BC6847"
                      />
                    </svg>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#F5F0E6]/90 mt-0.5">
                      3D Form
                    </span>
                  </div>

                  {/* Floating Left Provenance Tag */}
                  <div
                    style={{
                      transform: `translateZ(48px) translateX(${rotationY * 0.5}px)`,
                    }}
                    className="absolute bottom-24 left-4 rounded-lg border border-[#F5F0E6]/20 bg-[#183C32]/90 px-3.5 py-2 backdrop-blur-md shadow-xl"
                  >
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#BC6847]">
                      Origin Guild
                    </p>
                    <p className="text-xs font-medium text-[#F5F0E6]">
                      {spotlightProduct.origin}
                    </p>
                  </div>

                  {/* Bottom Interactive Spotlight Bar inside Card */}
                  <div className="absolute inset-x-3 bottom-3 rounded-xl border border-[#F5F0E6]/15 bg-[#183C32]/95 p-3.5 backdrop-blur-md flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#BC6847] block">
                        Featured Masterpiece
                      </span>
                      <h2 className="font-editorial text-lg text-[#F5F0E6] leading-snug line-clamp-1">
                        {spotlightProduct.name}
                      </h2>
                      <p className="font-mono-num text-xs text-[#F5F0E6]/80 mt-0.5">
                        {formatINR(spotlightProduct.priceINR)} • {spotlightProduct.craftHours}h Handcraft
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onQuickViewProduct(spotlightProduct)}
                      data-cursor="Inspect"
                      className="shrink-0 rounded-full bg-[#BC6847] px-3.5 py-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#F5F0E6] hover:bg-[#F5F0E6] hover:text-[#183C32] transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                  </div>
                </div>

                {/* Interactive 3D Tilt Controls Footer */}
                <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#F5F0E6]/70 px-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#BC6847]" />
                    Move cursor to tilt 3D perspective
                  </span>
                  <span className="flex items-center gap-1 text-[#BC6847]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Authentic Craft
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 mx-auto flex flex-col items-center justify-center gap-2 pt-2">
        <button
          type="button"
          onClick={onStoryClick}
          aria-label="Scroll down to Brand Story"
          className="group flex flex-col items-center gap-2 text-[#F5F0E6]/75 hover:text-[#BC6847] transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll to Unfold the Heritage
          </span>
          <div className="relative flex h-9 w-5 items-start justify-center rounded-full border border-[#F5F0E6]/30 p-1">
            <ArrowDown className="h-3 w-3 text-[#BC6847] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  X,
  ShieldCheck,
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import {
  BrandConfig,
  CRAFT_CATEGORIES,
  CraftCategoryName,
  DEMO_TESTIMONIALS,
  INSTAGRAM_GALLERY,
  InstagramPost,
} from '../config/brandConfig';

interface TestimonialsInstagramFooterProps {
  brand: BrandConfig;
  onSelectCategory: (category: CraftCategoryName) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenRebrandModal: () => void;
}

export const TestimonialsInstagramFooter: React.FC<
  TestimonialsInstagramFooterProps
> = ({
  brand,
  onSelectCategory,
  onNavigateSection,
  onOpenRebrandModal,
}) => {
  // Testimonial Slider State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Instagram Lightbox State
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  // Newsletter Validation State
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'error' | 'success'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? DEMO_TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % DEMO_TESTIMONIALS.length);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setNewsletterStatus('error');
      setErrorMsg('Please enter your email address to receive the Atelier Journal.');
      return;
    }

    if (!emailRegex.test(trimmed)) {
      setNewsletterStatus('error');
      setErrorMsg('Please enter a valid email address (e.g., patron@domain.com).');
      return;
    }

    setNewsletterStatus('success');
    setErrorMsg('');
    setEmail('');
  };

  const currentTestimonial = DEMO_TESTIMONIALS[activeTestimonial];

  const whatsappUrl = `https://wa.me/${
    brand.whatsappNumber
  }?text=${encodeURIComponent(
    `Namaste ${brand.name} Atelier, I am exploring your Indian handicraft collection and would love to connect.`
  )}`;

  return (
    <>
      {/* ============================================================
          SECTION H — CUSTOMER TESTIMONIALS (ILLUSTRATIVE DEMO SLIDER)
      ============================================================ */}
      <section
        id="testimonials"
        className="relative bg-[#F5F0E6] text-[#183C32] py-24 sm:py-32 border-b border-[#183C32]/12"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BC6847]/40 bg-[#BC6847]/10 px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#BC6847] font-semibold mb-3">
                <span>Section VIII • Collector Reflections (Illustrative Demo)</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#183C32]">
                Words From Patrons of{' '}
                <span className="italic text-[#BC6847]">Living Craft.</span>
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevTestimonial}
                aria-label="Previous Testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#183C32]/25 text-[#183C32] hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNextTestimonial}
                aria-label="Next Testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183C32] text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Testimonial Stage */}
          <div className="relative rounded-3xl border border-[#183C32]/15 bg-[#EBE3D5]/75 p-8 sm:p-12 lg:p-16 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <Quote className="h-10 w-10 text-[#BC6847] opacity-80" />
                <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl italic font-normal leading-relaxed text-[#183C32]">
                  “{currentTestimonial.quote}”
                </blockquote>

                <div className="pt-4 border-t border-[#183C32]/15 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-editorial text-2xl font-semibold text-[#183C32]">
                      {currentTestimonial.patronName}
                    </p>
                    <p className="text-xs text-[#BC6847] font-medium mt-0.5">
                      {currentTestimonial.patronRole} • {currentTestimonial.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCategory(currentTestimonial.category)}
                    className="rounded-full border border-[#183C32]/20 bg-[#F5F0E6] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#183C32] hover:border-[#BC6847] hover:text-[#BC6847] transition-colors cursor-pointer"
                  >
                    Acquired: {currentTestimonial.acquiredPiece}
                  </button>
                </div>
              </div>

              {/* Right Column: All 4 Patron Selector Cards */}
              <div className="lg:col-span-4 space-y-2.5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#183C32]/60 font-semibold mb-2">
                  Select Illustrative Patron Note:
                </p>
                {DEMO_TESTIMONIALS.map((item, idx) => {
                  const isActive = activeTestimonial === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#BC6847] bg-[#183C32] text-[#F5F0E6] shadow-md'
                          : 'border-[#183C32]/12 bg-[#F5F0E6]/70 text-[#183C32] hover:border-[#BC6847]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-editorial text-lg font-medium">
                          {item.patronName}
                        </span>
                        <span className="font-mono-num text-[10px] text-[#BC6847]">
                          0{idx + 1}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 truncate ${
                          isActive ? 'text-[#F5F0E6]/75' : 'text-[#183C32]/65'
                        }`}
                      >
                        {item.location} — {item.category}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION I — INSTAGRAM GALLERY
      ============================================================ */}
      <section
        id="instagram-gallery"
        className="relative bg-[#F5F0E6] text-[#183C32] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#BC6847] font-semibold mb-3">
                Section IX • Visual Chronicle
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-normal leading-[1.08] text-[#183C32]">
                Inside the Atelier{' '}
                <span className="italic text-[#BC6847]">
                  {brand.instagramHandle}
                </span>
              </h2>
            </div>

            <a
              href="#instagram-gallery"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPost(INSTAGRAM_GALLERY[0]);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#183C32]/25 px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#183C32] hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors"
            >
              <InstagramIcon className="h-4 w-4 text-[#BC6847]" />
              <span>View Atelier Journal</span>
            </a>
          </div>

          {/* 8-Card Social Media Inspired Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {INSTAGRAM_GALLERY.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                data-cursor="View Story"
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[#183C32]/15 bg-[#183C32] cursor-pointer"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = post.fallbackImage;
                  }}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#183C32]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-[#F5F0E6]">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#BC6847]">
                    <span>{post.craftTag}</span>
                    <InstagramIcon className="h-4 w-4" />
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-[#F5F0E6]/90 line-clamp-3 font-light">
                    “{post.caption}”
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#F5F0E6]/75 pt-2 border-t border-[#F5F0E6]/15">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#BC6847]" />
                      {post.location}
                    </span>
                    <span className="font-mono-num text-[#BC6847]">
                      {post.likesText}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Post Lightbox Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Atelier Journal Post"
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#183C32]/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#BC6847]/40 bg-[#F5F0E6] text-[#183C32] shadow-2xl grid grid-cols-1 md:grid-cols-2"
          >
            <div className="aspect-square bg-[#183C32]">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#BC6847] font-semibold">
                    <InstagramIcon className="h-4 w-4" />
                    {brand.instagramHandle}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    aria-label="Close Post"
                    className="rounded-full p-1.5 text-[#183C32]/70 hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <span className="inline-block rounded-full bg-[#183C32] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#F5F0E6] mb-3">
                  {selectedPost.craftTag}
                </span>

                <p className="font-editorial text-2xl leading-relaxed text-[#183C32]">
                  “{selectedPost.caption}”
                </p>

                <p className="mt-4 flex items-center gap-1.5 text-xs text-[#183C32]/70">
                  <MapPin className="h-3.5 w-3.5 text-[#BC6847]" />
                  <span>{selectedPost.location}</span>
                </p>
              </div>

              <div className="pt-6 border-t border-[#183C32]/15 flex items-center justify-between">
                <span className="font-mono-num text-xs text-[#BC6847]">
                  {selectedPost.likesText}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPost(null);
                    onNavigateSection('featured-products');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#BC6847] px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#F5F0E6] hover:bg-[#183C32] transition-colors cursor-pointer"
                >
                  <span>Explore Craft</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          SECTION J — NEWSLETTER & LUXURY HERITAGE FOOTER
      ============================================================ */}
      <footer className="bg-[#183C32] text-[#F5F0E6] border-t border-[#BC6847]/30">
        {/* Newsletter Banner */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 py-16 sm:py-20 border-b border-[#F5F0E6]/12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-[#BC6847] font-semibold">
                The {brand.name} Letters
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal leading-tight text-[#F5F0E6]">
                Receive Private Dispatches From India’s Craft Guilds.
              </h2>
              <p className="text-sm sm:text-base text-[#F5F0E6]/75 max-w-xl leading-relaxed">
                Join collectors and interior architects receiving seasonal studio
                notes, early access to single-edition museum releases, and our
                complimentary <em>Care Guide for Bronze, Silk & Stoneware</em>.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={handleNewsletterSubmit}
                noValidate
                className="space-y-3 max-w-xl lg:ml-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#BC6847]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                      }}
                      placeholder="Enter your email address..."
                      aria-label="Email address for newsletter"
                      className="w-full rounded-full border border-[#F5F0E6]/25 bg-[#112B23] pl-11 pr-4 py-4 text-sm text-[#F5F0E6] placeholder-[#F5F0E6]/45 focus:border-[#BC6847] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-full bg-[#BC6847] px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F0E6] hover:bg-[#F5F0E6] hover:text-[#183C32] transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </div>

                {newsletterStatus === 'error' && (
                  <p className="flex items-center gap-2 text-xs text-[#BC6847]">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </p>
                )}

                {newsletterStatus === 'success' && (
                  <p className="flex items-center gap-2 text-xs text-[#F5F0E6] bg-[#BC6847]/25 border border-[#BC6847] rounded-lg px-4 py-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#BC6847] shrink-0" />
                    <span>
                      Dhanyavaad! You are subscribed to the {brand.name} Atelier
                      Dispatches.
                    </span>
                  </p>
                )}

                <p className="text-[11px] text-[#F5F0E6]/55">
                  Zero spam. Only thoughtful stories of Indian craftsmanship twice a month.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <p className="font-editorial text-3xl tracking-[0.22em] text-[#F5F0E6]">
                {brand.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#BC6847] mt-1">
                {brand.tagline}
              </p>
            </div>

            <p className="text-sm text-[#F5F0E6]/75 leading-relaxed max-w-sm">
              Curating museum-grade handmade pottery, lost-wax Dhokra brass,
              seasoned walnut carvings, Kadhwa silks, Meenakari jewellery, and
              traditional paintings directly from master Indian artisan guilds.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#BC6847] px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#F5F0E6] hover:bg-[#F5F0E6] hover:text-[#183C32] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Atelier</span>
              </a>

              <button
                type="button"
                onClick={onOpenRebrandModal}
                className="inline-flex items-center gap-2 rounded-full border border-[#F5F0E6]/25 px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[#F5F0E6]/90 hover:border-[#BC6847] hover:text-[#BC6847] transition-colors cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#BC6847]" />
                <span>Rebrand Demo</span>
              </button>
            </div>
          </div>

          {/* Col 2: Craft Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#BC6847] font-semibold">
              Craft Collections
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F0E6]/80">
              {CRAFT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.name)}
                    className="hover:text-[#BC6847] transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation & Heritage (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#BC6847] font-semibold">
              The House
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F0E6]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('brand-intro')}
                  className="hover:text-[#BC6847] transition-colors cursor-pointer"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('artisan-story')}
                  className="hover:text-[#BC6847] transition-colors cursor-pointer"
                >
                  Master Artisans
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('making-process')}
                  className="hover:text-[#BC6847] transition-colors cursor-pointer"
                >
                  The Making Process
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('bestsellers')}
                  className="hover:text-[#BC6847] transition-colors cursor-pointer"
                >
                  Patron Bestsellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('heritage')}
                  className="hover:text-[#BC6847] transition-colors cursor-pointer"
                >
                  Heritage & Guilds
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier Contact & Provenance (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#BC6847] font-semibold">
              Atelier Concierge
            </h3>
            <ul className="space-y-3 text-sm text-[#F5F0E6]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#BC6847] shrink-0 mt-1" />
                <span>{brand.atelierLocation}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#BC6847] shrink-0" />
                <span className="font-mono-num">{brand.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#BC6847] shrink-0" />
                <span>{brand.email}</span>
              </li>
            </ul>

            <div className="pt-2 rounded-xl border border-[#F5F0E6]/12 bg-[#112B23] p-3.5 text-xs text-[#F5F0E6]/75 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-[#BC6847] shrink-0 mt-0.5" />
              <span>
                Insured pan-India & international archival shipping with signed
                artisan provenance cards.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Universal Demo Notice */}
        <div className="border-t border-[#F5F0E6]/12 bg-[#112B23] py-6">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F0E6]/60">
            <p>
              © {new Date().getFullYear()} {brand.fullTitle}. Universal Luxury
              Handicraft Storefront Demonstration.
            </p>
            <div className="flex items-center gap-5">
              <span>Palette: #183C32 • #F5F0E6 • #BC6847</span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[#BC6847] hover:underline uppercase tracking-widest text-[11px] cursor-pointer"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

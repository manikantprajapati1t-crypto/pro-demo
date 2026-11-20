import React, { useEffect, useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { BrandConfig } from '../config/brandConfig';

interface NavbarProps {
  brand: BrandConfig;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenRebrandModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  onOpenRebrandModal,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Our Story', id: 'brand-intro' },
    { label: 'Collections', id: 'collections' },
    { label: 'Curated Pieces', id: 'featured-products' },
    { label: 'Artisans', id: 'artisan-story' },
    { label: 'Process', id: 'making-process' },
    { label: 'Bestsellers', id: 'bestsellers' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigateSection(id);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateSection('featured-products');
    setIsSearchOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F5F0E6]/95 text-[#183C32] backdrop-blur-md border-b border-[#183C32]/12 py-3.5 shadow-sm'
            : 'bg-gradient-to-b from-[#183C32]/90 via-[#183C32]/50 to-transparent text-[#F5F0E6] py-5'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: Navigation Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-7"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`group relative text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 cursor-pointer ${
                  isScrolled
                    ? 'text-[#183C32]/85 hover:text-[#BC6847]'
                    : 'text-[#F5F0E6]/90 hover:text-[#BC6847]'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-0 bg-[#BC6847] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Mobile Hamburger Trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className={`p-2 rounded-full border transition-colors ${
                isScrolled
                  ? 'border-[#183C32]/20 text-[#183C32] hover:bg-[#183C32] hover:text-[#F5F0E6]'
                  : 'border-[#F5F0E6]/25 text-[#F5F0E6] hover:bg-[#F5F0E6]/15'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Center: Brand Logo & Tagline */}
          <div className="flex flex-col items-center text-center">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[#BC6847]" />
                <span className="font-editorial text-2xl sm:text-3xl lg:text-[32px] font-semibold tracking-[0.22em] leading-none">
                  {brand.name}
                </span>
                <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[#BC6847]" />
              </div>
              <span
                className={`mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.28em] transition-colors ${
                  isScrolled ? 'text-[#BC6847]' : 'text-[#F5F0E6]/80'
                }`}
              >
                {brand.tagline}
              </span>
            </button>
          </div>

          {/* Right: Actions (Search, Rebrand Demo Pill, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Rebrand Demo Button (Universal Demo Feature) */}
            <button
              type="button"
              onClick={onOpenRebrandModal}
              title="Customize Brand Identity for Any Client"
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.16em] font-medium border transition-all cursor-pointer ${
                isScrolled
                  ? 'border-[#BC6847]/40 bg-[#BC6847]/10 text-[#183C32] hover:bg-[#BC6847] hover:text-[#F5F0E6]'
                  : 'border-[#F5F0E6]/30 bg-[#183C32]/60 text-[#F5F0E6] hover:border-[#BC6847] hover:bg-[#BC6847]'
              }`}
            >
              <Sparkles className="h-3 w-3 text-[#BC6847] group-hover:text-current" />
              <span>Rebrand Demo</span>
            </button>

            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label="Search Handicrafts"
              className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                isScrolled
                  ? 'hover:bg-[#183C32]/10 text-[#183C32]'
                  : 'hover:bg-[#F5F0E6]/15 text-[#F5F0E6]'
              }`}
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Wishlist (${wishlistCount} items)`}
              className={`relative p-2.5 rounded-full transition-colors cursor-pointer ${
                isScrolled
                  ? 'hover:bg-[#183C32]/10 text-[#183C32]'
                  : 'hover:bg-[#F5F0E6]/15 text-[#F5F0E6]'
              }`}
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#BC6847] px-1 text-[10px] font-mono-num font-semibold text-[#F5F0E6]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
              className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all cursor-pointer ${
                isScrolled
                  ? 'bg-[#183C32] text-[#F5F0E6] hover:bg-[#BC6847]'
                  : 'bg-[#F5F0E6] text-[#183C32] hover:bg-[#BC6847] hover:text-[#F5F0E6]'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="font-mono-num text-[11px] px-1.5 py-0.2 rounded-full bg-[#BC6847] text-[#F5F0E6]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {isSearchOpen && (
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-3 pb-2 animate-fadeIn">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 rounded-lg bg-[#F5F0E6] border border-[#183C32]/20 px-4 py-2.5 text-[#183C32] shadow-lg"
            >
              <Search className="h-4 w-4 text-[#BC6847] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by craft (Dhokra brass, Jaipur pottery, Banarasi silk, walnut wood, Pattachitra)..."
                className="w-full bg-transparent text-sm text-[#183C32] placeholder-[#183C32]/50 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="text-xs uppercase tracking-wider text-[#183C32]/60 hover:text-[#BC6847]"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="shrink-0 rounded bg-[#183C32] px-4 py-1.5 text-xs uppercase tracking-widest text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer"
              >
                Explore
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close Search"
                className="p-1 text-[#183C32]/60 hover:text-[#183C32]"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[70] flex flex-col bg-[#183C32] text-[#F5F0E6] p-6 sm:p-10 overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b border-[#F5F0E6]/15 pb-5">
            <div>
              <p className="font-editorial text-2xl tracking-[0.2em] text-[#F5F0E6]">
                {brand.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#BC6847]">
                {brand.tagline}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
              className="rounded-full border border-[#F5F0E6]/25 p-2.5 text-[#F5F0E6] hover:bg-[#BC6847] hover:border-[#BC6847] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="my-8 flex flex-col gap-5">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="group flex items-center justify-between border-b border-[#F5F0E6]/10 pb-4 text-left"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono-num text-xs text-[#BC6847]">
                    0{idx + 1}
                  </span>
                  <span className="font-editorial text-3xl tracking-wide text-[#F5F0E6] group-hover:text-[#BC6847] transition-colors">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#BC6847] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-4 pt-6 border-t border-[#F5F0E6]/15">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenRebrandModal();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#BC6847] bg-[#BC6847]/15 py-3 text-xs uppercase tracking-[0.2em] text-[#F5F0E6] hover:bg-[#BC6847] transition-colors"
            >
              <Compass className="h-4 w-4 text-[#BC6847]" />
              <span>Customize Demo Brand Identity</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#F5F0E6]/70">
              <span>{brand.atelierLocation}</span>
              <span className="font-mono-num text-[#BC6847]">{brand.phoneDisplay}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

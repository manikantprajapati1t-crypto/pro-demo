import { useEffect, useState } from 'react';
import { MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  BrandConfig,
  CraftCategoryName,
  DEFAULT_BRAND_CONFIG,
  PRODUCTS,
  Product,
} from './config/brandConfig';
import { CustomCursor, PageLoader } from './components/PageLoaderAndCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandAndCollections } from './components/BrandAndCollections';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { ArtisanAndProcessSection } from './components/ArtisanAndProcessSection';
import { BestsellersAndHeritage } from './components/BestsellersAndHeritage';
import { TestimonialsInstagramFooter } from './components/TestimonialsInstagramFooter';
import {
  CartDrawer,
  CartItem,
  QuickViewModal,
  RebrandDemoModal,
  WishlistDrawer,
} from './components/EcommerceModals';

export function App() {
  // Centralized Brand Configuration (Can be customized live for any client)
  const [brand, setBrand] = useState<BrandConfig>(DEFAULT_BRAND_CONFIG);

  // Category & Search Filtering State
  const [selectedCategory, setSelectedCategory] = useState<
    CraftCategoryName | 'All'
  >('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Shopping Cart State (Pre-seeded with 1 heirloom piece for immediate demo discovery, or editable)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-4']);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Quick-View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  // Universal Demo Brand Customizer Modal State
  const [isRebrandModalOpen, setIsRebrandModalOpen] = useState(false);

  // Subtle Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${brand.fullTitle} | Luxury Indian Handicraft Atelier`;
  }, [brand]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategoryAndScroll = (category: CraftCategoryName) => {
    setSelectedCategory(category);
    scrollToSection('featured-products');
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your Collector’s Bag`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Saved Heirlooms`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your Wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistedProducts = PRODUCTS.filter((p) =>
    wishlistIds.includes(p.id)
  );

  const whatsappFloatingUrl = `https://wa.me/${
    brand.whatsappNumber
  }?text=${encodeURIComponent(
    `Namaste ${brand.name} Atelier, I am browsing your online showcase and would like to speak with a craft specialist.`
  )}`;

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#183C32] relative selection:bg-[#BC6847] selection:text-[#F5F0E6]">
      {/* Page Loader & Custom Desktop Cursor */}
      <PageLoader brand={brand} />
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar
        brand={brand}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenRebrandModal={() => setIsRebrandModalOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content */}
      <main>
        {/* Cinematic Hero Experience */}
        <HeroSection
          brand={brand}
          spotlightProduct={PRODUCTS[0]}
          onExploreClick={() => scrollToSection('collections')}
          onStoryClick={() => scrollToSection('brand-intro')}
          onQuickViewProduct={(product) => setQuickViewProduct(product)}
        />

        {/* Section A (Brand Introduction) & Section B (Explore Collections — 6 Categories) */}
        <BrandAndCollections
          brand={brand}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategoryAndScroll}
        />

        {/* Section C (Featured Products — 8 Handmade Products + 3D Rotating Object Showcase) */}
        <FeaturedProductsSection
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* Section D (The Artisan Story) & Section E (The Making Process — 4 Stages) */}
        <ArtisanAndProcessSection
          brand={brand}
          onExploreArtisanWorks={() => scrollToSection('featured-products')}
        />

        {/* Section F (Bestsellers Horizontal Carousel) & Section G (Heritage Experience Banner) */}
        <BestsellersAndHeritage
          brand={brand}
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onExploreAllClick={() => scrollToSection('featured-products')}
        />

        {/* Section H (Testimonials), Section I (Instagram Gallery), Section J (Newsletter & Footer) */}
        <TestimonialsInstagramFooter
          brand={brand}
          onSelectCategory={handleSelectCategoryAndScroll}
          onNavigateSection={scrollToSection}
          onOpenRebrandModal={() => setIsRebrandModalOpen(true)}
        />
      </main>

      {/* E-Commerce Modals & Drawers */}
      <QuickViewModal
        brand={brand}
        product={quickViewProduct}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        brand={brand}
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        products={wishlistedProducts}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      <RebrandDemoModal
        isOpen={isRebrandModalOpen}
        brand={brand}
        onClose={() => setIsRebrandModalOpen(false)}
        onUpdateBrand={(updated) => {
          setBrand(updated);
          showToast(`Storefront rebranded to "${updated.fullTitle}"`);
        }}
      />

      {/* Floating Bottom-Right WhatsApp Concierge & Rebrand Trigger */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={whatsappFloatingUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with WhatsApp Atelier Concierge"
          className="group flex items-center gap-2.5 rounded-full border border-[#BC6847] bg-[#183C32] px-4 py-3 text-xs uppercase tracking-[0.16em] font-semibold text-[#F5F0E6] shadow-2xl hover:bg-[#BC6847] transition-all"
        >
          <MessageCircle className="h-4 w-4 text-[#BC6847] group-hover:text-[#F5F0E6]" />
          <span className="hidden sm:inline">Atelier Concierge</span>
        </a>
      </div>

      {/* Floating Bottom-Left Universal Demo Rebrand Pill (Mobile & Desktop accessible) */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsRebrandModalOpen(true)}
          className="flex items-center gap-2 rounded-full border border-[#183C32]/20 bg-[#F5F0E6]/95 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#183C32] shadow-xl backdrop-blur-md hover:border-[#BC6847] hover:bg-[#183C32] hover:text-[#F5F0E6] transition-all cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#BC6847]" />
          <span>Client Pitch: Rebrand Demo</span>
        </button>
      </div>

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-5 z-[95] flex items-center gap-2.5 rounded-full border border-[#BC6847] bg-[#183C32] px-5 py-3 text-xs font-medium text-[#F5F0E6] shadow-2xl animate-bounce"
        >
          <CheckCircle2 className="h-4 w-4 text-[#BC6847] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Heart,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Gift,
  ZoomIn,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import {
  BrandConfig,
  DEFAULT_BRAND_CONFIG,
  Product,
  formatINR,
} from '../config/brandConfig';

export interface CartItem {
  product: Product;
  quantity: number;
}

/* ============================================================
   1. PRODUCT QUICK-VIEW MODAL
============================================================ */
interface QuickViewModalProps {
  brand: BrandConfig;
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  brand,
  product,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'specs' | 'care'>('story');

  if (!product) return null;

  const images = [product.image, product.secondaryImage];
  const currentImg = images[selectedImageIdx] || product.image;

  const whatsappProductUrl = `https://wa.me/${
    brand.whatsappNumber
  }?text=${encodeURIComponent(
    `Namaste ${brand.name} Atelier, I would like to inquire about "${product.name}" (SKU: ${
      product.sku
    }, Price: ${formatINR(product.priceINR)}).`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view ${product.name}`}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#183C32]/85 p-3 sm:p-6 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-[#BC6847]/40 bg-[#F5F0E6] text-[#183C32] shadow-2xl grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#183C32] text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer shadow-lg"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left 6 Columns: Image Stage & Thumbnails */}
        <div className="lg:col-span-6 bg-[#183C32] p-5 sm:p-7 flex flex-col justify-between">
          <div
            onClick={() => setIsZoomed((z) => !z)}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#F5F0E6]/15 bg-[#112B23] cursor-zoom-in"
          >
            <img
              src={currentImg}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = product.fallbackImage;
              }}
              className={`h-full w-full object-cover object-center transition-transform duration-500 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 hover:scale-105'
              }`}
            />
            <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
              {product.badge && (
                <span className="rounded-full bg-[#BC6847] px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#F5F0E6]">
                  {product.badge}
                </span>
              )}
              <span className="rounded-full bg-[#183C32]/85 border border-[#F5F0E6]/20 px-3 py-1 text-[10px] font-mono-num text-[#F5F0E6]">
                {product.sku}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed((z) => !z);
              }}
              className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-[#183C32]/85 border border-[#F5F0E6]/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#F5F0E6]"
            >
              <ZoomIn className="h-3.5 w-3.5 text-[#BC6847]" />
              <span>{isZoomed ? 'Reset Zoom' : 'Click to Zoom'}</span>
            </button>
          </div>

          {/* Thumbnail Selector */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedImageIdx(idx);
                    setIsZoomed(false);
                  }}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                    selectedImageIdx === idx
                      ? 'border-[#BC6847] scale-105'
                      : 'border-[#F5F0E6]/20 opacity-65 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    onError={(e) => {
                      e.currentTarget.src = product.fallbackImage;
                    }}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="text-right text-[#F5F0E6]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#BC6847]">
                Artisan Hours
              </p>
              <p className="font-mono-num text-sm font-semibold">
                {product.craftHours} Hours by Hand
              </p>
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Provenance Dossier & Actions */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#BC6847] font-semibold">
                {product.category}
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#183C32] leading-tight mt-1">
                {product.name}
              </h2>
              <div className="mt-3 flex flex-wrap items-baseline gap-4">
                <span className="font-mono-num text-2xl sm:text-3xl font-semibold text-[#183C32]">
                  {formatINR(product.priceINR)}
                </span>
                <span className="text-xs text-[#183C32]/65">
                  Inclusive of archival provenance dossier & GST
                </span>
              </div>
            </div>

            {/* Origin & Master Artisan Box */}
            <div className="rounded-2xl border border-[#183C32]/14 bg-[#EBE3D5]/75 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#BC6847] font-semibold flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Origin Guild
                </p>
                <p className="font-medium text-[#183C32] mt-0.5">{product.origin}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#BC6847] font-semibold flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Master Karigar
                </p>
                <p className="font-medium text-[#183C32] mt-0.5">
                  {product.artisanName}
                </p>
              </div>
            </div>

            {/* Dossier Tabs: Story / Specifications / Care */}
            <div>
              <div className="flex border-b border-[#183C32]/15 gap-6 mb-4">
                {[
                  { id: 'story', label: 'The Craft Story' },
                  { id: 'specs', label: 'Dimensions & Matter' },
                  { id: 'care', label: 'Heirloom Care' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActiveTab(tab.id as 'story' | 'specs' | 'care')
                    }
                    className={`pb-2.5 text-xs uppercase tracking-[0.16em] font-semibold border-b-2 transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-[#BC6847] text-[#183C32]'
                        : 'border-transparent text-[#183C32]/55 hover:text-[#183C32]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'story' && (
                <p className="text-sm text-[#183C32]/85 leading-relaxed">
                  {product.story}
                </p>
              )}

              {activeTab === 'specs' && (
                <dl className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 border-b border-[#183C32]/10">
                    <dt className="text-[#183C32]/65">Dimensions</dt>
                    <dd className="font-mono-num font-medium text-[#183C32] text-right">
                      {product.dimensions}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#183C32]/10">
                    <dt className="text-[#183C32]/65">Raw Materials</dt>
                    <dd className="font-medium text-[#183C32] text-right max-w-xs">
                      {product.materials}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <dt className="text-[#183C32]/65">Approximate Weight</dt>
                    <dd className="font-mono-num font-medium text-[#183C32]">
                      {product.weight}
                    </dd>
                  </div>
                </dl>
              )}

              {activeTab === 'care' && (
                <p className="text-sm text-[#183C32]/85 leading-relaxed">
                  {product.careInstructions}
                </p>
              )}
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="mt-8 pt-6 border-t border-[#183C32]/15 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center rounded-full border border-[#183C32]/25 bg-[#EBE3D5] px-3 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-1.5 text-[#183C32] hover:text-[#BC6847] cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-9 text-center font-mono-num text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-1.5 text-[#183C32] hover:text-[#BC6847] cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Primary Add to Cart */}
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#183C32] px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>
                  Add to Bag • {formatINR(product.priceINR * quantity)}
                </span>
              </button>

              {/* Wishlist Toggle */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                aria-label="Toggle Wishlist"
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-[#BC6847] bg-[#BC6847] text-[#F5F0E6]'
                    : 'border-[#183C32]/25 text-[#183C32] hover:border-[#BC6847]'
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`}
                />
              </button>
            </div>

            {/* Direct WhatsApp Inquiry CTA */}
            <a
              href={whatsappProductUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-full border border-[#BC6847] bg-[#BC6847]/10 py-3 text-xs uppercase tracking-[0.18em] font-semibold text-[#183C32] hover:bg-[#BC6847] hover:text-[#F5F0E6] transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-[#BC6847] group-hover:text-current" />
              <span>Inquire About This Piece via WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   2. SHOPPING CART DRAWER
============================================================ */
interface CartDrawerProps {
  brand: BrandConfig;
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  brand,
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [complimentaryGiftWrap, setComplimentaryGiftWrap] = useState(true);
  const [showDemoReceipt, setShowDemoReceipt] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.priceINR * item.quantity,
    0
  );
  const freeShippingProgress = Math.min(
    100,
    (subtotal / brand.freeShippingThresholdINR) * 100
  );

  const whatsappCartText = items
    .map(
      (i) =>
        `• ${i.product.name} (${i.product.sku}) × ${i.quantity} = ${formatINR(
          i.product.priceINR * i.quantity
        )}`
    )
    .join('\n');

  const whatsappCheckoutUrl = `https://wa.me/${
    brand.whatsappNumber
  }?text=${encodeURIComponent(
    `Namaste ${brand.name} Concierge,\nI would like to inquire about acquiring the following pieces from my bag:\n\n${whatsappCartText}\n\nTotal Estimate: ${formatINR(
      subtotal
    )}${complimentaryGiftWrap ? '\n(With Complimentary Khadi Gift Wrapping)' : ''}`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={onClose}
      className="fixed inset-0 z-[80] flex justify-end bg-[#183C32]/75 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-md flex-col bg-[#F5F0E6] text-[#183C32] shadow-2xl border-l border-[#183C32]/15"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#183C32]/15 px-6 py-5 bg-[#EBE3D5]/70">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#BC6847]" />
            <h2 className="font-editorial text-2xl font-semibold text-[#183C32]">
              Your Collector’s Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Shopping Bag"
            className="rounded-full p-2 text-[#183C32]/70 hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Complimentary Insured Shipping Progress Bar */}
        <div className="bg-[#183C32] px-6 py-3 text-[#F5F0E6]">
          <div className="flex items-center justify-between text-[11px]">
            <span>
              {subtotal >= brand.freeShippingThresholdINR
                ? '✓ Eligible for Complimentary Insured Archival Shipping'
                : `Add ${formatINR(
                    brand.freeShippingThresholdINR - subtotal
                  )} more for complimentary insured shipping`}
            </span>
            <span className="font-mono-num text-[#BC6847]">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="mt-1.5 h-1 w-full rounded-full bg-[#F5F0E6]/20 overflow-hidden">
            <div
              className="h-full bg-[#BC6847] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="h-12 w-12 text-[#BC6847]/60 mb-4" />
              <p className="font-editorial text-3xl text-[#183C32]">
                Your Collector’s Bag is Empty
              </p>
              <p className="mt-2 text-xs text-[#183C32]/70 max-w-xs leading-relaxed">
                Explore our six Indian craft guilds to discover hand-thrown pottery,
                lost-wax Dhokra bronze, and handwoven Banarasi silks.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-[#183C32] px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer"
              >
                Explore Masterworks
              </button>
            </div>
          ) : showDemoReceipt ? (
            <div className="rounded-2xl border border-[#BC6847] bg-[#EBE3D5] p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#183C32]">
                <CheckCircle2 className="h-6 w-6 text-[#BC6847]" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#BC6847] font-semibold block">
                    Interactive Storefront Demonstration
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold">
                    Demo Inquiry Summary
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#183C32]/80 leading-relaxed bg-[#F5F0E6] p-3.5 rounded-xl border border-[#183C32]/12">
                <strong>Note:</strong> This is an interactive master storefront
                demonstration for <strong>{brand.fullTitle}</strong>. No real payment
                has been charged and no commercial order has been placed.
              </p>

              <div className="space-y-2 border-t border-b border-[#183C32]/15 py-3 text-xs">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between"
                  >
                    <span className="truncate pr-2">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-mono-num font-semibold">
                      {formatINR(item.product.priceINR * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono-num text-sm font-semibold">
                <span>Estimated Total</span>
                <span className="text-[#BC6847]">{formatINR(subtotal)}</span>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDemoReceipt(false)}
                  className="w-full rounded-full bg-[#183C32] py-3 text-xs uppercase tracking-[0.18em] font-semibold text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer"
                >
                  Return to Bag
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setShowDemoReceipt(false);
                    onClose();
                  }}
                  className="w-full rounded-full border border-[#183C32]/25 py-2.5 text-xs uppercase tracking-[0.16em] text-[#183C32]/75 hover:text-[#183C32] cursor-pointer"
                >
                  Reset Demo Bag
                </button>
              </div>
            </div>
          ) : (
            <>
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-2xl border border-[#183C32]/12 bg-[#EBE3D5]/65 p-3.5"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = product.fallbackImage;
                    }}
                    className="h-24 w-20 rounded-xl object-cover bg-[#183C32] shrink-0"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-editorial text-lg font-medium leading-snug text-[#183C32]">
                          {product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-[#183C32]/45 hover:text-[#BC6847] transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#BC6847]">
                        {product.category} • {product.sku}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-[#183C32]/20 bg-[#F5F0E6] px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-[#183C32] hover:text-[#BC6847] cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center font-mono-num text-xs font-semibold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-[#183C32] hover:text-[#BC6847] cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-mono-num text-sm font-semibold text-[#183C32]">
                        {formatINR(product.priceINR * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Complimentary Khadi Gift Packaging Toggle */}
              <label className="flex items-start gap-3 rounded-xl border border-[#183C32]/15 bg-[#EBE3D5]/45 p-3.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={complimentaryGiftWrap}
                  onChange={(e) => setComplimentaryGiftWrap(e.target.checked)}
                  className="mt-1 accent-[#BC6847]"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#183C32] flex items-center gap-1.5">
                    <Gift className="h-3.5 w-3.5 text-[#BC6847]" />
                    Complimentary Unbleached Khadi & Wax-Seal Gift Wrap
                  </span>
                  <span className="text-[#183C32]/70 block mt-0.5">
                    Includes signed master artisan provenance card.
                  </span>
                </div>
              </label>
            </>
          )}
        </div>

        {/* Footer Checkout Actions */}
        {items.length > 0 && !showDemoReceipt && (
          <div className="border-t border-[#183C32]/15 bg-[#EBE3D5]/80 p-6 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-xs text-[#183C32]/70">
                <span>Insured Archival Shipping</span>
                <span className="font-mono-num">
                  {subtotal >= brand.freeShippingThresholdINR
                    ? 'COMPLIMENTARY'
                    : formatINR(350)}
                </span>
              </div>
              <div className="flex items-center justify-between font-semibold text-base pt-1 border-t border-[#183C32]/12">
                <span>Estimated Total</span>
                <span className="font-mono-num text-xl text-[#183C32]">
                  {formatINR(
                    subtotal >= brand.freeShippingThresholdINR
                      ? subtotal
                      : subtotal + 350
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setShowDemoReceipt(true)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#183C32] py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 text-[#BC6847]" />
                <span>Preview Demo Checkout Summary</span>
              </button>

              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#BC6847] py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#F5F0E6] hover:bg-[#183C32] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Send Bag to WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   3. WISHLIST DRAWER
============================================================ */
interface WishlistDrawerProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onRemoveWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  products,
  onClose,
  onRemoveWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved Wishlist"
      onClick={onClose}
      className="fixed inset-0 z-[80] flex justify-end bg-[#183C32]/75 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-md flex-col bg-[#F5F0E6] text-[#183C32] shadow-2xl border-l border-[#183C32]/15"
      >
        <div className="flex items-center justify-between border-b border-[#183C32]/15 px-6 py-5 bg-[#EBE3D5]/70">
          <div className="flex items-center gap-2.5">
            <Heart className="h-5 w-5 text-[#BC6847] fill-current" />
            <h2 className="font-editorial text-2xl font-semibold text-[#183C32]">
              Saved Heirlooms ({products.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Wishlist"
            className="rounded-full p-2 text-[#183C32]/70 hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <Heart className="h-12 w-12 text-[#BC6847]/60 mb-4" />
              <p className="font-editorial text-3xl text-[#183C32]">
                Your Wishlist is Empty
              </p>
              <p className="mt-2 text-xs text-[#183C32]/70 max-w-xs leading-relaxed">
                Tap the heart icon on any handcrafted creation to curate your personal
                shortlist.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl border border-[#183C32]/12 bg-[#EBE3D5]/65 p-3.5"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src = product.fallbackImage;
                  }}
                  className="h-24 w-20 rounded-xl object-cover bg-[#183C32] shrink-0"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-editorial text-lg font-medium text-[#183C32] leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-mono-num text-sm font-semibold text-[#BC6847] mt-0.5">
                      {formatINR(product.priceINR)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => onMoveToCart(product)}
                      className="flex-1 rounded-full bg-[#183C32] py-1.5 px-3 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#F5F0E6] hover:bg-[#BC6847] transition-colors cursor-pointer"
                    >
                      Move to Bag
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveWishlist(product)}
                      aria-label="Remove from wishlist"
                      className="rounded-full border border-[#183C32]/20 p-1.5 text-[#183C32]/60 hover:text-[#BC6847] cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   4. UNIVERSAL DEMO BRAND CUSTOMIZER MODAL
   Allows instant client rebranding during live presentations
============================================================ */
interface RebrandDemoModalProps {
  isOpen: boolean;
  brand: BrandConfig;
  onClose: () => void;
  onUpdateBrand: (newBrand: BrandConfig) => void;
}

export const RebrandDemoModal: React.FC<RebrandDemoModalProps> = ({
  isOpen,
  brand,
  onClose,
  onUpdateBrand,
}) => {
  const [formState, setFormState] = useState<BrandConfig>(brand);

  if (!isOpen) return null;

  const presetBrands = [
    {
      name: 'KARIGAR',
      tagline: 'The Art of Indian Craft',
      location: 'Johari Bazar Heritage Precinct, Jaipur & Mehrauli, New Delhi',
    },
    {
      name: 'VANYA ROYAL',
      tagline: 'Jaipur Heritage Emporium',
      location: 'MI Road & City Palace Precinct, Jaipur, Rajasthan',
    },
    {
      name: 'DAKSHIN ATELIER',
      tagline: 'Fine Tanjore & Kansa Bronzes',
      location: 'Kala Ghoda, Mumbai & Mylapore, Chennai',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBrand({
      ...formState,
      fullTitle: `${formState.name} — ${formState.tagline}`,
    });
    onClose();
  };

  const handleReset = () => {
    setFormState(DEFAULT_BRAND_CONFIG);
    onUpdateBrand(DEFAULT_BRAND_CONFIG);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Universal Demo Brand Customizer"
      onClick={onClose}
      className="fixed inset-0 z-[85] flex items-center justify-center bg-[#183C32]/85 p-4 backdrop-blur-sm overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-3xl border border-[#BC6847]/50 bg-[#F5F0E6] text-[#183C32] p-6 sm:p-8 shadow-2xl my-auto"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#183C32]/15 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#BC6847] font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              Universal Client Pitch Tool
            </span>
            <h2 className="font-editorial text-3xl font-semibold text-[#183C32] mt-0.5">
              Live Brand Identity Customizer
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Modal"
            className="rounded-full p-2 text-[#183C32]/70 hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-3 text-xs text-[#183C32]/75 leading-relaxed">
          Showcasing this master demo to an Indian handicraft client? Customize the
          brand name, tagline, location, or WhatsApp concierge number below to preview
          their identity across the entire storefront immediately.
        </p>

        {/* One-Click Client Presets */}
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#183C32]/60 font-semibold mb-2">
            Quick Client Presets:
          </p>
          <div className="flex flex-wrap gap-2">
            {presetBrands.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    name: preset.name,
                    tagline: preset.tagline,
                    fullTitle: `${preset.name} — ${preset.tagline}`,
                    atelierLocation: preset.location,
                  }))
                }
                className="rounded-full border border-[#183C32]/20 bg-[#EBE3D5] px-3.5 py-1.5 text-xs font-medium text-[#183C32] hover:border-[#BC6847] hover:bg-[#BC6847] hover:text-[#F5F0E6] transition-colors cursor-pointer"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] text-[#183C32]/75 font-semibold mb-1">
                Brand Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full rounded-xl border border-[#183C32]/25 bg-white/70 px-3.5 py-2.5 text-sm text-[#183C32] focus:border-[#BC6847] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] text-[#183C32]/75 font-semibold mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={formState.tagline}
                onChange={(e) =>
                  setFormState({ ...formState, tagline: e.target.value })
                }
                className="w-full rounded-xl border border-[#183C32]/25 bg-white/70 px-3.5 py-2.5 text-sm text-[#183C32] focus:border-[#BC6847] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] text-[#183C32]/75 font-semibold mb-1">
                WhatsApp Number (Country + Phone)
              </label>
              <input
                type="text"
                value={formState.whatsappNumber}
                onChange={(e) =>
                  setFormState({ ...formState, whatsappNumber: e.target.value })
                }
                className="w-full rounded-xl border border-[#183C32]/25 bg-white/70 px-3.5 py-2.5 font-mono-num text-sm text-[#183C32] focus:border-[#BC6847] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] text-[#183C32]/75 font-semibold mb-1">
                Concierge Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full rounded-xl border border-[#183C32]/25 bg-white/70 px-3.5 py-2.5 text-sm text-[#183C32] focus:border-[#BC6847] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.16em] text-[#183C32]/75 font-semibold mb-1">
              Showroom / Atelier Location
            </label>
            <input
              type="text"
              value={formState.atelierLocation}
              onChange={(e) =>
                setFormState({ ...formState, atelierLocation: e.target.value })
              }
              className="w-full rounded-xl border border-[#183C32]/25 bg-white/70 px-3.5 py-2.5 text-sm text-[#183C32] focus:border-[#BC6847] focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-[#183C32]/15 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#183C32]/25 px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[#183C32] hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to KARIGAR</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[#BC6847] px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F0E6] hover:bg-[#183C32] transition-colors cursor-pointer"
            >
              <span>Apply Live Rebrand</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

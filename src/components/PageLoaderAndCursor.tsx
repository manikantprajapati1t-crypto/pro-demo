import React, { useEffect, useRef, useState } from 'react';
import { BrandConfig } from '../config/brandConfig';

interface PageLoaderProps {
  brand: BrandConfig;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ brand }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsHidden(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 45);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 680);

    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, 1350);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#183C32] text-[#F5F0E6] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Decorative Sacred Geometry Mandala SVG */}
      <div className="relative mb-8 flex items-center justify-center">
        <svg
          className="h-24 w-24 text-[#BC6847] animate-spin-slow opacity-80"
          viewBox="0 0 120 120"
          fill="none"
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="3 3"
          />
          <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="1" />
          <path
            d="M60 6 L72 48 L114 60 L72 72 L60 114 L48 72 L6 60 L48 48 Z"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <circle cx="60" cy="60" r="14" stroke="#F5F0E6" strokeWidth="1" />
        </svg>
        <span className="absolute font-editorial text-xl tracking-widest text-[#F5F0E6]">
          {brand.name.slice(0, 1)}
        </span>
      </div>

      <p className="text-[11px] uppercase tracking-[0.35em] text-[#BC6847] mb-2">
        Indian Heritage Atelier • Est. {brand.estYear}
      </p>
      <h2 className="font-editorial text-3xl sm:text-5xl tracking-[0.18em] text-[#F5F0E6] font-normal mb-6">
        {brand.name}
      </h2>

      <div className="w-48 sm:w-64 h-[1px] bg-[#F5F0E6]/20 overflow-hidden relative">
        <div
          className="h-full bg-[#BC6847] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="mt-3 flex items-center gap-4 text-[11px] font-mono-num tracking-[0.2em] text-[#F5F0E6]/70">
        <span>CURATING ARCHIVE</span>
        <span>{Math.min(progress, 100)}%</span>
      </div>
    </div>
  );
};

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      setIsDesktop(hasFinePointer && !prefersReducedMotion && window.innerWidth >= 1024);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const customLabelEl = target?.closest('[data-cursor]') as HTMLElement | null;
      const interactiveEl = target?.closest('a, button, input, select, [role="button"]');

      if (customLabelEl) {
        setCursorLabel(customLabelEl.getAttribute('data-cursor') || '');
        setIsHoveringInteractive(true);
      } else if (interactiveEl) {
        setCursorLabel('');
        setIsHoveringInteractive(true);
      } else {
        setCursorLabel('');
        setIsHoveringInteractive(false);
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('resize', checkPointer);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[90] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#BC6847] transition-opacity duration-200"
      />
      <div
        ref={cursorRingRef}
        className={`pointer-events-none fixed top-0 left-0 z-[90] flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          cursorLabel
            ? '-ml-11 -mt-11 h-22 w-22 bg-[#183C32]/90 border-[#BC6847] text-[#F5F0E6] shadow-xl backdrop-blur-xs'
            : isHoveringInteractive
            ? '-ml-6 -mt-6 h-12 w-12 border-[#BC6847] bg-[#BC6847]/15'
            : '-ml-4 -mt-4 h-8 w-8 border-[#BC6847]/60 bg-transparent'
        }`}
      >
        {cursorLabel && (
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F5F0E6] text-center px-1 leading-tight">
            {cursorLabel}
          </span>
        )}
      </div>
    </>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  cursorText?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  cursorText,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
  };

  const handleMouseLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = 'translate3d(0px, 0px, 0)';
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor={cursorText}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </button>
  );
};

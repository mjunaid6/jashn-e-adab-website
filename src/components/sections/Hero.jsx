import { useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Archive, ChevronDown } from 'lucide-react';

import ParticleField from '@/components/animations/ParticleField';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Hero — Full-screen immersive hero section for Jashn-e-Adab.
 *
 * Features:
 * • Cinematic multi-layer gradient background with animated radial glows
 * • Canvas-based golden particle field overlay
 * • GSAP staggered entrance animation (pre-heading → headline → subtitle → buttons)
 * • Floating Urdu couplet (Ghalib) in Nastaliq script
 * • Animated scroll indicator at the bottom
 * • Framer Motion hover effects on CTA buttons
 * • Full i18n support via LanguageContext
 */
export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  // ---- GSAP entrance animation ----
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1,
        },
      });

      tl.fromTo(
        '.hero-preheading',
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          '.hero-headline',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0 },
          '-=0.5' // overlap for fluid stagger
        )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta-group',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero-couplet',
          { opacity: 0, x: 40 },
          { opacity: 0.6, x: 0, duration: 1.2 },
          '-=0.6'
        )
        .fromTo(
          '.hero-scroll-indicator',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Jashn-e-Adab — Celebrating India's Literary Heritage"
      className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ================================================
          Layer 1 — Cinematic gradient background
          ================================================ */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          background:
            'linear-gradient(135deg, #0a1628 0%, #12343B 30%, #1a2a3a 60%, #0a1628 100%)',
        }}
      />

      {/* ================================================
          Layer 2 — Animated radial glow accents
          Subtle colour orbs that drift slowly to create depth.
          ================================================ */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        {/* Gold accent — upper left */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(214,179,112,0.35) 0%, transparent 70%)',
            animation: 'heroGlow1 12s ease-in-out infinite alternate',
          }}
        />
        {/* Teal accent — lower right */}
        <div
          className="absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle, rgba(18,52,59,0.6) 0%, transparent 70%)',
            animation: 'heroGlow2 15s ease-in-out infinite alternate',
          }}
        />
        {/* Maroon accent — centre-bottom */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(94,42,42,0.4) 0%, transparent 70%)',
            animation: 'heroGlow3 18s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Inject keyframes for the glow animations */}
      <style>{`
        @keyframes heroGlow1 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(8vw, 6vh) scale(1.15); }
        }
        @keyframes heroGlow2 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-6vw, -8vh) scale(1.1); }
        }
        @keyframes heroGlow3 {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.08; }
          100% { transform: translate(-45%, -55%) scale(1.2); opacity: 0.15; }
        }
      `}</style>

      {/* ================================================
          Layer 3 — Particle field
          ================================================ */}
      <ParticleField className="-z-10" />

      {/* ================================================
          Layer 4 — Dark scrim for contrast
          ================================================ */}
      <div className="absolute inset-0 bg-black/40 -z-10" aria-hidden="true" />

      {/* ================================================
          Content
          ================================================ */}
      <div className="relative z-10 container-premium flex flex-col items-center text-center px-4 gap-5 md:gap-8">
        {/* Pre-heading — Devanagari script */}
        <span className="hero-preheading text-hindi text-secondary text-sm md:text-base tracking-[0.35em] uppercase mb-6 opacity-0">
          जश्न-ए-अदब
        </span>

        {/* Headline */}
        <h1 className="hero-headline heading-display text-fluid-4xl text-white max-w-4xl mb-6 opacity-0">
          {t('hero.headline')}
        </h1>

        {/* Subtitle — genre list */}
        <p className="hero-subtitle text-secondary/80 text-fluid-base md:text-fluid-lg tracking-widest font-light max-w-2xl mb-10 opacity-0">
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group flex flex-col sm:flex-row items-center gap-4 opacity-0">
          {/* Primary — Register */}
          <motion.a
            href="#events"
            className="btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t('hero.registerBtn')}
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          {/* Secondary — Archive */}
          <motion.a
            href="#archive"
            className="btn-secondary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t('hero.archiveBtn')}
            <Archive className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* ================================================
          Floating Urdu couplet — Ghalib
          ================================================ */}
      {/* <div
        className="hero-couplet absolute bottom-24 right-6 md:right-16 lg:right-24 max-w-xs md:max-w-sm opacity-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="text-urdu text-secondary/50 text-lg md:text-xl lg:text-2xl leading-relaxed"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        >
          ہزاروں خواہشیں ایسی کہ ہر خواہش پے دم نکلے
        </p>
      </div> */}

      {/* ================================================
          Scroll indicator
          ================================================ */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-white/50 text-xs tracking-[0.2em] uppercase font-light">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-secondary/70 scroll-indicator" />
      </div>
    </section>
  );
}

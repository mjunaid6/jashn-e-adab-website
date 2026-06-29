/* ============================================
   About — Editorial Split Layout Section
   Decorative image frame + story content +
   animated statistics counter bar.
   ============================================ */

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { statistics, aboutContent } from '@/data/content';
import ScrollReveal from '@/components/animations/ScrollReveal';

/* ──────────────────────────────────────────────
   AnimatedCounter
   Counts from 0 → target value when scrolled
   into view, with an easing effect.
   ────────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const target = value;

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      /* Ease-out cubic for a decelerating count effect */
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {count}{suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────
   StatCard — Single statistic display
   ────────────────────────────────────────────── */
function StatCard({ stat, index, isLast }) {
  return (
    <ScrollReveal delay={index * 0.1} direction="up">
      <div
        className={`text-center py-4 ${!isLast ? 'md:border-r md:border-border dark:md:border-dark-border' : ''}`}
      >
        <div className="heading-display text-fluid-2xl text-primary dark:text-secondary mb-2">
          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
        </div>
        <p className="text-sm uppercase tracking-[0.15em] text-ink-muted dark:text-dark-muted font-sans font-medium">
          {stat.label}
        </p>
      </div>
    </ScrollReveal>
  );
}

/* ──────────────────────────────────────────────
   DecorativeFrame — Premium layered image area
   with gradient placeholder and offset border
   ────────────────────────────────────────────── */
function DecorativeFrame() {
  return (
    <ScrollReveal direction="left" delay={0.1}>
      <div className="relative">
        {/* Offset decorative border — creates depth */}
        <div
          className="absolute -bottom-4 -right-4 w-full h-full border-2 border-secondary rounded-2xl"
          aria-hidden="true"
        />

        {/* Main image / gradient area */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-maroon" />

          {/* Decorative Mughal-inspired pattern overlay */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            {/* Concentric circles evoking jharokha arches */}
            <div className="absolute top-8 left-8 w-40 h-40 border border-secondary/40 rounded-full" />
            <div className="absolute top-14 left-14 w-28 h-28 border border-secondary/30 rounded-full" />
            <div className="absolute top-20 left-20 w-16 h-16 border border-secondary/20 rounded-full" />

            {/* Bottom-right accent */}
            <div className="absolute bottom-12 right-12 w-32 h-32 border border-white/20 rounded-full" />
            <div className="absolute bottom-16 right-16 w-24 h-24 border border-white/15 rounded-full" />

            {/* Vertical line accents */}
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
            <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {/* Central text watermark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-urdu text-4xl text-white/10 select-none" aria-hidden="true">
              جشنِ ادب
            </span>
          </div>

          {/* Bottom overlay gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary-dark/60 to-transparent" />

          {/* Subtle gold corner accent */}
          <div
            className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-secondary/40 rounded-tl-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-secondary/40 rounded-br-2xl"
            aria-hidden="true"
          />
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ──────────────────────────────────────────────
   About Section (default export)
   ────────────────────────────────────────────── */
export default function About() {
  /* Split story text into paragraphs on double-newline */
  const storyParagraphs = aboutContent.story.split('\n\n');

  return (
    <section
      className="section-padding bg-parchment dark:bg-dark-surface"
      aria-labelledby="about-heading"
    >
      <div className="container-premium">
        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Decorative image frame */}
          <DecorativeFrame />

          {/* Right — Story content */}
          <div>
            <ScrollReveal direction="right" delay={0.15}>
              {/* Gold label */}
              <span className="inline-block text-secondary uppercase tracking-[0.2em] text-sm font-sans font-medium">
                Our Story
              </span>

              {/* Divider */}
              <div className="section-divider" />

              {/* Heading */}
              <h2
                id="about-heading"
                className="heading-display text-fluid-2xl text-ink dark:text-dark-text mt-4 mb-8"
              >
                About Jashn-e-Adab
              </h2>
            </ScrollReveal>

            {/* Story paragraphs */}
            {storyParagraphs.map((paragraph, index) => (
              <ScrollReveal key={index} delay={0.2 + index * 0.1} direction="up">
                <p className="font-cormorant text-lg leading-relaxed text-ink-light dark:text-dark-muted mb-6 last:mb-0">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}

            {/* ── Vision Block ── */}
            <ScrollReveal delay={0.5} direction="up">
              <div className="mt-8">
                <span className="inline-block text-secondary uppercase tracking-[0.15em] text-xs font-sans font-semibold mb-2">
                  Our Vision
                </span>
                <p className="font-cormorant text-lg leading-relaxed text-ink-light dark:text-dark-muted">
                  {aboutContent.vision}
                </p>
              </div>
            </ScrollReveal>

            {/* ── Mission Block ── */}
            <ScrollReveal delay={0.6} direction="up">
              <div className="mt-8">
                <span className="inline-block text-secondary uppercase tracking-[0.15em] text-xs font-sans font-semibold mb-2">
                  Our Mission
                </span>
                <p className="font-cormorant text-lg leading-relaxed text-ink-light dark:text-dark-muted">
                  {aboutContent.mission}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Statistics Bar ── */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={index}
                isLast={index === statistics.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

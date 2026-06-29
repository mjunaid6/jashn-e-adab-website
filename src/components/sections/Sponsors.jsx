/* ============================================
   Sponsors — Infinite Marquee Partner Wall
   Two-row animated logo marquee showcasing
   partners and supporters with hover effects.
   ============================================ */

import { sponsors } from '@/data/content';
import ScrollReveal from '@/components/animations/ScrollReveal';

/**
 * Split the sponsors array into two roughly equal halves
 * for use in the two marquee rows.
 */
const midpoint = Math.ceil(sponsors.length / 2);
const topRow = sponsors.slice(0, midpoint);
const bottomRow = sponsors.slice(midpoint);

/**
 * SponsorBadge — Individual sponsor display as a styled
 * text badge (standing in for an actual logo).
 */
function SponsorBadge({ sponsor }) {
  return (
    <a
      href="#"
      className="flex-shrink-0 mx-8 md:mx-12 rounded-xl border border-border dark:border-dark-border
        px-8 py-4 bg-white dark:bg-dark-card flex items-center justify-center
        h-20 min-w-[200px] text-ink-muted dark:text-dark-muted
        hover:text-ink dark:hover:text-dark-text hover:border-secondary
        transition-colors duration-300"
      aria-label={sponsor.name}
    >
      <span className="font-serif text-lg whitespace-nowrap select-none">
        {sponsor.name}
      </span>
    </a>
  );
}

/**
 * MarqueeRow — A single horizontally-scrolling marquee row.
 * Renders two copies of the sponsor list side-by-side so the
 * CSS `animate-marquee` (translateX -50%) creates a seamless loop.
 *
 * @param {Array} items - Sponsors to display
 * @param {boolean} reverse - If true, the row scrolls right-to-left (reverse)
 */
function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div
        className="flex animate-marquee"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {/* First copy */}
        {items.map((sponsor) => (
          <SponsorBadge key={`a-${sponsor.id}`} sponsor={sponsor} />
        ))}
        {/* Second copy for seamless loop */}
        {items.map((sponsor) => (
          <SponsorBadge key={`b-${sponsor.id}`} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

/**
 * Sponsors Section
 */
export default function Sponsors() {
  return (
    <section
      className="section-padding-sm bg-cream dark:bg-dark-bg"
      aria-labelledby="sponsors-heading"
    >
      <div className="container-premium">
        {/* ── Section Header ── */}
        <ScrollReveal direction="up">
          <div className="text-center">
            {/* Gold label */}
            <span className="inline-block uppercase text-secondary tracking-widest text-sm font-sans font-medium mb-4">
              Proudly Supported By
            </span>

            {/* Heading */}
            <h2
              id="sponsors-heading"
              className="heading-editorial text-fluid-xl text-ink dark:text-dark-text"
            >
              Our Partners &amp; Supporters
            </h2>

            {/* Centered divider */}
            <div className="section-divider section-divider-center mt-4" />
          </div>
        </ScrollReveal>
      </div>

      {/* ── Marquee Rows (full-bleed) ── */}
      <div className="mt-12 space-y-6">
        {/* Row 1 — default direction */}
        <MarqueeRow items={topRow} />

        {/* Row 2 — reverse direction */}
        <MarqueeRow items={bottomRow} reverse />
      </div>
    </section>
  );
}

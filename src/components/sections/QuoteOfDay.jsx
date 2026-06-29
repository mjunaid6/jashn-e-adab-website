/* ============================================
   QuoteOfDay — Featured Poet Quote Section
   Displays a rotating daily quote in Urdu,
   Hindi, and English with decorative elements
   inspired by Indo-Persian manuscript margins.
   ============================================ */

import { poeticQuotes } from '@/data/content';
import ScrollReveal from '@/components/animations/ScrollReveal';

/**
 * Deterministically pick a quote based on the current calendar day.
 * The same quote is shown all day, and changes at midnight (UTC).
 */
const dayIndex = Math.floor(Date.now() / 86400000) % poeticQuotes.length;
const quote = poeticQuotes[dayIndex];

/**
 * QuoteOfDay Section
 */
export default function QuoteOfDay() {
  return (
    <section
      className="section-padding-sm bg-cream dark:bg-dark-bg relative overflow-hidden"
      aria-labelledby="quote-heading"
    >
      {/* ── Large Decorative Opening Quote Mark ── */}
      <span
        className="absolute text-[15rem] text-secondary/5 font-serif top-0 left-10
          pointer-events-none select-none leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* ── Content ── */}
      <div className="container-narrow text-center relative z-10">
        {/* Gold label */}
        <ScrollReveal direction="up">
          <span className="inline-block uppercase text-secondary tracking-widest text-sm font-sans font-medium">
            Quote of the Day
          </span>
        </ScrollReveal>

        {/* ── Top Ornamental Divider ── */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="divider-ornamental mt-4">
            <span className="divider-ornamental-icon">✦</span>
          </div>
        </ScrollReveal>

        {/* ── Urdu Text (primary, right-to-left) ── */}
        <ScrollReveal direction="up" delay={0.15}>
          <blockquote>
            <p
              className="text-urdu text-2xl md:text-3xl text-ink dark:text-dark-text mt-6 leading-relaxed"
              lang="ur"
              dir="rtl"
            >
              {quote.urdu}
            </p>
          </blockquote>
        </ScrollReveal>

        {/* ── Hindi Transliteration ── */}
        <ScrollReveal direction="up" delay={0.25}>
          <p
            className="text-hindi text-lg text-ink-light dark:text-dark-muted mt-4"
            lang="hi"
          >
            {quote.hindi}
          </p>
        </ScrollReveal>

        {/* ── English Translation ── */}
        <ScrollReveal direction="up" delay={0.35}>
          <p className="font-cormorant italic text-xl text-ink-muted dark:text-dark-muted mt-4">
            {quote.english}
          </p>
        </ScrollReveal>

        {/* ── Poet Attribution ── */}
        <ScrollReveal direction="up" delay={0.45}>
          <div className="mt-6">
            <p className="text-secondary font-serif text-lg">
              — {quote.poet}
            </p>
            <p className="text-sm text-ink-muted dark:text-dark-muted mt-1">
              {quote.year}
            </p>
          </div>
        </ScrollReveal>

        {/* ── Bottom Ornamental Divider ── */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="divider-ornamental mt-2">
            <span className="divider-ornamental-icon">✦</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   LegendaryGuests — Luxury Guest Carousel
   Premium carousel showcasing honored guests
   with glass-card styling and Embla Carousel.
   ============================================ */

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { legendaryGuests } from '@/data/content';

/**
 * Extract initials from a full name
 * e.g. "Dr. Kumar Vishwas" → "KV"
 */
const getInitials = (name) => {
  const parts = name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, '').split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

export default function LegendaryGuests() {
  /* ── Embla Carousel Setup ── */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      className="section-padding bg-parchment dark:bg-dark-surface"
      aria-labelledby="guests-heading"
    >
      <div className="container-premium">
        {/* ── Section Header ── */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="uppercase text-secondary tracking-widest text-sm font-medium">
            Honored Guests
          </p>
          <h2
            id="guests-heading"
            className="heading-display text-fluid-2xl text-ink dark:text-dark-text mt-4"
          >
            Legendary Guests
          </h2>
          <div className="section-divider section-divider-center mt-6" aria-hidden="true" />
        </ScrollReveal>

        {/* ── Carousel ── */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="relative">
            {/* Carousel viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-6">
                {legendaryGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="flex-[0_0_300px] md:flex-[0_0_350px] min-w-0 pl-6"
                  >
                    {/* Guest Card */}
                    <article
                      className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-2"
                      aria-label={`${guest.name}, ${guest.profession}`}
                    >
                      {/* Portrait placeholder */}
                      <div className="aspect-[3/4] bg-gradient-to-b from-primary to-maroon flex items-center justify-center relative overflow-hidden">
                        {/* Centered initials */}
                        <span
                          className="text-6xl text-white/20 font-serif font-bold select-none relative z-10"
                          aria-hidden="true"
                        >
                          {getInitials(guest.name)}
                        </span>

                        {/* Subtle gradient overlay on hover */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Card content */}
                      <div className="p-6">
                        <h3 className="font-cormorant text-xl font-semibold text-ink dark:text-dark-text">
                          {guest.name}
                        </h3>
                        <p className="text-sm text-secondary uppercase tracking-wider mt-1">
                          {guest.profession}
                        </p>
                        <p className="mt-3 text-sm text-ink-muted dark:text-dark-muted line-clamp-3 leading-relaxed">
                          {guest.introduction}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Navigation Arrows ── */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full border-2 border-secondary bg-cream/90 dark:bg-dark-surface/90 backdrop-blur-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 shadow-lg"
              aria-label="Previous guest"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full border-2 border-secondary bg-cream/90 dark:bg-dark-surface/90 backdrop-blur-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 shadow-lg"
              aria-label="Next guest"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

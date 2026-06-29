/* ============================================
   Testimonials — Animated Testimonial Section
   Dark-background carousel with large quotes,
   dot indicators, and premium typography.
   ============================================ */

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { testimonials } from '@/data/content';

export default function Testimonials() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* ── Embla Carousel Setup ── */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000 })]
  );

  /**
   * Sync the selected dot indicator with the
   * current carousel slide on each scroll event.
   */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  /**
   * Navigate to a specific slide when a dot
   * indicator is clicked.
   */
  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section
      className="section-padding bg-primary dark:bg-dark-bg"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-premium">
        {/* ── Section Header ── */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="uppercase text-secondary tracking-widest text-sm font-medium">
            Words of Praise
          </p>
          <h2
            id="testimonials-heading"
            className="heading-display text-fluid-2xl text-white mt-4"
          >
            What Legends Say
          </h2>
          <div className="section-divider section-divider-center mt-6" aria-hidden="true" />
        </ScrollReveal>

        {/* ── Carousel ── */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0"
                >
                  {/* Testimonial Card */}
                  <figure className="max-w-3xl mx-auto text-center px-8">
                    {/* Large decorative quote mark */}
                    <span
                      className="block text-8xl text-secondary/30 font-serif leading-none select-none"
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>

                    {/* Quote text */}
                    <blockquote>
                      <p className="font-cormorant text-2xl md:text-3xl text-white/90 italic leading-relaxed mt-4">
                        {testimonial.text}
                      </p>
                    </blockquote>

                    {/* Author attribution */}
                    <figcaption className="mt-8">
                      <cite className="not-italic">
                        <span className="block font-serif text-lg text-secondary">
                          {testimonial.author}
                        </span>
                        <span className="block text-sm text-white/60 mt-1">
                          {testimonial.role}
                        </span>
                        <span className="block text-xs text-white/40 mt-1">
                          {testimonial.event}
                        </span>
                      </cite>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* ── Dot Indicators ── */}
          <div
            className="flex justify-center gap-2 mt-8"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${index === selectedIndex
                    ? 'bg-secondary scale-110'
                    : 'bg-white/30 hover:bg-white/50'
                  }
                `}
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

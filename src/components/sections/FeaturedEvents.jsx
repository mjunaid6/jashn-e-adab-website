/* ============================================
   FeaturedEvents — Premium Events Showcase
   Responsive grid of upcoming cultural events
   with glassmorphic cards and scroll animations.
   ============================================ */

import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { featuredEvents } from '@/data/content';
import ScrollReveal from '@/components/animations/ScrollReveal';

/**
 * Category → gradient mapping for event poster placeholders.
 * Each category gets a unique gradient to visually distinguish event types.
 */
const categoryGradients = {
  Mushaira: 'from-primary to-maroon',
  'Kavi Sammelan': 'from-maroon to-secondary',
  Music: 'from-primary-dark to-primary',
  Literature: 'from-primary to-primary-light',
  Dance: 'from-maroon to-secondary',
};

/**
 * Returns the gradient class string for a given event category.
 */
function getGradient(category) {
  return categoryGradients[category] || 'from-primary to-secondary';
}

/**
 * EventCard — Individual event card with glassmorphic styling,
 * category/date badges, and hover lift animation.
 */
function EventCard({ event, index }) {
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
  const day = eventDate.getDate();

  return (
    <ScrollReveal delay={index * 0.1} direction="up">
      <motion.div
        className="glass-card rounded-2xl overflow-hidden group cursor-pointer h-full"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Poster / Gradient Area ── */}
        <div className={`relative h-52 bg-gradient-to-br ${getGradient(event.category)} overflow-hidden`}>
          {/* Subtle decorative pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 border border-white/30 rounded-full" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border border-white/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full" />
          </div>

          {/* Category badge — top-left */}
          <span
            className="absolute top-4 left-4 bg-secondary text-primary font-sans text-xs uppercase tracking-wider px-3 py-1 rounded-full font-medium"
            aria-label={`Category: ${event.category}`}
          >
            {event.category}
          </span>

          {/* Date badge — top-right */}
          <div
            className="absolute top-4 right-4 bg-white/90 dark:bg-dark-card/90 rounded-lg p-2 text-center min-w-[3.5rem] shadow-sm"
            aria-label={`Date: ${month} ${day}`}
          >
            <span className="block text-xs font-sans uppercase text-ink-muted dark:text-dark-muted leading-tight">
              {month}
            </span>
            <span className="block text-xl font-bold font-serif text-ink dark:text-dark-text leading-tight">
              {day}
            </span>
          </div>

          {/* Bottom gradient fade for smooth card transition */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent dark:from-dark-card/20" />
        </div>

        {/* ── Content Area ── */}
        <div className="p-6">
          {/* Event title */}
          <h3 className="font-cormorant text-xl font-semibold text-ink dark:text-dark-text leading-snug mb-3 group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
            {event.title}
          </h3>

          {/* Event details */}
          <div className="space-y-2 mb-4">
            {/* Time */}
            <div className="flex items-center gap-2 text-ink-muted dark:text-dark-muted">
              <Clock className="w-4 h-4 flex-shrink-0 text-secondary" aria-hidden="true" />
              <span className="text-sm font-sans">{event.time}</span>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-2 text-ink-muted dark:text-dark-muted">
              <MapPin className="w-4 h-4 flex-shrink-0 text-secondary" aria-hidden="true" />
              <span className="text-sm font-sans">{event.venue}</span>
            </div>

            {/* City */}
            <div className="flex items-center gap-2 text-ink-muted dark:text-dark-muted">
              <Calendar className="w-4 h-4 flex-shrink-0 text-secondary" aria-hidden="true" />
              <span className="text-sm font-sans">{event.city}</span>
            </div>
          </div>

          {/* Register button */}
          <button
            className="w-full mt-4 btn-primary rounded-lg text-center text-sm justify-center group/btn"
            aria-label={`Register for ${event.title}`}
          >
            Register Now
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

/**
 * FeaturedEvents Section
 */
export default function FeaturedEvents() {
  return (
    <section className="bg-paper section-padding" aria-labelledby="featured-events-heading">
      <div className="container-premium">
        {/* ── Section Header ── */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            {/* Gold label */}
            <span className="inline-block text-secondary uppercase tracking-[0.2em] text-sm font-sans font-medium mb-4">
              Upcoming Experiences
            </span>

            {/* Heading */}
            <h2
              id="featured-events-heading"
              className="heading-display text-fluid-2xl text-ink dark:text-dark-text"
            >
              Featured Events
            </h2>

            {/* Centered divider */}
            <div className="section-divider section-divider-center mt-6" />
          </div>
        </ScrollReveal>

        {/* ── Events Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* ── View All CTA ── */}
        <ScrollReveal delay={0.4} direction="up">
          <div className="text-center mt-14">
            <a
              href="/events"
              className="btn-secondary rounded-lg inline-flex items-center gap-2"
              aria-label="View all upcoming events"
            >
              View All Events
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

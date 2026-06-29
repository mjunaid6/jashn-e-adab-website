/* ============================================
   Founder — Luxury Editorial Founder Profile
   Premium section showcasing the founder with
   portrait, bio, achievements, and timeline.
   ============================================ */

import { motion } from 'motion/react';
import { Award, BookOpen, Mic, Star } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { founderData } from '@/data/content';

/**
 * Achievement icon mapping — each achievement gets a
 * contextually relevant icon based on keywords.
 */
const getAchievementIcon = (text) => {
  if (text.toLowerCase().includes('award') || text.toLowerCase().includes('national')) return Award;
  if (text.toLowerCase().includes('author') || text.toLowerCase().includes('collection')) return BookOpen;
  if (text.toLowerCase().includes('speaker') || text.toLowerCase().includes('tedx')) return Mic;
  return Star;
};

export default function Founder() {
  /* Extract first paragraph for the preview bio */
  const firstParagraph = founderData.bio.split('\n\n')[0];

  return (
    <section
      className="section-padding bg-cream dark:bg-dark-bg"
      aria-labelledby="founder-heading"
    >
      <div className="container-premium">
        {/* ── Main Grid: Portrait + Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left Column: Portrait Area ── */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="relative mx-auto lg:mx-0 max-w-md">
              {/* Decorative gold border frame offset behind */}
              <div
                className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary rounded-2xl"
                aria-hidden="true"
              />

              {/* Portrait container */}
              <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-b from-primary to-primary-dark overflow-hidden flex items-center justify-center">
                {/* Placeholder initials */}
                <span
                  className="text-secondary/30 text-8xl font-serif font-bold select-none"
                  aria-hidden="true"
                >
                  KI
                </span>

                {/* Subtle decorative overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right Column: Content ── */}
          <div>
            <ScrollReveal direction="right" delay={0.15}>
              {/* Label */}
              <p className="uppercase text-secondary tracking-widest text-sm font-medium">
                Meet the Founder
              </p>

              {/* Section divider */}
              <div className="section-divider" aria-hidden="true" />

              {/* Name */}
              <h2
                id="founder-heading"
                className="heading-display text-fluid-2xl text-ink dark:text-dark-text mt-4"
              >
                {founderData.name}
              </h2>

              {/* Title */}
              <p className="font-cormorant text-xl text-ink-muted italic mt-2">
                {founderData.title}
              </p>
            </ScrollReveal>

            {/* Quote block */}
            <ScrollReveal direction="up" delay={0.25}>
              <blockquote className="mt-8 border-l-4 border-secondary pl-6">
                <p className="font-cormorant text-xl italic text-primary dark:text-secondary leading-relaxed">
                  {founderData.quote}
                </p>
              </blockquote>
            </ScrollReveal>

            {/* Bio — first paragraph */}
            <ScrollReveal direction="up" delay={0.3}>
              <p className="mt-6 font-cormorant text-lg leading-relaxed text-ink-light dark:text-dark-muted">
                {firstParagraph}
              </p>
            </ScrollReveal>

            {/* ── Achievement List ── */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="mt-8">
                <h3 className="font-serif text-lg font-semibold text-ink dark:text-dark-text mb-4">
                  Achievements
                </h3>
                <ul className="space-y-3" role="list">
                  {founderData.achievements.map((achievement, index) => {
                    const Icon = getAchievementIcon(achievement);
                    return (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                      >
                        {/* Diamond bullet */}
                        <span
                          className="mt-1.5 flex-shrink-0 text-secondary"
                          aria-hidden="true"
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-ink-light dark:text-dark-muted text-sm leading-relaxed">
                          {achievement}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Timeline Section ── */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-16">
            {/* Timeline heading */}
            <h3 className="heading-editorial text-fluid-xl text-ink dark:text-dark-text text-center mb-10">
              Journey
            </h3>

            {/* Timeline grid */}
            <div className="relative">
              {/* Horizontal connecting line (desktop) */}
              <div
                className="hidden md:block absolute top-5 left-0 right-0 h-px bg-border dark:bg-dark-border"
                aria-hidden="true"
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {founderData.timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="relative text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Gold dot */}
                    <div className="flex justify-center md:justify-start mb-4">
                      <div
                        className="w-3 h-3 rounded-full bg-secondary ring-4 ring-cream dark:ring-dark-bg relative z-10"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Year */}
                    <p className="text-secondary font-bold text-lg font-serif">
                      {item.year}
                    </p>

                    {/* Event description */}
                    <p className="text-sm text-ink-muted dark:text-dark-muted mt-1 leading-relaxed">
                      {item.event}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

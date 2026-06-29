/* ============================================
   Newsletter — Premium Subscription Section
   Minimal, elegant newsletter signup with
   react-hook-form validation and animated
   success state.
   ============================================ */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

/**
 * Newsletter Section
 */
export default function Newsletter() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  /**
   * Form submit handler.
   * Simulates an API call with a short delay, then
   * shows the success confirmation state.
   */
  const onSubmit = async () => {
    /* Simulate network request */
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSuccess(true);
    reset();
  };

  return (
    <section
      className="section-padding bg-parchment dark:bg-dark-surface"
      aria-labelledby="newsletter-heading"
    >
      <div className="container-narrow text-center">
        {/* ── Decorative Ornament ── */}
        <ScrollReveal direction="up">
          <div className="flex justify-center gap-3 text-secondary text-lg mb-6 select-none" aria-hidden="true">
            <span>✦</span>
            <span>◆</span>
            <span>✦</span>
          </div>
        </ScrollReveal>

        {/* ── Heading ── */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2
            id="newsletter-heading"
            className="heading-display text-fluid-2xl text-ink dark:text-dark-text"
          >
            Stay Connected
          </h2>
        </ScrollReveal>

        {/* ── Subtitle ── */}
        <ScrollReveal direction="up" delay={0.2}>
          <p className="font-cormorant text-xl text-ink-muted dark:text-dark-muted max-w-lg mx-auto mt-4 leading-relaxed">
            Subscribe to receive updates on upcoming events, literary stories,
            and cultural insights delivered to your inbox.
          </p>
        </ScrollReveal>

        {/* ── Form / Success State ── */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-10 max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* ── Success Confirmation ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4 py-6"
                >
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
                  >
                    <CheckCircle className="w-14 h-14 text-secondary" strokeWidth={1.5} />
                  </motion.div>

                  <p className="font-cormorant text-2xl text-ink dark:text-dark-text font-semibold">
                    Thank you for subscribing!
                  </p>
                  <p className="text-sm text-ink-muted dark:text-dark-muted">
                    You&apos;ll hear from us soon with the latest from Jashn-e-Adab.
                  </p>
                </motion.div>
              ) : (
                /* ── Email Form ── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {/* Email input with validation */}
                  <div className="flex-1 relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-muted dark:text-dark-muted pointer-events-none">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      aria-label="Email address"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      className={`w-full pl-13 pr-6 py-4 bg-white dark:bg-dark-card border
                        rounded-full font-sans text-ink dark:text-dark-text
                        placeholder-ink-muted dark:placeholder-dark-muted
                        outline-none transition-all duration-300
                        ${
                          errors.email
                            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200'
                            : 'border-border dark:border-dark-border focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                        }`}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email',
                        },
                      })}
                    />
                    {/* Inline error */}
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-6 left-6 text-xs text-red-500"
                        role="alert"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary rounded-full px-8 flex items-center gap-2 justify-center
                      disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label="Subscribe to newsletter"
                  >
                    {isSubmitting ? (
                      /* Simple loading spinner */
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Privacy note */}
            {!isSuccess && (
              <p className="text-xs text-ink-muted dark:text-dark-muted mt-8">
                We respect your privacy. Unsubscribe anytime.
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

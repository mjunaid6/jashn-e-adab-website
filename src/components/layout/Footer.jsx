/* ============================================
   Footer — Premium Multi-Column Footer
   Gold decorative border, 4-column grid,
   Urdu couplet, social links, newsletter form.
   ============================================ */

import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { siteConfig, footerUrduCouplet } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';

/* ---- Inline SVG social icons for brands not in Lucide ---- */
const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ---- Static data for footer columns ---- */
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
];

const eventLinks = [
  { label: 'Mushaira', href: '/events?category=mushaira' },
  { label: 'Kavi Sammelan', href: '/events?category=kavi-sammelan' },
  { label: 'Concerts', href: '/events?category=concerts' },
  { label: 'Workshops', href: '/events?category=workshops' },
  { label: 'Theatre', href: '/events?category=theatre' },
];

const socialLinks = [
  { Icon: YoutubeIcon, href: siteConfig.social.youtube, label: 'YouTube' },
  { Icon: InstagramIcon, href: siteConfig.social.instagram, label: 'Instagram' },
  { Icon: FacebookIcon, href: siteConfig.social.facebook, label: 'Facebook' },
  { Icon: TwitterIcon, href: siteConfig.social.twitter, label: 'Twitter / X' },
];

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate newsletter API
    setEmail('');
  };

  return (
    <footer
      className="bg-primary dark:bg-dark-surface text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ---- Top decorative gold border ---- */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, #D6B370 20%, #e0c48f 50%, #D6B370 80%, transparent)',
        }}
        aria-hidden="true"
      />

      {/* ===================== MAIN GRID ===================== */}
      <div className="container-premium section-padding-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* ---- Column 1: Brand & Social ---- */}
          <div className="space-y-6">
            {/* Logo */}
            <Link
              to="/"
              className="inline-block font-cormorant text-2xl font-semibold tracking-tight"
              aria-label="Jashn-e-Adab — Home"
            >
              Jashn-e-<span className="text-secondary">Adab</span>
            </Link>

            {/* Tagline */}
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t('footer.tagline') || siteConfig.tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3" aria-label={t('footer.followUs')}>
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    flex items-center justify-center w-9 h-9 rounded-full
                    bg-white/10 text-white/70
                    hover:bg-secondary hover:text-primary
                    transition-colors duration-300
                  "
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ---- Column 2: Quick Links ---- */}
          <div>
            <h3 className="text-secondary font-semibold text-xs uppercase tracking-[0.15em] mb-5">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="
                      text-white/60 text-sm hover:text-secondary
                      transition-colors duration-300
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Column 3: Events ---- */}
          <div>
            <h3 className="text-secondary font-semibold text-xs uppercase tracking-[0.15em] mb-5">
              {t('footer.eventLinks')}
            </h3>
            <ul className="space-y-3">
              {eventLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="
                      text-white/60 text-sm hover:text-secondary
                      transition-colors duration-300
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Column 4: Contact & Newsletter ---- */}
          <div className="space-y-6">
            <h3 className="text-secondary font-semibold text-xs uppercase tracking-[0.15em] mb-5">
              {t('footer.contact')}
            </h3>

            {/* Contact details */}
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-white/60 text-sm
                             hover:text-secondary transition-colors duration-300"
                >
                  <Mail size={14} className="shrink-0 text-secondary/60" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white/60 text-sm
                             hover:text-secondary transition-colors duration-300"
                >
                  <Phone size={14} className="shrink-0 text-secondary/60" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5 text-secondary/60" />
                {siteConfig.address}
              </li>
            </ul>

            {/* Newsletter mini form */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-4"
              aria-label="Newsletter subscription"
            >
              <div className="flex items-center rounded-lg overflow-hidden border border-white/15 focus-within:border-secondary/40 transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder') || 'Your email'}
                  className="
                    flex-1 bg-transparent px-3 py-2.5 text-sm text-white
                    placeholder:text-white/30 outline-none
                  "
                />
                <button
                  type="submit"
                  className="
                    shrink-0 px-3 py-2.5 bg-secondary text-primary
                    hover:bg-secondary-light transition-colors duration-300 cursor-pointer
                  "
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ===================== URDU COUPLET ===================== */}
      <div className="container-premium pb-8">
        <div className="border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="py-5 text-center space-y-2"
          >
            <p className="text-urdu text-secondary text-lg sm:text-xl" dir="rtl">
              {footerUrduCouplet.urdu}
            </p>
            <p className="text-white/40 text-sm italic">
              {footerUrduCouplet.english} — {footerUrduCouplet.poet}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ===================== BOTTOM BAR ===================== */}
      <div className="flex justify-center items-center h-20 border-t border-white/10">
          <p className="text-white/40 text-sm">
            {t('footer.copyright')}
          </p>
      </div>
    </footer>
  );
}

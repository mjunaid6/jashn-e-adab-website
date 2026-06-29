/* ============================================
   Navbar — Premium Sticky Navigation
   Glassmorphism on scroll, full-screen mobile overlay,
   language switcher, dark mode toggle, search.
   ============================================ */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { navigationLinks } from '@/data/content';

/* ---- Language options for the switcher ---- */
const languages = [
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'hi', label: 'हिन्दी', fullLabel: 'Hindi' },
  { code: 'ur', label: 'اردو', fullLabel: 'Urdu' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  /* ---- State ---- */
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  /* ---- Scroll listener ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- Close language dropdown on outside click ---- */
  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* ---- Lock body scroll when mobile menu is open ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ---- Close mobile menu on route change ---- */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ---- Translated nav labels mapped to link hrefs ---- */
  const navKeys = ['home', 'events', 'archive', 'artists', 'gallery', 'awards', 'about', 'blog'];
  const navItems = navigationLinks.map((link, i) => ({
    ...link,
    label: t(`nav.${navKeys[i]}`) || link.label,
  }));

  /* ---- Current language display label ---- */
  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <>
      {/* ===================== HEADER BAR ===================== */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 inset-x-0 z-50 transition-all duration-500
          ${
            scrolled
              ? 'bg-cream/90 dark:bg-dark-bg/90 backdrop-blur-xl shadow-sm'
              : 'bg-transparent'
          }
        `}
        role="banner"
      >
        <nav
          className="container-premium flex items-center justify-between h-18 lg:h-20"
          aria-label="Primary navigation"
        >
          {/* ---- Logo ---- */}
          <Link
            to="/"
            className="relative flex items-center gap-2 group"
            aria-label="Jashn-e-Adab — Home"
          >
            {/* Decorative gold dot */}
            <span
              className="block w-2 h-2 rounded-full bg-secondary shrink-0
                         group-hover:scale-125 transition-transform duration-300"
              aria-hidden="true"
            />
            <span
              className={`
                font-cormorant text-xl sm:text-2xl font-semibold tracking-tight
                transition-colors duration-300
                ${scrolled ? 'text-primary dark:text-dark-text' : 'text-white'}
              `}
            >
              Jashn-e-
              <span className="text-secondary">Adab</span>
            </span>
          </Link>

          {/* ---- Desktop links ---- */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`
                      relative px-3 py-2 text-[0.82rem] font-medium tracking-wide
                      uppercase transition-colors duration-300
                      ${
                        scrolled
                          ? 'text-ink/80 hover:text-primary dark:text-dark-text/80 dark:hover:text-secondary'
                          : 'text-white/80 hover:text-white'
                      }
                    `}
                  >
                    {item.label}

                    {/* Active gold underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-secondary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ---- Right-side actions ---- */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language switcher */}
            <div className="relative hidden md:block" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium
                  transition-colors duration-300 cursor-pointer
                  ${
                    scrolled
                      ? 'text-ink/70 hover:text-primary dark:text-dark-text/70 dark:hover:text-secondary'
                      : 'text-white/70 hover:text-white'
                  }
                `}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label="Select language"
              >
                <Globe size={15} />
                <span>{currentLang.label}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    role="listbox"
                    aria-label="Language options"
                    className="
                      absolute right-0 mt-2 w-40 py-1.5 rounded-xl overflow-hidden
                      bg-white dark:bg-dark-card shadow-lg border border-border dark:border-dark-border
                    "
                  >
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          role="option"
                          aria-selected={language === lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          className={`
                            w-full flex items-center justify-between px-4 py-2 text-sm
                            transition-colors cursor-pointer
                            ${
                              language === lang.code
                                ? 'bg-secondary/10 text-secondary font-semibold'
                                : 'text-ink dark:text-dark-text hover:bg-parchment dark:hover:bg-dark-surface'
                            }
                          `}
                        >
                          <span>{lang.fullLabel}</span>
                          <span className="text-xs opacity-60">{lang.label}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className={`
                hidden sm:flex items-center justify-center w-9 h-9 rounded-full
                transition-colors duration-300 cursor-pointer
                ${
                  scrolled
                    ? 'text-ink/70 hover:bg-parchment hover:text-primary dark:text-dark-text/70 dark:hover:bg-dark-card dark:hover:text-secondary'
                    : 'text-white/70 hover:text-white'
                }
              `}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Search icon */}
            <button
              className={`
                hidden sm:flex items-center justify-center w-9 h-9 rounded-full
                transition-colors duration-300 cursor-pointer
                ${
                  scrolled
                    ? 'text-ink/70 hover:bg-parchment hover:text-primary dark:text-dark-text/70 dark:hover:bg-dark-card dark:hover:text-secondary'
                    : 'text-white/70 hover:text-white'
                }
              `}
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            {/* Hamburger — mobile / tablet */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`
                lg:hidden flex items-center justify-center w-10 h-10 rounded-full
                transition-colors duration-300 cursor-pointer
                ${
                  scrolled
                    ? 'text-ink dark:text-dark-text'
                    : 'text-white'
                }
              `}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ===================== MOBILE OVERLAY ===================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="
              fixed inset-0 z-50 flex flex-col
              bg-primary dark:bg-dark-bg
            "
          >
            {/* Top bar — logo + close */}
            <div className="container-premium flex items-center justify-between h-18">
              <Link
                to="/"
                className="font-cormorant text-xl font-semibold text-white tracking-tight"
                aria-label="Jashn-e-Adab — Home"
              >
                Jashn-e-<span className="text-secondary">Adab</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-10 h-10 text-white/80
                           hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 flex flex-col justify-center container-premium">
              <ul className="space-y-2">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ delay: idx * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        to={item.href}
                        className={`
                          block py-3 font-cormorant text-3xl sm:text-4xl font-medium
                          tracking-tight transition-colors duration-300
                          ${isActive ? 'text-secondary' : 'text-white/70 hover:text-white'}
                        `}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom actions (language, theme, search) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="container-premium pb-10 flex items-center gap-4"
            >
              {/* Language quick-switch */}
              <div className="flex items-center gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`
                      px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer
                      ${
                        language === lang.code
                          ? 'bg-secondary text-primary'
                          : 'text-white/60 border border-white/20 hover:border-white/40'
                      }
                    `}
                    aria-label={`Switch to ${lang.fullLabel}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <div className="flex-1" />

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full
                           text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Search */}
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full
                           text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

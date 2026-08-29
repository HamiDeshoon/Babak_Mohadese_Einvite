import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import AudioPlayer from '../components/AudioPlayer';

export default function Navigation() {
  const { isPersian, t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_story'), href: '#our-story' },
    { label: t('nav_wedding'), href: '#the-wedding' },
    { label: t('nav_venue'), href: '#venue' },
    { label: t('nav_wishes'), href: '#wishes' },
    { label: t('nav_gallery'), href: '#gallery' },
    { label: t('nav_rsvp'), href: '#rsvp', isCta: true },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = (targetLang: 'fa' | 'en') => {
    if (targetLang !== language || !location.pathname.includes(`/${targetLang}`)) {
      navigate(`/${targetLang}`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-2.5 sm:px-8 ${
          scrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-5'
        }`}
      >
        <div
          className={`max-w-6xl mx-auto rounded-full transition-all duration-500 px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between border ${
            scrolled
              ? 'bg-ivory/95 backdrop-blur-2xl border-rose-gold/25 shadow-luxury'
              : 'bg-ivory/70 backdrop-blur-md border-white/50 shadow-sm'
          }`}
        >
          {/* Couple Monogram / Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 sm:gap-2 group min-w-0"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-rose-gold to-gold flex items-center justify-center text-ivory text-xs font-serif shadow-sm shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
              ✦
            </span>
            <span className={`${isPersian ? 'font-nastaliq text-base sm:text-xl pt-1' : 'font-serif text-sm sm:text-lg'} font-medium tracking-tight text-mahogany truncate max-w-[120px] xs:max-w-[170px] sm:max-w-none`}>
              {isPersian ? `${invitationConfig.couple.brideFa} و ${invitationConfig.couple.groomFa}` : `${invitationConfig.couple.groomEn} & ${invitationConfig.couple.brideEn}`}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-all duration-300 text-xs tracking-widest uppercase font-serif ${
                  link.isCta
                    ? 'px-4 py-1.5 rounded-full bg-rose-deep text-ivory hover:bg-rose-gold shadow-sm hover:shadow-gold-glow'
                    : 'text-warm-gray hover:text-mahogany hover:scale-105'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls: Language Toggle + Audio + Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Compact Language Switcher Capsule */}
            <div className="flex items-center bg-champagne-100/70 p-0.5 rounded-full border border-rose-gold/25 shadow-inner">
              <button
                type="button"
                onClick={() => toggleLanguage('fa')}
                aria-label="Persian Language"
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-serif transition-all duration-300 ${
                  isPersian
                    ? 'bg-mahogany text-ivory font-medium shadow-sm'
                    : 'text-warm-gray hover:text-mahogany'
                }`}
              >
                فا
              </button>
              <button
                type="button"
                onClick={() => toggleLanguage('en')}
                aria-label="English Language"
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-serif transition-all duration-300 ${
                  !isPersian
                    ? 'bg-mahogany text-ivory font-medium shadow-sm'
                    : 'text-warm-gray hover:text-mahogany'
                }`}
              >
                EN
              </button>
            </div>

            <AudioPlayer />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-champagne-100/80 border border-rose-gold/20 flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 active:scale-90"
            >
              <span
                className={`w-3.5 sm:w-4 h-[1.5px] bg-mahogany rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                }`}
              />
              <span
                className={`w-3.5 sm:w-4 h-[1.5px] bg-mahogany rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-ivory/95 backdrop-blur-3xl flex flex-col justify-center items-center px-6 lg:hidden animate-in fade-in duration-300"
        >
          {/* Close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-5 right-5 rtl:right-auto rtl:left-5 w-10 h-10 rounded-full bg-champagne-100 border border-rose-gold/20 flex items-center justify-center text-mahogany text-lg"
          >
            ✕
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-5 text-center w-full max-w-xs"
          >
            <span className="text-3xl text-gold mb-1">💍</span>
            <div className="font-nastaliq text-3xl text-mahogany mb-1">
              {isPersian ? invitationConfig.couple.monogramFa : invitationConfig.couple.monogramEn}
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 mb-3 bg-champagne-100/90 p-1 rounded-full border border-rose-gold/30">
              <button
                type="button"
                onClick={() => {
                  toggleLanguage('fa');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-serif ${
                  isPersian ? 'bg-mahogany text-ivory shadow-sm' : 'text-warm-gray'
                }`}
              >
                فارسی
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleLanguage('en');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-serif ${
                  !isPersian ? 'bg-mahogany text-ivory shadow-sm' : 'text-warm-gray'
                }`}
              >
                English
              </button>
            </div>

            <div className="flex flex-col w-full gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-lg py-2 px-6 rounded-2xl transition-all ${
                    link.isCta
                      ? 'bg-rose-deep text-ivory shadow-lg font-serif'
                      : 'text-mahogany hover:bg-champagne-100/70 font-nastaliq'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import LanguageSwitch from '../components/LanguageSwitch';
import AudioPlayer from '../components/AudioPlayer';

export default function Navigation() {
  const { isPersian, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_story'), href: '#our-story' },
    { label: t('nav_wedding'), href: '#the-wedding' },
    { label: t('nav_venue'), href: '#venue' },
    { label: t('nav_gallery'), href: '#gallery' },
    { label: t('nav_wishes'), href: '#wishes' },
    { label: t('nav_rsvp'), href: '#rsvp', isCta: true },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-8 ${
          scrolled ? 'py-2.5' : 'py-5'
        }`}
      >
        <div
          className={`max-w-6xl mx-auto rounded-full transition-all duration-500 px-4 sm:px-6 py-2 flex items-center justify-between border ${
            scrolled
              ? 'bg-ivory/90 backdrop-blur-2xl border-rose-gold/25 shadow-luxury'
              : 'bg-ivory/60 backdrop-blur-md border-white/40 shadow-sm'
          }`}
        >
          {/* Couple Monogram / Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-gold to-gold flex items-center justify-center text-ivory text-xs font-serif shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
              ✦
            </span>
            <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-mahogany">
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

          {/* Right Action Controls: Audio + Language + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <AudioPlayer />
            <LanguageSwitch />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden w-9 h-9 rounded-full bg-champagne-100/80 border border-rose-gold/20 flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 active:scale-90"
            >
              <span
                className={`w-4 h-[1.5px] bg-mahogany rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-mahogany rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ivory/95 backdrop-blur-3xl flex flex-col justify-center items-center px-6 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-3xl text-gold mb-2">💍</span>
            <div className="font-serif text-2xl text-mahogany mb-4">
              {isPersian ? invitationConfig.couple.monogramFa : invitationConfig.couple.monogramEn}
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-lg font-serif tracking-wider ${
                  link.isCta
                    ? 'px-8 py-3 rounded-full bg-rose-deep text-ivory shadow-lg'
                    : 'text-mahogany hover:text-rose-gold'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

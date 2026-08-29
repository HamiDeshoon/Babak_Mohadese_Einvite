import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

export default function LocationSection() {
  const { isPersian, t } = useLanguage();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyAddress = () => {
    const addr = isPersian ? invitationConfig.event.venueAddressFa : invitationConfig.event.venueAddressEn;
    navigator.clipboard.writeText(addr);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="venue" className="relative py-16 sm:py-32 px-4 sm:px-6 z-10 bg-silk/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('venue_eyebrow')} ❦
            </span>
            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-nastaliq text-4xl sm:text-6xl md:text-7xl py-1' : 'font-fairytale text-2xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-2 sm:mb-3 text-gold-shimmer`}>
            {t('venue_title')}
          </h2>

          <p className={`${isPersian ? 'font-nastaliq text-2xl sm:text-4xl pt-1' : 'font-serif text-lg sm:text-2xl'} text-rose-deep font-semibold mb-2`}>
            {isPersian ? invitationConfig.event.venueNameFa : invitationConfig.event.venueNameEn}
          </p>

          {/* Exact Typed Address Box with 1-Click Copy */}
          <div className="max-w-2xl mx-auto my-4 p-4 sm:p-6 rounded-2xl bg-ivory/95 border border-gold/40 shadow-luxury text-center">
            <span className="block text-[11px] sm:text-xs uppercase tracking-widest font-serif text-rose-deep font-semibold mb-1">
              {isPersian ? 'نشانی دقیق محل برگزاری مراسم' : 'Exact Venue Address'}
            </span>
            <p className={`${isPersian ? 'font-nastaliq text-lg sm:text-2xl leading-[2.2]' : 'font-serif text-sm sm:text-base'} text-mahogany font-medium my-2 px-2`}>
              {isPersian ? invitationConfig.event.venueAddressFa : invitationConfig.event.venueAddressEn}
            </p>
            <button
              onClick={copyAddress}
              title={isPersian ? 'کپی آدرس' : 'Copy Address'}
              className="mt-2 px-5 py-2 rounded-full bg-forest/10 hover:bg-forest hover:text-ivory text-forest text-xs font-serif transition-all duration-300 border border-forest/20 flex items-center justify-center gap-1.5 mx-auto active:scale-95"
            >
              <span>📋</span>
              <span>{copiedAddress ? (isPersian ? 'آدرس کپی شد ✓' : 'Address Copied ✓') : (isPersian ? 'کپی آدرس روی نقشه' : 'Copy Address')}</span>
            </button>
          </div>

          {/* Autumn Weather Pill */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-ivory/90 backdrop-blur-md border border-gold/30 shadow-sm text-[11px] sm:text-xs font-serif text-mahogany max-w-sm mx-auto">
            <span className="text-sm">🍂</span>
            <span className={isPersian ? 'font-nastaliq text-sm pt-0.5' : 'font-sans'}>
              {isPersian ? 'پیش‌بینی هوای شب مراسم: ۲۱° سانتی‌گراد، آسمان صاف و پاییزی' : 'Wedding Evening Weather: 21°C, Crisp Clear Autumn Sky'}
            </span>
          </div>
        </div>

        {/* Double-Bezel Map Container */}
        <div className="rounded-2xl sm:rounded-[2.5rem] p-1 sm:p-2 bg-gradient-to-b from-sage-200/50 via-champagne-200/40 to-white/70 shadow-luxury mb-8 sm:mb-10 border border-gold/25">
          <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(2.5rem-8px)] overflow-hidden bg-ivory border border-white/80 aspect-[4/3] sm:aspect-[21/9] min-h-[260px] sm:min-h-[340px]">
            <iframe
              src={invitationConfig.navigation.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '260px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Location Map"
            />
          </div>
        </div>

        {/* Navigation Action Buttons Grid with User's Exact Direct Links */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-3xl mx-auto px-2">
          {/* Google Maps Direct */}
          <a
            href={invitationConfig.navigation.googleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-ivory/95 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>📍 {t('open_google_maps')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>

          {/* Neshan Direct */}
          <a
            href={invitationConfig.navigation.neshanDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-ivory/95 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>🚗 {t('open_neshan')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>

          {/* Balad Direct */}
          <a
            href={invitationConfig.navigation.baladDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-ivory/95 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>🧭 {t('open_balad')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>

          {/* Waze Direct */}
          <a
            href={invitationConfig.navigation.wazeDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-ivory/95 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>🛣️ {t('open_waze')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>

          {/* Apple Maps Direct */}
          <a
            href={invitationConfig.navigation.appleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-ivory/95 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>🗺️ {t('open_apple_maps')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

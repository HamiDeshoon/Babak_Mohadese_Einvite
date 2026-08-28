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
    <section id="venue" className="relative py-28 sm:py-36 px-6 z-10 bg-silk/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('venue_eyebrow')} ❦
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-fantasy text-4xl sm:text-5xl md:text-6xl' : 'font-fairytale text-3xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-4 text-gold-shimmer`}>
            {t('venue_title')}
          </h2>

          <p className={`${isPersian ? 'font-katibeh text-2xl md:text-3xl' : 'font-serif text-xl md:text-2xl'} text-rose-deep font-semibold mb-2`}>
            {isPersian ? invitationConfig.event.venueNameFa : invitationConfig.event.venueNameEn}
          </p>

          <div className="flex items-center justify-center gap-2 max-w-xl mx-auto mb-4">
            <p className="font-sans text-xs sm:text-sm text-warm-gray font-light">
              {isPersian ? invitationConfig.event.venueAddressFa : invitationConfig.event.venueAddressEn}
            </p>
            <button
              onClick={copyAddress}
              title={isPersian ? 'کپی آدرس' : 'Copy Address'}
              className="px-2.5 py-1 rounded-full bg-champagne-100/80 hover:bg-gold/20 text-mahogany text-[11px] font-serif transition-colors border border-rose-gold/25 shrink-0"
            >
              {copiedAddress ? (isPersian ? 'کپی شد ✓' : 'Copied ✓') : (isPersian ? 'کپی آدرس' : 'Copy')}
            </button>
          </div>

          {/* Autumn Weather Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/90 backdrop-blur-md border border-gold/30 shadow-sm text-xs font-serif text-mahogany">
            <span className="text-sm">🍂</span>
            <span>
              {isPersian ? 'پیش‌بینی هوای شب مراسم: ۲۱° سانتی‌گراد، آسمان صاف و پاییزی' : 'Wedding Evening Weather: 21°C, Crisp Clear Autumn Sky'}
            </span>
          </div>
        </div>

        {/* Double-Bezel Map Container */}
        <div className="rounded-[2.5rem] p-2 bg-gradient-to-b from-sage-200/50 via-champagne-200/40 to-white/70 shadow-luxury mb-10 border border-gold/25">
          <div className="rounded-[calc(2.5rem-8px)] overflow-hidden bg-ivory border border-white/80 aspect-[16/10] sm:aspect-[21/9] min-h-[340px]">
            <iframe
              src={invitationConfig.navigation.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Wedding Venue Location Map"
            />
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
          <a
            href={invitationConfig.navigation.googleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/90 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>📍 {t('open_google_maps')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>

          <a
            href={invitationConfig.navigation.appleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/90 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>🗺️ {t('open_apple_maps')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>

          {isPersian && (
            <>
              <a
                href={invitationConfig.navigation.neshanDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/90 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-persianSans tracking-wider"
              >
                <span>🚗 {t('open_neshan')}</span>
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
              </a>

              <a
                href={invitationConfig.navigation.baladDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/90 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-persianSans tracking-wider"
              >
                <span>🧭 {t('open_balad')}</span>
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
              </a>
            </>
          )}

          <a
            href={invitationConfig.navigation.wazeDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/90 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>🛣️ {t('open_waze')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

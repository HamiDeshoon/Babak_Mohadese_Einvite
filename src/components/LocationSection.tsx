import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

export default function LocationSection() {
  const { isPersian, t } = useLanguage();

  return (
    <section id="venue" className="relative py-24 sm:py-32 px-6 z-10 bg-silk/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-rose-gold/60" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              {t('venue_eyebrow')}
            </span>
            <span className="h-px w-6 bg-rose-gold/60" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-mahogany mb-4">
            {t('venue_title')}
          </h2>

          <p className="font-serif text-xl md:text-2xl text-rose-gold font-medium mb-2">
            {isPersian ? invitationConfig.event.venueNameFa : invitationConfig.event.venueNameEn}
          </p>

          <p className="font-sans text-sm sm:text-base text-warm-gray font-light max-w-xl mx-auto">
            {isPersian ? invitationConfig.event.venueAddressFa : invitationConfig.event.venueAddressEn}
          </p>
        </div>

        {/* Double-Bezel Map Container */}
        <div className="rounded-[2.5rem] p-2 bg-gradient-to-b from-champagne-200/60 via-rose-blush/30 to-champagne-100/50 shadow-luxury mb-10">
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
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/80 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>📍 {t('open_google_maps')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>

          <a
            href={invitationConfig.navigation.appleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/80 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-serif tracking-wider"
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
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/80 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-persianSans tracking-wider"
              >
                <span>🚗 {t('open_neshan')}</span>
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
              </a>

              <a
                href={invitationConfig.navigation.baladDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/80 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-persianSans tracking-wider"
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
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/80 hover:bg-champagne text-mahogany border border-rose-gold/30 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-serif tracking-wider"
          >
            <span>🛣️ {t('open_waze')}</span>
            <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

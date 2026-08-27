import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig, GalleryItem } from '../config/invitation.config';
import { asset } from '../lib/assets';

export default function Gallery() {
  const { isPersian, t } = useLanguage();
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const images = invitationConfig.media.gallery;

  return (
    <section id="gallery" className="relative py-28 sm:py-36 px-6 z-10 bg-ivory">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('gallery_eyebrow')} ❦
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-fantasy text-4xl sm:text-5xl md:text-6xl' : 'font-fairytale text-3xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-4 text-gold-shimmer`}>
            {t('gallery_title')}
          </h2>

          <p className="font-sans text-sm sm:text-base text-warm-gray font-light max-w-lg mx-auto leading-relaxed">
            {t('gallery_desc')}
          </p>
        </div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {images.map((img) => (
            <figure
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group cursor-pointer rounded-3xl p-1.5 bg-gradient-to-b from-sage-100/60 via-champagne-100/50 to-rose-blush/30 border border-gold/30 shadow-luxury transition-all duration-500 hover:-translate-y-2 hover:shadow-luxury-hover overflow-hidden"
            >
              <div className="rounded-[calc(1.5rem-4px)] overflow-hidden bg-ivory/95">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={asset(img.src)}
                    alt={isPersian ? img.titleFa : img.titleEn}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mahogany/70 via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                    <span className="text-xs font-serif text-ivory tracking-widest uppercase">
                      ✦ {isPersian ? 'بزرگنمایی تصویر' : 'Expand Image'}
                    </span>
                    <span className="text-gold text-lg">✦</span>
                  </div>
                </div>

                <figcaption className="p-5 text-center bg-ivory/90 backdrop-blur-sm">
                  <h4 className={`${isPersian ? 'font-katibeh text-xl sm:text-2xl' : 'font-serif text-base sm:text-lg'} font-semibold text-mahogany mb-1.5`}>
                    {isPersian ? img.titleFa : img.titleEn}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-warm-gray font-light leading-relaxed">
                    {isPersian ? img.captionFa : img.captionEn}
                  </p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-mahogany-dark/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] rounded-3xl p-1 bg-gradient-to-b from-champagne via-rose-gold to-gold shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 w-10 h-10 rounded-full bg-ivory/80 text-mahogany flex items-center justify-center shadow-md hover:bg-ivory transition-colors"
            >
              ✕
            </button>

            <div className="rounded-[calc(1.5rem-4px)] bg-ivory overflow-hidden">
              <img
                src={asset(activeImage.src)}
                alt={isPersian ? activeImage.titleFa : activeImage.titleEn}
                className="max-h-[70vh] w-auto mx-auto object-contain"
              />
              <div className="p-6 text-center bg-ivory">
                <h3 className="font-serif text-xl text-mahogany font-medium mb-1">
                  {isPersian ? activeImage.titleFa : activeImage.titleEn}
                </h3>
                <p className="font-sans text-sm text-warm-gray font-light">
                  {isPersian ? activeImage.captionFa : activeImage.captionEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

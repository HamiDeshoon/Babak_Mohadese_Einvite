import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

export default function Gallery() {
  const { isPersian, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const images = invitationConfig.media.gallery;

  const rotations = [
    '-rotate-2',
    'rotate-3',
    '-rotate-1.5',
    'rotate-2',
    '-rotate-3',
    'rotate-1.5',
    '-rotate-2.5',
    'rotate-2',
    '-rotate-1',
    'rotate-2.5',
    '-rotate-3',
    'rotate-1.5',
  ];

  const washiTapes = [
    'bg-amber-100/75 border-amber-300/50',
    'bg-rose-100/70 border-rose-300/40',
    'bg-emerald-100/70 border-emerald-300/40',
    'bg-stone-200/75 border-stone-400/40',
  ];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
    }
  };

  const activeImage = activeImageIndex !== null ? images[activeImageIndex] : null;

  return (
    <section id="gallery" className="relative py-28 sm:py-36 px-6 z-10 bg-ivory overflow-hidden">
      {/* Charming Natural Wedding Botanical Sprigs in Background */}
      <div className="absolute top-10 left-[-60px] w-56 h-56 opacity-20 pointer-events-none rounded-full overflow-hidden blur-[1px]">
        <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-10 right-[-60px] w-64 h-64 opacity-20 pointer-events-none rounded-full overflow-hidden blur-[1px]">
        <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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

        {/* Charming Natural Wedding Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4 pb-8">
          {images.map((img, idx) => {
            const rotationClass = rotations[idx % rotations.length];
            const tapeColor = washiTapes[idx % washiTapes.length];

            return (
              <div
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`group cursor-pointer transform ${rotationClass} hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out`}
              >
                {/* Physical Polaroid Card */}
                <div className="relative bg-[#FAF8F4] p-3.5 sm:p-4 pb-8 sm:pb-9 rounded-sm shadow-xl hover:shadow-2xl border border-stone-200/70 transition-shadow duration-500">
                  {/* Realistic Semi-Translucent Washi Tape on top */}
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 ${tapeColor} backdrop-blur-xs border-y shadow-xs rotate-[-1deg] z-20 opacity-85 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Polaroid Photo Frame */}
                  <div className="aspect-[4/3] overflow-hidden bg-stone-900 relative shadow-inner">
                    <img
                      src={asset(img.src)}
                      alt={isPersian ? img.titleFa : img.titleEn}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Glossy Photo Reflection & Expand Badge on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-mahogany/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <span className="text-[11px] font-serif text-ivory tracking-widest uppercase">
                        ✦ {isPersian ? 'نمایش تمام‌صفحه' : 'View Memory'}
                      </span>
                      <span className="text-gold text-base">🔍</span>
                    </div>
                  </div>

                  {/* Handwritten-Style Polaroid Caption */}
                  <div className="pt-4 px-2 text-center">
                    <h4 className={`${isPersian ? 'font-katibeh text-xl sm:text-2xl leading-tight' : 'font-fairytale text-lg sm:text-xl'} text-mahogany font-medium mb-1`}>
                      {isPersian ? img.titleFa : img.titleEn}
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs text-warm-stone font-light line-clamp-2 leading-relaxed">
                      {isPersian ? img.captionFa : img.captionEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal with Carousel Navigation */}
      {activeImage && activeImageIndex !== null && (
        <div
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 z-50 bg-mahogany-dark/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-50 w-11 h-11 rounded-full bg-ivory/80 hover:bg-ivory text-mahogany flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          >
            ✕
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-ivory/80 hover:bg-ivory text-mahogany flex items-center justify-center shadow-xl transition-transform hover:scale-110 text-lg font-bold"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-ivory/80 hover:bg-ivory text-mahogany flex items-center justify-center shadow-xl transition-transform hover:scale-110 text-lg font-bold"
          >
            ›
          </button>

          {/* Polaroid Style Modal Frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#FAF8F4] p-4 sm:p-6 pb-8 sm:pb-10 rounded-sm shadow-2xl border border-stone-300 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
          >
            <div className="aspect-[4/3] max-h-[60vh] overflow-hidden bg-black shadow-inner mb-5">
              <img
                src={asset(activeImage.src)}
                alt={isPersian ? activeImage.titleFa : activeImage.titleEn}
                className="w-full h-full object-contain mx-auto"
              />
            </div>

            <div className="text-center px-4">
              <h3 className={`${isPersian ? 'font-fantasy text-2xl sm:text-3xl' : 'font-fairytale text-2xl'} text-mahogany font-medium mb-2`}>
                {isPersian ? activeImage.titleFa : activeImage.titleEn}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-warm-gray font-light max-w-lg mx-auto leading-relaxed">
                {isPersian ? activeImage.captionFa : activeImage.captionEn}
              </p>
              <div className="mt-4 text-[11px] font-serif uppercase tracking-widest text-gold">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

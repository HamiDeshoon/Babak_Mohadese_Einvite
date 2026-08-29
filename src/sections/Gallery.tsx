import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

export default function Gallery() {
  const { isPersian, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const images = invitationConfig.media.gallery;

  const nextStack = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevStack = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const washiTapes = [
    'bg-amber-100/80 border-amber-300/60',
    'bg-rose-100/75 border-rose-300/50',
    'bg-emerald-100/75 border-emerald-300/50',
    'bg-stone-200/80 border-stone-400/50',
  ];

  const rotations = [
    '-rotate-1 sm:-rotate-2',
    'rotate-1 sm:rotate-2.5',
    '-rotate-1.5 sm:-rotate-2',
    'rotate-1 sm:rotate-2',
    '-rotate-1 sm:-rotate-2.5',
    'rotate-1.5 sm:rotate-2',
  ];

  const currentImage = images[currentIndex];
  const nextImage1 = images[(currentIndex + 1) % images.length];
  const nextImage2 = images[(currentIndex + 2) % images.length];

  return (
    <section id="gallery" className="relative py-16 sm:py-32 px-3.5 sm:px-6 z-10 bg-ivory overflow-hidden">
      {/* Charming Natural Wedding Botanical Sprigs in Background */}
      <div className="absolute top-10 -left-10 w-36 sm:w-56 h-36 sm:h-56 opacity-20 pointer-events-none rounded-full overflow-hidden blur-[1px]">
        <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover animate-[spin_80s_linear_infinite]" />
      </div>
      <div className="absolute bottom-10 -right-10 w-40 sm:w-64 h-40 sm:h-64 opacity-20 pointer-events-none rounded-full overflow-hidden blur-[1px]">
        <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('gallery_eyebrow')} ❦
            </span>
            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-nastaliq text-4xl sm:text-6xl md:text-7xl py-1' : 'font-fairytale text-2xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-2 sm:mb-3 text-gold-shimmer`}>
            {t('gallery_title')}
          </h2>

          <p className="font-sans text-xs sm:text-base text-warm-gray font-light max-w-lg mx-auto leading-relaxed px-2 mb-6">
            {t('gallery_desc')}
          </p>

          {/* View Mode Switcher (Stacked Deck vs Grid Mosaic) */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-champagne-100/80 border border-gold/30 shadow-sm">
            <button
              onClick={() => setViewMode('stack')}
              className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-serif transition-all duration-300 flex items-center gap-1.5 ${
                viewMode === 'stack'
                  ? 'bg-mahogany text-ivory shadow-sm'
                  : 'text-warm-gray hover:text-mahogany'
              }`}
            >
              <span>🗂️</span>
              <span>{isPersian ? 'دسته‌کارت خاطرات (پشته‌ای)' : 'Stacked Deck'}</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-serif transition-all duration-300 flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-mahogany text-ivory shadow-sm'
                  : 'text-warm-gray hover:text-mahogany'
              }`}
            >
              <span>🖼️</span>
              <span>{isPersian ? 'آلبوم یکپارچه' : 'Grid Wall'}</span>
            </button>
          </div>
        </div>

        {/* MODE 1: PHYSICAL STACKED POLAROID DECK */}
        {viewMode === 'stack' && (
          <div className="flex flex-col items-center justify-center pt-4 pb-8">
            <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] h-[450px] xs:h-[490px] sm:h-[540px] flex items-center justify-center mx-auto">
              
              {/* Deep Background Card 2 (Bottom Stack Layer) */}
              <div className="absolute inset-0 bg-[#F5F2EA] p-3 sm:p-4 pb-7 sm:pb-9 rounded-sm shadow-md border border-stone-300/60 transform rotate-[4deg] translate-y-3 scale-[0.93] opacity-60 pointer-events-none transition-all duration-500">
                <div className="aspect-[4/3] bg-stone-800 overflow-hidden">
                  <img src={asset(nextImage2.src)} alt="" className="w-full h-full object-cover opacity-60" />
                </div>
              </div>

              {/* Middle Background Card 1 (Mid Stack Layer) */}
              <div className="absolute inset-0 bg-[#FAF7F0] p-3 sm:p-4 pb-7 sm:pb-9 rounded-sm shadow-lg border border-stone-300/80 transform -rotate-[3deg] translate-y-1.5 scale-[0.96] opacity-80 pointer-events-none transition-all duration-500">
                <div className="aspect-[4/3] bg-stone-800 overflow-hidden">
                  <img src={asset(nextImage1.src)} alt="" className="w-full h-full object-cover opacity-80" />
                </div>
              </div>

              {/* Front Main Active Polaroid Card */}
              <div
                onClick={() => setActiveLightboxIndex(currentIndex)}
                className="group absolute inset-0 cursor-pointer bg-[#FFFDF9] p-3.5 sm:p-4 pb-8 sm:pb-10 rounded-sm stacked-polaroid-shadow border border-stone-200 transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between"
              >
                {/* Washi Tape Accent */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 ${
                    washiTapes[currentIndex % washiTapes.length]
                  } backdrop-blur-xs border-y shadow-xs -rotate-1 z-20 opacity-90`}
                />

                {/* Main Photo */}
                <div className="aspect-[4/3] overflow-hidden bg-stone-900 relative shadow-inner rounded-xs">
                  <img
                    src={asset(currentImage.src)}
                    alt={isPersian ? currentImage.titleFa : currentImage.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mahogany/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                    <span className="text-[10px] font-serif text-ivory tracking-widest uppercase">
                      ✦ {isPersian ? 'لمس برای بزرگنمایی' : 'Tap to Enlarge'}
                    </span>
                    <span className="text-gold text-sm">🔍</span>
                  </div>
                </div>

                {/* Handwritten Style Caption */}
                <div className="pt-3 text-center px-1">
                  <h4 className={`${isPersian ? 'font-nastaliq text-xl sm:text-2xl pt-1' : 'font-fairytale text-lg sm:text-xl'} text-mahogany font-medium mb-0.5`}>
                    {isPersian ? currentImage.titleFa : currentImage.titleEn}
                  </h4>
                  <p className="font-sans text-xs text-warm-stone font-light line-clamp-2 leading-relaxed">
                    {isPersian ? currentImage.captionFa : currentImage.captionEn}
                  </p>
                </div>

                {/* Pagination Pill */}
                <div className="text-center pt-1 text-[10px] font-serif uppercase tracking-widest text-gold">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Stack Deck Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevStack}
                aria-label="Previous photo in stack"
                className="px-5 py-2.5 rounded-full bg-ivory border border-gold/40 text-mahogany hover:bg-champagne shadow-sm hover:scale-105 active:scale-95 transition-all text-xs font-serif flex items-center gap-1.5"
              >
                <span>‹</span>
                <span>{isPersian ? 'عکس قبلی' : 'Previous'}</span>
              </button>

              <button
                onClick={() => setActiveLightboxIndex(currentIndex)}
                className="w-10 h-10 rounded-full bg-champagne-100 border border-rose-gold/30 flex items-center justify-center text-mahogany shadow-sm hover:scale-105 transition-all"
                title={isPersian ? 'نمایش تمام‌صفحه' : 'Full Screen'}
              >
                🔍
              </button>

              <button
                onClick={nextStack}
                aria-label="Next photo in stack"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-forest via-sage-500 to-forest text-ivory shadow-md hover:scale-105 active:scale-95 transition-all text-xs font-serif flex items-center gap-1.5 border border-gold/30"
              >
                <span>{isPersian ? 'عکس بعدی' : 'Next'}</span>
                <span>›</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: POLAROID GRID MOSAIC */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2 pb-6 max-w-sm sm:max-w-none mx-auto">
            {images.map((img, idx) => {
              const rotationClass = rotations[idx % rotations.length];
              const tapeColor = washiTapes[idx % washiTapes.length];

              return (
                <div
                  key={img.id}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`group cursor-pointer transform ${rotationClass} hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out`}
                >
                  <div className="relative bg-[#FFFDF9] p-3 sm:p-4 pb-6 sm:pb-8 rounded-sm stacked-polaroid-shadow border border-stone-200/70">
                    <div
                      className={`absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-5 sm:h-6 ${tapeColor} backdrop-blur-xs border-y shadow-xs rotate-[-1deg] z-20 opacity-85`}
                    />
                    <div className="aspect-[4/3] overflow-hidden bg-stone-900 relative shadow-inner">
                      <img
                        src={asset(img.src)}
                        alt={isPersian ? img.titleFa : img.titleEn}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                    </div>
                    <div className="pt-3 px-1 text-center">
                      <h4 className={`${isPersian ? 'font-nastaliq text-lg sm:text-2xl pt-1' : 'font-fairytale text-base sm:text-xl'} text-mahogany font-medium mb-0.5`}>
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
        )}
      </div>

      {/* Lightbox Modal with Carousel Navigation */}
      {activeLightboxIndex !== null && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-mahogany-dark/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-8 animate-in fade-in duration-300"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ivory/90 hover:bg-ivory text-mahogany flex items-center justify-center shadow-lg transition-transform hover:scale-110 text-sm sm:text-base"
          >
            ✕
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((activeLightboxIndex - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ivory/90 hover:bg-ivory text-mahogany flex items-center justify-center shadow-xl transition-transform hover:scale-110 text-base sm:text-lg font-bold"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((activeLightboxIndex + 1) % images.length);
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ivory/90 hover:bg-ivory text-mahogany flex items-center justify-center shadow-xl transition-transform hover:scale-110 text-base sm:text-lg font-bold"
          >
            ›
          </button>

          {/* Polaroid Style Modal Frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#FAF8F4] p-3 sm:p-6 pb-6 sm:pb-10 rounded-sm shadow-2xl border border-stone-300 max-h-[88dvh] overflow-y-auto animate-in zoom-in-95 duration-300 mx-auto"
          >
            <div className="aspect-[4/3] max-h-[55dvh] overflow-hidden bg-black shadow-inner mb-3 sm:mb-5">
              <img
                src={asset(images[activeLightboxIndex].src)}
                alt={isPersian ? images[activeLightboxIndex].titleFa : images[activeLightboxIndex].titleEn}
                className="w-full h-full object-contain mx-auto"
              />
            </div>

            <div className="text-center px-2 sm:px-4">
              <h3 className={`${isPersian ? 'font-nastaliq text-2xl sm:text-4xl pt-1' : 'font-fairytale text-lg sm:text-2xl'} text-mahogany font-medium mb-1`}>
                {isPersian ? images[activeLightboxIndex].titleFa : images[activeLightboxIndex].titleEn}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-warm-gray font-light max-w-lg mx-auto leading-relaxed">
                {isPersian ? images[activeLightboxIndex].captionFa : images[activeLightboxIndex].captionEn}
              </p>
              <div className="mt-2.5 sm:mt-4 text-[10px] sm:text-[11px] font-serif uppercase tracking-widest text-gold">
                {activeLightboxIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

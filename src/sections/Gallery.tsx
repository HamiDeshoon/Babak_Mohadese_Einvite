import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

export default function Gallery() {
  const { isPersian } = useLanguage();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const images = invitationConfig.media.gallery;

  const washiTapes = [
    'bg-amber-100/90 border-amber-300/70 rotate-[-4deg]',
    'bg-rose-100/90 border-rose-300/60 rotate-[3deg]',
    'bg-emerald-100/90 border-emerald-300/60 rotate-[-2deg]',
    'bg-stone-200/90 border-stone-400/60 rotate-[5deg]',
    'bg-champagne-200/90 border-gold/60 rotate-[-3deg]',
    'bg-sage-100/90 border-sage-300/60 rotate-[2deg]',
  ];

  // Natural organic scatter rotations and offsets for the messy pile effect
  const scatterStyles = [
    { rotate: '-rotate-3 sm:-rotate-4', translate: 'translate-y-0 sm:translate-y-1', zIndex: 'z-10' },
    { rotate: 'rotate-4 sm:rotate-5', translate: 'translate-y-2 sm:-translate-y-3', zIndex: 'z-20' },
    { rotate: '-rotate-5 sm:-rotate-6', translate: '-translate-y-1 sm:translate-y-2', zIndex: 'z-10' },
    { rotate: 'rotate-3 sm:rotate-4', translate: 'translate-y-3 sm:-translate-y-2', zIndex: 'z-30' },
    { rotate: '-rotate-2 sm:-rotate-3', translate: '-translate-y-2 sm:translate-y-3', zIndex: 'z-20' },
    { rotate: 'rotate-5 sm:rotate-6', translate: 'translate-y-1 sm:-translate-y-1', zIndex: 'z-30' },
  ];

  const handleShuffle = () => {
    setShuffleSeed((prev) => prev + 1);
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-32 px-3.5 sm:px-6 z-10 bg-ivory overflow-hidden">
      {/* Charming Natural Wedding Botanical Lighting in Background */}
      <div className="absolute top-10 -left-12 w-48 sm:w-72 h-48 sm:h-72 opacity-25 pointer-events-none rounded-full overflow-hidden blur-[1px]">
        <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover animate-[spin_80s_linear_infinite]" />
      </div>
      <div className="absolute bottom-10 -right-12 w-52 sm:w-80 h-52 sm:h-80 opacity-25 pointer-events-none rounded-full overflow-hidden blur-[1px]">
        <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {isPersian ? 'گالری قاب‌های ماندگار' : 'Photo Gallery & Memories'} ❦
            </span>
            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-nastaliq text-4xl sm:text-6xl md:text-7xl py-2' : 'font-fairytale text-2xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-3 sm:mb-4 text-gold-shimmer`}>
            {isPersian ? 'آلبوم خاطرات شیرین ما' : 'Our Cherished Moments'}
          </h2>
        </div>

        {/* Scattered Messy Polaroids Deck (پولارویدهای روی هم و نامرتب) */}
        <div className="relative pt-4 pb-8">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">📸</span>
              <span className={`${isPersian ? 'font-nastaliq text-2xl sm:text-3xl pt-1' : 'font-serif text-base'} text-mahogany font-medium`}>
                {isPersian ? 'میز عکس‌ها و خاطرات پولاروید' : 'Scattered Polaroid Memories'}
              </span>
            </div>
            <button
              onClick={handleShuffle}
              className="px-4 py-1.5 rounded-full bg-champagne-100/80 hover:bg-gold hover:text-ivory text-mahogany text-xs font-serif transition-all duration-300 border border-gold/30 flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>🎲</span>
              <span>{isPersian ? 'ورق زدن و جابجایی' : 'Shuffle Deck'}</span>
            </button>
          </div>

          {/* Organic Scattered Polaroid Grid with Washi Tape & Overlapping Tilts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
            {images.map((img, idx) => {
              const scatterIndex = (idx + shuffleSeed) % scatterStyles.length;
              const scatter = scatterStyles[scatterIndex];
              const tapeStyle = washiTapes[idx % washiTapes.length];

              return (
                <div
                  key={`${img.id}-${shuffleSeed}`}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`group relative cursor-pointer transition-all duration-500 hover:scale-105 hover:z-40 ${scatter.rotate} ${scatter.translate} ${scatter.zIndex}`}
                >
                  {/* Washi Tape Strip on Top */}
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 z-30 shadow-sm border border-dashed opacity-85 pointer-events-none transition-transform duration-300 group-hover:scale-110 ${tapeStyle}`}
                  />

                  {/* Physical Polaroid Card */}
                  <div className="p-3 sm:p-4 bg-[#FBF9F4] rounded-lg border border-stone-200/80 shadow-2xl stacked-polaroid-shadow transition-shadow duration-300 group-hover:shadow-[0_25px_50px_rgba(44,29,26,0.25)] flex flex-col">
                    {/* Inner Photo Frame */}
                    <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded bg-stone-100 border border-stone-300/40">
                      <img
                        src={asset(img.src)}
                        alt={isPersian ? img.captionFa : img.captionEn}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Polaroid Bottom Calligraphy Caption Area */}
                    <div className="pt-3 pb-1 text-center flex flex-col items-center">
                      <p className={`${isPersian ? 'font-nastaliq text-lg sm:text-xl leading-relaxed text-mahogany' : 'font-brush text-base sm:text-lg text-mahogany'}`}>
                        {isPersian ? img.titleFa : img.titleEn}
                      </p>
                      <span className={`${isPersian ? 'font-persian text-xs' : 'font-serif text-[11px]'} text-warm-stone line-clamp-2 mt-0.5 px-1`}>
                        {isPersian ? img.captionFa : img.captionEn}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
        >
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg z-50 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-[#FCFAF5] p-4 sm:p-6 rounded-2xl border border-gold/30 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300"
          >
            <div className="w-full max-h-[70vh] rounded-lg overflow-hidden border border-stone-200 mb-4 bg-stone-100 flex items-center justify-center">
              <img
                src={asset(images[activeLightboxIndex].src)}
                alt=""
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>
            <h3 className={`${isPersian ? 'font-nastaliq text-2xl sm:text-3xl pt-1' : 'font-serif text-lg'} text-mahogany text-center`}>
              {isPersian ? images[activeLightboxIndex].titleFa : images[activeLightboxIndex].titleEn}
            </h3>
            <p className={`${isPersian ? 'font-persian text-sm' : 'font-sans text-xs'} text-warm-gray text-center mt-1 px-4`}>
              {isPersian ? images[activeLightboxIndex].captionFa : images[activeLightboxIndex].captionEn}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

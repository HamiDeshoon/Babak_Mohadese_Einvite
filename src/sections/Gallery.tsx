import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig, GalleryItem } from '../config/invitation.config';

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
            <span className="h-px w-6 bg-rose-gold/60" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              {t('gallery_eyebrow')}
            </span>
            <span className="h-px w-6 bg-rose-gold/60" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-mahogany mb-4">
            {t('gallery_title')}
          </h2>

          <p className="font-sans text-sm sm:text-base text-warm-gray font-light max-w-lg mx-auto">
            {t('gallery_desc')}
          </p>
        </div>

        {/* Video Invitation Player if configured */}
        <div className="mb-16 max-w-4xl mx-auto rounded-[2.5rem] p-2 bg-gradient-to-b from-champagne-200/50 via-rose-blush/30 to-champagne-100/40 shadow-luxury">
          <div className="rounded-[calc(2.5rem-8px)] overflow-hidden bg-ivory p-6 sm:p-8 border border-white/80 text-center">
            <h3 className="font-serif text-xl sm:text-2xl text-mahogany font-medium mb-2">
              {t('video_invitation_title')}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-warm-gray mb-6 font-light">
              {t('video_invitation_desc')}
            </p>

            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md bg-champagne-100">
              {invitationConfig.media.featuredVideo ? (
                <video
                  src={invitationConfig.media.featuredVideo}
                  controls
                  poster={invitationConfig.media.featuredVideoPoster}
                  className="w-full h-full object-cover"
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="w-full h-full relative group cursor-pointer">
                  <img
                    src={invitationConfig.media.featuredVideoPoster}
                    alt="Video Invitation Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-mahogany/30 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-ivory/90 backdrop-blur-md shadow-gold-glow flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <span className="text-rose-deep text-2xl sm:text-3xl ml-1 rtl:mr-1 rtl:ml-0">▶</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <figure
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group cursor-pointer rounded-3xl p-1 bg-gradient-to-b from-champagne-200/40 via-white/60 to-champagne-100/30 border border-rose-gold/20 shadow-luxury transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxury-hover overflow-hidden"
            >
              <div className="rounded-[calc(1.5rem-4px)] overflow-hidden bg-ivory">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={img.src}
                    alt={isPersian ? img.titleFa : img.titleEn}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mahogany/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-xs font-serif text-ivory tracking-widest uppercase">
                      ✦ Click to expand
                    </span>
                  </div>
                </div>

                <figcaption className="p-4 text-center">
                  <h4 className="font-serif text-base font-medium text-mahogany mb-1">
                    {isPersian ? img.titleFa : img.titleEn}
                  </h4>
                  <p className="font-sans text-xs text-warm-gray font-light">
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
                src={activeImage.src}
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

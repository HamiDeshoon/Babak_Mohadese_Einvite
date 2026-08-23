import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const { isPersian, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.story-card');
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isPersian]);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative py-28 sm:py-36 px-6 z-10 bg-ivory"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-rose-gold/60" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              {t('story_eyebrow')}
            </span>
            <span className="h-px w-6 bg-rose-gold/60" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-mahogany mb-6">
            {t('story_title')}
          </h2>

          {/* Romantic Quote */}
          <blockquote className="max-w-2xl mx-auto p-6 rounded-3xl bg-champagne/40 border border-rose-blush/40 backdrop-blur-sm text-center">
            <p className="font-serif italic text-base sm:text-lg text-warm-gray leading-relaxed">
              {isPersian ? invitationConfig.story.quoteFa : invitationConfig.story.quoteEn}
            </p>
          </blockquote>
        </div>

        {/* Story Chapters Timeline / Double-Bezel Cards */}
        <div ref={cardsRef} className="space-y-12 sm:space-y-16">
          {invitationConfig.story.chapters.map((chapter, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={chapter.year}
                className={`story-card group flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center rounded-3xl sm:rounded-4xl p-2 bg-gradient-to-b from-champagne-200/40 via-white/50 to-champagne-100/30 border border-rose-gold/20 shadow-luxury transition-all duration-500 hover:shadow-luxury-hover`}
              >
                {/* Image / Visual Container */}
                {chapter.image && (
                  <div className="w-full md:w-1/2 rounded-[calc(2rem-4px)] sm:rounded-[calc(2.5rem-4px)] overflow-hidden aspect-[4/3] bg-champagne-100 relative">
                    <img
                      src={chapter.image}
                      alt={isPersian ? chapter.titleFa : chapter.titleEn}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mahogany/40 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 px-3.5 py-1 rounded-full bg-ivory/90 backdrop-blur-md text-xs font-serif text-mahogany shadow-sm">
                      {isPersian ? chapter.yearFa : chapter.year}
                    </span>
                  </div>
                )}

                {/* Text Content */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center text-left rtl:text-right">
                  <div className="text-xs uppercase tracking-[0.2em] font-serif text-rose-gold mb-2">
                    ✦ {isPersian ? chapter.yearFa : chapter.year} ✦
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-mahogany mb-4">
                    {isPersian ? chapter.titleFa : chapter.titleEn}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-warm-gray font-light leading-relaxed">
                    {isPersian ? chapter.contentFa : chapter.contentEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

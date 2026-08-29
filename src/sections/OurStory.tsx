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
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isPersian]);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative py-16 sm:py-28 px-4 sm:px-6 z-10 bg-ivory"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('story_eyebrow')} ❦
            </span>
            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-nastaliq text-4xl sm:text-6xl md:text-7xl py-1' : 'font-fairytale text-3xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-3 sm:mb-4 text-gold-shimmer`}>
            {t('story_title')}
          </h2>

          {/* Romantic Fairytale Quote */}
          <blockquote className="max-w-2xl mx-auto p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-ivory/90 border border-gold/35 backdrop-blur-md text-center shadow-luxury relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-bl from-sage-200/40 to-transparent rounded-bl-full pointer-events-none" />
            <p className={`${isPersian ? 'font-nastaliq text-lg sm:text-2xl leading-[2.4] sm:leading-[2.6] text-mahogany' : 'font-garamond italic text-base sm:text-xl text-warm-gray leading-relaxed'}`}>
              {isPersian ? invitationConfig.story.quoteFa : invitationConfig.story.quoteEn}
            </p>
          </blockquote>
        </div>

        {/* Clean Story Chapters Timeline / Double-Bezel Botanical Cards (Without Middle Images) */}
        <div ref={cardsRef} className="space-y-6 sm:space-y-8">
          {invitationConfig.story.chapters.map((chapter) => (
            <div
              key={chapter.year}
              className="story-card group rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-sage-100/50 via-white/80 to-champagne-100/40 border border-gold/25 shadow-luxury transition-all duration-500 hover:shadow-luxury-hover"
            >
              <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-4px)] p-6 sm:p-8 bg-ivory/95 backdrop-blur-md text-center flex flex-col items-center">
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-serif text-rose-deep mb-2 flex items-center gap-2">
                  <span className="text-gold">✦</span>
                  <span>{isPersian ? chapter.yearFa : chapter.year}</span>
                  <span className="text-gold">✦</span>
                </div>
                <h3 className={`${isPersian ? 'font-nastaliq text-2xl sm:text-3xl pt-1' : 'font-fairytale text-xl sm:text-2xl'} font-normal text-mahogany mb-2 sm:mb-3`}>
                  {isPersian ? chapter.titleFa : chapter.titleEn}
                </h3>
                <p className={`${isPersian ? 'font-nastaliq text-base sm:text-lg leading-[2.3]' : 'font-sans text-xs sm:text-base leading-relaxed'} text-warm-gray font-light max-w-2xl mx-auto`}>
                  {isPersian ? chapter.contentFa : chapter.contentEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

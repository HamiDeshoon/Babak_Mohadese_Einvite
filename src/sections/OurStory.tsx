import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

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
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('story_eyebrow')} ❦
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-fantasy text-4xl sm:text-5xl md:text-6xl' : 'font-fairytale text-3xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-6 text-gold-shimmer`}>
            {t('story_title')}
          </h2>

          {/* Romantic Fairytale Quote */}
          <blockquote className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-ivory/80 border border-gold/30 backdrop-blur-md text-center shadow-luxury relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sage-200/40 to-transparent rounded-bl-full pointer-events-none" />
            <p className={`${isPersian ? 'font-nastaliq text-xl sm:text-2xl leading-loose text-mahogany' : 'font-garamond italic text-lg sm:text-xl text-warm-gray leading-relaxed'}`}>
              {isPersian ? invitationConfig.story.quoteFa : invitationConfig.story.quoteEn}
            </p>
          </blockquote>
        </div>

        {/* Story Chapters Timeline / Double-Bezel Botanical Cards */}
        <div ref={cardsRef} className="space-y-14 sm:space-y-20">
          {invitationConfig.story.chapters.map((chapter, idx) => {
            const isEven = idx % 2 === 0;
            const isChildhood = idx === 0;
            return (
              <div
                key={chapter.year}
                className={`story-card group flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center rounded-3xl sm:rounded-4xl p-2 bg-gradient-to-b from-sage-100/50 via-white/70 to-champagne-100/40 border border-gold/25 shadow-luxury transition-all duration-500 hover:shadow-luxury-hover`}
              >
                {/* Visual Container */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  {isChildhood ? (
                    <div className="flex flex-col gap-3">
                      {/* Main Realistic Childhood Hug Feature */}
                      <div className="w-full rounded-[calc(2rem-4px)] sm:rounded-[calc(2.5rem-4px)] overflow-hidden aspect-[4/3] bg-champagne-100 relative shadow-sm border border-gold/30 group/hero">
                        <img
                          src={asset('/childhood_hug_realistic.jpg')}
                          alt={isPersian ? 'آغوش مهر کودکی' : 'Childhood Embrace'}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/hero:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-mahogany/70 via-transparent to-transparent opacity-75" />
                        <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-3.5 py-1 rounded-full bg-ivory/95 backdrop-blur-md text-xs font-serif text-mahogany shadow-sm border border-gold/30">
                          ❦ {isPersian ? 'آغوش دو ستاره‌ی کوچک' : 'Embrace of Destiny'}
                        </span>
                      </div>

                      {/* Dual Original Childhood Portraits */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-gold/25 shadow-sm group/child bg-ivory/80">
                          <img
                            src={asset('/Babak childhood.jpg')}
                            alt={isPersian ? 'کودکی بابک' : "Babak's Childhood"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/child:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-mahogany/80 via-transparent to-transparent flex items-end p-2.5">
                            <span className={`${isPersian ? 'font-katibeh text-xs sm:text-sm' : 'font-serif text-[11px]'} text-ivory font-medium`}>
                              {isPersian ? 'کودکی بابک' : 'Little Babak'}
                            </span>
                          </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-gold/25 shadow-sm group/child bg-ivory/80">
                          <img
                            src={asset("/mohadese's childhood.jpg")}
                            alt={isPersian ? 'کودکی محدثه' : "Mohadese's Childhood"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/child:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-mahogany/80 via-transparent to-transparent flex items-end p-2.5">
                            <span className={`${isPersian ? 'font-katibeh text-xs sm:text-sm' : 'font-serif text-[11px]'} text-ivory font-medium`}>
                              {isPersian ? 'کودکی محدثه' : 'Little Mohadese'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    chapter.image && (
                      <div className="w-full rounded-[calc(2rem-4px)] sm:rounded-[calc(2.5rem-4px)] overflow-hidden aspect-[4/3] bg-champagne-100 relative shadow-sm">
                        <img
                          src={asset(chapter.image)}
                          alt={isPersian ? chapter.titleFa : chapter.titleEn}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-mahogany/50 via-transparent to-transparent opacity-60" />
                        <span className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 px-4 py-1 rounded-full bg-ivory/95 backdrop-blur-md text-xs font-serif text-mahogany shadow-sm border border-gold/30">
                          ❦ {isPersian ? chapter.yearFa : chapter.year}
                        </span>
                      </div>
                    )
                  )}
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center text-left rtl:text-right">
                  <div className="text-xs uppercase tracking-[0.2em] font-serif text-rose-deep mb-2 flex items-center gap-2">
                    <span className="text-gold">✦</span>
                    <span>{isPersian ? chapter.yearFa : chapter.year}</span>
                    <span className="text-gold">✦</span>
                  </div>
                  <h3 className={`${isPersian ? 'font-fantasy text-3xl sm:text-4xl' : 'font-fairytale text-2xl sm:text-3xl'} font-normal text-mahogany mb-3`}>
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

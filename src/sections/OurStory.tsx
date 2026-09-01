import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const { isPersian, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 85%',
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
      className="relative py-14 sm:py-24 px-4 sm:px-6 z-10 bg-ivory"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('story_eyebrow')} ❦
            </span>
            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-nastaliq text-3xl sm:text-5xl md:text-6xl py-2' : 'font-fairytale text-3xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-4 sm:mb-6 text-gold-shimmer`}>
            {t('story_title')}
          </h2>

          {/* Romantic Fairytale Poem Card */}
          <blockquote
            ref={quoteRef}
            className="p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-b from-sage-50/70 via-ivory/95 to-champagne-50/60 border border-gold/35 backdrop-blur-md text-center shadow-luxury relative overflow-hidden my-4"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sage-200/40 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold/20 to-transparent rounded-tr-full pointer-events-none" />
            
            <span className="text-gold text-xl sm:text-2xl block mb-3 opacity-70">❝</span>
            <p className={`${isPersian ? 'font-nastaliq text-xl sm:text-3xl leading-[2.4] sm:leading-[2.6] text-mahogany' : 'font-garamond italic text-lg sm:text-2xl text-warm-gray leading-relaxed'}`}>
              {isPersian ? invitationConfig.story.quoteFa : invitationConfig.story.quoteEn}
            </p>
            <span className="text-gold text-xl sm:text-2xl block mt-3 opacity-70">❞</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

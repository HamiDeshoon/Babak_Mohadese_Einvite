import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

export default function Hero() {
  const { isPersian, t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const name1Ref = useRef<HTMLHeadingElement>(null);
  const ampRef = useRef<HTMLSpanElement>(null);
  const name2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        crestRef.current,
        { opacity: 0, scale: 0.8, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.2 }
      )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.8'
        )
        .fromTo(
          name1Ref.current,
          { opacity: 0, y: 35, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1 },
          '-=0.6'
        )
        .fromTo(
          ampRef.current,
          { opacity: 0, scale: 0.5, rotation: -10 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.8)' },
          '-=0.7'
        )
        .fromTo(
          name2Ref.current,
          { opacity: 0, y: 35, skewY: -2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1 },
          '-=0.8'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [isPersian]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-28 pb-16 px-6 text-center overflow-hidden z-10"
    >
      {/* Background Soft Mesh Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-rose-blush/25 via-gold-light/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Luxury Crest Monogram */}
        <div ref={crestRef} className="mb-6 relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-tr from-gold via-rose-gold to-champagne-300 shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-ivory/90 backdrop-blur-md flex flex-col items-center justify-center border border-white/80">
              <span className="text-xs text-gold">✦</span>
              <span className="font-serif text-lg sm:text-xl text-mahogany font-medium tracking-widest">
                {isPersian ? invitationConfig.couple.monogramFa : invitationConfig.couple.monogramEn}
              </span>
              <span className="text-[10px] text-rose-gold">✦</span>
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-xs sm:text-sm uppercase tracking-[0.25em] font-serif text-rose-deep mb-4"
        >
          {isPersian ? invitationConfig.couple.groomFamilyFa : invitationConfig.couple.groomFamilyEn}
        </p>

        {/* Couple Names */}
        <div className="my-2">
          {isPersian ? (
            <h1 className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <span
                ref={name1Ref}
                className="font-persianDisplay text-5xl sm:text-7xl md:text-8xl font-bold text-mahogany tracking-tight drop-shadow-sm"
              >
                {invitationConfig.couple.brideFa}
              </span>
              <span
                ref={ampRef}
                className="font-persianDisplay text-4xl sm:text-5xl text-rose-gold my-1 sm:my-0"
              >
                و
              </span>
              <span
                ref={name2Ref}
                className="font-persianDisplay text-5xl sm:text-7xl md:text-8xl font-bold text-mahogany tracking-tight drop-shadow-sm"
              >
                {invitationConfig.couple.groomFa}
              </span>
            </h1>
          ) : (
            <h1 className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <span
                ref={name1Ref}
                className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-mahogany tracking-tight"
              >
                {invitationConfig.couple.brideEn}
              </span>
              <span
                ref={ampRef}
                className="font-display text-5xl sm:text-6xl md:text-7xl text-rose-gold -my-2 sm:my-0"
              >
                &
              </span>
              <span
                ref={name2Ref}
                className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-mahogany tracking-tight"
              >
                {invitationConfig.couple.groomEn}
              </span>
            </h1>
          )}
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 text-sm sm:text-lg text-warm-gray font-light max-w-lg leading-relaxed"
        >
          {t('hero_request')}
        </p>

        {/* Date & Location Badge */}
        <div ref={badgeRef} className="mt-8">
          <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 rounded-full bg-ivory/80 backdrop-blur-xl border border-rose-gold/30 shadow-luxury">
            <span className="text-gold">✦</span>
            <span className="font-serif text-sm sm:text-base text-mahogany tracking-wider">
              {isPersian ? invitationConfig.event.dateFa : invitationConfig.event.dateEn}
            </span>
            <span className="text-rose-gold/40">•</span>
            <span className="font-serif text-xs sm:text-sm text-warm-stone">
              {isPersian ? invitationConfig.event.timeFa : invitationConfig.event.timeEn}
            </span>
            <span className="text-gold">✦</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('rsvp')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-deep via-rose-gold to-gold text-ivory font-serif text-sm uppercase tracking-wider shadow-lg hover:shadow-rose-glow hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {t('nav_rsvp')} ✦
          </button>
          <button
            onClick={() => scrollToSection('the-wedding')}
            className="px-7 py-3.5 rounded-full bg-ivory/80 hover:bg-champagne text-mahogany font-serif text-sm uppercase tracking-wider border border-rose-gold/30 shadow-sm hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {t('nav_wedding')}
          </button>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div
        ref={scrollRef}
        onClick={() => scrollToSection('our-story')}
        className="mt-14 sm:mt-20 cursor-pointer flex flex-col items-center gap-2 group"
      >
        <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-warm-stone group-hover:text-rose-deep transition-colors">
          {t('hero_scroll')}
        </span>
        <div className="w-6 h-10 rounded-full border border-rose-gold/40 flex items-start justify-center p-1.5 shadow-sm group-hover:border-gold transition-colors">
          <span className="w-1.5 h-2.5 bg-rose-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

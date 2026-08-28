import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

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
      {/* Background Soft Mesh & Botanical Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-sage-200/35 via-gold-light/25 to-rose-blush/30 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-gold/15 blur-3xl pointer-events-none -z-10" />

      {/* Floating Botanical Flower Elements (Charming Natural Wedding Inspiration) */}
      <div className="absolute top-20 -left-12 w-48 h-48 opacity-25 pointer-events-none rounded-full overflow-hidden blur-[1px] -z-10">
        <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover animate-[spin_60s_linear_infinite]" />
      </div>
      <div className="absolute bottom-24 -right-12 w-56 h-56 opacity-25 pointer-events-none rounded-full overflow-hidden blur-[1px] -z-10">
        <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover animate-[spin_80s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Charming Natural Wedding Luxury Crest Monogram */}
        <div ref={crestRef} className="mb-6 relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2.5px] bg-gradient-to-tr from-gold via-sage-400 to-rose-gold shadow-gold-glow flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-ivory/95 via-white/90 to-ivory/95 backdrop-blur-md flex flex-col items-center justify-center border border-white/80 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src={asset('/charming/Image-1.png')} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-gold">✦</span>
              <span className={`${isPersian ? 'font-fantasy text-2xl pt-1' : 'font-fairytale text-xl sm:text-2xl'} text-mahogany font-medium tracking-widest relative z-10`}>
                {isPersian ? invitationConfig.couple.monogramFa : invitationConfig.couple.monogramEn}
              </span>
              <span className="text-[10px] text-sage-500">✦</span>
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className={`${isPersian ? 'font-fantasy text-lg sm:text-2xl tracking-wide' : 'font-serif text-xs sm:text-sm uppercase tracking-[0.25em]'} text-rose-deep mb-3`}
        >
          ❦ {isPersian ? invitationConfig.couple.groomFamilyFa : invitationConfig.couple.groomFamilyEn} ❦
        </p>

        {/* Couple Names */}
        <div className="my-2">
          {isPersian ? (
            <h1 className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 py-2">
              <span
                ref={name1Ref}
                className="font-fantasy text-6xl sm:text-8xl md:text-9xl text-mahogany tracking-wide leading-relaxed drop-shadow-[0_0_20px_rgba(184,134,11,0.25)] text-gold-shimmer"
              >
                {invitationConfig.couple.brideFa}
              </span>
              <span
                ref={ampRef}
                className="font-fantasy text-4xl sm:text-6xl text-sage-500 my-1 sm:my-0 pb-2 drop-shadow-sm"
              >
                و
              </span>
              <span
                ref={name2Ref}
                className="font-fantasy text-6xl sm:text-8xl md:text-9xl text-mahogany tracking-wide leading-relaxed drop-shadow-[0_0_20px_rgba(184,134,11,0.25)] text-gold-shimmer"
              >
                {invitationConfig.couple.groomFa}
              </span>
            </h1>
          ) : (
            <h1 className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <span
                ref={name1Ref}
                className="font-fairytale text-5xl sm:text-7xl md:text-8xl font-normal text-mahogany tracking-tight text-gold-shimmer"
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
                className="font-fairytale text-5xl sm:text-7xl md:text-8xl font-normal text-mahogany tracking-tight text-gold-shimmer"
              >
                {invitationConfig.couple.groomEn}
              </span>
            </h1>
          )}
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className={`${isPersian ? 'font-katibeh text-xl sm:text-2xl' : 'font-sans text-sm sm:text-lg'} mt-4 text-warm-gray font-light max-w-lg leading-relaxed`}
        >
          {t('hero_request')}
        </p>

        {/* Date & Location Double-Bezel Badge */}
        <div ref={badgeRef} className="mt-8">
          <div className="rounded-full p-1 bg-gradient-to-r from-gold/30 via-sage-300/30 to-rose-gold/30 shadow-luxury">
            <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 rounded-full bg-ivory/95 backdrop-blur-xl border border-white/80">
              <span className="text-gold">✦</span>
              <span className={`${isPersian ? 'font-katibeh text-lg sm:text-xl' : 'font-serif text-sm sm:text-base'} text-mahogany font-medium tracking-wider`}>
                {isPersian ? invitationConfig.event.dateFa : invitationConfig.event.dateEn}
              </span>
              <span className="text-sage-400">•</span>
              <span className={`${isPersian ? 'font-katibeh text-base sm:text-lg' : 'font-serif text-xs sm:text-sm'} text-warm-stone`}>
                {isPersian ? invitationConfig.event.timeFa : invitationConfig.event.timeEn}
              </span>
              <span className="text-gold">✦</span>
            </div>
          </div>
        </div>

        {/* Action Buttons with Island Button-in-Button architecture */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('rsvp')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-forest via-sage-500 to-forest text-ivory font-serif text-sm uppercase tracking-wider shadow-lg hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300 border border-gold/30 flex items-center gap-2 group"
          >
            <span>{t('nav_rsvp')}</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:rotate-45 transition-transform duration-300">
              ✦
            </span>
          </button>
          <button
            onClick={() => scrollToSection('the-wedding')}
            className="px-7 py-3.5 rounded-full bg-ivory/90 hover:bg-champagne text-mahogany font-serif text-sm uppercase tracking-wider border border-gold/30 shadow-sm hover:scale-105 active:scale-95 transition-all duration-300"
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

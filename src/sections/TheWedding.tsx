import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import GiftRegistryModal from '../components/GiftRegistryModal';

gsap.registerPlugin(ScrollTrigger);

export default function TheWedding() {
  const { isPersian, t } = useLanguage();
  const [showSchedule, setShowSchedule] = useState(true);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.detail-card');
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isPersian]);

  const detailCards = [
    {
      icon: '🗓️',
      titleEn: 'Date & Season',
      titleFa: 'تاریخ و روز پیوند',
      descEn: invitationConfig.event.dateEn,
      descFa: invitationConfig.event.dateFa,
      highlightEn: 'Friday Celebration',
      highlightFa: 'جشن جمعه شب',
    },
    {
      icon: '⏰',
      titleEn: 'Ceremony Time',
      titleFa: 'ساعت ورود و پذیرش',
      descEn: invitationConfig.event.timeEn,
      descFa: invitationConfig.event.timeFa,
      highlightEn: 'Doors open 6:00 PM',
      highlightFa: 'ورود از ساعت ۶ عصر',
    },
    {
      icon: '🏰',
      titleEn: 'Venue & Palace',
      titleFa: 'عمارت مجلل رزامیر',
      descEn: `${invitationConfig.event.venueNameEn}, ${invitationConfig.event.cityEn}`,
      descFa: `${invitationConfig.event.venueNameFa}، ${invitationConfig.event.cityFa}`,
      highlightEn: 'Valet Parking Available',
      highlightFa: 'دارای پارکینگ اختصاصی',
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        id="the-wedding"
        className="relative py-16 sm:py-32 px-4 sm:px-6 z-10 bg-gradient-to-b from-champagne-50/70 via-silk/40 to-ivory"
      >
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
              <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
                ❦ {t('wedding_eyebrow')} ❦
              </span>
              <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
            </div>

            <h2 className={`${isPersian ? 'font-nastaliq text-4xl sm:text-6xl md:text-7xl py-1' : 'font-fairytale text-2xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-3 sm:mb-4 text-gold-shimmer`}>
              {t('wedding_title')}
            </h2>

            <p className={`${isPersian ? 'font-nastaliq text-base sm:text-xl leading-[2.2]' : 'font-sans text-xs sm:text-base leading-relaxed'} text-warm-gray font-light max-w-lg mx-auto px-2`}>
              {isPersian
                ? 'با کمال مسرت و شادمانی، چشم‌انتظار قدوم پرمهر شما عزیزان در این شب رویایی هستیم.'
                : 'With boundless joy, we look forward to celebrating this unforgettable night together with you.'}
            </p>
          </div>

          {/* 3 Feature Double-Bezel Cards (Date, Time, Location) */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-4xl mx-auto">
            {detailCards.map((card) => (
              <div
                key={card.titleEn}
                className="detail-card rounded-2xl sm:rounded-[2rem] p-1 sm:p-1.5 bg-gradient-to-b from-sage-200/50 via-white/80 to-champagne-100/40 shadow-luxury transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxury-hover border border-gold/25"
              >
                <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(2rem-6px)] p-5 sm:p-7 bg-ivory/95 backdrop-blur-xl h-full flex flex-col items-center text-center justify-between border border-white/60">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-champagne-100/80 border border-gold/30 flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 shadow-sm">
                    {card.icon}
                  </div>
                  <h3 className={`${isPersian ? 'font-nastaliq text-2xl sm:text-3xl pt-1' : 'font-serif text-base sm:text-lg font-semibold'} text-mahogany mb-1.5`}>
                    {isPersian ? card.titleFa : card.titleEn}
                  </h3>
                  <p className={`${isPersian ? 'font-nastaliq text-base sm:text-lg leading-[2.1]' : 'font-sans text-xs sm:text-sm leading-relaxed'} text-warm-gray font-light mb-3 sm:mb-4`}>
                    {isPersian ? card.descFa : card.descEn}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-forest/5 text-forest text-[10px] sm:text-[11px] font-serif tracking-wider border border-forest/15">
                    {isPersian ? card.highlightFa : card.highlightEn}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Event Timeline */}
          <div className="rounded-2xl sm:rounded-[2.5rem] p-1 sm:p-2 bg-gradient-to-b from-sage-200/40 via-champagne-200/40 to-white/60 shadow-luxury max-w-3xl mx-auto border border-gold/25 mb-10 sm:mb-16">
            <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(2.5rem-8px)] p-5 sm:p-10 bg-ivory/95 backdrop-blur-2xl border border-white/80">
              <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-rose-gold/20 mb-6 sm:mb-8">
                <h3 className={`${isPersian ? 'font-nastaliq text-2xl sm:text-4xl pt-1' : 'font-fairytale text-lg sm:text-2xl'} text-mahogany font-normal`}>
                  {isPersian ? 'جدول زمان‌بندی و برنامه‌های مراسم' : 'Celebration Schedule & Timeline'}
                </h3>
                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="text-[11px] sm:text-xs font-serif text-rose-deep hover:text-gold uppercase tracking-wider transition-colors shrink-0"
                >
                  {showSchedule ? t('hide_full_schedule') : t('view_full_schedule')}
                </button>
              </div>

              {showSchedule && (
                <div className="relative border-l-2 rtl:border-l-0 rtl:border-r-2 border-sage-300 pl-4 sm:pl-6 rtl:pl-0 rtl:pr-4 rtl:sm:pr-6 space-y-6 sm:space-y-8">
                  {invitationConfig.schedule.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Glowing Bullet */}
                      <span className="absolute -left-[23px] sm:-left-[31px] rtl:left-auto rtl:-right-[23px] rtl:sm:-right-[31px] top-2 w-3.5 h-3.5 rounded-full bg-forest border-2 border-ivory shadow-sm transition-transform duration-300 group-hover:scale-125 group-hover:bg-gold" />

                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 mb-1">
                        <span className="font-serif text-xs sm:text-sm font-semibold text-rose-deep min-w-[70px]">
                          {isPersian ? item.timeFa : item.time}
                        </span>
                        <h4 className={`${isPersian ? 'font-nastaliq text-xl sm:text-2xl pt-0.5' : 'font-serif text-sm sm:text-lg'} font-medium text-mahogany`}>
                          {isPersian ? item.titleFa : item.titleEn}
                        </h4>
                      </div>

                      <p className={`${isPersian ? 'font-nastaliq text-sm sm:text-base leading-[2.1]' : 'font-sans text-xs sm:text-sm'} text-warm-gray font-light`}>
                        {isPersian ? item.descFa : item.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Hub (Gift Registry) */}
          <div className="flex flex-wrap items-center justify-center gap-4 px-2">
            <button
              onClick={() => setIsGiftModalOpen(true)}
              className="w-full xs:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-gold via-champagne-300 to-rose-gold text-mahogany font-serif text-xs uppercase tracking-widest shadow-luxury hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300 border border-white/60 flex items-center justify-center gap-2"
            >
              <span>🎁</span>
              <span>{isPersian ? 'شماره حساب و یادبود عروس و داماد' : 'Gift Registry & Shaba Info'}</span>
              <span>✦</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gift Registry Modal */}
      <GiftRegistryModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
    </>
  );
}

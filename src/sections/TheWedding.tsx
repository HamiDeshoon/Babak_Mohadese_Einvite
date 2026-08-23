import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

gsap.registerPlugin(ScrollTrigger);

export default function TheWedding() {
  const { isPersian, t } = useLanguage();
  const [showSchedule, setShowSchedule] = useState(true);
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
      titleEn: 'Date',
      titleFa: 'تاریخ جشن',
      descEn: invitationConfig.event.dateEn,
      descFa: invitationConfig.event.dateFa,
    },
    {
      icon: '⏰',
      titleEn: 'Time',
      titleFa: 'زمان برگزاری',
      descEn: invitationConfig.event.timeEn,
      descFa: invitationConfig.event.timeFa,
    },
    {
      icon: '🏰',
      titleEn: 'Location',
      titleFa: 'محل برگزاری',
      descEn: `${invitationConfig.event.venueNameEn}, ${invitationConfig.event.cityEn}`,
      descFa: `${invitationConfig.event.venueNameFa}، ${invitationConfig.event.cityFa}`,
    },
    {
      icon: '✨',
      titleEn: 'Dress Code',
      titleFa: 'کد پوشش',
      descEn: invitationConfig.event.dressCodeEn,
      descFa: invitationConfig.event.dressCodeFa,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="the-wedding"
      className="relative py-28 sm:py-36 px-6 z-10 bg-champagne-50/70"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-rose-gold/60" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              {t('wedding_eyebrow')}
            </span>
            <span className="h-px w-6 bg-rose-gold/60" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-mahogany mb-4">
            {t('wedding_title')}
          </h2>

          <p className="font-sans text-sm sm:text-base text-warm-gray font-light max-w-lg mx-auto">
            {isPersian ? invitationConfig.event.dressCodeDescFa : invitationConfig.event.dressCodeDescEn}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {detailCards.map((card) => (
            <div
              key={card.titleEn}
              className="detail-card rounded-3xl p-1 bg-gradient-to-b from-champagne-200/50 via-white/70 to-champagne-100/40 shadow-luxury transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury-hover"
            >
              <div className="rounded-[calc(1.5rem-4px)] p-6 bg-ivory/90 backdrop-blur-xl h-full flex flex-col items-center text-center justify-center border border-white/60">
                <span className="text-3xl mb-3">{card.icon}</span>
                <h3 className="font-serif text-lg font-medium text-mahogany mb-1.5">
                  {isPersian ? card.titleFa : card.titleEn}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-warm-gray leading-relaxed font-light">
                  {isPersian ? card.descFa : card.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Event Timeline */}
        <div className="rounded-[2.5rem] p-2 bg-gradient-to-b from-rose-blush/30 via-champagne-200/40 to-white/60 shadow-luxury max-w-3xl mx-auto">
          <div className="rounded-[calc(2.5rem-8px)] p-6 sm:p-10 bg-ivory/90 backdrop-blur-2xl border border-white/80">
            <div className="flex items-center justify-between pb-6 border-b border-rose-gold/20 mb-8">
              <h3 className="font-serif text-xl sm:text-2xl text-mahogany font-medium">
                {isPersian ? 'جدول زمان‌بندی مراسم' : 'Celebration Schedule'}
              </h3>
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="text-xs font-serif text-rose-deep hover:text-gold uppercase tracking-wider transition-colors"
              >
                {showSchedule ? t('hide_full_schedule') : t('view_full_schedule')}
              </button>
            </div>

            {showSchedule && (
              <div className="relative border-l-2 rtl:border-l-0 rtl:border-r-2 border-rose-gold/30 pl-6 rtl:pl-0 rtl:pr-6 space-y-8">
                {invitationConfig.schedule.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Glowing Bullet */}
                    <span className="absolute -left-[31px] rtl:left-auto rtl:-right-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-rose-gold border-2 border-ivory shadow-sm transition-transform duration-300 group-hover:scale-125 group-hover:bg-gold" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                      <span className="font-serif text-sm font-semibold text-rose-deep min-w-[75px]">
                        {isPersian ? item.timeFa : item.time}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-medium text-mahogany">
                        {isPersian ? item.titleFa : item.titleEn}
                      </h4>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-warm-gray font-light">
                      {isPersian ? item.descFa : item.descEn}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

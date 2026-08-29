import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import {
  downloadIcsFile,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
} from '../lib/calendar';

export default function CountdownTimer() {
  const { isPersian, formatNumber, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = new Date(invitationConfig.event.targetIsoDate).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close calendar dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const eventConfig = {
    title: isPersian
      ? `جشن پیوند ${invitationConfig.couple.groomFa} و ${invitationConfig.couple.brideFa}`
      : `Wedding of ${invitationConfig.couple.groomEn} & ${invitationConfig.couple.brideEn}`,
    description: isPersian
      ? `${invitationConfig.couple.groomFamilyFa}\nمحل مراسم: ${invitationConfig.event.venueNameFa}`
      : `${invitationConfig.couple.groomFamilyEn}\nVenue: ${invitationConfig.event.venueNameEn}`,
    location: isPersian
      ? `${invitationConfig.event.venueNameFa}, ${invitationConfig.event.venueAddressFa}`
      : `${invitationConfig.event.venueNameEn}, ${invitationConfig.event.venueAddressEn}`,
    startTime: new Date(invitationConfig.event.targetIsoDate),
    endTime: new Date(invitationConfig.event.endIsoDate),
  };

  const timerUnits = [
    { label: t('days'), value: timeLeft.days },
    { label: t('hours'), value: timeLeft.hours },
    { label: t('minutes'), value: timeLeft.minutes },
    { label: t('seconds'), value: timeLeft.seconds },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-14 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center z-10"
    >
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
        <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
          ❦ {t('countdown_title')} ❦
        </span>
        <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
      </div>

      <p className="text-warm-gray text-xs sm:text-base font-light mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed px-4">
        {t('countdown_subtitle')}
      </p>

      {/* Luxury double-bezel countdown cards with 4 column mobile responsive layout */}
      <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:gap-6 max-w-2xl mx-auto mb-8 sm:mb-10">
        {timerUnits.map((unit) => (
          <div
            key={unit.label}
            className="group relative rounded-2xl sm:rounded-3xl p-0.5 sm:p-1 bg-gradient-to-b from-sage-200/50 via-gold/30 to-champagne-100/40 shadow-luxury transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxury-hover border border-gold/25"
          >
            <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-4px)] bg-ivory/90 backdrop-blur-xl p-2.5 xs:p-4 sm:p-6 border border-white/80 text-center">
              <div className={`${isPersian ? 'font-katibeh text-2xl xs:text-3xl sm:text-5xl font-bold' : 'font-serif text-xl xs:text-3xl sm:text-5xl font-normal'} text-mahogany tracking-tight transition-transform duration-300 group-hover:scale-105 text-gold-shimmer`}>
                {formatNumber(unit.value < 10 ? `0${unit.value}` : unit.value)}
              </div>
              <div className="mt-1 sm:mt-2 text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.15em] text-warm-stone font-serif">
                {unit.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add to Calendar Dropdown */}
      <div ref={dropdownRef} className="relative inline-block text-left">
        <button
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-forest via-sage-500 to-forest text-ivory font-serif text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-gold-glow hover:scale-105 active:scale-95 border border-gold/30"
        >
          <span>{t('add_to_calendar')}</span>
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center text-xs transition-transform duration-300 group-hover:rotate-45">
            📅
          </span>
        </button>

        {calendarOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 max-w-[90vw] rounded-2xl bg-ivory/95 backdrop-blur-2xl border border-rose-gold/30 shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                window.open(generateGoogleCalendarUrl(eventConfig), '_blank');
                setCalendarOpen(false);
              }}
              className="w-full text-left rtl:text-right px-4 py-2.5 rounded-xl text-xs font-serif text-mahogany hover:bg-champagne hover:text-rose-deep transition-colors flex items-center justify-between"
            >
              <span>{t('google_cal')}</span>
              <span className="text-gold">✦</span>
            </button>
            <button
              onClick={() => {
                downloadIcsFile(eventConfig);
                setCalendarOpen(false);
              }}
              className="w-full text-left rtl:text-right px-4 py-2.5 rounded-xl text-xs font-serif text-mahogany hover:bg-champagne hover:text-rose-deep transition-colors flex items-center justify-between"
            >
              <span>{t('apple_cal')}</span>
              <span className="text-gold">✦</span>
            </button>
            <button
              onClick={() => {
                window.open(generateOutlookCalendarUrl(eventConfig), '_blank');
                setCalendarOpen(false);
              }}
              className="w-full text-left rtl:text-right px-4 py-2.5 rounded-xl text-xs font-serif text-mahogany hover:bg-champagne hover:text-rose-deep transition-colors flex items-center justify-between"
            >
              <span>{t('outlook_cal')}</span>
              <span className="text-gold">✦</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

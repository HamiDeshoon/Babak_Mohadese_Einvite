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
      className="relative py-20 px-6 max-w-5xl mx-auto text-center z-10"
    >
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-gold/60" />
        <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
          ✦ {t('countdown_title')} ✦
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-gold/60" />
      </div>

      <p className="text-warm-gray text-sm md:text-base font-light mb-10 max-w-lg mx-auto">
        {t('countdown_subtitle')}
      </p>

      {/* Luxury double-bezel countdown cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mb-10">
        {timerUnits.map((unit) => (
          <div
            key={unit.label}
            className="group relative rounded-3xl p-1 bg-gradient-to-b from-champagne-200/50 via-rose-blush/20 to-champagne-100/40 shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-hover"
          >
            <div className="rounded-[calc(1.5rem-4px)] bg-ivory/80 backdrop-blur-xl p-5 sm:p-6 border border-white/60 text-center">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-mahogany tracking-tight transition-transform duration-300 group-hover:scale-105">
                {formatNumber(unit.value < 10 ? `0${unit.value}` : unit.value)}
              </div>
              <div className="mt-2 text-xs sm:text-sm uppercase tracking-[0.15em] text-warm-stone font-serif">
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
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-mahogany to-mahogany-light text-ivory font-serif text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-gold-glow hover:scale-105 active:scale-95"
        >
          <span>{t('add_to_calendar')}</span>
          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
            📅
          </span>
        </button>

        {calendarOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl bg-ivory/95 backdrop-blur-2xl border border-rose-gold/30 shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
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

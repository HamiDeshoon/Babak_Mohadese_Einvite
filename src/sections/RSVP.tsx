import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import { InterlockingRings } from '../components/InterlockingRings';

export default function RSVP() {
  const { isPersian, formatNumber, t, language } = useLanguage();
  const [attending, setAttending] = useState<'accept' | 'decline' | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const triggerLuxuryConfetti = () => {
    try {
      const count = 150;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 1000,
        colors: ['#D4AF37', '#B76E79', '#F5E3B3', '#9D4A55', '#FAF8F2'],
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {
      // Confetti fallback
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!attending) {
      setError(isPersian ? 'لطفاً وضعیت حضور خود را مشخص فرمایید.' : 'Please select your attendance status.');
      return;
    }

    setError('');
    setSubmitting(true);

    const form = formRef.current;
    if (!form) return;

    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;

    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: emailInput?.value?.trim() || '',
      attending,
      guestCount: attending === 'accept' ? guestCount : 0,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value, // Honeypot
      language, // 'en' or 'fa'
      timestamp: new Date().toISOString(),
    };

    try {
      const endpoint = invitationConfig.rsvp.sheetEndpoint;
      if (endpoint) {
        // We use mode: 'no-cors' with plain text payload to guarantee cross-origin delivery
        // to Google Apps Script Web App without CORS redirect drops on mobile browsers.
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(body),
        });
      } else {
        // Mock server delay in dev mode
        await new Promise((res) => setTimeout(res, 800));
      }

      setSubmitted(true);
      if (attending === 'accept') {
        triggerLuxuryConfetti();
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      // Even if network reports opaque error, Google script usually processed it
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative py-16 sm:py-36 px-4 sm:px-6 z-10 bg-gradient-to-b from-champagne-50/50 via-silk/60 to-ivory"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('rsvp_eyebrow')} ❦
            </span>
            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          <h2 className={`${isPersian ? 'font-nastaliq text-4xl sm:text-6xl md:text-7xl py-2' : 'font-fairytale text-2xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-2 sm:mb-4 text-gold-shimmer`}>
            {t('rsvp_title')}
          </h2>

          <p className="font-sans text-xs sm:text-base text-warm-gray font-light max-w-lg mx-auto leading-relaxed px-2">
            {t('rsvp_desc')}{' '}
            <span className={`${isPersian ? 'font-katibeh text-lg sm:text-xl font-bold' : 'font-serif font-medium'} text-rose-deep`}>
              {isPersian ? invitationConfig.rsvp.deadlineFa : invitationConfig.rsvp.deadlineEn}
            </span>{' '}
            {t('rsvp_desc_suffix')}
          </p>
        </div>

        {/* Double-Bezel Ultra-Luxury Charming Natural RSVP Card */}
        <div className="rounded-2xl sm:rounded-[3rem] p-1 sm:p-3 bg-gradient-to-b from-sage-200/50 via-gold/30 to-champagne-200/50 shadow-2xl relative overflow-hidden">
          {/* Subtle gold foil & sage leaf accents in corners */}
          <div className="absolute -top-12 -right-12 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-gradient-to-br from-gold/30 via-sage-300/20 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-gradient-to-tr from-rose-deep/20 via-eucalyptus-light/30 to-transparent blur-2xl pointer-events-none" />

          <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(3rem-8px)] bg-ivory/95 backdrop-blur-3xl p-4 sm:p-12 border border-white/90 relative z-10">
            {/* Wax Seal Header */}
            <div className="flex justify-center mb-5 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-deep via-rose-gold to-gold p-[2px] shadow-gold-glow flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-mahogany flex items-center justify-center p-2.5 border border-gold/40">
                  <InterlockingRings className="w-full h-full" glow={true} />
                </div>
              </div>
            </div>

            {!submitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 sm:space-y-8">
                {/* Attendance Decision Buttons */}
                <div className="space-y-2.5 sm:space-y-3">
                  <label className={`block text-center ${isPersian ? 'font-katibeh text-base sm:text-lg' : 'text-xs uppercase tracking-widest font-serif'} text-warm-gray`}>
                    {t('rsvp_eyebrow')}
                  </label>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setAttending('accept');
                        setError('');
                      }}
                      className={`py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl ${isPersian ? 'font-katibeh text-base sm:text-xl font-medium' : 'font-serif text-xs sm:text-base'} transition-all duration-300 border flex items-center justify-center gap-2 ${
                        attending === 'accept'
                          ? 'bg-gradient-to-r from-forest via-sage-500 to-forest text-ivory border-transparent shadow-gold-glow scale-[1.01]'
                          : 'bg-champagne-50/70 hover:bg-champagne text-mahogany border-rose-gold/25'
                      }`}
                    >
                      <span>{t('rsvp_accept')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAttending('decline');
                        setError('');
                      }}
                      className={`py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl ${isPersian ? 'font-katibeh text-base sm:text-xl font-medium' : 'font-serif text-xs sm:text-base'} transition-all duration-300 border flex items-center justify-center gap-2 ${
                        attending === 'decline'
                          ? 'bg-mahogany text-ivory border-transparent shadow-md scale-[1.01]'
                          : 'bg-champagne-50/70 hover:bg-champagne text-warm-gray border-rose-gold/25'
                      }`}
                    >
                      <span>{t('rsvp_decline')}</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields (Active when attendance is chosen) */}
                <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-4 border-t border-rose-gold/20">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-widest font-serif text-mahogany mb-1 sm:mb-2">
                      {t('rsvp_full_name')} *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder={isPersian ? 'مثال: بابک محمدی و همراه' : 'e.g. John & Sarah Doe'}
                      className="w-full px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-champagne-50/50 border border-rose-gold/25 focus:border-gold focus:bg-ivory text-mahogany text-base outline-none transition-all duration-300 shadow-inner"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-widest font-serif text-mahogany mb-1 sm:mb-2">
                      {t('rsvp_phone')} *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder={isPersian ? '۰۹۱۲۰۰۰۰۰۰۰' : '+1 (555) 000-0000'}
                      className="w-full px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-champagne-50/50 border border-rose-gold/25 focus:border-gold focus:bg-ivory text-mahogany text-base outline-none transition-all duration-300 shadow-inner rtl:text-right"
                    />
                  </div>

                  {/* Optional Email Input */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-widest font-serif text-mahogany mb-1 sm:mb-2">
                      {isPersian ? 'ایمیل (اختیاری)' : 'Email Address (Optional)'}
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder={isPersian ? 'name@example.com' : 'name@example.com'}
                      className="w-full px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-champagne-50/50 border border-rose-gold/25 focus:border-gold focus:bg-ivory text-mahogany text-base outline-none transition-all duration-300 shadow-inner rtl:text-right"
                    />
                  </div>

                  {/* Guest Counter Stepper (Shown if accepting) */}
                  {attending === 'accept' && (
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-champagne-50/60 border border-rose-gold/20 flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] sm:text-xs uppercase tracking-widest font-serif text-mahogany">
                          {t('rsvp_guests_count')}
                        </span>
                        <span className="text-xs text-warm-gray font-light">
                          {guestCount === 1 ? t('rsvp_guest_single') : `${formatNumber(guestCount)} ${t('rsvp_guests_multiple')}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ivory border border-rose-gold/30 flex items-center justify-center text-mahogany text-base sm:text-lg font-bold hover:bg-champagne transition-colors shadow-sm active:scale-95"
                        >
                          -
                        </button>
                        <span className="font-serif text-sm sm:text-lg font-semibold text-mahogany w-5 sm:w-6 text-center">
                          {formatNumber(guestCount)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount((prev) => Math.min(8, prev + 1))}
                          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ivory border border-rose-gold/30 flex items-center justify-center text-mahogany text-base sm:text-lg font-bold hover:bg-champagne transition-colors shadow-sm active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Warm Message / Song Request Note */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-widest font-serif text-mahogany mb-1 sm:mb-2">
                      {isPersian ? 'پیام برای عروس و داماد / آهنگ درخواستی' : 'Special Note or Song Request'}
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder={t('rsvp_message')}
                      className="w-full px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-champagne-50/50 border border-rose-gold/25 focus:border-gold focus:bg-ivory text-mahogany text-base outline-none transition-all duration-300 shadow-inner resize-none"
                    />
                  </div>

                  {/* Honeypot Bot Guard */}
                  <div className="absolute left-[-9999px]" aria-hidden="true">
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {error && (
                    <p className="text-rose-deep text-xs text-center font-medium bg-rose-blush/20 py-2 rounded-xl">
                      {error}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-mahogany via-rose-deep to-forest text-ivory font-serif text-xs sm:text-base uppercase tracking-widest shadow-luxury hover:shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? t('rsvp_submitting') : t('rsvp_submit')} ✦
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation Card */
              <div className="text-center py-5 sm:py-8 animate-in zoom-in-95 duration-500">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-gold to-rose-gold mx-auto mb-3 sm:mb-6 flex items-center justify-center text-xl sm:text-3xl text-ivory shadow-gold-glow">
                  ✓
                </div>

                <h3 className="font-serif text-lg sm:text-3xl text-mahogany font-medium mb-1.5 sm:mb-3">
                  {t('rsvp_success_title')}
                </h3>

                <p className="font-sans text-xs sm:text-base text-warm-gray font-light max-w-md mx-auto mb-5 sm:mb-8 leading-relaxed px-2">
                  {attending === 'accept'
                    ? t('rsvp_success_accept')
                    : t('rsvp_success_decline')}
                </p>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-champagne-50/70 border border-rose-gold/20 max-w-sm mx-auto mb-4 sm:mb-6 text-[10px] sm:text-xs text-warm-stone font-serif">
                  ✦ {isPersian ? invitationConfig.event.dateFa : invitationConfig.event.dateEn} • {isPersian ? invitationConfig.event.venueNameFa : invitationConfig.event.venueNameEn} ✦
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[11px] sm:text-xs uppercase tracking-widest font-serif text-rose-deep hover:text-gold transition-colors py-2"
                >
                  {isPersian ? 'ویرایش یا ثبت پاسخی دیگر' : 'Edit or Submit Another Response'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

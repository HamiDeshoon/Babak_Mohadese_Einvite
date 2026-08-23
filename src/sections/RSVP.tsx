import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

export default function RSVP() {
  const { isPersian, formatNumber, t } = useLanguage();
  const [attending, setAttending] = useState<'accept' | 'decline' | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [dietary, setDietary] = useState<string>('standard');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const triggerLuxuryConfetti = () => {
    try {
      const count = 200;
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

    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      attending,
      guestCount: attending === 'accept' ? guestCount : 0,
      dietary: attending === 'accept' ? dietary : '',
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value, // Honeypot
      timestamp: new Date().toISOString(),
    };

    try {
      const endpoint = invitationConfig.rsvp.sheetEndpoint;
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
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
    } catch {
      // Graceful offline fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative py-28 sm:py-36 px-6 z-10 bg-gradient-to-b from-champagne-50/50 via-silk/60 to-ivory"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-rose-gold/60" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              {t('rsvp_eyebrow')}
            </span>
            <span className="h-px w-6 bg-rose-gold/60" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-mahogany mb-4">
            {t('rsvp_title')}
          </h2>

          <p className="font-sans text-sm sm:text-base text-warm-gray font-light max-w-lg mx-auto">
            {t('rsvp_desc')}{' '}
            <span className="font-serif font-medium text-rose-deep">
              {isPersian ? invitationConfig.rsvp.deadlineFa : invitationConfig.rsvp.deadlineEn}
            </span>{' '}
            {t('rsvp_desc_suffix')}
          </p>
        </div>

        {/* Double-Bezel Ultra-Luxury RSVP Card */}
        <div className="rounded-[3rem] p-2 sm:p-3 bg-gradient-to-b from-gold/40 via-rose-gold/30 to-champagne-200/50 shadow-2xl relative overflow-hidden">
          {/* Subtle gold foil accent in corner */}
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br from-gold/30 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-gradient-to-tr from-rose-deep/20 to-transparent blur-2xl pointer-events-none" />

          <div className="rounded-[calc(3rem-8px)] bg-ivory/95 backdrop-blur-3xl p-8 sm:p-12 border border-white/90 relative z-10">
            {/* Wax Seal Header */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-deep via-rose-gold to-gold p-[2px] shadow-gold-glow flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-mahogany flex items-center justify-center text-gold font-serif text-lg font-bold border border-gold/40">
                  {isPersian ? 'ب&م' : 'B&M'}
                </div>
              </div>
            </div>

            {!submitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Attendance Decision Buttons */}
                <div className="space-y-3">
                  <label className="block text-center text-xs uppercase tracking-widest font-serif text-warm-gray">
                    {t('rsvp_eyebrow')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setAttending('accept');
                        setError('');
                      }}
                      className={`py-4 px-6 rounded-2xl font-serif text-sm sm:text-base transition-all duration-300 border flex items-center justify-center gap-2 ${
                        attending === 'accept'
                          ? 'bg-gradient-to-r from-rose-deep via-rose-gold to-gold text-ivory border-transparent shadow-gold-glow scale-[1.02]'
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
                      className={`py-4 px-6 rounded-2xl font-serif text-sm sm:text-base transition-all duration-300 border flex items-center justify-center gap-2 ${
                        attending === 'decline'
                          ? 'bg-mahogany text-ivory border-transparent shadow-md scale-[1.02]'
                          : 'bg-champagne-50/70 hover:bg-champagne text-warm-gray border-rose-gold/25'
                      }`}
                    >
                      <span>{t('rsvp_decline')}</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields (Active when attendance is chosen) */}
                <div className="space-y-6 pt-4 border-t border-rose-gold/20">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-serif text-mahogany mb-2">
                      {t('rsvp_full_name')} *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder={isPersian ? 'مثال: بابک محمدی و همراه' : 'e.g. John & Sarah Doe'}
                      className="w-full px-5 py-3.5 rounded-2xl bg-champagne-50/50 border border-rose-gold/25 focus:border-gold focus:bg-ivory text-mahogany text-sm outline-none transition-all duration-300 shadow-inner"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-serif text-mahogany mb-2">
                      {t('rsvp_phone')} *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder={isPersian ? '۰۹۱۲۰۰۰۰۰۰۰' : '+1 (555) 000-0000'}
                      className="w-full px-5 py-3.5 rounded-2xl bg-champagne-50/50 border border-rose-gold/25 focus:border-gold focus:bg-ivory text-mahogany text-sm outline-none transition-all duration-300 shadow-inner rtl:text-right"
                    />
                  </div>

                  {/* Guest Counter Stepper (Shown if accepting) */}
                  {attending === 'accept' && (
                    <div className="p-4 rounded-2xl bg-champagne-50/60 border border-rose-gold/20 flex items-center justify-between">
                      <div>
                        <span className="block text-xs uppercase tracking-widest font-serif text-mahogany">
                          {t('rsvp_guests_count')}
                        </span>
                        <span className="text-xs text-warm-gray font-light">
                          {guestCount === 1 ? t('rsvp_guest_single') : `${formatNumber(guestCount)} ${t('rsvp_guests_multiple')}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                          className="w-9 h-9 rounded-full bg-ivory border border-rose-gold/30 flex items-center justify-center text-mahogany font-bold hover:bg-champagne transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-serif text-lg font-semibold text-mahogany w-6 text-center">
                          {formatNumber(guestCount)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount((prev) => Math.min(8, prev + 1))}
                          className="w-9 h-9 rounded-full bg-ivory border border-rose-gold/30 flex items-center justify-center text-mahogany font-bold hover:bg-champagne transition-colors shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Menu Preference (Shown if accepting) */}
                  {attending === 'accept' && (
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-serif text-mahogany mb-2">
                        {t('rsvp_dietary')}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {invitationConfig.rsvp.dietaryOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setDietary(opt.id)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-serif transition-all duration-200 border ${
                              dietary === opt.id
                                ? 'bg-rose-gold text-ivory border-rose-gold shadow-sm'
                                : 'bg-champagne-50/50 hover:bg-champagne text-warm-gray border-rose-gold/20'
                            }`}
                          >
                            {isPersian ? opt.labelFa : opt.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warm Message / Song Request Note */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-serif text-mahogany mb-2">
                      {isPersian ? 'پیام برای عروس و داماد / آهنگ درخواستی' : 'Special Note or Song Request'}
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder={t('rsvp_message')}
                      className="w-full px-5 py-3.5 rounded-2xl bg-champagne-50/50 border border-rose-gold/25 focus:border-gold focus:bg-ivory text-mahogany text-sm outline-none transition-all duration-300 shadow-inner resize-none"
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
                    className="w-full py-4 rounded-full bg-gradient-to-r from-mahogany via-rose-deep to-mahogany text-ivory font-serif text-sm sm:text-base uppercase tracking-widest shadow-luxury hover:shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? t('rsvp_submitting') : t('rsvp_submit')} ✦
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation Card */
              <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold to-rose-gold mx-auto mb-6 flex items-center justify-center text-3xl text-ivory shadow-gold-glow">
                  ✓
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-mahogany font-medium mb-3">
                  {t('rsvp_success_title')}
                </h3>

                <p className="font-sans text-sm sm:text-base text-warm-gray font-light max-w-md mx-auto mb-8 leading-relaxed">
                  {attending === 'accept'
                    ? t('rsvp_success_accept')
                    : t('rsvp_success_decline')}
                </p>

                <div className="p-4 rounded-2xl bg-champagne-50/70 border border-rose-gold/20 max-w-sm mx-auto mb-6 text-xs text-warm-stone font-serif">
                  ✦ {isPersian ? invitationConfig.event.dateFa : invitationConfig.event.dateEn} • {isPersian ? invitationConfig.event.venueNameFa : invitationConfig.event.venueNameEn} ✦
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-widest font-serif text-rose-deep hover:text-gold transition-colors"
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

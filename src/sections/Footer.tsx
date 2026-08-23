import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

export default function Footer() {
  const { isPersian, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-20 px-6 z-10 bg-ivory border-t border-rose-gold/20 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="w-14 h-14 rounded-full p-[1.5px] bg-gradient-to-tr from-rose-gold to-gold mb-6 shadow-sm flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-ivory flex items-center justify-center font-serif text-sm font-bold text-mahogany">
            {isPersian ? invitationConfig.couple.monogramFa : invitationConfig.couple.monogramEn}
          </div>
        </div>

        <h3 className={`${isPersian ? 'font-nastaliq text-4xl sm:text-5xl py-2' : 'font-serif text-2xl sm:text-3xl'} text-mahogany font-medium mb-2`}>
          {isPersian
            ? `${invitationConfig.couple.brideFa} و ${invitationConfig.couple.groomFa}`
            : `${invitationConfig.couple.groomEn} & ${invitationConfig.couple.brideEn}`}
        </h3>

        <p className={`${isPersian ? 'font-katibeh text-base' : 'font-serif text-xs uppercase tracking-[0.2em]'} text-rose-deep mb-4`}>
          ✦ {isPersian ? invitationConfig.event.dateFa : invitationConfig.event.dateEn} ✦
        </p>

        <p className={`${isPersian ? 'font-nastaliq text-base sm:text-lg leading-loose' : 'font-serif italic text-sm font-light leading-relaxed'} text-warm-gray max-w-md mb-10`}>
          {t('footer_gratitude')}
        </p>

        {/* Contact Hotline Cards */}
        <div className="w-full max-w-md py-6 px-8 rounded-3xl bg-champagne-50/60 border border-rose-gold/20 mb-10">
          <p className="text-xs uppercase tracking-widest font-serif text-mahogany mb-4">
            {t('footer_help')}
          </p>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="block text-xs font-serif text-rose-deep font-semibold">
                {t('groom_side')}
              </span>
              <a
                href={`tel:${invitationConfig.contacts.groom.phone}`}
                className="text-xs font-sans text-warm-gray hover:text-mahogany transition-colors"
              >
                {isPersian
                  ? invitationConfig.contacts.groom.displayPhone
                  : invitationConfig.contacts.groom.phone}
              </a>
            </div>

            <div>
              <span className="block text-xs font-serif text-rose-deep font-semibold">
                {t('bride_side')}
              </span>
              <a
                href={`tel:${invitationConfig.contacts.bride.phone}`}
                className="text-xs font-sans text-warm-gray hover:text-mahogany transition-colors"
              >
                {isPersian
                  ? invitationConfig.contacts.bride.displayPhone
                  : invitationConfig.contacts.bride.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-warm-stone hover:text-mahogany transition-colors"
        >
          <span>{t('footer_top')}</span>
          <span className="w-6 h-6 rounded-full border border-rose-gold/30 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}

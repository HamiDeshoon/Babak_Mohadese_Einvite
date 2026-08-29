import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

export default function Footer() {
  const { isPersian, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-14 sm:py-20 px-4 sm:px-6 z-10 bg-ivory border-t border-rose-gold/20 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[1.5px] bg-gradient-to-tr from-rose-gold to-gold mb-4 sm:mb-6 shadow-sm flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-ivory flex items-center justify-center font-serif text-xs sm:text-sm font-bold text-mahogany">
            {isPersian ? invitationConfig.couple.monogramFa : invitationConfig.couple.monogramEn}
          </div>
        </div>

        <h3 className={`${isPersian ? 'font-nastaliq text-3xl sm:text-5xl py-1 sm:py-2' : 'font-serif text-xl sm:text-3xl'} text-mahogany font-medium mb-1.5 sm:mb-2`}>
          {isPersian
            ? `${invitationConfig.couple.brideFa} و ${invitationConfig.couple.groomFa}`
            : `${invitationConfig.couple.groomEn} & ${invitationConfig.couple.brideEn}`}
        </h3>

        <p className={`${isPersian ? 'font-katibeh text-sm sm:text-base' : 'font-serif text-[11px] sm:text-xs uppercase tracking-[0.2em]'} text-rose-deep mb-3 sm:mb-4`}>
          ✦ {isPersian ? invitationConfig.event.dateFa : invitationConfig.event.dateEn} ✦
        </p>

        <p className={`${isPersian ? 'font-nastaliq text-sm sm:text-lg leading-loose' : 'font-serif italic text-xs sm:text-sm font-light leading-relaxed'} text-warm-gray max-w-md mb-8 sm:mb-10 px-2`}>
          {t('footer_gratitude')}
        </p>

        {/* Contact Hotline Cards */}
        <div className="w-full max-w-md py-5 sm:py-6 px-4 sm:px-8 rounded-2xl sm:rounded-3xl bg-champagne-50/60 border border-rose-gold/20 mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest font-serif text-mahogany mb-3 sm:mb-4">
            {t('footer_help')}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
            <div className="p-2 sm:p-3 rounded-xl bg-ivory/80 border border-rose-gold/15">
              <span className="block text-[11px] sm:text-xs font-serif text-rose-deep font-semibold mb-1">
                {t('groom_side')}
              </span>
              <a
                href={`tel:${invitationConfig.contacts.groom.phone}`}
                className="inline-block text-xs sm:text-sm font-sans font-medium text-warm-gray hover:text-mahogany transition-colors py-1 px-2"
              >
                {isPersian
                  ? invitationConfig.contacts.groom.displayPhone
                  : invitationConfig.contacts.groom.phone}
              </a>
            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-ivory/80 border border-rose-gold/15">
              <span className="block text-[11px] sm:text-xs font-serif text-rose-deep font-semibold mb-1">
                {t('bride_side')}
              </span>
              <a
                href={`tel:${invitationConfig.contacts.bride.phone}`}
                className="inline-block text-xs sm:text-sm font-sans font-medium text-warm-gray hover:text-mahogany transition-colors py-1 px-2"
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
          className="group inline-flex items-center gap-2 text-[11px] sm:text-xs font-serif uppercase tracking-widest text-warm-stone hover:text-mahogany transition-colors py-2 px-4"
        >
          <span>{t('footer_top')}</span>
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-rose-gold/30 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 text-xs">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}

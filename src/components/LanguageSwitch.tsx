import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center p-1 rounded-full bg-champagne-100/80 border border-rose-gold/25 shadow-inner backdrop-blur-md">
      <button
        onClick={() => setLanguage('en')}
        className={`relative z-10 px-3 py-1 rounded-full text-xs font-serif tracking-wider transition-all duration-300 ${
          language === 'en'
            ? 'text-ivory font-medium shadow-sm'
            : 'text-warm-gray hover:text-mahogany'
        }`}
      >
        EN
      </button>

      <button
        onClick={() => setLanguage('fa')}
        className={`relative z-10 px-3 py-1 rounded-full text-xs font-persianSans font-medium transition-all duration-300 ${
          language === 'fa'
            ? 'text-ivory font-semibold shadow-sm'
            : 'text-warm-gray hover:text-mahogany'
        }`}
      >
        فارسی
      </button>

      {/* Sliding luxury gold indicator */}
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-rose-gold to-gold shadow-gold-glow transition-transform duration-300 ease-out ${
          language === 'fa' ? 'translate-x-[calc(100%+4px)] rtl:-translate-x-[calc(100%+4px)]' : 'translate-x-0'
        }`}
      />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

const STORAGE_KEY = 'wedding_guest_wishes_v1';

export default function WishesWall() {
  const { isPersian, t, formatNumber } = useLanguage();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [, setNow] = useState(Date.now());

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch {
      // Ignore parse error
    }

    // Refresh relative timer every 30 seconds
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: author.trim(),
      message: message.trim(),
      createdAt: Date.now(),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota error
    }

    setAuthor('');
    setMessage('');
  };

  const getRelativeTime = (timestamp: number) => {
    const diff = Math.max(0, Date.now() - timestamp);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (isPersian) {
      if (seconds < 45) return 'همین حالا';
      if (minutes < 60) return `${formatNumber(minutes)} دقیقه پیش`;
      if (hours < 24) return `${formatNumber(hours)} ساعت پیش`;
      if (days < 30) return `${formatNumber(days)} روز پیش`;
      return `${formatNumber(Math.floor(days / 30))} ماه پیش`;
    } else {
      if (seconds < 45) return 'Just now';
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 30) return `${days}d ago`;
      return `${Math.floor(days / 30)}mo ago`;
    }
  };

  return (
    <section id="wishes" className="relative py-16 sm:py-32 px-4 sm:px-6 z-10 bg-ivory">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-sage-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-rose-deep">
              ❦ {t('wishes_eyebrow')} ❦
            </span>
            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-sage-400" />
          </div>

          {/* Nastaliq Title with Safe Vertical Padding */}
          <h2 className={`${isPersian ? 'font-nastaliq text-4xl sm:text-6xl md:text-7xl py-3 my-2' : 'font-fairytale text-2xl sm:text-4xl md:text-5xl'} font-normal text-mahogany mb-3 sm:mb-4 text-gold-shimmer`}>
            {t('wishes_title')}
          </h2>

          <p className={`${isPersian ? 'font-persian text-sm sm:text-base leading-loose' : 'font-sans text-xs sm:text-base'} text-warm-gray font-light max-w-lg mx-auto px-2`}>
            {t('wishes_subtitle')}
          </p>
        </div>

        {/* Input Box */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-14 rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-sage-200/50 via-gold/30 to-champagne-100/40 shadow-luxury border border-gold/25">
          <form
            onSubmit={handlePostWish}
            className="p-4 sm:p-8 rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-4px)] bg-ivory/95 border border-white/80 space-y-3 sm:space-y-4"
          >
            <div>
              <input
                type="text"
                required
                placeholder={t('wishes_author')}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-champagne-50/50 border border-sage-300 text-base text-mahogany outline-none focus:border-gold transition-all"
              />
            </div>

            <div>
              <textarea
                rows={3}
                required
                placeholder={t('wishes_placeholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-champagne-50/50 border border-sage-300 text-base text-mahogany outline-none focus:border-gold transition-all resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full xs:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-forest via-sage-500 to-forest hover:shadow-gold-glow text-ivory font-serif text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 border border-gold/30"
              >
                {t('wishes_post')}
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Display / Feed */}
        {wishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-champagne-200/30 via-white/60 to-champagne-100/30 border border-rose-gold/20 shadow-luxury transition-all duration-300 hover:-translate-y-1"
              >
                <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-4px)] p-4 sm:p-6 bg-ivory/90 h-full flex flex-col justify-between">
                  <p className={`${isPersian ? 'font-persian text-sm sm:text-base leading-loose' : 'font-serif italic text-xs sm:text-sm leading-relaxed'} text-warm-gray mb-4`}>
                    “{item.message}”
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-rose-gold/15">
                    <span className={`${isPersian ? 'font-nastaliq text-base sm:text-xl pt-1' : 'font-serif text-xs font-semibold'} text-mahogany font-medium`}>
                      {item.name}
                    </span>
                    <span className="text-[11px] text-warm-stone font-serif flex items-center gap-1 bg-champagne-100/60 px-2.5 py-0.5 rounded-full border border-gold/20">
                      <span>⏱️</span>
                      <span>{getRelativeTime(item.createdAt)}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-ivory/80 border border-gold/20 text-center shadow-sm">
            <span className="text-3xl sm:text-4xl block mb-2">💌</span>
            <p className={`${isPersian ? 'font-persian text-base' : 'font-serif text-sm'} text-warm-gray`}>
              {isPersian
                ? 'اولین نفری باشید که برای بابک و محدثه تبریک و آرزوی زیبا می‌نویسد ✨'
                : 'Be the first to leave a warm blessing for Babak & Mohadese! ✨'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

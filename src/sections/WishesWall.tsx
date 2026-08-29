import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

const INITIAL_WISHES_EN: Wish[] = [
  {
    id: '1',
    name: 'Saeed & Maryam',
    message: 'Wishing you both a lifetime of unending love, joy, and boundless adventures together!',
    date: 'Just now',
  },
  {
    id: '2',
    name: 'Dr. Rezaei & Family',
    message: 'May your beautiful home be filled with laughter and eternal warmth. Congratulations to Babak and Mohadese!',
    date: '1 hour ago',
  },
  {
    id: '3',
    name: 'Sara K.',
    message: 'So incredibly happy for both of you! Counting down the days until the big celebration! 💍✨',
    date: '2 hours ago',
  },
];

const INITIAL_WISHES_FA: Wish[] = [
  {
    id: '1',
    name: 'سعید و مریم',
    message: 'پیوندتان مبارک و پر از برکت! آرزوی عمری سرشار از عشق، سلامتی و شادمانی در کنار هم برای شما عزیزان داریم.',
    date: 'همین حالا',
  },
  {
    id: '2',
    name: 'خانواده دکتر رضایی',
    message: 'با صمیمانه‌ترین تبریک‌ها به بابک عزیز و محدثه گرامی. امیدواریم آشیانه‌تان همیشه پر از نور و لبخند باشد.',
    date: '۱ ساعت پیش',
  },
  {
    id: '3',
    name: 'سارا کریمی',
    message: 'بسیار خوشحالم از شنیدن این خبر شیرین! مشتاقانه منتظر فرارسیدن شب زیبای جشن‌تان هستیم. 💍✨',
    date: '۲ ساعت پیش',
  },
];

export default function WishesWall() {
  const { isPersian, t } = useLanguage();
  const [wishes, setWishes] = useState<Wish[]>(isPersian ? INITIAL_WISHES_FA : INITIAL_WISHES_EN);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: author.trim(),
      message: message.trim(),
      date: isPersian ? 'هم‌اکنون' : 'Just now',
    };

    setWishes([newWish, ...wishes]);
    setAuthor('');
    setMessage('');
  };

  return (
    <section id="wishes" className="relative py-16 sm:py-32 px-4 sm:px-6 z-10 bg-ivory">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
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

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-champagne-200/30 via-white/60 to-champagne-100/30 border border-rose-gold/20 shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-4px)] p-4 sm:p-6 bg-ivory/90 h-full flex flex-col justify-between">
                <p className={`${isPersian ? 'font-persian text-xs sm:text-sm leading-loose' : 'font-serif italic text-xs sm:text-sm leading-relaxed'} text-warm-gray mb-3 sm:mb-4`}>
                  “{item.message}”
                </p>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-rose-gold/15">
                  <span className={`${isPersian ? 'font-nastaliq text-base sm:text-lg pt-1' : 'font-serif text-xs font-semibold'} text-mahogany`}>
                    {item.name}
                  </span>
                  <span className="text-[10px] text-warm-stone font-light font-serif">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

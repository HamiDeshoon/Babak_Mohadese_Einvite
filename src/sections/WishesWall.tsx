import { useState, useEffect, useCallback } from 'react';
import { RotateCw, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

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
  const [isPosting, setIsPosting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [, setNow] = useState(Date.now());

  // 1. Initial load from localStorage cache so UI renders instantly
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWishes(parsed);
        }
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

  // 2. Fetch live wishes from backend Google Sheets Web App
  const fetchLiveWishes = useCallback(async (isManualRefresh = false) => {
    const endpoint = invitationConfig.rsvp.sheetEndpoint;
    if (!endpoint) return;

    if (isManualRefresh) setIsSyncing(true);

    try {
      const res = await fetch(`${endpoint}?action=get_wishes`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.status === 'success' && Array.isArray(data.wishes)) {
          setWishes((prevLocal) => {
            // Merge server wishes with recent local submissions (last 5 minutes)
            const serverMap = new Map<string, Wish>();
            data.wishes.forEach((w: Wish) => serverMap.set(w.id, w));

            const cutoff = Date.now() - 5 * 60 * 1000;
            const recentLocal = prevLocal.filter(
              (w) => w.createdAt > cutoff && !serverMap.has(w.id)
            );

            const merged = [...recentLocal, ...data.wishes];
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch {
              // Ignore storage error
            }
            return merged;
          });
        }
      }
    } catch (err) {
      console.warn('Could not sync wishes from server, using cached wishes:', err);
    } finally {
      if (isManualRefresh) {
        setTimeout(() => setIsSyncing(false), 500);
      }
    }
  }, []);

  // Fetch from server on component mount
  useEffect(() => {
    fetchLiveWishes(false);
  }, [fetchLiveWishes]);

  // 3. Post a new wish to Google Sheets
  const handlePostWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim() || isPosting) return;

    const newWish: Wish = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: author.trim(),
      message: message.trim(),
      createdAt: Date.now(),
    };

    // Optimistically update UI immediately
    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota error
    }

    setAuthor('');
    setMessage('');
    setIsPosting(true);
    setShowSuccess(true);

    // Send payload to Google Apps Script endpoint
    try {
      const endpoint = invitationConfig.rsvp.sheetEndpoint;
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'add_wish',
            id: newWish.id,
            name: newWish.name,
            message: newWish.message,
            createdAt: newWish.createdAt,
            website: '', // Honeypot
          }),
        });
      }
    } catch (err) {
      console.error('Error posting wish to server:', err);
    } finally {
      setIsPosting(false);
      // Auto-hide success notification after 6 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 6000);
    }
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

            {/* Success Notification */}
            {showSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t('wishes_success')}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              {/* Refresh / Live Sync Button */}
              <button
                type="button"
                onClick={() => fetchLiveWishes(true)}
                disabled={isSyncing}
                title={t('wishes_refresh')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-warm-stone hover:text-mahogany hover:bg-champagne-100/50 border border-transparent hover:border-gold/20 transition-all"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-gold' : ''}`} />
                <span className="hidden xs:inline">
                  {isSyncing ? t('wishes_syncing') : t('wishes_refresh')}
                </span>
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPosting}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-forest via-sage-500 to-forest hover:shadow-gold-glow text-ivory font-serif text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 border border-gold/30 disabled:opacity-60 disabled:pointer-events-none"
              >
                <span>{isPosting ? '...' : t('wishes_post')}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Display / Feed Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-warm-stone font-serif">
            <span>💌</span>
            <span>
              {isPersian
                ? `${formatNumber(wishes.length)} یادداشت و تبریک ثبت‌شده`
                : `${wishes.length} Warm Wishes Shared`}
            </span>
          </div>

          <button
            type="button"
            onClick={() => fetchLiveWishes(true)}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 text-xs text-rose-deep hover:text-mahogany transition-colors"
          >
            <RotateCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? t('wishes_syncing') : t('wishes_refresh')}</span>
          </button>
        </div>

        {/* Wishes Grid */}
        {wishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-champagne-200/30 via-white/60 to-champagne-100/30 border border-rose-gold/20 shadow-luxury transition-all duration-300 hover:-translate-y-1"
              >
                <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-4px)] p-4 sm:p-6 bg-ivory/90 h-full flex flex-col justify-between">
                  <p className={`${isPersian ? 'font-persian text-sm sm:text-base leading-loose' : 'font-serif italic text-xs sm:text-sm leading-relaxed'} text-warm-gray mb-4 break-words`}>
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
              {t('wishes_empty')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

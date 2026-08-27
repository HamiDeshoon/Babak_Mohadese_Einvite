import { useEffect, useState } from 'react';

export default function GuestsCounter() {
  const [guestCount, setGuestCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Realistic initial attendees
    const count = 86;

    const timer = setTimeout(() => {
      setGuestCount(count);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold/20 to-rose-gold/20 border border-rose-gold/30 backdrop-blur-sm">
        <span className="h-2 w-2 bg-gold rounded-full animate-pulse" />
        <span className="text-xs font-fantasy text-gold tracking-wider">
          در حال آماده‌سازی...
        </span>
      </div>
    );
  }

  if (guestCount === null || isNaN(guestCount)) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold/20 to-rose-gold/20 border border-rose-gold/30 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]">
      <span className="text-gold shimmer-glow">✦</span>
      <div className="flex items-baseline">
        <span className="text-xs font-fantasy text-gold tracking-wider mr-1">
          {guestCount}
        </span>
        <span className="text-[10px] font-fantasy text-rose-gold tracking-wide">
          {guestCount === 1 ? 'همراه' : 'همراه'}
        </span>
      </div>
      <span className="text-gold shimmer-glow">✦</span>
    </div>
  );
}
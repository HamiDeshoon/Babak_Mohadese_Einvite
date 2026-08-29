import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface GiftRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftRegistryModal({ isOpen, onClose }: GiftRegistryModalProps) {
  const { isPersian } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const bankAccounts = [
    {
      key: 'groom',
      ownerEn: 'Babak Ebrahimi',
      ownerFa: 'بابک ابراهیمی',
      bankEn: 'Bank Mellat',
      bankFa: 'بانک ملت',
      cardNumber: '۶۱۰۴-۳۳۷۸-۰۰۰۰-۰۰۰۰',
      cardNumberRaw: '6104337800000000',
      shebaNumber: 'IR000120000000000000000000',
      icon: '💳',
    },
    {
      key: 'bride',
      ownerEn: 'Mohadese Estaji',
      ownerFa: 'محدثه استاجی',
      bankEn: 'Bank Pasargad',
      bankFa: 'بانک پاسارگاد',
      cardNumber: '۵۰۲۲-۲۹۱۰-۰۰۰۰-۰۰۰۰',
      cardNumberRaw: '5022291000000000',
      shebaNumber: 'IR000570000000000000000000',
      icon: '✨',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-mahogany/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl sm:rounded-[2.5rem] p-1 sm:p-2 bg-gradient-to-b from-gold/40 via-sage-300/40 to-champagne-200/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[calc(1.5rem-2px)] sm:rounded-[calc(2.5rem-8px)] bg-ivory/95 backdrop-blur-3xl p-4 sm:p-8 border border-white/90 max-h-[88dvh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-rose-gold/20 mb-4 sm:mb-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-gold to-rose-gold flex items-center justify-center text-ivory text-sm sm:text-base shadow-sm">
                🎁
              </span>
              <div>
                <h3 className={`${isPersian ? 'font-fantasy text-xl sm:text-2xl' : 'font-fairytale text-lg sm:text-xl'} text-mahogany font-normal`}>
                  {isPersian ? 'هدیه و یادبود عروس و داماد' : 'Wedding Gift & Registry'}
                </h3>
                <p className="text-[11px] sm:text-xs text-warm-gray font-light">
                  {isPersian ? 'بزرگترین هدیه حضور پرمهر شماست' : 'Your loving presence is the greatest gift'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-champagne-100/80 border border-rose-gold/20 flex items-center justify-center text-mahogany hover:bg-rose-gold hover:text-ivory transition-colors text-sm shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Warm Note */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-champagne-50/70 border border-rose-gold/20 mb-4 sm:mb-6 text-xs sm:text-sm text-warm-gray leading-relaxed font-light">
            {isPersian
              ? 'حضور گرم و پرانرژی شما در جشن پیوند ما، ارزشمندترین هدیه‌ای است که آرزویش را داریم. برای عزیزانی که جویای شماره حساب یا کارت جهت یادبود بودند، اطلاعات زیر در دسترس قرار گرفته است.'
              : 'Having you celebrate our special milestone with us is the greatest gift of all. For friends and family who have kindly inquired about gift preferences, our registry details are provided below with gratitude.'}
          </div>

          {/* Cards List */}
          <div className="space-y-3 sm:space-y-4">
            {bankAccounts.map((acc) => (
              <div
                key={acc.key}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/90 to-champagne-50/60 border border-rose-gold/25 shadow-sm space-y-2.5 sm:space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl">{acc.icon}</span>
                    <div>
                      <h4 className={`${isPersian ? 'font-katibeh text-lg sm:text-xl font-bold' : 'font-serif text-sm font-semibold'} text-mahogany`}>
                        {isPersian ? acc.ownerFa : acc.ownerEn}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] text-rose-deep font-medium">
                        {isPersian ? acc.bankFa : acc.bankEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Number Row */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-ivory/80 border border-rose-gold/15">
                  <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                    <span className="block text-[9px] sm:text-[10px] uppercase font-serif tracking-wider text-warm-stone">
                      {isPersian ? 'شماره کارت' : 'Card Number'}
                    </span>
                    <span className="font-mono text-xs sm:text-base font-medium text-mahogany tracking-wider block truncate">
                      {acc.cardNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.cardNumberRaw, `card-${acc.key}`)}
                    className="px-3 py-1.5 rounded-full bg-forest/10 hover:bg-forest hover:text-ivory text-forest text-[11px] sm:text-xs font-serif transition-colors shrink-0"
                  >
                    {copiedKey === `card-${acc.key}` ? (isPersian ? 'کپی شد ✓' : 'Copied ✓') : (isPersian ? 'کپی کارت' : 'Copy')}
                  </button>
                </div>

                {/* Sheba (IBAN) Row */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-ivory/80 border border-rose-gold/15">
                  <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                    <span className="block text-[9px] sm:text-[10px] uppercase font-serif tracking-wider text-warm-stone">
                      {isPersian ? 'شماره شبا (IBAN)' : 'IBAN / Sheba'}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-mahogany block truncate">
                      {acc.shebaNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.shebaNumber, `sheba-${acc.key}`)}
                    className="px-3 py-1.5 rounded-full bg-rose-deep/10 hover:bg-rose-deep hover:text-ivory text-rose-deep text-[11px] sm:text-xs font-serif transition-colors shrink-0"
                  >
                    {copiedKey === `sheba-${acc.key}` ? (isPersian ? 'کپی شد ✓' : 'Copied ✓') : (isPersian ? 'کپی شبا' : 'Copy')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 sm:mt-6 text-center">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-gradient-to-r from-mahogany to-forest text-ivory font-serif text-xs uppercase tracking-widest hover:shadow-gold-glow transition-all"
            >
              {isPersian ? 'بستن' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

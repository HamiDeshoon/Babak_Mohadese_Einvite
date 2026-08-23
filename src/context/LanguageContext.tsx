import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'fa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isPersian: boolean;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
  formatNumber: (num: number | string) => string;
}

const UI_TRANSLATIONS: Record<string, { en: string; fa: string }> = {
  // Navigation
  nav_story: { en: 'Our Story', fa: 'داستان ما' },
  nav_wedding: { en: 'The Wedding', fa: 'مراسم جشن' },
  nav_schedule: { en: 'Schedule', fa: 'برنامه‌ها' },
  nav_venue: { en: 'Venue', fa: 'محل مراسم' },
  nav_gallery: { en: 'Gallery', fa: 'گالری' },
  nav_rsvp: { en: 'RSVP', fa: 'ثبت حضور' },
  nav_wishes: { en: 'Wishes', fa: 'دفتر یادبود' },

  // Hero
  hero_eyebrow: { en: 'Together with their families', fa: 'با همراهی و شادمانی خانواده‌های محترم' },
  hero_request: { en: 'request the honour of your presence at their wedding celebration', fa: 'با کمال افتخار و شادمانی شما را به جشن پیوند آسمانی‌مان دعوت می‌نماییم' },
  hero_scroll: { en: 'Scroll to explore', fa: 'ورود به جشن' },
  hero_save_date: { en: 'Save the Date', fa: 'یادآوری در تقویم' },

  // Countdown
  countdown_title: { en: 'Countdown to the Ceremony', fa: 'شمارش معکوس تا آغاز پیوند' },
  countdown_subtitle: { en: 'Every passing second brings us closer to our forever', fa: 'هر ثانیه ما را به زیباترین آغاز زندگی‌مان نزدیک‌تر می‌کند' },
  days: { en: 'Days', fa: 'روز' },
  hours: { en: 'Hours', fa: 'ساعت' },
  minutes: { en: 'Mins', fa: 'دقیقه' },
  seconds: { en: 'Secs', fa: 'ثانیه' },
  add_to_calendar: { en: 'Add to Calendar', fa: 'افزودن به تقویم' },
  google_cal: { en: 'Google Calendar', fa: 'تقویم گوگل' },
  apple_cal: { en: 'Apple / iCal File', fa: 'دانلود فایل iCal' },
  outlook_cal: { en: 'Outlook Calendar', fa: 'تقویم اوت‌لوک' },

  // Story
  story_eyebrow: { en: 'A Journey of Two Hearts', fa: 'روایت یک پیوند عاشقانه' },
  story_title: { en: 'How Our Story Unfolded', fa: 'داستان پیوند ما' },

  // The Wedding & Schedule
  wedding_eyebrow: { en: 'The Celebration', fa: 'جشن و مراسم' },
  wedding_title: { en: 'Join Us on Our Special Day', fa: 'لحظه‌های ناب جشن' },
  dresscode_title: { en: 'Dress Code', fa: 'پوشش مهمانان' },
  view_full_schedule: { en: 'View Full Timeline', fa: 'مشاهده جدول زمان‌بندی کامل' },
  hide_full_schedule: { en: 'Hide Timeline', fa: 'بستن جدول زمان‌بندی' },

  // Venue & Map
  venue_eyebrow: { en: 'Find Your Way', fa: 'موقعیت و مسیر دسترسی' },
  venue_title: { en: 'Venue & Location', fa: 'محل برگزاری جشن' },
  open_google_maps: { en: 'Google Maps', fa: 'مسیریابی گوگل' },
  open_apple_maps: { en: 'Apple Maps', fa: 'نقشه اپل' },
  open_neshan: { en: 'Neshan Map', fa: 'مسیریابی در نشان' },
  open_balad: { en: 'Balad Map', fa: 'مسیریابی در بلد' },
  open_waze: { en: 'Waze', fa: 'مسیریابی در ویز' },

  // Gallery & Video
  gallery_eyebrow: { en: 'Moments & Memories', fa: 'تصاویر و خاطره‌ها' },
  gallery_title: { en: 'Our Visual Journey', fa: 'گالری قاب‌های ماندگار' },
  gallery_desc: { en: 'Glimpses of love, laughter, and the gentle moments leading to this day.', fa: 'گلچینی از قاب‌های پر از لبخند، صمیمیت و امید به آینده.' },
  video_invitation_title: { en: 'Digital Invitation Video', fa: 'ویدیوی اختصاصی دعوت به جشن' },
  video_invitation_desc: { en: 'A motion story of our journey and welcoming invitation.', fa: 'پیام تصویری و احساسی ما برای همراهی شما عزیزان.' },

  // Luxury RSVP
  rsvp_eyebrow: { en: 'Kindly Respond', fa: 'ثبت حضور و تاییدیه' },
  rsvp_title: { en: 'Will You Join Our Celebration?', fa: 'آیا در جشن ما حضور خواهید داشت؟' },
  rsvp_desc: { en: 'Please let us know your attendance status by', fa: 'خواهشمندیم تا تاریخ' },
  rsvp_desc_suffix: { en: 'to help us prepare for you.', fa: 'حضور پرمهر خود را اعلام فرمایید.' },
  rsvp_accept: { en: 'Accept with Joy ✦', fa: 'با کمال میل و افتخار شرکت می‌کنم ✦' },
  rsvp_decline: { en: 'Decline with Regret', fa: 'با نهایت تاسف امکان حضور ندارم' },
  rsvp_full_name: { en: 'Full Name(s)', fa: 'نام و نام‌خانوادگی' },
  rsvp_phone: { en: 'Mobile Number', fa: 'شماره تماس' },
  rsvp_guests_count: { en: 'Number of Attendees', fa: 'تعداد نفرات همراه' },
  rsvp_guest_single: { en: 'Just Myself (1 Guest)', fa: 'فقط خودم (۱ نفر)' },
  rsvp_guests_multiple: { en: 'Guests', fa: 'نفر' },
  rsvp_dietary: { en: 'Menu Preference', fa: 'انتخاب منو و سلیقه غذایی' },
  rsvp_message: { en: 'A loving message or song request for the couple...', fa: 'پیام تبریک، دل‌نوشته یا آهنگ پیشنهادی برای جشن...' },
  rsvp_submit: { en: 'Confirm RSVP', fa: 'ثبت نهایی و ارسال تاییدیه' },
  rsvp_submitting: { en: 'Confirming Your Attendance...', fa: 'در حال ثبت تاییدیه...' },
  rsvp_success_title: { en: 'RSVP Confirmed with Gratitude!', fa: 'پاسخ شما با مهر ثبت شد!' },
  rsvp_success_accept: { en: 'We are thrilled and truly honored to celebrate this unforgettable milestone with you!', fa: 'بی‌نهایت از حضور گرم و پرانرژی شما خرسندیم و مشتاقانه چشم‌انتظار دیدار روی ماهتان هستیم!' },
  rsvp_success_decline: { en: 'You will be dearly missed on our special night. Thank you for your warm wishes!', fa: 'جای خالی شما در جشن ما بسیار احساس خواهد شد. از دعای خیر و پیام پرمهرتان سپاسگزاریم.' },
  rsvp_error: { en: 'There was a connection issue. Your RSVP was saved locally, or you can call us directly.', fa: 'خطایی در ارسال رخ داد. اطلاعات ذخیره شد یا می‌توانید با ما تماس بگیرید.' },
  rsvp_download_pass: { en: 'Download Digital Event Pass', fa: 'دریافت کارت دیجیتال یادبود' },

  // Wishes Wall
  wishes_eyebrow: { en: 'Guest Book', fa: 'دفتر یادبود و شادباش' },
  wishes_title: { en: 'Warm Wishes & Blessings', fa: 'تبریک‌ها و دعای خیر شما' },
  wishes_subtitle: { en: 'Leave a sweet note that Babak & Mohadese will treasure forever.', fa: 'جمله‌ای به یادگار برای بابک و محدثه بنویسید تا همیشه در خاطرشان بماند.' },
  wishes_author: { en: 'Your Name', fa: 'نام شما' },
  wishes_placeholder: { en: 'Write your warmest blessing or funny memory...', fa: 'متن تبریک، آرزوی زیبا یا خاطره‌ای شیرین بنویسید...' },
  wishes_post: { en: 'Send Blessing ✦', fa: 'ثبت شادباش ✦' },

  // Footer
  footer_gratitude: { en: 'With boundless love, joy and eternal gratitude', fa: 'با تمام وجود و صمیمانه‌ترین سپاس‌ها' },
  footer_help: { en: 'Need help or directions? Reach out to us', fa: 'نیاز به راهنمایی دارید؟ با ما در ارتباط باشید' },
  footer_top: { en: 'Back to Top', fa: 'بازگشت به ابتدای صفحه' },
  groom_side: { en: 'Groom: Babak', fa: 'داماد: بابک' },
  bride_side: { en: 'Bride: Mohadese', fa: 'عروس: محدثه' },
  music_toggle_play: { en: 'Play Music', fa: 'پخش موسیقی' },
  music_toggle_pause: { en: 'Pause Music', fa: 'توقف موسیقی' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam === 'fa' || langParam === 'en') return langParam;
      const stored = localStorage.getItem('einvite_lang');
      if (stored === 'fa' || stored === 'en') return stored;
    }
    return 'fa'; // Default to Persian for rich cultural setting, switchable anytime
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('einvite_lang', lang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    if (language === 'fa') {
      document.body.classList.add('font-persianSans');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-persianSans');
    }
  }, [language]);

  const isPersian = language === 'fa';
  const dir = isPersian ? 'rtl' : 'ltr';

  const t = (key: string): string => {
    const item = UI_TRANSLATIONS[key];
    if (!item) return key;
    return item[language] || item.en || key;
  };

  const formatNumber = (num: number | string): string => {
    if (!isPersian) return String(num);
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isPersian,
        dir,
        t,
        formatNumber,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

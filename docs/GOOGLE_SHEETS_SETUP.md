# راهنمای اتصال فرم RSVP به گوگل شیت و ارسال خودکار ایمیل به بابک و محدثه
# Google Sheets & Email Notification Setup Guide

این راهنما مراحل اتصال فرم ثبت حضور (RSVP) به **گوگل شیت (Google Sheets)** و ارسال خودکار **ایمیل اطلاع‌رسانی به بابک و محدثه** را پس از هر ثبت نام توضیح می‌دهد.

---

## 🇮🇷 راهنمای فارسی (قدم‌به‌قدم):

### مرحله ۱: ساخت گوگل شیت جدید
1. به سایت [Google Sheets](https://sheets.google.com) بروید و یک فایل شیت جدید بسازید (مثلاً با نام `Babak & Mohadese Wedding RSVP`).

### مرحله ۲: افزودن اسکریپت
1. از منوی بالای صفحه روی **Extensions** (افزونه‌ها) > **Apps Script** کلیک کنید.
2. تمام کدهای موجود در پنجره اسکریپت را پاک کنید.
3. محتویات فایل [google-apps-script/Code.js](file:///d:/Gits/Babak_Mohadese_Einvite/google-apps-script/Code.js) را کپی کرده و در این پنجره جای‌گذاری (Paste) کنید.
4. در خط ۲۲ اسکریپت، ایمیل‌های بابک و محدثه را وارد کنید:
   ```javascript
   NOTIFICATION_EMAILS: ['babak_email@gmail.com', 'mohadese_email@gmail.com'],
   ```

### مرحله ۳: انتشار (Deploy) وب‌اپلیکیشن
1. در بالای صفحه Apps Script روی دکمه آبی‌رنگ **Deploy** کلیک کنید:
   - اگر قبلاً منتشر کرده‌اید: روی **Manage deployments** > کلیک روی آیکون ویرایش (مداد) > تغییر Version به **New version** > کلیک روی **Deploy**.
   - اگر اولین بار است: روی **New deployment** > انتخاب **Web app**.
2. فیلدها را به این صورت تنظیم کنید:
   - **Description**: `Wedding RSVP & Wishes Webhook v3.2`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` (بسیار مهم: حتماً Anyone انتخاب شود تا همه مهمانان بتوانند پیام‌ها را ببینند و بفرستند)
3. روی **Deploy** کلیک کنید و در صورت نیاز تایید دسترسی (Authorize access) را انجام دهید.
4. آدرس **Web app URL** داده شده (که با `https://script.google.com/macros/s/.../exec` شروع می‌شود) را کپی کنید.

### مرحله ۴: قرار دادن URL در پروژه
1. در فایل `.env.local` پروژه، مقدار زیر را قرار دهید:
   ```env
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. همچنین می‌توانید مستقیماً در [src/config/invitation.config.ts](file:///d:/Gits/Babak_Mohadese_Einvite/src/config/invitation.config.ts) در بخش `rsvp.sheetEndpoint` این لینک را قرار دهید (هم‌اکنون لینک فعال و متصل است).

---

## ✨ امکانات جدید اسکریپت:
- ✅ **دیوار یادداشت‌ها و تبریک‌های همگانی (Wishes Wall)**: ثبت پیام‌ها در تب جداگانه‌ای به نام `Guest Wishes` در همان گوگل شیت و بارگذاری آنلاین برای تمام دستگاه‌ها و همه کاربران.
- ✅ **مشاهده همگانی پیام‌ها**: همه مهمانان می‌توانند پیام‌های ثبت‌شده دیگران را با ذکر نام و زمان مشاهده کنند.
- ✅ **ثبت خودکار اطلاعات مهمان (RSVP)**: نام، شماره تماس، ایمیل اختیاری، تعداد همراهان، وضعیت حضور، منوی انتخابی، پیام.
- ✅ **ارسال آنی ایمیل اطلاع‌رسانی**: با قالب شیک و رنگی به ایمیل‌های بابک و محدثه.
- ✅ **محافظت خودکار در برابر اسپم و ربات‌ها (Honeypot)**.
- ✅ **کش محلی هوشمند (Local Cache)**: نمایش فوری پیام‌ها بدون تاخیر با امکان همگام‌سازی لحظه‌ای.

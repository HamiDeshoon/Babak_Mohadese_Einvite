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
1. در بالای صفحه Apps Script روی دکمه آبی‌رنگ **Deploy** > **New deployment** کلیک کنید.
2. روی آیکون چرخ‌دنده ⚙️ در کنار *Select type* کلیک کرده و **Web app** را انتخاب کنید.
3. فیلدها را به این صورت تنظیم کنید:
   - **Description**: `Wedding RSVP Webhook`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` (بسیار مهم: حتماً Anyone انتخاب شود تا فرم سایت بتواند داده بفرستد)
4. روی **Deploy** کلیک کنید و در پنجره‌ی بازشده روی **Authorize access** کلیک کرده و دسترسی را تایید کنید.
5. آدرس **Web app URL** داده شده (که با `https://script.google.com/macros/s/.../exec` شروع می‌شود) را کپی کنید.

### مرحله ۴: قرار دادن URL در پروژه
1. در فایل `.env.local` پروژه، مقدار زیر را قرار دهید:
   ```env
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. همچنین می‌توانید مستقیماً در [src/config/invitation.config.ts](file:///d:/Gits/Babak_Mohadese_Einvite/src/config/invitation.config.ts) در بخش `rsvp.sheetEndpoint` این لینک را قرار دهید.

---

## ✨ امکانات اسکریپت:
- ✅ ثبت خودکار اطلاعات مهمان (نام، شماره تماس، ایمیل اختیاری، تعداد همراهان، وضعیت حضور، پیام و شادباش).
- ✅ ارسال آنی ایمیل با قالب شیک و رنگی به بابک و محدثه.
- ✅ نمایش آمار لحظه‌ای کل مهمانان تاییدشده در هر ایمیل.
- ✅ محافظت خودکار در برابر ربات‌ها (Honeypot).

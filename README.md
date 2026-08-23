# 💍 Babak & Mohadese — Luxury Digital Wedding Invitation
### کارت دعوت دیجیتال اختصاصی عروسی بابک و محدثه (دو زبانه: فارسی و انگلیسی)

An ultra-luxurious, state-of-the-art wedding invitation web application featuring bilingual support (Persian RTL & English LTR), interactive Three.js golden stardust background, smooth Lenis scrolling, GSAP choreographies, real-time countdown with calendar export, venue navigation (Google Maps, Neshan, Balad, Apple Maps, Waze), photo/video lightbox gallery, interactive blessings wall, and a gold-accented RSVP system with confetti celebration.

---

## ✨ Features

- **🌐 Full Bilingual Architecture (English & Persian)**:
  - 1-click floating luxury gold language switcher.
  - Native Persian typography (Vazirmatn, Amiri, Aref Ruqaa, Katibeh) with Persian numerals (`formatNumber`) and Solar Hijri (Shamsi) dates.
  - Native English typography (Playfair Display, Cinzel, Lora, Great Vibes) with Gregorian dates.
- **✨ Three.js Ethereal Gold Canvas**:
  - GPU-accelerated golden stardust and shimmering rose particles reacting gently to mouse movement and scrolling.
- **⏳ Real-Time Countdown & Calendar Export**:
  - Live days/hours/minutes/seconds countdown cards.
  - 1-click "Add to Calendar" (.ics file generation, Google Calendar, and Outlook).
- **💌 Ultra-Luxury RSVP Card**:
  - Double-bezel glassmorphic card with wax seal monogram.
  - Attendance toggle, guest counter stepper, menu preferences, and personal note.
  - Burst of golden confetti on acceptance.
  - Optional Google Sheets webhook integration (`VITE_GOOGLE_SHEET_URL`).
- **🗺️ Multi-Platform Venue Navigation**:
  - Interactive map preview + direct links for Google Maps, Apple Maps, Neshan, Balad, and Waze.
- **🎵 Ambient Audio Player**:
  - Synthesized soothing romantic chord progression using Web Audio API or custom audio track.
- **📖 Centralized Easy Configuration**:
  - Edit all texts, dates, story chapters, timeline, and media in one clean file: `src/config/invitation.config.ts`.

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build production bundle
npm run build
```

---

## 📝 How to Update Details & Media

All text, dates, story milestones, and photo/video links are organized in:
📁 `src/config/invitation.config.ts`

- **Couple Names & Quotes**: update `couple` and `story.quote`
- **Wedding Date & Time**: update `event.targetIsoDate` (ISO format e.g. `2026-09-18T18:30:00`), `event.dateEn`, and `event.dateFa`
- **Venue & Map**: update `event.venueNameEn`, `event.venueAddressEn`, and `navigation` URLs
- **Photos & Videos**: update `media.gallery` and `media.featuredVideo`
- **Schedule**: update `schedule` items

---

## 📊 Google Sheets RSVP Integration (Optional)

1. Create a Google Sheet and open Extensions -> Apps Script.
2. Deploy as Web App (Execute as: Me, Who has access: Anyone).
3. Create a `.env.local` file:
   ```env
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

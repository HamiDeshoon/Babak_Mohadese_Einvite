# 💍 Babak & Mohadese — Luxury Digital Wedding Invitation
### کارت دعوت دیجیتال اختصاصی عروسی بابک و محدثه (دو زبانه: فارسی و انگلیسی)

An ultra-luxurious, state-of-the-art wedding invitation web application featuring full bilingual support (Persian RTL & English LTR) as two completely separate pages: `/en` (English) and `/fa` (Persian). Each page has its own locked language, audio track, and content. No language switcher exists between pages — they are distinct experiences.

---

## ✨ Features

- **🌐 Two Separate Pages (No Language Switcher)**:
  - `/en` — English-only page
  - `/fa` — Persian RTL-only page
  - Each page is fully self-contained with its own audio track and content
- **✨ Three.js Ethereal Gold Canvas**:
  - GPU-accelerated golden stardust and shimmering rose particles reacting gently to mouse movement and scrolling.
- **⏳ Real-Time Countdown & Calendar Export**:
  - Live days/hours/minutes/seconds countdown cards.
  - 1-click "Add to Calendar" (.ics file generation, Google Calendar, and Outlook).
- **💌 Ultra-Luxury RSVP Card**:
  - Double-bezel glassmorphic card with wax seal monogram.
  - Attendance toggle, guest counter stepper, menu preferences, and personal note.
  - Burst of golden confetti on acceptance.
  - Google Sheets webhook integration (`VITE_GOOGLE_SHEET_URL`) with language field.
- **🗺️ Multi-Platform Venue Navigation**:
  - Interactive map preview + direct links for Google Maps, Apple Maps, Neshan, Balad, and Waze.
- **🎵 Language-Specific Audio Tracks**:
  - `/en` page plays: "You Are My Favorite - Heather Mae (Official Music Video).mp3"
  - `/fa` page plays: "fa-Mix final.mp3"
- **📖 Centralized Easy Configuration**:
  - Edit all texts, dates, story chapters, timeline, and media in one clean file: `src/config/invitation.config.ts`.

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies (including react-router-dom)
npm install

# 2. Run local dev server
npm run dev

# 3. Access the two pages:
#    - Persian: http://localhost:5173/fa
#    - English: http://localhost:5173/en

# 4. Build production bundle
npm run build
```

---

## 📝 How to Update Details & Media

All text, dates, story milestones, and photo/video links are organized in:
📁 `src/config/invitation.config.ts`

- **Couple Names & Quotes**: update `couple` section
- **Wedding Date & Time**: update `event.targetIsoDate` (ISO format e.g. `2026-09-18T18:00:00`), `event.dateEn`, and `event.dateFa`
- **Venue & Map**: update `event.venueNameEn`, `event.venueFa`, `event.timeEn`, and `navigation` URLs
  - Located at: Rosamir Reception Hall, Garmdareh, Alborz Province, Iran
- **Photos & Videos**: update `media.gallery` with paths from `/public/` folder
- **Story Chapters**: update `chapters` with dates, titles, content, and images
- **Schedule**: update `schedule` items
- **Audio Tracks**: update `media.audioTrack.en` and `media.audioTrack.fa`

---

## 📊 Google Sheets RSVP Integration

This RSVP form sends submissions to your Google Sheet with the following columns:
1. **Timestamp** — When the form was submitted
2. **Name** — Guest's name
3. **Phone** — Contact number
4. **Attending** — Accept or Decline
5. **Guest Count** — Number of guests
6. **Dietary** — Dietary restrictions
7. **Message** — Personal message
8. **Language** — 'en' or 'fa'

### Setup Steps:

1. **Create Google Sheet**:
   - Open https://sheets.google.com/new
   - Name it "Babak & Mohadese RSVP"

2. **Add Column Headers** (first row, A-H):
   ```
   A: Timestamp
   B: Name
   C: Phone
   D: Attending
   E: Guest Count
   F: Dietary
   G: Message
   H: Language
   ```

3. **Create Google Apps Script**:
   - In the sheet, go to **Extensions → Apps Script**
   - Delete existing code and paste from `docs/google-apps-script/Code.gs`
   - Save

4. **Deploy Web App**:
   - Click **Deploy → New deployment**
   - Configure:
     - Type: Web app
     - Execute as: Me
     - Who has access: Anyone
   - Click Deploy and copy the URL (starts with `https://script.google.com/macros/s/...`)

5. **Add to .env.local** (at project root):
   ```env
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_URL/exec
   ```

6. **Restart Development Server**:
   ```bash
   npm run dev
   ```

7. **That's it!** Each RSVP submission will be instantly appended to your sheet.

### Duplicate Sheets for Testing:

To test both languages independently, you can create two separate sheets:
- One for Persian (use `/fa` page to submit)
- One for English (use `/en` page to submit)

The sheet URL is hardcoded in `.env.local` for production. For local testing, you can create a `.env.local` with your test URL.

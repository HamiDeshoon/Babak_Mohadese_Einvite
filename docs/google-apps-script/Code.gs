/**
 * Babak & Mohadese Wedding — RSVP Google Sheets Webhook
 * --------------------------------------------------------
 * 1. Open https://sheets.google.com and create a new spreadsheet.
 * 2. In the first row, add the following column headers (the script writes
 *    the matching values underneath each one):
 *
 *    A: Timestamp
 *    B: Name
 *    C: Phone
 *    D: Attending        (accept | decline)
 *    E: Guest Count
 *    F: Dietary
 *    G: Message
 *    H: Language         (en | fa)
 *
 * 3. In the spreadsheet, click Extensions → Apps Script.
 * 4. Delete any code in `Code.gs` and paste this entire file.
 * 5. Click Deploy → New deployment.
 *      - Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. Click Deploy and copy the Web App URL.
 * 7. In the project root create a `.env.local` file with:
 *      VITE_GOOGLE_SHEET_URL=<paste the web app URL here>
 * 8. Restart `npm run dev`. Every RSVP submission will be appended to the
 *    sheet instantly.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = {};
      }
    }

    // The RSVP form sends a Content-Type of "text/plain;charset=utf-8" so the
    // browser does not trigger a CORS preflight, but the body is still JSON.
    var row = [
      new Date(),
      data.name || '',
      data.phone || '',
      data.attending || '',
      data.guestCount !== undefined ? data.guestCount : '',
      data.dietary || '',
      data.message || '',
      data.language || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: support GET so you can verify the deployment from a browser.
function doGet() {
  return ContentService
    .createTextOutput(
      JSON.stringify({
        ok: true,
        service: 'Babak & Mohadese RSVP Webhook',
        ts: new Date().toISOString()
      })
    )
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * ==========================================================================
 * Google Apps Script for Babak & Mohadese Wedding RSVP
 * ==========================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new Spreadsheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any code in the editor and paste this entire script.
 * 4. Update NOTIFICATION_EMAILS below with Babak and Mohadese's email addresses.
 * 5. Click Deploy > New deployment.
 *    - Select type: "Web app"
 *    - Description: "Wedding RSVP Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Click Deploy, authorize access, and copy the Web App URL.
 * 7. Set the copied URL as VITE_GOOGLE_SHEET_URL in .env or invitation.config.ts.
 */

// Configure notification recipients for Babak & Mohadese
const CONFIG = {
  // Comma-separated emails to receive instant RSVP alerts
  NOTIFICATION_EMAILS: ['babak@example.com', 'mohadese@example.com'], // <-- Replace with real emails
  SHEET_NAME: 'RSVP Responses',
  COUPLE_NAMES: 'Babak & Mohadese (بابک و محدثه)',
  WEDDING_DATE: 'Friday, October 9, 2026 (جمعه ۱۷ مهر ۱۴۰۵)',
  VENUE: 'Rosamir Reception Hall (تالار رزامیر)',
};

/**
 * Handle incoming POST requests from the RSVP form
 */
function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    // Ignore bot submissions caught by honeypot
    if (data.website && data.website.trim() !== '') {
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'ignored', reason: 'bot_detected' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    // If sheet doesn't exist, create it with styled headers
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      const headers = [
        'Timestamp',
        'Status',
        'Guest Name',
        'Phone Number',
        'Email Address',
        'Guest Count',
        'Message / Blessing',
        'Language',
      ];
      sheet.appendRow(headers);

      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#3E2723');
      headerRange.setFontColor('#FAF8F2');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, headers.length);
    }

    const timestamp = new Date();
    const formattedDate = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      'yyyy-MM-dd HH:mm:ss'
    );

    const name = data.name || 'Anonymous Guest';
    const phone = data.phone || '-';
    const email = data.email || '-';
    const attending = data.attending === 'accept' ? 'ACCEPTED (شرکت می‌کند)' : 'DECLINED (امکان حضور ندارد)';
    const isAccepted = data.attending === 'accept';
    const guestCount = isAccepted ? Number(data.guestCount || 1) : 0;
    const message = data.message || '-';
    const language = (data.language || 'fa').toUpperCase();

    // Append response row to the sheet
    sheet.appendRow([
      formattedDate,
      attending,
      name,
      phone,
      email,
      guestCount,
      message,
      language,
    ]);

    // Format new row
    const lastRow = sheet.getLastRow();
    const statusCell = sheet.getRange(lastRow, 2);
    if (isAccepted) {
      statusCell.setBackground('#E8F5E9');
      statusCell.setFontColor('#2E7D32');
      statusCell.setFontWeight('bold');
    } else {
      statusCell.setBackground('#FFEBEE');
      statusCell.setFontColor('#C62828');
    }

    // Auto calculate total attending guests
    let totalConfirmedGuests = 0;
    let totalAcceptedResponses = 0;
    let totalDeclinedResponses = 0;
    const dataRange = sheet.getDataRange().getValues();
    for (let i = 1; i < dataRange.length; i++) {
      const row = dataRange[i];
      if (String(row[1]).indexOf('ACCEPTED') !== -1) {
        totalAcceptedResponses++;
        totalConfirmedGuests += Number(row[5]) || 1;
      } else {
        totalDeclinedResponses++;
      }
    }

    // Send email notification to Babak and Mohadese
    sendNotificationEmail({
      name,
      phone,
      email,
      isAccepted,
      guestCount,
      message,
      language,
      formattedDate,
      totalConfirmedGuests,
      totalAcceptedResponses,
      totalDeclinedResponses,
    });

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        message: 'RSVP recorded and notification sent successfully',
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (Health Check & verification)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'active',
      service: 'Babak & Mohadese Wedding RSVP Service',
      version: '2.0',
      time: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Send rich HTML notification email to Babak & Mohadese
 */
function sendNotificationEmail(info) {
  const recipients = CONFIG.NOTIFICATION_EMAILS.join(',');
  if (!recipients || recipients.indexOf('example.com') !== -1) {
    Logger.log('Skipping email send: Please set valid NOTIFICATION_EMAILS in CONFIG.');
    return;
  }

  const subjectStatus = info.isAccepted ? '✅ ATTENDING' : '❌ DECLINED';
  const subject = `${subjectStatus}: ${info.name} — Wedding RSVP (${CONFIG.COUPLE_NAMES})`;

  const statusBg = info.isAccepted ? '#2E7D32' : '#C62828';
  const statusText = info.isAccepted ? 'Will Attend (شرکت می‌کند)' : 'Regretfully Declined (امکان حضور ندارد)';
  const badgeColor = info.isAccepted ? '#E8F5E9' : '#FFEBEE';
  const badgeTextColor = info.isAccepted ? '#1B5E20' : '#B71C1C';

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F2; margin: 0; padding: 20px; color: #3E2723; }
          .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 24px; overflow: hidden; border: 1px solid #ECE0C6; box-shadow: 0 10px 30px rgba(62,39,35,0.06); }
          .header { background: linear-gradient(135deg, #3E2723, #2C3E2D); padding: 32px 24px; text-align: center; color: #FAF8F2; }
          .header h1 { margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: #D4AF37; }
          .header p { margin: 0; font-size: 14px; opacity: 0.9; }
          .badge-container { text-align: center; margin: -20px 0 20px 0; }
          .status-badge { display: inline-block; background: ${statusBg}; color: #FFFFFF; font-weight: bold; font-size: 14px; padding: 8px 24px; border-radius: 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
          .content { padding: 24px 32px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .info-table td { padding: 12px 8px; border-bottom: 1px solid #F5EFE1; font-size: 15px; }
          .info-label { font-weight: 600; color: #6D5B53; width: 35%; }
          .info-value { color: #3E2723; font-weight: 500; }
          .message-box { background: #FAF8F2; border-left: 4px solid #D4AF37; padding: 16px 20px; border-radius: 8px; margin-top: 16px; font-style: italic; color: #533833; font-size: 14px; line-height: 1.6; }
          .stats-grid { display: flex; background: #F8F4E9; border-radius: 16px; padding: 16px; margin-top: 24px; text-align: center; justify-content: space-around; }
          .stat-item { flex: 1; }
          .stat-number { font-size: 22px; font-weight: bold; color: #3E2723; }
          .stat-label { font-size: 11px; text-transform: uppercase; color: #6D5B53; margin-top: 4px; letter-spacing: 0.5px; }
          .footer { background: #FAF8F2; text-align: center; padding: 20px; font-size: 12px; color: #8C7A72; border-top: 1px solid #ECE0C6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💍 ${CONFIG.COUPLE_NAMES}</h1>
            <p>Wedding Celebration RSVP Alert</p>
          </div>

          <div class="badge-container">
            <span class="status-badge">${statusText}</span>
          </div>

          <div class="content">
            <table class="info-table">
              <tr>
                <td class="info-label">Guest Name:</td>
                <td class="info-value"><strong>${info.name}</strong></td>
              </tr>
              <tr>
                <td class="info-label">Phone:</td>
                <td class="info-value"><a href="tel:${info.phone}" style="color: #2E7D32; text-decoration: none;">${info.phone}</a></td>
              </tr>
              <tr>
                <td class="info-label">Email:</td>
                <td class="info-value"><a href="mailto:${info.email}" style="color: #3E2723; text-decoration: none;">${info.email}</a></td>
              </tr>
              ${info.isAccepted ? `
              <tr>
                <td class="info-label">Party Size:</td>
                <td class="info-value"><strong>${info.guestCount} Guest(s)</strong></td>
              </tr>
              ` : ''}
              <tr>
                <td class="info-label">Submission Date:</td>
                <td class="info-value">${info.formattedDate}</td>
              </tr>
              <tr>
                <td class="info-label">Language:</td>
                <td class="info-value">${info.language}</td>
              </tr>
            </table>

            ${info.message && info.message !== '-' ? `
              <div style="margin-top: 20px;">
                <span style="font-weight: 600; font-size: 13px; color: #6D5B53; text-transform: uppercase; letter-spacing: 0.5px;">Message for the Couple:</span>
                <div class="message-box">
                  “${info.message.replace(/\\n/g, '<br>')}”
                </div>
              </div>
            ` : ''}

            <!-- Total Attendance Summary -->
            <table style="width: 100%; background: #FAF6EE; border-radius: 12px; margin-top: 24px; padding: 12px; text-align: center;">
              <tr>
                <td style="border: none; padding: 8px;">
                  <div style="font-size: 20px; font-weight: bold; color: #2E7D32;">${info.totalConfirmedGuests}</div>
                  <div style="font-size: 11px; color: #6D5B53;">Total Confirmed Guests</div>
                </td>
                <td style="border: none; padding: 8px; border-left: 1px solid #ECE0C6; border-right: 1px solid #ECE0C6;">
                  <div style="font-size: 20px; font-weight: bold; color: #3E2723;">${info.totalAcceptedResponses}</div>
                  <div style="font-size: 11px; color: #6D5B53;">Accepted RSVPs</div>
                </td>
                <td style="border: none; padding: 8px;">
                  <div style="font-size: 20px; font-weight: bold; color: #C62828;">${info.totalDeclinedResponses}</div>
                  <div style="font-size: 11px; color: #6D5B53;">Declined</div>
                </td>
              </tr>
            </table>
          </div>

          <div class="footer">
            ${CONFIG.WEDDING_DATE} • ${CONFIG.VENUE}<br>
            Automated notification sent via Babak & Mohadese Wedding Platform.
          </div>
        </div>
      </body>
    </html>
  `;

  MailApp.sendEmail({
    to: recipients,
    subject: subject,
    htmlBody: htmlBody,
  });
}

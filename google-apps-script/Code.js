/**
 * ==========================================================================
 * Google Apps Script for Babak & Mohadese Wedding RSVP
 * ==========================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new Spreadsheet
 *    or open: https://docs.google.com/spreadsheets/d/1e5EDayKjb8vTPIgaaTa1lB-r1NNP575UZAZWk6qhlmM/edit
 * 2. Click Extensions > Apps Script.
 * 3. Delete any existing code and paste this ENTIRE script.
 * 4. Click Deploy > Manage deployments > Edit > New version > Deploy.
 * 5. Choose "Web app", Execute as "Me", Who has access "Anyone".
 * 6. Run `testDoPost()` inside Apps Script to verify Sheet insertion & email delivery.
 */

// Configuration
const CONFIG = {
  // Comma-separated emails to receive instant RSVP alerts
  NOTIFICATION_EMAILS: ['ebrahimib941941@gmail.com', 'mohiestaji@gmail.com', 'tmha456@gmail.com'],
  // Target Google Sheet ID
  SPREADSHEET_ID: '1e5EDayKjb8vTPIgaaTa1lB-r1NNP575UZAZWk6qhlmM',
  SHEET_NAME: 'RSVP Responses',
  WISHES_SHEET_NAME: 'Guest Wishes',
  COUPLE_NAMES: 'Babak & Mohadese (بابک و محدثه)',
  WEDDING_DATE: 'Friday, October 9, 2026 (جمعه ۱۷ مهر ۱۴۰۵)',
  VENUE: 'Rosamir Reception Hall (تالار رزامیر)',
};

/**
 * Get the target Spreadsheet (by ID if specified, or active bound spreadsheet)
 */
function getSpreadsheet() {
  try {
    if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID.trim() !== '') {
      return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID.trim());
    }
  } catch (err) {
    Logger.log('Could not open by ID: ' + err.toString());
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Handle incoming POST requests from the RSVP form
 */
function doPost(e) {
  try {
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback for form-encoded or raw string data
        data = e.parameter || {};
      }
    } else if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else {
      // Safe fallback if clicked directly via the Apps Script editor "Run" button
      data = {
        name: 'مهمان تستی (Manual Test)',
        phone: '۰۹۱۲۶۳۳۴۷۵۱',
        email: 'tmha456@gmail.com',
        attending: 'accept',
        guestCount: 2,
        message: 'آرزوی خوشبختی و شادکامی برای بابک و محدثه عزیز 🌸',
        website: '',
        language: 'fa',
      };
    }

    // Ignore bot submissions caught by honeypot
    if (data.website && data.website.trim() !== '') {
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'ignored', reason: 'bot_detected' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = getSpreadsheet();
    if (!ss) {
      throw new Error('Spreadsheet could not be accessed. Please check permissions and SPREADSHEET_ID.');
    }

    // ------------------------------------------------------------------------
    // Handle Guest Wish / Note submission from WishesWall
    // ------------------------------------------------------------------------
    if (data.action === 'add_wish' || data.type === 'wish') {
      const wishesSheetName = CONFIG.WISHES_SHEET_NAME || 'Guest Wishes';
      let wishesSheet = ss.getSheetByName(wishesSheetName);

      if (!wishesSheet) {
        wishesSheet = ss.insertSheet(wishesSheetName);
        const headers = [
          'Wish ID',
          'Date & Time',
          'Guest Name',
          'Message / Blessing',
          'Timestamp (ms)'
        ];
        wishesSheet.appendRow(headers);

        const headerRange = wishesSheet.getRange(1, 1, 1, headers.length);
        headerRange.setBackground('#3E2723');
        headerRange.setFontColor('#FAF8F2');
        headerRange.setFontWeight('bold');
        headerRange.setHorizontalAlignment('center');
        wishesSheet.setFrozenRows(1);
      }

      const timestamp = new Date();
      const formattedDate = Utilities.formatDate(
        timestamp,
        Session.getScriptTimeZone() || 'GMT+3:30',
        'yyyy-MM-dd HH:mm:ss'
      );

      const id = String(data.id || `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);
      const name = String(data.name || 'Anonymous Guest').trim();
      const message = String(data.message || '').trim();
      const createdAt = Number(data.createdAt) || Date.now();

      if (name && message) {
        wishesSheet.appendRow([
          id,
          formattedDate,
          name,
          message,
          createdAt
        ]);
      }

      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'success',
          action: 'add_wish',
          wish: { id, name, message, createdAt }
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    // If sheet doesn't exist by name, check if active sheet can be used or create it
    if (!sheet) {
      const firstSheet = ss.getSheets()[0];
      if (firstSheet && firstSheet.getLastRow() === 0) {
        // If the first sheet is completely empty, rename it
        sheet = firstSheet;
        sheet.setName(CONFIG.SHEET_NAME);
      } else {
        sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      }

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
    }

    const timestamp = new Date();
    const formattedDate = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone() || 'GMT+3:30',
      'yyyy-MM-dd HH:mm:ss'
    );

    const name = data.name || 'Anonymous Guest';
    const phone = data.phone || '-';
    const email = data.email || '-';
    const isAccepted = data.attending === 'accept';
    const attending = isAccepted ? 'ACCEPTED (شرکت می‌کند)' : 'DECLINED (امکان حضور ندارد)';
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

    // Send email notification to Babak, Mohadese & Hamid
    try {
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
    } catch (emailErr) {
      Logger.log('Notification email error (Sheet saved successfully): ' + emailErr.toString());
    }

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
 * Handle GET requests (Health Check & Fetch Wishes)
 */
function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    const action = params.action || '';

    // Return all guest wishes for WishesWall
    if (action === 'get_wishes') {
      const ss = getSpreadsheet();
      if (!ss) {
        throw new Error('Spreadsheet could not be accessed.');
      }

      const wishesSheetName = CONFIG.WISHES_SHEET_NAME || 'Guest Wishes';
      const wishesSheet = ss.getSheetByName(wishesSheetName);

      if (!wishesSheet) {
        return ContentService.createTextOutput(
          JSON.stringify({ status: 'success', count: 0, wishes: [] })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      const lastRow = wishesSheet.getLastRow();
      if (lastRow <= 1) {
        return ContentService.createTextOutput(
          JSON.stringify({ status: 'success', count: 0, wishes: [] })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      // Read columns: 1: ID, 2: Date, 3: Guest Name, 4: Message, 5: Timestamp (ms)
      const data = wishesSheet.getRange(2, 1, lastRow - 1, 5).getValues();
      const wishes = [];

      for (let i = data.length - 1; i >= 0; i--) {
        const row = data[i];
        const id = String(row[0] || '');
        const name = String(row[2] || '').trim();
        const message = String(row[3] || '').trim();
        let createdAt = Number(row[4]);
        if (!createdAt || isNaN(createdAt)) {
          const parsed = new Date(row[1]).getTime();
          createdAt = !isNaN(parsed) ? parsed : Date.now();
        }

        if (name && message) {
          wishes.push({
            id: id || `wish-${i}-${createdAt}`,
            name,
            message,
            createdAt,
          });
        }
      }

      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'success',
          count: wishes.length,
          wishes,
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Default health check
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'active',
        service: 'Babak & Mohadese Wedding RSVP & Wishes Service',
        version: '3.2',
        spreadsheetId: CONFIG.SPREADSHEET_ID,
        time: new Date().toISOString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send rich HTML notification email to Babak & Mohadese
 */
function sendNotificationEmail(info) {
  const recipients = CONFIG.NOTIFICATION_EMAILS.join(',');
  if (!recipients) {
    Logger.log('Skipping email send: No recipients configured.');
    return;
  }

  const subjectStatus = info.isAccepted ? '✅ ATTENDING (شرکت می‌کند)' : '❌ DECLINED (عدم حضور)';
  const subject = `${subjectStatus}: ${info.name} — Wedding RSVP (${CONFIG.COUPLE_NAMES})`;

  const statusBg = info.isAccepted ? '#2E7D32' : '#C62828';
  const statusText = info.isAccepted ? 'Will Attend (شرکت می‌کند)' : 'Regretfully Declined (امکان حضور ندارد)';
  const badgeColor = info.isAccepted ? '#E8F5E9' : '#FFEBEE';
  const badgeTextColor = info.isAccepted ? '#1B5E20' : '#B71C1C';

  const htmlBody = `
    <!DOCTYPE html>
    <html dir="ltr">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF8F2; margin: 0; padding: 20px; color: #3E2723; }
          .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid #ECE0C6; overflow: hidden; box-shadow: 0 10px 30px rgba(62,39,35,0.08); }
          .header { background: linear-gradient(135deg, #3E2723 0%, #2C3E2D 100%); color: #FAF8F2; padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 1px; color: #F5E3B3; }
          .header p { margin: 8px 0 0; font-size: 13px; opacity: 0.85; }
          .content { padding: 28px 24px; }
          .badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 20px; background: ${badgeColor}; color: ${badgeTextColor}; border: 1px solid ${statusBg}; }
          .info-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .info-table td { padding: 12px 8px; border-bottom: 1px solid #F0EAE1; font-size: 14px; }
          .info-label { color: #8C7A72; width: 35%; font-weight: 500; }
          .info-value { color: #3E2723; font-weight: 600; }
          .message-box { background: #FAF8F2; border-right: 4px solid #D4AF37; border-left: 4px solid #D4AF37; padding: 14px 18px; border-radius: 8px; margin-top: 10px; font-style: italic; color: #533833; }
          .footer { background: #FAF8F2; padding: 16px; text-align: center; font-size: 11px; color: #8C7A72; border-top: 1px solid #ECE0C6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💍 ${CONFIG.COUPLE_NAMES}</h1>
            <p>New Wedding RSVP Response Received</p>
          </div>
          <div class="content">
            <div style="text-align: center;">
              <span class="badge">${statusText}</span>
            </div>

            <table class="info-table">
              <tr>
                <td class="info-label">Guest Name:</td>
                <td class="info-value"><strong>${info.name}</strong></td>
              </tr>
              <tr>
                <td class="info-label">Phone:</td>
                <td class="info-value"><a href="tel:${info.phone}" style="color: #3E2723; text-decoration: none;">${info.phone}</a></td>
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

  try {
    MailApp.sendEmail({
      to: recipients,
      subject: subject,
      htmlBody: htmlBody,
    });
  } catch (err1) {
    Logger.log('MailApp failed, trying GmailApp: ' + err1.toString());
    GmailApp.sendEmail(recipients, subject, '', { htmlBody: htmlBody });
  }
}

/**
 * Run this function directly inside Google Apps Script editor (▶️ Run)
 * to test permissions, Google Sheet creation, and email delivery.
 */
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'مهمان تستی (حمید)',
        phone: '۰۹۱۲۶۳۳۴۷۵۱',
        email: 'tmha456@gmail.com',
        attending: 'accept',
        guestCount: 2,
        message: 'با آرزوی خوشبختی و شادکامی برای بابک و محدثه عزیز 🌸',
        website: '',
        language: 'fa',
      }),
    },
  };
  const result = doPost(mockEvent);
  Logger.log('Test Result: ' + result.getContent());
}

/**
 * Test posting a wish and retrieving all wishes
 */
function testWishes() {
  const mockWishEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'add_wish',
        id: 'test-wish-' + Date.now(),
        name: 'مهمان تستی',
        message: 'با آرزوی خوشبختی و سلامتی برای بابک و محدثه عزیز 🌸',
        createdAt: Date.now(),
        website: '',
      }),
    },
  };
  const postRes = doPost(mockWishEvent);
  Logger.log('Test Add Wish: ' + postRes.getContent());

  const getRes = doGet({ parameter: { action: 'get_wishes' } });
  Logger.log('Test Get Wishes: ' + getRes.getContent());
}

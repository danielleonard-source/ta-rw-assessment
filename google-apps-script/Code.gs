// Google Apps Script Backend for TA/RW Assessment System
// Deploy this as a Web App with "Execute as: Me" and "Who has access: Anyone"

// **CONFIGURATION**
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const ADMIN_EMAIL = 'daniel.leonard@beth.school.nz';
const SHEET_NAME = 'Assessment Results';

// Main handler function
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Store results in Google Sheets
    storeResults(data);
    
    // Send email notification to admin
    sendAdminNotification(data);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET handler for admin dashboard
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getResults') {
    return getResults();
  }
  
  return ContentService.createTextOutput(
    JSON.stringify({ error: 'Invalid action' })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Store assessment results in Google Sheet
function storeResults(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    
    // Add headers
    const headers = [
      'Timestamp',
      'Candidate Name',
      'Email',
      'Assessment Code',
      'Spelling Score',
      'Grammar Score',
      'Reading WPM',
      'Reading Accuracy',
      'Typing WPM',
      'Typing Accuracy',
      'Overall Score',
      'Recommendation'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#1d5693');
    sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  
  // Append new row
  const row = [
    data.timestamp,
    data.candidateName,
    data.candidateEmail,
    data.assessmentCode,
    data.spellingScore + '%',
    data.grammarScore + '%',
    data.readingWPM,
    data.readingAccuracy + '%',
    data.typingWPM,
    data.typingAccuracy + '%',
    data.overallScore + '%',
    data.recommendation
  ];
  
  sheet.appendRow(row);
  
  // Apply conditional formatting to the new row
  const lastRow = sheet.getLastRow();
  
  // Color-code recommendation
  const recCell = sheet.getRange(lastRow, 12);
  if (data.recommendation.includes('SUITABLE')) {
    recCell.setBackground('#e8f5e9');
    recCell.setFontColor('#2e7d32');
  } else if (data.recommendation.includes('REVIEW')) {
    recCell.setBackground('#fff3e0');
    recCell.setFontColor('#e65100');
  } else {
    recCell.setBackground('#ffebee');
    recCell.setFontColor('#c62828');
  }
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 12);
}

// Send email notification to admin
function sendAdminNotification(data) {
  const subject = `New TA/RW Assessment: ${data.candidateName}`;
  
  const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #1d5693; color: white; padding: 20px; }
          .content { padding: 20px; }
          .section { margin-bottom: 25px; }
          .score-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .score-table th, .score-table td { 
            padding: 10px; 
            text-align: left; 
            border-bottom: 1px solid #ddd; 
          }
          .score-table th { background: #f5f5f5; font-weight: bold; }
          .suitable { color: #2e7d32; font-weight: bold; }
          .review { color: #e65100; font-weight: bold; }
          .not-recommended { color: #c62828; font-weight: bold; }
          .footer { background: #f5f5f5; padding: 15px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>New TA/RW Assessment Completed</h2>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>Candidate Information</h3>
            <p><strong>Name:</strong> ${data.candidateName}</p>
            <p><strong>Email:</strong> ${data.candidateEmail}</p>
            <p><strong>Assessment Code:</strong> ${data.assessmentCode}</p>
            <p><strong>Submitted:</strong> ${data.timestamp}</p>
          </div>
          
          <div class="section">
            <h3>Assessment Results</h3>
            <table class="score-table">
              <tr>
                <th>Component</th>
                <th>Score</th>
              </tr>
              <tr>
                <td>Spelling</td>
                <td>${data.spellingScore}%</td>
              </tr>
              <tr>
                <td>Grammar</td>
                <td>${data.grammarScore}%</td>
              </tr>
              <tr>
                <td>Reading Speed</td>
                <td>${data.readingWPM} WPM</td>
              </tr>
              <tr>
                <td>Reading Accuracy</td>
                <td>${data.readingAccuracy}%</td>
              </tr>
              <tr>
                <td>Typing Speed</td>
                <td>${data.typingWPM} WPM</td>
              </tr>
              <tr>
                <td>Typing Accuracy</td>
                <td>${data.typingAccuracy}%</td>
              </tr>
              <tr style="background: #f0f7ff;">
                <td><strong>Overall Score</strong></td>
                <td><strong>${data.overallScore}%</strong></td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h3>Recommendation</h3>
            <p class="${getRecommendationClass(data.recommendation)}">
              ${data.recommendation}
            </p>
          </div>
          
          <div class="section">
            <p>
              <a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}" 
                 style="background: #1d5693; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Full Results in Google Sheets
              </a>
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from the TA/RW Assessment System.</p>
          <p>Assessment Code: ${data.assessmentCode}</p>
        </div>
      </body>
    </html>
  `;
  
  const plainBody = `
New TA/RW Assessment Completed

Candidate: ${data.candidateName}
Email: ${data.candidateEmail}
Assessment Code: ${data.assessmentCode}
Submitted: ${data.timestamp}

Results:
- Spelling: ${data.spellingScore}%
- Grammar: ${data.grammarScore}%
- Reading Speed: ${data.readingWPM} WPM
- Reading Accuracy: ${data.readingAccuracy}%
- Typing Speed: ${data.typingWPM} WPM
- Typing Accuracy: ${data.typingAccuracy}%
- Overall Score: ${data.overallScore}%

Recommendation: ${data.recommendation}

View full results: https://docs.google.com/spreadsheets/d/${SHEET_ID}
  `;
  
  GmailApp.sendEmail(
    ADMIN_EMAIL,
    subject,
    plainBody,
    {
      htmlBody: htmlBody,
      name: 'TA/RW Assessment System'
    }
  );
}

// Helper function for email styling
function getRecommendationClass(recommendation) {
  if (recommendation.includes('SUITABLE')) return 'suitable';
  if (recommendation.includes('REVIEW')) return 'review';
  return 'not-recommended';
}

// Get all results for admin dashboard
function getResults() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ results: [] })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    const results = rows.map(row => {
      const result = {};
      headers.forEach((header, idx) => {
        // Convert header to camelCase key
        const key = header.toLowerCase().replace(/\s+(\w)/g, (_, c) => c.toUpperCase());
        result[key] = row[idx];
      });
      return result;
    });
    
    return ContentService.createTextOutput(
      JSON.stringify({ results: results.reverse() }) // Most recent first
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in getResults: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ results: [], error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

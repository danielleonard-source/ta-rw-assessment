# TA/RW Assessment System - Deployment Guide

## System Overview

This is a React + Vite web application for assessing Teacher Aide and Reader-Writer candidates on:
- **Spelling** (20 words, audio-based)
- **Grammar** (15 sentence corrections)
- **Reading Comprehension** (2 passages with timed reading + questions)
- **Typing Speed** (3-minute transcription test)

Results are automatically scored and submitted to Google Sheets with email notifications to admin.

---

## Part 1: Google Apps Script Backend Setup

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"TA-RW Assessment Results"**
4. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
5. Save this Sheet ID - you'll need it in Step 2

### Step 2: Deploy Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete the default `myFunction()` code
3. Copy the entire contents of `google-apps-script/Code.gs`
4. Paste it into the Apps Script editor
5. **Configure the script**:
   - Line 5: Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your Sheet ID from Step 1
   - Line 6: Confirm `daniel.leonard@beth.school.nz` is correct (or update)
   
6. Save the script (Ctrl+S or Cmd+S)
7. Click **Deploy > New Deployment**
8. Settings:
   - **Type:** Web app
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
9. Click **Deploy**
10. Copy the **Web app URL** - you'll need this for Step 3
11. Click **Authorize access** and grant permissions

**Important:** The Web app URL should look like:
```
https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

---

## Part 2: React Frontend Setup

### Step 3: Configure Frontend

1. Open `src/App.jsx`
2. Line 17: Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL from Step 2:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```

3. Open `src/components/AdminDashboard.jsx`
4. Line 5: **Set admin password** (default is `TARW2026Admin`):
   ```javascript
   const ADMIN_PASSWORD = 'YourSecurePassword123';
   ```

5. Line 22: Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with same URL from Step 2

### Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `ta-rw-assessment`
3. Make it **Public** (required for GitHub Pages)
4. **Do NOT** initialize with README, .gitignore, or license

### Step 5: Deploy to GitHub

Open terminal in the `ta-rw-assessment` folder and run:

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: TA/RW Assessment System"

# Link to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ta-rw-assessment.git
git branch -M main
git push -u origin main

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist
```

### Step 6: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings**
3. Scroll to **Pages** (left sidebar)
4. Source: **Deploy from a branch**
5. Branch: **gh-pages** / (root)
6. Click **Save**
7. Wait 1-2 minutes for deployment

Your assessment will be live at:
```
https://YOUR_USERNAME.github.io/ta-rw-assessment/
```

---

## Part 3: Using the System

### Candidate Assessment URL
```
https://YOUR_USERNAME.github.io/ta-rw-assessment/
```

**Workflow:**
1. You generate assessment code (e.g., `TA-12APR26-ABC`)
2. Send candidate the URL + assessment code via email
3. Candidate completes assessment (45-60 minutes)
4. Results automatically saved to Google Sheets
5. You receive email notification with scores

### Admin Dashboard URL
```
https://YOUR_USERNAME.github.io/ta-rw-assessment/admin
```

**Features:**
- Password-protected access
- View all candidate results in sortable table
- Filter by recommendation (Suitable / Review / Not Recommended)
- Export to CSV
- Refresh to load new submissions

**Default Admin Password:** `TARW2026Admin` (change in `AdminDashboard.jsx` line 5)

---

## Part 4: Assessment Scoring Criteria

### Passing Thresholds

**SUITABLE:**
- Overall Score: 75%+
- Spelling: 70%+
- Grammar: 70%+
- Typing Speed: 35+ WPM

**REVIEW:**
- Overall Score: 60-74%
- Spelling: 60%+
- Grammar: 60%+

**NOT RECOMMENDED:**
- Overall Score: <60%
- OR Spelling <60%
- OR Grammar <60%

### Component Weighting
- **Spelling & Grammar:** 40% (highest priority)
- **Reading:** 35%
- **Typing:** 25%

### Reading Norms
- Target reading speed: 200-250 WPM (adult average)
- Minimum comprehension: 80%

### Typing Norms
- Minimum for RW roles: 40 WPM
- Accuracy penalties applied (1 WPM deducted per 1% error)

---

## Part 5: Generating Assessment Codes

Assessment codes help you track who you sent invitations to and prevent unauthorized access.

**Format:** `TA-TIMESTAMP-RANDOM`

**Example workflow:**
1. Decide to assess Jane Smith on 12 April 2026
2. Generate code: `TA-12APR26-JANE` (or use system-generated)
3. Email Jane:
   ```
   Subject: TA/RW Assessment Invitation
   
   Hi Jane,
   
   Please complete the TA/RW competency assessment at:
   https://YOUR_USERNAME.github.io/ta-rw-assessment/
   
   Your assessment code: TA-12APR26-JANE
   
   Allow 45-60 minutes in a quiet space.
   
   Regards,
   Danie Leonard
   ```

4. Jane completes assessment
5. You receive email notification
6. Check Google Sheet or Admin Dashboard

---

## Part 6: Troubleshooting

### Issue: "Results not saving to Google Sheets"

**Solution:**
1. Check Google Apps Script deployment:
   - Open Apps Script
   - Click **Deploy > Manage Deployments**
   - Verify "Execute as: Me" and "Who has access: Anyone"
2. Check CORS:
   - Apps Script uses `ContentService` which handles CORS automatically
3. Check browser console for errors (F12)
4. Re-deploy the Apps Script if needed

### Issue: "Admin dashboard shows no results"

**Solution:**
1. Verify Google Script URL in `AdminDashboard.jsx` line 22
2. Check that at least one assessment has been submitted
3. Make sure Google Sheet has data (not just headers)
4. Try the "Refresh" button in admin dashboard

### Issue: "Text-to-speech not working in Spelling Test"

**Solution:**
- Speech synthesis requires HTTPS (GitHub Pages is HTTPS by default)
- Some browsers may need permission first
- Test in Chrome or Edge for best compatibility

### Issue: "Cannot access admin dashboard"

**Solution:**
1. URL must be: `https://YOUR_USERNAME.github.io/ta-rw-assessment/admin`
2. Password is case-sensitive
3. Default password: `TARW2026Admin` (unless you changed it)

---

## Part 7: Customization

### Change Spelling Words
Edit `src/data/assessmentData.js` - `spellingWords` array

### Change Grammar Sentences
Edit `src/data/assessmentData.js` - `grammarSentences` array

### Change Reading Passages
Edit `src/data/assessmentData.js` - `readingPassages` array

### Change Typing Text
Edit `src/data/assessmentData.js` - `typingText` variable

### Adjust Passing Thresholds
Edit `src/utils/scoring.js` - `calculateOverallGrade` function (lines 70-80)

### Change Admin Password
Edit `src/components/AdminDashboard.jsx` - line 5

### After ANY changes:
```bash
npm run build
npx gh-pages -d dist
```

Wait 1-2 minutes for deployment

---

## Part 8: Updating the System

To make changes after initial deployment:

```bash
# Make your code changes
# Then:

git add .
git commit -m "Description of changes"
git push origin main

npm run build
npx gh-pages -d dist
```

---

## Research Base & Validity

### Spelling Assessment
- Adult literacy standards (NZCER)
- Levenshtein distance for error tolerance
- Progressive difficulty (basic → expert)

### Grammar Assessment
- Contextualized correction (higher validity than isolated MCQ)
- Common adult literacy errors in NZ context
- Targets real workplace writing needs

### Reading Comprehension
- Running records methodology
- Flesch-Kincaid appropriate passages
- 200-250 WPM adult norm (NZCER)

### Typing Assessment
- 40+ WPM standard for RW roles (NZQA)
- Real-world transcription scenario
- Accuracy penalties reflect job requirements

---

## Support

For technical issues or questions:
**Danie Leonard**
Email: daniel.leonard@beth.school.nz
Office: Q110, Bethlehem College

---

## System Architecture

```
Candidate Flow:
1. Visit assessment URL
2. Enter name, email, assessment code
3. Complete 4 tests sequentially
4. See "Thank You" screen (NO RESULTS)
5. Results auto-submit to Google Sheets

Admin Flow:
1. Receive email notification
2. Visit /admin URL
3. Enter password
4. View all results in dashboard
5. Filter, sort, export as needed

Backend:
- Google Apps Script handles storage
- Google Sheets stores all data
- Gmail sends notifications
- No external database needed
```

---

## File Structure

```
ta-rw-assessment/
├── src/
│   ├── components/
│   │   ├── Welcome.jsx
│   │   ├── SpellingTest.jsx
│   │   ├── GrammarTest.jsx
│   │   ├── ReadingTest.jsx
│   │   ├── TypingTest.jsx
│   │   ├── ThankYou.jsx
│   │   └── AdminDashboard.jsx
│   ├── data/
│   │   └── assessmentData.js
│   ├── utils/
│   │   └── scoring.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── google-apps-script/
│   └── Code.gs
├── index.html
├── package.json
├── vite.config.js
└── DEPLOYMENT.md (this file)
```

---

## Version

**v1.0.0** - April 2026
Built by Danie Leonard for Bethlehem College

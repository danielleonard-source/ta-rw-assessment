# TA/RW Assessment System

A comprehensive web-based assessment tool for screening Teacher Aide and Reader-Writer candidates at Bethlehem College, Tauranga.

## Features

✅ **Four Assessment Components:**
- Spelling (20 words with text-to-speech)
- Grammar (15 sentence corrections)
- Reading Comprehension (2 timed passages with questions)
- Typing Speed (3-minute transcription test)

✅ **Automatic Scoring:**
- Research-based algorithms (Levenshtein distance, WPM calculations)
- Weighted scoring by priority (Spelling/Grammar 40%, Reading 35%, Typing 25%)
- Clear recommendations: Suitable / Review / Not Recommended

✅ **Candidate Privacy:**
- Candidates see NO results after completion
- Only "Thank You" confirmation screen
- Results go directly to admin

✅ **Admin Features:**
- Password-protected dashboard
- View all results in sortable table
- Filter by recommendation
- Export to CSV
- Email notifications on new submissions

✅ **Google Sheets Integration:**
- Automatic storage of all results
- Real-time updates
- Email notifications to admin
- No external database required

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- GitHub account
- Google account

### 1. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/ta-rw-assessment.git
cd ta-rw-assessment
npm install
```

### 2. Configure Backend

See **DEPLOYMENT.md** for complete step-by-step instructions:
1. Create Google Sheet
2. Deploy Google Apps Script
3. Configure frontend with your deployment URLs
4. Set admin password

### 3. Deploy

```bash
npm run build
npx gh-pages -d dist
```

Enable GitHub Pages in repository settings.

### 4. Use

**Candidate URL:** `https://YOUR_USERNAME.github.io/ta-rw-assessment/`
**Admin Dashboard:** `https://YOUR_USERNAME.github.io/ta-rw-assessment/admin`

---

## Assessment Overview

| Component | Duration | Items | Scoring |
|-----------|----------|-------|---------|
| Spelling | 10 min | 20 words | Audio-based, Levenshtein distance |
| Grammar | 15 min | 15 sentences | Sentence correction, pattern matching |
| Reading | 15 min | 2 passages | Timed WPM + comprehension questions |
| Typing | 3 min | 1 passage | WPM with accuracy penalties |

**Total Time:** 45-60 minutes

---

## Scoring Thresholds

### SUITABLE
- Overall Score: 75%+
- Spelling: 70%+
- Grammar: 70%+
- Typing Speed: 35+ WPM

### REVIEW
- Overall Score: 60-74%
- Spelling: 60%+
- Grammar: 60%+

### NOT RECOMMENDED
- Overall Score: <60%
- OR Spelling <60%
- OR Grammar <60%

---

## Research Base

**Spelling:** NZCER Adult Literacy Standards, progressive difficulty
**Grammar:** Contextualized correction (higher validity than isolated MCQ)
**Reading:** 200-250 WPM adult norm, Flesch-Kincaid passages
**Typing:** 40+ WPM standard for RW roles (NZQA)

---

## Tech Stack

- **Frontend:** React 18 + Vite
- **Routing:** React Router 6
- **Backend:** Google Apps Script
- **Storage:** Google Sheets
- **Notifications:** Gmail API
- **Hosting:** GitHub Pages

---

## File Structure

```
src/
├── components/          # React components for each assessment stage
├── data/               # Assessment content (words, sentences, passages)
├── utils/              # Scoring algorithms and utilities
├── App.jsx             # Main app orchestration
└── main.jsx            # Entry point

google-apps-script/
└── Code.gs             # Backend API for Google Sheets
```

---

## Customization

### Change Assessment Content
Edit `src/data/assessmentData.js`

### Adjust Scoring Thresholds
Edit `src/utils/scoring.js` → `calculateOverallGrade()`

### Change Admin Password
Edit `src/components/AdminDashboard.jsx` → line 5

### After Changes
```bash
npm run build
npx gh-pages -d dist
```

---

## Support

**Developer:** Danie Leonard  
**Email:** daniel.leonard@beth.school.nz  
**Location:** Office Q110, Bethlehem College, Tauranga

---

## Documentation

- **DEPLOYMENT.md** - Complete deployment guide with troubleshooting
- **Assessment Content** - All words, sentences, and passages in `src/data/assessmentData.js`
- **Scoring Logic** - Algorithm details in `src/utils/scoring.js`

---

## License

Developed for Bethlehem College by Danie Leonard (2026)

---

## Version History

**v1.0.0** (April 2026)
- Initial release
- Four assessment components
- Google Sheets integration
- Admin dashboard with filtering and export
- Email notifications

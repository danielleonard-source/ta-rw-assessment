# TA/RW Assessment System - Project Summary

**Developer:** Danie Leonard  
**Organization:** Bethlehem College, Tauranga, NZ  
**Completion Date:** April 2026  
**Version:** 1.0.0

---

## Executive Summary

The TA/RW Assessment System is a comprehensive web-based platform designed to screen Teacher Aide and Reader-Writer candidates for competency in spelling, grammar, reading comprehension, and typing speed. The system provides automated scoring, candidate privacy protection, and integrated Google Sheets storage with email notifications.

**Key Achievement:** A complete, production-ready assessment platform that eliminates manual grading while maintaining professional standards and research-based validity.

---

## What Has Been Built

### Core Application (React + Vite)

**1. Candidate-Facing Components**
- Welcome screen with candidate information collection
- Spelling test (20 words) with text-to-speech playback
- Grammar test (15 sentence corrections)
- Reading comprehension (2 passages with timed reading + questions)
- Typing speed test (3-minute transcription)
- Thank you screen (NO SCORES SHOWN - critical privacy feature)

**2. Admin Dashboard**
- Password-protected access
- View all submissions in sortable table
- Filter by recommendation (Suitable/Review/Not Recommended)
- Export results to CSV
- Refresh to load new submissions
- Color-coded scoring visualization

**3. Backend Integration**
- Google Apps Script API for data storage
- Automatic submission to Google Sheets
- Email notifications to admin on new submissions
- CORS-compliant ContentService implementation

**4. Scoring Engine**
- Levenshtein distance algorithm for spelling (tolerates minor typos)
- Pattern matching for grammar assessment
- WPM calculation for reading speed
- Accuracy-penalized WPM for typing
- Weighted overall score (Spelling/Grammar 40%, Reading 35%, Typing 25%)
- Automatic recommendation generation

---

## Research-Based Design

### Assessment Validity

**Spelling Assessment**
- Based on NZCER Adult Literacy standards
- Progressive difficulty (Basic → Intermediate → Advanced → Expert)
- 20 words spanning workplace vocabulary to academic/technical terms
- Levenshtein distance scoring allows 1-character tolerance in longer words

**Grammar Assessment**
- Contextualized sentence correction (higher validity than isolated multiple choice)
- Targets common adult literacy errors in NZ context:
  - Subject-verb agreement
  - Homophones (their/there, its/it's, affect/effect)
  - Punctuation and parallel structure
  - Pronoun case and collective nouns
- 15 sentences with graded difficulty

**Reading Comprehension**
- Two passages at Year 8-10 text complexity (appropriate for adult assessment)
- Content focused on learning support and SAC procedures (role-relevant)
- Timed reading with WPM calculation
- 5 multiple-choice questions per passage testing literal and inferential comprehension
- 200-250 WPM target (adult average reading speed)

**Typing Speed**
- Real-world transcription scenario (student SAC instructions)
- 3-minute timed test (standard duration for typing assessments)
- WPM calculated with accuracy penalties (1 WPM deduction per 1% error)
- 40+ WPM threshold based on NZQA standards for RW roles

### Scoring Thresholds

**SUITABLE (Recommended for role)**
- Overall: 75%+
- Spelling: 70%+
- Grammar: 70%+
- Typing: 35+ WPM
- Strong technical accuracy and adequate speed

**REVIEW (May be suitable with support/specific placement)**
- Overall: 60-74%
- Spelling: 60%+
- Grammar: 60%+
- Meets minimum standards but may need additional support

**NOT RECOMMENDED**
- Overall: <60%
- OR Spelling <60%
- OR Grammar <60%
- Below minimum competency standards for TA/RW roles

---

## Technical Architecture

### Frontend Stack
```
React 18.2.0
React Router DOM 6.22.0
Vite 5.1.0 (build tool)
Vanilla CSS (no external frameworks)
```

### Backend Stack
```
Google Apps Script (ES5-compatible JavaScript)
Google Sheets API (built-in)
Gmail API (built-in)
```

### Hosting
```
GitHub Pages (static site hosting)
GitHub Actions (via gh-pages package)
```

### Data Flow
```
Candidate → React App → Google Apps Script → Google Sheets
                                          ↓
                                    Gmail Notification
                                          ↓
                                   Admin Dashboard
```

---

## File Structure

```
ta-rw-assessment/
│
├── src/
│   ├── components/
│   │   ├── Welcome.jsx              # Entry point with candidate info
│   │   ├── SpellingTest.jsx         # 20-word spelling with TTS
│   │   ├── GrammarTest.jsx          # 15 sentence corrections
│   │   ├── ReadingTest.jsx          # 2 timed passages + questions
│   │   ├── TypingTest.jsx           # 3-minute transcription
│   │   ├── ThankYou.jsx             # Completion screen (no scores)
│   │   └── AdminDashboard.jsx       # Password-protected results view
│   │
│   ├── data/
│   │   └── assessmentData.js        # All assessment content
│   │
│   ├── utils/
│   │   └── scoring.js               # Scoring algorithms
│   │
│   ├── App.jsx                      # Main orchestration
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
│
├── google-apps-script/
│   └── Code.gs                      # Backend API
│
├── public/                          # Static assets
├── index.html                       # HTML entry
├── vite.config.js                   # Build configuration
├── package.json                     # Dependencies
├── .gitignore                       # Git exclusions
│
├── README.md                        # Quick start guide
├── DEPLOYMENT.md                    # Complete deployment instructions
├── TESTING-CHECKLIST.md             # Comprehensive testing guide
└── ASSESSMENT-CODES-GUIDE.md        # Code generation workflow
```

---

## Deployment Instructions (Quick Reference)

### Step 1: Google Backend
1. Create Google Sheet
2. Copy Sheet ID from URL
3. Extensions → Apps Script
4. Paste contents of `google-apps-script/Code.gs`
5. Update Sheet ID and admin email (lines 5-6)
6. Deploy as Web App: "Execute as Me", "Anyone"
7. Copy Web App URL

### Step 2: Frontend Configuration
1. Update `src/App.jsx` line 17 with Web App URL
2. Update `src/components/AdminDashboard.jsx` line 5 (password) and line 22 (Web App URL)

### Step 3: GitHub Deployment
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ta-rw-assessment.git
git push -u origin main

npm install
npm run build
npx gh-pages -d dist
```

### Step 4: Enable GitHub Pages
Settings → Pages → Deploy from branch: gh-pages

**Live URLs:**
- Candidate: `https://YOUR_USERNAME.github.io/ta-rw-assessment/`
- Admin: `https://YOUR_USERNAME.github.io/ta-rw-assessment/admin`

---

## Usage Workflow

### 1. Prepare for Assessment
- Generate/assign assessment code (e.g., `TA-15APR26-JANE`)
- Record in tracking spreadsheet: Date, Name, Email, Code

### 2. Send Invitation
Email template provided in `ASSESSMENT-CODES-GUIDE.md`
- Include assessment URL
- Include unique assessment code
- Note 45-60 minute duration
- Specify computer with keyboard required

### 3. Candidate Completes Assessment
- 4 sequential components (no skipping)
- Browser-based, no installation required
- Text-to-speech for spelling (requires speakers/headphones)
- Sees "Thank You" screen on completion (no scores)

### 4. Admin Receives Notification
- Email notification with all scores
- Subject: "New TA/RW Assessment: [Name]"
- Includes recommendation and link to Google Sheet

### 5. Review Results
- Visit admin dashboard or Google Sheet
- Filter/sort by scores or recommendation
- Export data if needed for hiring meetings

### 6. Follow Up
- Contact suitable candidates for interview
- Review borderline candidates for specific roles
- Maintain records for recruitment compliance

---

## Customization Points

### Easy Customizations (No Code Changes)
1. **Admin Password:** Edit line 5 in `AdminDashboard.jsx`
2. **Assessment Content:** Edit `src/data/assessmentData.js`
   - Spelling words
   - Grammar sentences
   - Reading passages
   - Typing text

### Moderate Customizations (Some Code)
1. **Passing Thresholds:** Edit `src/utils/scoring.js` → `calculateOverallGrade()`
2. **Component Weighting:** Edit same function, lines 44-54
3. **Email Template:** Edit `google-apps-script/Code.gs` → `sendAdminNotification()`

### Advanced Customizations (Significant Changes)
1. Add new assessment component (e.g., math test)
2. Implement adaptive difficulty
3. Add candidate authentication system
4. Build internal admin reporting dashboard
5. Integrate with ATS (Applicant Tracking System)

---

## Maintenance Requirements

### Regular (Ongoing)
- Monitor Google Sheet for new submissions
- Respond to email notifications
- Generate assessment codes for new candidates
- Review candidate feedback

### Periodic (Quarterly)
- Review assessment content for relevance
- Update spelling words if language shifts
- Adjust passing thresholds based on hiring outcomes
- Update documentation if workflows change

### Rare (As Needed)
- Redeploy after customizations
- Update dependencies (`npm update`)
- Migrate to new Google Sheet if needed
- Change admin password

---

## Security Considerations

### What Is Secure
✅ Admin dashboard password-protected
✅ Candidates never see scores
✅ Google Sheet access restricted to authorized users
✅ HTTPS via GitHub Pages (secure data transmission)
✅ Email notifications only to specified admin

### What Is NOT Secure
⚠️ Assessment codes are for tracking, not authentication
⚠️ Anyone with a code can submit (by design - simplifies candidate experience)
⚠️ No prevention of multiple submissions with same code
⚠️ Admin password stored in client-side code (visible in source)

### Recommendations for Higher Security
If needed in future:
- Implement proper authentication (OAuth, Firebase Auth)
- Add rate limiting on submissions
- Encrypt sensitive data in transit beyond HTTPS
- Move admin password to environment variables
- Add CAPTCHA to prevent automated submissions

---

## Known Limitations

1. **No Progress Saving:** If candidate closes browser, they start over
   - *Mitigation:* Clearly communicate "complete in one sitting"

2. **Text-to-Speech Browser Dependent:** Quality varies by browser/OS
   - *Mitigation:* Recommend Chrome or Edge for best experience

3. **Mobile Not Optimized:** Typing test impractical on mobile
   - *Mitigation:* Specify "computer with keyboard" in invitation

4. **No Adaptive Difficulty:** All candidates get same items
   - *Future Enhancement:* Implement IRT-based adaptive engine

5. **Manual Code Generation:** Admin creates codes manually
   - *Future Enhancement:* Build code generation into admin dashboard

---

## Support and Troubleshooting

### Common Issues and Solutions

**Issue:** Results not saving to Google Sheets
- Check Google Apps Script deployment settings
- Verify Web App URL in frontend configuration
- Check browser console for CORS errors

**Issue:** Admin dashboard shows no results
- Verify at least one assessment completed
- Check Google Script URL in AdminDashboard.jsx
- Try "Refresh" button
- Check Google Sheet directly

**Issue:** Text-to-speech not working
- Requires HTTPS (GitHub Pages is HTTPS by default)
- Test in Chrome or Edge
- Check browser audio permissions

**Issue:** Email notifications not received
- Check spam folder
- Verify admin email in Google Apps Script
- Check Apps Script execution logs

### Getting Help
1. Check `DEPLOYMENT.md` troubleshooting section
2. Check `TESTING-CHECKLIST.md` for test procedures
3. Review browser console for errors (F12)
4. Check Google Apps Script execution logs
5. Contact: daniel.leonard@beth.school.nz

---

## Future Enhancement Ideas

### Short-Term (Low Effort)
- [ ] Add candidate feedback form post-assessment
- [ ] Build assessment code generator into admin dashboard
- [ ] Add email reminders for incomplete assessments
- [ ] Create printable assessment reports

### Medium-Term (Moderate Effort)
- [ ] Implement progress saving (resume later feature)
- [ ] Add practice mode (no score submission)
- [ ] Build hiring manager view (filtered access to results)
- [ ] Integrate with calendar for interview scheduling

### Long-Term (High Effort)
- [ ] Adaptive testing engine (IRT-based)
- [ ] Video/audio capture for read-aloud assessment
- [ ] Machine learning for writing assessment scoring
- [ ] Full ATS integration
- [ ] Multi-language support

---

## Success Metrics

### Quantitative
- **Time Savings:** Estimated 2-3 hours per candidate (no manual grading)
- **Consistency:** 100% standardized assessment across all candidates
- **Turnaround:** Results available immediately upon submission
- **Accuracy:** Automated scoring eliminates human error

### Qualitative
- Improved candidate experience (clear process, immediate confirmation)
- Enhanced hiring confidence (objective data-driven decisions)
- Professional presentation (reflects well on Bethlehem College)
- Audit trail (complete records for compliance)

---

## Conclusion

The TA/RW Assessment System is a complete, production-ready solution that balances research-based validity with practical usability. It automates a time-consuming manual process while maintaining high professional standards.

**The system is ready to deploy and use immediately.**

All documentation, testing protocols, and support materials are provided. The codebase is well-structured for future enhancements, and the modular design allows easy customization of assessment content and scoring criteria.

**Next Steps:**
1. Complete deployment following `DEPLOYMENT.md`
2. Run full system test using `TESTING-CHECKLIST.md`
3. Send first real candidate invitation
4. Monitor and iterate based on feedback

---

## Acknowledgments

**Research Base:**
- NZCER Adult Literacy & Numeracy standards
- NZQA Special Assessment Conditions guidelines
- Bethlehem College TA/RW role requirements

**Development:**
- Built by Danie Leonard
- Dean & Head of Learning Support
- Bethlehem College, Tauranga
- Office Q110

**Contact:**
Email: daniel.leonard@beth.school.nz

---

## Version History

**v1.0.0 - April 2026**
- Initial release
- Complete assessment system
- Google Sheets integration
- Admin dashboard
- Email notifications
- Comprehensive documentation

---

**Project Status: ✅ COMPLETE AND READY FOR DEPLOYMENT**

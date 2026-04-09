# TA/RW Assessment System - Testing Checklist

## Pre-Deployment Testing

### ✅ Backend Setup Verification

- [ ] Google Sheet created and Sheet ID recorded
- [ ] Google Apps Script deployed with correct Sheet ID
- [ ] Apps Script deployment settings: "Execute as: Me" + "Who has access: Anyone"
- [ ] Web app URL copied and recorded
- [ ] Test email notification working (check admin email)

**Test Method:**
1. Open Apps Script
2. Run `doPost` with test data manually
3. Verify new row appears in Google Sheet
4. Verify email received at daniel.leonard@beth.school.nz

### ✅ Frontend Configuration

- [ ] `src/App.jsx` line 17: Google Script URL updated
- [ ] `src/components/AdminDashboard.jsx` line 5: Admin password set
- [ ] `src/components/AdminDashboard.jsx` line 22: Google Script URL updated
- [ ] `vite.config.js`: Correct base path for GitHub Pages

### ✅ Local Development Testing

```bash
npm install
npm run dev
```

Test each component locally:

**1. Welcome Screen**
- [ ] Form accepts name, email, assessment code
- [ ] Submit button disabled until all fields filled
- [ ] Instructions display correctly
- [ ] Styling matches Bethlehem College brand

**2. Spelling Test**
- [ ] Text-to-speech plays words correctly
- [ ] Can replay audio multiple times
- [ ] Input field captures typed words
- [ ] Progress bar updates correctly
- [ ] Previous/Next navigation works
- [ ] All 20 words cycle through properly

**3. Grammar Test**
- [ ] Incorrect sentences display with error highlight
- [ ] Textarea accepts corrections
- [ ] Previous/Next navigation works
- [ ] All 15 sentences cycle through properly
- [ ] Difficulty levels display correctly

**4. Reading Test**
- [ ] Timer starts on passage display
- [ ] "Finish Reading" button works
- [ ] WPM calculates correctly (passage 1: 253 words, passage 2: 268 words)
- [ ] Questions display after reading
- [ ] Radio buttons work correctly
- [ ] Submit disabled until all questions answered
- [ ] Both passages complete successfully

**5. Typing Test**
- [ ] Instructions screen displays
- [ ] 3-minute timer starts on "Begin"
- [ ] Countdown displays correctly (3:00 → 0:00)
- [ ] Reference text visible while typing
- [ ] Live WPM and accuracy update
- [ ] Progress bar updates
- [ ] Can submit early if finished
- [ ] Auto-submits at 0:00

**6. Thank You Screen**
- [ ] Displays candidate name correctly
- [ ] Shows appropriate message
- [ ] NO SCORES displayed (critical requirement)
- [ ] Contact information correct

**7. Admin Dashboard**
- [ ] Password protection works
- [ ] Incorrect password rejected
- [ ] Results table loads (if data exists)
- [ ] Sorting works (click column headers)
- [ ] Filtering by recommendation works
- [ ] Export CSV downloads correctly
- [ ] Refresh button reloads data

---

## Post-Deployment Testing

### ✅ GitHub Pages Deployment

```bash
npm run build
npx gh-pages -d dist
```

- [ ] Build completes without errors
- [ ] GitHub Pages enabled in repository settings
- [ ] Site accessible at: `https://YOUR_USERNAME.github.io/ta-rw-assessment/`
- [ ] Admin dashboard accessible at: `https://YOUR_USERNAME.github.io/ta-rw-assessment/admin`

### ✅ Full System Integration Test

**Create a test candidate submission:**

1. **Welcome Screen**
   - Name: `Test Candidate`
   - Email: `test@example.com`
   - Code: `TA-TEST-001`
   - [ ] Submit successful

2. **Spelling Test**
   - Complete all 20 words
   - Mix of correct and intentional errors
   - [ ] Audio works in production (HTTPS required)
   - [ ] Progresses to Grammar

3. **Grammar Test**
   - Complete all 15 sentences
   - Mix of correct and intentional errors
   - [ ] Progresses to Reading

4. **Reading Test**
   - Read Passage 1, answer questions
   - Read Passage 2, answer questions
   - [ ] Timer calculates WPM correctly
   - [ ] Progresses to Typing

5. **Typing Test**
   - Type for at least 30 seconds
   - [ ] Timer counts down
   - [ ] WPM and accuracy display
   - [ ] Submit works

6. **Thank You Screen**
   - [ ] Shows "Test Candidate" name
   - [ ] Shows thank you message
   - [ ] NO scores visible

7. **Backend Verification**
   - [ ] Check Google Sheet for new row
   - [ ] Verify all data fields populated correctly
   - [ ] Check admin email for notification
   - [ ] Email contains correct scores and recommendation

8. **Admin Dashboard**
   - [ ] Login with password
   - [ ] See test submission in results table
   - [ ] Scores match Google Sheet
   - [ ] Export CSV includes test data
   - [ ] Can filter/sort results

---

## Scoring Validation Tests

Create test submissions with known inputs to verify scoring:

### Test Case 1: Perfect Score
**Expected Overall:** 90%+ (SUITABLE)

- Spelling: All 20 words correct
- Grammar: All 15 sentences correct
- Reading: 250+ WPM, 100% accuracy (all questions correct)
- Typing: 50+ WPM, 95%+ accuracy

**Verify:**
- [ ] Overall score 90%+
- [ ] Recommendation: SUITABLE
- [ ] All component scores accurate

### Test Case 2: Borderline Pass
**Expected Overall:** 60-75% (REVIEW)

- Spelling: 12/20 correct (60%)
- Grammar: 9/15 correct (60%)
- Reading: 180 WPM, 70% accuracy
- Typing: 35 WPM, 85% accuracy

**Verify:**
- [ ] Overall score in REVIEW range
- [ ] Recommendation: REVIEW
- [ ] Thresholds enforced correctly

### Test Case 3: Below Standard
**Expected Overall:** <60% (NOT RECOMMENDED)

- Spelling: 10/20 correct (50%)
- Grammar: 7/15 correct (47%)
- Reading: 120 WPM, 50% accuracy
- Typing: 25 WPM, 70% accuracy

**Verify:**
- [ ] Overall score <60%
- [ ] Recommendation: NOT RECOMMENDED
- [ ] Low scores flagged appropriately

---

## Browser Compatibility Testing

Test on multiple browsers and devices:

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Check:**
- Text-to-speech works
- Timers function correctly
- Styling renders properly
- Navigation smooth
- Form submission successful

### Mobile/Tablet (Information Only)
*Note: Assessment is designed for desktop/laptop with keyboard*

- [ ] Site loads but shows desktop layout
- [ ] Typing test not practical on mobile (expected)
- [ ] Consider adding mobile detection warning

---

## Security Testing

### Password Protection
- [ ] Admin dashboard requires password
- [ ] Wrong password rejected with clear message
- [ ] Session persists within browser session
- [ ] No bypass routes to admin data

### Data Privacy
- [ ] Candidates never see scores
- [ ] Thank you page contains no assessment data
- [ ] Results only accessible via admin dashboard
- [ ] Google Sheet only accessible to authorized users

### CORS and API Security
- [ ] Google Apps Script accepts requests from GitHub Pages domain
- [ ] No console errors related to CORS
- [ ] POST requests to Google Script succeed
- [ ] GET requests from admin dashboard succeed

---

## Email Notification Testing

### Email Delivery
- [ ] Email received at daniel.leonard@beth.school.nz
- [ ] Subject line: "New TA/RW Assessment: [Candidate Name]"
- [ ] Email contains all score components
- [ ] Email contains recommendation
- [ ] Email contains link to Google Sheet
- [ ] HTML formatting displays correctly

### Email Content Accuracy
- [ ] Candidate name matches submission
- [ ] Email address matches submission
- [ ] Assessment code matches submission
- [ ] Timestamp accurate (NZ timezone)
- [ ] Scores match Google Sheet
- [ ] Recommendation matches overall calculation

---

## Performance Testing

### Load Time
- [ ] Initial page load <3 seconds
- [ ] Component transitions smooth
- [ ] No lag during typing test
- [ ] Timer accuracy within 1 second

### Data Submission
- [ ] Results submit within 5 seconds
- [ ] No timeout errors
- [ ] Handles network interruptions gracefully

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through form fields works
- [ ] Enter key submits forms
- [ ] Escape key functions where appropriate

### Screen Reader Compatibility
- [ ] Labels properly associated with inputs
- [ ] ARIA attributes where needed
- [ ] Logical reading order

### Visual Accessibility
- [ ] Sufficient color contrast (text readable)
- [ ] Font sizes appropriate
- [ ] Interactive elements clearly identifiable

---

## Documentation Verification

- [ ] README.md complete and accurate
- [ ] DEPLOYMENT.md complete and accurate
- [ ] ASSESSMENT-CODES-GUIDE.md complete
- [ ] All Google Script URLs documented
- [ ] Admin password documented (securely)
- [ ] GitHub repository URL recorded
- [ ] Contact information correct throughout

---

## Go-Live Checklist

### Pre-Launch
- [ ] All testing complete and passing
- [ ] Documentation finalized
- [ ] Admin credentials secured
- [ ] Google Sheet shared with appropriate staff
- [ ] Email template drafted
- [ ] Assessment code system decided

### Launch Day
- [ ] Verify production site accessible
- [ ] Verify admin dashboard accessible
- [ ] Send test submission to verify end-to-end
- [ ] Confirm email notifications working
- [ ] Monitor first real submissions

### Post-Launch
- [ ] Check Google Sheet daily for new submissions
- [ ] Respond to email notifications promptly
- [ ] Monitor for technical issues
- [ ] Gather feedback from first candidates
- [ ] Document any issues and resolutions

---

## Troubleshooting Tests

### Simulate Common Issues

**Test: Candidate loses internet during assessment**
- Complete 2 components
- Disconnect internet
- Attempt to continue
- [ ] System handles gracefully (note: data lost unless browser caching)

**Test: Candidate refreshes page**
- Start assessment
- Refresh browser
- [ ] Returns to welcome screen (expected - no persistence)

**Test: Multiple tabs open**
- Open assessment in 2 tabs
- Complete in both
- [ ] Both submissions recorded (expected)

**Test: Incorrect assessment code**
- Enter invalid code
- [ ] System accepts (by design - codes are for tracking only)

---

## Final Sign-Off

- [ ] All critical tests passing
- [ ] Documentation complete
- [ ] Admin trained on system use
- [ ] Support process established
- [ ] Backup plan documented (if Google Script fails)

**Tested By:** _________________
**Date:** _________________
**Approved By:** _________________
**Date:** _________________

---

## Continuous Monitoring

After go-live, monitor:

1. **Weekly**
   - Number of submissions
   - Any error patterns
   - Email notification delivery

2. **Monthly**
   - Review scoring distribution
   - Candidate feedback
   - System performance metrics

3. **Quarterly**
   - Update assessment content if needed
   - Review passing thresholds
   - Update documentation

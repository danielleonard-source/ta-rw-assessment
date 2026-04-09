# Assessment Code Generation Guide

## Purpose
Assessment codes prevent unauthorized access and help you track which candidates you've invited.

## Format Options

### Option 1: Manual Codes (Recommended)
**Format:** `TA-[DATE]-[IDENTIFIER]`

**Examples:**
- `TA-15APR26-JANE` (Jane Smith, invited 15 April 2026)
- `TA-15APR26-MARK` (Mark Johnson, invited same day)
- `TA-20APR26-BATCH1` (Group invitation)

**How to create:**
1. Note the date you're sending the invitation
2. Use candidate's first name or a batch identifier
3. Keep it short and memorable
4. Use UPPERCASE for consistency

### Option 2: System-Generated Codes
The system includes a function that generates unique codes automatically:

**Format:** `TA-[TIMESTAMP]-[RANDOM]`

**Example:** `TA-1M3XK8-7FG2Q`

**To use in your workflow:**
Open browser console (F12) and run:
```javascript
function generateCode() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `TA-${timestamp}-${random}`.toUpperCase();
}

console.log(generateCode());
// Outputs: TA-1M3XK8-7FG2Q
```

## Email Template for Candidates

```
Subject: TA/RW Competency Assessment Invitation

Hi [Candidate Name],

Thank you for your interest in the Teacher Aide / Reader-Writer position at Bethlehem College.

Please complete the online competency assessment at your earliest convenience:

Assessment URL: https://[YOUR_USERNAME].github.io/ta-rw-assessment/

Your unique assessment code: [ASSESSMENT_CODE]

Assessment Details:
• Duration: 45-60 minutes
• Components: Spelling, Grammar, Reading Comprehension, Typing Speed
• Complete in one sitting
• Requires computer with keyboard and speakers/headphones

Please find a quiet space where you won't be interrupted. The assessment must be completed on a computer (not a mobile device).

Your results will be submitted directly to our hiring team, and we'll be in touch within 3-5 working days.

If you have any questions or technical issues, please contact:

Danie Leonard
Dean & Head of Learning Support
Bethlehem College
Email: daniel.leonard@beth.school.nz
Office: Q110

Kind regards,
[Your Name]
Bethlehem College
```

## Tracking Your Invitations

### Create a Simple Spreadsheet

| Date Sent | Candidate Name | Email | Assessment Code | Status | Notes |
|-----------|----------------|-------|-----------------|--------|-------|
| 15/04/26 | Jane Smith | jane@email.com | TA-15APR26-JANE | Completed | Strong candidate |
| 15/04/26 | Mark Johnson | mark@email.com | TA-15APR26-MARK | Pending | Sent reminder 20/04 |
| 20/04/26 | Sarah Williams | sarah@email.com | TA-20APR26-SARAH | Completed | Review needed |

**Status options:**
- Pending (invited, not yet completed)
- Completed (assessment submitted)
- Not Started (code generated but not sent)
- Expired (invited but never completed)

## Best Practices

✅ **DO:**
- Generate/assign codes before sending invitation emails
- Keep a record of all codes and who they were sent to
- Use consistent format (all uppercase)
- Include clear instructions in invitation email
- Send reminder after 3-4 days if not completed

❌ **DON'T:**
- Reuse codes for multiple candidates
- Share codes publicly
- Use codes that could identify candidates in results (e.g., don't use "TA-FAILING-STUDENT")
- Send assessment link without explaining time commitment

## Security Notes

- Codes don't provide authentication (anyone with a code can use it)
- They're mainly for tracking and preventing random access
- Results are stored by candidate name/email, not just code
- Multiple submissions with same code will all be recorded

## Batch Invitations

If assessing multiple candidates at once:

**Approach 1: Individual codes**
```
TA-15APR26-CAND1
TA-15APR26-CAND2
TA-15APR26-CAND3
```

**Approach 2: Batch code (if you don't need individual tracking)**
```
TA-15APR26-BATCH1
```
All candidates use the same code. You'll identify them by name/email in results.

## Troubleshooting

**Candidate says they lost their code:**
- Check your tracking spreadsheet
- Resend the same code
- Or generate a new code and update your records

**Candidate says code doesn't work:**
- Codes are case-sensitive (but input field auto-uppercases)
- Check they're copying the full code
- Make sure they're on the correct URL
- Verify code exists in your tracking

**Multiple submissions with same code:**
- This is allowed by design
- Results are identified by name + email + code
- You'll see multiple rows in Google Sheets
- If duplicate, check timestamps to determine correct submission

---

## Quick Reference

**Manual Code Format:** `TA-[DATE]-[IDENTIFIER]`
**Example:** `TA-15APR26-JANE`

**System-Generated:** Use browser console function or build into workflow

**Record:** Date, Name, Email, Code, Status

**Send:** URL + Code + Instructions

**Track:** Google Sheets has all submissions with codes

// Levenshtein distance for spelling assessment
// Allows minor typos vs fundamental spelling errors
export function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1].toLowerCase() === str2[j - 1].toLowerCase() ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[len1][len2];
}

// Score spelling with tolerance for minor errors
export function scoreSpelling(userAnswer, correctAnswer) {
  const distance = levenshteinDistance(userAnswer.trim(), correctAnswer);
  const maxLength = Math.max(userAnswer.length, correctAnswer.length);
  const similarity = 1 - (distance / maxLength);

  // Scoring criteria:
  // 100% = exact match
  // 80% = 1 character error in word >6 chars (e.g., "acommodation" vs "accommodation")
  // 50% = 2 character errors or phonetically close
  // 0% = fundamentally wrong

  if (similarity === 1) return 1.0;
  if (similarity >= 0.9 && correctAnswer.length > 6) return 0.8;
  if (similarity >= 0.75) return 0.5;
  return 0;
}

// Score grammar with flexible matching
export function scoreGrammar(userAnswer, correctAnswer) {
  const userNormalized = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
  const correctNormalized = correctAnswer.trim().toLowerCase().replace(/\s+/g, ' ');

  if (userNormalized === correctNormalized) return 1.0;

  // Check if key corrections were made
  const distance = levenshteinDistance(userNormalized, correctNormalized);
  const similarity = 1 - (distance / Math.max(userAnswer.length, correctAnswer.length));

  if (similarity >= 0.95) return 0.9; // Minor punctuation differences
  if (similarity >= 0.85) return 0.5; // Partial correction
  return 0;
}

// Calculate typing WPM with spelling accuracy (ignore grammar/punctuation)
export function calculateTypingScore(typedText, referenceText, timeInSeconds) {
  console.log('=== TYPING SCORE CALCULATION ===');
  console.log('Typed text:', typedText);
  console.log('Reference text:', referenceText);
  console.log('Time in seconds:', timeInSeconds);
  
  // Clean text for comparison (remove punctuation for word matching)
  const cleanTyped = typedText.trim().toLowerCase().replace(/[.,;:!?'"()-]/g, '');
  const cleanReference = referenceText.trim().toLowerCase().replace(/[.,;:!?'"()-]/g, '');
  
  // Get words
  const typedWords = cleanTyped.split(/\s+/).filter(w => w.length > 0);
  const referenceWords = cleanReference.split(/\s+/).filter(w => w.length > 0);
  
  console.log('Typed words count:', typedWords.length);
  console.log('Reference words count:', referenceWords.length);
  
  // Calculate WPM based on words typed and time elapsed
  const wordCount = typedWords.length;
  const rawWPM = timeInSeconds > 0 ? Math.round((wordCount / timeInSeconds) * 60) : 0;
  
  console.log('Raw WPM calculation:', `(${wordCount} / ${timeInSeconds}) * 60 = ${rawWPM}`);

  // Calculate spelling accuracy - compare ONLY the words typed against reference
  let correctWords = 0;
  const wordsToCheck = Math.min(typedWords.length, referenceWords.length);
  
  for (let i = 0; i < wordsToCheck; i++) {
    // Exact match or very close (1 character off for words >4 chars)
    if (typedWords[i] === referenceWords[i]) {
      correctWords++;
    } else if (typedWords[i].length > 4 && referenceWords[i].length > 4) {
      const distance = levenshteinDistance(typedWords[i], referenceWords[i]);
      if (distance <= 1) {
        correctWords += 0.8; // Partial credit for close spelling
      }
    }
  }
  
  console.log('Correct words:', correctWords, 'out of', typedWords.length);
  
  // Spelling accuracy: correct words out of words TYPED (not total reference words)
  const spellingAccuracy = typedWords.length > 0 
    ? Math.round((correctWords / typedWords.length) * 100) 
    : 0;

  // Overall typing accuracy based on words typed vs reference words typed
  const overallAccuracy = typedWords.length > 0
    ? Math.round((correctWords / typedWords.length) * 100)
    : 0;

  console.log('Spelling accuracy:', spellingAccuracy);
  console.log('Overall accuracy:', overallAccuracy);
  console.log('Raw WPM (FINAL):', rawWPM);
  console.log('=== END CALCULATION ===');

  return {
    rawWPM: rawWPM,
    accuracy: overallAccuracy,
    adjustedWPM: rawWPM,  // Use rawWPM as the final WPM (no penalty)
    errors: Math.round(typedWords.length - correctWords),
    spellingAccuracy: spellingAccuracy,
    grammarAccuracy: 0  // Not used for typing test
  };
}

// Calculate reading speed
export function calculateReadingWPM(wordCount, timeInSeconds) {
  return Math.round((wordCount / timeInSeconds) * 60);
}

// Overall assessment grading (only use spelling from typing, ignore typing grammar)
export function calculateOverallGrade(scores) {
  const {
    spellingScore,
    grammarScore,
    readingWPM,
    readingAccuracy,
    typingWPM,
    typingAccuracy,
    typingSpellingScore
  } = scores;

  console.log('=== OVERALL GRADE CALCULATION ===');
  console.log('Input scores:', scores);

  // Calculate AVERAGE spelling (test + typing spelling only)
  const avgSpellingScore = (spellingScore + typingSpellingScore) / 2;
  
  // Grammar score is ONLY from the grammar test (no typing grammar)
  const avgGrammarScore = grammarScore;

  console.log('Average spelling:', avgSpellingScore);
  console.log('Grammar (test only):', avgGrammarScore);

  // Weighted scoring (priority order: spelling/grammar > reading > typing speed)
  const spellingGrammarWeight = 0.40;
  const readingWeight = 0.35;
  const typingWeight = 0.25;

  // Normalize all scores to 0-100
  const spellingNormalized = avgSpellingScore; // Already percentage
  const grammarNormalized = avgGrammarScore; // Already percentage
  const readingWPMNormalized = Math.min(100, (readingWPM / 250) * 100); // 250 WPM = 100%
  const typingWPMNormalized = Math.min(100, (typingWPM / 60) * 100); // 60 WPM = 100%

  console.log('Typing WPM normalized:', typingWPMNormalized, 'from', typingWPM, 'WPM');

  // Combined scores
  const spellingGrammarCombined = (spellingNormalized + grammarNormalized) / 2;
  const readingCombined = (readingWPMNormalized * 0.6) + (readingAccuracy * 0.4);
  const typingCombined = (typingWPMNormalized * 0.6) + (typingAccuracy * 0.4);

  const weightedScore = 
    (spellingGrammarCombined * spellingGrammarWeight) +
    (readingCombined * readingWeight) +
    (typingCombined * typingWeight);

  console.log('Weighted overall score:', weightedScore);

  // Determine recommendation (using AVERAGE spelling and grammar from test only)
  let recommendation = '';
  if (weightedScore >= 75 && avgSpellingScore >= 70 && avgGrammarScore >= 70 && typingWPM >= 35) {
    recommendation = 'SUITABLE - Strong candidate for TA/RW role';
  } else if (weightedScore >= 60 && avgSpellingScore >= 60 && avgGrammarScore >= 60) {
    recommendation = 'REVIEW - May be suitable with support or specific placement';
  } else {
    recommendation = 'NOT RECOMMENDED - Does not meet minimum competency standards';
  }

  console.log('Recommendation:', recommendation);
  console.log('=== END OVERALL GRADE ===');

  return {
    overallScore: Math.round(weightedScore),
    recommendation,
    breakdown: {
      spellingGrammar: Math.round(spellingGrammarCombined),
      reading: Math.round(readingCombined),
      typing: Math.round(typingCombined)
    }
  };
}

// Generate unique assessment code
export function generateAssessmentCode() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `TA-${timestamp}-${random}`.toUpperCase();
}

// Format date for NZ context
export function formatNZDate(date) {
  return new Intl.DateTimeFormat('en-NZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}
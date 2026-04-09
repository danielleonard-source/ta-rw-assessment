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

// Calculate typing WPM with accuracy penalty
export function calculateTypingScore(typedText, referenceText, timeInSeconds) {
  // Calculate words typed
  const words = typedText.trim().split(/\s+/).filter(w => w.length > 0).length;
  
  // Calculate WPM based on elapsed time
  const rawWPM = timeInSeconds > 0 ? (words / timeInSeconds) * 60 : 0;

  // Calculate accuracy using Levenshtein distance
  const distance = levenshteinDistance(typedText.trim(), referenceText.trim());
  const maxLength = Math.max(typedText.length, referenceText.length);
  const accuracy = Math.max(0, 1 - (distance / maxLength));

  // Accuracy penalty: subtract 1 WPM per 1% error
  const accuracyPenalty = (1 - accuracy) * 100;
  const adjustedWPM = Math.max(0, rawWPM - accuracyPenalty);

  // Calculate spelling accuracy (word-by-word)
  const typedWords = typedText.trim().toLowerCase().split(/\s+/);
  const referenceWords = referenceText.trim().toLowerCase().split(/\s+/);
  let correctWords = 0;
  
  const minLength = Math.min(typedWords.length, referenceWords.length);
  for (let i = 0; i < minLength; i++) {
    if (typedWords[i] === referenceWords[i]) {
      correctWords++;
    }
  }
  
  const spellingAccuracy = minLength > 0 ? (correctWords / referenceWords.length) * 100 : 0;

  // Calculate grammar/punctuation accuracy
  const grammarAccuracy = accuracy * 100;

  return {
    rawWPM: Math.round(rawWPM),
    accuracy: Math.round(accuracy * 100),
    adjustedWPM: Math.round(adjustedWPM),
    errors: distance,
    spellingAccuracy: Math.round(spellingAccuracy),
    grammarAccuracy: Math.round(grammarAccuracy)
  };
}

// Calculate reading speed
export function calculateReadingWPM(wordCount, timeInSeconds) {
  return Math.round((wordCount / timeInSeconds) * 60);
}

// Overall assessment grading with typing spelling/grammar included
export function calculateOverallGrade(scores) {
  const {
    spellingScore,
    grammarScore,
    readingWPM,
    readingAccuracy,
    typingWPM,
    typingAccuracy,
    typingSpellingScore,
    typingGrammarScore
  } = scores;

  // Calculate AVERAGE spelling and grammar (test + typing)
  const avgSpellingScore = (spellingScore + typingSpellingScore) / 2;
  const avgGrammarScore = (grammarScore + typingGrammarScore) / 2;

  // Weighted scoring (priority order: spelling/grammar > reading > typing speed)
  const spellingGrammarWeight = 0.40;
  const readingWeight = 0.35;
  const typingWeight = 0.25;

  // Normalize all scores to 0-100
  const spellingNormalized = avgSpellingScore; // Already percentage
  const grammarNormalized = avgGrammarScore; // Already percentage
  const readingWPMNormalized = Math.min(100, (readingWPM / 250) * 100); // 250 WPM = 100%
  const typingWPMNormalized = Math.min(100, (typingWPM / 60) * 100); // 60 WPM = 100%

  // Combined scores
  const spellingGrammarCombined = (spellingNormalized + grammarNormalized) / 2;
  const readingCombined = (readingWPMNormalized * 0.6) + (readingAccuracy * 0.4);
  const typingCombined = (typingWPMNormalized * 0.6) + (typingAccuracy * 0.4);

  const weightedScore = 
    (spellingGrammarCombined * spellingGrammarWeight) +
    (readingCombined * readingWeight) +
    (typingCombined * typingWeight);

  // Determine recommendation (using AVERAGE spelling/grammar)
  let recommendation = '';
  if (weightedScore >= 75 && avgSpellingScore >= 70 && avgGrammarScore >= 70 && typingWPM >= 35) {
    recommendation = 'SUITABLE - Strong candidate for TA/RW role';
  } else if (weightedScore >= 60 && avgSpellingScore >= 60 && avgGrammarScore >= 60) {
    recommendation = 'REVIEW - May be suitable with support or specific placement';
  } else {
    recommendation = 'NOT RECOMMENDED - Does not meet minimum competency standards';
  }

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
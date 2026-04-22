// Levenshtein distance for spelling assessment
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

// Score individual spelling word
export function scoreSpelling(userAnswer, correctAnswer) {
  const distance = levenshteinDistance(userAnswer.trim(), correctAnswer);
  const maxLength = Math.max(userAnswer.length, correctAnswer.length);
  const similarity = 1 - (distance / maxLength);

  if (similarity === 1) return 1.0;
  if (similarity >= 0.9 && correctAnswer.length > 6) return 0.8;
  if (similarity >= 0.75) return 0.5;
  return 0;
}

// Calculate spelling test breakdown by difficulty
export function calculateSpellingBreakdown(answers, words) {
  const breakdown = {
    basic: { correct: 0, total: 0, score: 0 },
    intermediate: { correct: 0, total: 0, score: 0 },
    advanced: { correct: 0, total: 0, score: 0 },
    expert: { correct: 0, total: 0, score: 0 }
  };

  answers.forEach((answer, idx) => {
    const word = words[idx];
    const score = scoreSpelling(answer, word.word);
    const category = word.category;

    breakdown[category].total++;
    if (score >= 0.8) {
      breakdown[category].correct++;
    }
  });

  Object.keys(breakdown).forEach(category => {
    const { correct, total } = breakdown[category];
    breakdown[category].score = total > 0 ? Math.round((correct / total) * 100) : 0;
  });

  const totalCorrect = Object.values(breakdown).reduce((sum, cat) => sum + cat.correct, 0);
  const totalWords = Object.values(breakdown).reduce((sum, cat) => sum + cat.total, 0);
  const totalScore = totalWords > 0 ? Math.round((totalCorrect / totalWords) * 100) : 0;

  return { ...breakdown, totalScore };
}

// Score individual grammar sentence
export function scoreGrammar(userAnswer, correctAnswer) {
  const userNormalized = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
  const correctNormalized = correctAnswer.trim().toLowerCase().replace(/\s+/g, ' ');

  if (userNormalized === correctNormalized) return 1.0;

  const distance = levenshteinDistance(userNormalized, correctNormalized);
  const similarity = 1 - (distance / Math.max(userAnswer.length, correctAnswer.length));

  if (similarity >= 0.95) return 0.9;
  if (similarity >= 0.85) return 0.5;
  return 0;
}

// Calculate grammar test breakdown by difficulty
export function calculateGrammarBreakdown(answers, sentences) {
  const breakdown = {
    basic: { correct: 0, total: 0, score: 0 },
    intermediate: { correct: 0, total: 0, score: 0 },
    advanced: { correct: 0, total: 0, score: 0 },
    expert: { correct: 0, total: 0, score: 0 }
  };

  answers.forEach((answer, idx) => {
    const sentence = sentences[idx];
    const score = scoreGrammar(answer, sentence.correct);
    const category = sentence.category;

    if (breakdown[category]) {
      breakdown[category].total++;
      if (score >= 0.9) {
        breakdown[category].correct++;
      }
    }
  });

  Object.keys(breakdown).forEach(category => {
    const { correct, total } = breakdown[category];
    breakdown[category].score = total > 0 ? Math.round((correct / total) * 100) : 0;
  });

  const totalCorrect = Object.values(breakdown).reduce((sum, cat) => sum + cat.correct, 0);
  const totalSentences = Object.values(breakdown).reduce((sum, cat) => sum + cat.total, 0);
  const totalScore = totalSentences > 0 ? Math.round((totalCorrect / totalSentences) * 100) : 0;

  return { ...breakdown, totalScore };
}

// Calculate reading WPM
export function calculateReadingWPM(wordCount, timeInSeconds) {
  if (timeInSeconds <= 0) return 0;
  return Math.round((wordCount / timeInSeconds) * 60);
}

// Calculate typing score
export function calculateTypingScore(typedText, referenceText, timeInSeconds) {
  console.log('=== TYPING SCORE CALCULATION ===');
  console.log('Time in seconds:', timeInSeconds);
  
  const cleanTyped = typedText.trim().toLowerCase().replace(/[.,;:!?'"()-]/g, '');
  const cleanReference = referenceText.trim().toLowerCase().replace(/[.,;:!?'"()-]/g, '');
  
  const typedWords = cleanTyped.split(/\s+/).filter(w => w.length > 0);
  const referenceWords = cleanReference.split(/\s+/).filter(w => w.length > 0);
  
  console.log('Typed words count:', typedWords.length);
  
  const wordCount = typedWords.length;
  const rawWPM = timeInSeconds > 0 ? Math.round((wordCount / timeInSeconds) * 60) : 0;
  
  console.log('Raw WPM:', rawWPM);

  let correctWords = 0;
  const wordsToCheck = Math.min(typedWords.length, referenceWords.length);
  
  for (let i = 0; i < wordsToCheck; i++) {
    if (typedWords[i] === referenceWords[i]) {
      correctWords++;
    } else if (typedWords[i].length > 4 && referenceWords[i].length > 4) {
      const distance = levenshteinDistance(typedWords[i], referenceWords[i]);
      if (distance <= 1) {
        correctWords += 0.8;
      }
    }
  }
  
  const spellingAccuracy = typedWords.length > 0 
    ? Math.round((correctWords / typedWords.length) * 100) 
    : 0;

  console.log('Spelling accuracy:', spellingAccuracy);
  console.log('=== END CALCULATION ===');

  return {
    rawWPM: rawWPM,
    accuracy: spellingAccuracy,
    adjustedWPM: rawWPM,
    errors: Math.round(typedWords.length - correctWords),
    spellingAccuracy: spellingAccuracy,
    grammarAccuracy: 0
  };
}

// Calculate overall grade - UPDATED WEIGHTS AND THRESHOLDS
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

  const avgSpellingScore = (spellingScore + typingSpellingScore) / 2;
  const avgGrammarScore = grammarScore;

  // NEW WEIGHTS: Spelling/Grammar/Typing Accuracy carry most weight
  // Spelling & Grammar: 50%, Typing Accuracy: 25%, Reading: 15%, Typing Speed: 10%
  const spellingGrammarWeight = 0.50;  // 50% - most important
  const typingAccuracyWeight = 0.25;   // 25% - second most important
  const readingWeight = 0.15;           // 15%
  const typingSpeedWeight = 0.10;       // 10%

  // Normalize scores to 0-100
  const spellingNormalized = avgSpellingScore;
  const grammarNormalized = avgGrammarScore;
  const readingWPMNormalized = Math.min(100, (readingWPM / 200) * 100); // 200 WPM = 100%
  const typingWPMNormalized = Math.min(100, (typingWPM / 40) * 100);    // 40 WPM = 100%

  // Combined spelling/grammar (average of both)
  const spellingGrammarCombined = (spellingNormalized + grammarNormalized) / 2;
  
  // Reading combined: 50% WPM + 50% accuracy
  const readingCombined = (readingWPMNormalized * 0.5) + (readingAccuracy * 0.5);

  // Apply weights
  const weightedScore = 
    (spellingGrammarCombined * spellingGrammarWeight) +
    (typingAccuracy * typingAccuracyWeight) +
    (readingCombined * readingWeight) +
    (typingWPMNormalized * typingSpeedWeight);

  console.log('Spelling/Grammar combined:', spellingGrammarCombined);
  console.log('Typing accuracy:', typingAccuracy);
  console.log('Reading combined:', readingCombined);
  console.log('Typing WPM normalized:', typingWPMNormalized);
  console.log('Weighted score:', weightedScore);

  // NEW THRESHOLDS: More inclusive
  // 75%+ = SUITABLE (great)
  // 60-74% = REVIEW (possibly considerable)
  // <60% = NOT RECOMMENDED
  let recommendation = '';
  if (weightedScore >= 75 && avgSpellingScore >= 65 && avgGrammarScore >= 65) {
    recommendation = 'SUITABLE - Strong candidate for TA/RW role';
  } else if (weightedScore >= 60 && avgSpellingScore >= 50 && avgGrammarScore >= 50) {
    recommendation = 'POSSIBLE - May be suitable with support or specific placement';
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
      typingAccuracy: Math.round(typingAccuracy),
      reading: Math.round(readingCombined),
      typingSpeed: Math.round(typingWPMNormalized)
    }
  };
}

// Generate assessment code
export function generateAssessmentCode() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `TA-${timestamp}-${random}`.toUpperCase();
}

// Format NZ date
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

import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import SpellingTest from './components/SpellingTest';
import GrammarTest from './components/GrammarTest';
import ReadingTest from './components/ReadingTest';
import TypingTest from './components/TypingTest';
import ThankYou from './components/ThankYou';
import AdminDashboard from './components/AdminDashboard';
import { spellingWords, grammarSentences, readingPassages } from './data/assessmentData';
import { 
  scoreSpelling, 
  scoreGrammar, 
  calculateReadingWPM,
  calculateTypingScore,
  calculateOverallGrade,
  formatNZDate
} from './utils/scoring';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWcxmFZ2S4upR2oUbRpolwg4jL2zvDQX-5kSR6AM3J6b1HASL07QS5-1jMHvbI1yHYIg/exec';

function AssessmentApp() {
  const [stage, setStage] = useState('welcome');
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [results, setResults] = useState({
    spelling: null,
    grammar: null,
    reading: null,
    typing: null
  });

  const handleStart = (info) => {
    setCandidateInfo(info);
    setStage('spelling');
  };

  const handleSpellingComplete = (answers) => {
    const scores = answers.map((answer, idx) => 
      scoreSpelling(answer, spellingWords[idx].word)
    );
    const totalScore = Math.round(
      (scores.reduce((sum, score) => sum + score, 0) / scores.length) * 100
    );
    
    setResults(prev => ({
      ...prev,
      spelling: { answers, scores, totalScore }
    }));
    setStage('grammar');
  };

  const handleGrammarComplete = (answers) => {
    const scores = answers.map((answer, idx) => 
      scoreGrammar(answer, grammarSentences[idx].correct)
    );
    const totalScore = Math.round(
      (scores.reduce((sum, score) => sum + score, 0) / scores.length) * 100
    );
    
    setResults(prev => ({
      ...prev,
      grammar: { answers, scores, totalScore }
    }));
    setStage('reading');
  };

  const handleReadingComplete = (passageResults) => {
    let totalCorrect = 0;
    let totalQuestions = 0;
    let totalWPM = 0;

    passageResults.forEach(result => {
      const passage = readingPassages.find(p => p.id === result.passageId);
      const wpm = calculateReadingWPM(result.wordCount, result.readingTime);
      totalWPM += wpm;

      passage.questions.forEach(question => {
        totalQuestions++;
        if (result.answers[question.id] === question.correct) {
          totalCorrect++;
        }
      });
    });

    const averageWPM = Math.round(totalWPM / passageResults.length);
    const accuracy = Math.round((totalCorrect / totalQuestions) * 100);

    setResults(prev => ({
      ...prev,
      reading: { 
        passageResults, 
        averageWPM, 
        accuracy,
        totalCorrect,
        totalQuestions
      }
    }));
    setStage('typing');
  };

  const handleTypingComplete = (typingData) => {
    const typingScore = calculateTypingScore(
      typingData.typedText,
      typingData.referenceText,
      typingData.timeInSeconds
    );

    setResults(prev => ({
      ...prev,
      typing: typingScore
    }));

    submitResults(typingScore);
  };

  const submitResults = async (typingScore) => {
    // All scores are already in percentage format (0-100)
    const finalScores = {
      spellingScore: results.spelling.totalScore,           // Test spelling
      grammarScore: results.grammar.totalScore,             // Test grammar (only source)
      readingWPM: results.reading.averageWPM,
      readingAccuracy: results.reading.accuracy,
      typingWPM: typingScore.adjustedWPM,
      typingAccuracy: typingScore.accuracy,
      typingSpellingScore: typingScore.spellingAccuracy    // Typing spelling only
    };

    const overallGrade = calculateOverallGrade(finalScores);

    // Calculate average spelling (test + typing)
    const avgSpelling = Math.round((finalScores.spellingScore + finalScores.typingSpellingScore) / 2);
    
    // Grammar is ONLY from grammar test (no typing grammar)
    const grammarScore = finalScores.grammarScore;

    const submissionData = {
      timestamp: formatNZDate(new Date()),
      candidateName: candidateInfo.candidateName,
      candidateEmail: candidateInfo.candidateEmail,
      assessmentCode: candidateInfo.assessmentCode,
      spellingScore: avgSpelling,              // AVERAGE of test + typing
      grammarScore: grammarScore,              // ONLY from grammar test
      readingWPM: finalScores.readingWPM,
      readingAccuracy: finalScores.readingAccuracy,
      typingWPM: finalScores.typingWPM,
      typingAccuracy: finalScores.typingAccuracy,
      overallScore: overallGrade.overallScore,
      recommendation: overallGrade.recommendation
    };

    console.log('Submitting data:', submissionData); // Debug log

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      console.log('Results submitted successfully');
    } catch (error) {
      console.error('Error submitting results:', error);
    }

    setStage('thankyou');
  };

  return (
    <div>
      {stage === 'welcome' && <Welcome onStart={handleStart} />}
      {stage === 'spelling' && <SpellingTest onComplete={handleSpellingComplete} />}
      {stage === 'grammar' && <GrammarTest onComplete={handleGrammarComplete} />}
      {stage === 'reading' && <ReadingTest onComplete={handleReadingComplete} />}
      {stage === 'typing' && <TypingTest onComplete={handleTypingComplete} />}
      {stage === 'thankyou' && <ThankYou candidateName={candidateInfo?.candidateName} />}
    </div>
  );
}

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Check if URL contains "admin" in any form
    const url = window.location.href.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    
    if (url.includes('admin') || hash.includes('admin') || pathname.includes('admin') || search.includes('admin')) {
      setShowAdmin(true);
    }
  }, []);

  // Show admin dashboard if URL contains "admin"
  if (showAdmin) {
    return <AdminDashboard />;
  }

  // Otherwise show assessment
  return <AssessmentApp />;
}

export default App;
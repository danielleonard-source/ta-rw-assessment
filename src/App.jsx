import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// **IMPORTANT**: Replace this with your deployed Google Apps Script URL
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
    // Calculate average WPM and accuracy across both passages
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

    // Submit all results to Google Sheets
    submitResults(typingScore);
  };

  const submitResults = async (typingScore) => {
    const finalScores = {
      spellingScore: results.spelling.totalScore,
      grammarScore: results.grammar.totalScore,
      readingWPM: results.reading.averageWPM,
      readingAccuracy: results.reading.accuracy,
      typingWPM: typingScore.adjustedWPM,
      typingAccuracy: typingScore.accuracy
    };

    const overallGrade = calculateOverallGrade(finalScores);

    const submissionData = {
      timestamp: formatNZDate(new Date()),
      candidateName: candidateInfo.candidateName,
      candidateEmail: candidateInfo.candidateEmail,
      assessmentCode: candidateInfo.assessmentCode,
      ...finalScores,
      overallScore: overallGrade.overallScore,
      recommendation: overallGrade.recommendation
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
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
      // Still show thank you page even if submission fails
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
  return (
    <Router basename="/ta-rw-assessment">
      <Routes>
        <Route path="/" element={<AssessmentApp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

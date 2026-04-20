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
  calculateSpellingBreakdown,
  calculateGrammarBreakdown,
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
    const breakdown = calculateSpellingBreakdown(answers, spellingWords);
    setResults(prev => ({
      ...prev,
      spelling: { answers, breakdown }
    }));
    setStage('grammar');
  };

  const handleGrammarComplete = (answers) => {
    const breakdown = calculateGrammarBreakdown(answers, grammarSentences);
    setResults(prev => ({
      ...prev,
      grammar: { answers, breakdown }
    }));
    setStage('reading');
  };

  const handleReadingComplete = (passageResults) => {
    console.log('=== APP.JSX READING PROCESSING ===');
    console.log('Passage results received:', passageResults);
    
    let totalCorrect = 0;
    let totalQuestions = 0;
    let totalWPM = 0;
    let validWPMCount = 0;

    passageResults.forEach(result => {
      const passage = readingPassages.find(p => p.id === result.passageId);
      
      // Calculate WPM for this passage
      let wpm = 0;
      if (result.readingTime > 0) {
        wpm = Math.round((result.wordCount / result.readingTime) * 60);
      }
      
      console.log(`Passage ${result.passageId}:`);
      console.log(`  - Word count: ${result.wordCount}`);
      console.log(`  - Reading time: ${result.readingTime}s`);
      console.log(`  - WPM: ${wpm}`);
      
      if (wpm > 0) {
        totalWPM += wpm;
        validWPMCount++;
      }

      // Count correct answers
      passage.questions.forEach(question => {
        totalQuestions++;
        if (result.answers[question.id] === question.correct) {
          totalCorrect++;
        }
      });
    });

    // Average WPM only from valid passages
    const averageWPM = validWPMCount > 0 ? Math.round(totalWPM / validWPMCount) : 0;
    const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    console.log('=== FINAL READING SCORES ===');
    console.log('Total WPM:', totalWPM);
    console.log('Valid WPM count:', validWPMCount);
    console.log('Average WPM:', averageWPM);
    console.log('Accuracy:', accuracy);
    console.log('=== END ===');

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
    const finalScores = {
      spellingScore: results.spelling.breakdown.totalScore,
      grammarScore: results.grammar.breakdown.totalScore,
      readingWPM: results.reading.averageWPM,
      readingAccuracy: results.reading.accuracy,
      typingWPM: typingScore.adjustedWPM,
      typingAccuracy: typingScore.accuracy,
      typingSpellingScore: typingScore.spellingAccuracy
    };

    const overallGrade = calculateOverallGrade(finalScores);

    const avgSpelling = Math.round((finalScores.spellingScore + finalScores.typingSpellingScore) / 2);
    const grammarScore = finalScores.grammarScore;

    const submissionData = {
      timestamp: formatNZDate(new Date()),
      candidateName: candidateInfo.candidateName,
      candidateEmail: candidateInfo.candidateEmail,
      assessmentCode: candidateInfo.assessmentCode,
      spellingScore: avgSpelling,
      grammarScore: grammarScore,
      readingWPM: finalScores.readingWPM,
      readingAccuracy: finalScores.readingAccuracy,
      typingWPM: finalScores.typingWPM,
      typingAccuracy: finalScores.typingAccuracy,
      overallScore: overallGrade.overallScore,
      recommendation: overallGrade.recommendation,
      spellingBasic: results.spelling.breakdown.basic.score,
      spellingIntermediate: results.spelling.breakdown.intermediate.score,
      spellingAdvanced: results.spelling.breakdown.advanced.score,
      spellingExpert: results.spelling.breakdown.expert.score,
      grammarBasic: results.grammar.breakdown.basic.score,
      grammarIntermediate: results.grammar.breakdown.intermediate.score,
      grammarAdvanced: results.grammar.breakdown.advanced.score
    };

    console.log('Submitting data:', submissionData);

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
    const url = window.location.href.toLowerCase();
    if (url.includes('admin')) {
      setShowAdmin(true);
    }
  }, []);

  if (showAdmin) {
    return <AdminDashboard />;
  }

  return <AssessmentApp />;
}

export default App;

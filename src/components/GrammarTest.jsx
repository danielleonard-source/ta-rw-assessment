import React, { useState } from 'react';
import { grammarSentences } from '../data/assessmentData';

export default function GrammarTest({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(grammarSentences.length).fill(''));
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentSentence = grammarSentences[currentIndex];

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = currentAnswer;
    setAnswers(newAnswers);

    if (currentIndex < grammarSentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = currentAnswer;
    setAnswers(newAnswers);

    setCurrentIndex(currentIndex - 1);
    setCurrentAnswer(answers[currentIndex - 1]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          borderBottom: '3px solid #1d5693',
          paddingBottom: '20px',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '28px',
            color: '#002060',
            marginBottom: '10px'
          }}>
            Grammar & Punctuation Assessment
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Each sentence contains one or more errors. Retype the sentence with all corrections made.
          </p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#002060', fontWeight: 'bold' }}>
              Sentence {currentIndex + 1} of {grammarSentences.length}
            </span>
            <span style={{ color: '#666' }}>
              {Math.round(((currentIndex + 1) / grammarSentences.length) * 100)}% Complete
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((currentIndex + 1) / grammarSentences.length) * 100}%`,
              height: '100%',
              background: '#009bd8',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        {/* Incorrect Sentence Display */}
        <div style={{
          background: '#fff3e0',
          border: '2px solid #ff9800',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '25px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <span style={{
              background: '#ff9800',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              marginRight: '12px'
            }}>
              CONTAINS ERRORS
            </span>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Difficulty: {' '}
              <span style={{
                color: currentSentence.difficulty === 1 ? '#4caf50' :
                       currentSentence.difficulty === 2 ? '#ff9800' : '#f44336',
                fontWeight: 'bold'
              }}>
                {currentSentence.difficulty === 1 ? 'Basic' :
                 currentSentence.difficulty === 2 ? 'Intermediate' : 'Advanced'}
              </span>
            </span>
          </div>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: 'Georgia, serif',
            margin: 0
          }}>
            {currentSentence.incorrect}
          </p>
        </div>

        {/* Correction Input */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            marginBottom: '12px',
            color: '#002060',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Type the corrected sentence:
          </label>
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Retype the sentence with all corrections made..."
            autoFocus
            rows={4}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.6',
              resize: 'vertical'
            }}
            onFocus={(e) => e.target.style.borderColor = '#009bd8'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <p style={{
            marginTop: '10px',
            fontSize: '14px',
            color: '#666',
            fontStyle: 'italic'
          }}>
            💡 Tip: Check for spelling, grammar, punctuation, and word choice errors
          </p>
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            style={{
              padding: '14px 30px',
              fontSize: '16px',
              color: currentIndex === 0 ? '#ccc' : '#1d5693',
              background: 'white',
              border: `2px solid ${currentIndex === 0 ? '#ccc' : '#1d5693'}`,
              borderRadius: '8px',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!currentAnswer.trim()}
            style={{
              padding: '14px 30px',
              fontSize: '16px',
              color: 'white',
              background: currentAnswer.trim() ? '#1d5693' : '#ccc',
              border: 'none',
              borderRadius: '8px',
              cursor: currentAnswer.trim() ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              flex: 1
            }}
            onMouseOver={(e) => currentAnswer.trim() && (e.target.style.background = '#002060')}
            onMouseOut={(e) => currentAnswer.trim() && (e.target.style.background = '#1d5693')}
          >
            {currentIndex === grammarSentences.length - 1 ? 'Submit Grammar Test' : 'Next Sentence →'}
          </button>
        </div>

        {/* Error Type Hint */}
        <div style={{
          marginTop: '25px',
          padding: '15px',
          background: '#f0f7ff',
          border: '1px solid #009bd8',
          borderRadius: '8px'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#002060',
            lineHeight: '1.6'
          }}>
            <strong>Common error types to watch for:</strong> Subject-verb agreement, homophones 
            (their/there/they're, its/it's), punctuation, parallel structure, pronoun case, 
            word choice (affect/effect, less/fewer)
          </p>
        </div>
      </div>
    </div>
  );
}

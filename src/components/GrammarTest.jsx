import React, { useState } from 'react';
import { grammarSentences } from '../data/assessmentData';

export default function GrammarTest({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(grammarSentences.length).fill(''));
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentSentence = grammarSentences[currentIndex];

  const handleStart = () => {
    setHasStarted(true);
  };

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

  if (!hasStarted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '28px',
            color: '#002060',
            marginBottom: '20px'
          }}>
            Grammar Assessment
          </h2>

          <div style={{
            background: '#f0f7ff',
            border: '2px solid #009bd8',
            borderRadius: '8px',
            padding: '25px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '18px',
              color: '#002060',
              marginBottom: '15px'
            }}>
              Instructions:
            </h3>
            <ul style={{
              color: '#333',
              lineHeight: '1.8',
              paddingLeft: '20px'
            }}>
              <li>You will see <strong>15 sentences</strong> with grammar errors</li>
              <li><strong>Read each sentence carefully</strong></li>
              <li><strong>Correct the errors</strong> and rewrite the sentence properly</li>
              <li>Fix spelling, punctuation, capitalization, and grammar</li>
              <li>Click <strong>"Next Sentence"</strong> when ready to move on</li>
            </ul>
          </div>

          <div style={{
            background: '#e8f5e9',
            border: '2px solid #4caf50',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <p style={{
              margin: 0,
              color: '#2e7d32',
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              <strong>💡 Tip:</strong> Look for errors in spelling, subject-verb agreement, punctuation, and word choice.
            </p>
          </div>

          <button
            onClick={handleStart}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              background: '#1d5693',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.background = '#002060'}
            onMouseOut={(e) => e.target.style.background = '#1d5693'}
          >
            Begin Grammar Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
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
            Grammar Assessment
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Read each sentence carefully and correct any grammar, spelling, or punctuation errors.
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
          background: '#ffebee',
          border: '2px solid #f44336',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#c62828',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            INCORRECT SENTENCE (fix the errors):
          </label>
          <p style={{
            fontSize: '18px',
            color: '#333',
            margin: 0,
            lineHeight: '1.6',
            fontFamily: 'Georgia, serif'
          }}>
            {currentSentence.incorrect}
          </p>
        </div>

        {/* Input Field */}
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
            placeholder="Type your corrected sentence here..."
            rows={4}
            autoFocus
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

        {/* Hint */}
        <div style={{
          marginTop: '25px',
          padding: '12px',
          background: '#f9f9f9',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <span style={{ color: '#666', fontSize: '14px' }}>
            💡 Check for spelling, punctuation, capitalization, and grammar errors
          </span>
        </div>
      </div>
    </div>
  );
}
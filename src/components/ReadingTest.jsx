import React, { useState } from 'react';
import { readingPassages } from '../data/assessmentData';

export default function ReadingTest({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [isReading, setIsReading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const currentPassage = readingPassages[currentPassageIndex];

  const handleStart = () => {
    setHasStarted(true);
    setStartTime(Date.now());
  };

  const handleFinishReading = () => {
    const readingTime = (Date.now() - startTime) / 1000;
    setIsReading(false);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmitPassage = () => {
    const readingTime = isReading ? (Date.now() - startTime) / 1000 : 
                        results.find(r => r.passageId === currentPassage.id)?.readingTime || 0;

    const passageResult = {
      passageId: currentPassage.id,
      answers,
      wordCount: currentPassage.wordCount,
      readingTime
    };

    const newResults = [...results.filter(r => r.passageId !== currentPassage.id), passageResult];
    setResults(newResults);

    if (currentPassageIndex < readingPassages.length - 1) {
      setCurrentPassageIndex(currentPassageIndex + 1);
      setIsReading(true);
      setStartTime(Date.now());
      setAnswers({});
    } else {
      onComplete(newResults);
    }
  };

  const allQuestionsAnswered = currentPassage.questions.every(q => answers[q.id]);

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
            Reading Comprehension Assessment
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
              <li>You will read <strong>2 passages</strong></li>
              <li><strong>Read each passage carefully</strong> - your reading speed will be timed</li>
              <li>Click <strong>"Finish Reading"</strong> when done</li>
              <li><strong>Answer comprehension questions</strong> about each passage</li>
              <li>This tests both <strong>reading speed and comprehension</strong></li>
            </ul>
          </div>

          <div style={{
            background: '#fff3e0',
            border: '2px solid #ff9800',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <p style={{
              margin: 0,
              color: '#e65100',
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              <strong>⚠️ Important:</strong> Read at your natural pace for best comprehension. The timer starts when you click "Begin Reading Test".
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
            Begin Reading Test
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
            Reading Comprehension - Passage {currentPassageIndex + 1} of {readingPassages.length}
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            {isReading ? 'Read the passage below. Click "Finish Reading" when done.' : 'Answer the comprehension questions.'}
          </p>
        </div>

        {/* Reading Passage */}
        {isReading && (
          <div>
            <div style={{
              background: '#f9f9f9',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              padding: '30px',
              marginBottom: '30px'
            }}>
              <h3 style={{
                fontSize: '22px',
                color: '#002060',
                marginBottom: '20px'
              }}>
                {currentPassage.title}
              </h3>
              <div style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#333',
                fontFamily: 'Georgia, serif'
              }}>
                {currentPassage.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} style={{ marginBottom: '15px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <button
              onClick={handleFinishReading}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '18px',
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
              Finish Reading → Answer Questions
            </button>
          </div>
        )}

        {/* Comprehension Questions */}
        {!isReading && (
          <div>
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
                fontWeight: 'bold'
              }}>
                ✓ Reading Complete! Now answer the questions below.
              </p>
            </div>

            {currentPassage.questions.map((question, qIdx) => (
              <div
                key={question.id}
                style={{
                  background: '#f9f9f9',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '25px',
                  marginBottom: '20px'
                }}
              >
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#002060',
                  marginBottom: '15px'
                }}>
                  Question {qIdx + 1}: {question.question}
                </p>

                {question.options.map((option) => (
                  <label
                    key={option}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      marginBottom: '10px',
                      background: answers[question.id] === option ? '#e3f2fd' : 'white',
                      border: `2px solid ${answers[question.id] === option ? '#1d5693' : '#ddd'}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      style={{ marginRight: '10px' }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}

            <button
              onClick={handleSubmitPassage}
              disabled={!allQuestionsAnswered}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: allQuestionsAnswered ? '#1d5693' : '#ccc',
                border: 'none',
                borderRadius: '8px',
                cursor: allQuestionsAnswered ? 'pointer' : 'not-allowed'
              }}
              onMouseOver={(e) => allQuestionsAnswered && (e.target.style.background = '#002060')}
              onMouseOut={(e) => allQuestionsAnswered && (e.target.style.background = '#1d5693')}
            >
              {currentPassageIndex < readingPassages.length - 1 
                ? 'Next Passage →' 
                : 'Submit Reading Test'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
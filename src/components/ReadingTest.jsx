import React, { useState, useEffect } from 'react';
import { readingPassages } from '../data/assessmentData';

export default function ReadingTest({ onComplete }) {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [isReading, setIsReading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [answers, setAnswers] = useState({});
  const [passageResults, setPassageResults] = useState([]);

  const currentPassage = readingPassages[currentPassageIndex];

  useEffect(() => {
    if (isReading) {
      setStartTime(Date.now());
    }
  }, [currentPassageIndex]);

  const handleFinishReading = () => {
    const endTime = Date.now();
    const timeInSeconds = (endTime - startTime) / 1000;
    setReadingTime(timeInSeconds);
    setIsReading(false);
  };

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  const handleSubmitPassage = () => {
    const result = {
      passageId: currentPassage.id,
      readingTime,
      answers,
      wordCount: currentPassage.wordCount
    };

    const newResults = [...passageResults, result];
    setPassageResults(newResults);

    if (currentPassageIndex < readingPassages.length - 1) {
      // Move to next passage
      setCurrentPassageIndex(currentPassageIndex + 1);
      setIsReading(true);
      setAnswers({});
      setReadingTime(0);
    } else {
      // Complete reading test
      onComplete(newResults);
    }
  };

  if (isReading) {
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
              Reading Comprehension Assessment
            </h2>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Passage {currentPassageIndex + 1} of {readingPassages.length} • 
              Read carefully - your reading speed is being timed
            </p>
          </div>

          {/* Timer indicator */}
          <div style={{
            background: '#fff3e0',
            border: '2px solid #ff9800',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <p style={{
              margin: 0,
              color: '#e65100',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              ⏱ Timer is running - Click "I've Finished Reading" when done
            </p>
          </div>

          {/* Passage */}
          <div style={{
            background: '#f9f9f9',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '22px',
              color: '#002060',
              marginBottom: '20px',
              fontFamily: 'Georgia, serif'
            }}>
              {currentPassage.title}
            </h3>
            <div style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#333',
              fontFamily: 'Georgia, serif'
            }}>
              {currentPassage.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '20px' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Finish Reading Button */}
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
            I've Finished Reading - Continue to Questions →
          </button>

          <p style={{
            marginTop: '15px',
            fontSize: '14px',
            color: '#666',
            textAlign: 'center'
          }}>
            Word count: {currentPassage.wordCount} words
          </p>
        </div>
      </div>
    );
  }

  // Questions view
  const allQuestionsAnswered = currentPassage.questions.every(q => answers[q.id] !== undefined);

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
            Comprehension Questions
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            {currentPassage.title} • Answer all {currentPassage.questions.length} questions
          </p>
        </div>

        {/* Reading Time Display */}
        <div style={{
          background: '#e8f5e9',
          border: '2px solid #4caf50',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            color: '#2e7d32',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            ✓ Reading completed in {Math.round(readingTime)} seconds 
            ({Math.round((currentPassage.wordCount / readingTime) * 60)} words per minute)
          </p>
        </div>

        {/* Questions */}
        {currentPassage.questions.map((question, idx) => (
          <div
            key={question.id}
            style={{
              marginBottom: '30px',
              padding: '25px',
              background: '#f9f9f9',
              borderRadius: '8px',
              border: answers[question.id] !== undefined ? '2px solid #4caf50' : '2px solid #e0e0e0'
            }}
          >
            <p style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#002060',
              marginBottom: '15px'
            }}>
              {idx + 1}. {question.question}
            </p>

            {question.options.map((option, optionIdx) => (
              <label
                key={optionIdx}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  marginBottom: '10px',
                  background: answers[question.id] === optionIdx ? '#e3f2fd' : 'white',
                  border: answers[question.id] === optionIdx ? '2px solid #1d5693' : '2px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (answers[question.id] !== optionIdx) {
                    e.currentTarget.style.background = '#f5f5f5';
                    e.currentTarget.style.borderColor = '#999';
                  }
                }}
                onMouseOut={(e) => {
                  if (answers[question.id] !== optionIdx) {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#ddd';
                  }
                }}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={answers[question.id] === optionIdx}
                  onChange={() => handleAnswerChange(question.id, optionIdx)}
                  style={{ marginRight: '12px' }}
                />
                <span style={{
                  fontSize: '16px',
                  color: '#333'
                }}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        ))}

        {/* Submit Button */}
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
            ? 'Continue to Next Passage →' 
            : 'Submit Reading Test'}
        </button>

        {!allQuestionsAnswered && (
          <p style={{
            marginTop: '15px',
            fontSize: '14px',
            color: '#f44336',
            textAlign: 'center'
          }}>
            Please answer all questions before continuing
          </p>
        )}
      </div>
    </div>
  );
}

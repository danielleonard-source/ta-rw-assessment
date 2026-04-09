import React, { useState, useEffect } from 'react';
import { spellingWords } from '../data/assessmentData';

export default function SpellingTest({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(spellingWords.length).fill(''));
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentWord = spellingWords[currentIndex];

  // Text-to-speech function
  const speakWord = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.cancel(); // Clear any previous speech
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto-play on component mount and word change
  useEffect(() => {
    speakWord();
  }, [currentIndex]);

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = currentAnswer;
    setAnswers(newAnswers);

    if (currentIndex < spellingWords.length - 1) {
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
            Spelling Assessment
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Listen to each word and type what you hear. You can replay the audio as many times as needed.
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
              Word {currentIndex + 1} of {spellingWords.length}
            </span>
            <span style={{ color: '#666' }}>
              {Math.round(((currentIndex + 1) / spellingWords.length) * 100)}% Complete
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
              width: `${((currentIndex + 1) / spellingWords.length) * 100}%`,
              height: '100%',
              background: '#009bd8',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        {/* Audio Playback */}
        <div style={{
          background: '#f0f7ff',
          border: '2px solid #009bd8',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <button
            onClick={speakWord}
            disabled={isPlaying}
            style={{
              background: isPlaying ? '#ccc' : '#1d5693',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '100px',
              height: '100px',
              fontSize: '48px',
              cursor: isPlaying ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              transition: 'background 0.3s',
              boxShadow: '0 4px 12px rgba(29, 86, 147, 0.3)'
            }}
            onMouseOver={(e) => !isPlaying && (e.target.style.background = '#002060')}
            onMouseOut={(e) => !isPlaying && (e.target.style.background = '#1d5693')}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <p style={{
            color: '#002060',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            {isPlaying ? 'Playing...' : 'Click to hear the word'}
          </p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            You can replay as many times as you need
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
            Type the word you heard:
          </label>
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here"
            autoFocus
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '20px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'monospace',
              letterSpacing: '1px'
            }}
            onFocus={(e) => e.target.style.borderColor = '#009bd8'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            onKeyPress={(e) => e.key === 'Enter' && handleNext()}
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
            {currentIndex === spellingWords.length - 1 ? 'Submit Spelling Test' : 'Next Word →'}
          </button>
        </div>

        {/* Difficulty Indicator */}
        <div style={{
          marginTop: '25px',
          padding: '12px',
          background: '#f9f9f9',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <span style={{ color: '#666', fontSize: '14px' }}>
            Difficulty Level: {' '}
            <span style={{
              color: currentWord.difficulty === 1 ? '#4caf50' :
                     currentWord.difficulty === 2 ? '#ff9800' :
                     currentWord.difficulty === 3 ? '#f44336' : '#9c27b0',
              fontWeight: 'bold'
            }}>
              {currentWord.difficulty === 1 ? 'Basic' :
               currentWord.difficulty === 2 ? 'Intermediate' :
               currentWord.difficulty === 3 ? 'Advanced' : 'Expert'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

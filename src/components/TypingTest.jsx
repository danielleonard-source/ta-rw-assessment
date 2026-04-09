import React, { useState, useEffect } from 'react';
import { typingText } from '../data/assessmentData';

export default function TypingTest({ onComplete }) {
  const [typedText, setTypedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
  const [startTime, setStartTime] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.9); // Default: 0.9 (slightly slower)

  // Split the passage into sentences
  const sentences = typingText.match(/[^.!?]+[.!?]+/g) || [typingText];

  useEffect(() => {
    if (isStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (isStarted && timeRemaining === 0 && !hasSubmitted) {
      handleSubmit();
    }
  }, [isStarted, timeRemaining, hasSubmitted]);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    // Auto-play first sentence
    setTimeout(() => speakSentence(0), 500);
  };

  const speakSentence = (index) => {
    if ('speechSynthesis' in window && index < sentences.length) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(sentences[index].trim());
      utterance.rate = speechRate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-NZ';
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReplay = () => {
    speakSentence(currentSentenceIndex);
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      speakSentence(currentSentenceIndex + 1);
    }
  };

  const handlePreviousSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
      speakSentence(currentSentenceIndex - 1);
    }
  };

  const handleSpeedChange = (newRate) => {
    setSpeechRate(newRate);
  };

  const handleSubmit = () => {
    if (hasSubmitted) {
      return;
    }
    
    setHasSubmitted(true);

    const endTime = Date.now();
    const actualTimeInSeconds = (endTime - startTime) / 1000;
    
    onComplete({
      typedText,
      referenceText: typingText,
      timeInSeconds: actualTimeInSeconds
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isStarted) {
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
            Typing & Dictation Assessment
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
              <li>You will have <strong>3 minutes</strong> to complete this test</li>
              <li><strong>Listen to each sentence</strong> read aloud by the computer</li>
              <li><strong>Type exactly what you hear</strong> - including punctuation</li>
              <li>You can <strong>replay</strong> each sentence as many times as needed</li>
              <li>Adjust the <strong>speech speed</strong> using the speed control buttons</li>
              <li>Click <strong>"Next Sentence"</strong> to move forward</li>
              <li>This tests your <strong>typing speed, spelling, and grammar</strong></li>
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
              <strong>⚠️ Important:</strong> Type <strong>exactly what you hear</strong>, including 
              all punctuation marks. This simulates taking dictation from a student during an assessment.
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
            Begin Typing Test
          </button>
        </div>
      </div>
    );
  }

  // Calculate current WPM
  const elapsedSeconds = 180 - timeRemaining;
  const currentWords = typedText.trim().split(/\s+/).filter(w => w.length > 0).length;
  const currentWPM = elapsedSeconds > 0 ? Math.round((currentWords / elapsedSeconds) * 60) : 0;

  // Calculate progress
  const progress = typedText.length > 0 
    ? Math.round((typedText.length / typingText.length) * 100)
    : 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        {/* Timer and Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          background: timeRemaining <= 30 ? '#ffebee' : '#e8f5e9',
          border: `2px solid ${timeRemaining <= 30 ? '#f44336' : '#4caf50'}`,
          borderRadius: '8px'
        }}>
          <div>
            <div style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: timeRemaining <= 30 ? '#d32f2f' : '#2e7d32',
              fontFamily: 'monospace'
            }}>
              {formatTime(timeRemaining)}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Time Remaining</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1d5693'
            }}>
              {currentWPM}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>WPM</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#009bd8'
            }}>
              {currentWords}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Words</div>
          </div>
        </div>

        {/* Speed Control */}
        <div style={{
          background: '#f9f9f9',
          border: '2px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <label style={{
              fontSize: '16px',
              color: '#002060',
              fontWeight: 'bold'
            }}>
              Speech Speed:
            </label>
            <span style={{
              fontSize: '18px',
              color: '#1d5693',
              fontWeight: 'bold'
            }}>
              {speechRate === 0.7 ? 'Slow' : speechRate === 0.9 ? 'Normal' : 'Fast'}
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <button
              onClick={() => handleSpeedChange(0.7)}
              disabled={hasSubmitted}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                background: speechRate === 0.7 ? '#1d5693' : '#999',
                border: 'none',
                borderRadius: '6px',
                cursor: hasSubmitted ? 'not-allowed' : 'pointer'
              }}
            >
              🐌 Slow (0.7x)
            </button>
            <button
              onClick={() => handleSpeedChange(0.9)}
              disabled={hasSubmitted}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                background: speechRate === 0.9 ? '#1d5693' : '#999',
                border: 'none',
                borderRadius: '6px',
                cursor: hasSubmitted ? 'not-allowed' : 'pointer'
              }}
            >
              🚶 Normal (0.9x)
            </button>
            <button
              onClick={() => handleSpeedChange(1.1)}
              disabled={hasSubmitted}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                background: speechRate === 1.1 ? '#1d5693' : '#999',
                border: 'none',
                borderRadius: '6px',
                cursor: hasSubmitted ? 'not-allowed' : 'pointer'
              }}
            >
              🏃 Fast (1.1x)
            </button>
          </div>
        </div>

        {/* Audio Playback Controls */}
        <div style={{
          background: '#f0f7ff',
          border: '2px solid #009bd8',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#002060',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            Sentence {currentSentenceIndex + 1} of {sentences.length}
          </p>

          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <button
              onClick={handlePreviousSentence}
              disabled={currentSentenceIndex === 0 || hasSubmitted}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                color: currentSentenceIndex === 0 ? '#ccc' : '#1d5693',
                background: 'white',
                border: `2px solid ${currentSentenceIndex === 0 ? '#ccc' : '#1d5693'}`,
                borderRadius: '8px',
                cursor: currentSentenceIndex === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              ← Previous
            </button>

            <button
              onClick={handleReplay}
              disabled={isPlaying || hasSubmitted}
              style={{
                background: isPlaying ? '#ccc' : '#1d5693',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                width: '80px',
                height: '80px',
                fontSize: '36px',
                cursor: isPlaying ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(29, 86, 147, 0.3)'
              }}
              onMouseOver={(e) => !isPlaying && (e.target.style.background = '#002060')}
              onMouseOut={(e) => !isPlaying && (e.target.style.background = '#1d5693')}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button
              onClick={handleNextSentence}
              disabled={currentSentenceIndex >= sentences.length - 1 || hasSubmitted}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                color: currentSentenceIndex >= sentences.length - 1 ? '#ccc' : '#1d5693',
                background: 'white',
                border: `2px solid ${currentSentenceIndex >= sentences.length - 1 ? '#ccc' : '#1d5693'}`,
                borderRadius: '8px',
                cursor: currentSentenceIndex >= sentences.length - 1 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              Next →
            </button>
          </div>

          <p style={{
            color: '#002060',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            {isPlaying ? 'Playing...' : 'Click ▶ to hear the sentence'}
          </p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Listen carefully and type what you hear
          </p>
        </div>

        {/* Typing Area */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#002060',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            TYPE WHAT YOU HEAR:
          </label>
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Listen to the audio and type what you hear..."
            rows={10}
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            disabled={hasSubmitted}
            autoFocus
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              border: '2px solid #009bd8',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.8',
              resize: 'vertical',
              opacity: hasSubmitted ? 0.6 : 1
            }}
          />
        </div>

        {/* Progress Bar */}
        <div style={{
          marginBottom: '25px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Characters: {typedText.length} / {typingText.length}
            </span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {progress}% Complete
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '10px',
            background: '#e0e0e0',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min(100, progress)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #1d5693, #009bd8)',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={hasSubmitted}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            background: hasSubmitted ? '#ccc' : '#1d5693',
            border: 'none',
            borderRadius: '8px',
            cursor: hasSubmitted ? 'not-allowed' : 'pointer'
          }}
          onMouseOver={(e) => !hasSubmitted && (e.target.style.background = '#002060')}
          onMouseOut={(e) => !hasSubmitted && (e.target.style.background = '#1d5693')}
        >
          {hasSubmitted ? 'Submitting...' : 'Submit Typing Test'}
        </button>

        <p style={{
          marginTop: '15px',
          fontSize: '14px',
          color: '#666',
          textAlign: 'center'
        }}>
          {timeRemaining > 0 
            ? 'You can submit early if you finish before time runs out'
            : 'Time is up! Click submit to complete the test'}
        </p>
      </div>
    </div>
  );
}
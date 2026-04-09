import React, { useState, useEffect } from 'react';
import { typingText } from '../data/assessmentData';

export default function TypingTest({ onComplete }) {
  const [typedText, setTypedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (isStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (isStarted && timeRemaining === 0) {
      handleSubmit();
    }
  }, [isStarted, timeRemaining]);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
  };

  const handleSubmit = () => {
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
            Typing Speed Assessment
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
              <li>You will have <strong>3 minutes</strong> to type the given text</li>
              <li>Type as <strong>quickly and accurately</strong> as possible</li>
              <li>The text will remain visible for reference</li>
              <li>The timer starts when you click "Begin Typing Test"</li>
              <li>You can submit early if you finish before time runs out</li>
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
              <strong>⚠️ Important:</strong> This is a <strong>transcription task</strong> - type 
              the text exactly as shown, including all punctuation and capitalization. Accuracy 
              is just as important as speed.
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
  const currentWords = typedText.trim().split(/\s+/).length;
  const elapsedSeconds = 180 - timeRemaining;
  const currentWPM = elapsedSeconds > 0 ? Math.round((currentWords / elapsedSeconds) * 60) : 0;

  // Calculate accuracy (rough estimate)
  const accuracy = typedText.length > 0 
    ? Math.round((Math.min(typedText.length, typingText.length) / typingText.length) * 100)
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
              {accuracy}%
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Progress</div>
          </div>
        </div>

        {/* Reference Text */}
        <div style={{
          background: '#f9f9f9',
          border: '2px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px'
        }}>
          <h3 style={{
            fontSize: '16px',
            color: '#002060',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>
            TYPE THIS TEXT:
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: 'Georgia, serif',
            margin: 0
          }}>
            {typingText}
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
            YOUR TYPING:
          </label>
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Start typing here..."
            autoFocus
            rows={8}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              border: '2px solid #009bd8',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.8',
              resize: 'vertical'
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
              {Math.round((typedText.length / typingText.length) * 100)}% Complete
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
              width: `${Math.min(100, (typedText.length / typingText.length) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #1d5693, #009bd8)',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
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
          Submit Typing Test
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

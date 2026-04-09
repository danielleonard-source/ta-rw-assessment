import React, { useState, useEffect } from 'react';
import { typingText } from '../data/assessmentData';

export default function TypingTest({ onComplete }) {
  const [typedText, setTypedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
  const [startTime, setStartTime] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-NZ'; // New Zealand English

      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setTypedText(prev => prev + finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    if (isStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (isStarted && timeRemaining === 0) {
      if (isListening && recognition) {
        recognition.stop();
      }
      handleSubmit();
    }
  }, [isStarted, timeRemaining]);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
  };

  const toggleDictation = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSubmit = () => {
    if (isListening && recognition) {
      recognition.stop();
    }

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
            Dictation Test (Reader-Writer Assessment)
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
              <li>You will have <strong>3 minutes</strong> for this dictation test</li>
              <li><strong>Read the passage</strong> on screen</li>
              <li><strong>Dictate it aloud</strong> using the microphone button</li>
              <li>You can also <strong>type manually</strong> if preferred</li>
              <li>This tests your <strong>ability to dictate clearly</strong> as a Reader-Writer</li>
              <li>The system will transcribe your speech automatically</li>
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
              <strong>⚠️ Important:</strong> This test simulates a <strong>Reader-Writer scenario</strong> 
              where you dictate student responses. Speak clearly and accurately, including punctuation 
              (say "comma", "period", etc.).
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
            Begin Dictation Test
          </button>
        </div>
      </div>
    );
  }

  // Calculate current WPM
  const currentWords = typedText.trim().split(/\s+/).filter(w => w.length > 0).length;
  const elapsedSeconds = 180 - timeRemaining;
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
              {progress}%
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
            DICTATE THIS TEXT:
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

        {/* Dictation Controls */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '25px',
          alignItems: 'center'
        }}>
          <button
            onClick={toggleDictation}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              background: isListening ? '#f44336' : '#4caf50',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.9'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            <span style={{ fontSize: '24px' }}>{isListening ? '⏸' : '🎤'}</span>
            {isListening ? 'Stop Dictating' : 'Start Dictating'}
          </button>

          {isListening && (
            <div style={{
              padding: '8px 16px',
              background: '#ffebee',
              border: '2px solid #f44336',
              borderRadius: '6px',
              color: '#c62828',
              fontSize: '14px',
              fontWeight: 'bold',
              animation: 'pulse 1.5s infinite'
            }}>
              🔴 LISTENING...
            </div>
          )}
        </div>

        {/* Transcription Area */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#002060',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            YOUR DICTATION (You can also type manually):
          </label>
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Click 'Start Dictating' to speak, or type here manually..."
            rows={8}
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
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
          Submit Dictation Test
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

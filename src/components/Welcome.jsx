import React, { useState } from 'react';

export default function Welcome({ onStart }) {
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (candidateName.trim() && candidateEmail.trim()) {
      onStart({ 
        candidateName, 
        candidateEmail, 
        assessmentCode: `AUTO-${Date.now()}` // Auto-generated code
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1d5693 0%, #009bd8 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#002060',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Teacher Aide / Reader-Writer
        </h1>
        <h2 style={{
          fontSize: '22px',
          color: '#1d5693',
          marginBottom: '30px',
          textAlign: 'center',
          fontWeight: 'normal'
        }}>
          Competency Assessment
        </h2>

        <div style={{
          background: '#f0f7ff',
          border: '2px solid #009bd8',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '18px', color: '#002060', marginBottom: '15px' }}>
            Assessment Overview
          </h3>
          <ul style={{ color: '#333', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>Spelling:</strong> 20 words (audio playback)</li>
            <li><strong>Grammar:</strong> 15 sentence corrections</li>
            <li><strong>Reading Comprehension:</strong> 2 passages with questions</li>
            <li><strong>Typing Speed:</strong> 3-minute transcription test</li>
          </ul>
          <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
            <strong>Estimated time:</strong> 45-60 minutes
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#002060',
              fontWeight: '600'
            }}>
              Full Name *
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#009bd8'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#002060',
              fontWeight: '600'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '6px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#009bd8'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              background: '#1d5693',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#002060'}
            onMouseOut={(e) => e.target.style.background = '#1d5693'}
          >
            Begin Assessment
          </button>
        </form>

        <p style={{
          marginTop: '25px',
          fontSize: '13px',
          color: '#666',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          Your responses will be submitted directly to the hiring team.
          <br />
          Please complete the assessment in one sitting.
        </p>
      </div>
    </div>
  );
}
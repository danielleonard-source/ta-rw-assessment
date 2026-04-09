import React from 'react';

export default function ThankYou({ candidateName }) {
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
        padding: '60px 40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 30px',
          background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '60px',
          color: 'white',
          boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)'
        }}>
          ✓
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#002060',
          marginBottom: '15px'
        }}>
          Assessment Complete!
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Thank you, <strong>{candidateName}</strong>.
          <br />
          Your assessment has been submitted to the hiring team.
        </p>

        <div style={{
          background: '#f0f7ff',
          border: '2px solid #009bd8',
          borderRadius: '8px',
          padding: '25px',
          marginBottom: '30px'
        }}>
          <h3 style={{
            fontSize: '18px',
            color: '#1d5693',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>
            What Happens Next?
          </h3>
          <ul style={{
            color: '#333',
            lineHeight: '1.8',
            textAlign: 'left',
            paddingLeft: '20px'
          }}>
            <li>Your results will be reviewed by the Dean and hiring team</li>
            <li>We'll be in touch within 3-5 working days</li>
            <li>If successful, you'll be invited for an interview</li>
            <li>Check your email regularly for updates</li>
          </ul>
        </div>

        <div style={{
          padding: '20px',
          background: '#f9f9f9',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            <strong>Questions?</strong> Contact Danie Leonard
            <br />
            <a 
              href="mailto:daniel.leonard@beth.school.nz"
              style={{ color: '#1d5693', textDecoration: 'none', fontWeight: 'bold' }}
            >
              daniel.leonard@beth.school.nz
            </a>
          </p>
        </div>

        <p style={{
          marginTop: '30px',
          fontSize: '13px',
          color: '#999'
        }}>
          You may now close this window
        </p>
      </div>
    </div>
  );
}

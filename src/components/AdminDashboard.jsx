import React, { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'TARW2026Admin'; // Change this to your preferred password

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState('timestamp');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterRecommendation, setFilterRecommendation] = useState('ALL');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchResults();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzWcxmFZ2S4upR2oUbRpolwg4jL2zvDQX-5kSR6AM3J6b1HASL07QS5-1jMHvbI1yHYIg/exec?action=getResults'
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error fetching results:', error);
      alert('Could not load results. Check console for details.');
    }
    setLoading(false);
  };

  const exportToCSV = () => {
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Assessment Code',
      'Spelling Score',
      'Grammar Score',
      'Reading WPM',
      'Reading Accuracy',
      'Typing WPM',
      'Typing Accuracy',
      'Overall Score',
      'Recommendation'
    ].join(',');

    const rows = results.map(r => [
      r.timestamp,
      r.candidateName,
      r.candidateEmail,
      r.assessmentCode,
      r.spellingScore,
      r.grammarScore,
      r.readingWPM,
      r.readingAccuracy,
      r.typingWPM,
      r.typingAccuracy,
      r.overallScore,
      `"${r.recommendation}"`
    ].join(','));

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TA-RW-Assessment-Results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #002060 0%, #1d5693 100%)',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#002060',
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            Admin Access
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            TA/RW Assessment Results Dashboard
          </p>

          <form onSubmit={handleLogin}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#002060',
              fontWeight: '600'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '6px',
                outline: 'none',
                marginBottom: '20px'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1d5693'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
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
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtering and Sorting
  const filteredResults = filterRecommendation === 'ALL' 
    ? results 
    : results.filter(r => r.recommendation.includes(filterRecommendation));

  const sortedResults = [...filteredResults].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (sortField === 'timestamp') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    
    if (sortAsc) {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                color: '#002060',
                marginBottom: '5px'
              }}>
                TA/RW Assessment Results
              </h1>
              <p style={{ color: '#666', fontSize: '16px' }}>
                {results.length} total submissions
              </p>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={fetchResults}
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  color: 'white',
                  background: '#009bd8',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {loading ? 'Loading...' : '🔄 Refresh'}
              </button>
              <button
                onClick={exportToCSV}
                disabled={results.length === 0}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  color: 'white',
                  background: '#1d5693',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: results.length === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                📥 Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <label style={{ color: '#002060', fontWeight: 'bold' }}>
            Filter by Recommendation:
          </label>
          <select
            value={filterRecommendation}
            onChange={(e) => setFilterRecommendation(e.target.value)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              outline: 'none'
            }}
          >
            <option value="ALL">All Candidates</option>
            <option value="SUITABLE">Suitable</option>
            <option value="REVIEW">Review</option>
            <option value="NOT RECOMMENDED">Not Recommended</option>
          </select>
          <span style={{ color: '#666', marginLeft: 'auto' }}>
            Showing {sortedResults.length} of {results.length} results
          </span>
        </div>

        {/* Results Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflowX: 'auto'
        }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              Loading results...
            </p>
          ) : sortedResults.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              No results found
            </p>
          ) : (
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={tableHeaderStyle}>Timestamp</th>
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Code</th>
                  <th style={tableHeaderStyle}>Spelling</th>
                  <th style={tableHeaderStyle}>Grammar</th>
                  <th style={tableHeaderStyle}>Read WPM</th>
                  <th style={tableHeaderStyle}>Read Acc</th>
                  <th style={tableHeaderStyle}>Type WPM</th>
                  <th style={tableHeaderStyle}>Type Acc</th>
                  <th style={tableHeaderStyle}>Overall</th>
                  <th style={tableHeaderStyle}>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((result, idx) => (
                  <tr 
                    key={idx}
                    style={{
                      borderBottom: '1px solid #e0e0e0',
                      background: idx % 2 === 0 ? 'white' : '#fafafa'
                    }}
                  >
                    <td style={tableCellStyle}>
                      {new Date(result.timestamp).toLocaleString('en-NZ', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td style={{...tableCellStyle, fontWeight: 'bold'}}>
                      {result.candidateName}
                    </td>
                    <td style={tableCellStyle}>
                      <a 
                        href={`mailto:${result.candidateEmail}`}
                        style={{ color: '#1d5693', textDecoration: 'none' }}
                      >
                        {result.candidateEmail}
                      </a>
                    </td>
                    <td style={{...tableCellStyle, fontFamily: 'monospace', fontSize: '12px'}}>
                      {result.assessmentCode}
                    </td>
                    <td style={{...tableCellStyle, textAlign: 'center'}}>
                      <span style={getScoreStyle(result.spellingScore)}>
                        {result.spellingScore}%
                      </span>
                    </td>
                    <td style={{...tableCellStyle, textAlign: 'center'}}>
                      <span style={getScoreStyle(result.grammarScore)}>
                        {result.grammarScore}%
                      </span>
                    </td>
                    <td style={{...tableCellStyle, textAlign: 'center'}}>
                      {result.readingWPM}
                    </td>
                    <td style={{...tableCellStyle, textAlign: 'center'}}>
                      <span style={getScoreStyle(result.readingAccuracy)}>
                        {result.readingAccuracy}%
                      </span>
                    </td>
                    <td style={{...tableCellStyle, textAlign: 'center'}}>
                      {result.typingWPM}
                    </td>
                    <td style={{...tableCellStyle, textAlign: 'center'}}>
                      <span style={getScoreStyle(result.typingAccuracy)}>
                        {result.typingAccuracy}%
                      </span>
                    </td>
                    <td style={{...tableCellStyle, textAlign: 'center', fontWeight: 'bold'}}>
                      <span style={getScoreStyle(result.overallScore, true)}>
                        {result.overallScore}%
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={getRecommendationStyle(result.recommendation)}>
                        {result.recommendation.split(' - ')[0]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  color: '#002060',
  fontWeight: 'bold',
  borderBottom: '2px solid #1d5693'
};

const tableCellStyle = {
  padding: '12px',
  color: '#333'
};

function getScoreStyle(score, isOverall = false) {
  const numScore = typeof score === 'string' ? parseInt(score) : score;
  let color = '#4caf50';
  if (numScore < 60) color = '#f44336';
  else if (numScore < 75) color = '#ff9800';

  return {
    padding: '4px 8px',
    borderRadius: '4px',
    background: `${color}20`,
    color: color,
    fontWeight: isOverall ? 'bold' : 'normal',
    fontSize: isOverall ? '15px' : '14px'
  };
}

function getRecommendationStyle(recommendation) {
  let color = '#4caf50';
  let bg = '#e8f5e9';
  
  if (recommendation.includes('NOT RECOMMENDED')) {
    color = '#f44336';
    bg = '#ffebee';
  } else if (recommendation.includes('REVIEW')) {
    color = '#ff9800';
    bg = '#fff3e0';
  }

  return {
    padding: '6px 12px',
    borderRadius: '6px',
    background: bg,
    color: color,
    fontWeight: 'bold',
    fontSize: '13px',
    display: 'inline-block'
  };
}

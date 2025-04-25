//src/app/[locale]/debug-auth/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext_backup';

export default function DebugAuthPage() {
  const { user, loading, error } = useAuth();
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [manualToken, setManualToken] = useState('');
  const [testResult, setTestResult] = useState('');

  useEffect(() => {
    // Get tokens from localStorage
    setToken(localStorage.getItem('accessToken') || 'No token found');
    setRefreshToken(localStorage.getItem('refreshToken') || 'No refresh token found');
  }, []);

  const testToken = async () => {
    try {
      setTestResult('Testing...');
      const API_URL = 'https://core-dev.prepmee.co/api/v1';
      const tokenToUse = manualToken || token;
      
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToUse}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setTestResult(`Error: ${error.message}`);
    }
  };

  const saveManualToken = () => {
    if (manualToken) {
      localStorage.setItem('accessToken', manualToken);
      setToken(manualToken);
      setTestResult('Token saved to localStorage');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Auth Debug Page</h1>
      
      <div className="card mb-4">
        <div className="card-header">Current Auth State</div>
        <div className="card-body">
          <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
          <p><strong>Error:</strong> {error || 'None'}</p>
          <p><strong>User:</strong> {user ? 'Logged In' : 'Not logged in'}</p>
          <pre>{user ? JSON.stringify(user, null, 2) : 'No user data'}</pre>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header">Stored Tokens</div>
        <div className="card-body">
          <p><strong>Access Token:</strong></p>
          <pre className="bg-light p-3">{token}</pre>
          
          <p><strong>Refresh Token:</strong></p>
          <pre className="bg-light p-3">{refreshToken}</pre>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header">Test Token</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Manual Token Input:</label>
            <textarea 
              className="form-control" 
              value={manualToken} 
              onChange={(e) => setManualToken(e.target.value)}
              rows="3"
            ></textarea>
          </div>
          <button className="btn btn-primary me-2" onClick={testToken}>Test Token</button>
          <button className="btn btn-secondary" onClick={saveManualToken}>Save Manual Token</button>
          
          <div className="mt-3">
            <p><strong>Test Result:</strong></p>
            <pre className="bg-light p-3">{testResult}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
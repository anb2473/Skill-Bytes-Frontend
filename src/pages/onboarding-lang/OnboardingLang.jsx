import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingLang.css';
import { BACKEND_URL } from '../config';

const OnboardingLang = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/user/set-lang`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ lang }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.err || 'Failed to set language');

      navigate('/onboarding-topics');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="onboarding-container">
        <div className="onboarding-card">
          <h1>Select Your Language</h1>
          <p className="subtitle">Choose your preferred programming language</p>

          <form onSubmit={handleSubmit} className="onboarding-form">
            <div className="form-group">
              <label htmlFor="lang">Language</label>
              <select
                id="lang"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                <option value="c">C</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="onboarding-button" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OnboardingLang;

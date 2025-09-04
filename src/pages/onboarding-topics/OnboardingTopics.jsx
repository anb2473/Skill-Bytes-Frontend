import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './OnboardingTopics.css';
import { BACKEND_URL } from '../config';

const OnboardingTopics = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setTopics((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/user/set-topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ topics }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.err || 'Failed to set topics');

      navigate('/dashboard'); // onboarding complete
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
          <h1>Pick Your Topics</h1>
          <p className="subtitle">Select areas you’re most interested in</p>

          <form onSubmit={handleSubmit} className="onboarding-form">
            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" value="algorithms" onChange={handleCheckbox} />
                Algorithms
              </label>
              <label>
                <input type="checkbox" value="data-structures" onChange={handleCheckbox} />
                Data Structures
              </label>
              <label>
                <input type="checkbox" value="web-dev" onChange={handleCheckbox} />
                Web Development
              </label>
              <label>
                <input type="checkbox" value="systems" onChange={handleCheckbox} />
                Systems Programming
              </label>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="onboarding-button" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Finish'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OnboardingTopics;

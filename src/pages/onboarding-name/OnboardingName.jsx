import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingName.css';
import { BACKEND_URL } from '../config';

const OnboardingName = () => {
  const [name, setName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter your name');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/set-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: trimmedName }),
        credentials: 'include' // For session-based auth
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setError(errorData.err || 'Failed to set name');
          return;
        }
        setError('An unexpected error occurred');
        return;
      }

      // Navigate to the next step (username setup)
      navigate('/onboarding-username');
    } catch (error) {
      console.error('Error setting name:', error);
      setError('An error occurred while saving your name');
    }
  };

  return (
    <div className={`onboarding-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="onboarding-content">
        {error && <div className="error-message">{error}</div>}
        <div className="onboarding-image-container">
          <img 
            src="/onboarding.png" 
            alt="Welcome to Skill Bytes" 
            className="onboarding-image"
          />
        </div>
        
        <h1 className="onboarding-title">Welcome to Skill Bytes!</h1>
        <p className="onboarding-subtitle">What should we call you?</p>
        
        <form onSubmit={handleSubmit} className="name-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="name-input"
            required
            autoFocus
          />
          <button 
            type="submit" 
            className="continue-button"
            disabled={!name.trim()}
          >
            Continue
          </button>
        </form>
        
        <div className="attribution">
          <a href="https://storyset.com/business" target="_blank" rel="noopener noreferrer">
            Business illustrations by Storyset
          </a>
        </div>
      </div>
    </div>
  );
};

export default OnboardingName;

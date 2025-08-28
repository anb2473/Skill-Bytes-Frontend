import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingUsername.css';
import { BACKEND_URL } from '../config';

const OnboardingUsername = () => {
  const [username, setUsername] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
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
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    if (!isAvailable) {
      setError('Please check username availability');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/set-username`, {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
        credentials: 'include' // Important for sending cookies if using session-based auth
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setError(errorData.err || 'Failed to set username');
          return;
        }
        setError('An unexpected error occurred');
        return;
      }

      // If successful, navigate to dashboard or next step
      navigate('/dashboard');
    } catch (error) {
      console.error('Error setting username:', error);
      // You might want to show an error message to the user here
      setError(error.message || 'An error occurred while setting your username');
    }
  };

  // This would typically be an API call to check username availability
  const checkUsername = () => {
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, assume any username with 'admin' is taken
      setIsAvailable(!username.toLowerCase().includes('admin'));
    }, 300);
  };

  return (
    <div className={`onboarding-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="onboarding-content">
        {error && <div className="error-message">{error}</div>}
        <div className="onboarding-image-container">
          <img 
            src="/collaboration.png" 
            alt="Choose your username" 
            className="onboarding-image"
          />
        </div>
        
        <h1 className="onboarding-title">Let's get you set up</h1>
        <p className="onboarding-subtitle">
          Choose a unique username that represents you. This will be your identity on Skill Bytes.
        </p>
        
        <form onSubmit={handleSubmit} className="username-form">
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={checkUsername}
              placeholder="username"
              className={`username-input ${!isAvailable ? 'error' : ''}`}
              required
              autoFocus
              minLength="3"
              maxLength="20"
              pattern="[a-zA-Z0-9_]+"
              title="3-20 characters, letters, numbers, and underscores only"
            />
            {!isAvailable && (
              <p className="availability-message error">
                Username is already taken. Please try another one.
              </p>
            )}
            {username.length > 0 && username.length < 3 && (
              <p className="availability-message error">
                Username must be at least 3 characters long
              </p>
            )}
            {!/^[a-zA-Z0-9_]+$/.test(username) && username.length > 0 && (
              <p className="availability-message error">
                Only letters, numbers, and underscores are allowed
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="continue-button"
            disabled={!username.trim() || !isAvailable || username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)}
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

export default OnboardingUsername;

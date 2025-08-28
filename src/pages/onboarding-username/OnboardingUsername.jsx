import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingUsername.css';

const OnboardingUsername = () => {
  const [username, setUsername] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && isAvailable) {
      // Here you would typically save the username to your state/context/API
      console.log('Username set:', username);
      // Navigate to the next onboarding step or dashboard
      navigate('/dashboard');
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
              pattern="[a-zA-Z0-9_]{3,20}"
              title="3-20 characters, letters, numbers, and underscores only"
            />
            {!isAvailable && (
              <p className="availability-message error">
                Username is already taken. Please try another one.
              </p>
            )}
            {isAvailable && username.length >= 3 && (
              <p className="availability-message success">
                Username is available!
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="continue-button"
            disabled={!username.trim() || !isAvailable}
          >
            Continue
          </button>
        </form>
        
        <div className="username-requirements">
          <p>Your username must:</p>
          <ul>
            <li>Be 3-20 characters long</li>
            <li>Contain only letters, numbers, and underscores</li>
            <li>Be unique (we'll check for you)</li>
          </ul>
        </div>
        
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

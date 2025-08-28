import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingName.css';

const OnboardingName = () => {
  const [name, setName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
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
    if (name.trim()) {
      // Here you would typically save the name to your state/context/API
      console.log('User name:', name);
      // Navigate to the next onboarding step or dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className={`onboarding-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="onboarding-content">
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

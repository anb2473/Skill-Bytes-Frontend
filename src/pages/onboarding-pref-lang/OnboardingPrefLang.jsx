import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingPrefLang.css';
import { BACKEND_URL } from '../config';

const OnboardingPrefLang = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const languages = [
    { name: 'JavaScript', value: 'javascript', type: 'free' },
    { name: 'Python', value: 'python', type: 'comming soon' },
    { name: 'Java', value: 'java', type: 'comming soon' },
    { name: 'C++', value: 'cpp', type: 'comming soon' },
    { name: 'C#', value: 'csharp', type: 'comming soon' },
    { name: 'Go', value: 'go', type: 'comming soon' },
    { name: 'Rust', value: 'rust', type: 'comming soon'},
    { name: 'TypeScript', value: 'typescript', type: 'comming soon' },
    { name: 'PHP', value: 'php', type: 'comming soon' },
    { name: 'Ruby', value: 'ruby', type: 'comming soon' },
    { name: 'Swift', value: 'swift', type: 'comming soon' },
    { name: 'Kotlin', value: 'kotlin', type: 'comming soon' }
  ];

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
    
    if (!selectedLanguage) {
      setError('Please select a programming language');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/set-pref-lang`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: selectedLanguage }),
        credentials: 'include' // For session-based auth
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setError(errorData.err || 'Failed to set preferred language');
          return;
        }
        setError('An unexpected error occurred');
        return;
      }

      // Navigate to the onboarding pref after successful language selection
      navigate('/onboarding-pref');
    } catch (err) {
      console.error('Error setting preferred language:', err);
      setError('An error occurred while saving your language preference');
    }
  };

  return (
    <div className={`onboarding-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="onboarding-content">
        {error && <div className="error-message">{error}</div>}
        <div className="onboarding-image-container">
          <img 
            src="/daily-challenge.png" 
            alt="Choose your programming language" 
            className="onboarding-image"
          />
        </div>
        
        <h1 className="onboarding-title">Choose Your Language</h1>
        <p className="onboarding-subtitle">
          Select your preferred programming language to get started with personalized challenges.
        </p>
        
        <form onSubmit={handleSubmit} className="language-form">
          <div className="language-grid">
            {languages.map((language) => (
              <div
                key={language.value}
                className={`language-option ${selectedLanguage === language.value ? 'selected' : ''} ${language.type === 'comming soon' ? 'comming-soon' : language.type}`}
                onClick={() => setSelectedLanguage(language.value)}
              >
                <div className="language-name">{language.name}</div>
                <div className={`language-badge ${language.type === 'comming soon' ? 'comming-soon-badge' : `${language.type}-badge`}`}>
                  {language.type}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            type="submit" 
            className="continue-button"
            disabled={!selectedLanguage}
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

export default OnboardingPrefLang;

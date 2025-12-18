import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingPref.css';
import { BACKEND_URL } from '../config';

const OnboardingPref = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const topics = [
    { name: 'Algorithms', value: 'algorithms', description: 'Problem-solving techniques and algorithmic thinking' },
    { name: 'Data Structures', value: 'data-structures', description: 'Arrays, linked lists, trees, graphs, and more' },
    { name: 'Debugging', value: 'debugging', description: 'Finding and fixing code issues' },
    { name: 'Web Development', value: 'web-development', description: 'Frontend and backend web technologies' },
    { name: 'Database Design', value: 'database-design', description: 'SQL, NoSQL, and database optimization' },
    { name: 'System Design', value: 'system-design', description: 'Large-scale system architecture' },
    { name: 'Security', value: 'security', description: 'Cybersecurity and secure coding practices' },
    { name: 'Testing', value: 'testing', description: 'Unit testing, integration testing, and TDD' },
    { name: 'Mobile Development', value: 'mobile-development', description: 'iOS and Android app development' },
    { name: 'Machine Learning', value: 'machine-learning', description: 'AI, ML algorithms, and data science' },
    { name: 'DevOps', value: 'devops', description: 'CI/CD, deployment, and infrastructure' },
    { name: 'Code Review', value: 'code-review', description: 'Best practices for reviewing code' }
  ];

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleTopic = (topicValue) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicValue)) {
        return prev.filter(topic => topic !== topicValue);
      } else {
        return [...prev, topicValue];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (selectedTopics.length === 0) {
      setError('Please select at least one topic of interest');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/set-pref`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics: selectedTopics }),
        credentials: 'include' // For session-based auth
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setError(errorData.err || 'Failed to save preferences');
          return;
        }
        setError('An unexpected error occurred');
        return;
      }

      // Navigate to the dashboard after successful preferences save
      navigate('/user/dashboard');
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError('An error occurred while saving your preferences');
    }
  };

  return (
    <div className={`onboarding-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="onboarding-content">
        {error && <div className="error-message">{error}</div>}
        <div className="onboarding-image-container">
          <img 
            src="/collaboration.png" 
            alt="Choose your interests" 
            className="onboarding-image"
          />
        </div>
        
        <h1 className="onboarding-title">What interests you?</h1>
        <p className="onboarding-subtitle">
          Select the topics you'd like to focus on. You can choose multiple areas to get personalized challenges.
        </p>
        
        <form onSubmit={handleSubmit} className="topics-form">
          <div className="topics-grid">
            {topics.map((topic) => (
              <div
                key={topic.value}
                className={`topic-option ${selectedTopics.includes(topic.value) ? 'selected' : ''}`}
                onClick={() => toggleTopic(topic.value)}
              >
                <div className="topic-name">{topic.name}</div>
                <div className="topic-description">{topic.description}</div>
                <div className="topic-checkbox">
                  {selectedTopics.includes(topic.value) && (
                    <div className="checkmark">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="selection-info">
            {selectedTopics.length > 0 && (
              <p className="selection-count">
                {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="continue-button"
            disabled={selectedTopics.length === 0}
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

export default OnboardingPref;

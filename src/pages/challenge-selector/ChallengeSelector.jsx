import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChallengeSelector.css';
import { BACKEND_URL } from '../config';

const ChallengeSelector = () => {
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isGettingNewChallenge, setIsGettingNewChallenge] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompletedChallenges();
  }, []);

  const fetchCompletedChallenges = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`${BACKEND_URL}/user/get-completed`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setCompletedChallenges(data.challenges || []);

      const response2 = await fetch(`${BACKEND_URL}/user/challenge-completion-status`, {
        credentials: 'include'
      });

      if (!response2.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data2 = await response2.json();
      setSolvedChallenges(data2.completedChallenges || []);
    } catch (err) {
      console.error('Failed to fetch completed challenges:', err);
      setError('Failed to load your completed challenges. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChallengeSelect = (challenge) => {
    // Navigate to daily challenge page with the selected challenge data
    navigate('/daily-challenge', { 
      state: { 
        challenge: {
          id: challenge.id,
          title: challenge.title || "Failed to Load Daily Challenge",
          description: challenge.description || "We know this sucks, but we failed to load your daily challenge. Try again later! Also, please report this issue if it persists. Thanks! :)",
          difficulty: challenge.difficulty || "Impossible",
          points: challenge.points || "∞",
          content: challenge.content || "",
          testCases: challenge.testCases || [],
          generator: challenge.generator || null,
        },
        functionName: challenge.functionName || "",
        isCompletedChallenge: true 
      } 
    });
  };

  const handleNewDailyChallenge = async () => {
    try {
      setIsGettingNewChallenge(true);
      setError('');
      
      const response = await fetch(`${BACKEND_URL}/user/get-daily-challenge`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const challenge = data.challenge;
      
      // Navigate to daily challenge page with the new challenge data
      navigate('/daily-challenge', { 
        state: { 
          challenge: {
            id: challenge.id,
            title: challenge.title || "Failed to Load Daily Challenge",
            description: challenge.description || "We know this sucks, but we failed to load your daily challenge. Try again later! Also, please report this issue if it persists. Thanks! :)",
            difficulty: challenge.difficulty || "Impossible",
            points: challenge.points || "∞",
            content: challenge.content || "",
            testCases: challenge.testCases || [],
            generator: challenge.generator || null,
            help: challenge.help || "",
          },
          functionName: challenge.functionName || "",
          isCompletedChallenge: false 
        } 
      });
    } catch (err) {
      console.error('Failed to get new daily challenge:', err);
      setError('Failed to get today\'s challenge. Please try again later.');
    } finally {
      setIsGettingNewChallenge(false);
    }
  };


  if (isLoading) {
    return (
      <div className="challenge-selector-container">
        <div className="challenge-selector-content">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h2>Loading your challenges...</h2>
            <p>Please wait while we fetch your completed challenges.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="challenge-selector-container">
      <div className="challenge-selector-content">
        <div className="challenge-selector-header">
          <h1>Choose Your Challenge</h1>
          <p>Select a completed challenge to revisit or start today's new challenge.</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="challenge-options">
          {/* New Daily Challenge Option */}
          <div className="new-challenge-card" onClick={handleNewDailyChallenge}>
            <div className="new-challenge-icon">✨</div>
            <div className="new-challenge-content">
              <h3>Today's Challenge</h3>
              <p>Start a fresh daily challenge</p>
              {isGettingNewChallenge && (
                <div className="loading-indicator">Getting challenge...</div>
              )}
            </div>
            <div className="new-challenge-arrow">→</div>
          </div>

          {/* Completed Challenges */}
          {completedChallenges.length > 0 ? (
            <div className="completed-challenges-section">
              <h2>Your Completed Challenges</h2>
              <div className="completed-challenges-grid">
                {completedChallenges.map((challenge, index) =>
                  solvedChallenges.includes(challenge.id) ? (
                    <div
                      key={challenge.id || index}
                      className="completed-challenge-card"
                      onClick={() => handleChallengeSelect(challenge)}
                    >
                      <div className="challenge-header">
                        <h3 className="challenge-title">{challenge.title}</h3>
                        <div className="challenge-meta">
                          <span className="difficulty-badge">
                            {challenge.difficulty}
                          </span>
                          <span className="points-badge">{challenge.points} pts</span>
                        </div>
                      </div>
                      <div className="challenge-description">
                        {challenge.selectorDescription}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={challenge.id || index}
                      className="incompleted-challenge-card"
                      onClick={() => handleChallengeSelect(challenge)}
                    >
                      <div className="challenge-header">
                        <h3 className="challenge-title">{challenge.title}</h3>
                        <div className="challenge-meta">
                          <span className="difficulty-badge">
                            {challenge.difficulty}
                          </span>
                          <span className="points-badge">{challenge.points} pts</span>
                        </div>
                      </div>
                      <div className="challenge-description">
                        {challenge.selectorDescription}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="no-challenges">
              <div className="no-challenges-icon">📝</div>
              <h3>No Completed Challenges Yet</h3>
              <p>Complete your first challenge to see it here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeSelector;

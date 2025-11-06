import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import { BACKEND_URL } from '../config';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`${BACKEND_URL}/user/leader-board`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      // Assuming the response has a leaderboard array and currentUser field
      setLeaderboard(data.leaderboard || data || []);
      
      // Find current user's rank (assuming there's a userId field in each entry or a separate currentUser field)
      // Adjust this based on your actual API response structure
      if (data.id) {
        const userIndex = data.leaderboard.findIndex(
          entry => entry.id === data.id
        );
        setCurrentUserRank(userIndex !== -1 ? userIndex : null);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      setError('Failed to load the leaderboard. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  if (isLoading) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-content">
          <div className="loading-state">
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
            <h2>Loading leaderboard...</h2>
            <p>Fetching the latest rankings.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        <div className="leaderboard-header">
          <h1>🏆 Leaderboard</h1>
          <p>See where you rank against other developers</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="leaderboard-list">
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => {
              const isCurrentUser = currentUserRank === index || 
                                    (entry.currentUser === true) ||
                                    (entry.isCurrentUser === true);
              
              return (
                <div 
                  key={index} 
                  className={`leaderboard-entry ${isCurrentUser ? 'current-user' : ''}`}
                >
                  <div className="rank-badge">{getRankEmoji(index)}</div>
                  <div className="user-info">
                    <div className="username">{entry.username || 'Anonymous'}</div>
                    <div className="stats">
                      <span className="stat-item">⭐ {entry.points || 0} points</span>
                    </div>
                  </div>
                  {isCurrentUser && (
                    <div className="you-badge">👤 You</div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="no-entries">
              <div className="no-entries-icon">📊</div>
              <h3>No Rankings Yet</h3>
              <p>Complete challenges to appear on the leaderboard!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;


import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

function Dashboard() {
    const [isHovered, setIsHovered] = useState(false);
    const [inboxStatus, setInboxStatus] = useState('checking');
    const [inbox, setInbox] = useState([]);
    const [serverStatus, setServerStatus] = useState('checking');

    // Check for notification from server
    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/user/inbox`, {
                    method: 'GET',
                    headers: {  
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                if (data.messages) {
                    setInbox(data.messages);
                    setInboxStatus('open');
                } else {
                    setInboxStatus('empty');
                }
                setServerStatus('open');
            } catch (err) {
                console.error('Server status check failed:', err);
                setInboxStatus('error');
                setServerStatus('error');
            }
        };
        checkServerStatus();
    }, []);
    
    // Close notification handler
    const closeNotification = async (index, id) => {
        if (index === undefined) {
            setServerStatus('dismissed');
        } else {
            setInbox(prev => prev.filter((_, i) => i !== index));
        }

        const response = await fetch(`${BACKEND_URL}/msg:${id}`, {
          method: 'DELETE',
          headers: {  
              'Content-Type': 'application/json',
          },
      });
    };

    const handleChallengeClick = () => {
        
    };

    return (
        <div className="dashboard-container">
            {serverStatus === 'error' && (
                <div className="server-notification">
                    <button
                        className="server-notification-close"
                        onClick={() => closeNotification()}
                        onKeyPress={(e) => e.key === 'Enter' && closeNotification()}
                        aria-label="Close notification"
                    >
                        &times;
                    </button>
                    <span className="server-notification-icon">⚠️</span>
                    <span>Failed to load inbox - servers unavailable.</span>
                </div>
            )}
            {inbox.map((message, index) => (
                <div key={index} className="server-notification" style={{borderLeft: `4px solid ${message.bannerColor || '#2821fc'}`}}>
                    <button
                        className="server-notification-close"
                        onClick={() => closeNotification(index, message.id)}
                        onKeyPress={(e) => e.key === 'Enter' && closeNotification(index)}
                        aria-label="Close notification"
                    >
                        &times;
                    </button>
                    <span className="server-notification-icon">{message.icon || '📢'}</span>
                    <span>{message.content || 'New notification'}</span>
                </div>
            ))}
            <div 
                className={`challenge-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleChallengeClick}
            >
                <div className="challenge-content">
                    <h2>Daily Challenge</h2>
                    <p>Test your skills with today's featured challenge</p>
                    <Link className="start-button" to="/daily-challenge">Start Challenge</Link>
                </div>
                <div className="challenge-image">
                    <img 
                        src="/daily-challenge.png" 
                        alt="Daily Challenge" 
                        className={isHovered ? 'image-hover' : ''}
                    />
                </div>
                <div className="attribution">
                    <a href="https://storyset.com/people" target="_blank" rel="noopener noreferrer">
                        People illustrations by Storyset
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

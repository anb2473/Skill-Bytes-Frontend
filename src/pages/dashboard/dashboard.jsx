import React, { useState } from "react";
import "./dashboard.css";

function Dashboard() {
    const [isHovered, setIsHovered] = useState(false);

    const handleChallengeClick = () => {
        // Add your challenge start logic here
        console.log("Starting daily challenge...");
    };

    return (
        <div className="dashboard-container">
            <div 
                className={`challenge-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleChallengeClick}
            >
                <div className="challenge-content">
                    <h2>Daily Challenge</h2>
                    <p>Test your skills with today's featured challenge</p>
                    <button className="start-button">Start Challenge</button>
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
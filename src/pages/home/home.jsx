import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Features from "./Features";
import { BACKEND_URL } from '../config';
import FlockEffect from '../components/3d-flock-effect/3DFlockEffect'

function Home() {
  const mountRef = FlockEffect();
  const [scrollY, setScrollY] = useState(0);
  const [serverStatus, setServerStatus] = useState('checking');
  const contentRef = useRef(null);

  // Check server status on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/ping`, {
          method: 'GET',
          headers: {  
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) setServerStatus('error');
        setServerStatus('online');
      } catch (err) {
        console.error('Server status check failed:', err);
        setServerStatus('error');
      }
    };
    checkServerStatus();
  }, []);

  // Close notification handler
  const closeNotification = () => {
    setServerStatus('dismissed');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity and blur based on scroll position
  const calculateStyles = () => {
    const blurAmount = Math.min(scrollY / 20, 10); // Cap blur at 10px
    const opacity = Math.max(1 - (scrollY / 300), 0); // Fade out over 300px
    
    return {
      filter: `blur(${blurAmount}px)`,
      opacity: opacity,
      transition: 'all 0.3s ease-out',
      transform: `translateY(${scrollY * 0.2}px)` // Slight parallax effect
    };
  };

  return (
    <div className="home-container">
      {serverStatus === 'error' && (
        <div className="server-notification">
          <button
            className="server-notification-close"
            onClick={closeNotification}
            onKeyPress={(e) => e.key === 'Enter' && closeNotification()}
            aria-label="Close notification"
          >
            &times;
          </button>
          <span className="server-notification-icon">⚠️</span>
          <span>We are currently looking for a hosting provider for our servers. Launching soon - thanks for your patience!</span>
        </div>
      )}
      <div className="home-root" ref={mountRef}>
        <div className="home-content-container">
          <div 
            className="home-content-left" 
            ref={contentRef}
            style={calculateStyles()}
          >
            <h1>Welcome</h1>
            <h2>to Skill Bytes</h2>
            <Link to="/signup" className="get-started-button">Get Started</Link>
          </div>
        </div>
      </div>
      <div style={{ height: '100vh' }}></div> {/* Spacer for scrolling */}
      <Features />
    </div>
  );
}

export default Home;

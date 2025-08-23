import React from 'react';
import './Contact.css';

const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:anb2473@proton.me';
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="profile-section">
          <div className="profile-image-container">
          <div className="profile-image-wrapper">
            <img 
              src="/profile.jpg" 
              alt="" 
              className="profile-image"
            />
          </div>
        </div>
          <h1>Austin Blass</h1>
          <p className="description">
            I started my journey in computer science three years ago in game development, 
            and have been committed to sharing the joy of programming.
          </p>
          <div className="button-group">
            <button 
              className="email-button"
              onClick={handleEmailClick}
            >
              <i className="fas fa-envelope"></i> Proton
            </button>
            <a 
              href="https://github.com/anb2473" 
              target="_blank" 
              rel="noopener noreferrer"
              className="email-button"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
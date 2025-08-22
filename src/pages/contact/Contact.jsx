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
              alt="Profile" 
              className="profile-image"
            />
          </div>
        </div>
          <h1>Austin Blass</h1>
          <p className="description">
            I started my journey in computer science three years ago in game development, 
            and have been committed to sharing the joy of programming.
          </p>
          <button 
            className="email-button"
            onClick={handleEmailClick}
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
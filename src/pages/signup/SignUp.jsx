import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Here you would typically make an API call to your backend
    console.log('Sign up with:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle successful signup (e.g., redirect to dashboard)
    }, 1000);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Create your account</h1>
        <p className="subtitle">Start your journey with us</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength="8"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="continue-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Continue'}
          </button>
        </form>
        
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

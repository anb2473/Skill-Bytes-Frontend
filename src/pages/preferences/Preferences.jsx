import React, { useState, useEffect } from 'react';
import './Preferences.css';
import { BACKEND_URL } from '../config';

const Preferences = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [email, setEmail] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [prefError, setPrefError] = useState('');
  const [langError, setLangError] = useState('');
  const [emailError, setEmailError] = useState('')
  
  const [nameLoading, setNameLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [prefLoading, setPrefLoading] = useState(false);
  const [langLoading, setLangLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  
  const [nameSuccess, setNameSuccess] = useState(false);
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [prefSuccess, setPrefSuccess] = useState(false);
  const [langSuccess, setLangSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  // Collapsible sections state (all collapsed by default)
  const [expandedSections, setExpandedSections] = useState({
    name: false,
    username: false,
    preferences: false,
    language: false,
    email: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const languages = [
    { name: 'JavaScript', value: 'javascript', type: 'free' },
    { name: 'Python', value: 'python', type: 'comming soon' },
    { name: 'Java', value: 'java', type: 'comming soon' },
    { name: 'C++', value: 'cpp', type: 'comming soon' },
    { name: 'C#', value: 'csharp', type: 'comming soon' },
    { name: 'Go', value: 'go', type: 'comming soon' },
    { name: 'Rust', value: 'rust', type: 'comming soon' },
    { name: 'TypeScript', value: 'typescript', type: 'comming soon' },
    { name: 'PHP', value: 'php', type: 'comming soon' },
    { name: 'Ruby', value: 'ruby', type: 'comming soon' },
    { name: 'Swift', value: 'swift', type: 'comming soon' },
    { name: 'Kotlin', value: 'kotlin', type: 'comming soon' }
  ];

  useEffect(() => {
    loadExistingName();
    loadExistingUsername();
    loadExistingEmail();
    loadExistingTopics();
    loadExistingLanguage();
  }, []);

  const loadExistingEmail = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/email`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        // Errors in fetch not critical, can be suppressed
        return;
      }

      const data = await response.json()
      const email = data.email
      if (!email) {
        return;
      }

      setEmail(email)
    } catch (err) {
      console.error('Error fetching email:', err);
    }
  }

  const loadExistingName = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/fname`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        // Errors in fetch not critical, can be suppressed
        return;
      }

      const data = await response.json()
      const name = data.name
      if (!name) {
        return;
      }

      setName(name)
    } catch (err) {
      console.error('Error fetching name:', err);
    }
  }

  const loadExistingUsername = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/username`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        // Errors in fetch not critical, can be suppressed
        return;
      }

      const data = await response.json()
      const username = data.username
      if (!username) {
        return;
      }

      setUsername(username)
    } catch (err) {
      console.error('Error fetching username:', err);
    }
  }

  const loadExistingLanguage = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/language`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        // Errors in fetch not critical, can be suppressed
        return;
      }

      const data = await response.json()
      const language = data.language 
      if (!language ) {
        return;
      }

      setSelectedLanguage(language)
    } catch (err) {
      console.error('Error fetching language:', err);
    }
  }

  const loadExistingTopics = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/preferences`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        // Errors in fetch not critical, can be suppressed
        return;
      }

      const data = await response.json()
      const topics = data.preferences
      if (!topics) {
        return;
      }

      setSelectedTopics(topics)
    } catch (err) {
      console.error('Error fetching topics:', err);
    }
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess(false);
    
    setNameLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/user/req-set-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setNameError(errorData.err || 'Failed to request to change email');
          return;
        }
        setNameError('An unexpected error occurred');
        return;
      }

      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 3000);
    } catch (err) {
      console.error('Error setting name:', err);
      setNameError('An error occurred while saving your name');
    } finally {
      setNameLoading(false);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setNameSuccess(false);
    
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError('Please enter your name');
      return;
    }

    setNameLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/user/set-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: trimmedName }),
        credentials: 'include'
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setNameError(errorData.err || 'Failed to set name');
          return;
        }
        setNameError('An unexpected error occurred');
        return;
      }

      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 3000);
    } catch (err) {
      console.error('Error setting name:', err);
      setNameError('An error occurred while saving your name');
    } finally {
      setNameLoading(false);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setUsernameSuccess(false);
    
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setUsernameError('Please enter a username');
      return;
    }

    setUsernameLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/user/set-username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: trimmedUsername }),
        credentials: 'include'
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setUsernameError(errorData.err || 'Failed to set username');
          return;
        }
        setUsernameError('An unexpected error occurred');
        return;
      }

      setUsernameSuccess(true);
      setTimeout(() => setUsernameSuccess(false), 3000);
    } catch (err) {
      console.error('Error setting username:', err);
      setUsernameError('An error occurred while saving your username');
    } finally {
      setUsernameLoading(false);
    }
  };

  const toggleTopic = (topicValue) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicValue)) {
        return prev.filter(topic => topic !== topicValue);
      } else {
        return [...prev, topicValue];
      }
    });
  };

  const handlePrefSubmit = async (e) => {
    e.preventDefault();
    setPrefError('');
    setPrefSuccess(false);
    
    if (selectedTopics.length === 0) {
      setPrefError('Please select at least one topic of interest');
      return;
    }

    setPrefLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/user/set-pref`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics: selectedTopics }),
        credentials: 'include'
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setPrefError(errorData.err || 'Failed to save preferences');
          return;
        }
        setPrefError('An unexpected error occurred');
        return;
      }

      setPrefSuccess(true);
      setTimeout(() => setPrefSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving preferences:', err);
      setPrefError('An error occurred while saving your preferences');
    } finally {
      setPrefLoading(false);
    }
  };

  const handleLangSubmit = async (e) => {
    e.preventDefault();
    setLangError('');
    setLangSuccess(false);
    
    if (!selectedLanguage) {
      setLangError('Please select a programming language');
      return;
    }

    setLangLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/user/set-pref-lang`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: selectedLanguage }),
        credentials: 'include'
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setLangError(errorData.err || 'Failed to set preferred language');
          return;
        }
        setLangError('An unexpected error occurred');
        return;
      }

      setLangSuccess(true);
      setTimeout(() => setLangSuccess(false), 3000);
    } catch (err) {
      console.error('Error setting preferred language:', err);
      setLangError('An error occurred while saving your language preference');
    } finally {
      setLangLoading(false);
    }
  };

  return (
    <div className="preferences-container">
      <div className="preferences-content">
        <div className="preferences-header">
          <h1 className="preferences-title">Preferences</h1>
          <p className="preferences-subtitle">Manage your account settings and preferences</p>
        </div>

        {/* Name Section */}
        <div className={`preferences-section ${expandedSections.name ? 'expanded' : ''}`}>
          <div className="section-header" onClick={() => toggleSection('name')}>
            <div className="section-header-content">
              <h2 className="section-title">Name</h2>
              <p className="section-subtitle">Update your display name</p>
            </div>
            <div className="section-toggle">
              <span className={`toggle-icon ${expandedSections.name ? 'expanded' : ''}`}>▼</span>
            </div>
          </div>
          <div className={`section-content ${expandedSections.name ? 'expanded' : ''}`}>
              <form onSubmit={handleNameSubmit} className="preferences-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </div>
                {nameError && <div className="error-message">{nameError}</div>}
                {nameSuccess && <div className="success-message">Name updated successfully!</div>}
                <button 
                  type="submit" 
                  className="update-button"
                  disabled={nameLoading || !name.trim()}
                >
                  {nameLoading ? 'Updating...' : 'Update Name'}
                </button>
              </form>
          </div>
        </div>

        {/* Username Section */}
        <div className={`preferences-section ${expandedSections.username ? 'expanded' : ''}`}>
          <div className="section-header" onClick={() => toggleSection('username')}>
            <div className="section-header-content">
              <h2 className="section-title">Username</h2>
              <p className="section-subtitle">Change your username</p>
            </div>
            <div className="section-toggle">
              <span className={`toggle-icon ${expandedSections.username ? 'expanded' : ''}`}>▼</span>
            </div>
          </div>
          <div className={`section-content ${expandedSections.username ? 'expanded' : ''}`}>
              <form onSubmit={handleUsernameSubmit} className="preferences-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="form-input"
                  />
                </div>
                {usernameError && <div className="error-message">{usernameError}</div>}
                {usernameSuccess && <div className="success-message">Username updated successfully!</div>}
                <button 
                  type="submit" 
                  className="update-button"
                  disabled={usernameLoading || !username.trim()}
                >
                  {usernameLoading ? 'Updating...' : 'Update Username'}
                </button>
              </form>
          </div>
        </div>

        {/* Preferences Section */}
        <div className={`preferences-section ${expandedSections.preferences ? 'expanded' : ''}`}>
          <div className="section-header" onClick={() => toggleSection('preferences')}>
            <div className="section-header-content">
              <h2 className="section-title">Interests</h2>
              <p className="section-subtitle">Select topics you'd like to focus on</p>
            </div>
            <div className="section-toggle">
              <span className={`toggle-icon ${expandedSections.preferences ? 'expanded' : ''}`}>▼</span>
            </div>
          </div>
          <div className={`section-content ${expandedSections.preferences ? 'expanded' : ''}`}>
              <form onSubmit={handlePrefSubmit} className="preferences-form">
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
                {prefError && <div className="error-message">{prefError}</div>}
                {prefSuccess && <div className="success-message">Preferences updated successfully!</div>}
                <button 
                  type="submit" 
                  className="update-button"
                  disabled={prefLoading || selectedTopics.length === 0}
                >
                  {prefLoading ? 'Updating...' : 'Update Preferences'}
                </button>
              </form>
          </div>
        </div>

        {/* Preferred Language Section */}
        <div className={`preferences-section ${expandedSections.language ? 'expanded' : ''}`}>
          <div className="section-header" onClick={() => toggleSection('language')}>
            <div className="section-header-content">
              <h2 className="section-title">Preferred Language</h2>
              <p className="section-subtitle">Choose your programming language</p>
            </div>
            <div className="section-toggle">
              <span className={`toggle-icon ${expandedSections.language ? 'expanded' : ''}`}>▼</span>
            </div>
          </div>
          <div className={`section-content ${expandedSections.language ? 'expanded' : ''}`}>
              <form onSubmit={handleLangSubmit} className="preferences-form">
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
                {langError && <div className="error-message">{langError}</div>}
                {langSuccess && <div className="success-message">Preferred language updated successfully!</div>}
                <button 
                  type="submit" 
                  className="update-button"
                  disabled={langLoading || !selectedLanguage}
                >
                  {langLoading ? 'Updating...' : 'Update Language'}
                </button>
              </form>
          </div>
        </div>

        {/* Preferred Email */}
        <div className={`preferences-section ${expandedSections.email ? 'expanded' : ''}`}>
          <div className="section-header" onClick={() => toggleSection('email')}>
            <div className="section-header-content">
              <h2 className="section-title">Preferred Email</h2>
              <p className="section-subtitle">Change your email</p>
            </div>
            <div className="section-toggle">
              <span className={`toggle-icon ${expandedSections.email ? 'expanded' : ''}`}>▼</span>
            </div>
          </div>
          <div className={`section-content ${expandedSections.email ? 'expanded' : ''}`}>
              <form onSubmit={handleEmailSubmit} className="preferences-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={email}
                    placeholder="No email set"
                    className="form-input"
                    readonly
                    disabled
                  />
                </div>
                {emailError && <div className="error-message">{emailError}</div>}
                {emailSuccess && <div className="success-message">Successfully requested email change</div>}
                <button 
                  type="submit" 
                  className="update-button"
                  disabled={emailLoading}
                >
                  {emailLoading ? 'Requesting...' : 'Request Email Change'}
                </button>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;



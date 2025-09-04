import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home/home.jsx";
import Contact from "./pages/contact/Contact.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import OnboardingName from "./pages/onboarding-name/OnboardingName.jsx";
import OnboardingUsername from "./pages/onboarding-username/OnboardingUsername.jsx";
import OnboardingLang from "./pages/onboarding-lang/OnboardingLang.jsx";
import OnboardingTopics from "./pages/onboarding-topics/OnboardingTopics.jsx";

import "./App.css";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const hideNavRoutes = [
    "/onboarding-name",
    "/onboarding-username",
    "/onboarding-lang",
    "/onboarding-topics",
  ];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src="/icon-large.png" alt="Skill Bytes Logo" />
        </Link>
        
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
          <li><Link to="/login" onClick={closeMobileMenu}>Log In</Link></li>
          <li><Link to="/signup" className="signup-link" onClick={closeMobileMenu}>Get Started</Link></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding-name" element={<OnboardingName />} />
          <Route path="/onboarding-username" element={<OnboardingUsername />} />
          <Route path="/onboarding-lang" element={<OnboardingLang />} />
          <Route path="/onboarding-topics" element={<OnboardingTopics />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

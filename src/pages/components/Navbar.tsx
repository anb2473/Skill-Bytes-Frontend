import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/icon-large.png" alt="Skill Bytes Logo" />
      </Link>
    </nav>
  );
};

export default Navbar;

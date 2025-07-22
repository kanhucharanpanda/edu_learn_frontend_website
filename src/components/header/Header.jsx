

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ isAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">EduLearn</span>
          <div className="logo-dot"></div>
        </div>

        {/* Mobile menu toggle button */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>
            <span>Home</span>
          </Link>
          <Link to="/courses" className="nav-link" onClick={closeMobileMenu}>
            <span>Courses</span>
          </Link>
          <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
            <span>About</span>
          </Link>
          <Link to="/quizzes" className="nav-link" onClick={closeMobileMenu}>
            <span>Quizzes</span>
          </Link>
          {isAuth ? (
            <Link
              to="/account"
              className="nav-link account-link"
              onClick={closeMobileMenu}
            >
              <span>Account</span>
            </Link>
          ) : (
            <Link to="/login" className="login-btn" onClick={closeMobileMenu}>
              <span>Login</span>
              <div className="btn-shine"></div>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

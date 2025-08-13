import React, { useState } from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom"; // Import Link for navigation

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(false); // Defensive reset

    // Trim email before validation
    const trimmedEmail = email.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      // Use trimmedEmail for validation
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://edu-learn-server-website.onrender.com/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: trimmedEmail }), // Send trimmedEmail
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Successfully subscribed! Welcome to our community 🎉");
        setMessageType("success");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Network error during subscription:", error);
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info Section */}
          <div className="footer-section footer-info-section">
            <div className="footer-logo">
              <h3>EduLearn</h3>
              <p className="footer-tagline">
                Empowering minds, one lesson at a time
              </p>
            </div>
            <p className="footer-description">
              Join thousands of learners worldwide in our comprehensive
              e-learning platform. Master new skills, advance your career, and
              unlock your potential with our expert-curated courses.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <AiOutlineMail className="contact-icon" />
                <span>info@edulearn.com</span>
              </div>
              <div className="contact-item">
                <AiOutlinePhone className="contact-icon" />
                <span>+91 7735706963</span>
              </div>
              <div className="contact-item">
                <AiOutlineEnvironment className="contact-icon" />
                <span>Bhubaneswar, Odisha, Education City</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section (Simplified) */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/courses">All Courses</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support Section (Simplified) */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li>
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/accessibility">Accessibility</Link>
              </li>
              {/* --- NEW UNSUBSCRIBE LINK ADDED HERE --- */}
              <li>
                <Link to="/unsubscribe">Unsubscribe</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section footer-newsletter-section">
            <h4>Stay Updated</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter and be the first to know about new
              courses, special offers, and educational content.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="submit"
                className="newsletter-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="loading-icon" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={`newsletter-message ${messageType}`}>
                {messageType === "success" ? (
                  <AiOutlineCheckCircle className="message-icon" />
                ) : (
                  <AiOutlineCloseCircle className="message-icon" />
                )}
                <span>{message}</span>
              </div>
            )}

            <div className="social-links">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillFacebook />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillTwitterSquare />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillLinkedin />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} EduLearn Platform. All rights reserved.
            </p>
            <p className="creator">
              Made with <span className="heart">❤️</span> by{" "}
              <a
                href="https://github.com/kanhucharanpanda"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kanhu Charan
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

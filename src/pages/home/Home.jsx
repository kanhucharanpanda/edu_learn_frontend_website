

import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀 New Course Available</span>
          </div>

          <h1 className="hero-title">
            Master New Skills with
            <span className="gradient-text"> Expert Guidance</span>
          </h1>

          <p className="hero-description">
            Join thousands of learners who are transforming their careers with
            our cutting-edge courses designed by industry professionals.
          </p>

          <div className="hero-buttons">
            <button
              onClick={() => navigate("/courses")}
              className="primary-btn"
            >
              <span>Start Learning</span>
              <div className="btn-glow"></div>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Platform?</h2>
            <p>
              Experience learning like never before with our innovative approach
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 17l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Interactive Learning</h3>
              <p>
                Engage with hands-on projects, quizzes, and real-world scenarios
                that make learning stick.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="12,6 12,12 16,14"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Learn at Your Pace</h3>
              <p>
                Access courses 24/7 and learn at your own speed with lifetime
                access to all materials.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="8"
                    y="2"
                    width="8"
                    height="4"
                    rx="1"
                    ry="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Get Certified</h3>
              <p>
                Earn industry-recognized certificates that boost your career
                prospects and credibility.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M23 21v-2a4 4 0 0 0-3-3.87"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 3.13a4 4 0 0 1 0 7.75"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Expert Community</h3>
              <p>
                Connect with instructors and peers in our supportive learning
                community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Career?</h2>
            <p>
              Join thousands of successful learners who have already transformed
              their lives
            </p>
            <button onClick={() => navigate("/courses")} className="cta-button">
              <span>Explore Courses</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

export default Home;

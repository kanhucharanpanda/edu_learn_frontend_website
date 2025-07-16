import React from "react";
import "./Accessibility.css";

const Accessibility = () => {
  return (
    <div className="accessibility">
      <div className="accessibility-container">
        <h1>Accessibility Statement</h1>
        <div className="accessibility-content">
          <div className="accessibility-section">
            <h2>Our Commitment to Accessibility</h2>
            <p>
              EduLearn is committed to ensuring digital accessibility for people
              with disabilities. We are continually improving the user
              experience for everyone and applying the relevant accessibility
              standards.
            </p>
          </div>

          <div className="accessibility-section">
            <h2>Accessibility Standards</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines
              (WCAG) 2.1 Level AA standards. These guidelines help make web
              content more accessible to people with disabilities.
            </p>
          </div>

          <div className="accessibility-section">
            <h2>Accessibility Features</h2>
            <p>Our platform includes the following accessibility features:</p>
            <ul>
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>High contrast mode options</li>
              <li>Adjustable text size</li>
              <li>Alternative text for images</li>
              <li>Captioned videos where available</li>
              <li>Clear heading structure</li>
              <li>Focus indicators for interactive elements</li>
            </ul>
          </div>

          <div className="accessibility-section">
            <h2>Assistive Technologies</h2>
            <p>
              Our website is designed to work with assistive technologies such
              as:
            </p>
            <ul>
              <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
              <li>Voice recognition software</li>
              <li>Keyboard navigation tools</li>
              <li>Switch navigation devices</li>
              <li>Magnification software</li>
            </ul>
          </div>

          <div className="accessibility-section">
            <h2>Browser Support</h2>
            <p>
              For the best accessibility experience, we recommend using the
              latest versions of:
            </p>
            <ul>
              <li>Chrome</li>
              <li>Firefox</li>
              <li>Safari</li>
              <li>Edge</li>
            </ul>
          </div>

          <div className="accessibility-section">
            <h2>Feedback and Support</h2>
            <p>
              We welcome feedback on the accessibility of our platform. If you
              encounter any accessibility barriers or have suggestions for
              improvement, please contact us:
            </p>
            <ul>
              <li>Email: accessibility@edulearn.com</li>
              <li>Phone: +91 7735706963</li>
              <li>
                We aim to respond to accessibility feedback within 2 business
                days
              </li>
            </ul>
          </div>

          <div className="accessibility-section">
            <h2>Ongoing Improvements</h2>
            <p>
              We regularly review and update our accessibility features. Our
              team conducts accessibility audits and user testing to identify
              areas for improvement. We are committed to making our platform
              more accessible over time.
            </p>
          </div>

          <div className="accessibility-section">
            <h2>Third-Party Content</h2>
            <p>
              Some course content may be provided by third parties. While we
              encourage accessibility best practices, we may not have complete
              control over third-party content. We work with content providers
              to improve accessibility whenever possible.
            </p>
          </div>

          <p className="last-updated">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;

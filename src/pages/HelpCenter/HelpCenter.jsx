import React from "react";
import "./HelpCenter.css";

const HelpCenter = () => {
  return (
    <div className="help-center">
      <div className="help-center-container">
        <h1>Help Center</h1>
        <div className="help-content">
          <div className="help-section">
            <h2>Getting Started</h2>
            <div className="help-item">
              <h3>How to create an account?</h3>
              <p>
                To create an account, click on the "Sign Up" button and fill in
                your details...
              </p>
            </div>
            <div className="help-item">
              <h3>How to enroll in a course?</h3>
              <p>
                Browse our course catalog, select a course, and click "Enroll
                Now"...
              </p>
            </div>
          </div>

          <div className="help-section">
            <h2>Technical Support</h2>
            <div className="help-item">
              <h3>Video playback issues</h3>
              <p>
                If you're experiencing video playback problems, try refreshing
                the page...
              </p>
            </div>
            <div className="help-item">
              <h3>Quiz submission problems</h3>
              <p>
                Ensure you have a stable internet connection before submitting
                quizzes...
              </p>
            </div>
          </div>

          <div className="help-section">
            <h2>Contact Support</h2>
            <p>
              If you can't find the answer you're looking for, please contact
              our support team:
            </p>
            <ul>
              <li>Email: support@edulearn.com</li>
              <li>Phone: +91 7735706963</li>
              <li>Hours: Monday - Friday, 9 AM - 6 PM IST</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

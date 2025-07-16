import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <div className="privacy-content">
          <div className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as:</p>
            <ul>
              <li>Personal information (name, email address, phone number)</li>
              <li>Account credentials</li>
              <li>Course progress and completion data</li>
              <li>Payment information (processed securely by third parties)</li>
              <li>Communications with our support team</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our educational services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about new courses and features</li>
              <li>
                Monitor and analyze usage patterns to improve our services
              </li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties except in the following
              circumstances:
            </p>
            <ul>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </div>

          <div className="privacy-section">
            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience on our platform. You can control cookie settings
              through your browser preferences.
            </p>
          </div>

          <div className="privacy-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not
              knowingly collect personal information from children under 13. If
              you believe we have collected such information, please contact us
              immediately.
            </p>
          </div>

          <div className="privacy-section">
            <h2>8. Changes to Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>
          </div>

          <div className="privacy-section">
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <ul>
              <li>Email: privacy@edulearn.com</li>
              <li>Phone: +91 7735706963</li>
              <li>Address: Bhubaneswar, Odisha, Education City</li>
            </ul>
          </div>

          <p className="last-updated">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

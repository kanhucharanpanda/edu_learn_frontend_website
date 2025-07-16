import React from "react";
import "./TermOfService.css";

const TermsOfService = () => {
  return (
    <div className="terms-of-service">
      <div className="terms-container">
        <h1>Terms of Service</h1>
        <div className="terms-content">
          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using EduLearn, you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree
              to abide by the above, please do not use this service.
            </p>
          </div>

          <div className="terms-section">
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials on EduLearn for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose;</li>
              <li>attempt to decompile or reverse engineer any software;</li>
              <li>remove any copyright or other proprietary notations.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. User Account</h2>
            <p>
              To access certain features of our service, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account information and for all activities
              that occur under your account.
            </p>
          </div>

          <div className="terms-section">
            <h2>4. Course Content</h2>
            <p>
              All course content, including but not limited to text, graphics,
              images, videos, and other materials, is the property of EduLearn
              or its content providers and is protected by copyright laws.
            </p>
          </div>

          <div className="terms-section">
            <h2>5. Payment Terms</h2>
            <p>
              Premium courses require payment before access is granted. All
              payments are processed securely through our payment partners.
              Refunds are available according to our refund policy.
            </p>
          </div>

          <div className="terms-section">
            <h2>6. Limitations</h2>
            <p>
              In no event shall EduLearn or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on EduLearn's website.
            </p>
          </div>

          <div className="terms-section">
            <h2>7. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <ul>
              <li>Email: legal@edulearn.com</li>
              <li>Phone: +91 7735706963</li>
              <li>Address: Bhubaneswar, Odisha, Education City</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Changes
              will be effective immediately upon posting on this page. Your
              continued use of the service after any such changes constitutes
              acceptance of the new terms.
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

export default TermsOfService;

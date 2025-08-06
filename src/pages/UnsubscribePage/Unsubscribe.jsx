import React, { useState } from "react";
import Layout from "../../admin/Utils/Layout"; // Your Layout component
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main"; // Your server URL
import "./unsubscribe.css"; // Import the CSS file

const UnsubscribePage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/newsletter/unsubscribe`,
        {
          email,
        }
      );
      toast.success(data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Layout>
      <div className="unsubscribe-page">
        {/* Background decorations */}
        <div className="background-decorations">
          <div className="decoration decoration-1"></div>
          <div className="decoration decoration-2"></div>
          <div className="decoration decoration-3"></div>
          <div className="decoration decoration-4"></div>
        </div>

        {/* Main container */}
        <div className="main-container">
          {/* Card */}
          <div className="unsubscribe-card">
            {/* Gradient border effect */}
            <div className="gradient-border"></div>

            <div className="card-content">
              {/* Icon with animation */}
              <div className="icon-container">
                <div className="icon-wrapper">
                  <div className="icon-circle">
                    {/* Mail Icon */}
                    <svg
                      className="mail-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  {/* Pulse rings */}
                  <div className="pulse-ring pulse-ring-1"></div>
                  <div className="pulse-ring pulse-ring-2"></div>
                </div>
              </div>

              {/* Content */}
              <div className="content-section">
                <h1 className="title">Unsubscribe</h1>
                <p className="description">
                  We're sorry to see you go! Enter your email address below to
                  be removed from our newsletter list.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="form-container">
                {/* Email Input */}
                <div className="input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={loading}
                    className="email-input"
                  />
                  {/* Input focus effect */}
                  <div className="input-focus-effect"></div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="submit-button"
                >
                  {/* Button shine effect */}
                  <div className="button-shine"></div>

                  <div className="button-content">
                    {loading ? (
                      <>
                        {/* Loader Icon */}
                        <svg
                          className="loader-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="2" x2="12" y2="6" />
                          <line x1="12" y1="18" x2="12" y2="22" />
                          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                          <line x1="2" y1="12" x2="6" y2="12" />
                          <line x1="18" y1="12" x2="22" y2="12" />
                          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Unsubscribe Now</span>
                    )}
                  </div>
                </button>
              </form>

              {/* Additional Info */}
              <div className="additional-info">
                <p className="go-back-text">
                  Changed your mind?{" "}
                  <button
                    type="button"
                    className="go-back-button"
                    onClick={handleGoBack}
                  >
                    Go back
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Floating particles */}
          <div className="floating-particle particle-1"></div>
          <div className="floating-particle particle-2"></div>
          <div className="floating-particle particle-3"></div>
          <div className="floating-particle particle-4"></div>
        </div>
      </div>
    </Layout>
  );
};

export default UnsubscribePage;

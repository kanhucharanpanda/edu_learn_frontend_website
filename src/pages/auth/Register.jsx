import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
// 1. Import the icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // 2. Add state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Create Your Account</h2>
          <p>Join us and unlock a world of learning opportunities!</p>
        </div>
        <div className="auth-form-wrapper">
          <form onSubmit={submitHandler}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>

            {/* 3. Add a wrapper and class for styling */}
            <div className="input-group password-group">
              <label htmlFor="password">Password</label>
              <input
                // 4. Set the input type dynamically
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a strong password"
              />
              {/* 5. Add the toggle button */}
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={btnLoading}
              className="common-btn primary-btn"
            >
              {btnLoading ? "Please Wait..." : "Register"}
            </button>
          </form>
          <div className="auth-links">
            <p className="link-text">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

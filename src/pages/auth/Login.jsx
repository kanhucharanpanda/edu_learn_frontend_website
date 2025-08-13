import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
// 1. Import the necessary icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

/*
  Add the following CSS to your auth.css file to style the show/hide button:

  .password-group {
    position: relative;
  }

  .password-group .form-input, 
  .password-group input {
    padding-right: 45px; 
  }

  .show-password-btn {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.3rem;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
  }
*/

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Add state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Welcome Back!</h2>
          <p>
            Log in to access your courses and continue your learning journey.
          </p>
        </div>
        <div className="auth-form-wrapper">
          <form onSubmit={submitHandler}>
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

            {/* 3. Add a wrapper and a class for styling */}
            <div className="input-group password-group">
              <label htmlFor="password">Password</label>
              <input
                // 4. Set the input type dynamically
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
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
              disabled={btnLoading}
              type="submit"
              className="common-btn primary-btn"
            >
              {btnLoading ? "Please Wait..." : "Login"}
            </button>
          </form>
          <div className="auth-links">
            <p className="link-text">
              Don't have an account?{" "}
              <Link to="/register" className="link">
                Register Now
              </Link>
            </p>
            <p className="link-text forgot-password">
              <Link to="/forgot" className="link">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

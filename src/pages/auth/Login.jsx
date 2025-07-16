// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../../context/UserContext";
// import { CourseData } from "../../context/CourseContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { btnLoading, loginUser } = UserData();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { fetchMyCourse } = CourseData();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await loginUser(email, password, navigate, fetchMyCourse);
//   };
//   return (
//     <div className="auth-page">
//       <div className="auth-form">
//         <h2>Login</h2>
//         <form onSubmit={submitHandler}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button disabled={btnLoading} type="submit" className="common-btn">
//             {btnLoading ? "Please Wait..." : "Login"}
//           </button>
//         </form>
//         <p>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//         <p>
//           <Link to="/forgot">Forgot password?</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

/* Login.jsx */
import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
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

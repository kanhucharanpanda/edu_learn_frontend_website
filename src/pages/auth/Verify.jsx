// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../../context/UserContext";
// import ReCAPTCHA from "react-google-recaptcha";

// const Verify = () => {
//   const [otp, setOtp] = useState("");
//   const { btnLoading, verifyOtp } = UserData();
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate();

//   function onChange(value) {
//     console.log("Captcha value:", value);
//     setShow(true);
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await verifyOtp(Number(otp), navigate);
//   };
//   return (
//     <div className="auth-page">
//       <div className="auth-form">
//         <h2>Verify Account</h2>
//         <form onSubmit={submitHandler}>
//           <label htmlFor="otp">Otp</label>
//           <input
//             type="number"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//           />
//           <ReCAPTCHA
//             sitekey=" 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//             onChange={onChange}
//           />
//           ,
//           {show && (
//             <button disabled={btnLoading} type="submit" className="common-btn">
//               {btnLoading ? "Please Wait..." : "Verify"}
//             </button>
//           )}
//         </form>
//         <p>
//           Go to <Link to="/login">Login</Link> page
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Verify;

/* Verify.jsx */
import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="auth-page verify-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Verify Your Account</h2>
          <p>
            Please enter the OTP sent to your registered email address to
            complete verification.
          </p>
        </div>
        <div className="auth-form-wrapper">
          <form onSubmit={submitHandler}>
            <div className="input-group">
              <label htmlFor="otp">One-Time Password (OTP)</label>
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter 6-digit OTP"
              />
            </div>

            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
              />
            </div>

            {show && (
              <button
                disabled={btnLoading}
                type="submit"
                className="common-btn primary-btn"
              >
                {btnLoading ? "Please Wait..." : "Verify Account"}
              </button>
            )}
          </form>
          <div className="auth-links">
            <p className="link-text">
              Go back to{" "}
              <Link to="/login" className="link">
                Login Page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;

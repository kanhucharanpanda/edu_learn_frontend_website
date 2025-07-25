
/* ResetPassword.jsx */
import React, { useState } from "react";
import "./auth.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/user/reset?token=${params.token}`,
        {
          password,
        }
      );

      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="auth-page reset-password-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Reset Your Password</h2>
          <p>
            Enter a new password for your account. Make it strong and memorable!
          </p>
        </div>
        <div className="auth-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your new password"
              />
            </div>
            <button disabled={btnLoading} className="common-btn primary-btn">
              {btnLoading ? "Please Wait..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext"; // Assuming UserData context provides setUser and setIsAuth
import "./account.css";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear(); // Clear all local storage items
    setUser(null); // Set user state to null or empty object
    setIsAuth(false); // Set authentication status to false
    toast.success("Logged Out Successfully!"); // Show success toast
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="account-page-container">
      {" "}
      {/* New wrapper for consistent background */}
      {user && (
        <div className="profile-card">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="common-btn primary-btn profile-btn"
            >
              <MdDashboard className="button-icon" />
              Dashboard
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="common-btn primary-btn profile-btn"
              >
                <MdDashboard className="button-icon" />
                Admin Dashboard
              </button>
            )}

            <button
              onClick={logoutHandler}
              className="common-btn danger-btn profile-btn" // Using a specific class for danger button
            >
              <IoMdLogOut className="button-icon" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;

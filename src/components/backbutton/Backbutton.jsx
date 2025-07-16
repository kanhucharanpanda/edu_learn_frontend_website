// frontend/src/components/backbutton/BackButton.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5"; // Using a modern icon
import "./backbutton.css"; // Import the new CSS

const BackButton = ({ destination = -1 }) => {
  // Default destination is -1 (go back one step)
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (typeof destination === "number") {
      navigate(destination); // navigate(-1) for back, navigate(-2) for two steps back, etc.
    } else {
      navigate(destination); // navigate('/some-path') for a specific path
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className="back-button"
      aria-label="Go back to previous page"
    >
      <IoArrowBackCircleOutline className="back-icon" />
      <span className="back-text">Back</span>
    </button>
  );
};

export default BackButton;

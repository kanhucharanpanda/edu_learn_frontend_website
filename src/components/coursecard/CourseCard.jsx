
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import "./courseCard.css";

// IMPORTANT: For deployment, this 'server' variable should be dynamically set
// based on your deployed backend URL (e.g., from an environment variable).
// Hardcoding 'localhost' will only work locally.
const server = "https://edu-learn-server-website.onrender.com";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  // Handle delete button click - shows confirmation modal
  const handleDeleteClick = (id) => {
    setDeletingCourseId(id);
    setShowConfirmModal(true);
  };

  // Handle confirmation of delete
  const handleConfirmDelete = async () => {
    setShowConfirmModal(false); // Close modal immediately
    if (!deletingCourseId) return;

    try {
      const { data } = await axios.delete(
        `${server}/api/admin/course/${deletingCourseId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchCourses(); // Refresh the list of courses
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete course.");
    } finally {
      setDeletingCourseId(null); // Clear the deleting course ID
    }
  };

  // Handle cancellation of delete
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setDeletingCourseId(null);
  };

  // Fallback image in case the course.image URL is broken
  // const imageUrl = course.image
  //   ? `${server}/${course.image}`
  //   : `https://placehold.co/300x200/E0E0E0/4A148C?text=Course+Image`;

  const imageUrl = course.image
    ? course.image.url
    : `https://placehold.co/300x200/E0E0E0/4A148C?text=Course+Image`;
  return (
    <div className="course-card-item">
      <img
        src={imageUrl}
        alt={course.title}
        className="course-card-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/300x200/E0E0E0/4A148C?text=Course+Image`;
        }} // Fallback on error
      />
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-instructor">Instructor: {course.createdBy}</p>
        <p className="course-card-duration">
          Duration: {course.duration} weeks
        </p>
        <p className="course-card-price">Price: ₹{course.price}</p>

        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription && user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="common-btn study-btn"
                  >
                    Study Course
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="common-btn get-started-btn"
                  >
                    Get Started
                  </button>
                )}
              </>
            ) : (
              // Admin user sees Study button
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="common-btn study-btn"
              >
                Study Course
              </button>
            )}
          </>
        ) : (
          // Not authenticated, see Get Started (Login)
          <button
            onClick={() => navigate("/login")}
            className="common-btn get-started-btn"
          >
            Get Started
          </button>
        )}

        {user && user.role === "admin" && (
          <button
            onClick={() => handleDeleteClick(course._id)}
            className="common-btn delete-btn"
          >
            Delete Course
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal-content">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
            <div className="modal-actions">
              <button
                onClick={handleConfirmDelete}
                className="common-btn danger-btn"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="common-btn secondary-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;

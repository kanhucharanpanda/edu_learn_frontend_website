
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import axios from "axios";
import Loading from "../../components/loading/Loading"; // Assuming you have a Loading component
import "./coursestudy.css";

// IMPORTANT: For deployment, this 'server' variable should be dynamically set
// based on your deployed backend URL (e.g., from an environment variable).
// Hardcoding 'localhost' will only work locally.
const server = "https://edu-learn-server-website.onrender.com";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  const [courseProgressPercentage, setCourseProgressPercentage] = useState(0);
  const [progressLoading, setProgressLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true); // Added for overall page loading

  const courseId = params.id;

  // Authentication check: Ensure user is logged in and subscribed/admin
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if no user
      return;
    }
    if (user.role !== "admin" && !user.subscription.includes(courseId)) {
      navigate("/"); // Redirect if not authorized
    }
    setPageLoading(false); // User check complete
  }, [user, courseId, navigate]);

  const fetchAllData = async () => {
    const token = localStorage.getItem("token");

    if (!user || !token) {
      // Already handled by useEffect above, but good for defensive coding
      return;
    }

    try {
      await fetchCourse(courseId); // Fetch course details

      const response = await axios.get(`${server}/api/user/progress`, {
        params: { course: courseId },
        headers: {
          token: token,
        },
      });

      if (response.data.courseProgressPercentage !== undefined) {
        setCourseProgressPercentage(response.data.courseProgressPercentage);
      }
    } catch (error) {
      console.error("Error fetching course data or progress:", error);
      // Handle error, maybe show a toast or redirect
    } finally {
      setProgressLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id && !pageLoading) {
      // Only fetch data once user is confirmed and page not loading
      fetchAllData();
    }
  }, [courseId, user, fetchCourse, pageLoading]);

  const isCourseCompleted = courseProgressPercentage >= 100;

  const handleGetCertificate = () => {
    if (isCourseCompleted) {
      navigate(`/certificate/${courseId}`);
    }
  };

  if (pageLoading || progressLoading) {
    return <Loading />; // Show a full-page loading indicator
  }

  return (
    <div className="course-study-page-container">
      {" "}
      {/* New wrapper for consistent background */}
      {course && (
        <div className="course-study-card">
          {" "}
          {/* Main content card */}
          <img
            src={`${server}/${course.image.url}`}
            alt={course.title}
            className="course-study-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/350x200/E0E0E0/4A148C?text=Course+Image`;
            }} // Fallback image
          />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>
          {/* Display Progress */}
          <div className="course-progress-section">
            <h3>Your Progress:</h3>
            <p>{Math.round(courseProgressPercentage)}% Completed</p>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${Math.round(courseProgressPercentage)}%`,
                }}
              ></div>
            </div>
          </div>
          {/* Certificate Section */}
          <div className="certificate-section">
            {isCourseCompleted ? (
              <button
                onClick={handleGetCertificate}
                className="common-btn primary-btn btn-get-certificate"
              >
                Get Your Certificate
              </button>
            ) : (
              <p className="completion-message">
                Complete all lectures to get your certificate.
              </p>
            )}
          </div>
          <Link to={`/lectures/${course._id}`} className="lectures-link-button">
            View Lectures
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseStudy;

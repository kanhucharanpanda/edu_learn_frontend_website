// import React, { useEffect } from "react";
// import "./coursestudy.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import { server } from "../../main";

// const CourseStudy = ({ user }) => {
//   const params = useParams();

//   const { fetchCourse, course } = CourseData();
//   const navigate = useNavigate();

//   if (user && user.role !== "admin" && !user.subscription.includes(params.id))
//     return navigate("/");

//   useEffect(() => {
//     fetchCourse(params.id);
//   }, []);
//   return (
//     <>
//       {course && (
//         <div className="course-study-page">
//           <img src={`${server}/${course.image}`} alt="" width={350} />
//           <h2>{course.title}</h2>
//           <h4>{course.description}</h4>
//           <h5>by - {course.createdBy}</h5>
//           <h5>Duration - {course.duration} weeks</h5>
//           <Link to={`/lectures/${course._id}`}>
//             <h2>Lectures</h2>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default CourseStudy;

// frontend/src/pages/CourseStudy.jsx

// import React, { useEffect, useState } from "react";
// import "./coursestudy.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import { server } from "../../main";
// import axios from "axios"; // Import axios for fetching progress

// // frontend/src/pages/CourseStudy.jsx

// import React, { useEffect, useState } from "react";
// // ... other imports ...
// import axios from "axios";
// import { server } from "../../main";
// import { CourseData } from "../../context/CourseContext"; // Ensure CourseData is imported

//const navigate = useNavigate();

// const CourseStudy = ({ user }) => {
//   const params = useParams();
//   const { fetchCourse, course } = CourseData();
//   // ... other state ...
//   const [courseProgressPercentage, setCourseProgressPercentage] = useState(0);
//   const [progressLoading, setProgressLoading] = useState(true);

//   const courseId = params.id;

//   // ... (Navigation and authentication check at the top) ...

//   // Function to fetch course details and user progress
//   const fetchAllData = async () => {
//     const token = localStorage.getItem("token");

//     // 1. Check if user is authenticated and token exists
//     if (!user || !token) {
//       console.error("CourseStudy: User not authenticated or token missing.");
//       setProgressLoading(false);
//       // We return early if we can't authenticate the request
//       return;
//     }

//     await fetchCourse(courseId);

//     // 2. Fetch user progress for this course, ensuring the token is sent
//     try {
//       setProgressLoading(true);

//       const response = await axios.get(`${server}/api/user/progress`, {
//         params: { course: courseId },
//         headers: {
//           // This sends the token in the 'token' header, matching isAuth.js
//           token: token,
//         },
//       });

//       // ... (rest of the success handling) ...
//       if (response.data.courseProgressPercentage !== undefined) {
//         setCourseProgressPercentage(response.data.courseProgressPercentage);
//       }
//     } catch (error) {
//       console.error("Error fetching course progress:", error);
//       setCourseProgressPercentage(0);
//     } finally {
//       setProgressLoading(false);
//     }
//   };

//   // 3. Ensure useEffect runs when the course ID or user context changes
//   useEffect(() => {
//     // We only run fetchAllData if 'user' is populated, addressing the race condition
//     if (user && user._id) {
//       fetchAllData();
//     }
//   }, [courseId, user]);

//   const isCourseCompleted = courseProgressPercentage >= 100;

//   const handleGetCertificate = () => {
//     if (isCourseCompleted) {
//       // Navigate to the certificate generation page (frontend route)
//       navigate(`/certificate/${courseId}`);
//     }
//   };

//   // ... (rest of the component return) ...

//   return (
//     <>
//       {course && (
//         <div className="course-study-page">
//           <img src={`${server}/${course.image}`} alt="" width={350} />
//           <h2>{course.title}</h2>
//           <h4>{course.description}</h4>
//           <h5>by - {course.createdBy}</h5>
//           <h5>Duration - {course.duration} weeks</h5>

//           {/* Display Progress */}
//           <div className="course-progress">
//             <h3>Your Progress:</h3>
//             {progressLoading ? (
//               <p>Loading progress...</p>
//             ) : (
//               <>
//                 <p>{Math.round(courseProgressPercentage)}% Completed</p>
//                 {/* Visual progress bar */}
//                 <div className="progress-bar-container">
//                   <div
//                     className="progress-bar-fill"
//                     style={{
//                       width: `${Math.round(courseProgressPercentage)}%`,
//                     }}
//                   ></div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Certificate Section */}
//           <div className="certificate-section">
//             {isCourseCompleted ? (
//               <button
//                 onClick={handleGetCertificate}
//                 className="btn-get-certificate"
//               >
//                 Get Your Certificate
//               </button>
//             ) : (
//               <p className="completion-message">
//                 Complete all lectures to get your certificate.
//               </p>
//             )}
//           </div>

//           <Link to={`/lectures/${course._id}`}>
//             <h2>Lectures</h2>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default CourseStudy;

// frontend/src/pages/CourseStudy.jsx

// import React, { useEffect, useState } from "react";
// import "./coursestudy.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import { server } from "../../main";
// import axios from "axios";

// const CourseStudy = ({ user }) => {
//   const params = useParams();

//   const { fetchCourse, course } = CourseData();
//   const navigate = useNavigate(); // <--- navigate is defined here

//   // State to store course progress percentage
//   const [courseProgressPercentage, setCourseProgressPercentage] = useState(0);
//   const [progressLoading, setProgressLoading] = useState(true);

//   const courseId = params.id;

//   // Authentication check: Ensure user is logged in and subscribed/admin
//   if (user && user.role !== "admin" && !user.subscription.includes(courseId)) {
//     return navigate("/");
//   }

//   const fetchAllData = async () => {
//     // ... (fetchAllData logic, including axios call with headers) ...
//     const token = localStorage.getItem("token");

//     if (!user || !token) {
//       // ...
//       return;
//     }

//     await fetchCourse(courseId);

//     try {
//       // ... axios call ...
//       const response = await axios.get(`${server}/api/user/progress`, {
//         params: { course: courseId },
//         headers: {
//           token: token,
//         },
//       });

//       if (response.data.courseProgressPercentage !== undefined) {
//         setCourseProgressPercentage(response.data.courseProgressPercentage);
//       }
//     } catch (error) {
//       // ...
//     } finally {
//       setProgressLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       fetchAllData();
//     }
//   }, [courseId, user, fetchCourse]); // Added fetchCourse to dependencies

//   // Define isCourseCompleted
//   const isCourseCompleted = courseProgressPercentage >= 100;

//   // Define handleGetCertificate within the component's scope
//   const handleGetCertificate = () => {
//     // navigate is accessible here because it's defined in the parent scope
//     if (isCourseCompleted) {
//       navigate(`/certificate/${courseId}`);
//     }
//   };
//   return (
//     <>
//       {course && (
//         <div className="course-study-page">
//           <img src={`${server}/${course.image}`} alt="" width={350} />
//           <h2>{course.title}</h2>
//           <h4>{course.description}</h4>
//           <h5>by - {course.createdBy}</h5>
//           <h5>Duration - {course.duration} weeks</h5>

//           {/* Display Progress */}
//           <div className="course-progress">
//             <h3>Your Progress:</h3>
//             {progressLoading ? (
//               <p>Loading progress...</p>
//             ) : (
//               <>
//                 <p>{Math.round(courseProgressPercentage)}% Completed</p>
//                 {/* Visual progress bar */}
//                 <div className="progress-bar-container">
//                   <div
//                     className="progress-bar-fill"
//                     style={{
//                       width: `${Math.round(courseProgressPercentage)}%`,
//                     }}
//                   ></div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Certificate Section */}
//           <div className="certificate-section">
//             {isCourseCompleted ? (
//               <button
//                 onClick={handleGetCertificate}
//                 className="btn-get-certificate"
//               >
//                 Get Your Certificate
//               </button>
//             ) : (
//               <p className="completion-message">
//                 Complete all lectures to get your certificate.
//               </p>
//             )}
//           </div>

//           <Link to={`/lectures/${course._id}`}>
//             <h2>Lectures</h2>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default CourseStudy;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import axios from "axios";
import Loading from "../../components/loading/Loading"; // Assuming you have a Loading component
import "./coursestudy.css";

// IMPORTANT: For deployment, this 'server' variable should be dynamically set
// based on your deployed backend URL (e.g., from an environment variable).
// Hardcoding 'localhost' will only work locally.
const server = "http://localhost:5000";

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
            src={`${server}/${course.image}`}
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

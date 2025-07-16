import React from "react";
import { CourseData } from "../../context/CourseContext"; // Assuming CourseData context provides mycourse
import CourseCard from "../../components/coursecard/CourseCard"; // Assuming CourseCard component exists and is styled
import "./dashbord.css";

const Dashbord = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard-container">
      {" "}
      {/* New wrapper for consistent background */}
      <div className="dashboard-content-wrapper">
        {" "}
        {/* New wrapper for main content */}
        <h2>All Enrolled Courses</h2>
        <div className="dashboard-courses-grid">
          {" "}
          {/* Changed class name for clarity */}
          {mycourse && mycourse.length > 0 ? (
            mycourse.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p className="no-courses-message">
              No courses enrolled yet. Start your learning journey!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashbord;

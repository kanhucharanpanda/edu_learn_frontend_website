
import React from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard"; // Assuming CourseCard is styled externally

const Courses = () => {
  const { courses } = CourseData();

  console.log(courses);
  return (
    <div className="courses-page-container">
      {" "}
      {/* New wrapper for consistent background */}
      <div className="courses-content-wrapper">
        {" "}
        {/* Main content card */}
        <h2>Available Courses</h2>
        <div className="courses-grid">
          {" "}
          {/* Changed class name for clarity */}
          {courses && courses.length > 0 ? (
            courses.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p className="no-courses-message">No Courses Available Yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

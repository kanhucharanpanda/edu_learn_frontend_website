// import React from "react";
// import "./about.css";

// const About = () => {
//   return (
//     <div className="about">
//       <div className="about-content">
//         <h2>About Us</h2>
//         <p>
//           We are dedicated to providing high quality online courses to help
//           individuals learn and grow in their desired fields. Our experienced
//           instruction ensure that each course is tailored for effective learning
//           and practical application.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from "react";
import "./about.css";
import BackButton from "../../components/backbutton/Backbutton";

const About = () => {
  return (
    <div className="about-page-container">
      <BackButton /> {/* New wrapper for consistent background */}
      <div className="about-content-card">
        {" "}
        {/* Main content card */}
        <h2>About Us</h2>
        <p>
          Welcome to EduLearn, your dedicated platform for high-quality online
          courses! We are passionate about empowering individuals to learn,
          grow, and achieve their full potential in their desired fields.
        </p>
        <p>
          Our mission is to provide accessible, engaging, and practical learning
          experiences. We collaborate with experienced instructors and industry
          experts to ensure that each course is meticulously designed for
          effective learning and real-world application.
        </p>
        <p>
          Whether you're looking to acquire new skills, advance your career, or
          simply explore new interests, EduLearn offers a diverse range of
          courses tailored to meet your needs. Join our thriving community of
          learners and embark on your journey of continuous discovery and
          success!
        </p>
      </div>
    </div>
  );
};

export default About;

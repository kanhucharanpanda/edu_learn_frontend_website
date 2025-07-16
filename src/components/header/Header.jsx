// // import React from "react";
// // import "./header.css";
// // import { Link } from "react-router-dom";

// // const Header = ({ isAuth }) => {
// //   return (
// //     <header>
// //       <div className="logo">E-Learning</div>

// //       <div className="link">
// //         <Link to={"/"}>Home</Link>
// //         <Link to={"/courses"}>Courses</Link>
// //         <Link to={"/about"}>About</Link>
// //         {isAuth ? (
// //           <Link to={"/account"}>Account</Link>
// //         ) : (
// //           <Link to={"/login"}>Login</Link>
// //         )}
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// // import React from "react";
// // import "./header.css";
// // import { Link } from "react-router-dom";

// // const Header = ({ isAuth }) => {
// //   return (
// //     <header className="modern-header">
// //       <div className="header-background">
// //         <div className="gradient-orb orb-1"></div>
// //         <div className="gradient-orb orb-2"></div>
// //         <div className="gradient-orb orb-3"></div>
// //       </div>

// //       <div className="header-content">
// //         <div className="logo-container">
// //           <div className="logo-text">
// //             <span className="logo-main">E-Learning</span>
// //             <div className="logo-underline"></div>
// //           </div>
// //           <div className="logo-particles">
// //             <span className="particle"></span>
// //             <span className="particle"></span>
// //             <span className="particle"></span>
// //           </div>
// //         </div>

// //         <nav className="navigation">
// //           <div className="nav-links">
// //             <Link to="/" className="nav-link">
// //               <span className="link-text">Home</span>
// //               <div className="link-glow"></div>
// //             </Link>
// //             <Link to="/courses" className="nav-link">
// //               <span className="link-text">Courses</span>
// //               <div className="link-glow"></div>
// //             </Link>
// //             <Link to="/about" className="nav-link">
// //               <span className="link-text">About</span>
// //               <div className="link-glow"></div>
// //             </Link>
// //             {isAuth ? (
// //               <Link to="/account" className="nav-link auth-link">
// //                 <span className="link-text">Account</span>
// //                 <div className="link-glow"></div>
// //                 <div className="auth-indicator"></div>
// //               </Link>
// //             ) : (
// //               <Link to="/login" className="nav-link login-btn">
// //                 <span className="link-text">Login</span>
// //                 <div className="login-shine"></div>
// //                 <div className="link-glow"></div>
// //               </Link>
// //             )}
// //           </div>

// //           <div className="mobile-menu">
// //             <div className="hamburger">
// //               <span></span>
// //               <span></span>
// //               <span></span>
// //             </div>
// //           </div>
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./header.css";

// const Header = ({ isAuth }) => {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 100;
//       setScrolled(isScrolled);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className={`header ${scrolled ? "scrolled" : ""}`}>
//       <div className="header-container">
//         <div className="logo">
//           <span className="logo-text">EduVerse</span>
//           <div className="logo-dot"></div>
//         </div>

//         <nav className="nav-links">
//           <Link to="/" className="nav-link">
//             <span>Home</span>
//           </Link>
//           <Link to="/courses" className="nav-link">
//             <span>Courses</span>
//           </Link>
//           <Link to="/about" className="nav-link">
//             <span>About</span>
//           </Link>
//           {isAuth ? (
//             <Link to="/account" className="nav-link account-link">
//               <span>Account</span>
//             </Link>
//           ) : (
//             <Link to="/login" className="login-btn">
//               <span>Login</span>
//               <div className="btn-shine"></div>
//             </Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// frontend/src/components/header/Header.jsx

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./header.css";

// const Header = ({ isAuth }) => {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 100;
//       setScrolled(isScrolled);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className={`header ${scrolled ? "scrolled" : ""}`}>
//       <div className="header-container">
//         <div className="logo">
//           <span className="logo-text">EduVerse</span>
//           <div className="logo-dot"></div>
//         </div>

//         <nav className="nav-links">
//           <Link to="/" className="nav-link">
//             <span>Home</span>
//           </Link>
//           <Link to="/courses" className="nav-link">
//             <span>Courses</span>
//           </Link>
//           <Link to="/about" className="nav-link">
//             <span>About</span>
//           </Link>
//           {/* Add the new Quizzes link here */}
//           <Link to="/quizzes" className="nav-link">
//             <span>Quizzes</span>
//           </Link>
//           {isAuth ? (
//             <Link to="/account" className="nav-link account-link">
//               <span>Account</span>
//             </Link>
//           ) : (
//             <Link to="/login" className="login-btn">
//               <span>Login</span>
//               <div className="btn-shine"></div>
//             </Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ isAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">EduLearn</span>
          <div className="logo-dot"></div>
        </div>

        {/* Mobile menu toggle button */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>
            <span>Home</span>
          </Link>
          <Link to="/courses" className="nav-link" onClick={closeMobileMenu}>
            <span>Courses</span>
          </Link>
          <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
            <span>About</span>
          </Link>
          <Link to="/quizzes" className="nav-link" onClick={closeMobileMenu}>
            <span>Quizzes</span>
          </Link>
          {isAuth ? (
            <Link
              to="/account"
              className="nav-link account-link"
              onClick={closeMobileMenu}
            >
              <span>Account</span>
            </Link>
          ) : (
            <Link to="/login" className="login-btn" onClick={closeMobileMenu}>
              <span>Login</span>
              <div className="btn-shine"></div>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

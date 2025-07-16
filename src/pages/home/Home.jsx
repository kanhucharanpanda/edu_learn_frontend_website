// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./home.css";
// import Testimonials from "../../components/testimonials/Testimonials";

// const Home = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <div className="home">
//         <div className="home-content">
//           <h1>Welcome to our E-learning Platform</h1>
//           <p>Learn, Grow, Excel</p>
//           <button onClick={() => navigate("/courses")} className="common-btn">
//             Get Started
//           </button>
//         </div>
//       </div>
//       <Testimonials />
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./home.css";
// import Testimonials from "../../components/testimonials/Testimonials";

// const Home = () => {
//   const navigate = useNavigate();
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePos({
//         x: (e.clientX / window.innerWidth) * 100,
//         y: (e.clientY / window.innerHeight) * 100,
//       });
//     };

//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div>
//       <div className="home">
//         {/* Dynamic Background Layers */}
//         <div className="cosmic-background">
//           <div className="nebula-layer layer-1"></div>
//           <div className="nebula-layer layer-2"></div>
//           <div className="nebula-layer layer-3"></div>
//         </div>

//         {/* Floating Geometric Elements */}
//         <div className="geometric-shapes">
//           <div className="shape shape-1"></div>
//           <div className="shape shape-2"></div>
//           <div className="shape shape-3"></div>
//           <div className="shape shape-4"></div>
//           <div className="shape shape-5"></div>
//           <div className="shape shape-6"></div>
//         </div>

//         {/* Particle System */}
//         <div className="particle-system">
//           {[...Array(50)].map((_, i) => (
//             <div key={i} className={`particle particle-${i % 5}`}></div>
//           ))}
//         </div>

//         {/* Neural Network Lines */}
//         <div className="neural-network">
//           <svg className="network-svg" viewBox="0 0 1920 1080">
//             <defs>
//               <linearGradient
//                 id="lineGradient"
//                 x1="0%"
//                 y1="0%"
//                 x2="100%"
//                 y2="100%"
//               >
//                 <stop offset="0%" stopColor="#74b9ff" stopOpacity="0.6" />
//                 <stop offset="50%" stopColor="#fd79a8" stopOpacity="0.8" />
//                 <stop offset="100%" stopColor="#fdcb6e" stopOpacity="0.6" />
//               </linearGradient>
//             </defs>

//             <g className="network-lines">
//               <path
//                 d="M100,200 Q500,100 900,300 T1500,250"
//                 stroke="url(#lineGradient)"
//                 strokeWidth="2"
//                 fill="none"
//                 className="neural-path path-1"
//               />
//               <path
//                 d="M200,400 Q600,300 1000,500 T1400,450"
//                 stroke="url(#lineGradient)"
//                 strokeWidth="2"
//                 fill="none"
//                 className="neural-path path-2"
//               />
//               <path
//                 d="M150,600 Q550,500 950,700 T1350,650"
//                 stroke="url(#lineGradient)"
//                 strokeWidth="2"
//                 fill="none"
//                 className="neural-path path-3"
//               />
//             </g>

//             <g className="network-nodes">
//               <circle
//                 cx="100"
//                 cy="200"
//                 r="4"
//                 fill="#74b9ff"
//                 className="neural-node node-1"
//               />
//               <circle
//                 cx="500"
//                 cy="100"
//                 r="4"
//                 fill="#fd79a8"
//                 className="neural-node node-2"
//               />
//               <circle
//                 cx="900"
//                 cy="300"
//                 r="4"
//                 fill="#fdcb6e"
//                 className="neural-node node-3"
//               />
//               <circle
//                 cx="1300"
//                 cy="250"
//                 r="4"
//                 fill="#74b9ff"
//                 className="neural-node node-4"
//               />
//               <circle
//                 cx="200"
//                 cy="400"
//                 r="4"
//                 fill="#fd79a8"
//                 className="neural-node node-5"
//               />
//               <circle
//                 cx="600"
//                 cy="300"
//                 r="4"
//                 fill="#fdcb6e"
//                 className="neural-node node-6"
//               />
//             </g>
//           </svg>
//         </div>

//         {/* Interactive Mouse Follower */}
//         <div
//           className="cosmic-cursor"
//           style={{
//             left: `${mousePos.x}%`,
//             top: `${mousePos.y}%`,
//           }}
//         >
//           <div className="cursor-ring ring-1"></div>
//           <div className="cursor-ring ring-2"></div>
//           <div className="cursor-ring ring-3"></div>
//         </div>

//         {/* Main Content */}
//         <div
//           className="home-content"
//           style={{
//             transform: `translateY(${scrollY * 0.3}px)`,
//           }}
//         >
//           <div className="content-container">
//             {/* Hero Title with 3D Effect */}
//             <div className="hero-title">
//               <h1 className="title-main">
//                 <span className="title-word word-1">Welcome</span>
//                 <span className="title-word word-2">to our</span>
//                 <span className="title-word word-3">E-learning</span>
//                 <span className="title-word word-4">Platform</span>
//               </h1>

//               <div className="title-effects">
//                 <div className="title-glow"></div>
//                 <div className="title-reflection"></div>
//               </div>
//             </div>

//             {/* Animated Subtitle */}
//             <div className="hero-subtitle">
//               <p className="subtitle-text">
//                 <span className="subtitle-word">Learn,</span>
//                 <span className="subtitle-word">Grow,</span>
//                 <span className="subtitle-word">Excel</span>
//               </p>
//               <div className="subtitle-underline"></div>
//             </div>

//             {/* Futuristic CTA Button */}
//             <div className="cta-container">
//               <button
//                 onClick={() => navigate("/courses")}
//                 className="quantum-btn"
//               >
//                 <div className="btn-content">
//                   <span className="btn-text">Get Started</span>
//                   <div className="btn-icon">
//                     <div className="icon-arrow"></div>
//                   </div>
//                 </div>

//                 <div className="btn-effects">
//                   <div className="btn-plasma"></div>
//                   <div className="btn-lightning">
//                     <div className="lightning-bolt bolt-1"></div>
//                     <div className="lightning-bolt bolt-2"></div>
//                   </div>
//                   <div className="btn-ripple"></div>
//                 </div>

//                 <div className="btn-particles">
//                   {[...Array(12)].map((_, i) => (
//                     <span
//                       key={i}
//                       className={`btn-particle particle-${i}`}
//                     ></span>
//                   ))}
//                 </div>
//               </button>
//             </div>

//             {/* Feature Highlights */}
//             <div className="feature-cards">
//               <div className="feature-card card-1">
//                 <div className="card-icon">
//                   <div className="icon-brain"></div>
//                 </div>
//                 <h3>AI-Powered Learning</h3>
//                 <p>Personalized learning paths</p>
//               </div>

//               <div className="feature-card card-2">
//                 <div className="card-icon">
//                   <div className="icon-rocket"></div>
//                 </div>
//                 <h3>Fast Progress</h3>
//                 <p>Accelerated skill development</p>
//               </div>

//               <div className="feature-card card-3">
//                 <div className="card-icon">
//                   <div className="icon-globe"></div>
//                 </div>
//                 <h3>Global Community</h3>
//                 <p>Connect with learners worldwide</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Action Elements */}
//         <div className="floating-elements">
//           <div className="floating-orb orb-1"></div>
//           <div className="floating-orb orb-2"></div>
//           <div className="floating-orb orb-3"></div>
//         </div>

//         {/* Wave Animation at Bottom */}
//         <div className="wave-container">
//           <svg
//             className="wave-svg"
//             viewBox="0 0 1920 200"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M0,100 Q480,50 960,100 T1920,100 V200 H0 Z"
//               fill="url(#waveGradient)"
//               className="wave-path"
//             />
//             <defs>
//               <linearGradient
//                 id="waveGradient"
//                 x1="0%"
//                 y1="0%"
//                 x2="100%"
//                 y2="0%"
//               >
//                 <stop offset="0%" stopColor="rgba(116, 185, 255, 0.3)" />
//                 <stop offset="50%" stopColor="rgba(253, 121, 168, 0.3)" />
//                 <stop offset="100%" stopColor="rgba(253, 203, 110, 0.3)" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//       </div>

//       <Testimonials />
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀 New Course Available</span>
          </div>

          <h1 className="hero-title">
            Master New Skills with
            <span className="gradient-text"> Expert Guidance</span>
          </h1>

          <p className="hero-description">
            Join thousands of learners who are transforming their careers with
            our cutting-edge courses designed by industry professionals.
          </p>

          <div className="hero-buttons">
            <button
              onClick={() => navigate("/courses")}
              className="primary-btn"
            >
              <span>Start Learning</span>
              <div className="btn-glow"></div>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Platform?</h2>
            <p>
              Experience learning like never before with our innovative approach
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 17l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Interactive Learning</h3>
              <p>
                Engage with hands-on projects, quizzes, and real-world scenarios
                that make learning stick.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="12,6 12,12 16,14"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Learn at Your Pace</h3>
              <p>
                Access courses 24/7 and learn at your own speed with lifetime
                access to all materials.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="8"
                    y="2"
                    width="8"
                    height="4"
                    rx="1"
                    ry="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Get Certified</h3>
              <p>
                Earn industry-recognized certificates that boost your career
                prospects and credibility.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M23 21v-2a4 4 0 0 0-3-3.87"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 3.13a4 4 0 0 1 0 7.75"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Expert Community</h3>
              <p>
                Connect with instructors and peers in our supportive learning
                community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Career?</h2>
            <p>
              Join thousands of successful learners who have already transformed
              their lives
            </p>
            <button onClick={() => navigate("/courses")} className="cta-button">
              <span>Explore Courses</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

export default Home;

// import React from "react";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Header from "./components/header/Header";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Verify from "./pages/auth/Verify";
// import Footer from "./components/footer/Footer";
// import About from "./pages/about/About";
// import Account from "./pages/account/Account";
// import { UserData } from "./context/UserContext";
// import Loading from "./components/loading/Loading";
// import Courses from "./pages/courses/Courses";
// import CourseDescription from "./pages/coursedescription/CourseDescription";
// import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
// import Dashbord from "./pages/dashbord/Dashbord";
// import CourseStudy from "./pages/coursestudy/CourseStudy";
// import Lecture from "./pages/lecture/Lecture";
// import AdminDashbord from "./admin/Dashboard/AdminDashbord";
// import AdminCourses from "./admin/Courses/AdminCourses";
// import AdminUsers from "./admin/Users/AdminUsers";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import Unsubscribe from "./pages/UnsubscribePage/Unsubscribe";
// import QuizCategories from "./pages/QuizCategories";
// import QuizPage from "./pages/QuizPage";
// import QuizResult from "./pages/QuizResult";
// import CertificatePage from "./pages/CertificatePage";

// //Import the new pages
// import HelpCenter from "./pages/HelpCenter/HelpCenter";
// import FAQ from "./pages/FAQ/FAQ";
// import TermsOfService from "./pages/TermOfService/TermOfService";
// import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
// import Accessibility from "./pages/Accessibility/Accessibility";
// import Contact from "./pages/Contact/Contact";
// const App = () => {
//   const { isAuth, user, loading } = UserData();

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <BrowserRouter>
//           <Header isAuth={isAuth} user={user} />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />

//             {/* FIXED: Conditional courses route based on user role */}
//             <Route
//               path="/courses"
//               element={
//                 isAuth && user && user.role === "admin" ? (
//                   <AdminCourses user={user} />
//                 ) : (
//                   <Courses />
//                 )
//               }
//             />

//             <Route
//               path="/account"
//               element={isAuth ? <Account user={user} /> : <Login />}
//             />
//             <Route path="/login" element={isAuth ? <Home /> : <Login />} />
//             <Route
//               path="/register"
//               element={isAuth ? <Home /> : <Register />}
//             />
//             <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
//             <Route
//               path="/forgot"
//               element={isAuth ? <Home /> : <ForgotPassword />}
//             />
//             <Route
//               path="/reset-password/:token"
//               element={isAuth ? <Home /> : <ResetPassword />}
//             />
//             <Route
//               path="/course/:id"
//               element={isAuth ? <CourseDescription user={user} /> : <Login />}
//             />
//             <Route
//               path="/payment-success/:id"
//               element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
//             />
//             <Route
//               path="/:id/dashboard"
//               element={isAuth ? <Dashbord user={user} /> : <Login />}
//             />
//             <Route
//               path="/course/study/:id"
//               element={isAuth ? <CourseStudy user={user} /> : <Login />}
//             />
//             <Route
//               path="/lectures/:id"
//               element={isAuth ? <Lecture user={user} /> : <Login />}
//             />
//             <Route
//               path="/admin/dashboard"
//               element={isAuth ? <AdminDashbord user={user} /> : <Login />}
//             />

//             {/* Keep the admin route as backup */}
//             <Route
//               path="/admin/course"
//               element={isAuth ? <AdminCourses user={user} /> : <Login />}
//             />
//             <Route
//               path="/admin/users"
//               element={isAuth ? <AdminUsers user={user} /> : <Login />}
//             />
//             <Route
//               path="/certificate/:courseId"
//               element={isAuth ? <CertificatePage user={user} /> : <Login />}
//             />
//             <Route path="/unsubscribe" element={<Unsubscribe />} />
//             <Route path="/quizzes" element={<QuizCategories />} />
//             {/* Placeholder for QuizPage and QuizResult routes, we'll add them later */}
//             <Route path="/quiz/:category/:roundNumber" element={<QuizPage />} />
//             <Route
//               path="/quiz/:category/:roundNumber/results"
//               element={<QuizResult />}
//             />

//             <Route path="/help" element={<HelpCenter />} />
//             <Route path="/faq" element={<FAQ />} />
//             <Route path="/terms" element={<TermsOfService />} />
//             <Route path="/privacy" element={<PrivacyPolicy />} />

//             <Route path="/accessibility" element={<Accessibility />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//           <Footer />
//         </BrowserRouter>
//       )}
//     </>
//   );
// };

// export default App;

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import Dashbord from "./pages/dashbord/Dashbord";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import AdminDashbord from "./admin/Dashboard/AdminDashbord";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Unsubscribe from "./pages/UnsubscribePage/Unsubscribe";
import QuizCategories from "./pages/QuizCategories";
import QuizPage from "./pages/QuizPage";
import QuizResult from "./pages/QuizResult";
import CertificatePage from "./pages/CertificatePage";

//Import the new pages
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import FAQ from "./pages/FAQ/FAQ";
import TermsOfService from "./pages/TermOfService/TermOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Accessibility from "./pages/Accessibility/Accessibility";
import Contact from "./pages/Contact/Contact";
const App = () => {
  const { isAuth, user, loading } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* FIXED: Conditional courses route based on user role */}
            <Route
              path="/courses"
              element={
                isAuth && user && user.role === "admin" ? (
                  <AdminCourses user={user} />
                ) : (
                  <Courses />
                )
              }
            />

            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route
              path="/forgot"
              element={isAuth ? <Home /> : <ForgotPassword />}
            />
            <Route
              path="/reset-password/:token"
              element={isAuth ? <Home /> : <ResetPassword />}
            />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashbord user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashbord user={user} /> : <Login />}
            />

            {/* Keep the admin route as backup */}
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
            <Route
              path="/certificate/:courseId"
              element={isAuth ? <CertificatePage user={user} /> : <Login />}
            />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/quizzes" element={<QuizCategories />} />
            {/* Placeholder for QuizPage and QuizResult routes, we'll add them later */}
            <Route path="/quiz/:category/:roundNumber" element={<QuizPage />} />
            <Route
              path="/quiz/:category/:roundNumber/results"
              element={<QuizResult />}
            />

            <Route path="/help" element={<HelpCenter />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;


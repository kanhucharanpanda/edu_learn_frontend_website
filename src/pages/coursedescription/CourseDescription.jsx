// import React, { useEffect, useState } from "react";
// import "./coursedescription.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// //import { server } from "../../main";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { UserData } from "../../context/UserContext";
// import Loading from "../../components/loading/Loading";

// const server = "http://localhost:5000";

// const CourseDescription = ({ user }) => {
//   const params = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const { fetchUser } = UserData();

//   const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

//   useEffect(() => {
//     fetchCourse(params.id);
//   }, []);

//   const checkoutHandler = async () => {
//     const token = localStorage.getItem("token");
//     setLoading(true);

//     const {
//       data: { order },
//     } = await axios.post(
//       `${server}/api/course/checkout/${params.id}`,
//       {},
//       {
//         headers: {
//           token,
//         },
//       }
//     );

//     const options = {
//       key: "rzp_test_jB23Sn1nsTlY7h", // Enter the Key ID generated from the Dashboard
//       amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency: "INR",
//       name: "E learning", //your business name
//       description: "Learn with us",
//       order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

//       handler: async function (response) {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//           response;

//         try {
//           const { data } = await axios.post(
//             `${server}/api/verification/${params.id}`,
//             {
//               razorpay_order_id,
//               razorpay_payment_id,
//               razorpay_signature,
//             },
//             {
//               headers: {
//                 token,
//               },
//             }
//           );

//           await fetchUser();
//           await fetchCourses();
//           await fetchMyCourse();
//           toast.success(data.message);
//           setLoading(false);
//           navigate(`/payment-success/${razorpay_payment_id}`);
//         } catch (error) {
//           toast.error(error.response.data.message);
//           setLoading(false);
//         }
//       },
//       theme: {
//         color: "#8a4baf",
//       },
//     };
//     const razorpay = new window.Razorpay(options);

//     razorpay.open();
//   };

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           {course && (
//             <div className="course-description">
//               <div className="course-header">
//                 <img
//                   src={`${server}/${course.image}`}
//                   alt=""
//                   className="course-image"
//                 />
//                 <div className="course-info">
//                   <h2>{course.title}</h2>
//                   <p>Instructor: {course.createdBy}</p>
//                   <p>Duration: {course.duration} weeks</p>
//                 </div>
//               </div>

//               <p>{course.description}</p>

//               <p>Let's get started with course At ₹{course.price}</p>

//               {user && user.subscription.includes(course._id) ? (
//                 <button
//                   onClick={() => navigate(`/course/study/${course._id}`)}
//                   className="common-btn"
//                 >
//                   Study
//                 </button>
//               ) : (
//                 <button onClick={checkoutHandler} className="common-btn">
//                   Buy Now
//                 </button>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default CourseDescription;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

// IMPORTANT: For deployment, this 'server' variable should be dynamically set
// based on your deployed backend URL (e.g., from an environment variable).
// Hardcoding 'localhost' will only work locally.
const server = "http://localhost:5000";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id, fetchCourse]); // Added params.id and fetchCourse to dependencies

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      const options = {
        key: "rzp_test_jB23Sn1nsTlY7h", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "EduLearn", // your business name
        description: "Learn with us",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(
              error.response.data.message || "Payment verification failed."
            );
            setLoading(false);
          }
        },
        theme: {
          color: "#4A148C", // Deep Purple from new theme
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to initiate checkout."
      );
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="course-description-page-container">
          {" "}
          {/* New wrapper for consistent background */}
          {course && (
            <div className="course-description-card">
              {" "}
              {/* Main content card */}
              <div className="course-header-section">
                <img
                  src={`${server}/${course.image}`}
                  alt={course.title}
                  className="course-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/200x150/E0E0E0/4A148C?text=Course+Image`;
                  }} // Fallback image
                />
                <div className="course-info-details">
                  <h2>{course.title}</h2>
                  <p>
                    <strong>Instructor:</strong> {course.createdBy}
                  </p>
                  <p>
                    <strong>Duration:</strong> {course.duration} weeks
                  </p>
                  <p className="course-price">Price: ₹{course.price}</p>
                </div>
              </div>
              <div className="course-full-description">
                <h3>About This Course</h3>
                <p>{course.description}</p>
              </div>
              {user &&
              user.subscription &&
              user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn primary-btn"
                >
                  Start Studying
                </button>
              ) : (
                <button
                  onClick={checkoutHandler}
                  className="common-btn primary-btn"
                >
                  Buy Now
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CourseDescription;

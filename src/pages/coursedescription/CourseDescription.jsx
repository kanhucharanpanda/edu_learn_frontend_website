import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import "./coursedescription.css";

// --- FIX: Use the environment variable for the server URL ---
const server = import.meta.env.VITE_API_URL;

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // Set initial loading to true

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  // Stabilize fetchCourse with useCallback
  const stableFetchCourse = useCallback(fetchCourse, []);

  useEffect(() => {
    stableFetchCourse(params.id).finally(() => setLoading(false));
  }, [params.id, stableFetchCourse]);

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
        key: "rzp_test_jB23Sn1nsTlY7h", // Replace with your actual Razorpay Key ID
        amount: order.amount,
        currency: "INR",
        name: "EduLearn",
        description: "Learn with us",
        order_id: order.id,
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
          color: "#4A148C",
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
          {course && (
            <div className="course-description-card">
              <div className="course-header-section">
                {/* --- FIX: Use course.image.url for the image source --- */}
                <img
                  src={course.image.url}
                  alt={course.title}
                  className="course-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/200x150/E0E0E0/4A148C?text=Course+Image`;
                  }}
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

// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import {
//   AiOutlineLoading3Quarters,
//   AiOutlineCheckCircle,
//   AiOutlineCloseCircle,
//   AiOutlineMail,
// } from "react-icons/ai";
// import "./unsubscribe.css";

// const Unsubscribe = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState(""); // 'success' or 'error'
//   const [isUnsubscribed, setIsUnsubscribed] = useState(false);

//   useEffect(() => {
//     const emailFromUrl = searchParams.get("email");
//     if (emailFromUrl) {
//       setEmail(decodeURIComponent(emailFromUrl));
//     }
//   }, [searchParams]);

//   const handleUnsubscribe = async (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       setMessage("Please enter your email address");
//       setMessageType("error");
//       return;
//     }

//     setIsLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/newsletter/unsubscribe?email=${encodeURIComponent(
//           email
//         )}`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Successfully unsubscribed from our newsletter");
//         setMessageType("success");
//         setIsUnsubscribed(true);
//       } else {
//         setMessage(data.error || "Something went wrong. Please try again.");
//         setMessageType("error");
//       }
//     } catch (error) {
//       setMessage("Network error. Please check your connection and try again.");
//       setMessageType("error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className="unsubscribe-container">
//       <div className="unsubscribe-card">
//         <div className="unsubscribe-header">
//           <AiOutlineMail className="unsubscribe-icon" />
//           <h1>Unsubscribe from Newsletter</h1>
//           <p>We're sorry to see you go!</p>
//         </div>

//         {!isUnsubscribed ? (
//           <form className="unsubscribe-form" onSubmit={handleUnsubscribe}>
//             <div className="form-group">
//               <label htmlFor="email">Email Address</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 disabled={isLoading}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="unsubscribe-btn"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <AiOutlineLoading3Quarters className="loading-icon" />
//                   Processing...
//                 </>
//               ) : (
//                 "Unsubscribe"
//               )}
//             </button>

//             {message && (
//               <div className={`message ${messageType}`}>
//                 {messageType === "success" ? (
//                   <AiOutlineCheckCircle className="message-icon" />
//                 ) : (
//                   <AiOutlineCloseCircle className="message-icon" />
//                 )}
//                 <span>{message}</span>
//               </div>
//             )}
//           </form>
//         ) : (
//           <div className="unsubscribe-success">
//             <AiOutlineCheckCircle className="success-icon" />
//             <h2>Unsubscribed Successfully!</h2>
//             <p>
//               You have been successfully unsubscribed from our newsletter. You
//               won't receive any more email updates from us.
//             </p>
//             <p>
//               If you change your mind, you can always subscribe again by
//               visiting our website and entering your email in the newsletter
//               subscription form.
//             </p>
//             <button className="home-btn" onClick={handleGoHome}>
//               Go to Homepage
//             </button>
//           </div>
//         )}

//         <div className="unsubscribe-footer">
//           <p>
//             Need help? Contact us at{" "}
//             <a href="mailto:support@edulearn.com">support@edulearn.com</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Unsubscribe;

import { useState, useEffect } from "react";

export default function Unsubscribe() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    const tokenParam = urlParams.get("token");

    if (emailParam) {
      setEmail(emailParam);
    }
    if (tokenParam) {
      setToken(tokenParam);
    }

    // If both email and token are present, auto-unsubscribe
    if (emailParam && tokenParam) {
      handleUnsubscribe(emailParam, tokenParam);
    } else if (emailParam) {
      setStatus("confirm");
    } else {
      setStatus("error");
      setMessage("Invalid unsubscribe link");
    }
  }, []);

  const handleUnsubscribe = async (emailToUnsubscribe, tokenToUse) => {
    try {
      setStatus("loading");
      const response = await fetch(
        `/api/newsletter/unsubscribe?email=${encodeURIComponent(
          emailToUnsubscribe
        )}&token=${tokenToUse}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          "You have been successfully unsubscribed from our newsletter."
        );
      } else {
        setStatus("error");
        setMessage(data.message || "An error occurred while unsubscribing.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred while unsubscribing. Please try again.");
    }
  };

  const handleConfirmUnsubscribe = async () => {
    try {
      setStatus("loading");
      const response = await fetch(
        `/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok && data.unsubscribeUrl) {
        window.location.href = data.unsubscribeUrl;
      } else {
        setStatus("error");
        setMessage(
          data.message || "An error occurred while generating unsubscribe link."
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your request...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Successfully Unsubscribed
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-4">
              You will no longer receive email notifications from EduLearn.
            </p>
            <div className="space-y-3">
              <a
                href="/"
                className="inline-block w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
              >
                Return to Homepage
              </a>
              <button
                onClick={() => {
                  setStatus("confirm");
                  setMessage("");
                }}
                className="inline-block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Resubscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Unsubscribe Failed
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <a
                href="/"
                className="inline-block w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
              >
                Return to Homepage
              </a>
              <a
                href="mailto:info@edulearn.com"
                className="inline-block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "confirm") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Confirm Unsubscribe
            </h1>
            <p className="text-gray-600 mb-4">
              Are you sure you want to unsubscribe from our newsletter?
            </p>
            <div className="mb-6 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Email: {email}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleConfirmUnsubscribe}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
              >
                Yes, Unsubscribe
              </button>
              <a
                href="/"
                className="inline-block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

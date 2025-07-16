// import React, { useState } from "react";
// import {
//   AiOutlineMail,
//   AiOutlinePhone,
//   AiOutlineEnvironment,
//   AiOutlineClockCircle,
//   AiOutlineSend,
//   AiOutlineCheckCircle,
//   AiOutlineCloseCircle,
//   AiOutlineLoading3Quarters,
//   AiOutlineUser,
//   AiOutlineMessage,
//   AiOutlineQuestionCircle,
//   AiOutlineBug,
//   AiOutlineCreditCard,
//   AiOutlineBook,
//   AiOutlineEye,
//   AiOutlineTeam,
// } from "react-icons/ai";
// import "./Contact.css";
// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//     category: "general",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [statusMessage, setStatusMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     // Basic validation
//     if (
//       !formData.name.trim() ||
//       !formData.email.trim() ||
//       !formData.subject.trim() ||
//       !formData.message.trim()
//     ) {
//       setSubmitStatus("error");
//       setStatusMessage("Please fill in all required fields.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email.trim())) {
//       setSubmitStatus("error");
//       setStatusMessage("Please enter a valid email address.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       setSubmitStatus("success");
//       setStatusMessage(
//         "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
//       );

//       // Reset form after success
//       setTimeout(() => {
//         setFormData({
//           name: "",
//           email: "",
//           subject: "",
//           message: "",
//           category: "general",
//         });
//         setSubmitStatus(null);
//         setStatusMessage("");
//       }, 5000);
//     } catch (error) {
//       setSubmitStatus("error");
//       setStatusMessage("Something went wrong. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: <AiOutlineMail className="contact-card-icon" />,
//       title: "Email Us",
//       info: "info@edulearn.com",
//       description: "Send us an email anytime",
//       link: "mailto:info@edulearn.com",
//     },
//     {
//       icon: <AiOutlinePhone className="contact-card-icon" />,
//       title: "Call Us",
//       info: "+91 7735706963",
//       description: "Mon-Fri 9:00 AM - 6:00 PM IST",
//       link: "tel:+917735706963",
//     },
//     {
//       icon: <AiOutlineEnvironment className="contact-card-icon" />,
//       title: "Visit Us",
//       info: "Bhubaneswar, Odisha",
//       description: "Education City, India",
//       link: null,
//     },
//     {
//       icon: <AiOutlineClockCircle className="contact-card-icon" />,
//       title: "Business Hours",
//       info: "Monday - Friday",
//       description: "9:00 AM - 6:00 PM IST",
//       link: null,
//     },
//   ];

//   const categories = [
//     {
//       value: "general",
//       label: "General Inquiry",
//       icon: <AiOutlineQuestionCircle />,
//     },
//     { value: "technical", label: "Technical Support", icon: <AiOutlineBug /> },
//     {
//       value: "billing",
//       label: "Billing & Payments",
//       icon: <AiOutlineCreditCard />,
//     },
//     { value: "course", label: "Course Information", icon: <AiOutlineBook /> },
//     {
//       value: "accessibility",
//       label: "Accessibility Support",
//       icon: <AiOutlineEye />,
//     },
//     { value: "partnership", label: "Partnership", icon: <AiOutlineTeam /> },
//   ];

//   return (
//     <div className="contact-page">
//       <div className="contact-container">
//         {/* Header Section */}
//         <div className="contact-header">
//           <h1>Get in Touch</h1>
//           <p>
//             We're here to help! Reach out to us for any questions, support, or
//             feedback about EduLearn.
//           </p>
//         </div>

//         {/* Contact Info Cards */}
//         <div className="contact-info-grid">
//           {contactInfo.map((item, index) => (
//             <div key={index} className="contact-info-card">
//               <div className="contact-card-icon-wrapper">{item.icon}</div>
//               <div className="contact-card-content">
//                 <h3>{item.title}</h3>
//                 {item.link ? (
//                   <a href={item.link} className="contact-card-link">
//                     {item.info}
//                   </a>
//                 ) : (
//                   <p className="contact-card-info">{item.info}</p>
//                 )}
//                 <p className="contact-card-description">{item.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div className="contact-main">
//           {/* Contact Form */}
//           <div className="contact-form-section">
//             <h2>Send us a Message</h2>
//             <div className="contact-form">
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="name">
//                     <AiOutlineUser className="form-icon" />
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     disabled={isSubmitting}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">
//                     <AiOutlineMail className="form-icon" />
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter your email address"
//                     disabled={isSubmitting}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="category">
//                   <AiOutlineQuestionCircle className="form-icon" />
//                   Category
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   disabled={isSubmitting}
//                 >
//                   {categories.map((category) => (
//                     <option key={category.value} value={category.value}>
//                       {category.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="subject">
//                   <AiOutlineMessage className="form-icon" />
//                   Subject *
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleInputChange}
//                   placeholder="Brief description of your inquiry"
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="message">
//                   <AiOutlineMessage className="form-icon" />
//                   Message *
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   placeholder="Please provide details about your inquiry..."
//                   rows={6}
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               {/* Status Message */}
//               {submitStatus && (
//                 <div className={`form-message ${submitStatus}`}>
//                   {submitStatus === "success" ? (
//                     <AiOutlineCheckCircle className="message-icon" />
//                   ) : (
//                     <AiOutlineCloseCircle className="message-icon" />
//                   )}
//                   <span>{statusMessage}</span>
//                 </div>
//               )}

//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className={`contact-submit-btn ${
//                   isSubmitting ? "submitting" : ""
//                 }`}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <AiOutlineLoading3Quarters className="loading-icon" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <AiOutlineSend className="send-icon" />
//                     Send Message
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Quick Help Section */}
//           <div className="quick-help-section">
//             <h2>Quick Help</h2>

//             <div className="help-cards">
//               <div className="help-card">
//                 <AiOutlineQuestionCircle className="help-icon" />
//                 <h3>FAQ</h3>
//                 <p>
//                   Find answers to commonly asked questions about our platform
//                   and courses.
//                 </p>
//                 <a href="/faq" className="help-link">
//                   Browse FAQ →
//                 </a>
//               </div>

//               <div className="help-card">
//                 <AiOutlineBug className="help-icon" />
//                 <h3>Technical Support</h3>
//                 <p>
//                   Having technical issues? Report bugs or get help with platform
//                   problems.
//                 </p>
//                 <a href="/help" className="help-link">
//                   Get Help →
//                 </a>
//               </div>

//               <div className="help-card">
//                 <AiOutlineEye className="help-icon" />
//                 <h3>Accessibility</h3>
//                 <p>
//                   Need assistance with accessibility features? We're here to
//                   help.
//                 </p>
//                 <a href="/accessibility" className="help-link">
//                   Learn More →
//                 </a>
//               </div>
//             </div>

//             <div className="response-time-notice">
//               <AiOutlineClockCircle className="notice-icon" />
//               <div>
//                 <h4>Response Time</h4>
//                 <p>
//                   We typically respond to inquiries within 24 hours during
//                   business days. For urgent technical issues, please call our
//                   support line.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
  AiOutlineSend,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineQuestionCircle,
  AiOutlineBug,
  AiOutlineCreditCard,
  AiOutlineBook,
  AiOutlineEye,
  AiOutlineTeam,
} from "react-icons/ai";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus("error");
      setStatusMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus("error");
      setStatusMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      // --- REAL API CALL TO YOUR BACKEND ---
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle errors from the backend
        throw new Error(data.message || "An unknown error occurred.");
      }

      setSubmitStatus("success");
      setStatusMessage(
        "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
      );

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          category: "general",
        });
        setSubmitStatus(null);
        setStatusMessage("");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      // Display the specific error message from the backend or a generic one
      setStatusMessage(
        error.message || "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <AiOutlineMail className="contact-card-icon" />,
      title: "Email Us",
      info: "info@edulearn.com",
      description: "Send us an email anytime",
      link: "mailto:info@edulearn.com",
    },
    {
      icon: <AiOutlinePhone className="contact-card-icon" />,
      title: "Call Us",
      info: "+91 7735706963",
      description: "Mon-Fri 9:00 AM - 6:00 PM IST",
      link: "tel:+917735706963",
    },
    {
      icon: <AiOutlineEnvironment className="contact-card-icon" />,
      title: "Visit Us",
      info: "Bhubaneswar, Odisha",
      description: "Education City, India",
      link: null,
    },
    {
      icon: <AiOutlineClockCircle className="contact-card-icon" />,
      title: "Business Hours",
      info: "Monday - Friday",
      description: "9:00 AM - 6:00 PM IST",
      link: null,
    },
  ];

  const categories = [
    {
      value: "general",
      label: "General Inquiry",
      icon: <AiOutlineQuestionCircle />,
    },
    { value: "technical", label: "Technical Support", icon: <AiOutlineBug /> },
    {
      value: "billing",
      label: "Billing & Payments",
      icon: <AiOutlineCreditCard />,
    },
    { value: "course", label: "Course Information", icon: <AiOutlineBook /> },
    {
      value: "accessibility",
      label: "Accessibility Support",
      icon: <AiOutlineEye />,
    },
    { value: "partnership", label: "Partnership", icon: <AiOutlineTeam /> },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>
            We're here to help! Reach out to us for any questions, support, or
            feedback about EduLearn.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-info-grid">
          {contactInfo.map((item, index) => (
            <div key={index} className="contact-info-card">
              <div className="contact-card-icon-wrapper">{item.icon}</div>
              <div className="contact-card-content">
                <h3>{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className="contact-card-link">
                    {item.info}
                  </a>
                ) : (
                  <p className="contact-card-info">{item.info}</p>
                )}
                <p className="contact-card-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="contact-main">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <AiOutlineUser className="form-icon" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <AiOutlineMail className="form-icon" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  <AiOutlineQuestionCircle className="form-icon" />
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  <AiOutlineMessage className="form-icon" />
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your inquiry"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <AiOutlineMessage className="form-icon" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide details about your inquiry..."
                  rows={6}
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Status Message */}
              {submitStatus && (
                <div className={`form-message ${submitStatus}`}>
                  {submitStatus === "success" ? (
                    <AiOutlineCheckCircle className="message-icon" />
                  ) : (
                    <AiOutlineCloseCircle className="message-icon" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                className={`contact-submit-btn ${
                  isSubmitting ? "submitting" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <AiOutlineLoading3Quarters className="loading-icon" />
                    Sending...
                  </>
                ) : (
                  <>
                    <AiOutlineSend className="send-icon" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Help Section */}
          <div className="quick-help-section">
            <h2>Quick Help</h2>

            <div className="help-cards">
              <div className="help-card">
                <AiOutlineQuestionCircle className="help-icon" />
                <h3>FAQ</h3>
                <p>
                  Find answers to commonly asked questions about our platform
                  and courses.
                </p>
                <a href="/faq" className="help-link">
                  Browse FAQ →
                </a>
              </div>

              <div className="help-card">
                <AiOutlineBug className="help-icon" />
                <h3>Technical Support</h3>
                <p>
                  Having technical issues? Report bugs or get help with platform
                  problems.
                </p>
                <a href="/help" className="help-link">
                  Get Help →
                </a>
              </div>

              <div className="help-card">
                <AiOutlineEye className="help-icon" />
                <h3>Accessibility</h3>
                <p>
                  Need assistance with accessibility features? We're here to
                  help.
                </p>
                <a href="/accessibility" className="help-link">
                  Learn More →
                </a>
              </div>
            </div>

            <div className="response-time-notice">
              <AiOutlineClockCircle className="notice-icon" />
              <div>
                <h4>Response Time</h4>
                <p>
                  We typically respond to inquiries within 24 hours during
                  business days. For urgent technical issues, please call our
                  support line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

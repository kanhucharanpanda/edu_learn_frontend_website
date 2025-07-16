import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is EduLearn?",
      answer:
        "EduLearn is a comprehensive e-learning platform that offers a wide range of courses to help you master new skills and advance your career.",
    },
    {
      question: "How do I enroll in a course?",
      answer:
        "Simply browse our course catalog, select the course you're interested in, and click 'Enroll Now'. You'll need to create an account if you haven't already.",
    },
    {
      question: "Are the courses free?",
      answer:
        "We offer both free and premium courses. Free courses provide basic content, while premium courses include advanced materials, certificates, and instructor support.",
    },
    {
      question: "Can I get a certificate after completing a course?",
      answer:
        "Yes, you'll receive a certificate of completion for premium courses. Free courses may offer participation certificates.",
    },
    {
      question: "How long do I have access to a course?",
      answer:
        "Once enrolled, you have lifetime access to the course content, including any future updates and additional materials.",
    },
    {
      question: "What if I'm not satisfied with a course?",
      answer:
        "We offer a 30-day money-back guarantee for all premium courses. If you're not satisfied, contact our support team for a full refund.",
    },
    {
      question: "Are there any technical requirements?",
      answer:
        "You'll need a stable internet connection and a modern web browser. Our platform works on desktop, tablet, and mobile devices.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team via email at support@edulearn.com or call us at +91 7735706963 during business hours.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-content">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div
                className={`faq-question ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <h3>{item.question}</h3>
                <span className="faq-toggle">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

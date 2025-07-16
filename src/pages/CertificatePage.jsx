import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// Assuming main.jsx exports the server URL
import { server } from "../main";
import "./CertificatePage.css";
// Import PDF libraries
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificatePage = ({ user }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificateData = async () => {
      const token = localStorage.getItem("token");

      if (!user) {
        navigate("/login");
        return;
      }

      try {
        // Fetch certificate data from the backend
        // We are using axios here, assuming you have it installed and configured
        const response = await axios.get(
          `${server}/api/course/${courseId}/certificate`,
          {
            headers: {
              // Assuming you are handling authentication via cookies or headers (e.g., JWT)

              token: token, // If using cookies, axios sends them automatically. If JWT, ensure 'Authorization' header is set if needed.
            },
            withCredentials: true, // Crucial for sending cookies/session data
          }
        );

        setCertificateData(response.data.certificateData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching certificate:", err);
        // Handle 403 Forbidden if course is not completed
        if (err.response && err.response.status === 403) {
          setError("You have not completed this course yet.");
        } else {
          setError("Failed to load certificate. Please try again.");
        }
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchCertificateData();
    }
  }, [courseId, navigate, user]);
  const handleDownload = () => {
    const input = document.getElementById("certificate-template");

    if (!input) {
      console.error("Certificate element not found.");
      return;
    }

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Save the PDF file
      pdf.save(`Certificate_${courseId}.pdf`);
    });
  };
  if (loading) {
    return <div className="certificate-loading">Loading certificate...</div>;
  }

  if (error) {
    return <div className="certificate-error">Error: {error}</div>;
  }

  if (!certificateData) {
    return (
      <div className="certificate-error">
        Certificate data could not be retrieved.
      </div>
    );
  }

  return (
    <div className="certificate-page-wrapper">
      <div className="certificate-container" id="certificate-template">
        <div className="certificate-header">
          <h1>Certificate of Completion</h1>
          <p>AWARDED TO</p>
        </div>
        <div className="certificate-body">
          <h2 className="user-name">{certificateData.userName}</h2>
          <p>for successfully completing the course</p>
          <h3 className="course-title">"{certificateData.courseName}"</h3>
          <div className="completion-details">
            <p>ON: {certificateData.completionDate}</p>
          </div>
        </div>
        <div className="certificate-footer">
          <div className="signature-area">
            {/* Add signature/instructor info here */}
            <p>Instructor Signature</p>
            <hr />
          </div>
          <div className="signature-area">
            {/* Add institute logo/seal here */}
            <p>E-Learning Institute</p>
          </div>
        </div>
      </div>
      <button onClick={handleDownload} className="download-certificate-button">
        Download Certificate
      </button>
    </div>
  );
};

export default CertificatePage;

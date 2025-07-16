// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../Utils/Layout";
// import axios from "axios";
// import { server } from "../../main";
// import "./dashboard.css";

// const AdminDashbord = ({ user }) => {
//   const navigate = useNavigate();

//   if (user && user.role !== "admin") return navigate("/");

//   const [stats, setStats] = useState([]);

//   async function fetchStats() {
//     try {
//       const { data } = await axios.get(`${server}/api/stats`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });

//       setStats(data.stats);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchStats();
//   }, []);
//   return (
//     <div>
//       <Layout>
//         <div className="main-content">
//           <div className="box">
//             <p>Total Courses</p>
//             <p>{stats.totalCoures}</p>
//           </div>
//           <div className="box">
//             <p>Total Lectures</p>
//             <p>{stats.totalLectures}</p>
//           </div>
//           <div className="box">
//             <p>Total Users</p>
//             <p>{stats.totalUsers}</p>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default AdminDashbord;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout"; // Assuming Layout component exists
import axios from "axios";
import { server } from "../../main"; // Assuming 'server' is defined in main.js or a config file
import "./dashboard.css"; // Reusing dashboard.css for main layout and common styles
import Loading from "../../components/loading/Loading"; // Assuming a Loading component

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  // Redirect if user is not an admin or not logged in
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [stats, setStats] = useState({
    totalCoures: 0,
    totalLectures: 0,
    totalUsers: 0,
    // Add more stats if your API provides them
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchStats() {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (err) {
      console.error("Error fetching admin stats:", err);
      setError(
        err.response?.data?.message || "Failed to fetch dashboard stats."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Fetch stats only if user is confirmed to be an admin
    if (user && user.role === "admin") {
      fetchStats();
    }
  }, [user]); // Depend on user to ensure it's loaded

  if (!user || user.role !== "admin") {
    return <Loading />; // Show loading or redirect, prevent rendering if not admin
  }

  if (loading) {
    return <Loading />; // Show loading indicator while fetching stats
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Display error message
  }

  return (
    <Layout>
      <div className="student-dashboard-container">
        {" "}
        {/* Reusing container for consistent background/padding */}
        <div className="dashboard-content-wrapper">
          {" "}
          {/* Reusing wrapper for card-like appearance */}
          <h2>Admin Dashboard Overview</h2>
          <div className="admin-stats-grid">
            {" "}
            {/* New class for the stats grid */}
            <div className="stat-box">
              <p className="stat-label">Total Courses</p>
              <p className="stat-value">{stats.totalCoures}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">Total Lectures</p>
              <p className="stat-value">{stats.totalLectures}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">Total Users</p>
              <p className="stat-value">{stats.totalUsers}</p>
            </div>
            {/* Add more stat boxes as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;

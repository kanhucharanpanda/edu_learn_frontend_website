// import React, { useState } from "react";
// import Layout from "../Utils/Layout";
// import { useNavigate } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import CourseCard from "../../components/coursecard/CourseCard";
// import "./admincourses.css";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { server } from "../../main";

// const categories = [
//   "Web Development",
//   "App Development",
//   "Game Development",
//   "Data Science",
//   "Artificial Intelligence",
// ];

// const AdminCourses = ({ user }) => {
//   const navigate = useNavigate();

//   if (user && user.role !== "admin") return navigate("/");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [createdBy, setCreatedBy] = useState("");
//   const [duration, setDuration] = useState("");
//   const [image, setImage] = useState("");
//   const [imagePrev, setImagePrev] = useState("");
//   const [btnLoading, setBtnLoading] = useState(false);

//   const changeImageHandler = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setImagePrev(reader.result);
//       setImage(file);
//     };
//   };

//   const { courses, fetchCourses } = CourseData();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     const myForm = new FormData();

//     myForm.append("title", title);
//     myForm.append("description", description);
//     myForm.append("category", category);
//     myForm.append("price", price);
//     myForm.append("createdBy", createdBy);
//     myForm.append("duration", duration);
//     myForm.append("file", image);

//     try {
//       const { data } = await axios.post(`${server}/api/course/new`, myForm, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });

//       toast.success(data.message);
//       setBtnLoading(false);
//       await fetchCourses();
//       setImage("");
//       setTitle("");
//       setDescription("");
//       setDuration("");
//       setImagePrev("");
//       setCreatedBy("");
//       setPrice("");
//       setCategory("");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <Layout>
//       <div className="admin-courses">
//         <div className="left">
//           <h1>All Courses</h1>
//           <div className="dashboard-content">
//             {courses && courses.length > 0 ? (
//               courses.map((e) => {
//                 return <CourseCard key={e._id} course={e} />;
//               })
//             ) : (
//               <p>No Courses Yet</p>
//             )}
//           </div>
//         </div>

//         <div className="right">
//           <div className="add-course">
//             <div className="course-form">
//               <h2>Add Course</h2>
//               <form onSubmit={submitHandler}>
//                 <label htmlFor="text">Title</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />

//                 <label htmlFor="text">Description</label>
//                 <input
//                   type="text"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />

//                 <label htmlFor="text">Price</label>
//                 <input
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                 />

//                 <label htmlFor="text">createdBy</label>
//                 <input
//                   type="text"
//                   value={createdBy}
//                   onChange={(e) => setCreatedBy(e.target.value)}
//                   required
//                 />

//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   <option value={""}>Select Category</option>
//                   {categories.map((e) => (
//                     <option value={e} key={e}>
//                       {e}
//                     </option>
//                   ))}
//                 </select>

//                 <label htmlFor="text">Duration</label>
//                 <input
//                   type="number"
//                   value={duration}
//                   onChange={(e) => setDuration(e.target.value)}
//                   required
//                 />

//                 <input type="file" required onChange={changeImageHandler} />
//                 {imagePrev && <img src={imagePrev} alt="" width={300} />}

//                 <button
//                   type="submit"
//                   disabled={btnLoading}
//                   className="common-btn"
//                 >
//                   {btnLoading ? "Please Wait..." : "Add"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminCourses;

// import React, { useState } from "react";
// import Layout from "../Utils/Layout";
// import { useNavigate } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import CourseCard from "../../components/coursecard/CourseCard";
// import "./admincourses.css";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { server } from "../../main";

// const categories = [
//   "Web Development",
//   "App Development",
//   "Game Development",
//   "Data Science",
//   "Artificial Intelligence",
// ];

// const AdminCourses = ({ user }) => {
//   const navigate = useNavigate();

//   if (user && user.role !== "admin") return navigate("/");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [createdBy, setCreatedBy] = useState("");
//   const [duration, setDuration] = useState("");
//   const [image, setImage] = useState("");
//   const [imagePrev, setImagePrev] = useState("");
//   const [btnLoading, setBtnLoading] = useState(false);

//   const changeImageHandler = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setImagePrev(reader.result);
//       setImage(file);
//     };
//   };

//   const { courses, fetchCourses } = CourseData();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     const myForm = new FormData();
//     myForm.append("title", title);
//     myForm.append("description", description);
//     myForm.append("category", category);
//     myForm.append("price", price);
//     myForm.append("createdBy", createdBy);
//     myForm.append("duration", duration);
//     myForm.append("file", image);

//     try {
//       const { data } = await axios.post(`${server}/api/course/new`, myForm, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });

//       toast.success(data.message);
//       setBtnLoading(false);
//       await fetchCourses();

//       // Reset form
//       setImage("");
//       setTitle("");
//       setDescription("");
//       setDuration("");
//       setImagePrev("");
//       setCreatedBy("");
//       setPrice("");
//       setCategory("");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//       setBtnLoading(false);
//     }
//   };

//   // Debug: Log to see if component is rendering
//   console.log("AdminCourses rendering, user:", user);
//   console.log("Courses:", courses);

//   return (
//     <Layout>
//       <div className="admin-courses">
//         <div className="left">
//           <h1>All Courses</h1>
//           <div className="dashboard-content">
//             {courses && courses.length > 0 ? (
//               courses.map((e) => {
//                 return <CourseCard key={e._id} course={e} />;
//               })
//             ) : (
//               <p>No Courses Yet</p>
//             )}
//           </div>
//         </div>

//         <div className="right">
//           <div className="add-course">
//             <div className="course-form">
//               <h2>Add Course</h2>
//               <form onSubmit={submitHandler}>
//                 <div className="form-group">
//                   <label htmlFor="title">Title</label>
//                   <input
//                     id="title"
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                     placeholder="Enter course title"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="description">Description</label>
//                   <textarea
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                     placeholder="Enter course description"
//                     rows="3"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="price">Price</label>
//                   <input
//                     id="price"
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     required
//                     placeholder="Enter price"
//                     min="0"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="createdBy">Created By</label>
//                   <input
//                     id="createdBy"
//                     type="text"
//                     value={createdBy}
//                     onChange={(e) => setCreatedBy(e.target.value)}
//                     required
//                     placeholder="Enter instructor name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="category">Category</label>
//                   <select
//                     id="category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option value={cat} key={cat}>
//                         {cat}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="duration">Duration (hours)</label>
//                   <input
//                     id="duration"
//                     type="number"
//                     value={duration}
//                     onChange={(e) => setDuration(e.target.value)}
//                     required
//                     placeholder="Enter duration in hours"
//                     min="1"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="image">Course Image</label>
//                   <input
//                     id="image"
//                     type="file"
//                     required
//                     onChange={changeImageHandler}
//                     accept="image/*"
//                   />
//                   {imagePrev && (
//                     <div className="image-preview">
//                       <img src={imagePrev} alt="Preview" width={300} />
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={btnLoading}
//                   className="common-btn"
//                 >
//                   {btnLoading ? "Please Wait..." : "Add Course"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminCourses;

import React, { useState } from "react";
import Layout from "../Utils/Layout"; // Assuming Layout component exists
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard"; // Assuming CourseCard component exists and is styled
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";

// IMPORTANT: For deployment, this 'server' variable should be dynamically set
// based on your deployed backend URL (e.g., from an environment variable).
// Hardcoding 'localhost' will only work locally.
const server = "http://localhost:5000";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
  "Cybersecurity", // Added more categories
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  // Redirect if user is not an admin
  if (user && user.role !== "admin") {
    navigate("/");
    return null; // Return null to prevent rendering
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Important for FormData
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses(); // Refresh courses list
      // Clear form fields
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message || "Failed to add course.");
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses-page-container">
        {" "}
        {/* New wrapper for consistent background */}
        <div className="admin-courses-wrapper">
          {" "}
          {/* Main content wrapper */}
          <div className="admin-courses-list-section">
            <h1>All Courses</h1>
            <div className="admin-dashboard-courses-grid">
              {" "}
              {/* Changed class name for clarity */}
              {courses && courses.length > 0 ? (
                courses.map((e) => {
                  return <CourseCard key={e._id} course={e} />;
                })
              ) : (
                <p className="no-courses-message">No Courses Available Yet</p>
              )}
            </div>
          </div>
          <div className="add-course-section">
            <div className="add-course-form-card">
              {" "}
              {/* Main content card */}
              <h2>Add New Course</h2>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="title">Course Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g., React Fundamentals"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Brief description of the course"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price (₹)</label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="e.g., 999"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="createdBy">Created By (Instructor)</label>
                  <input
                    type="text"
                    id="createdBy"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                    placeholder="e.g., John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value={""}>Select Category</option>
                    {categories.map((e) => (
                      <option value={e} key={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration (weeks)</label>
                  <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    placeholder="e.g., 8"
                  />
                </div>

                <div className="form-group file-input-group">
                  <label htmlFor="courseImage">Course Image</label>
                  <input
                    type="file"
                    id="courseImage"
                    required
                    onChange={changeImageHandler}
                  />
                  {imagePrev && (
                    <img
                      src={imagePrev}
                      alt="Course Preview"
                      className="image-preview"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={btnLoading}
                  className="common-btn primary-btn"
                >
                  {btnLoading ? "Please Wait..." : "Add Course"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;

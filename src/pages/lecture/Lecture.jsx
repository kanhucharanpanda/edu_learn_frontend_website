
import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main"; // Assuming 'server' is defined in main.js or a config file
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null); // Renamed 'lecture' to 'currentLecture' for clarity
  const [loading, setLoading] = useState(true); // For initial page load
  const [lecLoading, setLecLoading] = useState(false); // For individual lecture loading
  const [showAddLectureForm, setShowAddLectureForm] = useState(false); // Renamed 'show' for clarity
  const params = useParams();
  const navigate = useNavigate();

  // Form states for adding new lecture
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null); // Renamed 'video' to 'videoFile' for clarity
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  // State for delete confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletingLectureId, setDeletingLectureId] = useState(null);

  // Progress states
  const [completedPercentage, setCompletedPercentage] = useState(0); // Renamed 'completed'
  const [completedLecturesCount, setCompletedLecturesCount] = useState(0); // Renamed 'completedLec'
  const [allLecturesCount, setAllLecturesCount] = useState(0); // Renamed 'lectLength'
  const [userProgressLectures, setUserProgressLectures] = useState([]); // Renamed 'progress'

  // Authentication and Authorization Check
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    // If not admin and not subscribed, redirect
    if (user.role !== "admin" && !user.subscription.includes(params.id)) {
      toast.error("You are not authorized to view this course.");
      navigate("/");
    }
  }, [user, params.id, navigate]);

  // Fetch all lectures for the course
  async function fetchLectures() {
    try {
      setLoading(true); // Set loading for initial fetch
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      if (data.lectures.length > 0) {
        // Automatically load the first lecture if available
        setCurrentLecture(data.lectures[0]);
      } else {
        setCurrentLecture(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      toast.error(error.response?.data?.message || "Failed to fetch lectures.");
      setLectures([]);
      setLoading(false);
    }
  }

  // Fetch a single lecture by ID (when clicked from list)
  async function fetchSingleLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCurrentLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.error("Error fetching single lecture:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch lecture details."
      );
      setLecLoading(false);
    }
  }

  // Fetch user's progress for the course
  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCompletedPercentage(data.courseProgressPercentage);
      setCompletedLecturesCount(data.completedLectures.length); // Assuming completedLectures is an array of IDs
      setAllLecturesCount(data.allLectures);
      setUserProgressLectures(data.progress); // This seems to be an array of progress objects
    } catch (error) {
      console.error("Error fetching user progress:", error);
      // toast.error(error.response?.data?.message || "Failed to fetch progress.");
    }
  }

  // Handler for video file input change
  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVideoPrev(reader.result);
        setVideo(file);
      };
    } else {
      setVideoPrev("");
      setVideo(null);
    }
  };

  // Handler for adding new lecture form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("video", video); // 'video' is the actual file object

    try {
      const { data } = await axios.post(
        `${server}/api/admin/course/${params.id}/lecture`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data", // Important for FormData
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShowAddLectureForm(false); // Close form after submission
      fetchLectures(); // Refresh lectures list
      fetchProgress(); // Refresh progress as new lecture added
      // Clear form fields
      setTitle("");
      setDescription("");
      setVideo(null);
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add lecture.");
      setBtnLoading(false);
    }
  };

  // Handler for showing delete confirmation modal
  const handleDeleteClick = (id) => {
    setDeletingLectureId(id);
    setShowConfirmModal(true);
  };

  // Handler for confirming lecture deletion
  const handleConfirmDelete = async () => {
    setShowConfirmModal(false); // Close modal immediately
    if (!deletingLectureId) return;

    try {
      const { data } = await axios.delete(
        `${server}/api/admin/lecture/${deletingLectureId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchLectures(); // Refresh lectures list
      fetchProgress(); // Refresh progress
      // If the deleted lecture was the current one, clear it
      if (currentLecture && currentLecture._id === deletingLectureId) {
        setCurrentLecture(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete lecture.");
    } finally {
      setDeletingLectureId(null); // Clear the deleting lecture ID
    }
  };

  // Handler for canceling lecture deletion
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setDeletingLectureId(null);
  };

  // Mark lecture as completed
  const addProgress = async (lectureId) => {
    // Check if lecture is already completed to avoid redundant calls
    const currentProgress = userProgressLectures[0]?.completedLectures || [];
    if (currentProgress.includes(lectureId)) {
      console.log("Lecture already marked as complete.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${lectureId}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message); // Show success message
      fetchProgress(); // Refresh progress after marking complete
    } catch (error) {
      console.error("Error adding progress:", error);
      toast.error(
        error.response?.data?.message || "Failed to mark lecture as complete."
      );
    }
  };

  // Initial data fetch
  useEffect(() => {
    // Only fetch if user is defined and authorized (handled by the first useEffect)
    if (
      user &&
      (user.role === "admin" || user.subscription.includes(params.id))
    ) {
      fetchLectures();
      fetchProgress();
    }
  }, [user, params.id]); // Re-run if user or course ID changes

  // Set first lecture as current when lectures are fetched
  useEffect(() => {
    if (lectures.length > 0 && !currentLecture) {
      setCurrentLecture(lectures[0]);
    }
  }, [lectures, currentLecture]);

  if (loading) {
    return <Loading />;
  }

  // Check if the current user's progress indicates this lecture is completed
  const isLectureCompleted = (lectureId) => {
    const progressEntry = userProgressLectures[0]; // Assuming progress is an array and we take the first entry
    return progressEntry && progressEntry.completedLectures.includes(lectureId);
  };

  console.log("Lecture data for video player:", currentLecture);

  return (
    <>
      <div className="lecture-page-container">
        {" "}
        {/* Main wrapper for consistent background */}
        <div className="lecture-content-wrapper">
          {" "}
          {/* Main card-like content area */}
          <div className="progress-section">
            <p className="progress-text">
              Lecture completed:{" "}
              <span className="progress-count">{completedLecturesCount}</span>{" "}
              out of <span className="progress-total">{allLecturesCount}</span>
            </p>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.round(completedPercentage)}%` }}
              ></div>
            </div>
            <p className="progress-percentage">
              {Math.round(completedPercentage)}% Completed
            </p>
          </div>
          <div className="lecture-main-content">
            <div className="left-panel">
              {" "}
              {/* Renamed for clarity */}
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {currentLecture && currentLecture.video ? (
                    <>
                      <video
                        key={currentLecture._id} // Key to force re-render when lecture changes
                        src={currentLecture.video.url}
                        className="lecture-video-player"
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        onEnded={() => addProgress(currentLecture._id)}
                      >
                        Your browser does not support the video tag.
                      </video>
                      <div className="lecture-details">
                        <h1>{currentLecture.title}</h1>
                        <h3>{currentLecture.description}</h3>
                      </div>
                    </>
                  ) : (
                    <div className="no-lecture-selected">
                      <h1>Please Select a Lecture to Start</h1>
                      <p>
                        Click on a lecture from the list on the right to begin.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="right-panel">
              {" "}
              {/* Renamed for clarity */}
              {user && user.role === "admin" && (
                <button
                  className="common-btn primary-btn add-lecture-toggle-btn"
                  onClick={() => setShowAddLectureForm(!showAddLectureForm)}
                >
                  {showAddLectureForm ? "Close Add Form" : "Add New Lecture +"}
                </button>
              )}
              {showAddLectureForm && (
                <div className="lecture-form-card">
                  {" "}
                  {/* Card for the form */}
                  <h2>Add Lecture</h2>
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="lectureTitle">Title</label>
                      <input
                        type="text"
                        id="lectureTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Lecture Title"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lectureDescription">Description</label>
                      <input
                        type="text"
                        id="lectureDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Lecture Description"
                      />
                    </div>

                    <div className="form-group file-input-group">
                      <label htmlFor="lectureVideo">Choose Video</label>
                      <input
                        type="file"
                        id="lectureVideo"
                        accept="video/*" // Accept only video files
                        onChange={changeVideoHandler}
                        required
                      />
                      {videoPrev && (
                        <video
                          src={videoPrev}
                          alt="Video Preview"
                          className="video-preview"
                          controls
                        ></video>
                      )}
                    </div>

                    <button
                      disabled={btnLoading}
                      type="submit"
                      className="common-btn primary-btn"
                    >
                      {btnLoading ? "Please Wait..." : "Add Lecture"}
                    </button>
                  </form>
                </div>
              )}
              <div className="lectures-list-card">
                {" "}
                {/* Card for the lecture list */}
                <h3>Lecture List</h3>
                {lectures && lectures.length > 0 ? (
                  lectures.map((e, i) => (
                    <div key={e._id} className="lecture-item-wrapper">
                      <div
                        onClick={() => fetchSingleLecture(e._id)}
                        className={`lecture-item ${
                          currentLecture && currentLecture._id === e._id
                            ? "active"
                            : ""
                        } ${isLectureCompleted(e._id) ? "completed" : ""}`}
                      >
                        <span className="lecture-number-text">{i + 1}.</span>{" "}
                        {e.title}
                        {isLectureCompleted(e._id) && (
                          <span className="tick-icon">
                            <TiTick />
                          </span>
                        )}
                      </div>
                      {user && user.role === "admin" && (
                        <button
                          className="common-btn delete-btn lecture-delete-btn"
                          onClick={() => handleDeleteClick(e._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-lectures-message">
                    No Lectures Available Yet!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal-content">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete this lecture? This action cannot
              be undone.
            </p>
            <div className="modal-actions">
              <button
                onClick={handleConfirmDelete}
                className="common-btn danger-btn"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="common-btn secondary-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;

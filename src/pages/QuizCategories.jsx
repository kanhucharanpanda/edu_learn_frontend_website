
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizCategories.css"; // Import the CSS for styling
import BackButton from "../components/backbutton/Backbutton";

const server = "https://edu-learn-server-website.onrender.com";

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);
  // Store user progress: { category: [completedRoundNumbers] }
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define the maximum number of rounds you expect for any quiz
  // This is now set to 9 as per your request (8/9 rounds)
  const MAX_ROUNDS = 9; // Updated to 9 rounds per category

  useEffect(() => {
    const fetchAllQuizData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          navigate("/login");
          return;
        }

        // 1. Fetch all available quiz categories
        const categoriesResponse = await fetch(
          `${server}/api/quiz/categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!categoriesResponse.ok) {
          const errorData = await categoriesResponse.json();
          throw new Error(errorData.message || "Failed to fetch categories");
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.categories);

        // 2. For each category, fetch the user's completed rounds
        const progressPromises = categoriesData.categories.map(async (cat) => {
          const progressResponse = await fetch(
            `${server}/api/quiz/${cat}/progress`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!progressResponse.ok) {
            // If progress fetch fails for a category, log it but don't stop everything
            console.warn(
              `Failed to fetch progress for ${cat}:`,
              await progressResponse.json()
            );
            return { category: cat, completedRounds: [] };
          }
          const progressData = await progressResponse.json();
          return {
            category: cat,
            completedRounds: progressData.completedRounds,
          };
        });

        const allProgress = await Promise.all(progressPromises);
        const progressMap = allProgress.reduce((acc, item) => {
          acc[item.category] = item.completedRounds;
          return acc;
        }, {});
        setUserProgress(progressMap);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError(err.message || "Failed to load quiz data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuizData();
  }, [navigate]);

  // Function to determine the action when a round button is clicked
  const handleRoundClick = (category, round) => {
    const completedRoundsForCategory = userProgress[category] || [];
    const isRoundCompleted = completedRoundsForCategory.includes(round);

    if (isRoundCompleted) {
      // If round is completed, navigate to results page
      navigate(`/quiz/${category}/${round}/results`);
    } else {
      // If round is not completed, navigate to quiz page
      navigate(`/quiz/${category}/${round}`);
    }
  };

  // Helper to render category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "java":
        return "☕";
      case "python":
        return "🐍";
      case "javascript":
        return "🌐";
      case "aiml": // New category
        return "�";
      case "sql":
        return "📊";
      case "mongodb":
        return "🍃";
      case "aptitude": // New category
        return "🧠";
      case "dsa":
        return "🌳";
      case "c": // New category
        return "💻";
      case "html": // New category
        return " Markup"; // Using text as icon for HTML
      case "css": // New category
        return "🎨";
      default:
        return "📚";
    }
  };

  if (loading) {
    return (
      <div className="loading-message">
        Loading quiz categories and your progress...
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="quiz-categories-container">
      <BackButton />
      <h2>Choose a Quiz Category and Round</h2>
      {categories.length === 0 ? (
        <div className="no-categories-message">
          No quiz categories available yet.
        </div>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category} className="category-card">
              <span className="category-icon">{getCategoryIcon(category)}</span>
              <h3>{category.toUpperCase()}</h3>{" "}
              {/* Display category name in uppercase */}
              <p>Select a round:</p>
              <div className="rounds-container">
                {/* Generate round buttons dynamically */}
                {Array.from({ length: MAX_ROUNDS }, (_, i) => i + 1).map(
                  (round) => {
                    // Corrected typo: 'completedRroundsForCategory' changed to 'completedRoundsForCategory'
                    const completedRoundsForCategory =
                      userProgress[category] || [];
                    const isRoundCompleted =
                      completedRoundsForCategory.includes(round);
                    const previousRoundCompleted =
                      round === 1 ||
                      completedRoundsForCategory.includes(round - 1); // Enable next round if previous is done

                    return (
                      <button
                        key={round}
                        className={`round-button ${
                          isRoundCompleted ? "completed" : ""
                        }`}
                        onClick={() => handleRoundClick(category, round)}
                        // Disable future rounds if previous is not completed (optional logic)
                        disabled={!previousRoundCompleted && round > 1}
                      >
                        Round {round} {isRoundCompleted ? "✅" : ""}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizCategories;

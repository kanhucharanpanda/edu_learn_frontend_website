// frontend/src/pages/QuizResult.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./QuizResult.css"; // Import the CSS for styling
import BackButton from "../components/backbutton/Backbutton";
import { server } from "../main";

const QuizResult = () => {
  const { category, roundNumber } = useParams(); // Get category and round from URL params
  const navigate = useNavigate();
  const location = useLocation(); // To access state passed from navigate

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Try to get score and totalQuestions from navigation state first
  // This is useful if coming directly from quiz submission
  const initialScore = location.state?.score;
  const initialTotalQuestions = location.state?.totalQuestions;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token"); // Get token
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await fetch(
          `${server}/api/quiz/${category}/${roundNumber}/results`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch quiz results");
        }

        const data = await response.json();
        setAttempt(data.attempt);
      } catch (err) {
        console.error("Error fetching quiz results:", err);
        setError(err.message || "Failed to load quiz results.");
      } finally {
        setLoading(false);
      }
    };

    // If score and totalQuestions are available from navigation state,
    // we can display them immediately while fetching full details in background
    if (initialScore !== undefined && initialTotalQuestions !== undefined) {
      setAttempt({
        score: initialScore,
        totalQuestions: initialTotalQuestions,
        quizCategory: category,
        roundNumber: parseInt(roundNumber),
        answers: [], // Answers will be populated after fetch
      });
      fetchResults(); // Still fetch full details for question breakdown
    } else {
      fetchResults(); // If no initial state, just fetch everything
    }
  }, [category, roundNumber, navigate, initialScore, initialTotalQuestions]);

  const handleRetakeQuiz = () => {
    // Navigate back to the quiz page for the same category and round
    // This will allow the user to retake the quiz (if backend allows, currently it prevents)
    navigate(`/quiz/${category}/${roundNumber}`);
  };

  const handleNextRound = () => {
    // Navigate to the next round for the same category
    const nextRound = parseInt(roundNumber) + 1;
    navigate(`/quiz/${category}/${nextRound}`);
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to your home page
  };

  if (loading) {
    return <div className="loading-message">Loading quiz results...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!attempt) {
    return (
      <div className="no-results-message">
        No results found for this quiz attempt.
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <div className="quiz-result-container">
        <h2>{attempt.quizCategory.toUpperCase()} Quiz Results</h2>
        <p className="quiz-details-header">Round {attempt.roundNumber}</p>

        <div className="score-summary">
          <p>Your Score:</p>
          <span>
            {attempt.score} / {attempt.totalQuestions}
          </span>
        </div>

        <h3 className="quiz-details-header">Detailed Breakdown</h3>
        {attempt.answers.length === 0 && (
          <p className="loading-message">Loading detailed answers...</p>
        )}

        {attempt.answers.map((answer, index) => (
          <div
            key={answer.questionId?._id || index} // Use questionId if populated, else index
            className={`question-result-card ${
              answer.isCorrect ? "correct" : "incorrect"
            }`}
          >
            <h3>
              Q{index + 1}:{" "}
              {answer.questionId?.questionText || "Question text not available"}
            </h3>
            <ul className="options-result-list">
              {answer.questionId?.options.map((option, optIndex) => (
                <li
                  key={optIndex}
                  className={`option-result-item
                                    ${
                                      optIndex === answer.userAnswerIndex &&
                                      !answer.isCorrect
                                        ? "incorrect-user-answer"
                                        : ""
                                    }
                                    ${
                                      optIndex === answer.userAnswerIndex &&
                                      answer.isCorrect
                                        ? "user-answer"
                                        : ""
                                    }
                                    ${
                                      optIndex ===
                                      answer.questionId?.correctAnswer
                                        ? "correct-answer"
                                        : ""
                                    }
                                `}
                >
                  <span className="result-icon">
                    {optIndex === answer.userAnswerIndex &&
                      (answer.isCorrect ? "✅" : "❌")}
                    {optIndex === answer.questionId?.correctAnswer &&
                      !answer.isCorrect &&
                      "✅"}
                  </span>
                  {option}
                </li>
              ))}
            </ul>
            {/* Display correct answer if user got it wrong */}
            {!answer.isCorrect && answer.questionId && (
              <p className="correct-answer-info">
                Correct Answer:{" "}
                {answer.questionId.options[answer.questionId.correctAnswer]}
              </p>
            )}
          </div>
        ))}

        <div className="navigation-buttons">
          <button className="nav-button retake" onClick={handleRetakeQuiz}>
            Retake Round {roundNumber}
          </button>
          <button className="nav-button next-round" onClick={handleNextRound}>
            Go to Round {parseInt(roundNumber) + 1}
          </button>
          <button className="nav-button home" onClick={handleGoHome}>
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizResult;

// frontend/src/pages/QuizPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./QuizPage.css"; // Import the CSS for styling
import BackButton from "../components/backbutton/Backbutton";

const QuizPage = () => {
  const { category, roundNumber } = useParams(); // Get category and round from URL params
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store user's selected answers: { questionId: userAnswerIndex }
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
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
          `/api/quiz/${category}/${roundNumber}/questions`,
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
          throw new Error(errorData.message || "Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        console.error("Error fetching quiz questions:", err);
        setError(err.message || "Failed to load quiz questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, roundNumber, navigate]); // Re-fetch if category or round changes

  // Handle user selecting an answer
  const handleOptionSelect = (questionId, optionIndex) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  // Navigate to the previous question
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  // Navigate to the next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(questions.length - 1, prevIndex + 1)
    );
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    setError(null);

    // Prepare answers in the format expected by the backend
    const formattedAnswers = questions.map((q) => ({
      questionId: q._id,
      userAnswerIndex:
        userAnswers[q._id] !== undefined ? userAnswers[q._id] : -1, // -1 for unanswered
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        setIsSubmitting(false);
        navigate("/login");
        return;
      }

      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizCategory: category,
          roundNumber: parseInt(roundNumber),
          answers: formattedAnswers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit quiz");
      }

      const data = await response.json();
      console.log("Quiz submitted successfully:", data);

      // Navigate to the results page
      navigate(`/quiz/${category}/${roundNumber}/results`, {
        state: { score: data.score, totalQuestions: data.totalQuestions },
      });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError(err.message || "Failed to submit quiz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading-message">Loading questions...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="no-questions-message">
        No questions available for this quiz category and round.
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const selectedOption = userAnswers[currentQuestion._id];

  return (
    <>
      <BackButton />
      <div className="quiz-page-container">
        <h2>
          {category.toUpperCase()} Quiz - Round {roundNumber}
        </h2>

        <div className="quiz-header">
          <p>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p>Difficulty: {currentQuestion.difficulty}</p>
        </div>

        <div className="question-card">
          <p className="question-text">{currentQuestion.questionText}</p>
          <ul className="options-list">
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                className={`option-item ${
                  selectedOption === index ? "selected" : ""
                }`}
                onClick={() => handleOptionSelect(currentQuestion._id, index)}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  value={index}
                  checked={selectedOption === index}
                  onChange={() =>
                    handleOptionSelect(currentQuestion._id, index)
                  }
                />
                {option}
              </li>
            ))}
          </ul>
        </div>

        <div className="quiz-navigation">
          <button
            className="quiz-button prev"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0 || isSubmitting}
          >
            Previous
          </button>
          {isLastQuestion ? (
            <button
              className="quiz-button submit"
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </button>
          ) : (
            <button
              className="quiz-button next"
              onClick={handleNextQuestion}
              disabled={isSubmitting}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;

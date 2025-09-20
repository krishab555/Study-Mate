import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import Navbar from "../../components/common/Navbar";
import SideBar from "../../components/common/SideBar";

export default function TakeQuizByCourse() {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFirstQuiz = async () => {
      try {
        const res = await apiRequest({ endpoint: `/quiz/course/${courseId}` });
        if (res.quizzes && res.quizzes.length > 0) {
          setQuiz(res.quizzes[0]);
        } else {
          setError("No quiz available for this course");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchFirstQuiz();
  }, [courseId]);

  const handleAnswerSelect = (level, answer) => {
    setUserAnswers({
      ...userAnswers,
      [level]: answer,
    });
  };

  const handleNextLevel = () => {
    if (currentLevel < quiz.questions.length) {
      setCurrentLevel(currentLevel + 1);
    } else {
      handleQuizCompletion();
    }
  };

  const handleQuizCompletion = async () => {
    // Format answers for API submission
    const formattedAnswers = quiz.questions.map((q, index) => ({
      questionId: q._id,
      selectedOption: userAnswers[index + 1] || null,
    }));

    try {
      const res = await apiRequest({
        endpoint: "/userQuiz",
        method: "POST",
        body: { quizId: quiz._id, answers: formattedAnswers },
      });

      if (res.success) {
        setScore(res.userQuiz.score);
        setSubmitted(true);
      } else {
        // If backend doesn't return success but doesn't throw error either
        calculateLocalScore();
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting quiz:", err);
      // Calculate score locally as fallback
      calculateLocalScore();
      setSubmitted(true);
    }
  };

  // Calculate score locally as fallback
  const calculateLocalScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index + 1];
      if (
        userAnswer &&
        question.correctAnswer &&
        userAnswer === question.correctAnswer
      ) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  // Get performance message based on score
  const getPerformanceMessage = () => {
    const totalQuestions = quiz.questions.length;
    const percentage = (score / totalQuestions) * 100;

    if (percentage >= 80) {
      return {
        badge: "Excellent Performance",
        message: "Outstanding! You've mastered  programming concepts. 🎉",
        badgeColor: "#2e7d32",
        bgColor: "#e7f6e9",
        emoji: "🎯",
      };
    } else if (percentage >= 60) {
      return {
        badge: "Good Performance",
        message:
          "You have a solid understanding of programming. Keep practicing to master all concepts. 🌤",
        badgeColor: "#ed6c02",
        bgColor: "#fff4e5",
        emoji: "👍",
      };
    } else if (percentage >= 40) {
      return {
        badge: "Fair Performance",
        message:
          "You're on the right track. Review the material and try again to improve your score. 💡",
        badgeColor: "#ed6c02",
        bgColor: "#fff4e5",
        emoji: "📝",
      };
    } else {
      return {
        badge: "Needs Improvement",
        message:
          " programming takes practice. Review the concepts and try again to improve your score. 📚",
        badgeColor: "#d32f2f",
        bgColor: "#ffe9e9",
        emoji: "📖",
      };
    }
  };

  // Styles
  const containerStyle = {
    marginLeft: "280px",
    marginTop: "60px",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "calc(100vh - 60px)",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const quizContainerStyle = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    padding: "25px",
    position: "relative",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "2px solid #f0f0f0",
  };

  const progressContainerStyle = {
    marginBottom: "20px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
  };

  const progressBarStyle = {
    height: "6px",
    backgroundColor: "#e9ecef",
    borderRadius: "3px",
    overflow: "hidden",
    marginBottom: "8px",
  };

  const progressFillStyle = {
    height: "100%",
    background: "linear-gradient(90deg, #4361ee, #3a0ca3)",
    width: `${(currentLevel / (quiz?.questions?.length || 1)) * 100}%`,
    transition: "width 0.5s ease",
    borderRadius: "3px",
  };

  const levelIndicatorStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    color: "#6c757d",
  };

  const questionStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#212529",
    lineHeight: "1.4",
    textAlign: "center",
  };

  const optionsContainerStyle = {
    marginBottom: "25px",
  };

  const optionStyle = {
    display: "block",
    padding: "15px",
    marginBottom: "12px",
    backgroundColor: "#f8f9fa",
    border: "2px solid #e9ecef",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "15px",
    width: "100%",
    textAlign: "left",
  };

  const selectedOptionStyle = {
    ...optionStyle,
    backgroundColor: "#e7f3ff",
    borderColor: "#4361ee",
    boxShadow: "0 4px 10px rgba(67, 97, 238, 0.15)",
  };

  const buttonStyle = {
    padding: "12px 25px",
    background: "linear-gradient(90deg, #4361ee, #3a0ca3)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 10px rgba(67, 97, 238, 0.25)",
    width: "100%",
    marginTop: "10px",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    background: "#e9ecef",
    color: "#6c757d",
    cursor: "not-allowed",
    boxShadow: "none",
  };

  const errorStyle = {
    color: "#dc3545",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8d7da",
    border: "1px solid ",
    borderRadius: "8px",
    margin: "20px 0",
  };

  if (loading)
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <SideBar />
          <div
            style={{
              marginLeft: "280px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <p>Loading quiz...</p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <SideBar />
          <div
            style={{
              marginLeft: "280px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <div style={errorStyle}>{error}</div>
          </div>
        </div>
      </div>
    );

  if (!quiz)
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <SideBar />
          <div
            style={{
              marginLeft: "280px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <p>No quiz found for this course.</p>
          </div>
        </div>
      </div>
    );

  if (submitted) {
    const performance = getPerformanceMessage();

    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <SideBar />
          <div
            style={{
              marginLeft: "280px",
              padding: "20px",
              minHeight: "calc(100vh - 60px)",
              backgroundColor: "#f0f2f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: "500px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {/* Book Image */}
              <div style={{ marginBottom: "20px" }}>
                <img
                  src="https://img.icons8.com/color/96/000000/book.png"
                  alt="Book"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>

              <h2
                style={{
                  color: "#3a0ca3",
                  marginBottom: "15px",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                Your Score
              </h2>

              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "700",
                  color: "#4361ee",
                  margin: "15px 0",
                }}
              >
                {score} / {quiz.questions.length}
              </div>

              <div
                style={{
                  padding: "8px 16px",
                  backgroundColor: performance.bgColor,
                  color: performance.badgeColor,
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  display: "inline-block",
                }}
              >
                {performance.badge} {performance.emoji}
              </div>

              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "30px",
                  color: "#495057",
                  lineHeight: "1.5",
                }}
              >
                {performance.message}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    padding: "12px 30px",
                    backgroundColor: "#4361ee",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCurrentLevel(1);
                    setUserAnswers({});
                    setSubmitted(false);
                    setScore(0);
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentLevel - 1];

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={containerStyle}>
          <div style={quizContainerStyle}>
            <div style={headerStyle}>
              <h2
                style={{
                  color: "#3a0ca3",
                  marginBottom: "8px",
                  fontSize: "22px",
                }}
              >
                {quiz.title}
              </h2>
              <p style={{ color: "#6c757d", margin: 0, fontSize: "14px" }}>
                {quiz.description ||
                  "Test your Programming knowledge – Let's See How Much You Really Know Answer carefully"}
              </p>
            </div>

            <div style={progressContainerStyle}>
              <div style={progressBarStyle}>
                <div style={progressFillStyle}></div>
              </div>
              <div style={levelIndicatorStyle}>
                <span>
                  Level {currentLevel} of {quiz.questions.length}
                </span>
                <span>
                  Score: {score}/{quiz.questions.length}
                </span>
              </div>
            </div>

            <div style={questionStyle}>{currentQuestion.questionText}</div>

            <div style={optionsContainerStyle}>
              {currentQuestion.options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentLevel, opt)}
                  style={
                    userAnswers[currentLevel] === opt
                      ? selectedOptionStyle
                      : optionStyle
                  }
                  onMouseEnter={(e) => {
                    if (userAnswers[currentLevel] !== opt) {
                      e.currentTarget.style.backgroundColor = "#e9ecef";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (userAnswers[currentLevel] !== opt) {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                style={
                  userAnswers[currentLevel] !== undefined
                    ? buttonStyle
                    : disabledButtonStyle
                }
                onClick={handleNextLevel}
                disabled={userAnswers[currentLevel] === undefined}
                onMouseEnter={(e) => {
                  if (userAnswers[currentLevel] !== undefined) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 15px rgba(67, 97, 238, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (userAnswers[currentLevel] !== undefined) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 10px rgba(67, 97, 238, 0.25)";
                  }
                }}
              >
                {currentLevel === quiz.questions.length
                  ? "Finish Quiz"
                  : "Next Level →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
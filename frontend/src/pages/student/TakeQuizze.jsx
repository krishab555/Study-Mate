import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";

const TakeQuizze = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await apiRequest({ endpoint: `/quiz/${quizId}` });
        if (res.success) setQuiz(res.quiz);
      } catch (err) {
        console.error(err);
      }
    };
    if (quizId) fetchQuiz();
  }, [quizId]);

  if (!quiz) return <p>Loading quiz...</p>;

  const currentQuestion = quiz.questions[currentIndex];

  const handleOption = (option) => {
    setAnswers({ ...answers, [currentQuestion._id]: option });
  };

  const goNext = () => setCurrentIndex((prev) => prev + 1);
  const goBack = () => setCurrentIndex((prev) => prev - 1);

  const handleSubmitQuiz = async () => {
    const formattedAnswers = quiz.questions.map((q) => ({
      questionId: q._id,
      selectedOption: answers[q._id] || null,
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
        alert("Error submitting quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Quiz Completed!</h2>
        <p>
          Your Score: {score} / {quiz.questions.length}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h3>
        Question {currentIndex + 1} / {quiz.questions.length}
      </h3>
      <p>{currentQuestion.questionText}</p>
      {currentQuestion.options.map((opt) => (
        <button
          key={opt}
          onClick={() => handleOption(opt)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px 20px",
            backgroundColor:
              answers[currentQuestion._id] === opt ? "#6c5ce7" : "#fff",
            color: answers[currentQuestion._id] === opt ? "#fff" : "#000",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {opt}
        </button>
      ))}
      <div style={{ marginTop: "20px" }}>
        {currentIndex > 0 && <button onClick={goBack}>Previous</button>}
        {currentIndex < quiz.questions.length - 1 ? (
          <button
            onClick={goNext}
            disabled={!answers[currentQuestion._id]}
            style={{ marginLeft: "10px" }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={!answers[currentQuestion._id]}
            style={{ marginLeft: "10px" }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeQuizze;

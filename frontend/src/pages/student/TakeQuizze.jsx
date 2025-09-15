import React, { useState } from "react";

const sampleQuiz = [
  {
    id: 1,
    question: "The Indian Contract Act 1872 came into force on...",
    options: [
      "1st January 1872",
      "1st March 1872",
      "1st July 1872",
      "1st September 1872",
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which of the following is not a contract?",
    options: ["A lease", "A sale", "A gift", "A mortgage"],
    correctAnswer: 2,
  },
  // Add more questions here if needed
];

const TakeQuizze = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = sampleQuiz[currentIndex];

  const handleOptionChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: parseInt(e.target.value, 10),
    });
  };

  const goNext = () => {
    if (answers[currentQuestion.id] !== undefined) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goBack = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (answers[currentQuestion.id] === undefined) {
      alert("Please answer the question before finishing.");
      return;
    }
    setSubmitted(true);
  };

  const optionStyle = (selected) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 20px",
    marginBottom: "10px",
    borderRadius: "8px",
    backgroundColor: selected ? "#f5f0ff" : "#fff",
    borderLeft: selected ? "4px solid #6c5ce7" : "4px solid transparent",
    boxShadow: selected ? "0 2px 8px rgba(108, 92, 231, 0.3)" : "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  if (submitted) {
    let score = 0;
    sampleQuiz.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score++;
    });

    return (
      <div
        style={{
          padding: "40px",
          maxWidth: "700px",
          margin: "auto",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>Quiz Completed!</h2>
        <p style={{ fontSize: "18px" }}>
          Your Score: <strong>{score}</strong> / {sampleQuiz.length}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
        Question {currentIndex + 1} of {sampleQuiz.length}
      </p>
      <h3 style={{ marginBottom: "20px" }}>{currentQuestion.question}</h3>

      {currentQuestion.options.map((option, index) => (
        <label
          key={index}
          style={optionStyle(answers[currentQuestion.id] === index)}
        >
          <span>{option}</span>
          <input
            type="radio"
            name={`question-${currentQuestion.id}`}
            value={index}
            checked={answers[currentQuestion.id] === index}
            onChange={handleOptionChange}
            style={{ cursor: "pointer" }}
          />
        </label>
      ))}

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={goBack}
          disabled={currentIndex === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: "#eee",
            border: "none",
            borderRadius: "6px",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            opacity: currentIndex === 0 ? 0.5 : 1,
          }}
        >
          ← Previous
        </button>

        {currentIndex < sampleQuiz.length - 1 ? (
          <button
            onClick={goNext}
            disabled={answers[currentQuestion.id] === undefined}
            style={{
              padding: "10px 20px",
              backgroundColor:
                answers[currentQuestion.id] === undefined ? "#ccc" : "#6c5ce7",
              color:
                answers[currentQuestion.id] === undefined ? "#666" : "#fff",
              border: "none",
              borderRadius: "6px",
              cursor:
                answers[currentQuestion.id] === undefined
                  ? "not-allowed"
                  : "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answers[currentQuestion.id] === undefined}
            style={{
              padding: "10px 25px",
              backgroundColor:
                answers[currentQuestion.id] === undefined ? "#ccc" : "#6c5ce7",
              color:
                answers[currentQuestion.id] === undefined ? "#666" : "#fff",
              border: "none",
              borderRadius: "6px",
              cursor:
                answers[currentQuestion.id] === undefined
                  ? "not-allowed"
                  : "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeQuizze;

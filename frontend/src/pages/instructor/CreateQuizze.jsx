import React, { useState, useEffect } from "react";
import { apiRequest } from "../../utils/api"; // your API helper
import { useNavigate } from "react-router-dom";

const CreateQuizze = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      questionText: "",
      options: ["", "", "", ""],
      correctAnswerIndex: null,
    },
  ]);

  // Fetch instructor's courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiRequest({
          endpoint: "/courses", // Backend route: /api/courses
          method: "GET",
        });
        console.log("Fetched courses:", res);
        if (res.success) setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  // Question handlers
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: Date.now(), questionText: "", options: ["", "", "", ""], correctAnswerIndex: null },
    ]);
  };
  const removeQuestion = (id) => setQuestions((prev) => prev.filter((q) => q.id !== id));
  const updateQuestionText = (id, text) =>
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, questionText: text } : q)));
  const updateOptionText = (questionId, index, text) =>
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[index] = text;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  const setCorrectAnswer = (questionId, index) =>
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, correctAnswerIndex: index } : q))
    );

  // Submit quiz
  const handleSubmit = async () => {
    if (!selectedCourse) return alert("Please select a course");
    if (!title.trim()) return alert("Please enter a quiz title");

    for (let q of questions) {
      if (!q.questionText.trim()) return alert("Please fill all question texts");
      if (q.options.some((opt) => !opt.trim())) return alert("Please fill all options");
      if (q.correctAnswerIndex === null) return alert("Please select a correct answer for every question");
    }

    // Transform questions for backend
    const formattedQuestions = questions.map((q) => ({
      questionText: q.questionText,
      options: q.options,
      correctAnswer:  q.options[q.correctAnswerIndex],
    }));

    try {
      const res = await apiRequest({
        endpoint: "/quiz", // Backend route: /api/quiz/create
        method: "POST",
        body: { title, courseId: selectedCourse, questions: formattedQuestions },
      });
      if (res.success) {
        alert("Quiz saved successfully!");
        navigate("/instructor/home");
      } else {
        alert(res.message || "Failed to save quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save quiz");
    }
  };

  return (
    <div style={{ marginLeft: "280px", padding: "40px 30px", maxWidth: "800px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Create Quiz</h2>

      {/* Course Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          style={{ padding: "8px 10px", marginLeft: "10px", borderRadius: "6px" }}
        >
          <option value="">-- Select your course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Quiz Title */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Questions */}
      {questions.map((q, qIndex) => (
        <div
          key={q.id}
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Question {qIndex + 1}</h4>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(q.id)}
                style={{ background: "transparent", border: "none", color: "red", cursor: "pointer", fontSize: "18px" }}
                title="Remove question"
              >
                &times;
              </button>
            )}
          </div>

          <textarea
            value={q.questionText}
            onChange={(e) => updateQuestionText(q.id, e.target.value)}
            placeholder="Enter question text"
            style={{
              width: "100%",
              minHeight: "60px",
              fontSize: "16px",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />

          {q.options.map((opt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <input
                type="radio"
                name={`correct-answer-${q.id}`}
                checked={q.correctAnswerIndex === i}
                onChange={() => setCorrectAnswer(q.id, i)}
                style={{ marginRight: "10px" }}
              />
              <input
                type="text"
                value={opt}
                onChange={(e) => updateOptionText(q.id, i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                style={{ flex: 1, padding: "8px 10px", fontSize: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            </div>
          ))}
        </div>
      ))}

      {/* Buttons */}
      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button
          onClick={addQuestion}
          style={{
            padding: "12px 20px",
            backgroundColor: "#0984e3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Add Question
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 20px",
            backgroundColor: "#6c5ce7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuizze;

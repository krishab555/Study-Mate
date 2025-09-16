import React, { useEffect, useState } from "react";
import TakeQuizze from "./TakeQuizze";

export default function QuizCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ get token
        const res = await fetch("http://localhost:5000/api/quiz/courses", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        });
        const data = await res.json();
        if (data.success) setCourses(data.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Available Quizzes</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : courses.length === 0 ? (
          <p>No courses with quizzes available</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              style={{
                padding: "20px",
                background: "#fff",
                borderRadius: "10px",
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              onClick={() => setSelectedCourse(course)}
            >
              <h3>{course.title}</h3>
            </div>
          ))
        )}
      </div>

      {selectedCourse && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "700px",
              background: "#fff",
              borderRadius: "10px",
              padding: "30px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedCourse(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                fontSize: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <TakeQuizze courseId={selectedCourse._id} />
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import SideBar from "../../components/common/SideBar";
import { apiRequest } from "../../utils/api";

export default function QuizCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiRequest({ endpoint: "/quiz/courses" });
        if (res.success) setCourses(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const cardStyle = {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideBar />
        <div style={{ flex: 1, padding: "30px", maxWidth: "1000px", marginLeft: "280px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#0b2c5d" }}>
            Available Courses
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {loading ? (
              <p>Loading courses...</p>
            ) : courses.length === 0 ? (
              <p>No courses available</p>
            ) : (
              courses.map((course) => (
                <div
                  key={course._id}
                  style={cardStyle}
                  onClick={() => {
                    if (course.quizzes && course.quizzes.length > 0) {
                      navigate(`/student/take-quiz/${course.quizzes[0]._id}`);
                    } else {
                      alert("No quizzes available for this course");
                    }
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  <h3>{course.title}</h3>
                  <p>{course.quizzes ? course.quizzes.length : 0} Quiz(es)</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaProjectDiagram,
  FaBook,
  FaUsers,
} from "react-icons/fa";

export default function InstructorHome() {
  const [stats, setStats] = useState({
    studentsEnrolled: 0,
    projectsSubmitted: 0,
    quizzesAttempted: 0,
    activeStudents: 0,
  });

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStatsAndCourses = async () => {
      try {
        // Dummy data — replace with real fetch logic
        setStats({
          studentsEnrolled: 28,
          projectsSubmitted: 15,
          quizzesAttempted: 42,
          activeStudents: 19,
        });

        // Fetch instructor's courses
        const res = await fetch(
          "http://localhost:5000/api/instructor/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          const coursesArray = Array.isArray(data) ? data : data.data || [];
          setCourses(coursesArray);
        } else {
          console.error("Failed to fetch courses:", res.status);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (token) fetchStatsAndCourses();
  }, [token]);

  // ----- Styles -----
  const contentStyle = {
    padding: "20px",
    paddingTop: "80px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    marginLeft: "280px",
  };

  const cardsContainerStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  };

  const cardStyle = {
    backgroundColor: "#e8f0fe",
    padding: "20px",
    flex: "1",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    textAlign: "center",
    color: "#1e3a8a",
  };

  const iconStyle = { fontSize: "30px", marginBottom: "10px" };
  const cardTitleStyle = { fontSize: "16px", fontWeight: "bold" };
  const cardValueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
  };

  const courseGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const courseCardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out",
  };

  const courseImageStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  };

  const courseContentStyle = {
    padding: "15px",
  };

  const courseTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#1e3a8a",
  };

  const courseDescriptionStyle = {
    fontSize: "14px",
    color: "#4b5563",
  };

  const buttonStyle = {
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#1e3a8a",
    color: "#ffffff",
    cursor: "pointer",
    marginTop: "10px",
  };

  // ----- Render -----
  return (
    <>
      <Navbar />
      <main style={contentStyle}>
        {/* Stats Cards */}
        <div style={cardsContainerStyle}>
          <div style={cardStyle}>
            <FaUserGraduate style={iconStyle} />
            <div style={cardTitleStyle}>Students Enrolled</div>
            <span style={cardValueStyle}>{stats.studentsEnrolled}</span>
          </div>
          <div style={cardStyle}>
            <FaProjectDiagram style={iconStyle} />
            <div style={cardTitleStyle}>Projects Submitted</div>
            <span style={cardValueStyle}>{stats.projectsSubmitted}</span>
          </div>
          <div style={cardStyle}>
            <FaBook style={iconStyle} />
            <div style={cardTitleStyle}>Quizzes Attempted</div>
            <span style={cardValueStyle}>{stats.quizzesAttempted}</span>
          </div>
          <div style={cardStyle}>
            <FaUsers style={iconStyle} />
            <div style={cardTitleStyle}>Active Students</div>
            <span style={cardValueStyle}>{stats.activeStudents}</span>
          </div>
        </div>

        {/* Instructor Courses */}
        <h2
          style={{ fontSize: "22px", color: "#1e3a8a", marginBottom: "15px" }}
        >
          Your Courses
        </h2>

        <div style={courseGridStyle}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} style={courseCardStyle}>
                <img
                  src={
                    course.thumbnail || "https://via.placeholder.com/300x150"
                  }
                  alt={course.title}
                  style={courseImageStyle}
                />
                <div style={courseContentStyle}>
                  <h3 style={courseTitleStyle}>{course.title}</h3>
                  <p style={courseDescriptionStyle}>
                    {course.description?.slice(0, 80) ||
                      "No description available."}
                  </p>
                  <button style={buttonStyle}>View Course</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#4b5563", fontSize: "16px" }}>
              No courses added yet.
            </p>
          )}
        </div>
      </main>
    </>
  );
}

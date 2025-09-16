import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaProjectDiagram,
  FaBook,
  FaUsers,
} from "react-icons/fa";

export default function InstructorHome() {
  const [stats, setStats] = useState({});
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch stats
        const statsRes = await fetch(
          "http://localhost:5000/api/instructor/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        // Fetch courses
        const coursesRes = await fetch(
          "http://localhost:5000/api/instructor/courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          const coursesArray = Array.isArray(coursesData)
            ? coursesData
            : coursesData.data || [];
          setCourses(coursesArray);
        }
      } catch (err) {
        console.error("Error fetching instructor data:", err);
      }
    };

    fetchData();
  }, [token]);

  // ----- Styles -----
  const contentStyle = { padding: "20px", paddingTop: "80px", minHeight: "100vh", backgroundColor: "#f3f4f6", marginLeft: "280px" };
  const cardsContainerStyle = { display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" };
  const cardStyle = { backgroundColor: "#e8f0fe", padding: "20px", flex: "1", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", color: "#1e3a8a" };
  const iconStyle = { fontSize: "30px", marginBottom: "10px" };
  const cardTitleStyle = { fontSize: "16px", fontWeight: "bold" };
  const cardValueStyle = { fontSize: "24px", fontWeight: "bold", marginTop: "10px", display: "block" };
  const courseGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" };
  const courseCardStyle = { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s" };
  const courseImageStyle = { width: "100%", height: "150px", objectFit: "cover" };
  const courseContentStyle = { padding: "15px" };
  const courseTitleStyle = { fontSize: "18px", fontWeight: "bold", marginBottom: "6px", color: "#1e3a8a" };
  const courseDescriptionStyle = { fontSize: "14px", color: "#4b5563" };
  const buttonStyle = { padding: "8px 12px", fontSize: "14px", borderRadius: "6px", border: "none", backgroundColor: "#1e3a8a", color: "#fff", cursor: "pointer", marginTop: "10px" };

  return (
    <>
      <Navbar />
      <main style={contentStyle}>
        <div style={cardsContainerStyle}>
          <div style={cardStyle}>
            <FaUserGraduate style={iconStyle} />
            <div style={cardTitleStyle}>Students Enrolled</div>
            <span style={cardValueStyle}>{stats.studentsEnrolled || 0}</span>
          </div>
          <div style={cardStyle}>
            <FaProjectDiagram style={iconStyle} />
            <div style={cardTitleStyle}>Projects Submitted</div>
            <span style={cardValueStyle}>{stats.projectsSubmitted || 0}</span>
          </div>
          <div style={cardStyle}>
            <FaBook style={iconStyle} />
            <div style={cardTitleStyle}>Quizzes Attempted</div>
            <span style={cardValueStyle}>{stats.quizzesAttempted || 0}</span>
          </div>
          <div style={cardStyle}>
            <FaUsers style={iconStyle} />
            <div style={cardTitleStyle}>Active Students</div>
            <span style={cardValueStyle}>{stats.activeStudents || 0}</span>
          </div>
        </div>

        <h2 style={{ fontSize: "22px", color: "#1e3a8a", marginBottom: "15px" }}>Your Courses</h2>
        <div style={courseGridStyle}>
          {courses.length > 0 ? courses.map(course => (
            <div key={course._id} style={courseCardStyle} onClick={() => navigate(`/instructor/course/${course._id}`)}>
              <img src={course.banner || "https://via.placeholder.com/300x150"} alt={course.title} style={courseImageStyle} />
              <div style={courseContentStyle}>
                <h3 style={courseTitleStyle}>{course.title}</h3>
                <p style={courseDescriptionStyle}>{course.description?.slice(0, 80) || "No description available."}</p>
                <button style={buttonStyle} onClick={e => { e.stopPropagation(); navigate(`/instructor/course/${course._id}`); }}>View Course</button>
              </div>
            </div>
          )) : <p>No courses added yet.</p>}
        </div>
      </main>
    </>
  );
}

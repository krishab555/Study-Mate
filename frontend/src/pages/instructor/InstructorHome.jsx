import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaProjectDiagram, FaBook, FaUsers } from "react-icons/fa";

export default function InstructorHome() {
  const [stats, setStats] = useState({});
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Stats
        const statsRes = await fetch("http://localhost:5000/api/instructor/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (statsRes.ok) setStats(await statsRes.json());

        // Courses
        const coursesRes = await fetch("http://localhost:5000/api/instructor/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  // ----- Styles -----
  const contentStyle = { 
    padding: "20px",
     paddingTop: "80px", 
     minHeight: "100vh", 
     backgroundColor: "#f3f4f6", 
     marginLeft: "280px"
    };
  const cardsContainerStyle = {
     display: "flex", 
     gap: "20px", 
     marginBottom: "30px", 
     flexWrap: "wrap" 
    };
  const statCardStyle = { 
    backgroundColor: "#e8f0fe", 
    padding: "20px", 
    flex: "1", 
    borderRadius: "12px", 
    textAlign: "center", 
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)", 
    color: "#1e3a8a" 
  };
  const iconStyle = {
     fontSize: "30px", 
     marginBottom: "10px" 
    };
  const cardTitleStyle = { 
    fontSize: "16px", 
    fontWeight: "bold" 
  };
  const cardValueStyle = { 
    fontSize: "24px", 
    fontWeight: "bold", 
    marginTop: "10px", 
    display: "block" 
  };

  const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" };
  const courseCardStyle = {
     height: "350px", 
     display: "flex", 
     flexDirection: "column", 
     borderRadius: "8px", 
     overflow: "hidden", 
     boxShadow: "0 4px 12px rgba(2,10,40,0.06)", backgroundColor: "#fff", 
     cursor: "pointer", 
     transition: "transform 0.18s ease, box-shadow 0.18s ease", 
     border: "1px solid rgba(11,44,93,0.06)" };
  const courseImageStyle = { width: "100%", height: "150px", objectFit: "cover", background: "#f3f3f3" };
  const courseContentStyle = { padding: "14px", display: "flex", flexDirection: "column", flexGrow: 1 };
  const courseTitleStyle = { fontSize: "16px", fontWeight: 700, color: "#0B2C5D", marginBottom: "8px" };
  const courseDescriptionStyle = { 
    fontSize: "13px", 
    color: "#555", 
    marginBottom: "12px", 
    lineHeight: 1.45,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3, // max 3 lines of text
    WebkitBoxOrient: "vertical",
    flexGrow: 1, };
  const buttonStyle = { border: "none", padding: "10px 14px", borderRadius: "8px", background: "#0B2C5D", color: "#fff", cursor: "pointer", fontWeight: 700 };

  const renderCourseCard = (course) => (
    <div
      key={course._id}
      style={courseCardStyle}
      onClick={() => navigate(`/instructor/course/${course._id}`)}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(2,10,40,0.08)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(2,10,40,0.06)";
      }}
    >
      <img
        src={course.banner ? `http://localhost:5000${course.banner}` : ""}
        alt={course.title || "Course"}
        style={courseImageStyle}
        onError={(ev) => {
          ev.currentTarget.onerror = null;
          ev.currentTarget.src = "/default-course.jpg";
        }}
      />
      <div style={courseContentStyle}>
        <h3 style={courseTitleStyle}>{course.title || "Untitled course"}</h3>
        <p style={courseDescriptionStyle}>{course.description || "No description provided."}</p>
        <button
          style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/instructor/course/${course._id}`);
          }}
        >
          Manage Course
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main style={contentStyle}>
        {/* Stats */}
        <div style={cardsContainerStyle}>
          <div style={statCardStyle}>
            <FaUserGraduate style={iconStyle} />
            <div style={cardTitleStyle}>Students Enrolled</div>
            <span style={cardValueStyle}>{stats.studentsEnrolled || 0}</span>
          </div>
          <div style={statCardStyle}>
            <FaProjectDiagram style={iconStyle} />
            <div style={cardTitleStyle}>Projects Submitted</div>
            <span style={cardValueStyle}>{stats.projectsSubmitted || 0}</span>
          </div>
          <div style={statCardStyle}>
            <FaBook style={iconStyle} />
            <div style={cardTitleStyle}>Quizzes Attempted</div>
            <span style={cardValueStyle}>{stats.quizzesAttempted || 0}</span>
          </div>
          <div style={statCardStyle}>
            <FaUsers style={iconStyle} />
            <div style={cardTitleStyle}>Active Students</div>
            <span style={cardValueStyle}>{stats.activeStudents || 0}</span>
          </div>
        </div>

        {/* Courses */}
        <h2 style={{ fontSize: "22px", color: "#0B2C5D", marginBottom: "15px" }}>Your Courses</h2>
        <div style={gridStyle}>
          {courses.length > 0 ? courses.map(renderCourseCard) : <p>No courses added yet.</p>}
        </div>
      </main>
    </>
  );
}

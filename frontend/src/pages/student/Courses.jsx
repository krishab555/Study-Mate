import React, { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import SideBar from '../../components/common/SideBar'
import Footer from '../../components/common/Footer'

import { useNavigate } from "react-router-dom";


export default function StudentCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) setCourses(data.data);
        else alert(data.message || "Failed to load courses");
      } catch (err) {
        console.error(err);
        alert("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
  };

  const containerStyle = {
    
    marginLeft: "230px", // sidebar width
    marginTop: "60px",   // below navbar
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    width: `calc(100% - 230px)`,
};



  const cardStyle = {
    
    minHeight: "380px",
    
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  };

  const imageStyle = { width: "100%", height: "150px", objectFit: "cover" };
  const contentStyle = { 
    padding: "15px",
    display: "flex", 
    flexDirection: "column", 
    flexGrow: 1 
  };
  const titleStyle = { fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "#0B2C5D" };
  const descStyle = { fontSize: "14px", color: "#555", marginBottom: "12px" };
  const buttonStyle = {
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#0B2C5D",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "auto",
  };
  const buttonActiveStyle = { backgroundColor: "#093060" };

  return (
    <div>
      <Navbar />
      <div style={layoutStyle}>
        <SideBar />
        <div style={containerStyle}>
          {loading ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#555" }}>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#555" }}>No courses available</p>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                style={cardStyle}
                onClick={() => navigate(`/courses/${course._id}`)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <img src={course.image || "/default-course.jpg"} alt={course.name} style={imageStyle} />
                <div style={contentStyle}>
                  <h3 style={titleStyle}>{course.name}</h3>
                  <p style={descStyle}>{course.description}</p>
                  <button
                    style={buttonStyle}
                    onMouseDown={(e) => (e.target.style.background = buttonActiveStyle.background)}
                    onMouseUp={(e) => (e.target.style.background = buttonStyle.background)}
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


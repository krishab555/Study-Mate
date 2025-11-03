import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import SideBar from "../../components/common/SideBar";

export default function FAQSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/faqs/subjects");
        const data = await res.json();
        console.log("Fetched FAQ subjects data from backend:", data);

        if (data.success) {setSubjects(data.data);
         console.log("FAQ subjects array (detailed):", JSON.stringify(data.data, null, 2));}
        else alert(data.message || "Failed to load subjects");
      } catch (err) {
        console.error(err);
        alert("Error fetching subjects");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // ---------- Styles ----------
  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "#f8f9fb",
  };

  const mainStyle = {
    flex: 1,
    marginTop: "60px", 
    padding: "30px",
    maxWidth: "1000px",   // keep it from stretching too wide
    marginLeft: "280px",
    
  };

  const titleStyle = {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "25px",
    textAlign: "center",
    color: "#0b2c5d",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // always two columns
    gap: "20px",
  };

  const cardStyle = {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    textAlign: "center",
  };

  // ---------- Render ----------
  return (
    <div>
      <Navbar />
      <div style={layoutStyle}>
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div style={mainStyle}>
          <h2 style={titleStyle}>FAQ Subjects</h2>
          <div style={gridStyle}>
            {loading ? (
              <p>Loading subjects...</p>
            ) : subjects.length === 0 ? (
              <p>No FAQ subjects available</p>
            ) : (
              subjects.map((subject) => (
                <div
                  key={subject._id}
                  style={cardStyle}
                  onClick={() => navigate(`/faqs/${subject._id}`)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  <h3 style={{ fontSize: "1.2rem", color: "#0b2c5d" }}>
                    {subject.course?.title || subject.type || "Untitled"}
                  </h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

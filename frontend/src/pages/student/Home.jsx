import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCourses(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // latest 3 courses
  const latestCourses = courses.slice(-6).reverse();

  // Determine if premium
  const isPremium = (c) => c?.isPaid || (c?.price && Number(c.price) > 0);

  // Internal CSS
  const styles = {
    container: {
      marginLeft: "230px",
      marginTop: "30px",
      padding: "20px",
      maxWidth: "1000px",
      marginRight: "20px",
      gap: "20px",
    },
    welcomeCard: {
      backgroundColor: "#f0f4ff",
      borderRadius: "10px",
      padding: "15px 30px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      maxWidth: "1000px",
      margin: "0 auto 30px auto",
      textAlign: "left",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#0B2C5D",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "20px",
    },
    buttonActive: {
      backgroundColor: "#093060",
    },
    sectionTitle: {
      fontSize: "22px",
      fontWeight: 700,
      color: "#0B2C5D",
      marginBottom: "15px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "20px",
      marginBottom: "26px",
    },
    card: {
      minHeight: "320px",
      display: "flex",
      flexDirection: "column",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(2,10,40,0.06)",
      backgroundColor: "#ffffff",
      cursor: "pointer",
      transition: "transform 0.18s ease, box-shadow 0.18s ease",
      border: "1px solid rgba(11,44,93,0.06)",
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      background: "#f3f3f3",
    },
    content: {
      padding: "14px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    title: {
      fontSize: "16px",
      fontWeight: 700,
      color: "#0B2C5D",
      marginBottom: "8px",
    },
    desc: {
      fontSize: "13px",
      color: "#555",
      marginBottom: "12px",
      lineHeight: 1.45,
    },
    tag: {
      fontSize: "12px",
      fontWeight: 700,
      color: "#fff",
      padding: "6px 10px",
      borderRadius: "6px",
      display: "inline-block",
    },
    btnCard: {
      border: "none",
      padding: "10px 14px",
      borderRadius: "8px",
      background: "#0B2C5D",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
    },
  };

  const renderCard = (course) => {
    const premium = isPremium(course);
    console.log(course);
    return (
      <div
        key={course._id}
        style={styles.card}
        onClick={() => navigate(`/courses/${course._id}`)}
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
          style={styles.image}
          
        />
        <div style={styles.content}>
          <h3 style={styles.title}>{course.title || "Untitled Course"}</h3>
          <p style={styles.desc}>{course.description?.slice(0, 80) || "No description"}...</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "auto",
            }}
          >
            <span
              style={{
                ...styles.tag,
                background: premium ? "#c93c3c" : "#2d9f40",
              }}
            >
              {premium ? "Premium" : "Free"}
            </span>
            <button
              style={styles.btnCard}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/courses/${course._id}`);
              }}
            >
              View Course
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcomeCard}>
        <h2>Every pro was once a Beginner</h2>
        <h2>You've taken the first step. Let's keep going!</h2>
        <button
          style={styles.button}
          onMouseDown={(e) => (e.target.style.background = styles.buttonActive.background)}
          onMouseUp={(e) => (e.target.style.background = styles.button.background)}
          onClick={() => navigate("/student/courses")}
        >
          Go to Courses
        </button>
      </div>

      <h3 style={styles.sectionTitle}>Latest Courses</h3>
      {loading ? (
        <p>Loading courses...</p>
      ) : latestCourses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div style={styles.grid}>
          {latestCourses.map((c) => renderCard(c))}
        </div>
      )}
    </div>
  );
}

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

  // latest 6 courses
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
    // Updated styles for Learning Time and Activity sections
    learningActivitySection: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "40px",
    },
    learningTime: {
      flex: "1",
      minWidth: "280px",
      backgroundColor: "#ffffff",
      padding: "25px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
      border: "1px solid #eaeaea",
    },
    activity: {
      flex: "2",
      minWidth: "300px",
      backgroundColor: "#ffffff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
      border: "1px solid #eaeaea",
    },
    progressCircle: {
      width: "140px",
      height: "140px",
      margin: "20px auto",
      borderRadius: "50%",
      background: "conic-gradient(#4CAF50 75%, #e8f5e9 0)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    progressInnerCircle: {
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
    },
    timeText: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#2E7D32",
      margin: 0,
    },
    labelText: {
      fontSize: "14px",
      color: "#666",
      margin: "5px 0 0 0",
    },
    activityBars: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      height: "150px",
      marginTop: "20px",
      padding: "0 10px",
    },
    dayBar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "12%",
    },
    bar: {
      width: "30px",
      borderRadius: "6px 6px 0 0",
      backgroundColor: "#8e44ad",
      transition: "height 0.3s ease",
    },
    dayLabel: {
      fontSize: "12px",
      color: "#666",
      marginTop: "8px",
    },
    activityTitle: {
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "5px",
    },
  };

  // Dummy data for activity bars (heights for each day)
  const activityData = [40, 65, 50, 75, 60, 45, 80];

  const renderCard = (course) => {
    const premium = isPremium(course);
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
          <p style={styles.desc}>
            {course.description?.slice(0, 80) || "No description"}...
          </p>
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
      {/* Welcome Section */}
      <div style={styles.welcomeCard}>
        <h2>Every pro was once a Beginner</h2>
        <h2>You've taken the first step. Let's keep going!</h2>
        <button
          style={styles.button}
          onMouseDown={(e) =>
            (e.target.style.background = styles.buttonActive.background)
          }
          onMouseUp={(e) =>
            (e.target.style.background = styles.button.background)
          }
          onClick={() => navigate("/student/courses")}
        >
          Go to Courses
        </button>
      </div>

      {/* Learning Time & My Activity Section
      <div style={styles.learningActivitySection}>
        {/* Learning Time */}
        {/* <div style={styles.learningTime}>
          <h3 style={{ color: "#333", marginBottom: "15px" }}>Learning Time</h3>
          <div style={styles.progressCircle}>
            <div style={styles.progressInnerCircle}>
              <p style={styles.timeText}>1h 15m</p>
              <p style={styles.labelText}>Today</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
                marginRight: "8px",
              }}
            ></div>
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
              Reading
            </p>
          </div>
        </div> */}

        {/* My Activity */}
        {/* <div style={styles.activity}>
          <h3 style={{ color: "#333", marginBottom: "20px" }}>My Activity</h3>
          <p style={styles.activityTitle}>This Week</p>
          <div style={styles.activityBars}>
            {activityData.map((height, index) => (
              <div key={index} style={styles.dayBar}>
                <div
                  style={{
                    ...styles.bar,
                    height: `${height}px`,
                    opacity: height / 100 + 0.2,
                  }}
                ></div>
                <span style={styles.dayLabel}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div> */} 

      {/* Latest Courses */}
      <h3 style={styles.sectionTitle}>Latest Courses</h3>
      {loading ? (
        <p>Loading courses...</p>
      ) : latestCourses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div style={styles.grid}>{latestCourses.map((c) => renderCard(c))}</div>
      )}
    </div>
  );
}
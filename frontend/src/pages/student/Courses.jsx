import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import SideBar from "../../components/common/SideBar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

export default function StudentCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // IMPORTANT: log raw response so you can inspect shape in DevTools
        console.log("raw courses response:", data);

        // Handle several common API shapes:
        // - { success: true, data: [...] }
        // - { success: true, courses: [...] }
        // - [...] (direct array)
        // - { data: { courses: [...] } } (less common)
        let items = [];
        if (Array.isArray(data)) items = data;
        else if (data && data.success) items = data.data || data.courses || [];
        else if (data && (data.data || data.courses))
          items = data.data || data.courses;
        else if (data && data.rows) items = data.rows; // some APIs
        else items = [];

        setCourses(Array.isArray(items) ? items : []);
      } catch (err) {
        console.error(err);
        alert("Error fetching courses — check console for details");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // helper to decide if course is premium
  const isPremium = (c) => {
    if (!c) return false;
    if (typeof c.price !== "undefined" && c.price !== null) {
      // price could be number or string
      const p = Number(c.price);
      if (!Number.isNaN(p)) return p > 0;
    }
    if (typeof c.isPaid !== "undefined") return !!c.isPaid;
    if (typeof c.isPremium !== "undefined") return !!c.isPremium;
    if (typeof c.premium !== "undefined") return !!c.premium;
    if (typeof c.type === "string") {
      const t = c.type.toLowerCase();
      return t.includes("premium") || t.includes("paid");
    }
    // default unknown -> treat as free (will be rebalanced below)
    return false;
  };

  // build groups, with fallback if none detected as premium
  let basicCourses = courses.filter((c) => !isPremium(c));
  let advanceCourses = courses.filter((c) => isPremium(c));

  // If every course ended up "basic" (no premium markers), create a reasonable split
  if (basicCourses.length === courses.length && courses.length > 3) {
    const split = Math.ceil(courses.length / 2);
    basicCourses = courses.slice(0, split);
    advanceCourses = courses.slice(split);
  }

  // Styles (inline so you can paste quickly)
  const layoutStyle = { display: "flex", minHeight: "100vh" };
  const containerStyle = {
    marginLeft: "230px", // match your sidebar width
    marginTop: "60px", // slide under navbar
    padding: "30px 30px 60px 30px",
    width: `calc(100% - 230px)`,
    background: "transparent",
  };
  const sectionHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "8px 0 16px 4px",
  };
  const sectionTitle = {
    fontSize: "22px",
    fontWeight: 700,
    color: "#0B2C5D",
  };
  const seeAllBtn = {
    background: "#0B2C5D",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "26px",
  };

  const cardStyle = {
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
  };
  const imageStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    background: "#f3f3f3",
  };
  const contentStyle = {
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  };
  const titleStyle = {
    fontSize: "16px",
    fontWeight: 700,
    color: "#0B2C5D",
    marginBottom: "8px",
  };
  const descStyle = {
    fontSize: "13px",
    color: "#555",
    marginBottom: "12px",
    lineHeight: 1.45,
  };
  const tagBase = {
    fontSize: "12px",
    fontWeight: 700,
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    display: "inline-block",
  };
  const buttonStyle = {
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    background: "#0B2C5D",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  };

  // Ensure there's always something visible while debugging
  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={layoutStyle}>
          <SideBar />
          <div style={containerStyle}>
            <p style={{ color: "#555", textAlign: "center" }}>
              Loading courses...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // When there are zero courses, show friendly message
  if (!loading && courses.length === 0) {
    return (
      <div>
        <Navbar />
        <div style={layoutStyle}>
          <SideBar />
          <div style={containerStyle}>
            <p style={{ color: "#555", textAlign: "center", marginTop: 60 }}>
              No courses available right now.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderCard = (course) => {
    const premium = isPremium(course);
    return (
      <div
        key={course._id || course.id || course.name}
        style={cardStyle}
        onClick={() => navigate(`/courses/${course._id || course.id}`)}
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
          src={course.image || course.thumbnail || "/default-course.jpg"}
          alt={course.name || "Course"}
          style={imageStyle}
          onError={(ev) => {
            ev.currentTarget.onerror = null;
            ev.currentTarget.src = "/default-course.jpg";
          }}
        />
        <div style={contentStyle}>
          <h3 style={titleStyle}>{course.name || "Untitled course"}</h3>
          <p style={descStyle}>
            {(course.description &&
              course.description.length > 0 &&
              course.description) ||
              "No description provided."}
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
                ...tagBase,
                background: premium ? "#c93c3c" : "#2d9f40",
              }}
            >
              {premium ? "Premium" : "Free"}
            </span>

            <button
              style={buttonStyle}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/courses/${course._id || course.id}`);
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
    <div>
      <Navbar />
      <div style={layoutStyle}>
        <SideBar />
        <div style={containerStyle}>
          {/* Basic */}
          <div style={sectionHeader}>
            <div style={sectionTitle}>Basic Courses</div>
          </div>
          <div style={gridStyle}>
            {basicCourses.length > 0 ? (
              basicCourses.map((c) => renderCard(c))
            ) : (
              <p style={{ color: "#555" }}>No basic courses</p>
            )}
          </div>

          {/* Advance */}
          <div style={sectionHeader}>
            <div style={sectionTitle}>Advance Courses</div>
            <button style={seeAllBtn} onClick={() => navigate("/courses")}>
              See All
            </button>
          </div>
          <div style={gridStyle}>
            {advanceCourses.length > 0 ? (
              advanceCourses.map((c) => renderCard(c))
            ) : (
              <p style={{ color: "#555" }}>No advance courses</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


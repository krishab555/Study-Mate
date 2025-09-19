import React, { useEffect, useCallback,useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FAQSection from "../components/FAQsSection";
import LandingContact from "./LandingContact";
import Footer from "../components/common/Footer";
export default function Dashboard() {
  const location = useLocation();
  const sectionRefs = useRef({
    home: useRef(null),
    courses: useRef(null),
    faqs: useRef(null),
    "landing-contact": useRef(null)
  });

  // Smooth scroll helper with fixed-navbar offset
  const smoothScrollToId = useCallback((id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector("nav");
    const offset = header ? header.offsetHeight + 8 : 80;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  // Scroll to hash on load
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.replace("#", ""));
      requestAnimationFrame(() => setTimeout(() => smoothScrollToId(id), 0));
    }
  }, [location.hash, smoothScrollToId]);

  // Scroll via state
  useEffect(() => {
    if (location.state?.scrollTo) {
      requestAnimationFrame(() =>
        setTimeout(() => {
          smoothScrollToId(location.state.scrollTo);
        }, 0)
      );
    }
  }, [location.state, smoothScrollToId]);

  // Courses array
 const courses = [
   { id: 1, title: "Python", image: "/python image.jpg" },
   { id: 2, title: "Java", image: "/java image.png" },
   { id: 3, title: "NodeJS", image: "/node js image.png" },
   { id: 4, title: "ReactJS", image: "/reactjs.png" },
   { id: 5, title: "C++", image: "/cpp.webp" },
   { id: 6, title: "Python", image: "/python image.jpg" },
   { id: 7, title: "Php", image: "/php.webp" },
   { id: 8, title: "Javascript", image: "/js.webp" },
 ];

  // Styles for course cards
  const courseCardStyle = {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer", 
  };

  const courseImageStyle = {
    width: "300px",
    height: "250px",
    marginBottom: "10px",
    objectFit: "cover",
  };
  const courseTitleStyle = { fontWeight: "bold" };

  return (
  <div style={{ 
    paddingTop: "60px", 
    margin: 0,
    width: "100%",
    overflowX: "hidden",
    maxWidth: "100vw"
  }}>
    
    {/* Home Section - Keep padding for curved edges */}
    <section
      id="home"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        width: "100%",
        gap: "8px",
        background: "#f9f9f9",
        padding: "15px", // Keep padding for curved edges
        margin: " 0 auto",
        boxSizing: "border-box",
        
      }}
    >
      <img
        src="/image1.jpg"
        alt="Online Learning"
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <img
        src="https://img.freepik.com/premium-photo/young-beautiful-student-woman-using-laptop-writing-notebook-home_1303-18769.jpg"
        alt="Student Writing"
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
    </section>

    {/* Welcome Section - Keep proper spacing */}
    <section
      style={{
        marginTop: "20px",
        position: "relative",
        textAlign: "left",
        width: "100%", 
        padding: "0 15px",
        boxSizing: "border-box", 
      }}
    >
      <img
        src="project1.webp"
        alt="E-learning Welcome"
        style={{
          width: "100%", 
          height: "350px", 
          objectFit: "cover", 
          display: "block",
          borderRadius: "16px",
        }}
      />

      {/* Text inside image */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50px",
          transform: "translateY(-50%)",
          color: "black", 
          background: "rgba(255,255,255,0.7)", 
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px"
        }}
      >
        <h1 style={{ fontSize: "34px", fontWeight: "bold", margin: 0 }}>
          Welcome to StudyMate
        </h1>
        <p style={{ fontSize: "20px", marginTop: "10px" }}>
          Learn Anytime, Anywhere – Explore your skills with us
        </p>
      </div>
    </section>

    {/* We Provide Section - Keep original padding */}
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2",
        padding: "40px 20px", // Keep original padding
        margin: "20px 0",
      }}
    >
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "center", 
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "40px",
        width: "100%"
      }}>
        <div style={{ flex: "1", minWidth: "300px", textAlign: "center" }}>
          <img
            src="https://img.freepik.com/free-photo/smiling-young-woman-pointing-fingers-left-isolated-grey-wall_231208-11567.jpg"
            alt="Instructor"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ flex: "1", minWidth: "300px", padding: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>
            We provide
          </h2>
          <ul style={{ fontSize: "16px", lineHeight: "2", paddingLeft: "20px" }}>
            <li> Skill-based Learning</li>
            <li> 24×7 Learning</li>
            <li> Free Resources</li>
            <li> Advance Learning from Experts</li>
            <li> Certificates</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Courses Section - Keep original padding */}
    <section id="courses" style={{ padding: "40px 20px", margin: "20px 0" }}>
      <div style={{  margin: "0 auto" }}>
        {/* maxWidth: "1200px" */}
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
          Latest Courses
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {courses.map((course) => (
            <Link
              key={course.id}
              to="/login"
              state={{ courseId: course.id }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={courseCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  style={courseImageStyle}
                />
                <h3 style={courseTitleStyle}>{course.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* FAQs Section - Keep original padding */}
    <section id="faqs" style={{ margin: "20px 0" }}>
      <div style={{  margin: "0 auto" }}>
        <FAQSection />
      </div>
    </section>

    {/* Contact Section */}
    <section style={{ margin: "20px 0" }}>
      <div style={{  margin: "0 auto" }}>
        <LandingContact/>
      </div>
    </section>

    <Footer/>
  </div>
);}
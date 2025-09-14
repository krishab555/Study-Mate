import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%", // full width for background color
      backgroundColor: "#0a2a66",
      color: "white",
      zIndex: 9999,
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      height: "60px", // fixed height
      display: "flex",
      justifyContent: "center", // center the container
      alignItems: "center",
      padding: "0 10px",
    },
    container: {
      width: "100%",
      maxWidth: "1200px", // limit navbar width
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginLeft: "-70px", // move a bit to the left
    },
    logoImage: {
      width: "180px", // bigger logo width
      height: "90px", // within navbar height
      objectFit: "contain",
    },
    navLinks: {
      display: "flex",
      gap: "30px",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navItem: {
      cursor: "pointer",
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
    },
    searchBar: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      marginRight: "20px",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    btn: {
      backgroundColor: "white",
      color: "#0a2a66",
      padding: "6px 14px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <Link to="/">
            <img
              src="/Design.png"
              alt="StudyMate Logo"
              style={styles.logoImage}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul style={styles.navLinks}>
          <li style={styles.navItem} onClick={() => scrollToSection("home")}>
            Home
          </li>
          <li style={styles.navItem} onClick={() => scrollToSection("courses")}>
            Courses
          </li>
          <li style={styles.navItem} onClick={() => scrollToSection("faqs")}>
            FAQs
          </li>
          <li style={styles.navItem} onClick={() => scrollToSection("contact")}>
            Contact
          </li>

          {token && role === "student" && (
            <li>
              <Link to="/student/home" style={styles.navItem}>
                Dashboard
              </Link>
            </li>
          )}
          {token && role === "instructor" && (
            <li>
              <Link to="/instructor/home" style={styles.navItem}>
                Dashboard
              </Link>
            </li>
          )}
          {token && role === "admin" && (
            <li>
              <Link to="/admin/home" style={styles.navItem}>
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Search & User Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type="text" placeholder="Search" style={styles.searchBar} />
          <div style={styles.userSection}>
            
              <button style={styles.btn} onClick={() => navigate("/login")}>
                Login
              </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

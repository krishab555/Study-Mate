 import React from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";

  export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    const excludedPages = [ "/login", "/register"];
    if (excludedPages.includes(location.pathname)) {
    return null;
  }

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      navigate("/login");
    };

    const styles = {
      navbar: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#0a2a66",
        color: "white",
        padding: "12px 0", 
        zIndex: 9999,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      },
      container: {
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
          <div style={{ fontSize: "22px", fontWeight: "bold" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              StudyMate
            </Link>
          </div>
          <ul style={styles.navLinks}>
  {/* Always visible links */}
  <li><Link to="/" style={styles.navItem}>Home</Link></li>
  <li><Link to="/courses" style={styles.navItem}>Courses</Link></li>
  <li><Link to="/faqs" style={styles.navItem}>FAQs</Link></li>
  <li><Link to="/contact" style={styles.navItem}>Contact</Link></li>

  {/* Role-specific Dashboard link after login */}
  {token && role === "student" && (
    <li><Link to="/student/home" style={styles.navItem}>Dashboard</Link></li>
  )}
  {token && role === "instructor" && (
    <li><Link to="/instructor/home" style={styles.navItem}>Dashboard</Link></li>
  )}
  {token && role === "admin" && (
    <li><Link to="/admin/home" style={styles.navItem}>Dashboard</Link></li>
  )}
</ul>


          


          {/* Search */}
          <input
            type="text"
            placeholder="Search "
            style={styles.searchBar}
          />

          {/* Right Side */}
          <div style={styles.userSection}>
            {location.pathname.startsWith("/dashboard") ? (
            // ✅ On dashboard → show login only
            <button style={styles.btn} onClick={() => navigate("/login")}>
              Login
            </button>
          ) : token ? (
            // ✅ If logged in → show logout
            <>
                <span>Hi, {userName}</span>
                <button style={styles.btn} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button style={styles.btn} onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    );
  }

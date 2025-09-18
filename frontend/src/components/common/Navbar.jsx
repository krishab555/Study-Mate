import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell } from "lucide-react"; // notification icon

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "/defaultProfile.jpg"
  );

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isBellHovered, setIsBellHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  // Update profile image if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProfileImage(localStorage.getItem("profileImage") || "/defaultProfile.jpg");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleCustomEvent = () => {
      setProfileImage(localStorage.getItem("profileImage") || "/defaultProfile.jpg");
    };
    window.addEventListener("profileImageUpdated", handleCustomEvent);
    return () => window.removeEventListener("profileImageUpdated", handleCustomEvent);
  }, []);

  const hiddenPaths = ["/", "/dashboard"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  const links = {
    student: [
      { label: "Home", path: "/student/home" },
      { label: "Contact", path: "/student/contact" },
    ],
    instructor: [
      { label: "Home", path: "/instructor/home" },
      { label: "Contact", path: "/instructor/contact" },
    ],
    admin: [
      { label: "Home", path: "/admin/home" },
      { label: "Contact", path: "/admin/contact" },
    ],
  };

  const roleLinks = links[role] || [];

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#0a2a66",
      color: "white",
      zIndex: 9999,
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      height: "70px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 20px",
    },
    container: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      marginLeft: "-80px",
      marginTop: "8px",
    },
    logoImage: {
      width: "200px",
      height: "100px",
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
      transition: "all 0.2s ease",
    },
    navItemHover: {
      color: "#ffd700",
      transform: "scale(1.1)",
    },
    searchBar: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      marginRight: "15px",
      marginLeft: "15px",
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
      transition: "all 0.2s ease",
    },
    btnHover: {
      backgroundColor: "#e0e0e0",
      transform: "scale(1.05)",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Left: Logo */}
        <div style={styles.logoContainer}>
          <Link to="/">
            <img
              src="/Design.png"
              alt="StudyMate Logo"
              style={styles.logoImage}
            />
          </Link>
        </div>

        {/* Middle: Links */}
        <ul style={styles.navLinks}>
          {roleLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                style={{
                  ...styles.navItem,
                  ...(hoveredIndex === idx ? styles.navItemHover : {}),
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right section: search, notifications, profile, logout */}
        <div style={styles.userSection}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            style={styles.searchBar}
            onKeyDown={(e) => {
              if (e.key === "Enter") console.log("Search for:", e.target.value);
            }}
          />

          {/* Notification icon */}
          <div
            style={{
              cursor: "pointer",
              color: isBellHovered ? "#ffd700" : "white",
              display: "flex",
              alignItems: "center",
              transform: isBellHovered ? "scale(1.1)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={() => setIsBellHovered(true)}
            onMouseLeave={() => setIsBellHovered(false)}
            onClick={() => alert("Notifications clicked!")}
          >
            <Bell size={24} />
          </div>

          {/* Profile Image */}
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: isProfileHovered ? "2px solid #ffd700" : "2px solid white",
              cursor: "pointer",
              transform: isProfileHovered ? "scale(1.1)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            onClick={() => navigate("/profile")}
          />

          {/* Logout button */}
          <button
            style={{ ...styles.btn, ...(isBtnHovered ? styles.btnHover : {}) }}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

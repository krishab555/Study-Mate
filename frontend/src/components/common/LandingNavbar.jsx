import React, { useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "Home", section: "home" },
    { name: "Courses", section: "courses" },
    { name: "FAQs", section: "faqs" },
    { name: "Contact", section: "landing-contact" },
  ];

    useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; 
      const sections = navItems.map(item => {
        const element = document.getElementById(item.section);
        return {
          id: item.section,
          element: element,
          top: element ? element.offsetTop - 100 : 0, // Adjust offset as needed
          bottom: element ? element.offsetTop + element.offsetHeight - 100 : 0
        };
      }).filter(section => section.element !== null);
      
      // Find the current section
      let current = "home";
      for (const section of sections) {
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          current = section.id;
          break;
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 10px",
    },
    container: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      alignItems: "center",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      marginLeft: "0px",
      marginTop: "8px",
    },
    logoImage: {
      width: "200px",
      height: "100px",
      objectFit: "contain",
    },
    navLinksContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "30px",
      marginLeft: "auto",
    },
    navItem: {
      cursor: "pointer",
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      transition: "all 0.2s ease",
      padding: "8px 12px",
      borderRadius: "4px",
    },
    navItemHover: {
      color: "#ffd700", 
      transform: "scale(1.1)", 
    },
    activeNavItem: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "#ffd700",
      fontWeight: "bold",
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

        {/* Nav Links + Login/Logout */}
        <div style={styles.navLinksContainer}>
          {navItems.map((item, index) => (
            <span
              key={index}
              style={{
                ...styles.navItem,
                ...(hoveredIndex === index ? styles.navItemHover : {}),
                ...(activeSection === item.section ? styles.activeNavItem : {}),
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => scrollToSection(item.section)}
            >
              {item.name}
            </span>
          ))}

          {token && role === "student" && (
            <Link
              to="/student/home"
              style={{
                ...styles.navItem,
                ...(hoveredIndex === 4 ? styles.navItemHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(4)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              Dashboard
            </Link>
          )}
          {token && role === "instructor" && (
            <Link
              to="/instructor/home"
              style={{
                ...styles.navItem,
                ...(hoveredIndex === 5 ? styles.navItemHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(5)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              Dashboard
            </Link>
          )}
          {token && role === "admin" && (
            <Link
              to="/admin/home"
              style={{
                ...styles.navItem,
                ...(hoveredIndex === 6 ? styles.navItemHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(6)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              Dashboard
            </Link>
          )}

          
            <button
              style={styles.btn}
              onMouseEnter={() => setHoveredIndex(7)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          
        </div>
      </div>
    </nav>
  );
}

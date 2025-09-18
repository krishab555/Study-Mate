import { Link, useLocation } from "react-router-dom";
import {
  FiBookOpen,
  FiGrid,
  FiMessageSquare,
  FiTwitch,
  FiUser,
  FiSettings,
  FiAward,
} from "react-icons/fi";

const SideBar = () => {
  const location = useLocation();

  const excludedPages = ["/dashboard", "/login", "/register","/"];

  if (excludedPages.includes(location.pathname)) return null;

  const links = {
    student: [
      { path: "/student/home", label: "Dashboard", icon: <FiGrid /> },
      { path: "/student/courses", label: "Courses", icon: <FiBookOpen /> },
      { path: "/discussionForum", label: "Discussion Forum", icon: <FiMessageSquare />,},
      { path: "/faqs", label: "FAQs", icon: <FiTwitch /> },
      { path: "/student/certificate", label: "Certificate", icon: <FiAward /> },
      { path: "/student/quiz/courses", label: "Take Quiz", icon: <FiBookOpen /> },
    ],
    instructor: [
      { path: "/instructor/home", label: "Dashboard", icon: <FiGrid /> },
      { path: "/instructor/addcourse", label: "Add Courses", icon: <FiBookOpen />,},
      { path: "/discussionForum", label: "Discussion Forum", icon: <FiMessageSquare />,},
      { path: "/instructor/create-quiz", label: "Create Quiz", icon: <FiBookOpen /> },
    ],
    admin: [
      { path: "/admin/home", label: "Dashboard", icon: <FiGrid /> },
      { path: "/admin/manage-users", label: "Manage Users", icon: <FiUser /> },
      { path: "/admin/manage-courses", label: "Courses", icon: <FiBookOpen /> },
      { path: "/faqs", label: " Manage FAQs", icon: <FiTwitch /> },
      // { path: "/settings", label: "Settings", icon: <FiSettings /> },
    ],
  };
  const roleFromStorage = localStorage.getItem("role");
  const role = roleFromStorage ? roleFromStorage.toLowerCase() : null;
  const roleLinks = role && links[role] ? links[role] : [];

  const styles = {
    sidebar: {
      width: "250px",
      height: "100vh",
      position: "fixed",
      top: "40px",
      left: 0,
      backgroundColor: "#365285ff", // Dark blue background
      color: "white",
      padding: "30px 0 20px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      boxShadow: "2px 0 6px rgba(0,0,0,0.2)",
      zIndex: 100,
      overflowY: "auto",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "16px",
      padding: "12px 20px",
      borderRadius: "0 8px 8px 0",
      margin: "0 10px",
      transition: "all 0.3s ease",
      borderLeft: "3px solid transparent",
    },
    activeLink: {
      backgroundColor: "rgba(8, 12, 34, 0.15)",
      borderLeft: "3px solid #fff",
    },
    hoverEffect: {
      backgroundColor: "rgba(83, 115, 241, 0.1)",
      transform: "translateX(5px)",
    },
    noLinks: {
      color: "#ff6b6b",
      padding: "20px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.sidebar}>
      {roleLinks.length > 0 ? (
        roleLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{
                ...styles.link,
                ...(isActive ? styles.activeLink : {})
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = styles.hoverEffect.backgroundColor;
                  e.target.style.transform = styles.hoverEffect.transform;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = styles.link.backgroundColor || "transparent";
                  e.target.style.transform = "translateX(0)";
                }
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })
      ) : (
        <p style={styles.noLinks}>No links available for your role</p>
      )}
    </div>
  );
};

export const SidebarLayout = ({ children }) => {
  const sidebarWidth = 250; // sidebar width
  const gap = 220; // desired gap (~2-3 inches)
  const totalOffset = sidebarWidth + gap;

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ marginLeft: `${totalOffset}px`, flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
};

export default SideBar;
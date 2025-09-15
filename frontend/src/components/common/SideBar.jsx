import { Link, useLocation } from "react-router-dom";
import {
  FiBookOpen,
  FiGrid,
  FiMessageSquare,
  FiTwitch,
  FiUser,
  FiSettings,
} from "react-icons/fi";

const SideBar = () => {
  const location = useLocation();

  const excludedPages = ["/dashboard", "/login", "/register"];

  if (excludedPages.includes(location.pathname)) return null;

  const links = {
    student: [
      { path: "/student/home", label: "Dashboard", icon: <FiGrid /> },
      { path: "/student/courses", label: "Courses", icon: <FiBookOpen /> },
      {
        path: "/discussionForum",
        label: "Discussion Forum",
        icon: <FiMessageSquare />,
      },
      { path: "/faqs", label: "FAQs", icon: <FiTwitch /> },
      { path: "/student/profile", label: "Profile", icon: <FiUser /> },
    ],
    instructor: [
      { path: "/instructor/home", label: "Dashboard", icon: <FiGrid /> },
      
      {
        path: "/instructor/addcourse",
        label: "Add Courses",
        icon: <FiBookOpen />,
      },
      {
        path: "/discussionForum",
        label: "Discussion Forum",
        icon: <FiMessageSquare />,
      },
      { path: "/profile", label: "Profile", icon: <FiUser /> },
    ],
    admin: [
      { path: "/admin/home", label: "Dashboard", icon: <FiGrid /> },
      { path: "/admin/manage-users", label: "Manage Users", icon: <FiUser /> },
      { path: "/admin/manage-courses", label: "Courses", icon: <FiBookOpen /> },
      { path: "/faqs", label: " Manage FAQs", icon: <FiTwitch /> },
      { path: "/settings", label: "Settings", icon: <FiSettings /> },
      { path: "/profile", label: "Profile", icon: <FiUser /> },
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
      backgroundColor: "white",
      color: "#0a2a66",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxShadow: "2px 0 6px rgba(0,0,0,0.2)",
    },
    link: {
      display: "flex",
      gap: "12px",
      color: "#0a2a66",

      textDecoration: "none",
      fontWeight: "500",
      fontSize: "16px",
      padding: "8px",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.sidebar}>
      {roleLinks.length > 0 ? (
        roleLinks.map((link) => (
          <Link key={link.path} to={link.path} style={styles.link}>
            {link.icon}
            {link.label}
          </Link>
        ))
      ) : (
        <p style={{ color: "red" }}>No links available for your role</p>
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
      <div style={{ marginLeft: `${totalOffset}px`, flex: 1 }}>{children}</div>
    </div>
  );
};

export default SideBar;

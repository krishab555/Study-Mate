// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const userName = localStorage.getItem("userName");
//   const role = localStorage.getItem("role")?.toLowerCase();
//     const hiddenPaths = ["/", "/dashboard"]; // Add more paths as needed
//   if (hiddenPaths.includes(location.pathname)) return null;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) element.scrollIntoView({ behavior: "smooth" });
//   };

//   const links = {
//     student: [
//       { label: "Home", path: "/student/home" },
//       { label: "Contact", path: "/student/contact" },
//     ],
//     instructor: [
//       { label: "Home", path: "/instructor/home" },
//       { label: "Contact", path: "/instructor/contact" },
//     ],
//     admin: [
//       { label: "Home", path: "/admin/home" },
//       { label: "Contact", path: "/admin/contact" },
//     ],
//   };

//   const roleLinks = links[role] || [];

//   const styles = {
//     navbar: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       backgroundColor: "#0a2a66",
//       color: "white",
//       zIndex: 9999,
//       boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//       height: "60px",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: "0 10px",
//     },
//     container: {
//       width: "100%",
//       maxWidth: "1200px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     logoContainer: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       marginLeft: "-70px",
//     },
//     logoImage: {
//       width: "180px",
//       height: "90px",
//       objectFit: "contain",
//     },
//     navLinks: {
//       display: "flex",
//       gap: "30px",
//       listStyle: "none",
//       margin: 0,
//       padding: 0,
//     },
//     navItem: {
//       cursor: "pointer",
//       color: "white",
//       textDecoration: "none",
//       fontWeight: "500",
//     },
//     searchBar: {
//       padding: "6px 12px",
//       borderRadius: "6px",
//       border: "none",
//       outline: "none",
//       fontSize: "14px",
//       marginRight: "20px",
//     },
//     userSection: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     btn: {
//       backgroundColor: "white",
//       color: "#0a2a66",
//       padding: "6px 14px",
//       border: "none",
//       borderRadius: "5px",
//       cursor: "pointer",
//       fontWeight: "bold",
//     },
//     avatar: {
//       width: "36px",
//       height: "36px",
//       borderRadius: "50%",
//       backgroundColor: "#1e3a8a",
//       color: "white",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontWeight: "bold",
//       fontSize: "16px",
//     },
//   };

//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.container}>
//         {/* Logo */}
//         <Link to="/">
//           <img
//             src="/Design.png"
//             alt="StudyMate Logo"
//             style={styles.logoImage}
//           />
//         </Link>

//         {/* Links */}
//         <ul style={styles.navLinks}>
//           {roleLinks.map((link, idx) =>
//             link.path ? (
//               <li key={idx}>
//                 <Link to={link.path} style={styles.navItem}>
//                   {link.label}
//                 </Link>
//               </li>
//             ) : (
//               <li key={idx} style={styles.navItem} onClick={link.onClick}>
//                 {link.label}
//               </li>
//             )
//           )}
//         </ul>

//         {/* Search + User */}
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//   {/* Search bar */}
//   <input
//     type="text"
//     placeholder="Search"
//     style={styles.searchBar}
//     onKeyDown={(e) => {
//       if (e.key === "Enter") {
//         // Implement search logic here
//         console.log("Search for:", e.target.value);
//       }
//     }}
//   />

//   {/* User Profile Image */}
//   <div style={{ display: "flex", alignItems: "center" }}>
//     <img
//       src={localStorage.getItem("profileImage") || "/defaultProfile.jpg"}
//       alt="Profile"
//       style={{
//         width: "36px",
//         height: "36px",
//         borderRadius: "50%",
//         objectFit: "cover",
//         border: "2px solid white",
//         cursor: "pointer",
//       }}
//       onClick={() => window.location.href = "/profile"} // optional: redirect to profile page
//     />
//   </div>

//   {/* Logout button */}
//   <button style={styles.btn} onClick={handleLogout}>
//     Logout
//   </button>
// </div>

        
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell } from "lucide-react"; // notification icon

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();

  const hiddenPaths = ["/", "/dashboard"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
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
      height: "70px", // ⬅️ Increased navbar height to fit bigger logo
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
      marginLeft: "-80px", // ⬅️ Shift logo more to the left
      marginTop: "8px", // ⬅️ shifted logo a bit down
    },
    logoImage: {
      width: "200px", // ⬅️ Increased width
      height: "100px", // ⬅️ Increased height
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
          {roleLinks.map((link, idx) =>
            link.path ? (
              <li key={idx}>
                <Link to={link.path} style={styles.navItem}>
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={idx} style={styles.navItem} onClick={link.onClick}>
                {link.label}
              </li>
            )
          )}
        </ul>

        {/* Right: Search + Notification + Profile + Logout */}
        <div style={styles.userSection}>
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search"
            style={styles.searchBar}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Search for:", e.target.value);
              }
            }}
          />

          {/* Notification icon */}
          <div
            style={{
              cursor: "pointer",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => alert("Notifications clicked!")}
          >
            <Bell size={24} /> {/* ⬅️ Slightly bigger notification icon */}
          </div>

          {/* Profile Image */}
          <img
            src={localStorage.getItem("profileImage") || "/defaultProfile.jpg"}
            alt="Profile"
            style={{
              width: "40px", // ⬅️ Made profile image a bit bigger
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
              cursor: "pointer",
            }}
            onClick={() => navigate("/profile")}
          />

          {/* Logout button */}
          <button style={styles.btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // adjust path

const Navbar = () => {
  const { user } = useContext(AuthContext);

  let navLinks = [];

if (user?.role === "admin") {
  navLinks = [
    { to: "/admin/home", label: "Dashboard" },
    { to: "/admin/users", label: "Manage Users" },
    { to: "/admin/courses", label: "Manage Courses" },
    { to: "/admin/instructors", label: "Manage Instructors" },
    { to: "/admin/faqs", label: "Manage FAQs" },
    { to: "/admin/settings", label: "Settings" },
  ];
} else {
  // Default (students/teachers/guests)
  navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/faqs", label: "FAQs" },
    { to: "/contact", label: "Contact" },
  ];
}

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-[1000]">
      {/* Logo */}
      <div className="text-xl font-bold">
        {user?.role === "admin" ? "StudyMate Admin" : "StudyMate"}
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-1 rounded-md text-black"
        />
      </div>

      {/* Menu Items */}
      <ul className="flex gap-6 items-center">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
        {user ? (
          <li>
            <Link to="/logout" className="bg-red-600 px-3 py-1 rounded-md">
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="bg-blue-600 px-3 py-1 rounded-md">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

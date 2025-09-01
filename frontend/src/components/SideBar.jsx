import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const SideBar = () => {
  const { user, setUser } = useAuth();

  const activeStyle = ({ isActive }) => {
    return isActive
      ? {
          backgroundColor: "#49516F",
          color: "white",
        }
      : {};
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav
      style={{
        position: "fixed",
        width: "250px",
        height: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            padding: "16px",
          }}
        >
          LMS
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <NavLink
            style={({ isActive }) => ({
              ...activeStyle({ isActive }),
              padding: "16px",
              fontSize: "18px",
              borderRadius: "8px",
              color: "black",
              textDecoration: "none",
            })}
            to="/"
          >
            Dashboard
          </NavLink>

          <NavLink
            style={({ isActive }) => ({
              ...activeStyle({ isActive }),
              padding: "16px",
              fontSize: "18px",
              borderRadius: "8px",
              color: "black",
              textDecoration: "none",
            })}
            to="/transactions"
          >
            Transactions
          </NavLink>

          {user?.role !== "Member" && (
            <NavLink
              style={({ isActive }) => ({
                ...activeStyle({ isActive }),
                padding: "16px",
                fontSize: "18px",
                borderRadius: "8px",
                color: "black",
                textDecoration: "none",
              })}
              to="/members"
            >
              Members
            </NavLink>
          )}

          <NavLink
            style={({ isActive }) => ({
              ...activeStyle({ isActive }),
              padding: "16px",
              fontSize: "18px",
              borderRadius: "8px",
              color: "black",
              textDecoration: "none",
            })}
            to="/profile"
          >
            Profile
          </NavLink>
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginBottom: "16px",
          border: "1px solid #f87171",
          color: "#f87171",
          padding: "8px",
          borderRadius: "8px",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          background: "none",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#fee2e2")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        <FiLogOut /> Logout
      </button>
    </nav>
  );
};

export default SideBar;

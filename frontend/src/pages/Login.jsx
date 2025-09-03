
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
  console.log("Login submitted:", { email, password });
    try{
    const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log("Login submitted:", { email, password });
  console.log("Login response:", data);

  if (data.success) {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("role", data.data.role);
    localStorage.setItem("userName", data.data.name);
   
  
   // ✅ Redirect based on role
        if (data.data.role === "Student") {
          navigate("/student/home");
        } else if (data.data.role === "Instructor") {
          navigate("/instructor/home");
        } else if (data.data.role === "Admin") {
          navigate("/admin/home");
        }
      } else {
        alert(data.message || "Login failed");
      }
    }catch(error) {
      console.error("Login error:", error);
    }
    console.log("Login submitted:", { email, password });
  };

  const containerStyle = {
    maxWidth: "400px",
     width: "90%",
    margin: "80px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#f9f9f9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "20px",
  };

  const inputStyle = {
    padding: "12px 14px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    width:"100%",
    boxSizing:"border-box",
  };
  const labelStyle = {
    textAlign: "left",
    fontWeight: "500",
    marginBottom: "6px",
    display: "block",
  };

  const buttonStyle = {
    padding: "12px",
    background: "#0056b3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    background: "#08478bff",
  };

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f0f2f5", // optional
    }}
  >
    <div style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <div>
            <label style={labelStyle}>Username:</label>
            </div>
            <div>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
          />
          </div>
          </div>
          <div>
            <div className=""><label style={labelStyle}>Password:</label></div>
            <div >

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
          />
          </div>
          </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.background = buttonHoverStyle.background)}
          onMouseOut={(e) => (e.target.style.background = buttonStyle.background)}
        >
          Login
        </button>
      </form>
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
    </div>
  );
}


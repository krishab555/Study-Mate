import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student"); // Role state added
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          gender,
          date,
          password,
        }),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        alert("Registration successful!");
        navigate("/login"); // redirect to login after success
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    width: "90%",
    margin: "20px auto",
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
    marginTop: "15px",
  };

  const inputStyle = {
    padding: "12px 14px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    width: "100%",
    boxSizing: "border-box",
  };

  const labelStyle = {
    textAlign: "left",
    fontWeight: "500",
    marginBottom: "6px",
    display: "block",
  };

  const radioContainer = {
    display: "flex",
    gap: "20px",
    marginTop: "6px",
    justifyContent: "flex-start",
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
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Register</h2>
      {message && (
        <p style={{ color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Username */}
        <div>
          <label style={labelStyle}>Username:</label>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            pattern="[A-Za-z\s]+"
            title="Name can only contain letters and spaces"
            style={inputStyle}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* Gender */}
        <div style={radioContainer}>
          <label style={labelStyle}>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>

        {/* Date of Birth */}
        <div>
          <label style={labelStyle}>Date Of Birth:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label style={labelStyle}>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.target.style.background = buttonHoverStyle.background)
          }
          onMouseOut={(e) =>
            (e.target.style.background = buttonStyle.background)
          }
        >
          Register
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

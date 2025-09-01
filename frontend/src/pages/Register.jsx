import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted:", { username, email,gender,date,password,confirmpassword });
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px 25px",
    borderRadius: "10px",
    background: "#f9f9f9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
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

  const radioContainer = {
    display: "flex",
    gap: "20px",
    marginTop: "6px",
    justifyContent: "flex-start",
  };

  const buttonStyle = {
    padding: "12px",
    background: "0B2C5D",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    background: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Register</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div >
            <div>
            <label style={labelStyle}>Username:</label>
            </div>
<div >

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
          />
          </div>
        </div>

        <div >
            <div className="">
                <label style={labelStyle}>Email:</label></div>
            <div className="">
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
        <div style={radioContainer}>
            <div className=""><label style={labelStyle}>Gender:</label></div>
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
<div>
    <div className=""><label style={labelStyle}>Date Of Birth:</label></div>

        <div >
            <input
          type="date"
          placeholder="Date of Birth"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
          required
          />
        </div>
          </div>
          <div>
            <div className=""><label style={labelStyle}>Password:</label></div>

        <div>
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
          <div>
            <div className=""><label style={labelStyle}>Confirm Password:</label></div>

        <div>
            <input
          type="password"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
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
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

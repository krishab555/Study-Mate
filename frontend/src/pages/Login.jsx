
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
  console.log("Login response:", data);

  if (data.success) {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("role", data.data.role);
   
  
   // ✅ Redirect based on role
        if (data.data.role === "Student") {
          navigate("/student/Home");
        } else if (data.data.role === "Instructor") {
          navigate("/instructor/InstructorHome");
        } else if (data.data.role === "Admin") {
          navigate("/admin/adminHome");
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
  );
}

// import { useAuth } from "../contexts/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const {
//     login,
//     loginWithGoogle,
//     loginWithFacebook,
//     loading: authLoading,
//   } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       // Pass rememberMe as the third parameter to match AuthContext
//       const result = await login(email, password, rememberMe);
//       if (!result.success) {
//         setError(result.error || "Login failed");
//       }
//     } catch (err) {
//       setError("An error occurred during login");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setIsLoading(true);
//     setError("");

//     try {
//       const result = await loginWithGoogle();
//       if (!result.success) {
//         setError(result.error || "Google login failed");
//       }
//     } catch (err) {
//       setError("An error occurred during Google login");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFacebookLogin = async () => {
//     setIsLoading(true);
//     setError("");

//     try {
//       const result = await loginWithFacebook();
//       if (!result.success) {
//         setError(result.error || "Facebook login failed");
//       }
//     } catch (err) {
//       setError("An error occurred during Facebook login");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: window.innerWidth < 768 ? "column" : "row",
//       }}
//     >
//       {/* Left side - Illustration */}
//       <div
//         style={{
//           flex: window.innerWidth < 768 ? "none" : 1,
//           backgroundColor: "#0b2c5d",
//           position: "relative",
//           overflow: "hidden",
//           minHeight: window.innerWidth < 768 ? "200px" : "auto",
//         }}
//       >
//         {/* Logo */}
//         <div
//           style={{
//             position: "absolute",
//             top: "32px",
//             left: "32px",
//             zIndex: 10,
//           }}
//         >
//           <div style={{ color: "white" }}>
//             <div style={{ fontSize: "24px", fontWeight: "bold" }}>S'M</div>
//             <div style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
//               STUDY MATE
//             </div>
//           </div>
//         </div>

//         {window.innerWidth >= 768 && (
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {/* Custom illustration elements to match the Figma design */}
//             <div
//               style={{
//                 position: "relative",
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {/* Plant */}
//               <div style={{ position: "absolute", bottom: 0, left: "64px" }}>
//                 <div
//                   style={{
//                     width: "16px",
//                     height: "128px",
//                     backgroundColor: "white",
//                     borderRadius: "50px",
//                   }}
//                 ></div>
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "-16px",
//                     left: "-8px",
//                     width: "32px",
//                     height: "32px",
//                     backgroundColor: "white",
//                     borderRadius: "50%",
//                     transform: "rotate(45deg)",
//                   }}
//                 ></div>
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "-8px",
//                     left: "8px",
//                     width: "24px",
//                     height: "24px",
//                     backgroundColor: "white",
//                     borderRadius: "50%",
//                     transform: "rotate(-12deg)",
//                   }}
//                 ></div>
//               </div>

//               {/* Desk */}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: "128px",
//                   right: "128px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "8px",
//                     backgroundColor: "#f2f2f2",
//                     borderTopLeftRadius: "8px",
//                     borderTopRightRadius: "8px",
//                   }}
//                 ></div>
//                 <div
//                   style={{
//                     width: "32px",
//                     height: "96px",
//                     backgroundColor: "#f2f2f2",
//                     position: "absolute",
//                     left: "16px",
//                     top: "-96px",
//                   }}
//                 ></div>
//                 <div
//                   style={{
//                     width: "32px",
//                     height: "96px",
//                     backgroundColor: "#f2f2f2",
//                     position: "absolute",
//                     right: "16px",
//                     top: "-96px",
//                   }}
//                 ></div>
//               </div>

//               {/* Books stack */}
//               <div
//                 style={{ position: "absolute", bottom: "8px", left: "160px" }}
//               >
//                 <div
//                   style={{
//                     width: "64px",
//                     height: "12px",
//                     backgroundColor: "#e6e6e6",
//                     borderRadius: "4px",
//                   }}
//                 ></div>
//                 <div
//                   style={{
//                     width: "56px",
//                     height: "12px",
//                     backgroundColor: "#d9d9d9",
//                     borderRadius: "4px",
//                     marginTop: "4px",
//                   }}
//                 ></div>
//                 <div
//                   style={{
//                     width: "48px",
//                     height: "12px",
//                     backgroundColor: "#cccccc",
//                     borderRadius: "4px",
//                     marginTop: "4px",
//                   }}
//                 ></div>
//               </div>

//               {/* Laptop */}
//               <div
//                 style={{ position: "absolute", bottom: "8px", left: "256px" }}
//               >
//                 <div
//                   style={{
//                     width: "80px",
//                     height: "56px",
//                     backgroundColor: "#f2f2f2",
//                     borderRadius: "8px",
//                     border: "2px solid #d9d9d9",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "100%",
//                       height: "40px",
//                       backgroundColor: "#ffffff",
//                       borderTopLeftRadius: "8px",
//                       borderTopRightRadius: "8px",
//                       marginTop: "4px",
//                     }}
//                   ></div>
//                 </div>
//                 <div
//                   style={{
//                     width: "80px",
//                     height: "4px",
//                     backgroundColor: "#d9d9d9",
//                     borderBottomLeftRadius: "8px",
//                     borderBottomRightRadius: "8px",
//                   }}
//                 ></div>
//               </div>

//               {/* Person */}
//               <div
//                 style={{ position: "absolute", bottom: "8px", right: "160px" }}
//               >
//                 {/* Head */}
//                 <div
//                   style={{
//                     width: "48px",
//                     height: "48px",
//                     backgroundColor: "#ffb8b8",
//                     borderRadius: "50%",
//                     marginBottom: "8px",
//                   }}
//                 ></div>
//                 {/* Hair */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: "4px",
//                     width: "40px",
//                     height: "32px",
//                     backgroundColor: "#2f2e41",
//                     borderRadius: "50%",
//                   }}
//                 ></div>
//                 {/* Body */}
//                 <div
//                   style={{
//                     width: "64px",
//                     height: "80px",
//                     backgroundColor: "#6c63ff",
//                     borderRadius: "8px",
//                   }}
//                 ></div>
//                 {/* Arms */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "48px",
//                     left: "-8px",
//                     width: "24px",
//                     height: "48px",
//                     backgroundColor: "#6c63ff",
//                     borderRadius: "50px",
//                     transform: "rotate(12deg)",
//                   }}
//                 ></div>
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "48px",
//                     right: "-8px",
//                     width: "24px",
//                     height: "48px",
//                     backgroundColor: "#6c63ff",
//                     borderRadius: "50px",
//                     transform: "rotate(-12deg)",
//                   }}
//                 ></div>
//                 {/* Legs */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     bottom: "-64px",
//                     left: "8px",
//                     width: "20px",
//                     height: "64px",
//                     backgroundColor: "#2f2e41",
//                     borderRadius: "50px",
//                   }}
//                 ></div>
//                 <div
//                   style={{
//                     position: "absolute",
//                     bottom: "-64px",
//                     right: "8px",
//                     width: "20px",
//                     height: "64px",
//                     backgroundColor: "#2f2e41",
//                     borderRadius: "50px",
//                   }}
//                 ></div>
//               </div>

//               {/* Floating phone/tablet with colorful squares */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "128px",
//                   left: "256px",
//                   transform: "rotate(12deg)",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "96px",
//                     height: "128px",
//                     backgroundColor: "#3f3d56",
//                     borderRadius: "8px",
//                     border: "2px solid #d9d9d9",
//                     padding: "8px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "1fr 1fr",
//                       gap: "8px",
//                       height: "100%",
//                     }}
//                   >
//                     <div
//                       style={{
//                         backgroundColor: "#d9d9d9",
//                         borderRadius: "4px",
//                       }}
//                     ></div>
//                     <div
//                       style={{
//                         backgroundColor: "#6c63ff",
//                         borderRadius: "4px",
//                       }}
//                     ></div>
//                     <div
//                       style={{
//                         backgroundColor: "#ff6584",
//                         borderRadius: "4px",
//                       }}
//                     ></div>
//                     <div style={{ backgroundColor: "transparent" }}></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Right side - Login Form */}
//       <div
//         style={{
//           flex: 1,
//           backgroundColor: "#ffffff",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "32px",
//         }}
//       >
//         <div style={{ width: "100%", maxWidth: "448px" }}>
//           <div style={{ textAlign: "left" }}>
//             <h1
//               style={{
//                 fontSize: "36px",
//                 fontWeight: "bold",
//                 color: "#000000",
//                 marginBottom: "32px",
//                 lineHeight: "1.2",
//               }}
//             >
//               Login to your Account
//             </h1>
//           </div>

//           {error && (
//             <div
//               style={{
//                 color: "#ff4d4f",
//                 backgroundColor: "#fff2f0",
//                 border: "1px solid #ffccc7",
//                 padding: "12px",
//                 borderRadius: "8px",
//                 marginBottom: "24px",
//               }}
//             >
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div style={{ marginBottom: "24px" }}>
//               <label
//                 htmlFor="email"
//                 style={{
//                   color: "#000000",
//                   fontSize: "18px",
//                   fontWeight: "500",
//                   display: "block",
//                   marginBottom: "12px",
//                 }}
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={{
//                   width: "100%",
//                   height: "56px",
//                   border: "2px solid #d9d9d9",
//                   borderRadius: "12px",
//                   backgroundColor: "#ffffff",
//                   color: "#000000",
//                   fontSize: "16px",
//                   padding: "0 16px",
//                   outline: "none",
//                   transition: "border-color 0.3s",
//                 }}
//                 onFocus={(e) => (e.target.style.borderColor = "#0061ff")}
//                 onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
//                 required
//               />
//             </div>

//             <div style={{ marginBottom: "24px" }}>
//               <label
//                 htmlFor="password"
//                 style={{
//                   color: "#000000",
//                   fontSize: "18px",
//                   fontWeight: "500",
//                   display: "block",
//                   marginBottom: "12px",
//                 }}
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{
//                   width: "100%",
//                   height: "56px",
//                   border: "2px solid #d9d9d9",
//                   borderRadius: "12px",
//                   backgroundColor: "#ffffff",
//                   color: "##000000",
//                   fontSize: "16px",
//                   padding: "0 16px",
//                   outline: "none",
//                   transition: "border-color 0.3s",
//                 }}
//                 onFocus={(e) => (e.target.style.borderColor = "#0061ff")}
//                 onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
//                 required
//               />
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 paddingTop: "8px",
//                 marginBottom: "32px",
//               }}
//             >
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "12px" }}
//               >
//                 <input
//                   id="remember"
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   style={{
//                     width: "20px",
//                     height: "20px",
//                     border: "2px solid #d9d9d9",
//                     borderRadius: "4px",
//                   }}
//                 />
//                 <label
//                   htmlFor="remember"
//                   style={{
//                     color: "#000000",
//                     fontSize: "16px",
//                     fontWeight: "500",
//                   }}
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <a
//                 href="#"
//                 style={{
//                   color: "#000000",
//                   fontSize: "16px",
//                   fontWeight: "500",
//                   textDecoration: "none",
//                 }}
//                 onMouseOver={(e) =>
//                   (e.target.style.textDecoration = "underline")
//                 }
//                 onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//               >
//                 Forget password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading || authLoading}
//               style={{
//                 width: "100%",
//                 height: "56px",
//                 backgroundColor: isLoading || authLoading ? "#ccc" : "#0061ff",
//                 color: "white",
//                 borderRadius: "12px",
//                 fontSize: "18px",
//                 fontWeight: "500",
//                 border: "none",
//                 cursor: isLoading || authLoading ? "not-allowed" : "pointer",
//                 marginBottom: "32px",
//                 transition: "background-color 0.3s",
//               }}
//               onMouseOver={(e) =>
//                 !(isLoading || authLoading) &&
//                 (e.target.style.backgroundColor = "#0052d9")
//               }
//               onMouseOut={(e) =>
//                 !(isLoading || authLoading) &&
//                 (e.target.style.backgroundColor = "#0061ff")
//               }
//             >
//               {isLoading || authLoading ? "Logging in..." : "Login"}
//             </button>

//             <div style={{ position: "relative", padding: "16px 0" }}>
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: 0,
//                   right: 0,
//                   height: "1px",
//                   backgroundColor: "#d9d9d9",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   position: "relative",
//                   display: "flex",
//                   justifyContent: "center",
//                   fontSize: "16px",
//                 }}
//               >
//                 <span
//                   style={{
//                     backgroundColor: "#ffffff",
//                     padding: "0 24px",
//                     color: "#7f7f7f",
//                     fontWeight: "500",
//                   }}
//                 >
//                   OR
//                 </span>
//               </div>
//             </div>

//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//             >
//               <button
//                 type="button"
//                 onClick={handleGoogleLogin}
//                 disabled={isLoading || authLoading}
//                 style={{
//                   width: "100%",
//                   height: "56px",
//                   border: "2px solid #d9d9d9",
//                   backgroundColor:
//                     isLoading || authLoading ? "#f2f2f2" : "#ffffff",
//                   color: "#000000",
//                   borderRadius: "12px",
//                   fontSize: "16px",
//                   fontWeight: "500",
//                   cursor: isLoading || authLoading ? "not-allowed" : "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "12px",
//                   transition: "background-color 0.3s",
//                 }}
//                 onMouseOver={(e) =>
//                   !(isLoading || authLoading) &&
//                   (e.target.style.backgroundColor = "#f2f2f2")
//                 }
//                 onMouseOut={(e) =>
//                   !(isLoading || authLoading) &&
//                   (e.target.style.backgroundColor = "#ffffff")
//                 }
//               >
//                 <svg width="24" height="24" viewBox="0 0 24 24">
//                   <path
//                     fill="#4285F4"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="#34A853"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="#FBBC05"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="#EA4335"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 Login with Google
//               </button>

//               <button
//                 type="button"
//                 onClick={handleFacebookLogin}
//                 disabled={isLoading || authLoading}
//                 style={{
//                   width: "100%",
//                   height: "56px",
//                   border: "2px solid #d9d9d9",
//                   backgroundColor:
//                     isLoading || authLoading ? "#f2f2f2" : "#ffffff",
//                   color: "#000000",
//                   borderRadius: "12px",
//                   fontSize: "16px",
//                   fontWeight: "500",
//                   cursor: isLoading || authLoading ? "not-allowed" : "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "12px",
//                   transition: "background-color 0.3s",
//                 }}
//                 onMouseOver={(e) =>
//                   !(isLoading || authLoading) &&
//                   (e.target.style.backgroundColor = "#f2f2f2")
//                 }
//                 onMouseOut={(e) =>
//                   !(isLoading || authLoading) &&
//                   (e.target.style.backgroundColor = "#ffffff")
//                 }
//               >
//                 <svg width="24" height="24" fill="#1877F2" viewBox="0 0 24 24">
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//                 Login with Facebook
//               </button>
//             </div>
//           </form>

//           <div style={{ marginTop: "24px", textAlign: "center" }}>
//             <p style={{ color: "#000000", fontSize: "16px" }}>
//               Don't have an account?{" "}
//               <a
//                 href="/register"
//                 style={{
//                   color: "#0061ff",
//                   textDecoration: "none",
//                   fontWeight: "500",
//                 }}
//                 onMouseOver={(e) =>
//                   (e.target.style.textDecoration = "underline")
//                 }
//                 onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//               >
//                 Sign up
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

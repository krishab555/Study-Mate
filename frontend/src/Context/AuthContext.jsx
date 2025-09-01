import React, { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user profile from backend
  const fetchProfile = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) setUser(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("token", data.data.token);
      }
      return data;
    } catch (err) {
      console.log(err);
      return { success: false, message: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("token", data.data.token);
      }
      return data;
    } catch (err) {
      console.log(err);
      return { success: false, message: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// import React, { createContext, useContext, useState, useEffect } from "react";


// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Check for existing session on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("studymate_user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password, rememberMe = false) => {
//     setLoading(true);
//     setError("");

//     try {
//        const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//       credentials: "include", // if using cookies
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Login failed");


//         const userData = {
//            id: data.user._id,
//       email: data.user.email,
//       name: data.user.name,
//       avatar: data.user.avatar || null,
//       token: data.token, 
//         };

//         setUser(userData);

//         if (rememberMe) {
//           localStorage.setItem("studymate_user", JSON.stringify(userData));
//         }

//         return { success: true };
//       }  catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   ///register ko lagi

//   const register = async (name, email, password, confirmPassword) => {
//     setLoading(true);
//     setError("");

//     try {

//       const res = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, confirmPassword }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Registration failed");
      

//       const userData = {
//         id: data.user._id,
//       email: data.user.email,
//       name: data.user.name,
//       avatar: data.user.avatar || null,
//       token: data.token,
//       };

//       setUser(userData);
//       localStorage.setItem("studymate_user", JSON.stringify(userData));

//       return { success: true };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginWithGoogle = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       // Simulate Google OAuth - replace with actual Google authentication
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const userData = {
//         id: "google_" + Date.now(),
//         email: "user@gmail.com",
//         name: "Google User",
//         avatar: "https://via.placeholder.com/40",
//       };

//       setUser(userData);
//       localStorage.setItem("studymate_user", JSON.stringify(userData));

//       return { success: true };
//     } catch (err) {
//       setError("Google login failed");
//       return { success: false, error: "Google login failed" };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginWithFacebook = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       // Simulate Facebook OAuth - replace with actual Facebook authentication
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const userData = {
//         id: "facebook_" + Date.now(),
//         email: "user@facebook.com",
//         name: "Facebook User",
//         avatar: "https://via.placeholder.com/40",
//       };

//       setUser(userData);
//       localStorage.setItem("studymate_user", JSON.stringify(userData));

//       return { success: true };
//     } catch (err) {
//       setError("Facebook login failed");
//       return { success: false, error: "Facebook login failed" };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setError("");
//     localStorage.removeItem("studymate_user");
//   };

//   const forgotPassword = async (email) => {
//     setLoading(true);
//     setError("");

//     try {
//       // Simulate password reset email - replace with actual logic
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       return {
//         success: true,
//         message: "Password reset email sent successfully",
//       };
//     } catch (err) {
//       setError("Failed to send password reset email");
//       return { success: false, error: "Failed to send password reset email" };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     register,
//     loginWithGoogle,
//     loginWithFacebook,
//     logout,
//     forgotPassword,
    
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Higher-order component for protected routes
// export const withAuth = (WrappedComponent) => {
//   return function AuthenticatedComponent(props) {
//     const { user, loading } = useAuth();

//     if (loading) {
//       return (
//         <div
//           style={{
//             minHeight: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#ffffff",
//           }}
//         >
//           <div
//             style={{
//               width: "48px",
//               height: "48px",
//               border: "4px solid #f2f2f2",
//               borderTop: "4px solid #0061ff",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//             }}
//           ></div>
//           <style>{`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}</style>
//         </div>
//       );
//     }

//     if (!user) {
//       // Redirect to login or show login form
//       return (
//         <div
//           style={{
//             minHeight: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#ffffff",
//             padding: "32px",
//           }}
//         >
//           <div
//             style={{
//               textAlign: "center",
//               maxWidth: "400px",
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: "24px",
//                 fontWeight: "bold",
//                 color: "#000000",
//                 marginBottom: "16px",
//               }}
//             >
//               Authentication Required
//             </h2>
//             <p
//               style={{
//                 fontSize: "16px",
//                 color: "#7f7f7f",
//                 marginBottom: "24px",
//               }}
//             >
//               Please log in to access this page.
//             </p>
//             <button
//               onClick={() => (window.location.href = "/login")}
//               style={{
//                 backgroundColor: "#0061ff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "12px",
//                 padding: "12px 24px",
//                 fontSize: "16px",
//                 fontWeight: "500",
//                 cursor: "pointer",
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#0052d9")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#0061ff")}
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

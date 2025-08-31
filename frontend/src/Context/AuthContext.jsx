import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("studymate_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (email === "demo@studymate.com" && password === "password123") {
        const userData = {
          id: "1",
          email: email,
          name: "Demo User",
          avatar: null,
        };

        setUser(userData);

        if (rememberMe) {
          localStorage.setItem("studymate_user", JSON.stringify(userData));
        }

        return { success: true };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    setLoading(true);
    setError("");

    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Validate password strength
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // Simulate API call - replace with actual registration logic
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userData = {
        id: Date.now().toString(),
        email: email,
        name: name,
        avatar: null,
      };

      setUser(userData);
      localStorage.setItem("studymate_user", JSON.stringify(userData));

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError("");

    try {
      // Simulate Google OAuth - replace with actual Google authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        id: "google_" + Date.now(),
        email: "user@gmail.com",
        name: "Google User",
        avatar: "https://via.placeholder.com/40",
      };

      setUser(userData);
      localStorage.setItem("studymate_user", JSON.stringify(userData));

      return { success: true };
    } catch (err) {
      setError("Google login failed");
      return { success: false, error: "Google login failed" };
    } finally {
      setLoading(false);
    }
  };

  const loginWithFacebook = async () => {
    setLoading(true);
    setError("");

    try {
      // Simulate Facebook OAuth - replace with actual Facebook authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        id: "facebook_" + Date.now(),
        email: "user@facebook.com",
        name: "Facebook User",
        avatar: "https://via.placeholder.com/40",
      };

      setUser(userData);
      localStorage.setItem("studymate_user", JSON.stringify(userData));

      return { success: true };
    } catch (err) {
      setError("Facebook login failed");
      return { success: false, error: "Facebook login failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError("");
    localStorage.removeItem("studymate_user");
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError("");

    try {
      // Simulate password reset email - replace with actual logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    } catch (err) {
      setError("Failed to send password reset email");
      return { success: false, error: "Failed to send password reset email" };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    forgotPassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Higher-order component for protected routes
export const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid #f2f2f2",
              borderTop: "4px solid #0061ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }

    if (!user) {
      // Redirect to login or show login form
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            padding: "32px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "16px",
              }}
            >
              Authentication Required
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#7f7f7f",
                marginBottom: "24px",
              }}
            >
              Please log in to access this page.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              style={{
                backgroundColor: "#0061ff",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0052d9")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#0061ff")}
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

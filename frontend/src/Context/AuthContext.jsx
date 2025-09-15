
  import React, { createContext, useContext, useState, useEffect } from "react";

  // ✅ Export AuthContext
  export const AuthContext = createContext();

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
      const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        // Fetch user profile from backend
        try {
          const res = await fetch("http://localhost:5000/api/users/profile", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) throw new Error("Unauthorized");
          const data = await res.json();
          setUser(data.data);
        } catch (err) {
          console.log("Profile fetch error:", err.message);
          setUser(null);
          localStorage.removeItem("token"); // remove invalid token
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }, []);

    // Login function
    const login = async (email, password) => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users/login", {
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
    const register = async (name, email, gender, date, password) => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, gender, date, password }),
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

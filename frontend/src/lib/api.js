import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000/api";

// Generic API request function
export const apiRequest = async ({ endpoint, method = "GET", body, token }) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Something went wrong");
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

// Auth helper functions
export const registerUser = async (userData) => {
  return await apiRequest({
    endpoint: "/auth/register",
    method: "POST",
    body: userData,
  });
};

export const loginUser = async (credentials) => {
  return await apiRequest({
    endpoint: "/auth/login",
    method: "POST",
    body: credentials,
  });
};

// Token helper (optional)
export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

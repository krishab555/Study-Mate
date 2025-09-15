// utils/api.js
export const getToken = () => localStorage.getItem("token");
export const apiRequest = async ({ endpoint, method = "GET", body }) => {
  try {
    const token = getToken(); 

    if (!token) {
      return { success: false, message: "You must be logged in" };
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`http://localhost:5000/api${endpoint}`, options);
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "API request failed",
        status: res.status,
      };
    }

    return data;
  } catch (err) {
    console.error("API request error:", err);
    return { success: false, message: "Something went wrong" };
  }
};

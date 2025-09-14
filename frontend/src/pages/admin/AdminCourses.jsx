import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, [token]);

  // Delete course
  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCourses((prev) => prev.filter((c) => c._id !== courseId));
        alert("Course deleted successfully");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "20px",
          paddingTop: "80px",
          marginLeft: "280px",
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <h2>Manage Courses</h2>
        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
        >
          <thead style={{ backgroundColor: "#1e3a8a", color: "white" }}>
            <tr>
              <th style={{ padding: "10px" }}>Course Name</th>
              <th style={{ padding: "10px" }}>Instructor</th>
              <th style={{ padding: "10px" }}>Price</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{course.title}</td>
                <td style={{ padding: "10px" }}>
                  {course.instructor?.name || "N/A"}
                </td>
                <td style={{ padding: "10px" }}>Rs. {course.price || "0.00"}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleDelete(course._id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

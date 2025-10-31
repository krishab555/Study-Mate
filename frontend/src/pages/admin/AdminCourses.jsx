import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const token = localStorage.getItem("token");

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setCourses(data.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, [token]);

  // Open modal
  const openEditModal = (course) => {
    setEditingCourse(course);
    setNewTitle(course.title);
    setNewPrice(course.price);
  };

  // Handle update
  const handleUpdate = async () => {
    const updatedData = {};
    if (newTitle) updatedData.title = newTitle;
    if (newPrice) updatedData.price = parseFloat(newPrice);

    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${editingCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await res.json();

      if (data.success) {
        alert("Course updated successfully");
        setCourses((prev) =>
          prev.map((c) =>
            c._id === editingCourse._id ? { ...c, ...updatedData } : c
          )
        );
        setEditingCourse(null); // Close modal
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Failed to update course", err);
    }
  };

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
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
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
                <td style={{ padding: "10px" }}>
                  Rs. {course.price || "0.00"}
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => openEditModal(course)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#1e3a8a",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#5f1b1bff",
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

      {/* ✅ Edit Modal */}
      {editingCourse && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3>Edit Course</h3>
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <label>Price</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <div style={{ textAlign: "right", marginTop: "15px" }}>
              <button
                onClick={() => setEditingCourse(null)}
                style={{
                  padding: "5px 10px",
                  marginRight: "10px",
                  border: "none",
                  backgroundColor: "#9ca3af",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  backgroundColor: "#1e3a8a",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

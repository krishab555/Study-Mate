import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import CreateInstructor from "./CreateInstructor";

export default function ManageUsers() {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data?.data) {
          setStudents(data.data.filter((u) => u.role.name === "Student"));
          setInstructors(data.data.filter((u) => u.role.name === "Instructor"));
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents((prev) => prev.filter((u) => u._id !== userId));
      setInstructors((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const renderActions = (user) => (
    <button
      onClick={() => handleDelete(user._id)}
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
  );

  const renderStudentTable = () => (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
      <thead style={{ backgroundColor: "#1e3a8a", color: "white" }}>
        <tr>
          <th style={{ padding: "10px" }}>User ID</th>
          <th style={{ padding: "10px" }}>Name</th>
          <th style={{ padding: "10px" }}>Email</th>
          <th style={{ padding: "10px" }}>Courses</th>
          <th style={{ padding: "10px" }}>Package</th>
          <th style={{ padding: "10px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((user) => (
          <tr key={user._id} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px" }}>{user._id}</td>
            <td style={{ padding: "10px" }}>{user.name}</td>
            <td style={{ padding: "10px" }}>{user.email}</td>
            <td style={{ padding: "10px" }}>
              {user.enrolledCourses?.map((c) => c.title).join(", ") || "None"}
            </td>
            <td style={{ padding: "10px" }}>{user.package || "Free"}</td>
            <td style={{ padding: "10px" }}>{renderActions(user)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderInstructorTable = () => (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
      <thead style={{ backgroundColor: "#1e3a8a", color: "white" }}>
        <tr>
          <th style={{ padding: "10px" }}>User ID</th>
          <th style={{ padding: "10px" }}>Name</th>
          <th style={{ padding: "10px" }}>Email</th>
          <th style={{ padding: "10px" }}>Courses</th>
          <th style={{ padding: "10px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {instructors.map((user) => (
          <tr key={user._id} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px" }}>{user._id}</td>
            <td style={{ padding: "10px" }}>{user.name}</td>
            <td style={{ padding: "10px" }}>{user.email}</td>
            <td style={{ padding: "10px" }}>
              {user.subjects?.join(", ") || "None"}
            </td>
            <td style={{ padding: "10px" }}>{renderActions(user)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
        <h2>Create Instructors</h2>

        {/* Button to open modal */}
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#1e3a8a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Instructor
        </button>

        {/* Modal */}
        {showCreateModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={() => setShowCreateModal(false)} // close when click outside
          >
            <div
              onClick={(e) => e.stopPropagation()} // prevent closing when click inside modal
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
                maxWidth: "90%",
              }}
            >
                <h3>Create Instructor</h3>
              <CreateInstructor
                onCreated={(newInstructor) => {
                  setInstructors((prev) => [...prev, newInstructor]);
                  setShowCreateModal(false);
                }}
              />
            </div>
          </div>
        )}
              
        
        <h2>Manage Students</h2>
        {renderStudentTable()}
        <h2>Manage Instructors</h2>
        {renderInstructorTable()}
      </main>
    </>
  );
}

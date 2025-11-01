import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import CreateInstructor from "./CreateInstructor";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
  if (showCreateModal) {
    document.body.style.overflow = "hidden"; 
  } else {
    document.body.style.overflow = "auto";   }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showCreateModal]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data?.data) {
          setUsers(data.data);
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
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const renderActions = (user) => (
    <div style={{ display: "flex", gap: "5px" }}>
      {/* <button
        style={{
          padding: "5px 10px",
          backgroundColor: "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => alert("Edit functionality not implemented yet")}
      >
        Edit
      </button> */}
      <button
        style={{
          padding: "5px 10px",
          backgroundColor: "#5f1b1bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => handleDelete(user._id)}
      >
        Delete
      </button>
    </div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Manage Users</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
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
        </div>

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
            onClick={() => setShowCreateModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
                maxWidth: "90%",
                maxHeight: "80vh",  
    overflowY: "auto",
              }}
            >
              <h3>Create Instructor</h3>
              <CreateInstructor
                onCreated={(newInstructor) => {
                  setUsers((prev) => [...prev, newInstructor]);
                  setShowCreateModal(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Users Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#1e3a8a", color: "white" }}>
            <tr>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Role</th>
              <th style={{ padding: "10px" }}>Courses</th>
              <th style={{ padding: "10px" }}>Package</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const roleText = user.role?.name || user.role || "N/A";

              // Courses handling: enrolledCourses first, then subjects
              const coursesText =
                user.enrolledCourses?.map((c) => c.title).join(", ") ||
                user.subjects?.join(", ") ||
                "None";

              return (
                <tr key={user._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{user.name}</td>
                  <td style={{ padding: "10px" }}>{user.email}</td>
                  <td style={{ padding: "10px" }}>{roleText}</td>
                  <td style={{ padding: "10px" }}>{coursesText} </td>
                  <td style={{ padding: "10px" }}>{user.package || "Free"}</td>
                  <td style={{ padding: "10px" }}>{renderActions(user)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

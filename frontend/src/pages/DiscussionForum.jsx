import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";

export default function DiscussionForum() {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("latest");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch discussions whenever filter changes
  useEffect(() => {
    fetchDiscussions();
  }, [filter]);

  // Fetch all courses for dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        if (data.success) setCourses(data.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const courseQuery = selectedCourse ? `&courseId=${selectedCourse}` : "";
      const res = await fetch(
        `http://localhost:5000/api/discussions?filter=${filter}${courseQuery}`
      );
      const data = await res.json();
      if (data.success) setDiscussions(data.data);
    } catch (err) {
      console.error("Error fetching discussions:", err);
    }
  };

  const handleSubmit = async () => {
    if (!newTitle || !newContent) return alert("Title and content are required");

    try {
      const res = await fetch("http://localhost:5000/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          courseId: selectedCourse || "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Discussion posted!");
        setNewTitle("");
        setNewContent("");
        setSelectedCourse("");
        fetchDiscussions();
      } else {
        alert(data.message || "Failed to post discussion");
      }
    } catch (err) {
      console.error(err);
      alert("Error posting discussion");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/discussions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchDiscussions();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handlePin = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/discussions/${id}/pin`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchDiscussions();
    } catch (err) {
      console.error("Pin failed:", err);
    }
  };

  const handleReply = (id) => {
    alert(`Replying to discussion ${id}...`);
    // Open modal or redirect to reply form
  };

  const containerStyle = {
    marginLeft: "280px",
    marginTop: "60px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const filterBtnStyle = (active) => ({
    padding: "8px 16px",
    margin: "0 8px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: active ? "#007bff" : "#f0f0f0",
    color: active ? "#fff" : "#333",
  });

  const discussionCardStyle = {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "15px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "8px 16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={containerStyle}>
          <h2>Discussion Forum</h2>

          {/* New Discussion Form */}
          {user && (
            <div style={{ marginBottom: "20px", padding: "15px", background: "#f1f1f1", borderRadius: "8px" }}>
              <h3>Start a New Discussion</h3>
              <input
                style={inputStyle}
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                style={inputStyle}
                placeholder="Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <select
                style={inputStyle}
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">General</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <button style={buttonStyle} onClick={handleSubmit}>
                Post Discussion
              </button>
            </div>
          )}

          {/* Filter Buttons */}
          <div style={{ marginBottom: "20px" }}>
            <button style={filterBtnStyle(filter === "latest")} onClick={() => setFilter("latest")}>
              Latest
            </button>
            <button style={filterBtnStyle(filter === "unanswered")} onClick={() => setFilter("unanswered")}>
              Unanswered
            </button>
            <button style={filterBtnStyle(filter === "popular")} onClick={() => setFilter("popular")}>
              Popular
            </button>
          </div>

          {/* Discussions List */}
          {discussions.length === 0 ? (
            <p>No discussions found</p>
          ) : (
            discussions.map((d) => (
              <div key={d._id} style={discussionCardStyle}>
                <h3>{d.title}</h3>
                <p>{d.details[0]?.content}</p>
                <small>Course: {d.course?.title || "General"}</small>
                <br />
                <small>By: {ddetails[0]?.user?.name}</small>

                <div style={{ marginTop: "10px" }}>
                  {user?.role === "User" && (
                    <button style={buttonStyle} onClick={() => handleReply(d._id)}>Reply</button>
                  )}

                  {user?.role === "Instructor" && (
                    <>
                      <button style={buttonStyle} onClick={() => handleReply(d._id)}>Reply</button>
                      <button style={buttonStyle} onClick={() => handlePin(d._id)}>Pin</button>
                    </>
                  )}

                  {user?.role === "Admin" && (
                    <>
                      <button style={buttonStyle} onClick={() => handleReply(d._id)}>Reply</button>
                      <button style={buttonStyle} onClick={() => handleDelete(d._id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

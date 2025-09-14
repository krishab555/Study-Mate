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
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [replyText, setReplyText] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Fetch discussions whenever filter changes
  useEffect(() => {
    fetchDiscussions();
  }, [filter, selectedCourse]);

  // Fetch all courses for dropdown
   useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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
        `http://localhost:5000/api/discussions?filter=${filter}${courseQuery}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
          Authorization: `Bearer ${token}`,
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
        headers: { Authorization: `Bearer ${token}`
       },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDiscussions();
    } catch (err) {
      console.error("Pin failed:", err);
    }
  };

  const handleReply = async(discussionId) => {
   
    if (!replyText[discussionId]) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/discussions/${discussionId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: replyText[discussionId] }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setReplyText((prev) => ({ ...prev, [discussionId]: "" }));
        fetchDiscussions();
      } else {
         alert(data.message || "Failed to reply");
      }
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };
  const groupedByCourse = discussions.reduce((acc, d) => {
    const courseName = d.course?.title || "General";
    if (!acc[courseName]) acc[courseName] = [];
    acc[courseName].push(d);
    return acc;
  }, {});
  

  const containerStyle = {
    marginLeft: "280px",
    marginTop: "60px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth:"900px",
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

  const accordionHeader = {
    background: "#f5f5f5",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
  };
  const discussionCardStyle = {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "15px",
  };

  const replyBox = {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
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
    marginRight:"8px",
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

           {/* Grouped Discussions */}
          {Object.keys(groupedByCourse).length === 0 ? (
            <p>No discussions found</p>
          ) : (
            Object.entries(groupedByCourse).map(
              ([courseName, courseDiscussions]) => (
                <div key={courseName}>
                  <div
                    style={accordionHeader}
                    onClick={() =>
                      setExpandedCourse(
                        expandedCourse === courseName ? null : courseName
                      )
                    }
                  >
                    {courseName}
                  </div>

                  {expandedCourse === courseName &&
                    courseDiscussions.map((d) => (
                      <div key={d._id} style={discussionCardStyle}>
                        <h3>{d.title}</h3>
                        <div style={{ marginBottom: "10px" }}>
                          {d.details?.map((detail, idx) => (
                            <div key={idx} style={{ marginBottom: "5px" }}>
                              <strong>{detail.user?.name}:</strong>{" "}
                              {detail.content}
                            </div>
                          ))}
                        </div>
                        <small>Course: {d.course?.title || "General"}</small>
                        <br />
                        <small>By: {d.details[0]?.user?.name}</small>

                        {/* Actions */}
                        <div style={{ marginTop: "10px" }}>
                          {(user?.role === "Student" ||
                            user?.role === "Instructor" ||
                            user?.role === "Admin") && (
                            <div style={replyBox}>
                              <textarea
                                style={inputStyle}
                                placeholder="Write a reply..."
                                value={replyText[d._id] || ""}
                                onChange={(e) =>
                                  setReplyText((prev) => ({
                                    ...prev,
                                    [d._id]: e.target.value,
                                  }))
                                }
                              />
                              <button
                                style={buttonStyle}
                                onClick={() => handleReply(d._id)}
                              >
                                Submit Reply
                              </button>
                            </div>
                          )}

                          {user?.role === "Instructor" && (
                            <button
                              style={buttonStyle}
                              onClick={() => handlePin(d._id)}
                            >
                              Pin
                            </button>
                          )}

                          {user?.role === "Admin" && (
                            <button
                              style={buttonStyle}
                              onClick={() => handleDelete(d._id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
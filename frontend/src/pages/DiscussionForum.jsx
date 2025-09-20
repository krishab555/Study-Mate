import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";
import DiscussionModal from "../components/common/DiscussionModel";
import "../pages/DisscussionForum.css";
import Footer from "../components/common/Footer";

export default function DiscussionForum() {
  const [showModal, setShowModal] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("latest");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentText, setCommentText] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDiscussions();
  }, [filter, selectedCourse]);

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
        `http://localhost:5000/api/discussions?filter=${filter}${courseQuery}`,
        {
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
    if (!newTitle || !newContent)
      return alert("Title and content are required");
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
        setNewTitle("");
        setNewContent("");
        setSelectedCourse("");
        fetchDiscussions();
      } else alert(data.message || "Failed to post discussion");
    } catch (err) {
      console.error(err);
      alert("Error posting discussion");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/discussions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDiscussions();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handlePin = async (id) => {
    const post = discussions.find((d) => d._id === id);
    if (!post) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/discussions/${post._id}/pin`,
        {
          method: "PATCH",
          headers: {
            "Access-Control-Allow-Methods": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        // Update frontend immediately
        setDiscussions((prev) =>
          prev.map((d) =>
            d._id === post._id ? { ...d, pinned: !post.pinned } : d
          )
        );
      } else {
        alert(data.message || "Failed to pin discussion");
      }
    } catch (err) {
      console.error("Pin failed:", err);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/discussions/${postId}/reply`,
        {
          method: "POST",
          headers: {
            
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: commentText[postId] }),
        }
      );
      const data = await res.json();
      if (data.success) setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchDiscussions();
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const groupedByCourse = discussions.reduce((acc, d) => {
    const courseName = d.course?.title || "General";
    if (!acc[courseName]) acc[courseName] = [];
    acc[courseName].push(d);
    return acc;
  }, {});

  const handlePost = async (title, description, courseId) => {
    if (!title || !description || !courseId) {
      return alert("Title, content, and course are required");
    }
    try {
      const res = await fetch("http://localhost:5000/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content: description,
          courseId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDiscussions();
        setShowModal(false);
        
      } else {
        alert(data.message || "Failed to post discussion");
      }
    } catch (err) {
      console.error("Error posting discussion:", err);
    }
  };

  return (
    <div className="discussion-forum-page">
      <Navbar />
      <div className="discussion-container">
        <SideBar />
        <div className="discussion-content">
          {/* Modified header section */}
          <div className="discussion-header">
            <h2 className="discussion-title">Discussion Forum</h2>
            <button
              className="new-discussion-btn"
              onClick={() => setShowModal(true)}
            >
              New Discussion
            </button>
          </div>

          {/* Inject Modal */}
          <DiscussionModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onPost={handlePost}
            courses={courses}
          />

          {/* Filter Buttons */}
          <div className="filter-container">
            <button
              className={`filter-btn ${filter === "latest" ? "active" : ""}`}
              onClick={() => setFilter("latest")}
            >
              Latest
            </button>
            <button
              className={`filter-btn ${filter === "popular" ? "active" : ""}`}
              onClick={() => setFilter("popular")}
            >
              Popular
            </button>
          </div>

          {/* Grouped Discussions */}
          {Object.keys(groupedByCourse).length === 0 ? (
            <div className="no-discussions">
              <p>No discussions found</p>
            </div>
          ) : (
            <div className="discussions-container">
              {Object.entries(groupedByCourse).map(
                ([courseName, courseDiscussions]) => (
                  <div key={courseName} className="course-discussion-section">
                    <div
                      className="course-header"
                      onClick={() =>
                        setExpandedCourse(
                          expandedCourse === courseName ? null : courseName
                        )
                      }
                    >
                      <span className="course-name">{courseName}</span>
                      <span className="course-toggle">
                        {expandedCourse === courseName ? "▲" : "▼"}
                      </span>
                    </div>

                    {expandedCourse === courseName &&
                      courseDiscussions.map((post) => (
                        <div key={post._id} className="discussion-card">
                          {/* User Info */}
                          <div className="post-header">
                            <div className="user-avatar">
                              {post.details[0]?.user?.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div className="user-info">
                              <div className="user-name">
                                {post.details[0]?.user?.name}
                              </div>
                              <div className="post-title">{post.title}</div>
                            </div>
                            {post.pinned && (
                              <span className="pinned-badge">📌 Pinned</span>
                            )}
                          </div>

                          {/* Post Content */}
                          <p className="post-content">
                            {post.details[0]?.content}
                          </p>

                          {/* Actions */}
                          <div className="post-actions">
                            {role === "Instructor" && (
                              <button
                                className="action-btn pin-btn"
                                onClick={() => handlePin(post._id)}
                                title={
                                  post.pinned
                                    ? "Unpin this post"
                                    : "Pin this post"
                                }
                              >
                                📌
                              </button>
                            )}
                            <button
                              className="action-btn comment-btn"
                              onClick={() =>
                                setExpandedPost(
                                  expandedPost === post._id ? null : post._id
                                )
                              }
                            >
                              💬 Comment
                            </button>
                            {role === "Admin" && (
                              <button
                                className="action-btn delete-btn"
                                onClick={() => handleDelete(post._id)}
                                title="Delete this post"
                              >
                                🗑 Delete
                              </button>
                            )}
                          </div>

                          {/* Comments */}
                          {expandedPost === post._id && (
                            <div className="comments-section">
                              <div className="comment-input-container">
                                <textarea
                                  className="comment-textarea"
                                  placeholder="Write a comment..."
                                  value={commentText[post._id] || ""}
                                  onChange={(e) =>
                                    setCommentText((prev) => ({
                                      ...prev,
                                      [post._id]: e.target.value,
                                    }))
                                  }
                                />
                                <button
                                  className="comment-submit-btn"
                                  onClick={() => handleComment(post._id)}
                                >
                                  Submit
                                </button>
                              </div>

                              <div className="comments-list">
                                {post.details?.slice(1).map((c) => (
                                  <div key={c._id} className="comment-item">
                                    <div className="comment-avatar">
                                      {c.user?.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="comment-content">
                                      <div className="comment-author">
                                        {c.user?.name}
                                      </div>
                                      <div className="comment-text">
                                        {c.content}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      {/* <Footer/> */}
    </div>

  );
}

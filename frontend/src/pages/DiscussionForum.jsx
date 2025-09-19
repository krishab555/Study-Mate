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
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentText, setCommentText] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

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

  return (
    <div className="discussion-forum-page">
      {/* Inject CSS directly */}
      <style>{`
        .discussion-forum-page { background-color: #f5f7f9; min-height: 100vh; }
        .discussion-container { display: flex; padding-top: 60px; }
        .discussion-content { margin-left: 280px; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 900px; width: 100%; }
        .discussion-title { color: #2c3e50; margin-bottom: 24px; font-weight: 600; }
        .new-discussion-card { background: white; margin-bottom: 24px; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
        .new-discussion-title { margin-bottom: 16px; color: #2c3e50; font-weight: 500; }
        .discussion-input, .discussion-textarea, .discussion-select { width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 8px; border: 1px solid #ddd; font-family: inherit; transition: border-color 0.2s; }
        .discussion-input:focus, .discussion-textarea:focus, .discussion-select:focus { outline: none; border-color: #3498db; box-shadow: 0 0 0 2px rgba(52,152,219,0.2); }
        .discussion-textarea { min-height: 100px; resize: vertical; }
        .post-button { padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: background 0.2s; }
        .post-button:hover { background: #2980b9; }
        .filter-container { margin-bottom: 20px; display: flex; gap: 12px; }
        .filter-btn { padding: 8px 16px; border-radius: 20px; border: 1px solid #ddd; background: white; cursor: pointer; font-weight: 500; transition: all 0.2s; }
        .filter-btn.active { background: #3498db; color: white; border-color: #3498db; }
        .filter-btn:hover:not(.active) { background: #f8f9fa; }
        .course-discussion-section { margin-bottom: 24px; }
        .course-header { background: white; padding: 12px 16px; cursor: pointer; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,0.05); transition: background 0.2s; }
        .course-header:hover { background: #f8f9fa; }
        .course-name { font-weight: 600; color: #2c3e50; }
        .course-toggle { color: #7f8c8d; }
        .discussion-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 16px; transition: transform 0.2s, box-shadow 0.2s; }
        .discussion-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateY(-1px); }
        .post-header { display: flex; align-items: flex-start; margin-bottom: 12px; gap: 12px; }
        .user-avatar { width: 40px; height: 40px; border-radius: 50%; background: #3498db; display: flex; justify-content: center; align-items: center; color: white; font-weight: 600; flex-shrink: 0; }
        .user-info { flex-grow: 1; }
        .user-name { font-weight: 600; color: #2c3e50; }
        .post-title { font-size: 16px; color: #34495e; margin-top: 4px; }
        .pinned-badge { background: #ffeaa7; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #d35400; align-self: flex-start; }
        .post-content { font-size: 16px; line-height: 1.5; color: #2c3e50; margin-bottom: 16px; }
        .post-actions { display: flex; gap: 8px; margin-top: 12px; }
        .action-btn { padding: 6px 12px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px; transition: background 0.2s; }
        .pin-btn { background: #f8f9fa; }
        .pin-btn:hover { background: #e9ecef; }
        .comment-btn { background: #e8f4fd; color: #3498db; }
        .comment-btn:hover { background: #d1ebff; }
        .delete-btn { background: #ffeaea; color: #e74c3c; }
        .delete-btn:hover { background: #ffd5d5; }
        .comments-section { margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee; }
        .comment-input-container { display: flex; gap: 8px; margin-bottom: 16px; }
        .comment-textarea { flex-grow: 1; padding: 10px; border-radius: 8px; border: 1px solid #ddd; resize: vertical; min-height: 60px; font-family: inherit; }
        .comment-submit-btn { padding: 10px 16px; background: #3498db; color: white; border: none; border-radius: 8px; cursor: pointer; align-self: flex-start; }
        .comment-submit-btn:hover { background: #2980b9; }
        .comments-list { display: flex; flex-direction: column; gap: 12px; }
        .comment-item { display: flex; gap: 10px; }
        .comment-avatar { width: 32px; height: 32px; border-radius: 50%; background: #95a5a6; display: flex; justify-content: center; align-items: center; color: white; font-size: 12px; font-weight: 600; flex-shrink: 0; }
        .comment-content { background: #f8f9fa; padding: 10px 12px; border-radius: 8px; flex-grow: 1; }
        .comment-author { font-weight: 600; font-size: 14px; color: #2c3e50; margin-bottom: 4px; }
        .comment-text { font-size: 14px; color: #34495e; line-height: 1.4; }
        .no-discussions { text-align: center; padding: 40px; background: white; border-radius: 12px; color: #7f8c8d; }
        @media (max-width: 1024px) { .discussion-content { margin-left: 0; padding: 20px 16px; } }
        @media (max-width: 768px) { .post-header { flex-direction: column; } .comment-input-container { flex-direction: column; } .comment-submit-btn { align-self: flex-end; } }
      `}</style>

      <Navbar />
      <div className="discussion-container">
        <SideBar />
        <div className="discussion-content">
          <h2 className="discussion-title">Discussion Forum</h2>

          {/* Post Box */}
          {user && (
            <div className="new-discussion-card">
              <h3 className="new-discussion-title">Start a New Discussion</h3>
              <input
                className="discussion-input"
                type="text"
                placeholder="Question / Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="discussion-textarea"
                placeholder="Write your question or details..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <select
                className="discussion-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course (or General)</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <button className="post-button" onClick={handleSubmit}>
                Post
              </button>
            </div>
          )}

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
                            {post.isPinned && (
                              <span className="pinned-badge">📌 Pinned</span>
                            )}
                          </div>

                          {/* Post Content */}
                          <p className="post-content">
                            {post.details[0]?.content}
                          </p>

                          {/* Actions */}
                          <div className="post-actions">
                            {user?.role === "Instructor" && (
                              <button
                                className="action-btn pin-btn"
                                onClick={() => handlePin(post._id)}
                                title="Pin this post"
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
                            {user?.role === "Admin" && (
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
    </div>
  );
}

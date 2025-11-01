import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";
import DiscussionModal from "../components/common/DiscussionModel";
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
      if (data.success) {
        let list = data.data;

        if (filter === "popular") {
          list = list.filter((d) => d.pinned);
        }

        setDiscussions(list);
      }
    } catch (err) {
      console.error("Error fetching discussions:", err);
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

  // Inline styles
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "'Inter', sans-serif",
    },
    discussionContainer: {
      display: "flex",
      minHeight: "calc(100vh - 80px)",
      paddingTop: "80px", // Added padding to prevent navbar overlap
    },
    content: {
      flex: 1,
      padding: "24px",
      marginLeft: "250px",
      maxWidth: "calc(100% - 250px)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1e293b",
      margin: 0,
    },
    newDiscussionBtn: {
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "12px 20px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
      transition: "all 0.2s ease",
    },
    filterContainer: {
      display: "flex",
      gap: "12px",
      marginBottom: "24px",
    },
    filterBtn: {
      padding: "8px 16px",
      borderRadius: "6px",
      border: "1px solid #e2e8f0",
      backgroundColor: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
    activeFilter: {
      backgroundColor: "#4f46e5",
      color: "white",
      borderColor: "#4f46e5",
    },
    courseSection: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
      overflow: "hidden",
    },
    courseHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      backgroundColor: "#f1f5f9",
      cursor: "pointer",
      borderBottom: "1px solid #e2e8f0",
    },
    courseName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      margin: 0,
    },
    courseToggle: {
      fontSize: "14px",
      color: "#64748b",
    },
    discussionCard: {
      padding: "20px",
      borderBottom: "1px solid #f1f5f9",
      backgroundColor: "white",
    },
    postHeader: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "12px",
    },
    userAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#4f46e5",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "16px",
      marginRight: "12px",
      flexShrink: 0,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 4px 0",
    },
    postTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 8px 0",
    },
    pinnedBadge: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
    },
    postContent: {
      fontSize: "16px",
      color: "#475569",
      lineHeight: "1.6",
      margin: "0 0 16px 0",
    },
    postActions: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
    },
    actionBtn: {
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid #e2e8f0",
      backgroundColor: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.2s ease",
    },
    pinBtn: {
      backgroundColor: "#fef3c7",
      borderColor: "#fef3c7",
      color: "#92400e",
    },
    commentBtn: {
      backgroundColor: "#eff6ff",
      borderColor: "#eff6ff",
      color: "#1e40af",
    },
    deleteBtn: {
      backgroundColor: "#fee2e2",
      borderColor: "#fee2e2",
      color: "#b91c1c",
    },
    commentsSection: {
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: "1px solid #f1f5f9",
    },
    commentInputContainer: {
      display: "flex",
      gap: "12px",
      marginBottom: "16px",
    },
    commentTextarea: {
      flex: 1,
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      fontSize: "14px",
      resize: "vertical",
      minHeight: "80px",
    },
    commentSubmitBtn: {
      padding: "12px 16px",
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      alignSelf: "flex-start",
    },
    commentsList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    commentItem: {
      display: "flex",
      gap: "12px",
    },
    commentAvatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#94a3b8",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "14px",
      flexShrink: 0,
    },
    commentContent: {
      flex: 1,
      backgroundColor: "#f8fafc",
      padding: "12px",
      borderRadius: "8px",
    },
    commentAuthor: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 4px 0",
    },
    commentText: {
      fontSize: "14px",
      color: "#475569",
      margin: 0,
      lineHeight: "1.5",
    },
    noDiscussions: {
      textAlign: "center",
      padding: "40px",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.discussionContainer}>
        <SideBar />
        <div style={styles.content}>
          {/* Header section */}
          <div style={styles.header}>
            <h2 style={styles.title}>Discussion Forum</h2>
            <button
              style={styles.newDiscussionBtn}
              onClick={() => setShowModal(true)}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#4338ca";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#4f46e5";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <span>+</span> New Discussion
            </button>
          </div>

          {/* Modal */}
          <DiscussionModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onPost={handlePost}
            courses={courses}
          />

          {/* Filter Buttons */}
          <div style={styles.filterContainer}>
            <button
              style={{
                ...styles.filterBtn,
                ...(filter === "latest" ? styles.activeFilter : {}),
              }}
              onClick={() => setFilter("latest")}
            >
              Latest
            </button>
            <button
              style={{
                ...styles.filterBtn,
                ...(filter === "popular" ? styles.activeFilter : {}),
              }}
              onClick={() => setFilter("popular")}
            >
              Popular
            </button>
          </div>

          {/* Grouped Discussions */}
          {Object.keys(groupedByCourse).length === 0 ? (
            <div style={styles.noDiscussions}>
              <p>No discussions found. Start a new discussion!</p>
            </div>
          ) : (
            <div>
              {Object.entries(groupedByCourse).map(
                ([courseName, courseDiscussions]) => (
                  <div key={courseName} style={styles.courseSection}>
                    <div
                      style={styles.courseHeader}
                      onClick={() =>
                        setExpandedCourse(
                          expandedCourse === courseName ? null : courseName
                        )
                      }
                    >
                      <h3 style={styles.courseName}>{courseName}</h3>
                      <span style={styles.courseToggle}>
                        {expandedCourse === courseName ? "▲" : "▼"}
                      </span>
                    </div>

                    {expandedCourse === courseName &&
                      courseDiscussions.map((post) => (
                        <div key={post._id} style={styles.discussionCard}>
                          {/* User Info */}
                          <div style={styles.postHeader}>
                            <div style={styles.userAvatar}>
                              {post.details[0]?.user?.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div style={styles.userInfo}>
                              <div style={styles.userName}>
                                {post.details[0]?.user?.name}
                              </div>
                              <div style={styles.postTitle}>{post.title}</div>
                            </div>
                            {post.pinned && (
                              <span style={styles.pinnedBadge}> Pinned</span>
                            )}
                          </div>

                          {/* Post Content */}
                          <p style={styles.postContent}>
                            {post.details[0]?.content}
                          </p>

                          {/* Actions */}
                          <div style={styles.postActions}>
                            {role === "Instructor" && (
                              <button
                                style={{
                                  ...styles.actionBtn,
                                  ...styles.pinBtn,
                                }}
                                onClick={() => handlePin(post._id)}
                                title={
                                  post.pinned
                                    ? "Unpin this post"
                                    : "Pin this post"
                                }
                              >
                                📌 {post.pinned ? "Unpin" : "Pin"}
                              </button>
                            )}
                            <button
                              style={{
                                ...styles.actionBtn,
                                ...styles.commentBtn,
                              }}
                              onClick={() =>
                                setExpandedPost(
                                  expandedPost === post._id ? null : post._id
                                )
                              }
                            >
                               Comment
                            </button>
                            {role === "Admin" && (
                              <button
                                style={{
                                  ...styles.actionBtn,
                                  ...styles.deleteBtn,
                                }}
                                onClick={() => handleDelete(post._id)}
                                title="Delete this post"
                              >
                                 Delete
                              </button>
                            )}
                          </div>

                          {/* Comments */}
                          {expandedPost === post._id && (
                            <div style={styles.commentsSection}>
                              <div style={styles.commentInputContainer}>
                                <textarea
                                  style={styles.commentTextarea}
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
                                  style={styles.commentSubmitBtn}
                                  onClick={() => handleComment(post._id)}
                                >
                                  Submit
                                </button>
                              </div>

                              <div style={styles.commentsList}>
                                {post.details?.slice(1).map((c) => (
                                  <div key={c._id} style={styles.commentItem}>
                                    <div style={styles.commentAvatar}>
                                      {c.user?.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div style={styles.commentContent}>
                                      <div style={styles.commentAuthor}>
                                        {c.user?.name}
                                      </div>
                                      <div style={styles.commentText}>
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
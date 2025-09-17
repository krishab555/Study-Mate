// import React, { useEffect, useState } from "react";
// import Navbar from "../components/common/Navbar";
// import SideBar from "../components/common/SideBar";

// export default function DiscussionForum() {
//   const [discussions, setDiscussions] = useState([]);
//   const [filter, setFilter] = useState("latest");
//   const [newTitle, setNewTitle] = useState("");
//   const [newContent, setNewContent] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [expandedCourse, setExpandedCourse] = useState(null);
//   const [expandedPost, setExpandedPost] = useState(null);
//   const [commentText, setCommentText] = useState({});
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => { fetchDiscussions(); }, [filter, selectedCourse]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/courses", {
//           headers: { 
//             "Content-Type": "application/json", 
//             Authorization: `Bearer ${token}` 
//           } 
//         });
//         const data = await res.json();
//         if (data.success) setCourses(data.data);
//       } catch (err) {
//         console.error("Failed to fetch courses", err);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const fetchDiscussions = async () => {
//     try {
//       const courseQuery = selectedCourse ? `&courseId=${selectedCourse}` : "";
//       const res = await fetch(
//         `http://localhost:5000/api/discussions?filter=${filter}${courseQuery}`,
//         { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();
//       if (data.success) setDiscussions(data.data);
//     } catch (err) {
//       console.error("Error fetching discussions:", err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!newTitle || !newContent) return alert("Title and content are required");
//     try {
//       const res = await fetch("http://localhost:5000/api/discussions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ title: newTitle, content: newContent, courseId: selectedCourse || "" }),
//       });
//       const data = await res.json();
//       if (data.success) { 
//         setNewTitle(""); 
//         setNewContent(""); 
//         setSelectedCourse(""); 
//         fetchDiscussions(); 
//       } else alert(data.message || "Failed to post discussion");
//     } catch (err) { console.error(err); alert("Error posting discussion"); }
//   };

//   const handleDelete = async (id) => {
//     try { 
//       await fetch(`http://localhost:5000/api/discussions/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); 
//       fetchDiscussions(); 
//     } catch (err) { console.error("Delete failed:", err); }
//   };

//   const handlePin = async (id) => {
//     try { 
//       await fetch(`http://localhost:5000/api/discussions/${id}/pin`, { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }); 
//       fetchDiscussions(); 
//     } catch (err) { console.error("Pin failed:", err); }
//   };

//   const handleComment = async (postId) => {
//     if (!commentText[postId]) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/discussions/${postId}/reply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ content: commentText[postId] }),
//       });
//       const data = await res.json();
//       if (data.success) setCommentText((prev) => ({ ...prev, [postId]: "" }));
//       fetchDiscussions();
//     } catch (err) { console.error("Comment failed:", err); }
//   };

//   const groupedByCourse = discussions.reduce((acc, d) => {
//     const courseName = d.course?.title || "General";
//     if (!acc[courseName]) acc[courseName] = [];
//     acc[courseName].push(d);
//     return acc;
//   }, {});

//   // --- Styles ---
//   const containerStyle = { marginLeft: "280px", marginTop: "60px", padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "900px" };
//   const filterBtnStyle = (active) => ({ padding: "8px 16px", margin: "0 8px", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: "bold", background: active ? "#007bff" : "#f0f0f0", color: active ? "#fff" : "#333" });
//   const accordionHeader = { background: "#f5f5f5", padding: "10px 15px", cursor: "pointer", borderRadius: "5px", marginBottom: "8px", display: "flex", justifyContent: "space-between" };
//   const discussionCardStyle = { background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "20px" };
//   const buttonStyle = { padding: "8px 14px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" };
//   const iconButtonStyle = { padding: "4px 6px", fontSize: "14px", cursor: "pointer", border: "none", borderRadius: "5px", background: "#007bff", color: "#fff" };
//   const inputStyle = { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" };
//   const avatarStyle = { width: "40px", height: "40px", borderRadius: "50%", background: "#007bff", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", marginRight: "10px" };

//   return (
//     <div>
//       <Navbar />
//       <div style={{ display: "flex" }}>
//         <SideBar />
//         <div style={containerStyle}>
//           <h2>Discussion Forum</h2>

//           {/* Post Box */}
//           {user && (
//             <div style={{ marginBottom: "20px", padding: "20px", background: "#f9f9f9", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
//               <h3 style={{ marginBottom: "10px" }}>Start a New Discussion</h3>
//               <input style={inputStyle} type="text" placeholder="Question / Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
//               <textarea style={{ ...inputStyle, minHeight: "80px" }} placeholder="Write your question or details..." value={newContent} onChange={(e) => setNewContent(e.target.value)} />
//               <select style={inputStyle} value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
//                 <option value="">Select Course (or General)</option>
//                 {courses.map(course => <option key={course._id} value={course._id}>{course.title}</option>)}
//               </select>
//               <button style={buttonStyle} onClick={handleSubmit}>Post</button>
//             </div>
//           )}

//           {/* Filter Buttons */}
//           <div style={{ marginBottom: "20px" }}>
//             <button style={filterBtnStyle(filter === "latest")} onClick={() => setFilter("latest")}>Latest</button>
//             <button style={filterBtnStyle(filter === "popular")} onClick={() => setFilter("popular")}>Popular</button>
//           </div>

//           {/* Grouped Discussions */}
//           {Object.keys(groupedByCourse).length === 0 ? <p>No discussions found</p> :
//             Object.entries(groupedByCourse).map(([courseName, courseDiscussions]) => (
//               <div key={courseName}>
//                 <div style={accordionHeader} onClick={() => setExpandedCourse(expandedCourse === courseName ? null : courseName)}>{courseName}</div>
                
//                 {expandedCourse === courseName && courseDiscussions.map(post => (
//                   <div key={post._id} style={discussionCardStyle}>
//                     {/* User Info */}
//                     <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//                       <div style={avatarStyle}>{post.details[0]?.user?.name.charAt(0).toUpperCase()}</div>
//                       <div>
//                         <strong>{post.details[0]?.user?.name}</strong>
//                         <div style={{ fontSize: "14px", color: "#555" }}>{post.title}</div>
//                       </div>
//                     </div>

//                     {/* Post Content */}
//                     <p style={{ fontSize: "16px" }}>{post.details[0]?.content}</p>

//                     {/* Actions */}
//                     <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
//                       {user?.role === "Instructor" && <button style={iconButtonStyle} onClick={() => handlePin(post._id)}>📌</button>}
//                       <button style={iconButtonStyle} onClick={() => setExpandedPost(expandedPost === post._id ? null : post._id)}>💬</button>
//                       {user?.role === "Admin" && <button style={iconButtonStyle} onClick={() => handleDelete(post._id)}>🗑</button>}
//                     </div>

//                     {/* Comments */}
//                     {expandedPost === post._id && (
//                       <div style={{ marginTop: "10px" }}>
//                         <textarea style={inputStyle} placeholder="Write a comment..." value={commentText[post._id] || ""} onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))} />
//                         <button style={buttonStyle} onClick={() => handleComment(post._id)}>Submit</button>

//                         <div style={{ marginTop: "10px" }}>
//                           {post.details?.map((c) => (
//                             <div key={c._id} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
//                               <strong>{c.user?.name}</strong>: {c.content}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   );
// }
// DiscussionForum.jsx
import React from 'react';

export default function DiscussionForum() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Academic Forum</h1>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search discussions..."
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>🔍</button>
        </div>
      </div>

      <div style={styles.content}>
        {/* First Discussion Card */}
        <div style={styles.discussionCard}>
          <div style={styles.discussionHeader}>
            <h2 style={styles.discussionTitle}>Lecture Rescheduling</h2>
            <div style={styles.discussionMeta}>
              <span style={styles.author}>Efficient May</span>
              <span style={styles.time}>01:00</span>
            </div>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.discussionBody}>
            <div style={styles.authorBadge}>
              <span style={styles.authorInitial}>H</span>
              <span style={styles.authorName}>Harness</span>
            </div>
            <p style={styles.discussionText}>
              So I talked with Dr Helena and because of her filter we need to{' '}
              <strong>reschedule upcoming Lectures.</strong> You probably notice
              that this lecture is the last before exam so Dr Helena asked us
              also if we want to attend for <strong>additional lecture</strong>{' '}
              where we can study more difficult exercise.
            </p>
          </div>

          <div style={styles.responseSection}>
            <button style={styles.responseButton}>➕ Add Response</button>
          </div>
        </div>

        {/* Second Discussion Card */}
        <div style={styles.discussionCard}>
          <div style={styles.discussionHeader}>
            <h2 style={styles.discussionTitle}>Date of the final exams</h2>
            <div style={styles.discussionMeta}>
              <span style={styles.author}>Dr Ronald Jackson</span>
              <div style={styles.tagContainer}>
                <span style={styles.tag}>Answering</span>
                <span style={styles.tag}>Composition</span>
              </div>
            </div>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.discussionBody}>
            <p style={styles.discussionText}>
              Dear Students, I want to inform you that after 6 months of our
              cooperation it is necessary to test your knowledge by the final
              exam...
            </p>
          </div>

          <div style={styles.responseSection}>
            <button style={styles.responseButton}>➕ Add Response</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f7f9",
    minHeight: "100vh",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  title: {
    color: "#2c3e50",
    margin: "0",
    fontSize: "28px",
    fontWeight: "600",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "5px 0 0 5px",
    width: "250px",
    fontSize: "14px",
  },
  searchButton: {
    padding: "10px 15px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  discussionCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  discussionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  discussionTitle: {
    color: "#2c3e50",
    margin: "0",
    fontSize: "20px",
    fontWeight: "600",
  },
  discussionMeta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  author: {
    color: "#7f8c8d",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "5px",
  },
  time: {
    color: "#95a5a6",
    fontSize: "12px",
  },
  tagContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "5px",
  },
  tag: {
    backgroundColor: "#e8f4fc",
    color: "#3498db",
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "500",
  },
  divider: {
    height: "1px",
    backgroundColor: "#ecf0f1",
    margin: "15px 0",
  },
  discussionBody: {
    marginBottom: "20px",
  },
  authorBadge: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  authorInitial: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#e74c3c",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    marginRight: "10px",
  },
  authorName: {
    fontWeight: "500",
    color: "#2c3e50",
  },
  discussionText: {
    color: "#34495e",
    lineHeight: "1.6",
    margin: "0",
    fontSize: "15px",
  },
  responseSection: {
    display: "flex",
    justifyContent: "flex-end",
  },
  responseButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

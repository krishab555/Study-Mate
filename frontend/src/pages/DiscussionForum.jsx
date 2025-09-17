import React, { useState } from "react";

const discussionsData = [
  {
    id: 1,
    title: "Lecture Rescheduling",
    author: "Efficient May",
    time: "01:00",
    badgeInitial: "H",
    badgeName: "Harness",
    text: `So I talked with Dr Helena and because of her filter we need to reschedule upcoming Lectures. You probably notice that this lecture is the last before exam so Dr Helena asked us also if we want to attend for additional lecture where we can study more difficult exercise.`,
  },
  {
    id: 2,
    title: "Date of the final exams",
    author: "Dr Ronald Jackson",
    time: "",
    tags: ["Answering", "Composition"],
    text: `Dear Students, I want to inform you that after 6 months of our cooperation it is necessary to test your knowledge by the final exam. It means we need to find a date for our final exam. In this semester you were extremely under the needs she is OK? Or should this symbol like you to offer an extra attempt for this test, My proposition is...`,
  },
];

function DiscussionForum() {
  const [activeResponseId, setActiveResponseId] = useState(null);
  const [responses, setResponses] = useState({});
  const [inputValue, setInputValue] = useState("");

  const toggleResponseBox = (id) => {
    if (activeResponseId === id) {
      setActiveResponseId(null);
      setInputValue("");
    } else {
      setActiveResponseId(id);
      setInputValue("");
    }
  };

  const handleResponseChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleResponseSubmit = (id) => {
    if (!inputValue.trim()) return;

    setResponses((prev) => ({
      ...prev,
      [id]: prev[id] ? [...prev[id], inputValue.trim()] : [inputValue.trim()],
    }));
    setInputValue("");
    setActiveResponseId(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Discussion Forum</h1>
        {/* <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search discussions..."
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>🔍</button>
        </div> */}
      </div>

      <div style={styles.content}>
        {discussionsData.map((discussion) => (
          <div key={discussion.id} style={styles.discussionCard}>
            <div style={styles.discussionHeader}>
              <h2 style={styles.discussionTitle}>{discussion.title}</h2>
              <div style={styles.discussionMeta}>
                <span style={styles.author}>{discussion.author}</span>
                {discussion.time && (
                  <span style={styles.time}>{discussion.time}</span>
                )}
                {discussion.tags && (
                  <div style={styles.tagContainer}>
                    {discussion.tags.map((tag) => (
                      <span key={tag} style={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.discussionBody}>
              {discussion.badgeInitial && (
                <div style={styles.authorBadge}>
                  <span style={styles.authorInitial}>
                    {discussion.badgeInitial}
                  </span>
                  <span style={styles.authorName}>{discussion.badgeName}</span>
                </div>
              )}
              <p style={styles.discussionText}>{discussion.text}</p>

              {/* Show responses */}
              {responses[discussion.id] &&
                responses[discussion.id].length > 0 && (
                  <div style={{ marginTop: 15 }}>
                    <strong>Responses:</strong>
                    <ul>
                      {responses[discussion.id].map((resp, idx) => (
                        <li key={idx} style={{ marginTop: 5 }}>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div style={styles.responseSection}>
              <button
                style={styles.responseButton}
                onClick={() => toggleResponseBox(discussion.id)}
              >
                + Add Response
              </button>
            </div>

            {activeResponseId === discussion.id && (
              <div style={{ marginTop: 15 }}>
                <textarea
                  style={styles.responseTextarea}
                  rows={3}
                  placeholder="Write your response here..."
                  value={inputValue}
                  onChange={handleResponseChange}
                />
                <button
                  style={{ ...styles.responseButton, marginTop: 8 }}
                  onClick={() => handleResponseSubmit(discussion.id)}
                >
                  Submit Response
                </button>
              </div>
            )}
          </div>
        ))}
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
  responseTextarea: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
};

export default DiscussionForum;

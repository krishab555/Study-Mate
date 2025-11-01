// src/pages/admin/AdminContact.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { SidebarLayout } from "../../components/common/SideBar";

export default function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact/admin");
        const data = await res.json();
        if (res.ok) {
          setMessages(data.messages);
        } else {
          setError(data.message || "Failed to fetch messages.");
        }
      } catch (err) {
        console.error(err);
        setError("Network error — check backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const styles = {
    section: { padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" },
    heading: { fontSize: "2rem", fontWeight: 600, marginBottom: 20 },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    th: {
      textAlign: "left",
      padding: "12px",
      backgroundColor: "#0B2C5D",
      color: "white",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      verticalAlign: "top",
    },
    error: { color: "#b91c1c" },
    loading: { fontStyle: "italic" },
    noMessages: { textAlign: "center", padding: "20px" },
  };

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <section style={styles.section}>
          <h2 style={styles.heading}>Messages from Users</h2>
          {loading && <p style={styles.loading}>Loading messages...</p>}
          {error && <p style={styles.error}>{error}</p>}

          {!loading && !error && messages.length === 0 && (
            <p style={styles.noMessages}>No messages yet.</p>
          )}

          {!loading && !error && messages.length > 0 && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Message</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id}>
                    <td style={styles.td}>{msg.name}</td>
                    <td style={styles.td}>{msg.email}</td>
                    <td style={styles.td}>{msg.message}</td>
                    <td style={styles.td}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </SidebarLayout>
      
    </div>
  );
}

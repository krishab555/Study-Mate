import React, { useEffect, useState, useRef } from "react";
import { apiRequest } from "../utils/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Fetch notifications
  const loadNotifications = async () => {
    const res = await apiRequest({ endpoint: "/notifications", method: "GET" });
    if (res.success) setNotifications(res.data);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkRead = async (id) => {
    const res = await apiRequest({
      endpoint: `/notifications/${id}/read`,
      method: "PATCH",
    });
    if (res.success) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    }
  };

  // --- Inline styles ---
  const styles = {
    wrapper: { position: "relative", display: "inline-block" },
    bell: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      position: "relative",
    },
    count: {
      position: "absolute",
      top: -6,
      right: -6,
      backgroundColor: "#1d4ed8",
      color: "#fff",
      borderRadius: "50%",
      padding: "2px 6px",
      fontSize: 12,
      fontWeight: "bold",
    },
    dropdown: {
      position: "absolute",
      top: 36,
      right: 0,
      width: 320,
      maxHeight: 400,
      backgroundColor: "#fff",
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      padding: 12,
      overflowY: "auto",
      zIndex: 1000,
    },
    title: { fontWeight: 600, marginBottom: 10, color: "#333", fontSize: 18 },
    noNotifications: { color: "#777", fontSize: 14 },
    item: {
      padding: 10,
      marginBottom: 8,
      borderRadius: 6,
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    message: { margin: 0, marginBottom: 4, color: "#0a0a0aff", fontSize: 14 },
    time: { color: "#666", fontSize: 12 },
    unread: { backgroundColor: "#e0f0ff" },
    unreadHover: { backgroundColor: "#c2e0ff" },
    read: { backgroundColor: "#f0f0f0" },
    readHover: { backgroundColor: "#e0e0e0" },
  };

  return (
    <div ref={wrapperRef} style={styles.wrapper}>
      <button style={styles.bell} onClick={() => setOpen(!open)}>
        {" "}
        {notifications.filter((n) => !n.isRead).length > 0 && (
          <span style={styles.count}>
            {notifications.filter((n) => !n.isRead).length}
          </span>
        )}
      </button>

      {open && (
        <div style={styles.dropdown}>
          <h3 style={styles.title}>Notifications</h3>
          {notifications.length === 0 && (
            <p style={styles.noNotifications}>No notifications yet</p>
          )}
          {notifications.map((n) => (
            <div
              key={n._id}
              style={{
                ...styles.item,
                ...(n.isRead ? styles.read : styles.unread),
              }}
              onClick={() => handleMarkRead(n._id)}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = n.isRead
                  ? styles.readHover.backgroundColor
                  : styles.unreadHover.backgroundColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = n.isRead
                  ? styles.read.backgroundColor
                  : styles.unread.backgroundColor;
              }}
            >
              <p style={styles.message}>{n.message}</p>
              <small style={styles.time}>
                {new Date(n.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { apiRequest } from "../utils/api";

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);

//   // Fetch notifications
//   const loadNotifications = async () => {
//     const res = await apiRequest({ endpoint: "/notifications", method: "GET" });
//     if (res.success) setNotifications(res.data);
//   };

//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   // Mark as read
//   const handleMarkRead = async (id) => {
//     const res = await apiRequest({
//       endpoint: `/notifications/${id}/read`,
//       method: "PATCH",
//     });
//     if (res.success) {
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//       );
//     }
//   };

//   return (
//     <div className="notification-dropdown bg-white shadow-md rounded p-2 w-80">
//       <h3 className="font-semibold mb-2">Notifications</h3>
//       {notifications.length === 0 && <p>No notifications yet</p>}
//       {notifications.map((n) => (
//         <div
//           key={n._id}
//           className={`p-2 mb-1 rounded cursor-pointer ${
//             n.isRead ? "bg-gray-100" : "bg-blue-50"
//           }`}
//           onClick={() => handleMarkRead(n._id)}
//         >
//           <p style={color="black"}>{n.message}</p>
//           <small className="text-gray-500">
//             {new Date(n.createdAt).toLocaleString()}
//           </small>
//         </div>
//       ))}
//     </div>
//   );
// }

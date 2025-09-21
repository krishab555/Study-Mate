import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isBellHovered, setIsBellHovered] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setNotifications(data.data);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Bell Icon */}
      <div
        style={{
          cursor: "pointer",
          color: isBellHovered ? "#ffd700" : "white",
          display: "flex",
          alignItems: "center",
          transform: isBellHovered ? "scale(1.1)" : "scale(1)",
          transition: "all 0.2s ease",
          position: "relative",
        }}
        onMouseEnter={() => setIsBellHovered(true)}
        onMouseLeave={() => setIsBellHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={24} />

        {/* Badge for unread count */}
        {notifications.filter((n) => !n.isRead).length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              fontSize: "12px",
              padding: "2px 6px",
              borderRadius: "50%",
            }}
          >
            {notifications.filter((n) => !n.isRead).length}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "35px",
            right: 0,
            width: "300px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 999,
          }}
        >
          {notifications.length === 0 ? (
            <p style={{ padding: "10px", textAlign: "center" }}>
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  background: n.isRead ? "#f9f9f9" : "#e6f7ff",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  // mark as read
                  await fetch(
                    `http://localhost:5000/api/notifications/${n._id}/read`,
                    {
                      method: "PATCH",
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  fetchNotifications();
                }}
              >
                <p style={{ margin: 0, fontSize: "14px" }}>{n.message}</p>
                <small style={{ color: "gray" }}>
                  {new Date(n.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

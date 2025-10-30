import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications
  const loadNotifications = async () => {
    const res = await apiRequest({ endpoint: "/notifications", method: "GET" });
    if (res.success) setNotifications(res.data);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Mark as read
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

  return (
    <div className="notification-dropdown bg-white shadow-md rounded p-2 w-80">
      <h3 className="font-semibold mb-2">Notifications</h3>
      {notifications.length === 0 && <p>No notifications yet</p>}
      {notifications.map((n) => (
        <div
          key={n._id}
          className={`p-2 mb-1 rounded cursor-pointer ${
            n.isRead ? "bg-gray-100" : "bg-blue-50"
          }`}
          onClick={() => handleMarkRead(n._id)}
        >
          <p>{n.message}</p>
          <small className="text-gray-500">
            {new Date(n.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

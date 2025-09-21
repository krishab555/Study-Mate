import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell, X, Eye, EyeOff } from "lucide-react";
import NotificationBell from "./NotificationBell"; 
import SearchBar from "../SearchBar";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "/defaultProfile.jpg"
  );

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isBellHovered, setIsBellHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Scroll locking effect
  useEffect(() => {
    if (showProfilePopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showProfilePopup]);

  // Update profile image if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProfileImage(
        localStorage.getItem("profileImage") || "/defaultProfile.jpg"
      );
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleCustomEvent = () => {
      setProfileImage(
        localStorage.getItem("profileImage") || "/defaultProfile.jpg"
      );
    };
    window.addEventListener("profileImageUpdated", handleCustomEvent);
    return () =>
      window.removeEventListener("profileImageUpdated", handleCustomEvent);
  }, []);

  const hiddenPaths = ["/", "/dashboard"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  // Fetch profile data when popup is opened
  useEffect(() => {
    if (showProfilePopup) {
      const fetchProfile = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/users/profile", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const result = await res.json();
          if (result.success) {
            // Ensure role is properly displayed
            const profileWithRole = {
              ...result.data,
              displayRole: getRoleDisplayName(result.data.role),
            };
            setProfileData(profileWithRole);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [showProfilePopup, token]);

  // Helper function to get role display name
  const getRoleDisplayName = (roleData) => {
    if (!roleData) return "User";

    // If role is an object with name property
    if (typeof roleData === "object" && roleData.name) {
      return roleData.name;
    }

    // If role is a string that matches known roles
    if (typeof roleData === "string") {
      if (
        roleData === "admin" ||
        roleData === "student" ||
        roleData === "instructor"
      ) {
        return roleData.charAt(0).toUpperCase() + roleData.slice(1);
      }

      // If it's a long string (likely an ID), use the stored role
      if (roleData.length > 20) {
        return localStorage.getItem("role") || "User";
      }

      return roleData;
    }

    return "User";
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      setPasswordUpdateStatus({
        type: "error",
        message: "Please fill all fields",
      });
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${profileData._id}/update-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setPasswordUpdateStatus({
          type: "success",
          message: "Password updated successfully!",
        });
        setOldPassword("");
        setNewPassword("");
        setTimeout(() => {
          setShowChangePassword(false);
          setPasswordUpdateStatus(null);
        }, 2000);
      } else {
        setPasswordUpdateStatus({
          type: "error",
          message: data.message || "Failed to update password",
        });
      }
    } catch (error) {
      console.error(error);
      setPasswordUpdateStatus({
        type: "error",
        message: "Error updating password",
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({
        type: "error",
        message: "Please select an image first!",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/upload-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setUploadStatus({
          type: "success",
          message: "Profile image updated successfully!",
        });

        // Update the navbar profile image
        const imageUrl = data.user.image
          ? `http://localhost:5000${data.user.image}`
          : "/defaultProfile.jpg";
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);

        // Update profile data with proper role display
        const updatedProfile = {
          ...data.user,
          displayRole: getRoleDisplayName(data.user.role),
        };
        setProfileData(updatedProfile);

        setSelectedFile(null);

        setTimeout(() => {
          setUploadStatus(null);
        }, 2000);
      } else {
        setUploadStatus({
          type: "error",
          message: data.message || "Upload failed",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus({ type: "error", message: "Error uploading image" });
    }
  };

  const links = {
    student: [
      { label: "Home", path: "/student/home" },
      { label: "Contact", path: "/student/contact" },
    ],
    instructor: [
      { label: "Home", path: "/instructor/home" },
      { label: "Contact", path: "/instructor/contact" },
    ],
    admin: [
      { label: "Home", path: "/admin/home" },
      { label: "Contact", path: "/admin/contact" },
    ],
  };

  const roleLinks = links[role] || [];

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#0a2a66",
      color: "white",
      zIndex: 9999,
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 20px",
    },
    container: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      marginLeft: "-80px",
      marginTop: "13px",
    },
    logoImage: {
      width: "200px",
      height: "100px",
      objectFit: "contain",
    },
    navLinks: {
      display: "flex",
      gap: "30px",
      listStyle: "none",
      margin: 0,
      padding: 0,
      // Added margin to push links to the right
      marginLeft: "auto",
      marginRight: "30px",
    },
    navItem: {
      cursor: "pointer",
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
    navItemHover: {
      color: "#ffd700",
      transform: "scale(1.1)",
    },
    searchBar: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      marginRight: "15px",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    btn: {
      backgroundColor: "white",
      color: "#0a2a66",
      padding: "6px 14px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "all 0.2s ease",
    },
    btnHover: {
      backgroundColor: "#e0e0e0",
      transform: "scale(1.05)",
    },
    popupOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000,
    },
    popupContent: {
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "30px",
      maxWidth: "450px",
      width: "90%",
      maxHeight: "80vh",
      overflowY: "auto",
      position: "relative",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    },
    closeButton: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#0a2a66",
    },
    profileImageContainer: {
      position: "relative",
      width: "100px",
      height: "100px",
      margin: "0 auto 15px",
    },
    profileImage: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #0B2C5D",
    },
    editImageButton: {
      position: "absolute",
      bottom: "0",
      right: "0",
      backgroundColor: "#0B2C5D",
      color: "white",
      borderRadius: "4px",
      padding: "4px 8px",
      fontSize: "12px",
      cursor: "pointer",
      border: "none",
    },
    profileName: {
      textAlign: "center",
      color: "#0B2C5D",
      fontWeight: "bold",
      fontSize: "22px",
      marginBottom: "15px",
    },
    infoBox: {
      background: "#f5f6fa",
      borderRadius: "8px",
      padding: "12px 15px",
      marginBottom: "12px",
      textAlign: "left",
      fontSize: "14px",
      color: "#333",
    },
    changePasswordHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      background: "#f5f6fa",
      borderRadius: "8px",
      padding: "12px 15px",
      marginBottom: "12px",
      color: "#000",
      fontWeight: "bold",
    },
    passwordForm: {
      marginTop: "10px",
      textAlign: "left",
    },
    passwordInputContainer: {
      position: "relative",
      marginBottom: "10px",
    },
    passwordInput: {
      width: "100%",
      padding: "8px 40px 8px 8px",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "8px",
      cursor: "pointer",
      color: "#666",
    },
    updateButton: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#0B2C5D",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "14px",
      cursor: "pointer",
      marginTop: "10px",
    },
    statusMessage: {
      padding: "8px",
      borderRadius: "4px",
      marginTop: "10px",
      textAlign: "center",
      fontSize: "14px",
    },
    uploadSection: {
      marginTop: "10px",
      textAlign: "center",
    },
    uploadButton: {
      padding: "8px 15px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#0B2C5D",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "12px",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Left: Logo */}
        <div style={styles.logoContainer}>
          <Link to="/">
            <img
              src="/Design.png"
              alt="StudyMate Logo"
              style={styles.logoImage}
            />
          </Link>
        </div>

        {/* Middle: Links - Now aligned to the right */}
        <ul style={styles.navLinks}>
          {roleLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                style={{
                  ...styles.navItem,
                  ...(hoveredIndex === idx ? styles.navItemHover : {}),
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right section: search, notifications, profile, logout */}
        <div style={styles.userSection}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            style={styles.searchBar}
            onKeyDown={(e) => {
               if (e.key === "Enter") {
      e.preventDefault();
             const query = e.target.value.trim();
              if (query){ navigate(`/search?query=${encodeURIComponent(query)}`);
               }}
            }}
          />
          {/* <SearchBar/> */}

          
          <div style={{ marginLeft: "auto", marginRight: "20px" }}>
            <NotificationBell />
          </div>

          {/* Profile Image */}
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: isProfileHovered
                ? "2px solid #ffd700"
                : "2px solid white",
              cursor: "pointer",
              transform: isProfileHovered ? "scale(1.1)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            onClick={() => setShowProfilePopup(true)}
          />

          {/* Logout button */}
          <button
            style={{ ...styles.btn, ...(isBtnHovered ? styles.btnHover : {}) }}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Popup - Only closes when clicking the X button */}
      {showProfilePopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <button
              style={styles.closeButton}
              onClick={() => setShowProfilePopup(false)}
            >
              <X size={24} />
            </button>

            {profileData ? (
              <>
                <div style={styles.profileImageContainer}>
                  <img
                    src={
                      profileData.image
                        ? `http://localhost:5000${profileData.image}`
                        : "/defaultProfile.jpg"
                    }
                    alt="Profile"
                    style={styles.profileImage}
                  />
                  <div
                    style={styles.editImageButton}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Edit
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>

                {selectedFile && (
                  <div style={styles.uploadSection}>
                    <button style={styles.uploadButton} onClick={handleUpload}>
                      Upload Image
                    </button>
                  </div>
                )}

                {uploadStatus && (
                  <div
                    style={{
                      ...styles.statusMessage,
                      backgroundColor:
                        uploadStatus.type === "success" ? "#d4edda" : "#f8d7da",
                      color:
                        uploadStatus.type === "success" ? "#155724" : "#721c24",
                    }}
                  >
                    {uploadStatus.message}
                  </div>
                )}

                <h2 style={styles.profileName}>{profileData.name}</h2>

                <div style={styles.infoBox}>
                  <strong>Email:</strong> {profileData.email}
                </div>

                <div style={styles.infoBox}>
                  <strong>Role:</strong> {profileData.displayRole}
                </div>

                {/* Change Password Section */}
                <div
                  style={styles.changePasswordHeader}
                  onClick={() => setShowChangePassword(!showChangePassword)}
                >
                  <strong>Change Password</strong>
                  <span>{showChangePassword ? "^" : "∨"}</span>
                </div>

                {showChangePassword && (
                  <div style={styles.passwordForm}>
                    <div style={styles.passwordInputContainer}>
                      <input
                        type={showOldPassword ? "text" : "password"}
                        style={styles.passwordInput}
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <span
                        style={styles.eyeIcon}
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </span>
                    </div>

                    <div style={styles.passwordInputContainer}>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        style={styles.passwordInput}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <span
                        style={styles.eyeIcon}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </span>
                    </div>

                    <button
                      style={styles.updateButton}
                      onClick={handlePasswordChange}
                    >
                      Update Password
                    </button>

                    {passwordUpdateStatus && (
                      <div
                        style={{
                          ...styles.statusMessage,
                          backgroundColor:
                            passwordUpdateStatus.type === "success"
                              ? "#d4edda"
                              : "#f8d7da",
                          color:
                            passwordUpdateStatus.type === "success"
                              ? "#155724"
                              : "#721c24",
                        }}
                      >
                        {passwordUpdateStatus.message}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// import React, { useEffect, useState } from "react";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [showPasswordForm, setShowPasswordForm] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/users/profile", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const result = await res.json();
//         if (result.success) {
//           setProfile(result.data);
//         } else {
//           console.error(result.message);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleUpload = async () => {
//     if (!selectedFile) return alert("Please select an image first!");

//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//       const res = await fetch(
//         "http://localhost:5000/api/users/upload-profile",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         setProfile(data.user);
//       } else {
//         alert(data.message || "Upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handlePasswordChange = async () => {
//     if (!oldPassword || !newPassword) return alert("Please fill all fields");

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/users/${profile._id}/update-password`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ oldPassword, newPassword }),
//         }
//       );
//       const data = await res.json();
//       if (data.success) {
//         alert("Password updated successfully!");
//         setOldPassword("");
//         setNewPassword("");
//         setShowPasswordForm(false);
//       } else {
//         alert(data.message || "Failed to update password");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error updating password");
//     }
//   };

//   // Styles
//   const layoutStyle = {
//     display: "flex",
//     minHeight: "100vh",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f7f9fc",
//   };

//   const cardStyle = {
//     maxWidth: "400px",
//     width: "100%",
//     background: "#fff",
//     padding: "40px 30px 30px 30px",
//     borderRadius: "15px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     textAlign: "center",
//     position: "relative",
//   };

//   const welcomeTextContainer = {
//     textAlign: "left",
//     marginBottom: "20px",
//   };

//   const welcomeLine = {
//     color: "#0B2C5D",
//     fontSize: "18px",
//     fontWeight: "bold",
//     margin: 0,
//     lineHeight: "1.2",
//   };

//   const imageStyle = {
//     width: "120px",
//     height: "120px",
//     borderRadius: "50%",
//     objectFit: "cover",
//     marginBottom: "15px",
//     border: "3px solid #0B2C5D",
//     position: "relative",
//   };

//   const editBadgeStyle = {
//     position: "absolute",
//     top: "105px",
//     left: "calc(50% + 25px)",
//     backgroundColor: "#0B2C5D",
//     color: "#fff",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     fontSize: "12px",
//     cursor: "pointer",
//   };

//   const nameStyle = {
//     color: "#0B2C5D",
//     fontWeight: "bold",
//     fontSize: "24px",
//     marginBottom: "20px",
//   };

//   const labelStyle = {
//     fontWeight: "600",
//     color: "#444",
//     textAlign: "left",
//     marginBottom: "5px",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "15px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "12px",
//     border: "none",
//     borderRadius: "8px",
//     backgroundColor: "#0B2C5D",
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: "16px",
//     cursor: "pointer",
//   };

//   if (!profile) {
//     return (
//       <div style={layoutStyle}>
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={layoutStyle}>
//       <div style={cardStyle}>
//         {/* Welcome text in two lines */}
//         <div style={welcomeTextContainer}>
//           <p style={welcomeLine}>Hi,</p>
//           <p style={welcomeLine}>Welcome {profile.name}.</p>
//         </div>

//         {/* Profile Picture */}
//         <div style={{ position: "relative", display: "inline-block" }}>
//           <img
//             src={
//               profile.image
//                 ? `http://localhost:5000${profile.image}`
//                 : "/defaultProfile.jpg"
//             }
//             alt="Profile"
//             style={imageStyle}
//           />
//           <div
//             style={editBadgeStyle}
//             onClick={() => document.getElementById("fileInput").click()}
//           >
//             Edit
//           </div>
//         </div>

//         <input
//           type="file"
//           id="fileInput"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={(e) => setSelectedFile(e.target.files[0])}
//         />
//         {selectedFile && (
//           <button style={buttonStyle} onClick={handleUpload}>
//             Upload Image
//           </button>
//         )}

//         {/* Name */}
//         <h2 style={nameStyle}>{profile.name}</h2>

//         {/* Email and Role */}
//         <div style={{ textAlign: "left" }}>
//           <label style={labelStyle}>Email</label>
//           <input
//             type="text"
//             style={inputStyle}
//             value={profile.email}
//             readOnly
//           />

//           <label style={labelStyle}>Role</label>
//           <input
//             type="text"
//             style={inputStyle}
//             value={profile.role?.name}
//             readOnly
//           />
//         </div>

//         {/* Change Password */}
//         <button
//           style={{ ...buttonStyle, marginTop: "10px" }}
//           onClick={() => setShowPasswordForm(!showPasswordForm)}
//         >
//           Change Password
//         </button>

//         {showPasswordForm && (
//           <div style={{ marginTop: "15px", textAlign: "left" }}>
//             <label style={labelStyle}>Old Password</label>
//             <input
//               type="password"
//               style={inputStyle}
//               placeholder="Old Password"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//             />

//             <label style={labelStyle}>New Password</label>
//             <input
//               type="password"
//               style={inputStyle}
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />

//             <button style={buttonStyle} onClick={handlePasswordChange}>
//               Update Password
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
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
          setProfile(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image first!");

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
        setProfile(data.user);
        setSelectedFile(null);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) return alert("Please fill all fields");

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${profile._id}/update-password`,
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
        alert("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setShowPasswordForm(false);
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating password");
    }
  };

  // Styles
  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f9fc",
  };

  const cardStyle = {
    maxWidth: "400px",
    width: "100%",
    background: "#fff",
    padding: "40px 30px 30px 30px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    position: "relative",
  };

  const imageStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "3px solid #0B2C5D",
    position: "relative",
  };

  const editBadgeStyle = {
    position: "absolute",
    top: "105px",
    left: "calc(50% + 25px)",
    backgroundColor: "#0B2C5D",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    cursor: "pointer",
  };

  const nameStyle = {
    color: "#0B2C5D",
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
  };

  const infoBoxStyle = {
    background: "#f5f6fa",
    borderRadius: "8px",
    padding: "10px 15px",
    marginBottom: "12px",
    textAlign: "left",
    fontSize: "14px",
    color: "#333",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#0B2C5D",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  };

  if (!profile) {
    return (
      <div style={layoutStyle}>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={layoutStyle}>
      <div style={cardStyle}>
        {/* Profile Picture */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={
              profile.image
                ? `http://localhost:5000${profile.image}`
                : "/defaultProfile.jpg"
            }
            alt="Profile"
            style={imageStyle}
          />
          <div
            style={editBadgeStyle}
            onClick={() => document.getElementById("fileInput").click()}
          >
            Edit
          </div>
        </div>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        {selectedFile && (
          <button style={buttonStyle} onClick={handleUpload}>
            Upload Image
          </button>
        )}

        {/* Name */}
        <h2 style={nameStyle}>{profile.name}</h2>

        {/* Email */}
        <div style={infoBoxStyle}>
          <strong>Email:</strong> {profile.email}
        </div>

        {/* Role */}
        <div style={infoBoxStyle}>
          <strong>Role:</strong> {profile.role?.name}
        </div>

        {/* Change Password (same style as Email/Role) */}
        <div
          style={{
            ...infoBoxStyle,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          <strong>Change Password</strong>
          <span style={{ fontSize: "16px" }}>
            {showPasswordForm ? "▲" : "▼"}
          </span>
        </div>

        {/* Password Form */}
        {showPasswordForm && (
          <div style={{ marginTop: "10px", textAlign: "left" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>
              Old Password
            </label>
            <input
              type="password"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <label style={{ fontSize: "14px", fontWeight: "500" }}>
              New Password
            </label>
            <input
              type="password"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button style={buttonStyle} onClick={handlePasswordChange}>
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

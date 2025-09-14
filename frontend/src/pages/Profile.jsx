import React, { useEffect, useState } from "react";




const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


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
      
      // Fetch enrolled courses
      if (result.data.role?.name === "Student") {
        const coursesRes = await fetch("http://localhost:5000/api/enrollments/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const coursesData = await coursesRes.json();
        if (coursesData.success) {
          setEnrolledCourses(coursesData.data);
        }
      }



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
      const res = await fetch("http://localhost:5000/api/users/upload-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${"token"}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setProfile(data.user); 
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

   const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
  };

  const contentStyle = {
    marginLeft: "230px", // sidebar width
    marginTop: "60px",   // navbar height
    padding: "20px",
    flex: 1,
  };
   const cardStyle = {
    maxWidth: "500px",
    margin: "px auto 0",
    background: "#fff",
    padding: " 60px 30px 30px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const imageStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "3px solid #0B2C5D",
  };
  const detailStyle = {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#444",
    textAlign:"left",
  };
  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#0B2C5D",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

 return (
    <div style={layoutStyle}>
      <div style={contentStyle}>
        {profile ? (
          <div style={cardStyle}>
            {/* Profile Image with + overlay */}
            <div
              style={{ display: "flex", justifyContent: "center", marginTop: "-40px", position: "relative" }}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <img
                src={profile.image ? `http://localhost:5000${profile.image}` : "/defaultProfile.jpg"}  
                
                alt=""
                style={imageStyle}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  padding:"5px 10px",
                  backgroundColor: "#0B2C5D",
                  color: "#fff",
                  display: "flex",
                  borderRadius:"4px",
                  fontWeight: "bold",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
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
            {selectedFile && <button style={buttonStyle} onClick={handleUpload}>Upload Image</button>}

            {/* Name */}
            <h2 style={{ color: "#0B2C5D", marginBottom: "10px" }}>{profile.name}</h2>

            <h3 style={{ color: "black", marginBottom: "10px", textAlign:"left"}}>Details</h3>

            
            <p style={detailStyle}><strong>Email:</strong> {profile.email}</p>
            <p style={detailStyle}><strong>Role:</strong> {profile.role?.name}</p>


            {/* Enrolled Courses */}
            {profile.role?.name === "Student" && (

            <div style={{ textAlign: "left", marginTop: "20px" }}>
              <h3 style={{ color: "#0B2C5D", marginBottom: "10px" }}>Enrolled Courses</h3>
              {enrolledCourses.length > 0 ? (
                <p style={{ color: "#444" }}>
      You are enrolled in: {enrolledCourses.map(course => course.title).join(", ")}
    </p>
              ) : (
                <p style={{ color: "#777" }}>Not enrolled in any courses</p>
              )}
            </div>
            )}
        
        

            {/* Change Password */}
            <button
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#ebedf0ff",
                color: "#0B2C5D",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize:"18px",
                fontFamily:"inherit",
              }}
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              Change Password 
            </button>

            {showPasswordForm && (
              <div style={{ marginTop: "15px" }}>
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button style={buttonStyle} onClick={handlePasswordChange}>Update Password</button>
              </div>
            )}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
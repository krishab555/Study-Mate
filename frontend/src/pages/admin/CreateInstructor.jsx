

import { useState } from "react";

function CreateInstructor({ onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", subjects: "", });
  const token = localStorage.getItem("token");
  const role = "Instructor";

  const handleChange = (e) => setForm({ ...form,role, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:5000/api/users/create-instructor", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          ...form, 
          subjects: form.subjects.split(",").map(s => s.trim()) // convert subjects to array
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`${role} created successfully!`);
        onCreated(data.data); // update parent component
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to create ${form.role}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <label>
        Name:
        <input
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          placeholder="Enter email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          placeholder="Enter password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </label>
      <label>
        Subjects:
        <input
          name="subjects"
          placeholder="Enter subjects (comma separated)"
          value={form.subjects}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </label>
      <label>
        Role:
        <input type="text" value="Instructor" disabled style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="hidden" name="role" value="Instructor" />
      </label>
      <button
        type="submit"
        style={{
          padding: "10px 15px",
          backgroundColor: "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Add User
      </button>
    </form>
  );
}

export default CreateInstructor;

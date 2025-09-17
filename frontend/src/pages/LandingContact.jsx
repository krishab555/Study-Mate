import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function LandingContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ loading: false, ok: false, msg: "Please fill in all fields." });
      return;
    }

    setStatus({ loading: true, ok: null, msg: "" });

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ ok: true, msg: data.message });
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus({ ok: null, msg: "" }), 3000);
      } else {
        setStatus({ ok: false, msg: data.message });
        setTimeout(() => setStatus({ ok: null, msg: "" }), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, ok: false, msg: "Failed to send message." });
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "40px",
        padding: "60px 20px",
        background: "#fff", // section background is white
      }}
    >
      {/* Contact Info */}
      <div
        style={{
          flex: "1 1 400px",
          minWidth: "300px",
          background: "white", // light gray box for contrast
          color: "black",
          borderRadius: "12px",
          padding: "40px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Get in Touch</h2>
        <p>Have questions, feedback, or inquiries? Reach out—we’d love to hear from you!</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", fontSize: "16px" }}>
          <div><Mail size={20} /> support@studymate.com</div>
          <div><Phone size={20} /> +977-9812367033</div>
          <div><MapPin size={20} /> Biratnagar, Nepal</div>
        </div>
      </div>

      {/* Contact Form */}
      <div
        style={{
          flex: "1 1 400px",
          minWidth: "300px",
          background: "white", // same light gray for box
          borderRadius: "12px",
          padding: "40px 30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Write your message..."
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            disabled={status.loading}
            style={{
              padding: "12px 16px",
              background: "#0B2C5D",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            {status.loading ? "Sending..." : "Send Message"}
          </button>
          {status.ok === true && <p style={{ color: "#065f46" }}>{status.msg}</p>}
          {status.ok === false && <p style={{ color: "#b91c1c" }}>{status.msg}</p>}
        </form>
      </div>
    </section>
  );
}

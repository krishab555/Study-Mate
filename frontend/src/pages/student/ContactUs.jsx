// src/pages/student/ContactUs.jsx
import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({
        loading: false,
        ok: false,
        msg: "Please fill in all fields.",
      });
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
              setStatus({ ok: true, msg: data.message }); // "Message sent!"
              setForm({ name: "", email: "", message: "" });

              // clear after 3s
              setTimeout(() => setStatus({ ok: null, msg: "" }), 3000);
          } else {
              setStatus({ ok: false, msg: data.message });

              // clear after 3s
              setTimeout(() => setStatus({ ok: null, msg: "" }), 3000);
          }
      } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        ok: false,
        msg: "Network error — check backend.",
      });
    }
  };

  const sectionStyle = {
    backgroundColor: "#fff",
    padding: "48px 20px",
    fontFamily: "inherit",
    color: "#020202ff",
    fontSize: "18px",
  };
  const gridStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "40px",
    alignItems: "start",
  };
  const cardStyle = {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(59, 55, 55, 0.05)",
  };
  const labelStyle = {
    display: "block",
    fontWeight: 600,  
    color: "#272525ff",
    marginBottom: "6px",
  };
  const inputStyle = {
    marginTop: 6,
    width: "100%",
    padding: "11px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
  };
  const btnStyle = {
    width: "100%",
    padding: "12px 14px",
    backgroundColor: "#2c24ccff",
    color: "#fff",
    fontWeight: 600,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  };

  return (
    <section id="contact" style={sectionStyle}>
      <div style={gridStyle}>
        <div>
          <h2
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#0a0a0aff",
              marginBottom: 16,
            }}
          >
            Get in Touch
          </h2>
          <p style={{ marginBottom: 24 }}>
            Have questions, feedback, or any inquiries? Reach out to us—we’d
            love to hear from you!
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Mail size={20} color="#4f46e5" /> support@studymate.com
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Phone size={20} color="#4f46e5" /> +977-9812367033
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <MapPin size={20} color="#4f46e5" /> Biratnagar, Nepal
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div>
              <label style={labelStyle}>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Write your message..."
                required
              />
            </div>

            <button type="submit" style={btnStyle} disabled={status.loading}>
              {status.loading ? "Sending..." : "Send Message"}
            </button>

            {status.ok === true && (
              <p style={{ color: "#065f46", fontSize: 14 }}>{status.msg}</p>
            )}
            {status.ok === false && (
              <p style={{ color: "#b91c1c", fontSize: 14 }}>{status.msg}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

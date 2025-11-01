import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { SidebarLayout } from "../../components/common/SideBar";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
    };
  }, []);

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
      setStatus({ loading: false, ok: false, msg: "failed to send message." });
    }
  };

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <section className="contact-section">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have questions, feedback, or any inquiries? Reach out to us—we’d love to hear from you!
          </p>

          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-card">
              <div className="contact-info">
                <div><Mail size={20} color="#4f46e5" /> support@studymate.com</div>
                <div><Phone size={20} color="#4f46e5" /> +977-9812367033</div>
                <div><MapPin size={20} color="#4f46e5" /> Biratnagar, Nepal</div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div>
                  <label>Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write your message..."
                  />
                </div>
                <button type="submit" disabled={status.loading}>
                  {status.loading ? "Sending..." : "Send Message"}
                </button>
                {status.ok === true && <p className="success-msg">{status.msg}</p>}
                {status.ok === false && <p className="error-msg">{status.msg}</p>}
              </form>
            </div>
          </div>
        </section>
      </SidebarLayout>
     

      {/* Internal CSS */}
      <style>{`
        .contact-section {
          padding: 30px 20px;
          max-width: 1200px;
          margin-left:470px;
          margin: 0 auto;
          font-family: inherit;
          color: #020202;
          font-size: 18px;
        }
        .contact-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .contact-subtitle {
          margin-bottom: 30px;
        }
        .contact-grid {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }
        .contact-card {
          flex: 1 1 45%;
          min-width: 300px;
          background-color: #fff;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 12px;
          margin-top: 6px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
        }
        .contact-form button {
          padding: 12px 16px;
          background-color: #0B2C5D;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 10px;
        }
        .success-msg {
          color: #065f46;
        }
        .error-msg {
          color: #b91c1c;
        }

        /* Responsive */
        @media (max-width: 767px) {
          .contact-grid {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}


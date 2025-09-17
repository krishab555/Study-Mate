
export default function CourseContent() {
  // Adjust this according to your sidebar width
  const sidebarWidth = 250;

  return (
    <div
      style={{
        marginLeft: `${sidebarWidth}px`, // pushes content right of sidebar
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Course Title</h1>
      <p>
        Learn everything step by
        step!
      </p>

      {/* ---------------- Video Button Placeholder ---------------- */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Course Material (Video)</h2>
        <a
          href="#"
          onClick={() => alert("Video will play here after instructor upload")}
          style={{
            display: "inline-block",
            padding: "20px 25px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            cursor: "pointer",
            minWidth: "200px",
          }}
        >
          🎬 Watch Video
        </a>
      </div>

      {/* ---------------- PDF Button Placeholder ---------------- */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Course Material (PDF)</h2>
        <a
          href="#"
          onClick={() => alert("PDF will open here after upload")}
          style={{
            display: "inline-block",
            padding: "15px 20px",
            backgroundColor: "#f39c12",
            color: "white",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          📄 View PDF
        </a>
      </div>

      {/* ---------------- Project Submission Button ---------------- */}
      <div>
        <button
          onClick={() => alert("Project submission form will appear here")}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🚀 Submit Project
        </button>
      </div>
    </div>
  );
}

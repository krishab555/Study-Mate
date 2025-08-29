// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import { connectToDB } from "./config/db.js"; 
// import userRoutes from "./routes/userRoutes.js";
// import courseRoutes from "./routes/courseRoutes.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import certificateRoutes from "./routes/certificateRoutes.js";


// const app = express();

// connectToDB(); 
// app.use(cors()); 
// app.use(express.json());

// app.use("/api/users", userRoutes);
// app.use("/api/courses", courseRoutes); 
// app.use("/api/projects", projectRoutes);
// app.use("/api/certificates", certificateRoutes);

// app.get("/api/test", (req, res) => {
 
//   res.json({ success: true, message: "This is test route!" });
// });

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`); 
// });
// index.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan"; // for logging requests
import { connectToDB } from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import faqRoutes from "./routes/FAQRoutes.js"; // ✅ Add FAQ

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect Database
connectToDB();

// Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev")); // log requests in dev
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/faqs", faqRoutes); // ✅ add FAQs

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Study-Mate API is running...");
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "This is a test route!" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

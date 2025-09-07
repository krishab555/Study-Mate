// backend/index.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan"; // optional for logging requests
import { connectToDB } from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import faqRoutes from "./routes/FAQRoutes.js";
import quizRouter from "./routes/quizRoutes.js";
import userQuizRouter from "./routes/userQuizRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoutes from "./routes/contact.js"; // ✅ Contact Us route

dotenv.config();
const app = express();

// Connect to MongoDB
connectToDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // frontend Vite dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/quiz", quizRouter);
app.use("/api/userQuiz", userQuizRouter);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes); // ✅ Contact Us route

// Health check
app.get("/", (req, res) => {
  res.send("Study-Mate API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

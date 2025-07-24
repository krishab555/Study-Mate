import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.js"; 
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";


const app = express();

connectToDB(); 
app.use(cors()); 
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes); 

app.get("/api/test", (req, res) => {
 
  res.json({ success: true, message: "This is test route!" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`); 
});

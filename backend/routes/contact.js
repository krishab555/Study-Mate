// import express from "express";
// import Message from "../models/Message.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     // Save to database
//     const newMessage = new Message({ name, email, message });
//     await newMessage.save();

//     res.status(200).json({ message: "Message sent!" });
//   } catch (err) {
//     console.error("Error saving message:", err);
//     res.status(500).json({ message: "Failed to send message!" });
//   }
// });

// export default router;

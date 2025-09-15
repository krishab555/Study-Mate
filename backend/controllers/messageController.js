import Message from "../models/Message.js";

// Send a message
export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newMessage = new Message({
      name,
      email,
      message,
      recipient: "admin",
    });
    await newMessage.save();
    res.status(200).json({ message: "Message sent to admin!" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ message: "Failed to send message!" });
  }
};

// Get all messages for admin
export const getAdminMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: "admin" }).sort({
      createdAt: -1,
    });
    res.status(200).json({ messages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
};

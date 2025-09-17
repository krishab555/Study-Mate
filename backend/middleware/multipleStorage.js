import multer from "multer";
import fs from "fs";
import path from "path";

// Define storage for different types
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";

    if (file.mimetype.startsWith("image/")) {
      uploadPath = "uploads/images";
    } else if (file.mimetype === "application/pdf") {
      uploadPath = "uploads/pdfs";
    } else if (file.mimetype.startsWith("video/")) {
      uploadPath = "uploads/videos";
    } else {
      return cb(new Error("Invalid file type"));
    }

    // Make sure folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

export const upload = multer({ storage });

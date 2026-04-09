import multer from "multer";
import path from "path";
import fs from "fs"
const uploadPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();
    cb(null, suffix + "-" + file.originalname);
  },
});

// const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype ==="image/webp" ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG/PNG/WEBP allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export default upload;

const express = require("express");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const streamUpload = () => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "cars" }, (error, result) => {
        if (result) resolve(result); else reject(error);
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
    const result = await streamUpload();
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});
module.exports = router;

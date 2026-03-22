const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "divgngsnh",
  api_key: process.env.CLOUDINARY_API_KEY || "485936728552763",
  api_secret: process.env.CLOUDINARY_API_SECRET || "YcrKXKPT5LutfAoAsErX23KStOs",
});
module.exports = cloudinary;

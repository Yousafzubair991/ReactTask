const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const authMiddleware = require("../middleware/check-auth");
const upload = multer({ dest: "uploads/" });
const postController = require("../controllers/postController");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

router.get("/", postController.getAllPosts);

router.get("/:postId", postController.getPostById);

router.post(
  "/",
  upload.single("media"), // Assuming you have a single image field in your form
  authMiddleware,
  postController.createPost
);

router.delete("/:postId", authMiddleware, postController.deletePost);

router.put("/:postId", authMiddleware, postController.updatePost);
//Update no of views
router.post("/views/:postId", postController.updatePostViews);

module.exports = router;

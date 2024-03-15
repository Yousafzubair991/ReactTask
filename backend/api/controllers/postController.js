const mongoose = require("mongoose");
const Post = require("../model/post");
const cloudinary = require("cloudinary").v2;

//////////////////////GET ALL POSTS////////////////////////
exports.getAllPosts = async (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error fetching posts" });
    });
};

//////////////////////GET POST BY ID////////////////////////
exports.getPostById = async (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ post });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error fetching post" });
    });
};

////////////////////CREATE POST////////////////////////
exports.createPost = async (req, res, next) => {
  const { path, views, type, created_at, title, description, category, tags } =
    req.body;

  // Get the user ID from the token
  const created_by = req.user._id;

  let media = "";

  // Check if request contains a media file
  if (req.file && req.file.path) {
    // Upload media to Cloudinary
    const mediaResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts/media",
    });
    media = mediaResult.secure_url;
  }

  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    path,
    views: 0, // Default value for views
    type,
    created_at,
    media,
    created_by,
    title,
    description,
    category,
    tags,
    status: "posted", // Default status
  });

  newPost
    .save()
    .then((post) => {
      res.status(201).json({ message: "Post created successfully", post });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error saving post to the database" });
    });
};

////////////////////DELETE POST////////////////////////
exports.deletePost = async (req, res, next) => {
  const id = req.params.postId;
  Post.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error deleting post" });
    });
};

////////////////////UPDATE POST////////////////////////
exports.updatePost = async (req, res, next) => {
  const id = req.params.postId;
  const updateOps = req.body;
  Post.findByIdAndUpdate(id, { $set: updateOps }, { new: true })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ message: "Post updated successfully", post });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error updating post" });
    });
};

//////////////////////UPADTE POST VIEWS////////////////////////
exports.updatePostViews = async (req, res, next) => {
  const id = req.params.postId;

  Post.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res
        .status(200)
        .json({ message: "Post views updated successfully", post });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error updating post views" });
    });
};

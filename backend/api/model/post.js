const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  path: String,
  views: { type: Number, default: 0 }, // Default value for views
  type: String,
  created_at: Date,
  media: String,
  created_by: String,
  title: String,
  description: String,
  category: String,
  tags: String,
  status: String,
});

module.exports = mongoose.model("Posts", Schema);

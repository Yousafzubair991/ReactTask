const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  password: String,
  role: String,
  created_at: Date,
});

module.exports = mongoose.model("User", Schema);

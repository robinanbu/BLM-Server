// models/Patient.js
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  role: {
    type: String,
    enum: ["user", "employee"],
    default: "user", // Set default role to 'user'
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

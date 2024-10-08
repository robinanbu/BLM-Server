// models/Patient.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "employee"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

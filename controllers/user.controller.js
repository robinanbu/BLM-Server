const Users = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const fetchedUsers = await Users.find();
    res.status(200).json(fetchedUsers);
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, location, role } = req.body;

    if (!name || !email || !password || !phone || !location || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const findUser = await Users.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const findUser = await Users.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "Invalid email!" });
    }

    if (findUser.password === password) {
      return res.status(200).json({ role: findUser.role });
    } else {
      return res.status(400).json({ message: "Invalid password!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentRecord = await Users.findById(id);

    if (!currentRecord) {
      return res.status(404).json({ message: "User not found!" });
    }

    const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentRecord = await Users.findById(id);

    if (!currentRecord) {
      return res.status(404).json({ message: "User not found!" });
    }

    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};

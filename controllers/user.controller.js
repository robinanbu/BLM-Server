const User = require("../models/User");
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

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields except phone and location are required!" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // This will be hashed in the User model's pre-save hook
      phone,
      location,
      role,
    });

    // Save the user
    const savedUser = await newUser.save();
    
    // Exclude password from the response for security
    savedUser.password = undefined;

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error); // Log the error for debugging
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

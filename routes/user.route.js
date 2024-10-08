const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/all", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/edit/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;

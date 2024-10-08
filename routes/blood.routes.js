const express = require("express");
const router = express.Router();
const {
  postBloodData,
  getAllBloodData,
  updateBloodData,
  deleteBloodData,
} = require("../controllers/blood.controller");

router.post("/post-blood-data", postBloodData);
router.get("/get-all-blood-data", getAllBloodData);
router.put("/update-one-blood-data/:id", updateBloodData);
router.delete("/delete-one-blood-data/:id", deleteBloodData);

module.exports = router;

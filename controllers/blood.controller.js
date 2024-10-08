const Patient = require("../models/Patient");

const postBloodData = async (req, res, next) => {
  try {
    const { name, emergency, location, age, gender, bloodGroup } = req.body;

    if (!name || !emergency || !location || !age || !gender || !bloodGroup) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newPatient = new Patient({
      name,
      emergency,
      location,
      age,
      gender,
      bloodGroup,
    });
    await newPatient.save();

    res.status(201).json({ message: "Blood request submitted successfully." });
  } catch (error) {
    console.error("Error submitting blood request:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const getAllBloodData = async (req, res, next) => {
  try {
    const patients = await Patient.find({});
    return res.status(200).json({
      patients,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
};

const updateBloodData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be either accepted or rejected.",
      });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.status(200).json({ message: "Patient status updated successfully." });
  } catch (error) {
    console.error("Error updating patient status:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const deleteBloodData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.status(200).json({ message: "Patient deleted successfully." });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = {
  postBloodData,
  getAllBloodData,
  updateBloodData,
  deleteBloodData,
};

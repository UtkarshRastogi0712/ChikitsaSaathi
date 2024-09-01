const Hospital = require("./hospital.model");

const createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ error: "Failed to create hospital" });
  }
};

const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hospital" });
  }
};

const updateHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hospital" });
  }
};

const deleteHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hospital" });
  }
};

const assignBed = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    const bedType = req.params.bed;
    const user = req.params.user;
    const isAssigned = hospital.assignPatient(bedType, user);
    if (isAssigned) {
      await hospital.save();
      res.json({ message: "Bed alloted successfully" });
    } else {
      res.json({ message: "Couldnt allot bed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to assign bed" });
  }
};

const dischargeBed = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    const bedType = req.params.bed;
    const user = req.params.user;
    const isDischarged = hospital.dischargePatient(bedType, user);
    if (isDischarged) {
      await hospital.save();
      res.json({ message: "Bed discharged successfully" });
    } else {
      res.json({ message: "Bed already empty" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to discharge bed" });
  }
};

const waitlistBed = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    const bedType = req.params.bed;
    const user = req.params.user;
    hospital.queuePatient(bedType, user);
    await hospital.save();
    res.json({ message: "Bed added to waiting list" });
  } catch (error) {
    res.status(500).json({ error: "Failed to waitlist bed" });
  }
};

module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospitalById,
  deleteHospitalById,
  assignBed,
  dischargeBed,
  waitlistBed,
};

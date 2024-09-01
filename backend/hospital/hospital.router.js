const express = require("express");
const hospitalController = require("./hospital.controller");

const router = express.Router();

router.get("/", hospitalController.getAllHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.post("/", hospitalController.createHospital);
router.put("/:id", hospitalController.updateHospitalById);
router.delete("/:id", hospitalController.deleteHospitalById);

module.exports = router;

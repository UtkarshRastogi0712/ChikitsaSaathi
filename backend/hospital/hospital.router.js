const express = require("express");
const hospitalController = require("./hospital.controller");

const router = express.Router();

router.get("/", hospitalController.getAllHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.post("/", hospitalController.createHospital);
router.put("/:id", hospitalController.updateHospitalById);
router.delete("/:id", hospitalController.deleteHospitalById);
router.get("/assignBed/:id/:bed/:user", hospitalController.assignBed);
router.get("/waitlistBed/:id/:bed/:user", hospitalController.waitlistBed);
router.get("/dischargeBed/:id/:bed/:user", hospitalController.dischargeBed);
router.get("/autoAssign/:id/:user", hospitalController.autoAssign);

module.exports = router;

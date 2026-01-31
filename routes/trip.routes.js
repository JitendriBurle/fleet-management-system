const express = require("express");
const router = express.Router();
const { createTrip, getTrip, updateTrip, deleteTrip, endTrip } = require("../controllers/trip.controller");

router.post("/create", createTrip);
router.get("/:tripId", getTrip);
router.patch("/update/:tripId", updateTrip);
router.delete("/delete/:tripId", deleteTrip);
router.patch("/end/:tripId", endTrip);

module.exports = router;

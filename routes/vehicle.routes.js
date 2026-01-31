const express = require('express');
const router = express.Router();
const limiter = require('../middlewares/rateLimiter.middleware');
const controller = require('../controllers/vehicle.controller');

router.post('/add', limiter, controller.addVehicle);
router.patch('/assign-driver/:vehicle_id', controller.assignDriver);
router.get('/:vehicleId', controller.getVehicles);

module.exports = router;
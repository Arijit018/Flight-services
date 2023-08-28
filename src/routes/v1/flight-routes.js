const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddleWare } = require('../../middlewares');

const router = express.Router();

// /api/v1/airports POST
router.post('/',
    FlightMiddleWare.validateCreateRequest,
    FlightController.createFlight);
router.get('/', FlightController.getAllFlights);
router.get('/:id',
    FlightController.getFlight);
router.patch('/:id/seats', FlightMiddleWare.validateUpdateSeatsRequest, FlightController.updateSeats);

module.exports = router;
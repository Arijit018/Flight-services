const express = require('express');

const { AirportController } = require('../../controllers');
const { AirPortMiddleWare } = require('../../middlewares');

const router = express.Router();

// /api/v1/airports POST
router.post('/',
    AirPortMiddleWare.validateCreateRequest,
    AirportController.createAirport);
router.get('/', AirportController.getAirports);
router.get('/:id', AirportController.getAirport);
router.delete('/:id', AirportController.destroyAirport);

module.exports = router;
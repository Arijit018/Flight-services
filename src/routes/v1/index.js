const express = require('express');

const { InfoController } = require('../../controllers');

const airplaneRoutes = require('./airplane-routes');
const airportRoutes = require('./airport-routes');
const flightRoutes = require('./flight-routes')
const cityRoutes = require('./city-route');

const router = express.Router();

router.use('/airplanes', airplaneRoutes);
router.use('/city', cityRoutes);
router.use('/airports', airportRoutes);
router.use('/flights', flightRoutes);


router.get('/info', InfoController.info);


module.exports = router;
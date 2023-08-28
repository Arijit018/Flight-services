const express = require('express');

const { cityController } = require('../../controllers');
const { CityMiddleware } = require('../../middlewares')

const router = express.Router();

router.post('/', CityMiddleware.validateCreateRequest, cityController.createCity);
module.exports = router;
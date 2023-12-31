const { StatusCodes } = require('http-status-codes');

const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;

    } catch (error) {
        throw new AppError("Can't fetch data of all the airplane ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane You request is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Can't fetch data of all the airplane ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function DestroyAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane You request to delete is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Can't fetch data of all the airplane ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane, DestroyAirplane
}
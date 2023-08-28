const { StatusCodes } = require('http-status-codes');

const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        console.log(error);
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;

    } catch (error) {
        console.log(error);
        throw new AppError("Can't fetch data of all the airports ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airport You request is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Can't fetch data of all the airport ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function DestroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airport You request to delete is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Can't fetch data of all the airport ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport, DestroyAirport
}
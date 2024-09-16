const axios = require('axios');
require('dotenv').config();

const SWAPI_BASE_URL = process.env.SWAPI_BASE_URL //TODO - cambiar por variable de entorno

class SwapiService {
  async getStarshipById(id) {
    try{
      const response = await axios.get(`${SWAPI_BASE_URL}/starships/${id}`);
      return response.data;

    } catch (error) {
        throw error
    }
  }
  
  async getVehiclesById(id) {
    try{
      const response = await axios.get(`${SWAPI_BASE_URL}/vehicles/${id}`);
      return response.data;

    } catch (error) {
        throw error
    }
  }
}

module.exports = SwapiService;
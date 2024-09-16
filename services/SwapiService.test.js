const axios = require('axios');
const SwapiService = require('../services/SwapiService');

jest.mock('axios');

describe('SwapiService', () => {
  let swapiService;

  beforeEach(() => {
    swapiService = new SwapiService();
  });

  describe('getStarshipById', () => {
    it('debería devolver los datos de la nave espacial cuando la llamada es exitosa', async () => {
      const mockData = { name: 'Death Star', id: 9 };
      axios.get.mockResolvedValue({ data: mockData });

      const result = await swapiService.getStarshipById(9);

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/9');
    });

    it('debería lanzar un error cuando la llamada falla', async () => {
      const error = new Error('Network Error');
      axios.get.mockRejectedValue(error);

      await expect(swapiService.getStarshipById(9))
        .rejects
        .toThrow('Network Error');

      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/9');
    });
  });

  describe('getVehiclesById', () => {
    it('debería devolver los datos del vehículo cuando la llamada es exitosa', async () => {
      const mockData = { name: 'Sand Crawler', id: 4 };
      axios.get.mockResolvedValue({ data: mockData });

      const result = await swapiService.getVehiclesById(4);

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/vehicles/4');
    });

    it('debería lanzar un error cuando la llamada falla', async () => {
      const error = new Error('Network Error');
      axios.get.mockRejectedValue(error);

      await expect(swapiService.getVehiclesById(4))
        .rejects
        .toThrow('Network Error');

      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/vehicles/4');
    });
  });
});
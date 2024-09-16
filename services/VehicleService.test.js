const VehiclesServices = require('../services/VehicleService');

describe('VehiclesServices', () => {
  let swapiServiceMock;
  let inventoryRepositoryMock;
  let vehiclesService;

  beforeEach(() => {
    swapiServiceMock = {
      getVehiclesById: jest.fn(),
    };
    inventoryRepositoryMock = {
      getInventoryBySwapiId: jest.fn(),
      upsertInventory: jest.fn(),
      updateInventoryCountAdd: jest.fn(),
      updateInventoryCountSubtract: jest.fn(),
    };

    vehiclesService = new VehiclesServices(swapiServiceMock, inventoryRepositoryMock);
  });

  describe('getVehicleWithInventory', () => {
    it('debería devolver el vehículo con el inventario', async () => {
      const vehicleData = { name: 'Sand Crawler', id: 4 };
      swapiServiceMock.getVehiclesById.mockResolvedValue(vehicleData);
      inventoryRepositoryMock.getInventoryBySwapiId.mockResolvedValue(10);

      const result = await vehiclesService.getVehicleWithInventory(4);

      expect(result).toEqual({
        ...vehicleData,
        count: 10,
      });

      expect(swapiServiceMock.getVehiclesById).toHaveBeenCalledWith(4);
      expect(inventoryRepositoryMock.getInventoryBySwapiId).toHaveBeenCalledWith(4);
    });

    it('debería lanzar un error si el vehículo no existe', async () => {
      swapiServiceMock.getVehiclesById.mockResolvedValue(null);

      await expect(vehiclesService.getVehicleWithInventory(4))
        .rejects
        .toThrow('Vehículo con id: 4 no encontrado');

      expect(swapiServiceMock.getVehiclesById).toHaveBeenCalledWith(4);
    });
  });

  describe('setVehicleCount', () => {
    it('debería establecer el inventario del vehículo', async () => {
      const vehicleData = { name: 'Sand Crawler', id: 4 };
      swapiServiceMock.getVehiclesById.mockResolvedValue(vehicleData);
      inventoryRepositoryMock.upsertInventory.mockResolvedValue(15);

      const result = await vehiclesService.setVehicleCount(4, 15);

      expect(result).toBe(15);
      expect(inventoryRepositoryMock.upsertInventory).toHaveBeenCalledWith(4, 15);
    });
  });

  describe('updateVehicleCountAdd', () => {
    it('debería incrementar el inventario del vehículo', async () => {
      const vehicleData = { name: 'Sand Crawler', id: 4 };
      swapiServiceMock.getVehiclesById.mockResolvedValue(vehicleData);
      inventoryRepositoryMock.updateInventoryCountAdd.mockResolvedValue(20);

      const result = await vehiclesService.updateVehicleCountAdd(4, 5);

      expect(result).toBe(20);
      expect(inventoryRepositoryMock.updateInventoryCountAdd).toHaveBeenCalledWith(4, 5);
    });
  });

  describe('updateVehicleCountSubtract', () => {
    it('debería decrementar el inventario del vehículo', async () => {
      const vehicleData = { name: 'Sand Crawler', id: 4 };
      swapiServiceMock.getVehiclesById.mockResolvedValue(vehicleData);
      inventoryRepositoryMock.updateInventoryCountSubtract.mockResolvedValue(5);

      const result = await vehiclesService.updateVehicleCountSubtract(4, 5);

      expect(result).toBe(5);
      expect(inventoryRepositoryMock.updateInventoryCountSubtract).toHaveBeenCalledWith(4, 5);
    });

    it('debería lanzar un error si el inventario queda en negativo', async () => {
      const vehicleData = { name: 'Sand Crawler', id: 4 };
      swapiServiceMock.getVehiclesById.mockResolvedValue(vehicleData);
      inventoryRepositoryMock.updateInventoryCountSubtract.mockRejectedValue(new Error('No se puede decrementar el inventario a menos de 0'));

      await expect(vehiclesService.updateVehicleCountSubtract(4, 10))
        .rejects
        .toThrow('No se puede decrementar el inventario a menos de 0');

      expect(swapiServiceMock.getVehiclesById).toHaveBeenCalledWith(4);
      expect(inventoryRepositoryMock.updateInventoryCountSubtract).toHaveBeenCalledWith(4, 10);
    });
  });
});
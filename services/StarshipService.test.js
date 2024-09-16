const StarshipService = require('../services/StarshipService');

describe('StarshipService', () => {
  let swapiServiceMock;
  let inventoryRepositoryMock;
  let starshipService;

  beforeEach(() => {
    swapiServiceMock = {
      getStarshipById: jest.fn()
    };
    inventoryRepositoryMock = {
      getInventoryBySwapiId: jest.fn(),
      upsertInventory: jest.fn(),
      updateInventoryCountAdd: jest.fn(),
      updateInventoryCountSubtract: jest.fn(),
    };

    starshipService = new StarshipService(swapiServiceMock, inventoryRepositoryMock);
  });

  describe('getStarshipWithInventory', () => {
    it('debería devolver la nave con el inventario', async () => {
      const starshipData = { name: 'Death Star', id: 9 };
      swapiServiceMock.getStarshipById.mockResolvedValue(starshipData);
      inventoryRepositoryMock.getInventoryBySwapiId.mockResolvedValue(5);

      const result = await starshipService.getStarshipWithInventory(9);

      expect(result).toEqual({
        ...starshipData,
        count: 5,
      });

      expect(swapiServiceMock.getStarshipById).toHaveBeenCalledWith(9);
      expect(inventoryRepositoryMock.getInventoryBySwapiId).toHaveBeenCalledWith(9);
    });

    it('debería lanzar un error si la nave no existe', async () => {
      swapiServiceMock.getStarshipById.mockResolvedValue(null);

      await expect(starshipService.getStarshipWithInventory(9))
        .rejects
        .toThrow('Nave con id: 9 no encontrado');

      expect(swapiServiceMock.getStarshipById).toHaveBeenCalledWith(9);
    });
  });

  describe('setStarshipCount', () => {
    it('debería establecer el inventario de la nave', async () => {
      const starshipData = { name: 'Death Star', id: 9 };
      swapiServiceMock.getStarshipById.mockResolvedValue(starshipData);
      inventoryRepositoryMock.upsertInventory.mockResolvedValue(10);

      const result = await starshipService.setStarshipCount(9, 10);

      expect(result).toBe(10);
      expect(inventoryRepositoryMock.upsertInventory).toHaveBeenCalledWith(9, 10);
    });
  });

});
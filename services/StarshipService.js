class StarshipService  {
    constructor(swapiService, inventoryRepository) {
      this.swapiService = swapiService;
      this.inventoryRepository = inventoryRepository;
    }

    async _getStarshipOrThrow(id) {
      try {
        const starship = await this.swapiService.getStarshipById(id);
        if (!starship) {
          const error = new Error(`Nave con id: ${id} no encontrado`);
          throw error;
        }else{
          return starship;
    }
  
      } catch (error) {
        throw error
      }
    }
  
    async getStarshipWithInventory(id) {
      const starship = await this._getStarshipOrThrow(id);
      const count = await this.inventoryRepository.getInventoryBySwapiId(id);
      return {
        ...starship,
        count,
      };
    }
  
    async setStarshipCount(id, count) {
      await this._getStarshipOrThrow(id);
      return await this.inventoryRepository.upsertInventory(id, count);
    }
  
    async updateStarshipCountAdd(id, quantity) {
      await this._getStarshipOrThrow(id);
      return await this.inventoryRepository.updateInventoryCountAdd(id, quantity);
    }
    async updateStarshipCountSubtract(id, quantity) {
      await this._getStarshipOrThrow(id);
      return await this.inventoryRepository.updateInventoryCountSubtract(id, quantity);
    }
  }
  
  module.exports = StarshipService ;
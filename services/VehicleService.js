class VehiclesServices {
  constructor(swapiService, inventoryRepository) {
    this.swapiService = swapiService;
    this.inventoryRepository = inventoryRepository;
  }

  async _getVehicleOrThrow(id) {
    try {
      const vehicle = await this.swapiService.getVehiclesById(id);
      if (!vehicle) {
        const error = new Error(`Vehículo con id: ${id} no encontrado`);
        throw error;
      }else{
        return vehicle;
  }

    } catch (error) {
      throw error
    }
  }

  async getVehicleWithInventory(id) {
    const vehicle = await this._getVehicleOrThrow(id);
    const count = await this.inventoryRepository.getInventoryBySwapiId(id);
    return {
      ...vehicle,
      count,
    };
  }

  async setVehicleCount(id, count) {
    await this._getVehicleOrThrow(id);
    return await this.inventoryRepository.upsertInventory(id, count);
  }

  async updateVehicleCountAdd(id, quantity) {
    await this._getVehicleOrThrow(id);
    return await this.inventoryRepository.updateInventoryCountAdd(id, quantity);
  }

  async updateVehicleCountSubtract(id, quantity) {
    await this._getVehicleOrThrow(id);
    return await this.inventoryRepository.updateInventoryCountSubtract(
      id,
      quantity
    );
  }
}

module.exports = VehiclesServices;

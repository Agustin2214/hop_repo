class InventoryRepository {
    async getInventoryBySwapiId(swapiId) {
      throw new CustomError('Bad Request',400,'Método no implementado' );
    }
    async upsertInventory(swapiId, count) {
      throw new CustomError('Bad Request',400,'Método no implementado' );
    }
    async updateInventoryCountAdd(swapiId, cantAdd) {
      throw new CustomError('Bad Request',400,'Método no implementado' );
    }
    async updateInventoryCountSubtract(swapiId, cantSubtract) {
      throw new CustomError('Bad Request',400,'Método no implementado' );
    }

  }
  
  module.exports = InventoryRepository;
const Inventory = require('../models/Inventory')
const InventoryRepository = require('./InventoryRepository');
const CustomError = require('../utils/errorclass');
class SequelizeInventoryRepository extends InventoryRepository {
  async getInventoryBySwapiId(swapiId) {
    const inventoryEntry = await Inventory.findOne({ where: { swapi_id: swapiId } });
    return inventoryEntry ? inventoryEntry.count : 0;
  }

  async upsertInventory(swapiId, count) {
    if (count < 0) {
      throw new CustomError('Bad Request',400,'La nave no puede tener un inventario negativo' );

    }

    const [inventoryEntry, created] = await Inventory.findOrCreate({
      where: { swapi_id: swapiId },
      defaults: { count }
    });

    if (!created) {
      inventoryEntry.count = count;
      await inventoryEntry.save();
    }

    return inventoryEntry.count;
  }

  async updateInventoryCountAdd(swapiId, cantAdd) {
    const inventoryEntry = await Inventory.findOne({ where: { swapi_id: swapiId } });

    if (!inventoryEntry) {
      throw new CustomError('Bad Request',400,'Nave no encontrada en el inventario' );
    }

    inventoryEntry.count += cantAdd;
    await inventoryEntry.save();
    return inventoryEntry.count;
  }


async updateInventoryCountSubtract(swapiId, cantSubtract) {
  const inventoryEntry = await Inventory.findOne({ where: { swapi_id: swapiId } });

  if (!inventoryEntry ) {
    throw new CustomError('Bad Request',400,'Nave no encontrada en el inventario' );
  }

  inventoryEntry.count -= cantSubtract;

  if (inventoryEntry.count < 0) {
    throw new CustomError('Bad Request',400,'No se puede decrementar el inventario a menos de 0');
  }


  await inventoryEntry.save();
  return inventoryEntry.count;
}

}

module.exports = SequelizeInventoryRepository;
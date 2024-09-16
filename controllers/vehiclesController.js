const VehiclesService  = require('../services/VehicleService');
const SequelizeInventoryRepository = require('../repositories/SequelizeInventoryRepository');
const SwapiService = require('../services/SwapiService');

const swapiService = new SwapiService();
const inventoryRepository = new SequelizeInventoryRepository();
const vehicleService = new VehiclesService(swapiService, inventoryRepository);

getVehicleWithCount = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await vehicleService.getVehicleWithInventory(id);
    res.json(vehicle);
  } catch (error) {
    const statusCode = error.response.status|| 500;
       res.status(statusCode).json({ 
           message: 'Error al obtener vehiculo',
           error: error.response.statusText});
     }
};

setVehicleCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    const updatedCount = await vehicleService.setVehicleCount(id, count);
    res.json({ message: 'Inventario actualizado', count: updatedCount });
  } catch (error) {
    const statusCode = error.response.status|| 500;
    res.status(statusCode).json({ 
        message: 'Error al actualizar el inventario',
        error: error.response.statusText});
  }
};

updateVehicleCountAdd = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCount = await vehicleService.updateVehicleCountAdd(id, quantity);
    res.json({ message: 'Inventario actualizado', count: updatedCount });
  } catch (error) {
    const statusCode = error.response.status|| 500;
    res.status(statusCode).json({ 
        message: 'Error al actualizar el inventario',
        error: error.response.statusText});
  }
};

updateVehicleCountSubtract = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCount = await vehicleService.updateVehicleCountSubtract(id, quantity);
    res.json({ message: 'Inventario actualizado', count: updatedCount });
  } catch (error) {
 const statusCode = error.response.status|| 500;
    res.status(statusCode).json({ 
        message: 'Error al actualizar el inventario',
        error: error.response.statusText});
  }
};

module.exports = {
  getVehicleWithCount,
  setVehicleCount,
  updateVehicleCountAdd,
  updateVehicleCountSubtract
}
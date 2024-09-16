const StarshipService = require('../services/StarshipService');
const SequelizeInventoryRepository = require('../repositories/SequelizeInventoryRepository');
const SwapiService = require('../services/SwapiService');

const swapiService = new SwapiService();
const inventoryRepository = new SequelizeInventoryRepository();
const starshipService = new StarshipService(swapiService, inventoryRepository);

getStarshipWithCount = async (req, res) => {
  const { id } = req.params;

  try {
    const starship = await starshipService.getStarshipWithInventory(id);
    res.json(starship);
  }  catch (error) {
    const statusCode = error?.response?.status|| 500;
       res.status(statusCode).json({ 
           message: 'Error al obtener nave',
           error: error.response.statusText});
     }
};

setStarshipCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    const updatedCount = await starshipService.setStarshipCount(id, count);
    res.json({ message: 'Inventario actualizado', count: updatedCount });
  }  catch (error) {
    const statusCode = error.response.status|| 500;
       res.status(statusCode).json({ 
           message: 'Error al actualizar el inventario',
           error: error.response.statusText});
     }
};

updateStarshipCountAdd = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCount = await starshipService.updateStarshipCountAdd(id, quantity);
    res.json({ message: 'Inventario actualizado', count: updatedCount });
  }  catch (error) {
    const statusCode = error.response.status|| 500;
       res.status(statusCode).json({ 
           message: 'Error al actualizar el inventario',
           error: error.response.statusText});
     }
};

updateStarshipCountSubtract = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCount = await starshipService.updateStarshipCountSubtract(id, quantity);
    res.json({ message: 'Inventario actualizado', count: updatedCount });
  }  catch (error) {

    const statusCode = error.response.status|| 500;
       res.status(statusCode).json({ 
           message: 'Error al actualizar el inventario',
           error: error.response.statusText});
     }
};


module.exports = {
  getStarshipWithCount,
  setStarshipCount,
  updateStarshipCountAdd,
  updateStarshipCountSubtract
}
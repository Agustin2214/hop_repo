const { Router } = require('express')

const  starshipController  = require('../controllers/starshipController')
const VehiclesController = require('../controllers/vehiclesController')
const {validateCount, validateId, validateQuantity} = require('../middelware/validateMiddelware')
const router = Router()
//Starships
router.get('/starships/:id',[validateId],(req, res) => starshipController.getStarshipWithCount(req, res));
router.put('/starships/:id',[validateId, validateCount] ,(req, res) => starshipController.setStarshipCount(req, res));
router.put('/starships/:id/add',[validateId, validateQuantity],(req, res) => starshipController.updateStarshipCountAdd(req, res));
router.put('/starships/:id/subtract',[validateId, validateQuantity], (req, res) => starshipController.updateStarshipCountSubtract(req, res));

//Vehicles
router.get('/vehicles/:id', [validateId],(req, res) => VehiclesController.getVehicleWithCount(req, res));
router.put('/vehicles/:id', [validateId, validateCount],(req, res) => VehiclesController.setVehicleCount(req, res));
router.put('/vehicles/:id/add', [validateId, validateQuantity],(req, res) => VehiclesController.updateVehicleCountAdd(req, res));
router.put('/vehicles/:id/subtract',[validateId, validateQuantity], (req, res) => VehiclesController.updateVehicleCountSubtract(req, res));



module.exports = router
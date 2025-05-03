import express from 'express'
import { getCars, addCar, getCar, deleteCar, updateCar} from '../controllers/car.mongo.controller.js'

const router = express.Router();

router.post('/', addCar);
router.get('/', getCars);
router.get('/:id', getCar)
router.put('/:id', updateCar)
router.delete('/:id', deleteCar)

export default router;
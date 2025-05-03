import express from 'express'
import {getCars, getCar, addCar, deleteCar, updateCar} from '../controllers/car.controller.js'

const router = express.Router()

router.get('/', getCars);
router.get('/:id', getCar)
router.post('/', addCar)
router.delete('/:id', deleteCar)
router.put('/:id', updateCar)

export default router;
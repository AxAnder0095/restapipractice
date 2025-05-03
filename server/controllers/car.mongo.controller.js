import Car from "../models/cars.model.js";
import mongoose from "mongoose";

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json({ success: true, data: cars });
    } catch (error) {
        res.json({ success: false, message: 'Server Error' })
    }
};

export const getCar = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ success: false, message: 'Invalid ID' });
    }

    try {
        const car = await Car.findById(id);
        res.json({ success: true, data: car });
    } catch (error) {
        res.json({ success: false, message: 'Server Error' });
    }
};

export const addCar = async (req, res) => {
    const car = req.body;

    if (!car.make || !car.model || !car.price || !car.img) {
        return res.json({ success: false, message: 'Please enter all fields'});
    }

    const newCar = new Car(car);

    try {
        await newCar.save();
        res.json({ success: true, data: newCar });
    } catch (error) {
        res.json({ success: false, message: 'Server Error' });
    }
};

export const updateCar = async (req, res) => {
    const { id } = req.params;
    const car = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ success: false, message: 'Invalid ID' });
    };

    try {
        const updatedCar = await Car.findByIdAndUpdate(id, car, { new: true });
        res.json({ success: true, data: updatedCar });
    } catch (error) {
        res.json({ success: false, message: 'Server Error' })
    }
};

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ success: false, message: 'Cannot find car to delete' });
    }

    try {
        await Car.findByIdAndDelete(id);
        res.json({success: true, message: 'Car deleted successfully'})
    } catch (error) {
        res.json({ success: false, message: 'Server Error' });
    }
};


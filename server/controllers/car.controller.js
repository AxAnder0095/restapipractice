import { v4 as uuidv4 } from 'uuid'

// Local database
let cars = [];

// no need to use async since database is local to this pc
export const getCars = (req, res) => {
    res.json({ success: true, data: cars })
};

export const getCar = (req, res) => {
    const { id } = req.params;

    const car = cars.find((car) => car.id === id);
    if (!car) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' })
    }

    res.json({ success: true, data: car });
};

export const addCar = (req, res) => {
    const car = req.body;
    if (!car.make || !car.model, !car.price, !car.image) {
        return res.json({ success: false, message: 'Please enter all fields...' })
    }

    const newCar = { ...car, id: uuidv4() }
    cars.push(newCar);
    res.json({ success: true, data: newCar });
};

export const deleteCar = (req, res) => {
    const { id } = req.params;

    cars = cars.filter(car => car.id !== id);
    res.json({ success: true, message: 'Car deleted from database' })
};

export const updateCar = (req, res) => {
    const { id } = req.params;
    const { make, model, price } = req.body;
    const car = cars.find((car) => car.id === id);
    
    if (make) {
        car.make = make;
    }

    if (model) {
        car.model = model;
    }

    if (price) {
        car.price = price;
    }

    res.json({ success: true, message: 'Car has been updated' })
};
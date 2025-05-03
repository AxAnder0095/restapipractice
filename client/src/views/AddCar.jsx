import './AddCarStyles.sass'
import { useState } from 'react'

export const AddCar = () => {
    const [error, setError] = useState('');
    const [car, setCar] = useState({
        make: '',
        model: '',
        price: '',
        img: ''
    });

    const addCar = async () => {
        if (!car.make || !car.model || !car.price || !car.img) {
            return setError('Please enter all fields');
        }

        const res = await fetch('http://localhost:5000/api/cars',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car),
        })
        const data = await res.json();
        if(!data.success) return console.log(data.success)
        setError('');
    };


    return (
        <div className='AddCar'>
            <div className='add-wrapper'>
                <h2 style={{ textAlign: 'center', color: 'black' }}>Add a Vehice</h2>
                <span style={{ color: 'black' }}>Make</span>
                <input
                    placeholder='Make'
                    className='a-add a-input'
                    onChange={(e) => setCar({...car, make: e.target.value})}
                />
                <span style={{ color: 'black' }}>Model</span>
                <input
                    placeholder='Model'
                    className='a-add a-input'
                    onChange={(e) => setCar({...car, model: e.target.value})}
                />
                <span style={{ color: 'black' }}>Price</span>
                <input
                    placeholder='Price'
                    className='a-add a-input'
                    onChange={(e) => setCar({...car, price: e.target.value})}
                />
                <span style={{ color: 'black' }}>Image</span>
                <input
                    placeholder='Image'
                    className='a-add a-input'
                    onChange={(e) => setCar({...car, img: e.target.value})}
                />
                <span style={{ color: 'black' }}>Add Vehicle</span>
                <button className='a-add a-button' onClick={addCar}>Submit</button>
                <div className='a-error'>
                    {error ?? <p>{error}</p>}
                </div>
            </div>
        </div>
    )
};
import { CarCard } from './CarCard';
import './ShowroomStyles.sass'
import { useState, useEffect } from 'react'

export const Showroom = () => {
    const [cars, setCars] = useState();

    const getInventory = async () => {
        const res = await fetch('http://localhost:5000/api/cars');
        const data = await res.json();
        console.log(data.data);
        setCars(data.data)
      }
    
      const deleteCar = async (id) => {
        const res = await fetch(`http://localhost:5000/api/cars/${id}`, {
          method: 'DELETE',
          
        });
        const data = await res.json()
        console.log(data)
        await refreshData();
      }

      const updateCar = async (id, updatedCar) => {
        if(!updatedCar.make || !updatedCar.model || !updatedCar.price || !updatedCar.img){
          return console.log('Please provide all fields')
        }
        
        const res = await fetch(`http://localhost:5000/api/cars/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCar) // update happens here
        });
        const data = await res.json();
        if(!data.success) 
          return console.log('Vehicle was not added')

        await refreshData()
      }
    
      const refreshData = async () => {
        await getInventory();
      }
    
      useEffect(() => {
        getInventory()
      }, [])


    return(
        <div style={{padding: '1rem'}}>
            <p className='showroom-title'>SHOWROOM</p>
            <p className='showroom-desc'>Browse the available collection of our automobiles</p>
            <div className='showroom-cars' style={{marginTop: '4rem'}}>
                {cars ? cars.map((car) => (
                    <div key={car._id}>
                        <CarCard data={car} delete={deleteCar} update={updateCar} key={car._id}/>
                    </div>
                )) : <h2>No cars yet :(</h2>}
            </div>
        </div>
    )
}
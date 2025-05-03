import './CarCardStyles.sass'
import {useState} from 'react'

export const CarCard = (props) => {
    const [editID, setEditID] = useState(null);
    const [updateCar, setUpdateCar] = useState({
        make: '',
        model: '',
        price: '',
        img: ''
    });

    const make = props.data.make;
    const model = props.data.model;
    const price = props.data.price;
    const image = props.data.img;
    const id = props.data._id;

    const handleEdit = async (id, update) => {
        await props.update(id, update)
        setEditID(null)
    }

    const openEdit = (cid) => {
        setEditID(cid);
    };

    const closeEdit = () => {
        setEditID(null);
    };

    return (
        <div className='car'>
            <img className='car-image' src={image} alt={`${make} ${model} image`}/>
            <div style={{ padding: '1rem', display: 'flex'}}>
                <div style={{width: '50%'}}>
                    <h3>{make}</h3>
                    <h3>{model}</h3>
                    <h2 className='car-price'>${price}</h2>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem', width: '50%'}}>
                    <button 
                        className='edit-button' 
                        style={{height: '50%'}} 
                        onClick={() => openEdit(id)}
                        >EDIT
                    </button>
                    <button 
                        className='delete-button' 
                        style={{height: '50%'}} 
                        onClick={() => props.delete(id)}
                        >DELETE
                    </button>
                </div>
            </div>
            {editID === id && (
                <div className='edit-car'>
                <div className='edit-wrapper'>
                    <input
                        placeholder={make}
                        className='c-edit c-input'
                        onChange={(e) => setUpdateCar({...updateCar, make: e.target.value})}
                    />
                    <input
                        placeholder={model}
                        className='c-edit c-input'
                        onChange={(e) => setUpdateCar({...updateCar, model: e.target.value})}
                    />
                    <input
                        placeholder={price}
                        className='c-edit c-input'
                        onChange={(e) => setUpdateCar({...updateCar, price: e.target.value})}
                    />
                    <input
                        placeholder={image}
                        className='c-edit c-input'
                        onChange={(e) => setUpdateCar({...updateCar, img: e.target.value})}
                    />
                    <button className='c-edit c-update' onClick={() => handleEdit(id, updateCar)}>Update</button>
                    <button className='c-edit c-cancel' onClick={closeEdit}>Cancel</button>
                </div>
            </div>
            )}
        </div>
    )
};
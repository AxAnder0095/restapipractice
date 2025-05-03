import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        make: {
            type: String, 
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        }, 
        img: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const Car = mongoose.model('Car', carSchema);
export default Car;
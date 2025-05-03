import express from 'express'
import cors from 'cors'
import carRoutes from './routes/car.route.js'
import carMongoRoutes from './routes/car.mongo.route.js'
import dotenv from 'dotenv'
import {connetDB} from './config/db.js'

// Server setup-------------------------
dotenv.config();
const app = express();
const corsOptions = {
    origin: ['http://localhost:5173']
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/cars', carMongoRoutes)

const PORT = process.env.PORT;
connetDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    });
}).catch((error) => {
    console.log(`Failed to connect to MongoDB: ${error}`)
})

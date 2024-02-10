import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'

mongoose.connect(process.env.MONGO).then((conn) =>{
    console.log("Database is connected to this host :",conn.connection.host)
}).catch((err) => console.log(err))

const app = express();

app.use("/api/user", userRoutes)


app.listen(3000, () => {
    console.log("Server is running on port ",3000);
})

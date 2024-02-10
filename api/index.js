import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO).then((conn) =>{
    console.log("Database is connected to this host :",conn.connection.host)
}).catch((err) => console.log(err))

const app = express();


app.listen(3000, () => {
    console.log("Server is running on port ",3000);
})

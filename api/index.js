import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO)
    .then(() => console.log('db is connected to application'))
    .catch((err) => console.log(err))

//Express App initialization
const app = express();



//server listining
app.listen(3000,() => {
    console.log(`Server is running on port 3000`);
})
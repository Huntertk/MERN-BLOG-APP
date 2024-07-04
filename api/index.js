import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser';

mongoose.connect(process.env.MONGO)
    .then(() => console.log('db is connected to application'))
    .catch((err) => console.log(err))

//Express App initialization
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)


//global error handler
app.use((err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

//server listining
app.listen(3000,() => {
    console.log(`Server is running on port 3000`);
})
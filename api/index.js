import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

mongoose.connect(process.env.MONGO).then((conn) =>{
    console.log("Database is connected to this host :",conn.connection.host)
}).catch((err) => console.log(err))

const app = express();

//Middlewares
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const messgae = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        messgae
    })
})


app.listen(3000, () => {
    console.log("Server is running on port ",3000);
})

import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return  next(errorHandler(400, "Please Provide all Values"))
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        })

        await newUser.save();
        res.status(400).json({
            message: "User Signup Successfully",
            newUser
        })
    } catch (error) {
       next(error);
    }
}
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return next(new AppError(400,"All fields are required!!!"))
    }
    try {
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
    
        await newUser.save();
        res.status(201).json({messgae:"Signup Successful", newUser})
    } catch (error) {
        next(error)
    }
}
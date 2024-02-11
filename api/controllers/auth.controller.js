import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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
        res.status(200).json({
            message: "User Signup Successfully"
        })
    } catch (error) {
       next(error);
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    
    if(!email ||!password){
        return next(errorHandler(400, "All Feilds are required"))
    }
    try {
        const validUser = await User.findOne({email})
    
        if(!validUser){
            return next(errorHandler(400, "Invalid Credentials"))
        }
        const validPassword = await bcrypt.compare(password, validUser.password)
        
        if(!validPassword){
            return next(errorHandler(400, "Invalid Credentials"))
        }
        const token = jwt.sign({userId:validUser._id}, process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json({
            user: rest,
        })

    } catch (error) {
        next(error)   
    }
}
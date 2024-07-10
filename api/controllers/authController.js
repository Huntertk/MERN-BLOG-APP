import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
        res.status(201).json({messgae:"Signup Successful"})
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        return next(new AppError(400,"All fields are required!!!"))
    }
    
    try {
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(new AppError(401,"Wrong Credentials"))
        }
        const validPassword = await bcrypt.compare(password, validUser.password);
        if(!validPassword){
            return next(new AppError(401,"Wrong Credentials"))
        }
        const {password:pass, ...rest} = validUser._doc;

        const token = jwt.sign({id:validUser._id, isAdmin:validUser.isAdmin}, process.env.JWT_SECRET, {
            expiresIn:'1d'
        })
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000*60*60*24*1
        }).send(rest)

    } catch (error) {
        next(error)
    }
}


export const google = async (req, res, next) => {
    const {email,name, googlePhotoUrl} = req.body
    try {
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({id:user._id, isAdmin:validUser.isAdmin}, process.env.JWT_SECRET, {
                expiresIn:'1d'
            })
            const {password:pass, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000*60*60*24*1
            }).json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4), 
                email,
                password:hashedPassword,
                profilePicture:googlePhotoUrl
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {
                expiresIn:'1d'
            })
            const {password:pass, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000*60*60*24*1
            }).json(rest)
        }
    } catch (error) {
        next(error);
    }
}
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message:"All fields are required"})
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
        res.status(500).json({messgae:error.message})
    }
}
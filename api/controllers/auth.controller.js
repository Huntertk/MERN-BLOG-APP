import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res,next) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return  res.status(400).json({
                message: "Please Provide all value"
            })
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
        res.status(400).json({
            error,
            message:error.message
        })
    }
}
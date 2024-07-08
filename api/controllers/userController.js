import User from "../models/userModel.js";
import { AppError } from "../utils/error.js";
import bcrypt from 'bcryptjs';

export const text = (req, res) => {
    res.json({message:"Api is workings"})
}

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(new AppError(401, "Unauthorized"))
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(new AppError(401, "Password must be atleat 6 characters"))
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(new AppError(401, "Username must be between 7 to 20 characters"))
        }
        if(req.body.username.includes(' ')){
            return next(new AppError(401, "Username cannot contain space"))
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(new AppError(401, "Username must be in lowercase"))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(new AppError(401, "Username only contain letter and numbers"))
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password,
            },
        }, {new:true});
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)       
    }

} 
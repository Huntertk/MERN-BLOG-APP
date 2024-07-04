import jwt from 'jsonwebtoken';
import {AppError} from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(new AppError(401, "Unauthenticated"))
    }
    
    jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
        if(err){
            return next(new AppError(401, "Unauthenticated"))
        }
        req.user = user;
        next();
    })
}  
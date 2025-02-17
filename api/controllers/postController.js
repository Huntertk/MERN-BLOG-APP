import Post from "../models/postMode.js"
import { AppError } from "../utils/error.js"

export const create = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(new AppError(403, "You are not allowed to create post"))
    }
    
    if(!req.body.title || !req.body.content){
        return next(new AppError(400, "Please provide all required fields"))
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    })
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)

    } catch (error) {
        next(error)
    }
}
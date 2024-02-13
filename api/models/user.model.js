import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://res.cloudinary.com/drrkaak40/image/upload/v1707751910/user_tbngem.png"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
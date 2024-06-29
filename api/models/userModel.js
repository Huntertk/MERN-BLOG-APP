import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg"
    }

}, {timestamps:true})

const User = mongoose.model('User', userSchema);

export default User;
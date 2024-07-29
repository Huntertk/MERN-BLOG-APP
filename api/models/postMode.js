import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        unique:true
    },
    image:{
        type: String,
        default:"https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg?t=st=1722249575~exp=1722253175~hmac=329adcf192b52ac357844d3829ccdf0748b16132bffd732005349cdee25c8f1b&w=996"
    },
    category:{
        type: String,
        default: 'uncategorized',    
    },
    slug:{
        type: String,
        required: true,
        unique:true
    }
}, {timestamps: true});


const Post = new mongoose.model('Post', postSchema);

export default Post;
const mongoose = require("mongoose");

const ViewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'Post'
    },
    isLiked : {
        type: Boolean ,
        required : true
    }
});
module.exports = mongoose.model("Views" , ViewSchema)
const mongoose = require("mongoose");
const postSchema = require("./postSchema");

const videoSchema = new mongoose.Schema({
    LinkImage: {
        type : String, 
        required : true,
    },
    LinkVideo :{ 
        type : String, 
        required : true,},
}); 
const video = postSchema.discriminator("Video", videoSchema);
module.exports = {video};
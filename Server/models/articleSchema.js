const mongoose = require("mongoose");
const postSchema = require("./postSchema");

const articleSchema = new mongoose.Schema({
    LinkImage: {
        type : String, 
        required : true,
    },
    Description : {
        type: String,
        required : true,
    },
    
});
const article = postSchema.discriminator("Article", articleSchema);
module.exports = {article};

const mongoose = require("mongoose");
const postSchema = require("./postSchema");

const podcastSchema = new mongoose.Schema({
    LinkImage : {
        type : String,
    },
    LinkAudio : {
        type : String,
    }
});

const podcast = postSchema.discriminator("Podcast", podcastSchema);
module.exports= {podcast}


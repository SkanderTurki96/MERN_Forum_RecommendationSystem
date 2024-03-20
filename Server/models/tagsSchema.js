const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model("Tags" , tagsSchema);
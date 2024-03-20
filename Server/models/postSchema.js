const mongoose =  require ("mongoose");

const baseOption = {
    discriminatorKey : "Post", 
    collection: "Post", 
    timestamps : true,
};

const postSchema = new mongoose.Schema({
    Title : {
        type : String, 
        required: true,
        min: 6,
        max: 255,
        },
    Description : {
        type : String, 
        required: true,
        min: 6,
        max: 255,
    },
    DatePost : {
        type : Date,
        required: true,
    },
    IsValid: {
        type: Boolean,
        required: true,
        },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    Views:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Views'
        }
    ],
    Id_Cluster : {
        type : String, 
        min: 6,
        max: 255,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }]
}, baseOption); 

module.exports = mongoose.model("Post" , postSchema);
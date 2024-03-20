const mongoose =  require ("mongoose");

const userSchema = new mongoose.Schema({
    Firstname : {
        type: String,
        required: true,
        min: 6,
        max: 255,
        },
    Lastname : {
        type: String,
        required: true,
        min: 6,
        max: 255,
        },
    Mail: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        },
    IsValid: {
        type: Boolean,
        required: true,
        },
    PhoneNumber: {
        type: String,
        min: 6,
        max: 255,
        },
    Birthdate: {
        type: Date,
        },
    Password: {
        type: String,
        min: 6,
        max: 255,
        },
    Image: {
        type: String,
        required: true,
    },
    LastConnexion: {
        type: Date,
        required: true,
        },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    isGoogleAuth: {
        type: Boolean,
        required: true,
    },
    Preferences: [
       { type: String}
    ],
    Views:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Views'
        }
    ],
    Posts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]   
});
module.exports = mongoose.model("User" , userSchema);
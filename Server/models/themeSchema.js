const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true,
        min:6,
        max: 255,
    },
    Logo : {
        type: String,
        required: true,
        min:6,
        max: 255,
    },
    PrimaryColor : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    SecondaryColor : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    ThirdColor : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    FourthColor : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    NavigationFontSize : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    FooterText : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    FacebookLink : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    LinkedInLink : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    TwitterLink : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    YoutubeLink : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
})
module.exports = mongoose.model("Theme" , themeSchema );
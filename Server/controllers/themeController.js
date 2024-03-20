const themeSchema = require("../models/themeSchema");

exports.CreateTheme = async(req, res) => {
    var newTheme = new themeSchema({
        Name : req.body.name,
        Logo : req.body.logo,
        PrimaryColor : req.body.primary_color, 
        SecondaryColor : req.body.secondary_color,
        ThirdColor : req.body.third_color,
        FourthColor : req.body.fourth_color,
        NavigationFontSize : req.body.navigation_font_size,
        FooterText : req.body.footer_text,
        FacebookLink : req.body.facebook_link,
        LinkedInLink : req.body.linkedin_link,
        TwitterLink : req.body.twitter_link,
        YoutubeLink : req.body.youtube_link
    })
    newTheme.save().then((result) =>{
        res.status(200).send({msg:'success', newTheme})
    }).catch((error)=> {
        res.status(400).send({errors: [{error}]});
    })
}
exports.UpdateTheme = async (req, res) => {
    themeSchema.updateOne({ _id: req.params.id } , { $set: { ...req.body } }).then((result) => {
        res.status(200).send({msg: 'theme updated'});
    }).catch((error) => {
        res.status(400).send({ errors: [{ msg: error }] });
    })
}
exports.GetTheme = async(req,res) => {
    themeSchema.findOne().then((result) =>{
        res.status(200).send(result)
    } ).catch((error)=> {
        res.status(400).send({errors: [{error}]});
    })
}
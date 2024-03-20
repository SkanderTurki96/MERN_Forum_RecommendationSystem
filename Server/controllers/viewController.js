const viewsSchema = require("../models/viewsSchema");
const postSchema =require("../models/postSchema");
const userSchema = require("../models/userSchema");

exports.CheckView = async(req , res) => {
    viewsSchema.findOne({ $and: [
        { user: req.body.IdUser },
        { post: req.body.IdPost }
      ]})
    .then((result) => {
        if(result === null)
        {
            
            var View =  new viewsSchema ({
                user : req.body.IdUser,
                post : req.body.IdPost,
                isLiked : false
            })
            View.save().then((result) => {
                postSchema.findOne({_id : req.body.IdPost}).then((r) => {
                    r.Views.push(result._id);
                    r.save()
                }).catch((err) => {res.status(400).send({error : err});});
                userSchema.findOne({_id : req.body.IdUser}).then((r) => {
                    r.Views.push(result._id);
                    r.save()
                }).catch((err) => {res.status(400).send({error : err});});
                res.status(201).send({data : result});
            }).catch((err) => {
                res.status(400).send({error : err});
            })
        }else 
        {
            res.status(200).send({data : result})
        }
        
    }).catch((err) => {
        res.status(400).send({error : err});
    })
}
exports.toggleLike = async(req , res) => {
    viewsSchema.findOne({user : req.body.IdUser , post :req.body.IdPost}) 
    .then((result) => {
        console.log(result)
        result.isLiked = !result.isLiked;
        result.save();
        res.status(200).send({status : 200 , isliked : result.isLiked})
    }).catch((err) => {
        console.log(err)
         res.status(400).send({error : err});
    })
}
exports.GetAllViews = async(req,res) => {
    try 
    {
        views = await viewsSchema.find();
        likes = await viewsSchema.find({ isLiked: true });
        res.status(200).send({status : 200 , Views : views , Likes: likes })
    } catch(error) {
        res.status(400).send({err : error});
    }
    

}
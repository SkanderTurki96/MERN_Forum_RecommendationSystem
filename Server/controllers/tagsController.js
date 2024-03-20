const tagsSchema = require("../models/tagsSchema");
const post = require("../models/postSchema");
const userSchema = require("../models/userSchema");
const postSchema = require("../models/postSchema");

exports.AddTags = async (req,res) => {
    var newTag = new tagsSchema ({
        name : req.body.name,
    })
    try
    {
        newTag.save();
        res.status(200).send({msg:'tag added', newTag});
    }
    catch(error)
    {
        res.status(400).send({errors: [{error}]});
    }
}
exports.GetTags = async (req, res) => {
    try{
        const allTags = await tagsSchema.aggregate([
            {
                $project: {
                  _id: 1,
                  name: 1,
                  postCount: { $size: '$posts' }
                }
              },
              {
                $sort: {
                  "postCount": -1  // Sort in descending order based on the number of posts
                }
              }
          ]);
        res.status(200).send({msg : 'Success', allTags });
    } catch (error)
    {
        console.log(error)
        res.status(400).send({msg : error});
    }
}
exports.GetTag = async (req, res) => {
    try {
        if(req.params.tags === 'empty')
        {
          const posts = await postSchema.find();
            const updatedPosts = await Promise.all(
                posts.map(async (post) => {
                    const updatedTags = await Promise.all(
                        post.tags.map(async (tagId) => {
                        const tag = await tagsSchema.findById(tagId).lean();
                        return tag;
                        })
                    ); 
                    const user = await userSchema.findById(post.User).lean();
                return { ...post.toObject(), tags: updatedTags, User : user };
                })
            );
            res.status(200).send({msg : 'tag', data: updatedPosts});
        }else
        {
          const tags = req.params.tags.split(',').map(tag => tag.toLowerCase());
          const tag = await tagsSchema.aggregate([
            {
              $match: { name: { $in: tags } }
            },
            {
              $lookup: {
                from: 'Post',
                localField: 'posts',
                foreignField: '_id',
                as: 'tagPosts'
              }
            },
            {
              $project: {
                tagPosts: 1 
              }
            },
            
            {
                $group: {
                    _id: null,
                  tags: { $push: "$tagPosts" } 
                }
              },
              {
                $project: {
                    _id: 0,
                    tags: { $reduce: { input: "$tags", initialValue: [], in: { $concatArrays: ["$$value", "$$this"] } } }
                }
              }
          ]);
          const updatedPosts = await Promise.all(
            tag[0].tags.map(async (post) => {
                const updatedTags = await Promise.all(
                    post.tags.map(async (tagId) => {
                    const tag = await tagsSchema.findById(tagId).lean();
                    return tag;
                    })
                ); 
                const user = await userSchema.findById(post.User).lean();
            return { ...post, tags: updatedTags, User : user };
            })
          );
        res.status(200).send({msg : 'tag', data: updatedPosts});}
    } catch (err)
    {
        console.log(err)
        res.status(400).send({msg : error})
    }
}

exports.DeleteTag = async (req, res) => {
    try {
        await tagsSchema.deleteOne({ name : req.params.name });
        res.status(200).send({msg : 'tag deleted'});
    } catch 
    {
        res.status(400).send({msg : error});
    }
}
exports.AddPostToTags = async (req , res) => {
    try {
        const tag = req.body ;
        const pos = post.find({ _id : req.params.id });
        //await post.updateOne({ _id: pos._id }, { $push: { tags: tag._id } });
        await tagsSchema.updateOne({ _id: tag._id }, {$push: {posts: pos._id}});
        res.status(200).send({msg : 'post added to tag'});
    }catch (error)
    {
        console.log(error)
        res.status(400).send({msg : error});
    }
}
exports.GetTagById = async (req, res) => {
    try {
        const tag = await tagsSchema.findOne({ _id : req.params.id });
        res.status(200).send({msg : 'tag', tag});
    } catch 
    {
        res.status(400).send({msg : error})
    }
}
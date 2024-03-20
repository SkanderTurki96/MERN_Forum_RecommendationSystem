const postSchema =require("../models/postSchema");
const userSchema = require("../models/userSchema");
const { article } = require("../models/articleSchema");
const {video} = require ('../models/videoSchema');
const {podcast} = require("../models/podcastSchema");
const tagsSchema = require("../models/tagsSchema");
const viewsSchema = require("../models/viewsSchema");
const kmeans = require('node-kmeans');
const math = require('mathjs');




exports.CreatePost = async (req , res) => {
    const data = req.body;
    console.log(data)
    const Author = await userSchema.findById(data.IdUser);
    if(data.Type === "Article")
    {
       var newPost =  new article ({
        Title : data.Title ,
        Description : data.Description, 
        LinkImage : data.LinkImage,
        DatePost : Date.now(),
        User : Author._id ,
        IsValid : false
    })
    }
    else if (data.Type === "Video")
    {
        var newPost =  new video ({
            Title : data.Title ,
            Description : data.Description, 
            LinkImage : data.LinkImage,
            LinkVideo : data.LinkVideo,
            DatePost : Date.now(),
            User : Author._id ,
            IsValid : false
        })
    }else 
    {
        var newPost =  new podcast ({
            Title : data.Title ,
            Description : data.Description, 
            LinkImage : data.LinkImage,
            LinkAudio : data.LinkAudio,
            DatePost : Date.now(),
            User : Author._id ,
            IsValid : false
        })
    }
    Promise.all(
        data.tags.map((tag) => {
            return new Promise((resolve, reject)  => {
                tagsSchema.findOne({name : tag}).then(async (t)  => {
                    if( t == null) 
                    {
                        var newTag = new tagsSchema({
                            name : tag
                        });
                        newTag.posts.push(newPost._id);
                        newTag.save().then( () =>{
                            resolve(newPost.tags.push(newTag));
                        })
                    }
                    else {
                        t.posts.push(newPost._id);
                        t.save().then(() => {
                            resolve(newPost.tags.push(t));
                         })
                        
                    }
                })
            })
        }) 
        ).then( async ()  => {
            newPost.save();
            Author.Posts.push(newPost._id);
            Author.save();
            res.status(200).send({msg: 'Uploaded successfully', post : newPost , status: 200});
        }).catch((error) => {res.status(401).send({ errors:  error  });})
}
exports.ValidatePost = async(req, res) => {
    
        postSchema.findById(req.params.id).then((post)  => {
            post.IsValid = true ;
            post.save();
            res.status(200).send({status:200 , updatedPost : post})
        }).catch((error) => {res.status(401).send({ errors:  error  });})
} 
exports.DeletePost = async(req, res) => {
    try{
        const post = await postSchema.findOne({_id : req.params.id});
        post.tags.map(async (tagId) => {
            const tag = await tagsSchema.findOne({_id : tagId})
            let index =tag.posts.indexOf(post._id);
            if (index !== -1) {
                tag.posts.splice(index, 1);
                tag.save();
            }
        })
        userSchema.findOne({_id : post.User}).then((user) => {
            let index =user.Posts.indexOf(post._id);
            if (index !== -1) {
                user.Posts.splice(index, 1);
                user.save();
            }
        })
        await viewsSchema.deleteMany({post : post._id});
        const res = await postSchema.deleteOne({_id : post._id})
        res.status(200).send({status: 200, res })
        console.log(post)
    }
    catch (err)   {
        res.status(400).send({status: 400, err })
    }
}
exports.getall = async(req , res) => { 
    postSchema.find().then(async(posts) => {
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
      
          res.status(200).send({ msg: "success", data: updatedPosts , status: 200});
    }).catch((err) => {
        res.status(400).send({error : err})
    })
}
exports.getOne = async(req , res) => {
    postSchema.findOne({_id : req.params.id})
    .then( async (result) => {
        const ViewsNumber =await viewsSchema.find({post : result._id}).count();
        const LikeNumber = await viewsSchema.find({post : result._id , isLiked : true}).count();
        const updatedPost = await Promise.all(
            result.tags.map(async (tagId) => {
                const tag = await tagsSchema.findById(tagId).lean();
                return tag;
            })
        );
        const user = await userSchema.findById(result.User).lean();
        const obj = {
            post : { ...result.toObject(), tags: updatedPost, User: user },
            ViewsNumber :ViewsNumber,
            LikeNumber : LikeNumber
        }
        res.status(200).send({status : 200 , data : obj})
    }).catch((err) => {
        res.status(400).send({error : err})
    })
} 
//************************************ Training  */
exports.train = async (req,res) => {
    try {
        const data = await postSchema.aggregate([
            {
                $lookup: {
                    from: "tags",
                    localField: "tags",
                    foreignField: "_id",
                    as: "tagsdata"
                }
            },
            {
                $project: {
                _id: 1,
                tags: "$tagsdata.name",
                Id_Cluster: null
                }
            }
        ])
        // Extract unique tags
        const uniqueTags = Array.from(new Set(data.flatMap(entry => entry.tags)));

        // Convert tags to numerical vectors
        const vectors = data.map(entry => {
            const vector = uniqueTags.map(tag => entry.tags.includes(tag) ? 1 : 0);
            return vector;
        });
        // Perform k-means clustering
        const result  =await kmeans.clusterize(vectors, { k: 6 }, (err, result) => {
            if (err) console.error(err);
            else return result
        }); 
        const clusters = result.groups.map(cluster => ({
            centroid: cluster.centroid,
            clusterId: cluster.centroidIndex, // Use centroidIndex as the cluster ID
            dataPoints: cluster.clusterInd.map(index => data[index]), // Extract data points belonging to the cluster
        }));
        clusters.map((cluster) => {
            cluster.dataPoints.map(post => {
                postSchema.findOne({_id : post._id}).then((newPost) => {
                    newPost.Id_Cluster = cluster.clusterId;
                    console.log(newPost);
                    newPost.save();
                }).catch((err) => {
                    res.status(400).send({msg : err})
                })
            })
        })
    res.status(200).send({msg: "200"});
    } catch (err) {
        res.status(401).send({msg : err})
    }
}
exports.recomondedPost = async(req,res) => {
    try {
        const Post = await postSchema.findOne({_id : req.params.id});
        postSchema.find().then(async(posts) => {
            const data = await Promise.all(
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
            const recomended = data.filter(entry => entry.Id_Cluster === Post.Id_Cluster && entry._id !== Post._id)
            res.status(200).send({status : 200 , data : recomended})
        }).catch((err) => {
            res.status(400).send({error : err})
        })
    }catch (err) {
        res.status(401).send({status : 401 , data : err})
    }
    
} 


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePost, GetAllPost, ValidatePost } from "../../Redux/actions/posts";
import "./PendingPosts.css";



function PendingPosts () {
    const [updates , setupdates] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllPost());

    }, [dispatch, updates])
    const AllPost = useSelector((state) => state.postReducer.AllPost);

    const handleDeletePost = (postId) => {
        dispatch(DeletePost(postId));
        setupdates(updates+1)
        alert('Post deleted successfully!');
    };


    const handleValidatePost = (postId) => {
        dispatch(ValidatePost(postId));
        setupdates(updates+1)
        alert('Post validated successfully!');
    };
    console.log(AllPost)
    return(
        <div className="PendingPosts">
            {AllPost.length !==0 ? AllPost.map((post) => 
                post.IsValid === false ? 
                <div key={post._id} className="PostCard">
                    <div className="Media">
                        {
                        post.Post === "Article" ? 
                            <img src={post.LinkImage} alt="" />:
                            post.Post === "Video" ?
                            <div className="video">
                                <img src={post.LinkImage} alt="" />
                                <video src={post.LinkVideo} alt="" controls />
                            </div>
                            :<div className="audio">
                                <img src={post.LinkImage} alt="" />
                                
                                <audio controls>
                                    <source src={post.LinkAudio} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>

                            </div>
                        }
                    </div>
                    <div className="Info">
                        <div className="Info1">
                            <span className="Title">{post.Title}</span>
                            <div className="tags">
                            {
                                post.tags.map((tag) => 
                                <span className="tag">#{tag.name}</span>
                                )
                            }
                            </div>
                            
                            <span className="Description">{post.Description}</span>
                        </div>
                        <div className="Info2">
                            <button className="Accept" onClick={() => handleValidatePost(post._id)}><ion-icon name="checkmark-outline "></ion-icon> Accept</button>
                            <button className="Reject" onClick={ () =>  handleDeletePost(post._id)}><ion-icon name="close-outline"></ion-icon> Reject</button>
                        </div>
                        
                    
                    </div>
                    
                </div> : null
            ) : null

            }
        </div>
    )

}
export default PendingPosts;
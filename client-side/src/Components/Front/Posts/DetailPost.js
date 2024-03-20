import React, { useEffect, useState } from "react";
import './DetailPost.css'
import { useDispatch, useSelector } from "react-redux";
import { CheckView, ToggleLike } from "../../../Redux/actions/posts";

function DetailPost (props) {
    const dispatch = useDispatch();
    const [ViewData , SetViewData] = useState({
        IdUser : "",
        IdPost : ""
    })
    const [IsLiked , SetIsLiked] = useState(null);
    useEffect(() => {
        SetViewData({
            IdUser : props.user._id,
            IdPost : props.data.post._id
        })
        
        
    },  [props.data.post._id]
    );
    useEffect(() => {
        if (ViewData.IdPost !== "" && ViewData.IdUser !=="") 
        {
            dispatch(CheckView(ViewData))
        }
    },[ViewData]);
    const view_data = useSelector((state) => state.postReducer.view_data);
    const Liked = useSelector((state) => state.postReducer.is_liked);
    const handleLike = () => {
        dispatch(ToggleLike({ IdUser: props.user._id, IdPost: props.data.post._id }))
    } 
    useEffect(() => {
        if(view_data )
        {
            SetIsLiked( view_data.isLiked);
        }
    },[view_data])
   
    useEffect(() => {
        if(Liked.status === 200)
        {
            SetIsLiked(Liked.isliked);
        }  
    },[Liked ])
    return (
        <div className="Detail_Content">
            <div className="DetailPost">
                <img src={props.data.post.LinkImage} alt="" />
                <div className="Info_Post">
                    <div className="Header">
                        <div className="Author">
                            <img src={props.data.post.User.Image} />
                            <span>{props.data.post.User.Firstname} {props.data.post.User.Lastname}</span>
                        </div>
                        <div className="Tags">
                            {props.data.post.tags.map((t) =><span key={t._id} className="Tag">#{t.name}</span> )}
                        </div>
                    </div>
                    <div className="Content">
                        <span className="Title">{props.data.post.Title}</span>
                        <span className="Description">{props.data.post.Description}</span>
                    </div>
                    <div className="footer">
                            <div className="box1">
                                <span className="Comments">{props.data.LikeNumber} Likes</span>
                                <span className={IsLiked === true ? "isliked true" : "isliked"} onClick={handleLike}><ion-icon name="heart-outline" className={IsLiked === true ? "isliked true" : "isliked"} onClick={handleLike}></ion-icon></span>
                            </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default DetailPost;
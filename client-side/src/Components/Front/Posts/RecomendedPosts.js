import React, { useEffect } from "react";
import "./RecomendedPosts.css";
import { useDispatch, useSelector } from "react-redux";
import { GetRecomended } from "../../../Redux/actions/posts";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function RecomendedPosts (props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetRecomended(props.data))
    },[])
    const data = useSelector((state) => state.postReducer.Recomended);
    console.log(data)
    return(
        <div className="RecomendedPosts">
            <div className="title">
                <span>Similar to this post</span> 
            </div>
            <div className="list">
                {data && data.length !== 0 ? 
                    data.map((post) => 
                        <div className="box" onClick={() => {navigate(`/Post/${post._id}`);window.location.reload();}}>
                            <div className="desc">
                                <div className="DetailHeader">
                                    <div className="Author">
                                        <img src={post.User.Image} alt="empty" />
                                        <span>{post.User.Firstname} {post.User.Lastname}</span>
                                    </div>
                                    <div className="Tags">
                                        {post.tags.map((t) =><span key={t._id} className="Tag">#{t.name}</span> )}
                                    </div>
                                </div>
                                <span className="Title">{post.Title}</span>
                                <div className="InfoWrapper">
                                    <span className="Views">{post.Views.length} Views</span>
                                    <span>{moment(post.DatePost).format('DD MMMM YYYY') }</span>
                                </div>
                            </div>
                            <div className="image">
                                <img src={post.LinkImage} alt="" />
                            </div>
                        </div>
                    )
                    :null
                }
            </div>
            
        </div>
    );
}
export default RecomendedPosts;
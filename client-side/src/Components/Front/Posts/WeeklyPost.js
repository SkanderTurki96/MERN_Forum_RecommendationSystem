import React, { useEffect } from "react";
import './WeeklyPost.css';
import moment from "moment";
import { useDispatch } from "react-redux";
import { getTagById } from "../../../Redux/actions/tags";
import { useNavigate } from "react-router-dom";


function WeeklyPost (props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const displayTag = (tagId) => {
        dispatch(getTagById(tagId))
    }
    const handleclick = () => {
        props.handleLoginClick();
        alert("You need to connect before, Thank you :)")
    }
    return(
        <div className="TrendingContainer">
            
            
                <div className="ListTrending">
                    {props.data.map((post, index) =>
                        <div key={post._id} className={index ===1 ? "box middle" : "box"} onClick={() => {handleclick() }}>
                            <img className="Image" src={post.LinkImage} alt="" />
                            <span className="Type">{post.Post}</span>
                            <span className="Title">{post.Title}</span>
                            <div className="Tags">
                                {post.tags.map((t) =><span key={t._id} className="Tag">#{t.name}</span> )}
                            </div>
                            <div className="InfoWrapper">
                                <span className="Views">{post.Views.length} Views </span>
                                <span className="Date"><ion-icon name="calendar-outline"></ion-icon>{moment(post.DatePost).format('DD MMMM YYYY') }</span>
                            </div>
                        </div>
                    )}
                </div>
                
        </div>
    );
}
export default WeeklyPost;
import React from "react";
import './DisplayPosts.css';
import moment from "moment";
import { useNavigate } from "react-router-dom";
function DisplayPosts (props) {
    const navigate = useNavigate();

    const handleclick = (id) => {
        if (props.isAuth === true)
        {
            navigate(`/Post/${id}`);
        }
        else {
            props.handleLoginClick();
            alert("You need to connect before, Thank you :)")
        }
    } 
    return(
        <div className="ListPosts">
            {props.data && props.data.map((post) => 
                post.IsValid === true ? 
                <div key={post._id} className="cardPost" onClick={() => { handleclick(post._id)}}>
                    <div className="Details">
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
                        <span className="Description">{post.Description}</span>
                        <div className="InfoWrapper">
                                <span className="Views">{post.Views.length} Views</span>
                                <span>{moment(post.DatePost).format('DD MMMM YYYY') }</span>
                        </div>
                    </div>
                    <img className="Image" src={post.LinkImage} />
                </div>: null
            )}
        </div>
    );
}
export default DisplayPosts;
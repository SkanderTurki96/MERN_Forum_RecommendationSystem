import React from "react";
import "./BestAuthor.css";


function BestAuthor (props) {

    return(
        <div className="BestAuthor">
            <span className="Title">Popular author</span>
            {props.data.slice(0,3).map((user) => 
                <div key={user._id} className="AuthorCard">
                    <img src={user.user.Image}  alt=""/>
                    <div className="AuthorInfo">
                        <span className="Title">{user.user.Firstname} {user.user.Lastname}</span>
                    </div>
                    
                </div>
            )}
        </div>
    );
}
export default BestAuthor;
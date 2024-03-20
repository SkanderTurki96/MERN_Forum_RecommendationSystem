import React from "react";
import "./PopularTags.css"

function PopularTags(props) {
    
    return(
        <div className="TagsContent">
            <span className="Title">PopularTags</span>
            <div className="PopularTags">
                {
                    Array.isArray(props.tags) && props.tags.slice(0, 6).map((tag) => 
                        <span key={tag._id} className="tag">{tag.name}</span>
                    )
                }
            </div>
        </div>
    );
}
export default PopularTags;
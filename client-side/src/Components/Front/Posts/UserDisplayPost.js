import React, { useState } from "react";
import "./UserDisplayPost.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPost } from "../../../Redux/actions/posts";
import { useEffect } from "react";
import DisplayPosts from "./DisplayPosts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getTag } from "../../../Redux/actions/tags";

function UserDisplayPost (props) {
    const dispatch = useDispatch();
    const [tabvalue , settablevalue] = useState(-1);
    const handletabchange = (e) =>  {
        settablevalue(parseInt(e.target.value, 10));
    }
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 90) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    /****************************** */
    useEffect(() => {
        
    }, [dispatch]);
    useEffect(() => {
      if(tabvalue === -1)
      {
        dispatch(getTag([props.preferences]));
      }else 
      {
        dispatch(getTag([props.tags[tabvalue].name]));
      }
    },[tabvalue])
    const AllPost = useSelector((state) => state.tagReducer.tag);
    
    return(
        <div className="UserDisplayPost">
            <div className={`tab-box ${scrolled ? 'scrolled' : ''}`}>
                <button onClick={handletabchange} className={tabvalue === -1 ? "tab-btn active" :"tab-btn"} value={-1}>For you</button>
                {
                  props.tags.slice(0,7).map((tag , index) => 
                  <button key={index} onClick={handletabchange} className={tabvalue === index ? "tab-btn active" :"tab-btn"} value={index}>{tag.name}</button>
                  )
                }
            </div>
            <div className="content">
                {
                    AllPost && AllPost.length !== 0 ?
                                <DisplayPosts data={AllPost} isAuth={true} />:
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                
                }
            </div>
            
        </div>
    );
}
export default UserDisplayPost;
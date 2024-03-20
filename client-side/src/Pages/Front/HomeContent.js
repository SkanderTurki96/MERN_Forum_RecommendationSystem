import React from "react";
import { useEffect, useState } from "react";
import {GetAllPost} from "../../Redux/actions/posts"
import { useDispatch, useSelector } from "react-redux";
import WeeklyyPost from "../../Components/Front/Posts/WeeklyPost";

import Box from '@mui/material/Box';
import './HomeContent.css';
import DisplayPosts from "../../Components/Front/Posts/DisplayPosts";
import UserDisplayPost from "../../Components/Front/Posts/UserDisplayPost";
import PopularTags from "../../Components/Front/Home/PopularTags";
import BestAuthor from "../../Components/Front/Home/BestAuthor";
import SignUpFlow from "../../Components/Front/Auth/SignUpFlow";
import Skeleton from '@mui/material/Skeleton';
import { Popular_Users } from "../../Redux/actions/user";
import Footer from "../../Components/Front/Home/Footer";
import { getTags } from "../../Redux/actions/tags";
const sortByViews = (a, b) => {
    console.log(a.Views.length)
    return b.Views.length - a.Views.length  ;
  };
function HomeContent (props) {
    const [scrolled, setScrolled] = useState(false);
    const [scrolled2 , setScrolled2] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 650) {
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
      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 90) {
            setScrolled2(true);
          } else {
            setScrolled2(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllPost());
        dispatch(Popular_Users());
        dispatch(getTags());
    }, [dispatch]);
    const Tags = useSelector((state) => state.tagReducer.tags);
    const AllPosts = useSelector((state) => state.postReducer.AllPost);
    const PopularUsers = useSelector((state) => state.userReducer.popularUser);
    //const sorted = AllPosts.sort(sortByViews);
    return(
        <div className="Home-content">
            {!props.isAuth ?
            AllPosts.length !== 0  ?
                <WeeklyyPost data={AllPosts.sort(sortByViews).slice(0,3)} handleLoginClick={props.handleLoginClick}/>:
                <div className="WeeklyLoading">
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton variant="rectangular" width={400} height={350} />
                        <Skeleton width={400} height={50} />
                        <Skeleton width={400} height={50}/>
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton variant="rectangular" width={400} height={350} />
                        <Skeleton width={400} height={50} />
                        <Skeleton width={400} height={50}/>
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton variant="rectangular" width={400} height={350} />
                        <Skeleton width={400} height={50} />
                        <Skeleton width={400} height={50}/>
                    </Box>
                </div>
                : null}
            {!props.isAuth ?
            <div className="Content">
                <div className="DisplayPosts">
                    {AllPosts.length !== 0 ?
                        <DisplayPosts data={AllPosts} isAuth={false} handleLoginClick={props.handleLoginClick} />:
                        <div className="DisplayPostsLoading">
                            <div className="box">
                                <Skeleton variant="rectangular" width={300} height={200} />
                                <div>
                                <Skeleton width={400} height={100} />
                                <Skeleton width={400} height={100}/>
                                </div>
                               
                            </div>
                            <div className="box">
                                <Skeleton variant="rectangular" width={300} height={200} />
                                <div>
                                <Skeleton width={400} height={100} />
                                <Skeleton width={400} height={100}/>
                                </div>
                               
                            </div>
                            <div className="box">
                                <Skeleton variant="rectangular" width={300} height={200} />
                                <div>
                                <Skeleton width={400} height={100} />
                                <Skeleton width={400} height={100}/>
                                </div>
                               
                            </div>
                        </div>
                    }
                </div>
                <div className={`secondPart ${scrolled ? 'scrolled' : ''}`}>
                    <PopularTags tags={Tags}/>
                    {
                        PopularUsers.length !== 0  ? <BestAuthor data={PopularUsers} /> :
                        <div className="AuthorLoading">
                            <div className="AuthorBoxLoading">
                                <Skeleton variant="circular" width={60} height={60} />
                                <Skeleton width={300} height={100} />
                            </div>
                            <div className="AuthorBoxLoading">
                                <Skeleton variant="circular" width={60} height={60} />
                                <Skeleton width={300} height={100} />
                            </div>
                            <div className="AuthorBoxLoading">
                                <Skeleton variant="circular" width={60} height={60} />
                                <Skeleton width={300} height={100} />
                            </div>
                        </div>
                    }
                    <Footer theme={props.theme}/>
                </div>
            </div>:
            <>
                 {!props.user.IsValid ?
                <SignUpFlow user={props.user}/>  
                : null}
                <div className="ContentConnected">
                    <div className="DisplayPosts">
                       { AllPosts.length !== 0 ?
                       <UserDisplayPost tags={Tags} preferences={props.user.Preferences} /> :
                       <div className="DisplayPostsLoading">
                            <div className="box">
                                <Skeleton variant="rectangular" width={300} height={200} />
                                <div>
                                <Skeleton width={400} height={100} />
                                <Skeleton width={400} height={100}/>
                                </div>
                               
                            </div>
                            <div className="box">
                                <Skeleton variant="rectangular" width={300} height={200} />
                                <div>
                                <Skeleton width={400} height={100} />
                                <Skeleton width={400} height={100}/>
                                </div>
                               
                            </div>
                            <div className="box">
                                <Skeleton variant="rectangular" width={300} height={200} />
                                <div>
                                <Skeleton width={400} height={100} />
                                <Skeleton width={400} height={100}/>
                                </div>
                               
                            </div>
                        </div>
                       }   
                    </div>
                    <div className={`secondPart ${scrolled2 ? 'scrolled' : ''}`}>
                    <PopularTags tags={Tags}/>
                    {
                        PopularUsers.length !== 0  ? <BestAuthor data={PopularUsers} /> :
                        <div className="AuthorLoading">
                            <div className="AuthorBoxLoading">
                                <Skeleton variant="circular" width={60} height={60} />
                                <Skeleton width={300} height={100} />
                            </div>
                            <div className="AuthorBoxLoading">
                                <Skeleton variant="circular" width={60} height={60} />
                                <Skeleton width={300} height={100} />
                            </div>
                            <div className="AuthorBoxLoading">
                                <Skeleton variant="circular" width={60} height={60} />
                                <Skeleton width={300} height={100} />
                            </div>
                        </div>
                    }
                    <Footer theme={props.theme}/>
                </div>
                </div>
            </> 
            
            }
        </div>
    );
}
export default HomeContent ;
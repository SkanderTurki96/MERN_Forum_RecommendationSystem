import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../Redux/actions/user";
import {Createpost} from "../../Redux/actions/posts"
import { getTheme } from "../../Redux/actions/theme";
import LoginForm from "../../Components/Front/Auth/LoginForm";
import "./CreatePost.css";
import Appbar from "../../Components/Front/Home/Appbar";
import TypePicker from '../../Components/Front/CreatePost/TypePicker';
import Details from '../../Components/Front/CreatePost/Details';
import Uploads from '../../Components/Front/CreatePost/Uploads';
import Success from "../../Components/Front/CreatePost/Success";

function CreatePost() {
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const [isDone , setIsDone] = useState(false);
    
    const [isShowLogin, setIsShowLogin] = useState(false);

    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
    };
    useEffect(() => {
        dispatch(currentUser());
        dispatch(getTheme());
    }, [dispatch]);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
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
    const [step , setStep] = useState(0);
    const [post , setPost] = React.useState({
        Title : "",
        tags:[],
        Description : "",
        LinkImage : "",
        LinkAudio : "",
        LinkVideo: "",
        Type : "" ,
        IdUser : ""
    })
    const handlestep = (e) => {
        setStep(step + 1)
    }
    const handlestepdown = (e) => {
        setStep(step - 1)
    }
    const handleType = (data) => {
        setPost({...post, Type: data})
    }
    const handleDetails = (data) => {
        setPost({
            ...post,
            Title : data.Title, 
            tags : data.Tags,
            Description : data.Description,
            IdUser : user._id
        })
    }
    const handleUploads = (data) => {
        if(data.LinkVideo === "" && data.LinkAudio === "") 
        {
            setPost({
                ...post,
                LinkImage : data.LinkImage,
            })
            setIsDone(true);
        } else if( data.LinkVideo === "" )
        {
            setPost({
                ...post,
                LinkImage : data.LinkImage,
                LinkAudio: data.LinkAudio
            })
            setIsDone(true);
        }else {
            setPost({
                ...post,
                LinkImage : data.LinkImage,
                LinkVideo: data.LinkVideo
            })
            setIsDone(true);
        }
    }
    useEffect(() => {
        if(isDone === true)
        {
        dispatch(Createpost(post));}
    }, [isDone]);

    const CreatedPost = useSelector((state) => state.postReducer.post_created );
    useEffect(() => {
        console.log(CreatedPost.status)
        if(CreatedPost.status === 200)
        {
            setStep(step + 1);
        }
    }, [CreatedPost]);
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const user = useSelector((state) => state.userReducer.user);
    const theme = useSelector((state) => state.themereducer.theme);
    return(
        <>
            {isAuth ? 
                <div className="LoggedIn">
                    <Appbar isAuth={isAuth} user={user} handleLoginClick={handleLoginClick} theme={theme}/>
                    <div className='post-container'>
                        <div className='step-wizard'>
                            <ul className='step-wizard-list'>
                                <li className={ step == 0 ? 'step-wizard-item current-item' : 'step-wizard-item'}>
                                    <span className='progress-count'>1</span>
                                    <span className='progress-label'>Type</span>
                                </li>
                                <li className={ step == 1 ? 'step-wizard-item current-item' : 'step-wizard-item'}>
                                    <span className='progress-count'>2</span>
                                    <span className='progress-label'>Details</span>
                                </li>
                                <li className={ step == 2 ? 'step-wizard-item current-item' : 'step-wizard-item'}>
                                    <span className='progress-count'>3</span>
                                    <span className='progress-label'>Uploads</span>
                                </li>
                                <li className='step-wizard-item'>
                                    <span className='progress-count'>4</span>
                                    <span className='progress-label'>Success</span>
                                </li>
                            </ul>    
                        </div>
                        <div className='create-post-box'>
                        {
                            step === 0 ? <TypePicker  
                                            handlestep={handlestep} 
                                            sendDataToParent={handleType}
                                            data={post}
                                            /> :
                            step ===1 ?  <Details 
                                            handlestep={handlestep} 
                                            handlestepdown={handlestepdown} 
                                            sendDataToParent={handleDetails}
                                            data={post}
                                            /> :
                            step ===2 ?  <Uploads 
                                            handlestep={handlestep} 
                                            handlestepdown={handlestepdown} 
                                            sendDataToParent={handleUploads}
                                            data={post}
                                            /> :
                                        <Success 
                                            data={CreatedPost}
                                            />
                        }
                        </div>
                    </div>
                </div>:
                <div className="NotLoggedIn">
                    <div className={`NavBar ${scrolled ? 'scrolled' : ''}`}>
                        <img src="https://res.cloudinary.com/turkiskander/image/upload/v1700613104/Internship/Assets/LogoTest_x9oddp.png" alt="NoImage" />
                        <div className="buttons">
                            <button className="signIn" onClick={handleLoginClick}>SignIn</button>
                            <button className="signUp" onClick={handleLoginClick}>SignUp</button>
                        </div>
                    </div>
                    <LoginForm isShowLogin={isShowLogin}  handleLoginClick={handleLoginClick} theme={theme}/>
                    <div className="Container">
                        <img src="https://res.cloudinary.com/turkiskander/image/upload/v1704334400/Internship/Media/Lamp1_dh9c9x.jpg" alt="No Image" />
                        <div className="Text">
                            <span className="t1">👋 Welcome to {theme.Name} !</span>
                            <span className="t2">We're thrilled to see you here, exploring the vibrant discussions and valuable content our community has to offer. However, to unlock the full potential of {theme.Name}, we invite you to join our growing family by creating an account.</span>
                        </div>
                    </div>
                    <div className="Container">
                        <div className="Text">
                            <span className="t1">🌐 Why Create an Account?</span>
                            <span className="t2"><span>Engage and Connect:</span> Participate in conversations, share your insights, and connect with like-minded individuals passionate about your topics.</span>
                            <span className="t2"><span>Personalized Experience:</span> Customize your profile, tailor your feed, and receive recommendations based on your interests.</span>
                            <span className="t2"><span>Stay Updated:</span> Get notified about the latest posts, replies, and announcements that matter to you.</span>
                            <span className="t2"><span>Build Your Reputation:</span> Showcase your expertise, gain recognition, and become an integral part of our community.</span>
                        </div>
                        <img src="https://res.cloudinary.com/turkiskander/image/upload/v1704336089/Internship/Media/Clavier1_ib9fyb.jpg" alt="No Image" />
                    </div>
                    <div className="Container">
                        <img src="https://res.cloudinary.com/turkiskander/image/upload/v1704336654/Internship/Media/join_yrdh8a.jpg" alt="No Image" />
                        <div className="Text">
                            <span className="t1">🚀 Join Us Today:</span>
                            <span className="t2">Don't miss out on the fantastic discussions and connections waiting for you at [Your Forum Name]. Click the "Create an Account" button now and embark on a journey of knowledge, collaboration, and community!</span>
                        </div>
                    </div>
                </div>

            }
        </>
    );
}
export default CreatePost ;
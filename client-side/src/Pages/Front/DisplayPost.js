import React , { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPostById } from "../../Redux/actions/posts";
import DetailPost from "../../Components/Front/Posts/DetailPost"
import Appbar from "../../Components/Front/Home/Appbar";
import { currentUser } from "../../Redux/actions/user";
import { getTheme } from "../../Redux/actions/theme";
import LoginForm from "../../Components/Front/Auth/LoginForm";
import RecomendedPosts from "../../Components/Front/Posts/RecomendedPosts";

function DisplayPost () {
    const dispatch = useDispatch();
    const [isShowLogin, setIsShowLogin] = useState(false);
    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
    };
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const user = useSelector((state) => state.userReducer.user);
    const theme = useSelector((state) => state.themereducer.theme);
    useEffect(() => {
        dispatch(currentUser());
        dispatch(getTheme());
    }, [dispatch]);
    const { id } = useParams();
    useEffect(() => {
        dispatch(GetPostById(id, dispatch))
    }, [dispatch]);
    const data = useSelector((state) => state.postReducer.post);
    return(
        <div>
            <Appbar isAuth={isAuth} user={user} handleLoginClick={handleLoginClick} theme={theme}/>
            <LoginForm isShowLogin={isShowLogin}  handleLoginClick={handleLoginClick} theme={theme}/>
            <div className="Detail_Container">
                {data.post !== undefined ? <DetailPost data={data} user={user}/>: null }
                {data.post !== undefined ? <RecomendedPosts data={data.post._id} user={user}/>: null }
            </div>
        </div>
        
    )
}
export default DisplayPost
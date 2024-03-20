import React, { useEffect, useState } from "react";
import "./style.css";
import Appbar from "../../Components/Front/Home/Appbar";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from '../../Redux/actions/user';
import LoginForm from '../../Components/Front/Auth/LoginForm';
import HomeContent from "./HomeContent";
import Footer from "../../Components/Front/Home/Footer";
import {getTheme} from '../../Redux/actions/theme';

function Index() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const user = useSelector((state) => state.userReducer.user);
    const [isShowLogin, setIsShowLogin] = useState(false);

    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
    };
    
    useEffect(() => {
        dispatch(currentUser());
        dispatch(getTheme());
    }, [dispatch]);
    const theme = useSelector((state) => state.themereducer.theme);
    return(
        <div >
            <Appbar isAuth={isAuth} user={user} handleLoginClick={handleLoginClick} theme={theme}/>
            <LoginForm isShowLogin={isShowLogin}  handleLoginClick={handleLoginClick} theme={theme}/>
            <HomeContent  isAuth={isAuth} user={user} theme={theme} handleLoginClick={handleLoginClick}/>
            

            
        </div>
    )
}
export default Index;
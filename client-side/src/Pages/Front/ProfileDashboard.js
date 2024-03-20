import React, { useEffect, useState } from "react";
import Appbar from "../../Components/Front/Home/Appbar";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../Redux/actions/user";
import { getTheme } from "../../Redux/actions/theme";
import "./style.css"

function ProfileDashboard () {
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
    return(
        <div className="ProfileDashboard">
            <Appbar isAuth={isAuth} user={user} handleLoginClick={handleLoginClick} theme={theme}/>
            <div className="Profile">
                <div className="details">
                    <div className="image">
                        <img src={user.Image} alt="" />
                    </div>
                    <span className="Text">{user.Firstname} {user.Lastname}</span>
                    <span className="Text">{user.Mail}</span>
                    <span className="Text">{user.PhoneNumber}</span>
                    <span className="Text">{user.Birthdate}</span>
                </div>
                <div className="update">
                    
                </div>
            </div>
        </div>
    )
}
export default ProfileDashboard;
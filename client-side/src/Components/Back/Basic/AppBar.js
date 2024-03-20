import React from "react";
import './Style.css'
function AppBar (props) {

    return(
        <div className='topbar'>
            <div className="Logo">
                <img src="https://res.cloudinary.com/turkiskander/image/upload/v1701741404/Internship/Assets/LogoTest_WhiteVersion_vfldkf.png"/>
            </div>
            <div className='user'>
                <span>{props.user.Mail}</span>
                <img src={props.user.Image} alt="no image" />
            </div>
        </div>
    );
}
export default AppBar;
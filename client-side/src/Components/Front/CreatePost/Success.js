import React from "react";
import "./Success.css";
import { useNavigate } from "react-router-dom";
function Success() {
    let navigate = useNavigate(); 

    return(
        <div className="Succes_Container">
            <div className="Success">
                <span className="Message">Thank you for contributing to our community!</span>
                <span className="Message">Your post has been received. An admin will review and validate it before making it public. Stay tuned!</span>
            </div>
            <div className="Button_Wrapper">
                <button className="button1" onClick={() => {window.location.reload()}}>Write More</button>
                <button className="button2" onClick={() => {navigate('/')}}>Go home</button>
            </div>
        </div>
        
    );
}
export default Success;
import React from "react";
import './Style.css';

function TemplateTest (props) {
    console.log(props.theme)
    return(
        <div className="TemplateMain">
            <span className="Title">Navigation Bar</span>
            <div className="NavigationSectionTest">
                <div className="NavigationBar">
                    <img src={props.theme.Logo}/>
                    <ul className="Navigation">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Write</a></li>
                        <button>Get Started</button>
                    </ul>
                </div>  
            </div>
            <span className="Title">Footer</span>
            <div className="Footer">
                <span className="TitleSM">{props.theme.FooterText}</span>
                <div className="SocialMedia">
                        <a href={props.theme.LinkedInLink}><ion-icon className="icon" name="logo-linkedin"></ion-icon></a>
                        <a href={props.theme.FacebookLink}><ion-icon className="icon" name="logo-facebook"></ion-icon></a>
                        <a href={props.theme.TwitterLink}><ion-icon className="icon" name="logo-twitter"></ion-icon></a>
                        <a href={props.theme.YoutubeLink}><ion-icon className="icon" name="logo-youtube"></ion-icon></a>
                </div>
            </div>
        </div>
    );
}
export default TemplateTest
import React from "react";
import "./Footer.css"

function Footer(props) {

    return(
        <div className="Footer">
            <span className="TitleSM">{props.theme.FooterText}</span>
            <div className="SocialMedia">
                    <a href={props.theme.LinkedInLink}><ion-icon className="icon" name="logo-linkedin"></ion-icon></a>
                    <a href={props.theme.FacebookLink}><ion-icon className="icon" name="logo-facebook"></ion-icon></a>
                    <a href={props.theme.TwitterLink}><ion-icon className="icon" name="logo-twitter"></ion-icon></a>
                    <a href={props.theme.YoutubeLink}><ion-icon className="icon" name="logo-youtube"></ion-icon></a>
            </div>
        </div>
    )
}
export default Footer;
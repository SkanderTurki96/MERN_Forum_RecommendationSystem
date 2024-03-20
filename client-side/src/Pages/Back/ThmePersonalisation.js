import React from "react";
import {getTheme , UpdateTheme} from '../../Redux/actions/theme'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Theme.css';
import { useState } from "react";
import TemplateTest from "../../Components/Back/Theme/TemplateTest";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import isEqual from 'lodash/isEqual';



function ThemePersonalisation () {
    const [open, setOpen] = React.useState(false);
    const [AlertMessage, setMessage] = React.useState("");
    const [NewTheme , setNewTheme] = useState({
        Logo: "",
        PrimaryColor: "",
        SecondaryColor: "",
        ThirdColor: "",
        FourthColor: "",
        NavigationFontSize: 0,
        FooterText: "",
        FacebookLink: "",
        LinkedInLink: "",
        TwitterLink: "",
        YoutubeLink: "",
        __v:0
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTheme());
    },[])
    const theme = useSelector((state) => state.themereducer.theme);
    useEffect(() => {
        if(theme !== undefined)
        {
            setNewTheme({
                _id: theme._id,
                Name : theme.Name,
                Logo: theme.Logo,
                PrimaryColor: theme.PrimaryColor,
                SecondaryColor: theme.SecondaryColor,
                ThirdColor: theme.ThirdColor,
                FourthColor: theme.FourthColor,
                NavigationFontSize: theme.NavigationFontSize,
                FooterText: theme.FooterText,
                FacebookLink: theme.FacebookLink,
                LinkedInLink: theme.LinkedInLink,
                TwitterLink: theme.TwitterLink,
                YoutubeLink: theme.YoutubeLink,
                __v: theme.__v
            })
        }
    },[theme]);
    useEffect(() => {
        console.log(NewTheme)
        const root = document.documentElement; // Select the root element
        root.style.setProperty('--primarycolorTest', NewTheme.PrimaryColor);
        root.style.setProperty('--secondarycolorTest', NewTheme.SecondaryColor);
        root.style.setProperty('--thirdcolorTest', NewTheme.ThirdColor);
        root.style.setProperty('--fourthcolorTest', NewTheme.FourthColor);
        root.style.setProperty('--Navigation-font-sizeTest', `${NewTheme.NavigationFontSize}px`);
        root.style.setProperty('--title-font-sizeTest',  `${NewTheme.TitleFontSize}px`);
        root.style.setProperty('--desc-font-sizeTest', `${NewTheme.SubTitleFontSize}px`);
    },[NewTheme])

    const ImageInputRef = React.useRef(null);
    const handleUploadClick = () => {
        ImageInputRef.current.click();
    };

    const handleImageUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'Blog_Internship'); 
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/turkiskander/image/upload', true);
        xhr.onload = () => {
            if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setNewTheme({...NewTheme , Logo: data.url })
            } else {
            console.error('Error uploading image:', xhr.statusText);
            }
        };

        xhr.onerror = () => {
            console.error('Network error occurred while uploading');
        };

        xhr.send(formData);
        console.log(NewTheme)
    }
    const handleChange = (e) => {
        setNewTheme({ ...NewTheme, [e.target.name]: e.target.value });
        const root = document.documentElement;
        root.style.setProperty(`--${[e.target.name]}`, e.target.value);
    };
    const handlesubmit = () => {
        console.log(isEqual(theme , NewTheme))
        if (isEqual(theme , NewTheme)) {
            setMessage("Nothing to update !");
            setOpen(true);
        } 
        else {
            dispatch(UpdateTheme(NewTheme._id , NewTheme))
            setMessage("Theme updated !");
            setOpen(true);
        }
        
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    return (
        <div className="ThemePersonalisation">
            <div className="ThemeContent">
                {theme !== undefined ?
                    <TemplateTest theme={NewTheme} />
                :null
                }
            </div>
            <div className="Styling">
                    <span className="label">{NewTheme.Name}</span>  
                    <div className="ImageUploader">
                            <img src={NewTheme.Logo}  />
                            <ion-icon name="camera-outline" onClick={handleUploadClick}></ion-icon>
                            <input 
                                type="file"
                                onChange={handleImageUpload} 
                                className='file-input' 
                                ref={ImageInputRef} 
                                hidden
                            />
                    </div>
                    <div className="colorContainer">
                        <span className="name">Primary color</span>
                        <div className="colorPickerWrapper ">
                            <input className="colorPicker" type="color" name="PrimaryColor" onChange={handleChange} value={NewTheme.PrimaryColor} />
                        </div>
                    </div>   
                    <div className="colorContainer">
                        <span className="name">Secondary color</span>
                        <div className="colorPickerWrapper ">
                            <input className="colorPicker" type="color" name="SecondaryColor" onChange={handleChange} value={NewTheme.SecondaryColor} />
                        </div>
                    </div>
                    <div className="colorContainer">
                        <span className="name">Third Color</span>
                        <div className="colorPickerWrapper ">
                            <input className="colorPicker" type="color" name="ThirdColor" onChange={handleChange} value={NewTheme.ThirdColor} />
                        </div>
                    </div>
                    <div className="colorContainer">
                        <span className="name">Fourth Color</span>
                        <div className="colorPickerWrapper ">
                            <input className="colorPicker" type="color" name="FourthColor" onChange={handleChange} value={NewTheme.FourthColor} />
                        </div>
                    </div>
                    <div className="InputContainer">
                        <span className="name">Navigation font size</span>
                        <div className="InputContent">
                            <span style={{fontSize: `${NewTheme.NavigationFontSize}px` }}>Test</span>
                            <input className="input" type="number" onChange={handleChange} name="NavigationFontSize"  value={NewTheme.NavigationFontSize} />
                        </div>
                    </div>
                    <div className="InputContainer">
                        <span className="name">Footer Text</span>
                        <div className="InputContent">
                            <textarea className="Text" type="text" name="FooterText" onChange={handleChange} value={NewTheme.FooterText} rows="3"/>
                        </div>
                    </div>
                    <div className="InputContainer">
                        <span className="name">LinkedIn Link</span>
                        <div className="InputContent">
                            <input className="Text" type="text" name="LinkedInLink" onChange={handleChange} value={NewTheme.LinkedInLink}/>
                        </div>
                    </div>
                    <div className="InputContainer">
                        <span className="name">Facebook Link</span>
                        <div className="InputContent">
                            <input className="Text" type="text" name="FacebookLink" onChange={handleChange} value={NewTheme.FacebookLink}/>
                        </div>
                    </div>
                    <div className="InputContainer">
                        <span className="name">Twitter Link</span>
                        <div className="InputContent">
                            <input className="Text" type="text" name="TwitterLink" onChange={handleChange} value={NewTheme.TwitterLink}/>
                        </div>
                    </div>
                    <div className="InputContainer">
                        <span className="name">Youtube Link</span>
                        <div className="InputContent">
                            <input className="Text" type="text" name="LinkedInLink" onChange={handleChange} value={NewTheme.LinkedInLink}/>
                        </div>
                    </div>
                    <button className="button" onClick={handlesubmit} type="submit">Submit Changes</button>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={AlertMessage}
                        action={action}
                    />
            </div>
        </div>
    );
}
export default ThemePersonalisation;
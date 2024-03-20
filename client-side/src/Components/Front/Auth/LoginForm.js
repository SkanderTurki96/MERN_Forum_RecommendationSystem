import React, { useEffect, useState } from "react";
import 'react-phone-input-2/lib/style.css'

import { jwtDecode } from 'jwt-decode';


import "./Style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login,register } from '../../../Redux/actions/user';
import { GoogleLogin } from '@react-oauth/google';
import validator from 'validator';

import PhoneInput from 'react-phone-input-2';




function LoginForm  (props)  {
    const navigate  = useNavigate();
    const dispatch = useDispatch(); 
    const [isSignUp, setIsSignUp] = useState(false)
    const handleIsSignUp = () => {
        setIsSignUp(!isSignUp)
    }
    /************* page rendering******************* */
    const isShowLogin = props.isShowLogin;
    const [userGoogle , setUserGoogle] = useState({
        LoginByGoogle : true,
        Mail : "",
        Firstname : "",
        Lastname : "",
        Image : ""
      }); 
      const responseMessage = (response) => {
        const res = jwtDecode(response.credential);
        console.log(res.email)
        setUserGoogle({
            LoginByGoogle : true,
            Mail : res.email,
            Firstname : res.given_name,
            Lastname : res.family_name,
            Image : res.picture
        })
        
    };
    React.useEffect (() => {
        if(userGoogle.Firstname !== "")
        {
            dispatch(login(userGoogle));
        }
      }, [userGoogle])

    const errorMessage = (error) => {
        console.log(error);
    };
    
    const handleClickLogin = () => {
        props.handleLoginClick();
      };
    /****************** login Functions********************** */
    const [userLogin , setUserLogin] = useState({
        LoginByGoogle : false,
        Mail : "",
        Password : ""
      }); 
    const handleChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
      };

      const LoginResult = useSelector((state) => state.userReducer.userLogin);
      const ErrorLogin = useSelector((state) => state.userReducer.failLogin);
      const handleConfirmLogin = (e) => {
        e.preventDefault();
        dispatch(login(userLogin));
      };
      React.useEffect (() => {
        
        if( /*!Object.keys(LoginResult).length === 0 &&*/ LoginResult.status === "200")
        {
            console.log(LoginResult.user)
            if(LoginResult.user.isAdmin === true)
            {
                handleClickLogin(); 
                navigate('/Dashboard');
            }
            else
            {
                handleClickLogin(); 
                window.location.reload()
            }
        }else if (ErrorLogin.status === 401)
        {
          alert("Mail or Password are incorrect !")
        }
      }, [LoginResult, ErrorLogin])
      /*******************password******************** */
      const [showPassword, setShowPassword] = React.useState(true);
      const passwordElement = document.querySelector("#password");
      const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
        if(showPassword)
        {
          passwordElement.setAttribute("type" , "text")
        }else {
          passwordElement.setAttribute("type", "password")
        }
      };
      const handleMouseDownPassword = (event) => {
          event.preventDefault();
        };
        /*********************SIGN UPPPPP***************************** */
      const [user , setUser] = useState({
        Firstname : "",
        Lastname : "",
        Mail : "",
        PhoneNumber : "",
        Birthdate : "",
        Password:"",
        Image: ''
      }); 

        const [IsFirstnameValid, setIsFirstnameValid] = useState(false);
        const [FirstnameError, setFirstnameError] = useState('');
        const [FirstnameTouched, setFirstnameTouched] = useState(false);
        const [IsLastnameValid, setIsLastnameValid] = useState(false);
        const [LastnameError, setLastnameError] = useState('');
        const [LastnameTouched, setLastnameTouched] = useState(false);
        const [IsMailValid, setIsMailValid] = useState(false);
        const [MailTouched, setMailTouched] = useState(false);
        const [IsPasswordValid, setIsPasswordValid] = useState(false);
        const [PasswordError, setPasswordError] = useState('');
        const [PasswordTouched, setPasswordTouched] = useState(false);
        const [IsCPasswordValid, setIsCPasswordValid] = useState(false);
        const [CPasswordError, setCPasswordError] = useState('');
        const [CPasswordTouched, setCPasswordTouched] = useState(false);
        const [IsPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
        const [IsBirthdateValid, setIsBirthdateValid] = useState(false);
        const [IsFileValid, setIsFileValid] = useState(false);
        const [IsFormValid , setIsFormValid] = useState(false);

        const handleFirstname = (e) => {
            if (e.target.value.length < 3) {
              setIsFirstnameValid(false);
              setFirstnameError('Firstname must be at least 2 letters');
            } else if (/[0-9]/.test(e.target.value) || /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(e.target.value)) {
              setIsFirstnameValid(false);
              setFirstnameError('Firstname must not contain symbols or numbers');
            } else {
              setIsFirstnameValid(true);
              setUser({ ...user, Firstname: e.target.value });
            }
          };
          const handleLastname = (e) => {
            if (e.target.value.length < 3) {
              setIsLastnameValid(false);
              setLastnameError('Lastname must be at least 2 letters');
            } else if (/[0-9]/.test(e.target.value) || /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(e.target.value)) {
              setIsLastnameValid(false);
              setLastnameError('Lastname must not contain symbols or numbers');
            } else {
              setIsLastnameValid(true);
              setUser({ ...user, Lastname : e.target.value });
            }
          };
          const validateEmail = (e) => {
            if (validator.isEmail(e.target.value)) {
              setIsMailValid(true);
              setUser({ ...user, Mail: e.target.value });
            } else {
              setIsMailValid(false);
            }
          };
          const handlePhoneNumber = (numberValue) => {   
              setUser({ ...user, PhoneNumber : numberValue });
              setIsPhoneNumberValid(true);
          };
          const handleBirthdate = (e) => {  
            setUser({ ...user, Birthdate : e.target.value });
            setIsBirthdateValid(true);
        };
        const handlePassword = (e) => {
          setUser({ ...user, Password : e.target.value });
          if (e.target.value.length < 8) {
            setIsPasswordValid(false);
            setPasswordError('Password must contain at least 8 character');
          } else if ( !/[0-9]/.test(e.target.value)) {
            setIsPasswordValid(false);
            setPasswordError('Password must contain at least one number');
          } else if(!/[A-Z]/.test(e.target.value)) {
            setIsPasswordValid(false);
            setPasswordError('Password must contain at least one uppercase character');
          }else if(!/[a-z]/.test(e.target.value)) {
            setIsPasswordValid(false);
            setPasswordError('Password must contain at least one lowercase character');
          }
          else {
            setIsPasswordValid(true);
          }
        };
        const SignUpResult = useSelector((state) => state.userReducer.newUser);
        const handleConfirm = (e) => {
            e.preventDefault();
            console.log(user)
            dispatch(register(user));
          };
          
        React.useEffect(() => {
            if (  IsFirstnameValid  && 
                  IsLastnameValid &&  
                  IsMailValid && 
                  IsPasswordValid && 
                  IsPhoneNumberValid && 
                  IsBirthdateValid &&
                  IsFileValid )
            {
              setIsFormValid(true);
            }
            else 
            {
              setIsFormValid(false);
            }

        }, [  IsFirstnameValid,
              IsLastnameValid, 
              IsMailValid, 
              IsPasswordValid, 
              IsPhoneNumberValid,
              IsBirthdateValid,
              IsFileValid]);
        React.useEffect (() => {
          if( /*!Object.keys(SignUpResult).length === 0 && */ SignUpResult.status === "200")
          {
            alert("Account created successfully !!");
            handleClickLogin(); 
            window.location.reload()
          }
        }, [SignUpResult])

    //************** Image handler *************************** */
    
    const [ImageName , setImageName] = React.useState("");
    const [ImageState, setImageState] = React.useState("");
    const [Update, setUpdate] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const ImageInputRef = React.useRef(null);
    const handleFormClick = () => {
        ImageInputRef.current.click();
      };
      const handleImageUpload = (e) => {
        e.preventDefault();
        setImageState("uploading")
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'Blog_Internship'); 
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/turkiskander/image/upload', true);
        xhr.upload.onprogress = (event) => {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setImageName(data.original_filename)
            setUser({ ...user, Image: data.url })
            setUpdate(Update+1);
            setImageState("uploaded");
            setIsFileValid(true);
            } else {
            console.error('Error uploading video:', xhr.statusText);
            }
        };

        xhr.onerror = () => {
            console.error('Network error occurred while uploading');
        };

        xhr.send(formData);

    }

  
    
  return(
    <>
    {isShowLogin && (
      <div className="popup">
        
        <div className="popup-content">
          <span className="close" onClick={handleClickLogin}><ion-icon name="close"></ion-icon></span>
          <span className="Title">Welcome to {props.theme.Name} !</span>
          { !isSignUp ? 
            <div className="SignIn">
              <div className="InputWrapper">
                <input className="input" type="text" name="Mail"  onChange={handleChange} required />
                <span className="label">E-mail</span>
              </div>
              <div className="InputWrapper">
                <input id="password" className="input" type="password" name="Password"  onChange={handleChange} required />
                <span className="label">Password</span>
                <span onClick={handleClickShowPassword} className="showPassword">{showPassword ? <ion-icon name="eye-off"></ion-icon>: <ion-icon name="eye"></ion-icon>}</span>
              </div>
              <div className="InputWrapper">
                  <button type="submit" onClick={handleConfirmLogin} className="submit">Log In</button>
              </div>
            </div> :
            <div className="SignUpWrapper">
                <div className="duoInput">
                  <div className="InputWrapper">
                    <input className="input" type="text" name="Firstname"  onChange={handleFirstname} onBlur={() => setFirstnameTouched(true)} required />
                    <span className="label">Firstname</span>
                    {FirstnameTouched && (
                      <h5 className="about-heading" style={{ color: IsFirstnameValid ? 'green' : 'red' }}>
                        {IsFirstnameValid ? '' : FirstnameError}
                      </h5>
                    )}
                  </div>
                  <div className="InputWrapper">
                    <input className="input" type="text" name="Lastname"  onChange={handleLastname} onBlur={() => setLastnameTouched(true)} required />
                    <span className="label">Lastname</span>
                    {LastnameTouched && (
                          <h5 className="about-heading" style={{ color: IsLastnameValid ? 'green' : 'red' }}>
                            {IsLastnameValid ? '' : LastnameError}
                          </h5>
                        )}
                  </div>
                </div>
                <div className="duoInput">
                  <div className="InputWrapper">
                    <input className="input" type="text" name="Email"  onChange={validateEmail} onBlur={() => setMailTouched(true)} required />
                    <span className="label">Email</span>
                    {MailTouched && (
                          <h5 className="about-heading" style={{ color: IsMailValid ? 'green' : 'red' }}>
                            {IsMailValid ? '' : 'Mail not valid'}
                          </h5>
                        )}
                  </div>
                  <div className="InputWrapper">
                    <input id="password" className="input" type="password" name="Password"  onChange={handlePassword} onBlur={() => setPasswordTouched(true)} required />
                    <span className="label">Password</span>
                    <span onClick={handleClickShowPassword} className="showPassword">{showPassword ? <ion-icon name="eye-off"></ion-icon>: <ion-icon name="eye"></ion-icon>}</span>
                    {PasswordTouched && (
                          <h5 className="about-heading" style={{ color: IsPasswordValid ? 'green' : 'red' }}>
                            {IsPasswordValid ? '' : PasswordError}
                          </h5>
                        )}
                  </div>
                </div>
                <div className="duoInput">
                  <div className="InputWrapper">
                    <input className="input" type="date" name="Birthdate"  onChange={handleBirthdate} required />
                  </div>
                  <div className="InputWrapper">
                    <PhoneInput
                          country={'tn'}
                          inputProps={{
                              required: true,
                          }}
                          label="Phone Number"
                          value={user.PhoneNumber}
                          onChange={handlePhoneNumber}
                      />
                  </div>
                </div>
                <div className="Uploader">
                    <form onClick={handleFormClick}>
                        <input 
                            type="file"
                            onChange={handleImageUpload} 
                            className='file-input' 
                            ref={ImageInputRef} 
                            hidden
                        />
                        <ion-icon name="cloud-upload"></ion-icon>
                        <p>Browse File to Upload</p>
                    </form>
                    {ImageState === "uploading" ?
                    <section className='progress-area'>
                        <li className='row-input'>
                            <ion-icon name="document"></ion-icon>
                            <div className='content'>
                                <div className='detail'>
                                    <span className='name'>Uploading</span>
                                    <span className='percent'>{progress}%</span>
                                </div>
                                <div className='progress-bar'>
                                    <div 
                                        className='progress' 
                                        style={{
                                            width: `${progress}%`,
                                          }}
                                        ></div>
                                </div>
                            </div>
                        </li>
                    </section>:
                    ImageState === "uploaded" ?    
                    <section className='uploaded-area'>
                        <li className='row-input'>
                            <div className='content'>
                                <ion-icon name="document"></ion-icon>
                                <div className='detail'>
                                    <span className='name'>{ImageName} .Uploaded</span>
                                </div>
                            </div>
                            <ion-icon name="checkmark-done"></ion-icon>
                        </li>
                    </section> : 
                    null}
                    
                </div>
                
                <div className="ButtonWrapper">
                <div className="InputWrapper">
                      <button type="submit" onClick={handleIsSignUp} className="return">Return</button>
                    </div>
                    <div className="InputWrapper">
                      <button type="submit" onClick={handleConfirm} disabled={!IsFormValid} className="submit">Submit</button>
                    </div>
                </div>
            </ div>
            }
            <span className="text">Or</span>
              <div className="googleLogin">
              <GoogleLogin 
                        onSuccess={responseMessage} 
                        onError={errorMessage} 
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                        />
              </div>
              <span className="Info">If you don't have an account <a onClick={handleIsSignUp}> click here</a></span>
              <span className="Info">By continuing, you agree  acknowledge you've read our <a href="#">Privacy Policy</a>. </span>
        </div>
      </div>
    )}
  </>
  );
};

export default LoginForm;

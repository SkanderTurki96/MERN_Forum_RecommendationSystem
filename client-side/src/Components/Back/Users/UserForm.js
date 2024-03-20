import React, { useState } from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import './UserForm.css';
import { AddUser, uploadImage } from "../../../Redux/actions/user";

import PhoneInput from 'react-phone-input-2';
import { format } from 'date-fns';


function UserForm () {
    const dispatch = useDispatch();
    const [user , setUser] = useState({
        Firstname : "",
        Lastname : "",
        Mail : "",
        PhoneNumber : "",
        Birthdate : "",
        HashedPassword:"",
        Image: '',
        isAdmin:false
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
      const handleIsAdmin = () => {
        setUser({ ...user, isAdmin : !user.isAdmin });
      }
      const handleBirthdate = (date) => {  
        setUser({ ...user, Birthdate : date });
        setIsBirthdateValid(true);
    };
    const SignUpResult = useSelector((state) => state.userReducer.result);
    const handleConfirm = (e) => {
        e.preventDefault();
        dispatch(AddUser(user ));
      };
      
    React.useEffect(() => {
        if (  IsFirstnameValid  && 
              IsLastnameValid &&  
              IsMailValid && 
              IsPasswordValid && 
              IsCPasswordValid && 
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
          IsCPasswordValid, 
          IsPhoneNumberValid,
          IsBirthdateValid,
          IsFileValid]);
    React.useEffect (() => {
      if(SignUpResult.status === "200")
      {
        alert("Account created successfully !!");
        window.location.reload()
      }
    }, [SignUpResult])

//************** Image handler *************************** */
const [Image, setImage] = React.useState({
    name :"",
    url :""
});
const LinkImage = useSelector((state) =>state.userReducer.imagelink );
const [Update, setUpdate] = React.useState(0);


    React.useEffect(() => {
        if(Image.name !== "" && Image.url !== "")
        {
            dispatch(uploadImage(Image))
        }
    }, [Image]);

    React.useEffect(() => {
        if(LinkImage.length !== 0){
            setUser({ ...user, Image: LinkImage.link })
            setUpdate(Update+1);      
        }
    },[LinkImage])

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend  = () => {       
        setImage({ name :e.target.files[0].name.substring(0, e.target.files[0].name.indexOf('.')) , url : reader.result});
        setIsFileValid(true);
    }    
  };

/******************** password handler************************************ */
const[pass , setpassword]= useState("");
const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };  
  const handlePassword = (e) => {
    if (e.target.value.length < 8) {
      setIsPasswordValid(false);
      setPasswordError('Password must contain at least 8 character');
      setpassword(e.target.value);
    } else if ( !/[0-9]/.test(e.target.value)) {
      setIsPasswordValid(false);
      setPasswordError('Password must contain at least one number');
      setpassword(e.target.value);
    } else if(!/[A-Z]/.test(e.target.value)) {
      setIsPasswordValid(false);
      setPasswordError('Password must contain at least one uppercase character');
      setpassword(e.target.value);
    }else if(!/[a-z]/.test(e.target.value)) {
      setIsPasswordValid(false);
      setPasswordError('Password must contain at least one lowercase character');
      setpassword(e.target.value);
    }
    else {
      setIsPasswordValid(true);
      setpassword(e.target.value);
    }
  };
  const handleConfirmPassword = (e) => {   
    setUser({ ...user, HashedPassword : e.target.value });
    
};  
React.useEffect(() => {
  if (user.HashedPassword !== pass)
    {
      setIsCPasswordValid(false);
      setCPasswordError('Passwords are not the same');
    } else
    {
      setIsCPasswordValid(true);
    }
}, [user.HashedPassword]);

const datePickerStyle = {
  height: '80%',
  width: '100%',
  outline: 'none',
  padding: '0 15px',
  fontSize: '14px',
  fontWeight: 400,
  color: '#333',
  border: '1.5px solid #999',
  borderBottomWidth: '2.5px',
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  borderBottomWidth: '2.5px',
  borderBottomColor: '#999',
};
const focusedDatePickerStyle = {
  borderBottomWidth: '4px', // Increase border-bottom-width on focus
};

    return (
        <div className='FormUser'>
            <div className='Header'>
                <h2>Create User</h2>
            </div>
                <form>
                    <div className='input-box'>
                        <input 
                            type="text" 
                            placeholder='Enter Firstname'
                            onChange={handleFirstname}
                            onBlur={() => setFirstnameTouched(true)}
                            required
                        />  
                        {FirstnameTouched && (
                                  <h5 style={{ color: IsFirstnameValid ? 'green' : 'red' }}>
                                    {IsFirstnameValid ? '' : FirstnameError}
                                  </h5>
                                )}                  
                    </div>
                    
                    <div className='input-box'>
                        <input 
                            type="text" 
                            placeholder='Enter Lastname' 
                            onChange={handleLastname}
                            onBlur={() => setLastnameTouched(true)}
                            required
                        />
                    {LastnameTouched && (
                                      <h5 className="about-heading" style={{ color: IsLastnameValid ? 'green' : 'red' }}>
                                        {IsLastnameValid ? '' : LastnameError}
                                      </h5>
                                    )}                        
                    </div>
                    <div className='input-box'>
                        <input 
                            type="text" 
                            placeholder='Enter Mail' 
                            onChange={validateEmail}
                            onBlur={() => setMailTouched(true)}
                            required
                        />
                        {MailTouched && (
                                      <h5 className="about-heading" style={{ color: IsMailValid ? 'green' : 'red' }}>
                                        {IsMailValid ? '' : 'Mail not valid'}
                                      </h5>
                                    )}                    
                    </div>
                    <div className='input-box'>
                        <input 
                            type="password" 
                            placeholder='Enter Password'
                            onChange={handlePassword}
                            onBlur={() => setPasswordTouched(true)}
                            required
                        />
                        {PasswordTouched && (
                                      <h5 className="about-heading" style={{ color: IsPasswordValid ? 'green' : 'red' }}>
                                        {IsPasswordValid ? '' : PasswordError}
                                      </h5>
                                    )}                    
                    </div>
                    <div className='input-box'>
                        <input 
                            type="password" 
                            placeholder='Confirm Password' 
                            onChange={handlePassword}
                            onBlur={() => setPasswordTouched(true)}
                            required
                        />
                        {CPasswordTouched && (
                                      <h5 className="about-heading" style={{ color: IsCPasswordValid ? 'green' : 'red' }}>
                                        {IsCPasswordValid ? '' : CPasswordError}
                                      </h5>
                                  )}                    
                    </div>
                    
                        <PhoneInput
                            containerStyle={{
                              margin:'9px 0'
                            }}
                            inputStyle={{
                              width: '100%',
                              height: '80%',
                              fontSize: '14px',
                              fontWeight: '400',
                              color: '#333',
                              padding: '13px 40px',
                              border: '1.5px solid #999',
                              borderBottomWidth: '2.5px',
                              borderRadius: '5px',
                              transition: 'all 0.3s ease'
                            }}
                            buttonStyle={{
                              color: '#333',
                            }}
                            country={'tn'}
                            inputProps={{
                              required: true,
                            }}
                            label="Phone Number"
                            value={user.PhoneNumber}
                            onChange={handlePhoneNumber}
                        />                  
                      <input type="date" label="Birthdate" value={user.Birthdate} onChange={handleBirthdate}/> 
                      <input
                          className="file"
                          type="file"
                          onChange={handleFileChange}
                      />                                  
                    <div className='Check'>
                        <input type="checkbox" onClick={handleIsAdmin}/>     
                        <h3>Is Admin</h3>               
                    </div>  
                    <div className='input-box button'>
                        <input type="submit" onClick={handleConfirm} value="Save Now" />
                    </div>                            
                </form>
        </div>
    )
}
export default UserForm;
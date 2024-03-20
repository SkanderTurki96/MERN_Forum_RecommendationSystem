import React, { useEffect, useState } from "react";
import "./SignUpFlow.css"
import Welcome from "../../../Assets/Animation/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { ValidateUser } from "../../../Redux/actions/user";
function SignUpFlow (props) {
    const dispatch = useDispatch();
    const [step , setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [data , setPreference] = useState([])
    const handleBoxClick = (e) => {
        setPreference(prevState => {
            if (prevState.includes(e.target.name)) {
                return prevState.filter(item => item !== e.target.name);
            } else {
                return [...prevState, e.target.name];
            }
        });
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        dispatch(ValidateUser(data , props.user._id));
    }
    const validateUserResult = useSelector((state) => state.userReducer.validateUser);
    React.useEffect (() => {
        if(validateUserResult.status === "200")
        {
            window.location.reload();
        } 
      }, [validateUserResult])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 8000);
    return () => clearTimeout(timeoutId);
  }, []);


 return (
    <div className="SignUpFlow">
        <div className="Popup">
            {isVisible && (
                < Welcome />
            )}
            
            <div className="stepper">
                <span className={step === 0 ? "dot active" : "dot"}></span>
                <span className={step === 1 ? "dot active" : "dot"}></span>
            </div>
            
           { step === 0 ? 
                <div className="first-step">    
                    <img src={props.user.Image} alt=""/>
                    <span>{props.user.Mail}</span>
                    <div className="duo">
                        <span>{props.user.Firstname}</span>
                        <span>{props.user.Lastname}</span>
                    </div>
                    <span className="Desc">Your responses to the following questions will help us find the right ideas for you . Thank you for helping us create a personalized experience just for you!</span>
                    <button type="submit" onClick={() => setStep(step +1)}>Next</button>
                </div> :
                <div className="second-step">
                    <span className="Title">What are you interested in ?</span>
                    <span className="SubTitle">This will customize your new home feed</span>
                    <div className="Preference">
                        <div className={data.includes("Economy") ? "box active" : "box"}  onClick={handleBoxClick}>
                            <img name="Economy" src="https://res.cloudinary.com/turkiskander/image/upload/v1704230459/Internship/Assets/Economy3_sgh6yy.jpg" alt="" />
                            <div className="name">
                                <span name="Economy">Economy</span>
                            </div>
                        </div>
                        <div className={data.includes("Electronics") ? "box active" : "box"} onClick={handleBoxClick}>
                            <img name="Electronics" src="https://res.cloudinary.com/turkiskander/image/upload/v1704230346/Internship/Assets/Electronics2_qhrdpv.jpg" alt="" />
                            <div className="name">
                                <span name="Electronics" >Electronics</span>
                            </div>
                        </div>
                        <div className={data.includes("Entertainement") ? "box active" : "box"} onClick={handleBoxClick}>
                            <img name="Entertainement" src="https://res.cloudinary.com/turkiskander/image/upload/v1704228273/Internship/Assets/Entertainement2_zerev5.jpg" alt="" />
                            <div className="name">
                                <span name="Entertainement">Entertainement</span>
                            </div>
                        </div>
                        <div className={data.includes("Sports") ? "box active" : "box"} onClick={handleBoxClick}>
                            <img name="Sports" src="https://res.cloudinary.com/turkiskander/image/upload/v1704222901/Internship/Assets/Sports_ivfoqh.jpg" alt="" />
                            <div className="name">
                                <span name="Sports">Sports</span>
                            </div>
                        </div>
                        <div className={data.includes("Science") ? "box active" : "box"} onClick={handleBoxClick}>
                            <img name="Science" src="https://res.cloudinary.com/turkiskander/image/upload/v1704230703/Internship/Assets/Science2_uipa69.jpg" alt="" />
                            <div className="name">
                                <span name="Science" >Science</span>
                            </div>
                        </div>
                        <div className={data.includes("Health") ? "box active" : "box"} onClick={handleBoxClick}>
                            <img name="Health" src="https://res.cloudinary.com/turkiskander/image/upload/v1704230562/Internship/Assets/Health2_oxgzwu.jpg" alt="" />
                            <div className="name">
                                <span  name="Health">Health</span>
                            </div>
                        </div>
                        <div className={data.includes("Politics") ? "box active" : "box"} onClick={handleBoxClick}>
                            <img name="Politics" src="https://res.cloudinary.com/turkiskander/image/upload/v1704224388/Internship/Assets/Politics_gx10ba.jpg" alt="" />
                            <div className="name">
                                <span name="Politics" >Politics</span>
                            </div>
                        </div>
                        <div className={data.includes("Cars") ? "box active" : "box"} onClick={handleBoxClick}>
                            <img name="Cars" src="https://res.cloudinary.com/turkiskander/image/upload/v1704224748/Internship/Assets/Cars_pjwqlx.jpg" alt="" />
                            <div className="name">
                                <span name="Cars">Cars</span>
                            </div>
                        </div>
                        <div className={data.includes("Food") ? "box active" : "box"} onClick={handleBoxClick}>
                            <img name="Food" src="https://res.cloudinary.com/turkiskander/image/upload/v1704230791/Internship/Assets/Food2_e2es8f.jpg" alt="" />
                            <div className="name">
                                <span name="Food">Food</span>
                            </div>
                        </div>
                    </div>
                    {data.length === 0 ?
                        <button className="Button" type="submit">Pick 2 more</button>: 
                    data.length === 1 ? 
                        <button className="Button" type="submit">Pick 1 more</button>:
                        <button className="Button valid" onClick={handlesubmit}>Meet your home feed</button>
                        }
                </div>
            }
            
        </div>
        
    </div>
 )
}
export default SignUpFlow;
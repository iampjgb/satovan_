import "./signin.scss";
import { useEffect, useRef, useState } from "react";
import { PhoneVerification } from "./PhoneVerification";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '/Users/paulbaron/CAPSTONE/frontend/src/firebase.js';
import "./signin.scss";
import PropTypes from "prop-types";
import {
    getCountries,
    getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";


import { UserAuth } from "../../context/AuthContext";


export const SignIn = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [contact,setContact]=useState('');
    const [digits,setDigits]=useState('');
    const [country, setCountry] = useState("PH");
    const [showEmail,setShowEmail]=useState(false);
    const [showRegistrationForm,setShowRegistrationForm]=useState(true);
    const formRef=useRef();

    const{googleSignIn,facebookSignIn,user}=UserAuth();

    const CountrySelect = ({ value, onChange, labels, ...rest }) => (
        <select
            {...rest}
            value={value}
            onChange={(event) => onChange(event.target.value || undefined)}
        >
            <option value="">{labels["ZZ"]}</option>
            {getCountries().map((country) => (
                <option key={country} value={country}>
                    {labels[country]} +{getCountryCallingCode(country)}
                </option>
            ))}
        </select>
    );

    CountrySelect.propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        labels: PropTypes.objectOf(PropTypes.string).isRequired,
    };


    useEffect(()=>{
        setDigits(getCountryCallingCode(country));
    },[country]);


    const handleSubmit=e=>{
        e.preventDefault();
        console.log(email,password);
        signInWithEmailAndPassword(auth, email, password)
        // createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const authUser = userCredential.user;
                setShowRegistrationForm(false);
                console.log(authUser);
                console.log(showRegistrationForm);

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
            });

    }

    const handleGoogleSignIn=async()=>{
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    const handleFacebookSignIn=async()=>{
        try {
            await facebookSignIn();
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <>
    {showRegistrationForm? <div className="sign-in-container">
            <form onSubmit={handleSubmit} ref={formRef}>
                <h1 className="sign-in-container-header">Login or Sign Up</h1>
                <hr />
                <h1 className="sign-in-container-welcome">
                    Welcome to Satovan{' '}{user.displayName}
                </h1>
        {!showEmail?  
            <div className="form-row">
                <label>Country/Region</label>
                <CountrySelect
                    labels={en}
                    value={country}
                    onChange={setCountry}
                    className="country-dropdown"
                />
            </div>
        :''}
        {!showEmail ? 
            <div className="form-row">
                <label>Phone Number</label>
                <div className="phone-group">
                    <div>
                        {" "}
                        <span>+{digits}</span>
                    </div>
                    <input
                        type="number"
                        className="phone-number"
                        autoComplete="tel-national"
                    />
                </div>
            </div>
        :''}
        {showEmail?  
            <>
                <div className="form-row">
                        <label>Email</label>
                        <div className="phone-group">
                            <input
                                type="email"
                                className="phone-number"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                    <label>Password</label>
                    <div className="phone-group">
                        <input
                            type="text"
                            className="phone-number"
                            value={password}
                                onChange={e=>setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </>
        :''}
            <div className="auth-btn">
                <button className="phone-auth-btn">Continue</button>
            </div>
                <div className="phone-horizontal-line">
                    <div className="hr"></div>
                    <div><span>or</span></div>
                    <div className="hr"></div>
                </div>
                <div className="auth-btn other-auth" onClick={handleFacebookSignIn}>
                    <div className="auth-logo">
                        <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/auth_btns/fb.png')} alt="facebook" />
                    </div>
                    <div className="auth-description">
                        <span className="fb-auth-btn">Continue with Facebook</span>
                    </div>
                </div>
                <div className="auth-btn other-auth" onClick={handleGoogleSignIn} >
                    <div className="auth-logo">
                            <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/auth_btns/google.png')} alt="google" />
                    </div>
                    <div className="auth-description">
                            <span className="google-auth-btn">Continue with Google</span>
                    </div>
                </div>
                {!showEmail?<div className="auth-btn other-auth" onClick={()=>setShowEmail(true)}>
                    <div className="auth-logo">
                            <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/auth_btns/email.png')} alt="mail" />
                    </div>
                    <div className="auth-description">
                            <span className="mail-auth-btn">Continue with Mail</span>
                    </div>
                </div>:''}
                {showEmail?  <div className="auth-btn other-auth" onClick={()=>setShowEmail(false)}>
                    <div className="auth-logo">
                            <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/auth_btns/phone.png')} alt="phone" />
                    </div>
                    <div className="auth-description">
                            <span className="smartphone-auth-btn">Continue with Phone</span>
                    </div>
                </div>:''}
            </form>
        </div>
    :''}
    </>
    );
};

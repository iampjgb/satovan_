//import local css
import "./prosignin.scss";

//import React Hooks
import { useEffect,useState } from "react";

//import firebase auth initizialization and hooks
import {auth,db} from '/Users/paulbaron/CAPSTONE/frontend/src/firebase.js';
import { signInWithEmailAndPassword, 
        createUserWithEmailAndPassword,
        signInWithPhoneNumber
} from "firebase/auth";

//import packages for country phone number dropdown menu
import PropTypes from "prop-types";
import {
    getCountries,
    getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

//import UserAuth Context
import { UserAuth } from "../../context/AuthContext";


//import FormModal Context
import {SignInModal } from "../../context/FormModalContext";

//import MUI Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close'; 


import {doc,setDoc} from "firebase/firestore";

export const ProSignIn = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [contact,setContact]=useState('');
    const [digits,setDigits]=useState('');
    const [country, setCountry] = useState("PH");
    const [showEmail,setShowEmail]=useState(false);
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [birthDate,setBirthDate]=useState('');
    const [otp,setOtp]=useState('');
    const [showOtp,setShowOtp]=useState(false);
    const [error,setError]=useState('');
    const [showError,setShowError]=useState(false);
    const [firstNameError,setFirstNameError]=useState('');
    const [lastNameError,setLastNameError]=useState('');
    const [emailError,setEmailError]=useState('');
    const [birthDateError,setBirthDateError]=useState('');
    const [otpError,setOtpError]=useState('');
    const [showFinishSignIn,setShowFinishSignIn]=useState(false);
    const [showRegistrationForm,setShowRegistrationForm]=useState(true);
    const [createUser,setCreateUser]=useState([]);

    //import functions and values from UserAuth Context
    const{googleSignIn,facebookSignIn,user,generateRecaptcha}=UserAuth();

    //import functions and values from FormModal Context
const{formModal,setFormModal,proFormModal,handleFormModal,profileNavModal,handleProfileNavModal}=SignInModal();


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
        // console.log(email,password);
        // signInWithEmailAndPassword(auth, email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const authUser = userCredential.user;
                setShowRegistrationForm(false);
                setFormModal(false);
                console.log(authUser);
                console.log(showRegistrationForm);

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
            setFormModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFacebookSignIn=async()=>{
        try {
            await facebookSignIn();
            setFormModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePhone = async(e)=>{
        e.preventDefault();
        if(contact===''||null||undefined){
            setError('*Phone must be a valid number.');
            setShowError(true);
            return;
        }else{
            setError('');
            setShowError(false);
            setShowRegistrationForm(false);
            setFormModal(false);
            setShowOtp(true);
            generateRecaptcha();
            let appVerifier= window.recaptchaVerifier;
            signInWithPhoneNumber(auth,"+"+digits+contact,appVerifier)
            .then(confirmationResult=>{
                window.confirmationResult=confirmationResult;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
                showError(true);
                setOtpError('Failed to sign-in');           
            });
        }
        
    }

    const handleBacktoSignIn=()=>{
        setShowRegistrationForm(true);
        setShowOtp(false);
    }

    const verifyOtp=async(e)=>{
        e.preventDefault();
        let confirmationResult=window.confirmationResult;
        confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            setShowOtp(false);
            setShowFinishSignIn(true);
            
            // ...
            console.log(user);
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.log(error);
            showError(true);
            setOtpError("User couldn't sign in");
        });
        
    }

    const handleFinishSignIn=(e)=>{
        e.preventDefault();

        if(firstName===''){
            setShowError(true);
            setFirstNameError('The first name must not be blank');
        }else if(lastName===''){
            setShowError(true);
            setLastNameError('The last name must not be blank');
        }else if(email===''){
            setShowError(true);
            setEmailError('The email must not be blank');
        }else if(birthDate===''){
            setShowError(true);
            setBirthDateError('The birthdate must not be blank');
        }else{
            console.log(user.phoneNumber);
            setCreateUser([...createUser,{
                firstName:firstName,
                lastName:lastName,
                birthDate:birthDate,
                contact:contact
            }]);
            setShowError(false);
            setShowFinishSignIn(false);
            console.log(createUser);
        }

    }

    console.log(proFormModal);

    return (
    <>
    {proFormModal? <div className="sign-in-container">
            <form onSubmit={showEmail?handleSubmit:handlePhone} className={showError?'shake':''}>
                <CloseIcon className="close-icon" onClick={()=>setFormModal(false)}/>
                <h1 className="sign-in-container-header">Login or Sign Up</h1>
                <hr />
                <h1 className="sign-in-container-welcome">
                    Welcome to Satovan
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
                        value={contact}
                        onChange={e=>setContact(e.target.value)}
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
            <span className="auth-error-message">{showError?error:''}</span>
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
    {showOtp?
            <div className="otp-container">
                    <form onSubmit={verifyOtp}>
                        <ArrowBackIosIcon className="arrowback-icon" onClick={handleBacktoSignIn}/>
                        <span>Enter the code we sent over SMS to {"+"+digits+contact}</span>
                        <div className="otp-row">
                            <div className="otp-group-btn">
                                <input type="text" value={otp} className='phone-number bordered' maxLength={6}
                                onChange={e=>setOtp(e.target.value)} />
                                <button type="submit" className="phone-auth-btn dark">Confirm OTP</button>
                            </div>
                        </div>
                    </form>
                    <span className="auth-error-message">{showError? otpError:''}</span>
            </div>
    :''}



    {showFinishSignIn?  <div className="sign-in-container">
            <form onSubmit={handleFinishSignIn} className={showError?'shake':''} >
                <h1 className="sign-in-container-header">Finish Signing Up</h1>
                <hr />
                <div className="form-row">
                        <label>First Name</label>
                        <div className="phone-group">
                            <input
                                type="text"
                                value={firstName}
                                className="phone-number"
                                onChange={e=>setFirstName(e.target.value)}
                            />
                        </div>
                </div>
                <span className="auth-error-message">{showError?firstNameError:''}</span>
                <div className="form-row">
                    <label>Last Name</label>
                    <div className="phone-group">
                        <input
                            type="text"
                            className="phone-number"
                            value={lastName}
                                onChange={e=>setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <span className="auth-error-message">{showError?lastNameError:''}</span>

                <div className="form-row space">
                    <label>Birthdate</label>
                    <div className="phone-group birthdate">
                        <input
                            type="date"
                            className="phone-number"
                            value={birthDate}
                                onChange={e=>setBirthDate(e.target.value)}
                        />
                    </div>
                </div>
                <span className="auth-error-message">{showError?birthDateError:''}</span>

                <div className="form-row space">
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
                <span className="auth-error-message">{showError?emailError:''}</span>

            <div className="auth-btn">
                <button className="phone-auth-btn">Confirm</button>
            </div>
            </form>
            <span className="auth-error-message">{showError?lastNameError:''}</span>
        </div>:''}
    

    <div id='recaptcha-container'></div>
    </>
    );
};

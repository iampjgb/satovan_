import React from 'react';
import { useState } from 'react';
import { LoginFormInput } from './LoginFormInput';
import './register.scss';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '/Users/paulbaron/CAPSTONE/frontend/src/firebase.js';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export const Login = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [user,setUser]=useState('');
    const [value,setValue]=useState('');

    const [loginData,setLoginData]=useState({
        email:email,
        password:password,
    });

    const inputs=[
    {
        id:1,
        name:'email',
        type:'email',
        label:'Email',
        placeholder:'Email',
        errorMessage:'Email must be in valid format.',
        required:true
    },
    {
        id:2,
        name:'password',
        type:'text',
        label:'Password',
        placeholder:'Password',
        errorMessage:'Password must be 8-20 characters and include at least 1 letter,1 number and 1 special character.',
        required:true,
        pattern:'^(?=.*{1})(?=.*[A-Z]{1})(?=.*[!@#$%^&*{|}?~_=+.-]{1})[A-Z0-9!@#$%^&*{|}?~_=+.-]{8,20}$',
    },
]


    const handleSubmit=e=>{
        e.preventDefault();
        // const auth = auth();
        setEmail(loginData.email);
        setPassword(loginData.password);
        console.log(loginData);
        signInWithEmailAndPassword(auth, email, password)
        // createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setUser(email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code);
            });

    }

    const onChange=e=>{
        setLoginData({...loginData,[e.target.name]:e.target.value});
        // console.log(loginData);
    }
    return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
        <PhoneInput
  international
  countryCallingCodeEditable={false}
  defaultCountry="RU"
  value={value}
  onChange={setValue}/>
        </form>
    </div>
    )
}

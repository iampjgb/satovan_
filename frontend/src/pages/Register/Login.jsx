import React from 'react';
import { useState } from 'react';
import { LoginFormInput } from './LoginFormInput';
import './register.scss';

export const Login = () => {

    const [loginData,setLoginData]=useState({
        email:'',
        password:'',
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
    }

    const onChange=e=>{
        setLoginData({...loginData,[e.target.name]:e.target.value});
    }
    return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {inputs.map((input)=>
                <LoginFormInput key={input.id} {...input} value={loginData[input.name]} onChange={onChange}/>
            )}
            <input type="submit" value='Login' />
        </form>
    </div>
    )
}

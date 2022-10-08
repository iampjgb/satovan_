import React from 'react';
import { useState } from 'react';
import { RegisterFormInput } from './RegisterFormInput';
import './register.scss';

export const Register = () => {

    const [registerData,setRegisterData]=useState({
        email:'',
        birthday:'',
        password:'',
        confirmPassword:''
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
        name:'birthday',
        type:'date',
        label:'Birthday',
        placeholder:'Birthday',
        errorMessage:''
    },
    {
        id:3,
        name:'password',
        type:'text',
        label:'Password',
        placeholder:'Password',
        errorMessage:'Password must be 8-20 characters and include at least 1 letter,1 number and 1 special character.',
        required:true,
        pattern:'^(?=.*{1})(?=.*[A-Z]{1})(?=.*[!@#$%^&*{|}?~_=+.-]{1})[A-Z0-9!@#$%^&*{|}?~_=+.-]{8,20}$',
    },
    {
        id:4,
        name:'confirmPassword',
        type:'text',
        label:'Confirm Password',
        placeholder:'Confirm Password',
        errorMessage:"Password don't match.",
        required:true,
        value:registerData.password
    },
]

    const handleSubmit=e=>{
        e.preventDefault();
    }

    const onChange=e=>{
        setRegisterData({...registerData,[e.target.name]:e.target.value});
    }
    return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {inputs.map((input)=>
                <RegisterFormInput key={input.id} {...input} value={registerData[input.name]} onChange={onChange}/>
            )}
            <input type="submit" value='Sign Up' />
        </form>
    </div>
    )
}

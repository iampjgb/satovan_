import React from 'react';
import { useState } from 'react';
import './register.scss';

export const RegisterFormInput = (props) => {
    const [focused,setFocused]=useState(false);
    const{label,onChange,errorMessage,id,...inputProps}=props;

    const handleFocus=(e)=>{
        setFocused(true);
    }
    return (
    <div className='formInput'>
        <label>{label}</label>
        <input {...inputProps} onChange={onChange}
        onBlur={handleFocus} focused={focused.toString()}
        onFocus={()=>
        inputProps.name==="confirmPassword" && setFocused(true)}
        />
        <span>{errorMessage}</span>
    </div>
    )
}

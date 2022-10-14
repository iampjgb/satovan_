import React from 'react';
import './navbar.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchBar } from '../SearchBar/SearchBar';

//import FormModal Context
import {SignInModal } from "../../context/FormModalContext";
import { ProfileNavCard } from '../ProfileNavCard/ProfileNavCard';


//import UserAuth Context
import { UserAuth } from "../../context/AuthContext";
import { ProfileNavCardSignedIn } from '../ProfileNavCard/ProfileNavCardSignedIn';

export const Navbar = () => {

//import functions and values from FormModal Context
const{formModal,handleFormModal,profileNavModal,handleProfileNavModal}=SignInModal();
  //import functions and values from UserAuth Context
const{googleSignIn,facebookSignIn,user,generateRecaptcha}=UserAuth();

    return (
        <>
    <div className='navbar'>
        <div className='navbar-wrapper'>
            <div className='navbar-left'>
                <h1 className='logo'>satovan</h1>
            </div>
            <div className='navbar-mid'>
                <SearchBar/>
            </div>
            <div className='navbar-right' >
                <span className='join'>{user? user.displayName :'Join as a Professional'} </span>
                <div className='login' onClick={handleProfileNavModal}>
                    <MenuIcon className='profileIcon' />
                    <AccountCircleIcon className='profileIcon'/>
                </div>
            </div>
        </div>
        {profileNavModal ?(user?<ProfileNavCardSignedIn/>:<ProfileNavCard/>):''}
    </div>

    {formModal?<div className="modal show-modal"></div>:''}
    </>
    )
}

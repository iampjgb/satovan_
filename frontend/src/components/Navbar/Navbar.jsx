import React from 'react';
import './navbar.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchBar } from '../SearchBar/SearchBar';

//import FormModal Context
import {SignInModal } from "../../context/FormModalContext";

export const Navbar = () => {

//import functions and values from FormModal Context
const{handleFormModal}=SignInModal();

    return (
    <div className='navbar'>
        <div className='navbar-wrapper'>
            <div className='navbar-left'>
                <h1 className='logo'>satovan</h1>
            </div>
            <div className='navbar-mid'>
                <SearchBar/>
            </div>
            <div className='navbar-right'>
                <span className='join'>Join as a Professional </span>
                <div className='login' >
                    <MenuIcon className='profileIcon' onClick={handleFormModal}/>
                    <AccountCircleIcon className='profileIcon'/>
                </div>
            </div>
        </div>
    </div>
    
    )
}

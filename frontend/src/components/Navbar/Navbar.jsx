import React from 'react';
import './navbar.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchBar } from '../SearchBar/SearchBar';

export const Navbar = () => {
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
                <div className='login'>
                    <MenuIcon className='profileIcon'/>
                    <AccountCircleIcon className='profileIcon'/>
                </div>
            </div>
        </div>
    </div>
    
    )
}

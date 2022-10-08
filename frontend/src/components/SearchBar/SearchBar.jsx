import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './searchbar.scss';

export const SearchBar = () => {
    return (
    <div className='searchbar'>
        <form className='searchbar-wrapper'>
            {/* <div className='searchbar-left'>
                <input type="text" placeholder='Where' />
                <RoomIcon className='searchbar-icons'/>
            </div> */}
            <div className='searchbar-right'>
                <input type="text" placeholder='What type of service are you looking for?' />
                <SearchIcon className='searchbar-icons'/>
            </div>
        </form>
    </div>
    )
}

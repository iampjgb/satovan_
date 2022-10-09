import React from 'react'
import './offers.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Offers = () => {

const offers=[
        {
        id:1,
        name:'Customize Furniture',
        price:1000
        },
        {
        id:2,
        name:'Wall Painting',
        price:500
        },
        {
        id:3,
        name:'Rooftop Painting',
        price:1000
        },
        {
        id:4,
        name:'Rooftop Repair',
        price:800
        },
    ];

    return (
    <div className='container'>
        <span className='content'>Choose your preferred service:</span>
        <div className='offers'>
        {offers.map((offer)=>(
            <div className='item' key={offer.id}>
            <div className='details'>
                <span className='name'>{offer.name}</span>
                <span className='price'>P{offer.price}</span>
            </div>
        </div>
        ))}
        </div>
        <NavigateNextIcon className='navigate-icon'/>
    </div>
    )
}

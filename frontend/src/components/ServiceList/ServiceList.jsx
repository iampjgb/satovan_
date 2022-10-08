import React from 'react';
import './serviceList.scss';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
});


const serviceItems=[
    {
    id:1,
    name:'Mr. Karpintero',
    area:'Navotas',
    price:2160,
    image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter.webp'),
    rate:4.5,
    rateCount:32
    },
    {
    id:2,
    name:'Mang Pepe',
    area:'Malabon',
    price:2000,
    image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter_2.jpeg'),
    rate:4.8,
    rateCount:120
    },
    {
    id:3,
    name:'Caloocan Boy',
    area:'Caloocan',
    price:1000,
    image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter_3.jpeg'),
    rate:5,
    rateCount:1000
    },
    {
    id:4,
    name:'Batang Tondo',
    area:'Manila',
    price:1700,
    image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter_4.jpeg'),
    rate:4.2,
    rateCount:420
    },
    {
        id:5,
        name:'Mr. Karpintero',
        area:'Navotas',
        price:2160,
        image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter.webp'),
        rate:4.5,
        rateCount:32
        },
        {
        id:6,
        name:'Mang Pepe',
        area:'Malabon',
        price:2000,
        image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter_2.jpeg'),
        rate:4.8,
        rateCount:120
        },
        {
        id:7,
        name:'Caloocan Boy',
        area:'Caloocan',
        price:1000,
        image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter_3.jpeg'),
        rate:5,
        rateCount:1000
        },
        {
        id:8,
        name:'Batang Tondo',
        area:'Manila',
        price:1700,
        image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/carpenter_4.jpeg'),
        rate:4.2,
        rateCount:420
        },
        
    
];

export const ServiceList = () => {
    return (
    <div className='serviceList'>
        {serviceItems.map((service)=>(
            <div className='item' key={service.id}>
            <img src={service.image} alt={service.name} className='item-image'/>
            <div className='item-info'>
                <div className='item-info-left'>
                    <span className='item-name' >{service.name}</span>
                    <span className='item-area'>{service.area}</span>
                    <span className='item-price'>Price Starts at {formatter.format(service.price)}</span>
                </div>
                <div className='item-info-right'>
                    <StarIcon className='star-icon'/>
                    <span className='star-rate'>{service.rate} ({service.rateCount})</span> 
                </div>
            </div>
            <div className='item-heart'>
                <FavoriteIcon className='item-heart-icon'/>
            </div>
        </div>
        ))}
    </div>
    )
}

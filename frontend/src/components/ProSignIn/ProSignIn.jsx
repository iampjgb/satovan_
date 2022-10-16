import './prosignin.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Map,Marker }from 'react-map-gl';
import { height } from '@mui/system';

export const ProSignIn = () => {


    const categoryItems=[
        {id:1,
        name:'carpentry',
        image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/carpenter.png')
        },
        {id:2,
        name:'haircut for men',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/barber.png')
        },
        {id:3,
            name:'gardening',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/gardener.png')
        },
        {id:4,
            name:'pet grooming',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/pet_groomer.png')
        },
        {id:5,
            name:'plumbing',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/plumber.png')
        },
        {id:6,
            name:'laundry',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/laundry.png')
        },
        {id:7,
            name:'car repair',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/car_mechanic.png')
        },
        {id:8,
            name:'nail polish',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/nail_polish.png')
        },
        {id:9,
            name:'electrical works',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/electrician.png')
        },
        {id:10,
            name:'general cleaning',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/general_cleaning.png')
        },
        {id:11,
            name:'computer repair',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/computer_repair.png')
        },
        {id:12,
            name:'carpet cleaning',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/carpet_cleaning.png')
        },
        {id:13,
            name:'massage',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/massage.png')
        },
        {id:14,
            name:'food catering',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/food_catering.png')
        },
        {id:15,
            name:'event management',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/event_management.png')
        },
        {id:16,
            name:'photography',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/photographer.png')
        },
    
    ];


    return (
    <div className='proSignIn'>
        <div className='left-bar'>
            <p>What type of service do you offer?</p>
        </div>
        <div className='right-bar'>
            {/* {categoryItems.map((item)=>(
            <div className='item' key={item.id}>
                    <span>{item.name}</span>
                    <img src={item.image} alt={item.name} />
            </div>
            ))} */}
            {/* {time.map((item)=>(
            <div className='item time' key={item.id}>
                    <span>{item.time}</span>
            </div>
            ))} */}

    {/* <Map
    initialViewState={{
    longitude: 120.941907,
    latitude:14.670398,
    zoom: 14,
    height:'100vh'
    }}
    mapStyle="mapbox://styles/mapbox/streets-v11"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
    <Marker longitude={120.941907} latitude={14.670398} anchor="bottom" >
        
    </Marker>
    </Map> */}

            <div className='nav-buttons'>
                    <button>Back</button>
                    <button>Next</button>
            </div>
        </div>
    </div>
    )
}

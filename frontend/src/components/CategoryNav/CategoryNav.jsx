import './categoryNav.scss';

export const CategoryNav = () => {

    const categoryItems=[
        {id:1,
        name:'carpenter',
        image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/carpenter.png')
        },
        {id:2,
        name:'barber',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/barber.png')
        },
        {id:3,
            name:'gardener',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/gardener.png')
        },
        {id:4,
            name:'pet groomer',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/pet_groomer.png')
        },
        {id:5,
            name:'plumber',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/plumber.png')
        },
        {id:6,
            name:'laundry',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/laundry.png')
        },
        {id:7,
            name:'car mechanic',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/car_mechanic.png')
        },
        {id:8,
            name:'nail polish',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/nail_polish.png')
        },
        {id:9,
            name:'electrician',
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
            name:'photographer',
            image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/photographer.png')
        },
    
    ];

    return (
    <div className='categoryNav'>
        <div className='categoryNav-wrapper'>
            {categoryItems.map((category)=>(
                <div className='category-item'>
                    <img src={category.image} key={category.id} alt="category.name" />
                    <span className='category-name'>{category.name}</span>
                </div>
            ))}
            <div className='filter'>
                <img   src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/filter.png')} 
                alt="" />
                <span className='filter-label'>Filter</span>
            </div>
        </div>
    </div>
    )
}

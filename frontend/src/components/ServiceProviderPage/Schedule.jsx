import React from 'react'
import './schedule.scss';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



export const Schedule = () => {

    const time=[
    {
        id:1,
        time:'8:00am'
    },
    {
        id:2,
        time:'8:30am'
    },
    {
        id:3,
        time:'9:00am'
    },
    {
        id:4,
        time:'9:30am'
    },
    {
        id:5,
        time:'10:00am'
    },
    {
        id:6,
        time:'10:30am'
    },
    {
        id:7,
        time:'11:00am'
    },
    {
        id:8,
        time:'11:30am'
    },
    {
        id:9,
        time:'12:00pm'
    },
    {
        id:10,
        time:'12:30pm'
    },
    {
        id:11,
        time:'1:00pm'
    },
    {
        id:12,
        time:'1:30pm'
    },
    {
        id:13,
        time:'2:00pm'
    },
    {
        id:14,
        time:'2:30pm'
    },
    {
        id:15,
        time:'3:00pm'
    },
    {
        id:16,
        time:'3:30pm'
    },
    {
        id:17,
        time:'4:00pm'
    },
    {
        id:18,
        time:'4:30pm'
    },
    {
        id:19,
        time:'5:00pm'
    },

];

    return (
    <div className='schedule'>
        <div className='header'>
            <span className='content'>Choose your convenient date and time:</span>
            <input type="date" 
            min={new Date().toISOString().split("T")[0]}
            />
        </div>
        <div className='times'>       
            {time.map((time)=>(
                <div key={time.id} className='time'>{time.time}</div>
            ))}
        </div>
        <NavigateBeforeIcon className='navigate-before-icon'/>
        <NavigateNextIcon className='navigate-next-icon'/>
    </div>
    )
}

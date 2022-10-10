import React from 'react';
import './paymentsuccess.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const PaymentSuccess = () => {
    return (
    <div className='paymentsuccess'>
        <h1>Payment Successfully Processed</h1>
        <CheckCircleIcon className='check-circle-icon'/>
        <button>Done</button>
    </div>
    )
}

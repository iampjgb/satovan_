import './payment.scss';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';

export const Payment = () => {

    const [showGcash,setShowGcash]=useState(false);
    const [showCreditCard,setShowCreditCard]=useState(true);

    
    const handleOption=(e)=>{
        if(e.target.value==='credit-card'){
            setShowGcash(false);
            setShowCreditCard(true);
        } else if(e.target.value==='gcash-paymaya'){
            setShowGcash(true);
            setShowCreditCard(false);
        }
    }

    return (
        <div className='payment'>
        <div className='header'>
            <span className='content'>Choose your payment method:</span>
        </div>
        <div className='options'>
            <div className='item'>
                <label>Credit/Debit Card</label>
                <input type="radio" name='card' value='credit-card' onChange={handleOption} defaultChecked  />
            </div>
            <div className='item'>
                <label>Gcash/Paymaya</label>
                <input type="radio"name='card' value='gcash-paymaya'onChange={handleOption} />
            </div>
        </div>
        {!showCreditCard? "":<div className='card-inputs'>
            <div className='item'>
                <label>Credit Card Number</label>
                <div className='card-group'>
                    <input type="number" placeholder='Enter your card number' autoFocus pattern="[0-9]"/>
                    <div className='images'>
                        <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/cards/amex.jpeg')} alt="amex" />
                        <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/cards/visa.png')} alt="visa" />
                        <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/cards/mastercard.png')} alt="mastercard" />
                    </div>
                </div>
            </div>
            <div className='item'>
                <label>Name on Card</label>
                <div className='card-group'>
                    <input type="text" placeholder="Enter Cardholder's Name"  />
                </div>
            </div>
            <div className='item-group'>
                <div className='item'>
                    <label>CVV No.</label>
                    <input type="number"  placeholder='3-4 digits' min="4"/>
                </div>
                <div className='item'>
                    <label>Expiration</label>
                    <input type="number"  placeholder='mm/yy' maxLength="4"/>
                </div>
            </div>
        </div>}
    {!showGcash?"": <div className='gcash-paymaya'>
            <div className='item'>
                <label>Gcash/Paymaya</label>
                <div className='card-group'>
                    <button>+63</button>
                    <input type="number" placeholder='Enter your phone' pattern="[0-9]"/>
                    <div className='images-local'>
                        <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/cards/gcash.png')} alt="gcash" />
                        <img src={require('/Users/paulbaron/CAPSTONE/frontend/src/assets/cards/paymaya.png')} alt="paymaya" />
                    </div>
                </div>
            </div>
        </div>}
        <div className='btn-pay'>
            <button className='item'>Pay P2,200.00</button>
        </div>
    </div>
    )
}

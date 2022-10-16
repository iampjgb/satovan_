import "./book.scss";
import { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import HomeIcon from '@mui/icons-material/Home';
import Moment from 'react-moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { loadStripe } from "@stripe/stripe-js";
import {Success} from './Success';
import {Cancel} from './Cancel';
import { doc, updateDoc} from "firebase/firestore";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

//import UserAuth Context
import { UserAuth } from "../../context/AuthContext";

//import firebase auth initizialization and hooks
import {db} from '/Users/paulbaron/CAPSTONE/frontend/src/firebase.js';
import { Navbar } from "../Navbar/Navbar";


let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }

    return stripePromise;
};

export const Book = () => {
    const [time, setTime] = useState("");
    const timeSlots = [
        { id: 1, time: "8:00am" },
        { id: 2, time: "9:00am" },
        { id: 3, time: "10:00am" },
        { id: 4, time: "11:00am" },
        { id: 5, time: "12:00am" },
        { id: 6, time: "1:00pm" },
        { id: 7, time: "2:00pm" },
        { id: 8, time: "3:00pm" },
        { id: 9, time: "4:00pm" },
        { id: 10, time: "5:00pm" },
    ];

    const service=[
        {id:1,type:'Package',description:'Our discount woodwork is gaining a great reputation in the world of small businesses, schools and apartment dwelling. Our shipping rate is considerably lesser than the other companies.',image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/package_woodwork.jpeg'),price:10000},
        {id:2,type:'Custom',description:'At custom wooden doors, we do the designing and the manufacturing of custom furniture like tables, chairs and bed frames. Our tables and chairs are made from strong hardwood, which are 100% hand-crafted. We make our tables/chairs to fit your needs including your budget.',image:require('/Users/paulbaron/CAPSTONE/frontend/src/assets/services/custom_woodwork.jpeg'),price:15000}
    ];

    const formHeaders = [
        "Select service",
        "Select time and date",
        "Select Address",
        "Confirm Booking"
    ];
    const [page, setPage] = useState(0);

    const [showInput,setShowInput]=useState(false);
    const [address,setAddress]=useState([]);
    const [date,setDate]=useState(new Date().toLocaleDateString('en-CA'));
    const [selectService,setSelectService]=useState('');

    const Service=()=>{
        return(
        <div className="service">
        {service && service.map((item)=>(
            <div className={selectService===item.id ? "items selected":"items"} key={item.id} onClick={() => setSelectService(item.id)}>
            {selectService===item.id ? <CheckCircleIcon className="check-circle-icon"/>:''}
                <h2 className="title">{item.type}</h2>
                <img src={item.image} alt="" />
                <span className="description">{item.description}</span>
                <span className="price">Price {(item.price).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'PHP',
                    })}
                </span>
            </div>
        ))}
        </div>
        );
    }

    const Schedule = () => {
        return (
            <div className="schedule">
                <h2>{<Moment format="MM/DD/yyyy">{date}</Moment>}{" | "}{time}</h2>
                <div className="date">
                    <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
                </div>
                <h3>10 Available Spots</h3>
                <div className="times">
                    {timeSlots.map((item) => ( 
                        <div
                            className={
                                item.time === time
                                    ? "item time selected"
                                    : "item time"
                            }
                            key={item.id}
                            value={item.time}
                            onClick={() => setTime(item.time)}
                        >
                            <span>{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    const Address = () => {
        const {
            ready,
            value,
            suggestions: { status, data },
            setValue,
        } = usePlacesAutocomplete();

    

          //import functions and values from UserAuth Context
        const{user}=UserAuth();

        const handleInput = (e) => {
            setValue(e.target.value);
        };

        const handleSelect = (val) => {
            setValue(val, false);
        };

        const renderSuggestions = () => {
            const suggestions = data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
        ));
            return <>{suggestions}</>;
        };


        const handleAddress=async()=>{
            setAddress(value);
            setShowInput(false);
            const userRef = doc(db, "users", user.uid);
            // Set the "address" field of current user
            await updateDoc(userRef, {
            address:value
            });
            
        };


        return (
            <>
            <div className="address">
                {!address? <div>
                    <span>No Address</span>
                </div>:''}
                {address?
                <div className="list">
                    <HomeIcon/>
                    <span>{address}</span>
                </div>:''}
                    {showInput &&  
                        <Combobox onSelect={handleSelect} aria-labelledby="demo">
                            <ComboboxInput
                                style={{ width: 500, maxWidth: "90%",padding:16 }}
                                value={value}
                                onChange={handleInput}
                                autoFocus
                                disabled={!ready}
                            />
                            <ComboboxPopover>
                                <ComboboxList>
                                    {status === "OK" && renderSuggestions()}
                                </ComboboxList>
                            </ComboboxPopover>
                        </Combobox>}
                    <div>
                    {!showInput && <button onClick={()=>setShowInput(!showInput)}>Add new address</button>}
                    {showInput && 
                    <>
                        <button className="cancel" onClick={()=>setShowInput(false)}>Cancel</button>
                        <button onClick={handleAddress}>Confirm</button>
                    </>
                    }
                    </div>
            </div>
            </>
        );
    };

    const Confirm=()=>{
        const [stripeError, setStripeError] = useState(null);
        const [isLoading, setLoading] = useState(false);
        const item = {
          price: "price_1LtaZSL4mhlhx7FcbUGXTpBp",
          quantity: 1
        };
      
        const checkoutOptions = {
          lineItems: [item],
          mode: "payment",
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`
        };
      
        const redirectToCheckout = async () => {
          setLoading(true);
          console.log("redirectToCheckout");
      
          const stripe = await getStripe();
          const { error } = await stripe.redirectToCheckout(checkoutOptions);
          console.log("Stripe checkout error", error);
          setPage(5);
          if (error) setStripeError(error.message);
          setLoading(false);
        };
      
        if (stripeError) alert(stripeError);
        return(
        <div className="confirm">
            <h1>Booking Details</h1>
            <p className="provider">Service Provider: Mr. Karpintero</p>
            <span>Date: {<Moment format='MM/DD/YYYY, dddd'>{date}</Moment>}</span>
            <span>Time: {time}</span>
            <span>Address: {address}</span>
            <p>Service Description: {service.find(item => item?.id === selectService)?.description} </p>
            <p className="price">Price: {service.find(item => item?.id === selectService)?.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'PHP',
                    })}</p>
                <button
                className="checkout-button"
                onClick={redirectToCheckout}
                disabled={isLoading}
            >

                <div className="text-container">
                <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
                </div>
            </button>
        </div>
        );

    }
    // "price_1LtaZSL4mhlhx7FcbUGXTpBp"

//     const CheckOut=()=>{
//         const [stripeError, setStripeError] = useState(null);
//   const [isLoading, setLoading] = useState(false);
//   const item = {
//     price: "price_1LtaZSL4mhlhx7FcbUGXTpBp",
//     quantity: 1
//   };

//   const checkoutOptions = {
//     lineItems: [item],
//     mode: "payment",
//     successUrl: `${window.location.origin}/success`,
//     cancelUrl: `${window.location.origin}/cancel`
//   };

//   const redirectToCheckout = async () => {
//     setLoading(true);
//     console.log("redirectToCheckout");

//     const stripe = await getStripe();
//     const { error } = await stripe.redirectToCheckout(checkoutOptions);
//     console.log("Stripe checkout error", error);
//     setPage(5);
//     if (error) setStripeError(error.message);
//     setLoading(false);
//   };

//   if (stripeError) alert(stripeError);

//   return (
//     <div className="checkout">
//       <h1>Stripe Checkout</h1>
//       <p className="checkout-title">{service.find(item => item?.id === selectService)?.type}</p>
//       <p className="checkout-description">
//       {service.find(item => item?.id === selectService)?.description}
//       </p>
//       <h1 className="checkout-price">{service.find(item => item?.id === selectService)?.price.toLocaleString('en-US', {
//                     style: 'currency',
//                     currency: 'PHP',
//                     })}</h1>
//       <img
//         className="checkout-product-image"
//         src={service.find(item => item?.id === selectService)?.image}
//         alt="Product"
//       />
//       <button
//         className="checkout-button"
//         onClick={redirectToCheckout}
//         disabled={isLoading}
//       >

//         <div className="text-container">
//           <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
//         </div>
//       </button>
//     </div>
//   );
//     }

    const Success=()=>{
        return(
        <div>Success</div>
        );
    }  

    return (
        <div className="book">
            <div className="left-bar">
                <p>{formHeaders[page]}</p>
            </div>
            <div className="right-bar">
                {page === 0 && <Service />}
                {page === 1 && <Schedule />}
                {page === 2 && <Address />}
                {page === 3 && <Confirm />}
                {/* {page === 4 && <CheckOut />}
                {page === 5 && <Success />} */}


                <div className="nav-buttons">
                    <button
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={page === 0}
                    >
                        Back
                    </button>
                {formHeaders.length-1===page?'': 
                    <button        
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page === formHeaders.length - 1}
                    >
                    {page === formHeaders.length - 1 ? "Confirm" : "Next"}
                    </button>}
                </div>
            </div>
        </div>
    );
};

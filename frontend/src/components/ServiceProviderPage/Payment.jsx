import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import "./payment.scss";

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }

    return stripePromise;
};

export const Payment = () => {
    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const item = {
        price: "price_1LtMGqL4mhlhx7FcPcBBOZCQ",
        quantity: 1,
    };

    const checkoutOptions = {
        lineItems: [item],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
    };
    console.log(checkoutOptions);
    const redirectToCheckout = async () => {
        setLoading(true);
        console.log("redirectToCheckout");

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        console.log("Stripe checkout error", error);

        if (error) setStripeError(error.message);
        setLoading(false);
    };

    if (stripeError) alert(stripeError);

    return (
        <div className="checkout">
            <h1>Stripe Checkout</h1>
            <p className="checkout-title">Design+Code React Hooks Course</p>
            <p className="checkout-description">
                Learn how to build a website with React Hooks
            </p>
            <h1 className="checkout-price">{item.price}</h1>
            <img
                className="checkout-product-image"
                src={require("https://github.com/iampjgb/satovan_/blob/97a6dde361bf6985a71d16ad7f64482a09a4617e/frontend/src/assets/carpenter.png")}
                alt="Product"
            />
            <button
                className="checkout-button"
                onClick={redirectToCheckout}
                disabled={isLoading}
            >
                {/* <div className="grey-circle">
          <div className="purple-circle">
            <img className="icon" src={CardIcon} alt="credit-card-icon" />
          </div>
        </div> */}
                <div className="text-container">
                    <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
                </div>
            </button>
        </div>
    );
};

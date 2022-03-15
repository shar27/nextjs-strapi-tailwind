import React from 'react'
import {useSelector} from 'react-redux'
import { selectItems } from './slices/cartSlice'
import Product from '../components/Product'
import CheckoutProduct from '../components/CheckoutProduct'
import Nav from '../components/Nav'
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Checkout() {
  
  const items = useSelector(selectItems)
  

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/createStripeSession", {
      items: items,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };


    return (
    <div>
    <Nav/>
    {items.length === 0?  <h1 className="text-6xl text-center">Your cart is empty</h1>: <h1 className="text-center text-6xl">Complete checkout</h1>}

    {items.map((item,i) => (
      <div className="grid-cols-4">
      <CheckoutProduct
        name={item.name}
        description={item.description}
        price={item.price}
        
      />
      <button className="bg-yellow-300">remove</button>
      </div>
    ))}
    <button onClick={createCheckOutSession} className="bg-yellow-500 text-black font-bold p-5 rounded-lg w-72">Checkout</button>
    </div>
  )
}

export default Checkout;
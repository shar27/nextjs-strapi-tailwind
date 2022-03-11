import React from "react";
import Image from "next/image";
import Cart from "../components/Cart";
import { useState } from "react";
import Link from "next/link";
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Products() {
  const [cart, setCart] = useState([]);

  const [item, setItem] = useState({
    name: "Apple AirPods",
    description: "Latest Apple AirPods.",
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202011_GEO_IN?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1613672874000",
    quantity: 0,
    price: 10,
  });

 
  

  const cartChange = (value) => {
    setItem({ ...item, quantity: Math.max(0, value) });
  };

  const addCart = () => {
    cartChange(item.quantity + 1);
  };

  const minusCart = () => {
    cartChange(item.quantity - 1);
  };

//   const handleCart = (e) => {
//     setCart(cart++);
//     console.log(cart);
//   };

  const inputChange = () => {
    cartChange(parseInt(e.target.value));
  };

  const hoveredStyle = {
    cursor: "pointer",
  };



const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    
    
    const checkoutSession = await axios.post('/api/createStripeSession', {
      item: item,
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
      <Cart />
      <Link href="/">
        <div styles={hoveredStyle}>${item.quantity * item.price}</div>
      </Link>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <Image src={item.image} width="300" height="300" />
          <h3>{item.name}</h3>
          <h3>{item.description}</h3>
          <h2>{item.price}</h2>
          <button
            onClick={minusCart}
            className="bg-blue-500 p-4 font-bold text-white rounded-lg"
          >
            -
          </button>
          <input
            onChange={inputChange}
            defaultValue={item.quantity}
            type="number"
          />
          <button
            onClick={addCart}
            className="bg-blue-500 p-4 font-bold text-white rounded-lg"
          >
            +
          </button>
          <button onClick={createCheckOutSession} className="bg-blue-500 p-4 font-bold text-white rounded-lg">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;

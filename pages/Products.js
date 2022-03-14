import React from "react";
import Image from "next/image";
import Cart from "../components/Cart";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import { selectItems } from "./slices/cartSlice";
import { addToBasket } from "./slices/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Products({ data, name, description, price, quantity, image }) {
  const dispatch = useDispatch();
  const router = useRouter()
  const [item, setItem] = useState({});


const basketView = () => {
  router.push('/Checkout')
}

  const pushProducts = () => {
    setItem(data.data.products);
  }

  useEffect(() => {
    
      pushProducts();
    
  }, []);

  console.log(item.data);

  const items = useSelector(selectItems);

  const cartChange = (value) => {
    setItem({ ...item });
  };

  const addCart = () => {
    const product = {
    
      name,
      description,
      image,
      quantity,
      price,
    };
    //send product to basket slice
    dispatch(addToBasket(product));
    //cartChange(item.attributes.quantity + 1);
  };

  const minusCart = () => {
    cartChange(item.quantity - 1);
  };

  

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/createStripeSession", {
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

      <ShoppingCartIcon onClick={basketView} />
    {items.length}

      <div className="grid grid-cols-3 gap-4 ">
        {item?.data?.map((d) => (
          <div key={d.i}>
            <Image
              key={d.id}
              src={
                "http://localhost:1337/uploads/thumbnail_copywriting_cef10ec90b.jpg"
              }
              width={300}
              height={300}
            />
            <h1>{d.attributes.name}</h1>
            <h1>{d.attributes.description}</h1>
            <h1>{"£" + d.attributes.price + ".00"}</h1>
            <button
              onClick={minusCart}
              className="bg-blue-500 p-4 font-bold text-white rounded-lg"
            >
              -
            </button>
            
            <button
              onClick={addCart}
              className="bg-blue-500 p-4 font-bold text-white rounded-lg"
            >
              +
            </button>
           
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  const fetchProduct = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      query: `{
        
        products{
          data{
            attributes{
              image{
                data{
                  attributes{
                    formats
                  }
                }
              }
              name
              description
              price
              quantity
            }
          }
        }
    }
      `,
    }),
  };

  const res = await fetch("http://localhost:1337/graphql", fetchProduct);
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data,
      revalidate: 1,
    },
  };
};

import React from "react";
import Image from "next/image";
import Cart from "../components/Cart";
import Product from '../components/Product'
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import { selectItems } from "./slices/cartSlice";
import { useRouter } from 'next/router'
import Nav from "../components/Nav";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Products({ data, name, description, price }) {

  
  
  const router = useRouter()
  const [item, setItem] = useState([]);


const basketView = () => {
  router.push('/Checkout')
}

  const pushProducts = () => {
    setItem(data?.data?.products?.data);
  }

  useEffect(() => {
    
      pushProducts();
    
  }, []);

  console.log(item)
  

  const items = useSelector(selectItems);
  

  // const createCheckOutSession = async () => {
  //   const stripe = await stripePromise;

  //   const checkoutSession = await axios.post("/api/createStripeSession", {
  //     item: item,
  //   });

  //   const result = await stripe.redirectToCheckout({
  //     sessionId: checkoutSession.data.id,
  //   });
  //   if (result.error) {
  //     alert(result.error.message);
  //   }
  // };

  return (
    <div>
    <Nav/>
      <Cart />

      <ShoppingCartIcon onClick={basketView} />
    {items.length}

    <div>
    {item?.map(({attributes:{name, description,price}})=> (
       
      
       <div key={item.id}>
       <Product 
    data={data} 
    name={name} 
    description={description} 
    price={price} />
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

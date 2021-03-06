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
  

  //console.log(items.map(({attributes:{image:{data:[{attributes:{formats:{thumbnail:{url}}}}]}}})))

  //console.log(item.map(({attributes:{image:{data:[{attributes:{formats:{thumbnail:{url}}}}]}}})=> console.log(url)))
  return (
    <div>
    <Nav/>
      <Cart />

      <ShoppingCartIcon onClick={basketView} />
    {items.length}
    
    <div className="grid grid-cols-4">
   
    {item?.map(({attributes:{name, description,price, image:{data:[{attributes:{formats:{thumbnail:{url}}}}]}}})=> (
       
      
       
       <div>
       <Product key={item.products} 
    data={data} 
    name={name} 
    url={url}
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

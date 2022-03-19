import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../pages/slices/cartSlice";
import { addToBasket } from "../pages/slices/cartSlice";
import Image from 'next/image'




function Product({data, name, description, price, image, url}) {
  const dispatch = useDispatch();
  
 
  
  const addCart = () => {
    const product = {
    name,
    description,
    price,
    url
   
      
    };
    //send product to basket slice
    
    dispatch(addToBasket(product));
    console.log(product);
    //cartChange(item.attributes.quantity + 1);
  };
  




  return (
    <div className="grid grid-cols-3 gap-2">
 
  <h1 className="text-2xl font-bold">{name}</h1>
    <p className="text-2xl">{description}</p>
    <p className="text-lg font-bold">{price}</p>   
    <Image src={url} width={300} height={300} />
    <button onClick={addCart} className='bg-blue-500 text-white p-5 mt-5 rounded-lg w-24'>Add me</button>
    </div>
  
      
  )
}

export default Product
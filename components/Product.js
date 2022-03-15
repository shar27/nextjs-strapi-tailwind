import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../pages/slices/cartSlice";
import { addToBasket } from "../pages/slices/cartSlice";
import Image from 'next/image'




function Product({data, name, description, price}) {
  const dispatch = useDispatch();
  
 
  
  const addCart = () => {
    const product = {
    name,
    description,
    price
   
      
    };
    //send product to basket slice
    
    dispatch(addToBasket(product));
    console.log(product);
    //cartChange(item.attributes.quantity + 1);
  };
  




  return (
    <div>
    <div className='grid grid-cols-4'>
  <div>
  <h1>{name}</h1>
    <p>{description}</p>
    <p>{price}</p>   
    <button onClick={addCart} className='bg-blue-500 text-white p-5'>Add me</button>
    </div>
      </div>
      </div>
  )
}

export default Product
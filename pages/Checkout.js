import React from 'react'
import {useSelector} from 'react-redux'
import { selectItems } from './slices/cartSlice'
import Product from '../components/Product'
import Nav from '../components/Nav'
function Checkout() {
  
  const items = useSelector(selectItems)
  
    return (
    <div>
    <Nav/>
    {items.length === 0?  <h1 className="text-6xl text-center">Your cart is empty</h1>: <h1 className="text-center text-6xl">Complete checkout</h1>}

    {items.map((item,i) => (
      <div className="grid grid-cols-2">
      <Product
        name={item.name}
        description={item.description}
        price={item.price}
        quantity={item.quantity}
      />
      </div>
    ))}
    <button className="bg-yellow-500 text-black font-bold p-5 rounded-lg w-72">Checkout</button>
    </div>
  )
}

export default Checkout;
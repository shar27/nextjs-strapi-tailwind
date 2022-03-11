import React from 'react'
import {useState} from 'react'
function Cart() {
  
  const [cart, setCart] = useState([])
  
  const handleCart = () => {
    setCart(e.target.value)
  }
    return (
    <div>Cart:{cart} </div>
  )
}

export default Cart
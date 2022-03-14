import React from 'react'
import {useSelector} from 'react-redux'
import { selectItems } from './slices/cartSlice'

function Checkout() {
  
  const items = useSelector(selectItems)
  
    return (
    <div>
    {items.length === 0?  "your cart is empty": "complete checkout"}

    {items.map((i) => (
      <div>
      {i.name}
      </div>
    ))}
    </div>
  )
}

export default Checkout;
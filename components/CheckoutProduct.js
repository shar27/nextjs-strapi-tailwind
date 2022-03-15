import React from 'react'
import {useDispatch} from 'react-redux'
import selectItems from '../pages/slices/cartSlice'

function CheckoutProduct({name, description, price}) {
 const dispatch = useDispatch()


 
 
    return (
    <div className='grid grid-cols-3 gap-2'>

        <h1 className='text-3xl'>Name:{name}</h1>
        <h2 className="text-3xl">Description:{description}</h2>
        <h2 className='text-3xl'>{price}</h2>
    </div>
  )
}

export default CheckoutProduct
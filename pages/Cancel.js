import React from 'react'
import Nav from '../components/Nav'

function Cancel() {
  return (
    <div>
      <Nav/>

      <h1 className="text-6xl text-center container">Cancellation</h1>
      <h2 className='text-3xl text-center container '>Your order has been cancelled.</h2>

      <div className="flex justify-center mt-20">
      <button className="bg-blue-500 p-4 rounded-lg w-44 text-white font-bold">Click her to go back to the store</button>
      </div>
    </div>
  )
}

export default Cancel
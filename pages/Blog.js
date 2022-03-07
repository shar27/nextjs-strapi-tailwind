import React from 'react'
import {gql, apollo} from '@apollo/client'
function Blog() {
  return (
    <div>
    <h1 className='text-9xl text-blue-500 text-center '>Posts</h1>
    <div className='grid grid-cols-4 grid-rows-1 gap-20 p-10 '>
    <div>        
    <h1 className="font-bold">title</h1>
        <p></p>
        </div>
        <div>        
    <h1>title</h1>
        <p></p>
        </div>
        <div>        
    <h1>title</h1>
        <p></p>
        </div>
        <div>        
    <h1>title</h1>
        <p></p>
        </div>
    </div>
    </div>
  )
}




export default Blog
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/Nav'
import { useState } from 'react'

function Sport({sports}) {
  const [sport, setSport] = useState('')

  const getSport = (e) => {
    setSport(e.target.value)
  }


    return (
    <div>
<Nav/>
<div>
<h1 className='text-6xl font-bold text-center mb-20'>Sports headlines</h1>
    <div className='flex justify-center'>
    <input className='w-72 h-12 p-2 rounded-lg border-2 ' value={sport} onChange={getSport} placeholder="Search..." />
    </div>
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
    {sports.articles
    .filter((val) => {
      if(val === "") {
        return val
      } else if (
        val.title.toLowerCase().includes(sport.toLowerCase())
      ){
        return val;
      } else if (
        val.description.toLowerCase().includes(sport.toLowerCase())
      ){
        return val
      }
    })
    .map((sport) => (
        <div className=''>
        <h1 className='text-3xl font-bold'>{sport.title}</h1>
        <Image src={sport.urlToImage} width={500} height={300} />
        <h1>{sport.author}</h1>
      
        <h1>{sport.description}</h1>
        <div className="mt-10">
      <a className="bg-blue-500 p-2 text-white font-bold rounded-lg">Read more</a>
        </div>
        </div>
    ))}
    </div>
</div>

    </div>
  )
}

const key = `${process.env.NEXT_PUBLIC_NEWS_API}`

const url = `https://newsapi.org/v2/everything?domains=bbc.co.uk&q=sport&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`




export const getStaticProps = async (ctx) => {
const res = await fetch(url)
const sports = await res.json()

  return {
    props:{
      sports,
    }
  }
}

export default Sport
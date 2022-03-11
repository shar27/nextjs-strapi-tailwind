import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function Nav() {
  return (
    <div className='flex justify-center bg-red-500 text-white font-bold text-3xl h-16'>
   <Link href="/">
   <h1 className='p-2 mr-20'>DailyNews</h1>
   </Link>
    <Link href="/">
        <a className=' w-48 '>Home</a>
    </Link>
    <Link href="/">
        <a className=' w-48'>News</a>
    </Link>
    <Link href="/">
        <a className=' w-48'>Travel</a>
    </Link>
    <Link href="/">
        <a className=' w-48'>Sport</a>
    </Link>
    <Link href="/">
        <a className=' w-48'>Tech</a>
    </Link>
    <Link href="/Products">
        <a className=' w-48'>Products</a>
    </Link>
    </div>
  )
}

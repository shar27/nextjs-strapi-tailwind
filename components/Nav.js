import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function Nav() {
  return (
    <div className='flex justify-center bg-yellow-400 text-black font-bold text-3xl h-16'>
   <Link href="/">
   <h1 className='p-2 mr-20'>DailyNews</h1>
   </Link>
    <Link href="/">
        <a className=' w-48 '>Home</a>
    </Link>
    <Link href="/News">
        <a className=' w-48'>Articles</a>
    </Link>
    <Link href="/Travel">
        <a className=' w-48'>Travel</a>
    </Link>
    <Link href="/Sport">
        <a className=' w-48'>Sport</a>
    </Link>
    <Link href="/Technology">
        <a className=' w-48'>Tech</a>
    </Link>
    <Link href="/Products">
        <a className=' w-48'>Products</a>
    </Link>
    </div>
  )
}

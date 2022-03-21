import React from 'react'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
function News({articles}) {
  
const [News, setNews] = useState([])

 console.log(articles)

    return (
    <div>

   {articles.articles.map((article) => (
     <div className="border-2">
     <h1 className="text-3xl font-bold mt-10">{article.title}</h1>
     <Image  src={article.urlToImage} width={300} height={300} />
     
     <p>{article.description}</p>
    <h2 className='font-bold text-3xl'>By: {article.author}</h2>
    <p className="font-bold">Published: {article.publishedAt.slice(0,10)}</p>
    <div className='mt-5 mb-5'>
    <Link href={article.url} >
    <a className='bg-blue-500 font-bold text-white p-4 rounded-lg w-24'>Read more</a>
    </Link>
   </div>
     </div>
   ))}

    </div>
  )
}



export default News
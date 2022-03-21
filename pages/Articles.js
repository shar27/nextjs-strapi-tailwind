import React from 'react'
import News from '../components/News'
import Nav from '../components/Nav';
import {useState, useEffect} from 'react'
function Articles({articles}) {
  
  const [search, setSearch] = useState('')
    
  
  const getNews = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div>
    <Nav/>
    <h1 className='text-6xl text-center font-serif mb-20 '>Top headlines</h1>
    <div className='flex justify-center mb-20'>
    <input className='w-72 border-2 p-2 h-16 rounded-lg '  value={search} onChange={getNews} placeholder="Search..." />
    </div>
    <div className="grid grid-cols-3 span-2 gap-4 grid-rows-2">
    {articles.articles
    
     .filter((val) => {
      if(search === ""){
        return val
      } else if (
        val.title.toLowerCase().includes(search.toLowerCase())
      ){
        return val
      } else if (
        val.description.toLowerCase().includes(search.toLowerCase())
      ){
        return val
      }
    })
    .map((article) => (
        <News
        articles={articles}

        />
        
        
    ))}
</div>
    </div>
  )
}


const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}` 




export const getServerSideProps = async (ctx) => {
const res = await fetch(url)
const articles = await res.json()

  return {
    props:{
      articles,
    }
  }
}


export default Articles
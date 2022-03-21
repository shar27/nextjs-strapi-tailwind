import React from 'react'

function Travel({general}) {
  
  console.log(general);
    return (
    <div>Travel</div>
  )
}


const url = `https://newsapi.org/v2/everything?domains=bbc.co.uk&q=general&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`; 




export const getStaticProps = async (ctx) => {
const res = await fetch(url)
const general = await res.json()

  return {
    props:{
      general,
    }
  }
}

export default Travel
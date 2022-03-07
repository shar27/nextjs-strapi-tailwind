import React from 'react'
import Image from 'next/image'

export default function fetchPosts(data) {
    console.log(data.data.data.posts.data)
  console.log(data.data.data.posts.data.map((d) => console.log(d.attributes.Title)));
    return (
    <div>
    <h1>Posts</h1>
   <>
       {data.data.data.posts.data.map((da) => (
           <div className='grid grid-cols-1 gap-4'>
          <h1> {da.attributes.Title}</h1>
           <h2>{da.attributes.heading}</h2>
         
           <p>{da.attributes.content}</p>
           </div>
       ))}
   </>
    </div>
  )
}
const url = process.env.STRAPI_URL
export const getStaticProps = async (ctx) => {

const fetchData = {
    method: "post",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        query: `{
            posts{
                data{
                  attributes{
                    Title
                    heading
                    content
                    featured{
                      data{
                        attributes{
                          name
                        }
                      }
                    }
                    thumbnail{
                      data{
                        attributes{
                          name
                        }
                      }
                    }
                  }
                }
              }
        }
        `
    })
}


const res = await fetch(`${process.env.STRAPI}/graphql`, fetchData)
const data = await res.json()

if(!data){
    return{
        redirect: {
            destination: '/',
            permanent: false,
        },
    }
}
    return {
        props:{
            data,
            revalidate: 10
        }
    }
}
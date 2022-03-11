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
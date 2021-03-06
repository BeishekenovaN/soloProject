import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import Item from './Item';
import { productContext } from '../../../Contexts/ProductsContext';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];



const Slider = () => {
    const { products, getProducts } = useContext(productContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const [limit, setLimit] = useState(6)
    const [page, setPage] = useState(searchParams.get('_page') ? searchParams.get("_page") : 1)


    useEffect(() =>{
        setSearchParams({
            '_limit': limit,
            "_page": page
        })
    }, [limit, page])


    useEffect(() => {
        getProducts()
    }, [])
    return (
      <div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-around', alignItems: 'center',paddingTop: '20vh', flexWrap: 'wrap',backgroundColor: '#4a148c', height: '100% '  }}>
          <h1 style={{padding: '0 15px', color:'white'}}>TOP Album</h1>
          <Link style={{textDecoration: 'none', color: 'white'}} to='/list'>
            <h1 >View All</h1>
          </Link>
        </div>
            <div className='Slider'>
              <Carousel breakPoints={breakPoints} >
                  {
                    products ? (
                      products.map((item, index) => (
                        <Item  key={index}> 
                          <Card sx={{ maxWidth: 306, boxShadow: 'none', height: '500px' }}>
                            <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}> 
                              <CardMedia
                                sx={{width: '300px'}}
                                component="img"
                                image={item.image}
                                alt={item.title}
                                sx={{paddingTop: '10px', height: "300px"}}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  {item.title}
                                </Typography>
        
                              </CardContent>
                              <CardContent>
                                <Typography >
                                    ${item.price}
                                </Typography>
                              </CardContent>
                            </Link>
                        </Card>
                        </Item>
                    ))
                  ): (<h1>Loading...</h1>)
                }
              </Carousel>
            </div>
      </div>
     
    );
};

export default Slider;
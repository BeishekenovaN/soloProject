import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { productContext } from '../../../Contexts/ProductsContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import './ProductCard.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function ProductCard({item}) {
    const {deleteProduct, addToCart, checkProductInCart, useAuth, addToFav, checkProductInFav } = React.useContext(productContext)
    const currentUser = useAuth()


    let icons = (
      <CardActions disableSpacing>
          {currentUser?.email === "admin1@gmail.com" ? (
              <Link to={`edit/${item.id}`}>
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
              </Link>
            ) : null
          } 

          {currentUser?.email === "admin1@gmail.com" ? (
                <IconButton onClick={() => deleteProduct(item.id)}>
                <DeleteIcon />
                </IconButton>
            ) :null
          }

          <IconButton onClick={() => {
            addToCart(item)  
          }} 
            color = {checkProductInCart(item.id) ? 'success' : 'default'}  
          >
            <ShoppingBagIcon />
          </IconButton>
  
          <IconButton onClick={() => {
            addToFav(item)  
          }} 
            color = {checkProductInFav(item.id) ? 'success' : 'default'}  
          >
            <FavoriteIcon />
          </IconButton>
      </CardActions>
    )

  return (
    <>
          <Card sx={{ maxWidth: 306, minWidth: 306 }}>
            <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}> 
              <CardMedia 
                width='300px'
                component="img"
                image={item.image}
                alt={item.title}
              /> 
             
                <Typography sx={{fontSize: '20px', textAlign: 'center'}}>
                  {item.type}
                </Typography>  
                
            
              <Typography sx={{fontSize: '20px', color: 'black', textAlign: 'center', paddingTop: '20px'}}>
                {item.title}
              </Typography>
           
              <Typography sx={{fontSize: '13px', paddingTop: '5px', textAlign: 'center'}}>
                {item.description}
              </Typography>
             
              <Typography sx={{fontSize: '25px', paddingTop: '5px', color: 'black',textAlign: 'center'}}>
                  $ {item.price}
              </Typography>  
            </Link>
            <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
                {icons}
              </div>
    
        </Card>
        </>     
  );
}

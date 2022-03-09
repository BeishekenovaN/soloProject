import { CardActions } from '@mui/material';
import React, { useContext } from 'react';
import { commentContext } from './CommentContext';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { productContext } from '../../Contexts/ProductsContext';

export default function CommentCard ({item})  {
    const {deleteComment } = useContext(commentContext)
    const { useAuth } = useContext(productContext)
    const currentUser = useAuth()

    let icons = (
        <CardActions disableSpacing>
          {currentUser?.email === "admin1@gmail.com" ? (
              <Link to={`editConmment/${item.id}`}>
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
              </Link>
            ) : null
          } 

          {currentUser?.email === "admin1@gmail.com" ? (
                <IconButton onClick={() => deleteComment(item.id)}>
                <DeleteIcon />
                </IconButton>
            ) :null
          }  

          </CardActions>
    )
    return (
        <>
        <Card sx={{ maxWidth: 560, minWidth: 560}}>
          {/* <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>  */}
            {/* <CardMedia 
              width='300px'
              component="img"
              image={item.image}
              alt={item.title}
            /> 
            {currentUser?.email === "admin1@gmail.com" ? (  
              <Typography sx={{fontSize: '20px', textAlign: 'center'}}>
                {item.type}
              </Typography>  
              ): null
            } */}
            <Typography sx={{fontSize: '20px', color: 'black', textAlign: 'center', paddingTop: '20px'}}>
              {item.username}
            </Typography>
            <Typography sx={{fontSize: '20px', color: 'black', textAlign: 'center', paddingTop: '20px'}}>
              {item.title}
            </Typography>
            <Typography sx={{fontSize: '13px', paddingTop: '5px', textAlign: 'center'}}>
              {item.text}
            </Typography>
         
          {/* </Link> */}
          <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
              {icons}
            </div>
            {/* <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
              <ProductStar/>
            </div> */}
      </Card>
      </>     
);
}